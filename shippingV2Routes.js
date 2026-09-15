// file: shippingV2Routes.js   (NEUE DATEI, ins Backend-Repo neben server.js)
// ============================================================
// Alle Endpunkte des neuen Versand-/Treuhandmodells an EINER Stelle,
// damit server.js nur um eine einzige Zeile waechst.
//
// Einhaengen in server.js, direkt VOR dem Block "ERROR HANDLING":
//   require('./shippingV2Routes')(app, {
//     requireAuth, requireSeller, requireAdmin,
//     resolveSellerScope, blockFinancialInAdminView,
//   });
//
// Enthaelt:
//   HAENDLER  - Versandtarife pflegen, Tracking eintragen (mit
//               sofortiger Carrier-Pruefung), Packzettel drucken
//   KUNDE     - Empfang bestaetigen
//   ADMIN     - Sendungs-Board, Einzelpruefung, Prueflauf
//   SYSTEM    - Cron-Prueflauf, Tracking-Webhook
// ============================================================

const { query } = require('./db');
const shippingDb = require('./shippingDb');
const shippingRates = require('./shippingRates');
const tracking = require('./trackingProviders');
const escrow = require('./escrow');

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
function n2(n) { return (Math.round((Number(n) || 0) * 100) / 100).toFixed(2); }

module.exports = function registerShippingV2(app, deps) {
  const {
    requireAuth, requireSeller, requireAdmin,
    resolveSellerScope, blockFinancialInAdminView,
  } = deps || {};

  const sellerId = (req) =>
    (typeof resolveSellerScope === 'function' ? resolveSellerScope(req).id : req.user.id);

  /* ==========================================================
     HAENDLER - VERSANDTARIFE
     Der Haendler legt selbst fest, was der Kunde an Versand zahlt.
     Genau dieser Betrag wird ihm spaeter erstattet.
     ========================================================== */

  app.get('/api/seller/shipping-rates', requireSeller, async (req, res) => {
    try {
      const rates = await shippingRates.listRates(sellerId(req));
      res.json({
        rates,
        carriers: tracking.CARRIERS,
        hint: rates.length ? null
          : 'Noch kein Versandtarif hinterlegt. Bis dahin berechnet die Plattform '
            + 'einen Standardpreis - lege eigene Tarife an, damit die Erstattung '
            + 'deinen tatsaechlichen Kosten entspricht.',
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Anlegen/aendern. country = ISO-2 oder '*' fuer alle uebrigen Laender.
  app.post('/api/seller/shipping-rates', requireSeller, async (req, res) => {
    try {
      const b = req.body || {};
      if (!b.country) return res.status(400).json({ error: 'Zielland fehlt' });
      if (Number(b.base_usd) < 0 || Number(b.per_kg_usd) < 0) {
        return res.status(400).json({ error: 'Preise duerfen nicht negativ sein' });
      }
      const rate = await shippingRates.upsertRate(sellerId(req), b);
      res.json({ ok: true, rate });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete('/api/seller/shipping-rates/:id', requireSeller, async (req, res) => {
    try {
      const ok = await shippingRates.deleteRate(sellerId(req), parseInt(req.params.id, 10));
      if (!ok) return res.status(404).json({ error: 'Tarif nicht gefunden' });
      res.json({ ok: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  /* ==========================================================
     HAENDLER - TRACKING EINTRAGEN
     Die Nummer wird SOFORT beim Carrier geprueft. Der Haendler
     erfaehrt direkt, ob sie anerkannt wird - statt tagelang auf
     eine Freigabe zu warten, die wegen eines Tippfehlers nie kommt.
     ========================================================== */

  app.post('/api/seller/shipments/:id/tracking', requireSeller, async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const { carrier, tracking_number } = req.body || {};
      if (!tracking_number || !String(tracking_number).trim()) {
        return res.status(400).json({ error: 'Trackingnummer fehlt' });
      }

      const slug = String(carrier || '').trim() || tracking.guessCarrier(tracking_number);
      const saved = await shippingDb.setSellerTracking(id, sellerId(req), {
        carrier: slug,
        tracking_number: String(tracking_number).trim(),
      });
      if (!saved) return res.status(404).json({ error: 'Sendung nicht gefunden' });

      // Fuer spaetere Statusmeldungen registrieren (optional, still)
      tracking.subscribe({
        carrier: slug,
        tracking_number: saved.tracking_number,
        metadata: 'shipment ' + id,
      }).catch(() => {});

      // Sofort pruefen -> ggf. Versandanteil freigeben
      const check = await escrow.checkShipment(id);
      const shipment = await shippingDb.getSellerShipment(id, sellerId(req));

      let message, state;
      if (check.valid) {
        state = 'verified';
        message = 'Vom Versanddienst bestaetigt.'
          + (check.released_shipping
              ? ' Deine Versandkosten (' + n2(shipment.shipping_fee_usd)
                + ' USD) sind zur Auszahlung freigegeben.'
              : '');
      } else if (check.ok) {
        state = 'unknown';
        message = 'Der Versanddienst kennt diese Nummer noch nicht. Bei frisch '
          + 'aufgegebenen Paketen dauert das bis zu 24 Stunden - wir pruefen '
          + 'automatisch weiter. Bleibt es dabei, pruefe bitte Nummer und Versanddienst.';
      } else {
        state = 'pending';
        message = 'Die Nummer ist gespeichert, konnte gerade aber nicht geprueft '
          + 'werden. Wir holen das automatisch nach.';
      }

      res.json({ ok: true, state, message, check, shipment });
    } catch (err) {
      console.error('[seller/tracking]', err.message);
      res.status(500).json({ error: err.message });
    }
  });

  // Erneut pruefen lassen (Knopf im Haendler-Dashboard)
  app.post('/api/seller/shipments/:id/recheck', requireSeller, async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const own = await shippingDb.getSellerShipment(id, sellerId(req));
      if (!own) return res.status(404).json({ error: 'Sendung nicht gefunden' });
      const check = await escrow.checkShipment(id);
      const shipment = await shippingDb.getSellerShipment(id, sellerId(req));
      res.json({ ok: true, check, shipment });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  /* ==========================================================
     HAENDLER - PACKZETTEL (druckbar, Browser -> "Als PDF speichern")
     Enthaelt bewusst NUR, was zum Versenden noetig ist. Geht die
     Sendung an eine Abholstation, steht die Stationsadresse drauf,
     nicht die Privatadresse des Kunden. Keine E-Mail-Adresse.
     ========================================================== */

  app.get('/api/seller/shipments/:id/packing-slip', requireSeller, async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const s = await shippingDb.getSellerShipment(id, sellerId(req));
      if (!s) return res.status(404).send('Sendung nicht gefunden');

      const items = Array.isArray(s.items) ? s.items : [];
      const addr = s.order_address || {};
      const toStation = !!s.pickup_station_name;

      const target = toStation
        ? [s.pickup_station_name, s.pickup_station_address, s.pickup_station_city,
           s.pickup_station_country].filter(Boolean).join('<br>')
        : [addr.street, addr.city, addr.region, addr.postal_code, addr.country]
            .filter(Boolean).join('<br>');

      const rows = items.map((it) => `
        <tr>
          <td>${esc(it.title)}</td>
          <td class="c">${esc(it.product_id || '-')}</td>
          <td class="c">${esc(it.qty)}</td>
          <td class="r">${n2(it.line_total)}</td>
        </tr>`).join('');

      const html = `<!DOCTYPE html>
<html lang="de"><head><meta charset="utf-8">
<title>Packzettel Bestellung ${esc(s.order_id)}</title>
<style>
  body{font-family:Arial,Helvetica,sans-serif;color:#111;max-width:760px;margin:28px auto;padding:0 18px}
  h1{font-size:20px;margin:0 0 2px} .sub{color:#666;font-size:13px;margin-bottom:22px}
  .box{border:1px solid #ddd;border-radius:8px;padding:14px 16px;margin-bottom:16px}
  .lbl{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#777;margin-bottom:5px}
  table{width:100%;border-collapse:collapse;margin-top:6px;font-size:14px}
  th,td{border-bottom:1px solid #e5e5e5;padding:8px 6px;text-align:left}
  th{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#777}
  .c{text-align:center}.r{text-align:right}
  .tot{margin-top:14px;text-align:right;font-size:15px}
  .tot b{font-size:18px}
  .note{margin-top:22px;font-size:12px;color:#777;border-top:1px solid #eee;padding-top:10px}
  .grid{display:flex;gap:16px}.grid>div{flex:1}
  @media print{ .noprint{display:none} body{margin:0} }
</style></head><body>
<h1>AFCARPARTS &middot; Packzettel</h1>
<div class="sub">Bestellung #${esc(s.order_id)} &middot; Sendung #${esc(s.id)} &middot;
  ${esc(new Date(s.order_created_at || s.created_at).toLocaleDateString('de-DE'))}</div>

<div class="grid">
  <div class="box">
    <div class="lbl">${toStation ? 'Lieferung an Abholstation' : 'Lieferanschrift'}</div>
    ${target || '-'}
  </div>
  <div class="box">
    <div class="lbl">Empfaenger</div>
    ${esc(s.buyer_name || addr.name || '-')}<br>
    ${esc(s.buyer_phone || addr.phone || '')}
  </div>
</div>

<div class="box">
  <div class="lbl">Artikel</div>
  <table>
    <tr><th>Bezeichnung</th><th class="c">Artikelnr.</th><th class="c">Menge</th><th class="r">Betrag</th></tr>
    ${rows}
  </table>
  <div class="tot">
    Warenwert: ${n2(s.goods_total)} ${esc(s.order_currency || 'USD')}<br>
    Versand (vom Kunden bezahlt): ${n2(s.shipping_fee_usd)} ${esc(s.order_currency || 'USD')}<br>
    <b>Gesamt: ${n2(Number(s.goods_total || 0) + Number(s.shipping_fee_usd || 0))}
    ${esc(s.order_currency || 'USD')}</b>
  </div>
</div>

<div class="note">
  Die Versandkosten von ${n2(s.shipping_fee_usd)} ${esc(s.order_currency || 'USD')} hat der
  Kunde bereits bezahlt. Sie werden dir erstattet, sobald die Trackingnummer vom
  Versanddienst bestaetigt ist. Der Warenwert wird ausgezahlt, sobald die Sendung
  zugestellt oder vom Kunden bestaetigt wurde.
</div>

<p class="noprint" style="margin-top:20px">
  <button onclick="window.print()" style="padding:9px 16px;font-size:14px;cursor:pointer">
    Drucken / als PDF speichern
  </button>
</p>
</body></html>`;

      res.set('Content-Type', 'text/html; charset=utf-8').send(html);
    } catch (err) {
      console.error('[packing-slip]', err.message);
      res.status(500).send(err.message);
    }
  });

  /* ==========================================================
     KUNDE - EMPFANG BESTAETIGEN
     Zweiter Weg zur Freigabe, unabhaengig vom Carrier. Unverzichtbar
     fuer lokale Kuriere, die keinen Status melden.
     ========================================================== */

  app.post('/api/my/shipments/:id/confirm', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const out = await escrow.confirmReceipt(id, req.user.id);
      if (!out.ok) return res.status(404).json({ error: out.error });
      res.json({
        ok: true,
        message: 'Danke - der Empfang ist bestaetigt.',
        shipment: out.shipment,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  /* ==========================================================
     ADMIN - SENDUNGS-BOARD
     Eine Stelle mit allem: wer hat bestellt, was ist unterwegs,
     welche Nummer ist bestaetigt, welches Geld ist freigegeben.
     Filter: ?status=&verified=true|false&seller=&page=
     ========================================================== */

  app.get('/api/admin/shipments/board', requireAdmin, async (req, res) => {
    try {
      const verified = req.query.verified === 'true' ? true
                     : req.query.verified === 'false' ? false : undefined;
      const rows = await shippingDb.listShipments({
        status: req.query.status || undefined,
        sellerUserId: req.query.seller || undefined,
        verified,
        page: parseInt(req.query.page, 10) || 1,
        perPage: 100,
      });

      const board = rows.map((s) => ({
        id: s.id,
        order_id: s.order_id,
        created_at: s.created_at,
        status: s.status,
        seller_user_id: s.seller_user_id,
        buyer_name: s.buyer_name,
        buyer_phone: s.buyer_phone,
        buyer_email: s.buyer_email,
        destination: s.pickup_station_name
          ? (s.pickup_station_name + (s.pickup_station_city ? ' (' + s.pickup_station_city + ')' : ''))
          : ((s.order_address && s.order_address.city) || null),
        items: s.items || [],
        item_count: s.item_count || 0,
        goods_total: s.goods_total || 0,
        payout_total: s.payout_total || 0,
        currency: s.order_currency || 'USD',
        // Versand
        shipping_fee_usd: s.shipping_fee_usd,
        shipping_payout_status: s.shipping_payout_status,
        // Tracking
        carrier: s.carrier,
        carrier_label: tracking.carrierLabel(s.carrier),
        tracking_number: s.tracking_number,
        tracking_verified: s.tracking_verified,
        tracking_state: s.tracking_state,
        tracking_detail: s.tracking_detail,
        tracking_checked_at: s.tracking_checked_at,
        tracking_attempts: s.tracking_attempts,
        tracking_url: s.tracking_url || tracking.trackingUrl(s.carrier, s.tracking_number),
        eta: s.eta,
        // Treuhand
        delivered_at: s.delivered_at,
        buyer_confirmed_at: s.buyer_confirmed_at,
        released_at: s.released_at,
        release_reason: s.release_reason,
        money_state: s.released_at ? 'freigegeben'
                   : (s.shipping_payout_status === 'released' ? 'nur Versand frei' : 'gehalten'),
      }));

      res.json({
        shipments: board,
        summary: {
          total: board.length,
          held: board.filter((b) => !b.released_at).length,
          released: board.filter((b) => b.released_at).length,
          unverified: board.filter((b) => b.tracking_number && !b.tracking_verified).length,
          problem: board.filter((b) => b.status === 'problem').length,
        },
      });
    } catch (err) {
      console.error('[admin/shipments/board]', err.message);
      res.status(500).json({ error: err.message });
    }
  });

  // Admin: eine Sendung sofort pruefen
  app.post('/api/admin/shipments/:id/check', requireAdmin, async (req, res) => {
    try {
      const check = await escrow.checkShipment(parseInt(req.params.id, 10));
      res.json({ ok: true, check });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Admin: Warenwert von Hand freigeben (Ausnahmefall, z. B. Kunde
  // meldet sich telefonisch). Wird mit Grund protokolliert.
  app.post('/api/admin/shipments/:id/release', requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const reason = 'admin:' + String((req.body && req.body.reason) || 'manuell').slice(0, 80);
      const rel = await shippingDb.releaseGoods(id, reason);
      await shippingDb.releaseShippingFee(id);
      console.log('[escrow] Sendung', id, '- von Hand freigegeben:', reason);
      res.json({ ok: true, released_items: rel.items.length, shipment: rel.shipment });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Admin: Prueflauf ueber alle offenen Sendungen
  app.post('/api/admin/tracking/sweep', requireAdmin, async (req, res) => {
    try {
      const out = await escrow.sweep(parseInt(req.body && req.body.limit, 10) || 40);
      res.json({ ok: true, ...out });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  /* ==========================================================
     SYSTEM
     ========================================================== */

  // Cron (Render Cron Job oder externer Aufruf), alle 3-6 Stunden:
  //   GET /api/cron/tracking-sweep?secret=CRON_SECRET
  app.get('/api/cron/tracking-sweep', async (req, res) => {
    const secret = process.env.CRON_SECRET || process.env.MIGRATION_SECRET;
    if (!secret) return res.status(503).json({ error: 'CRON_SECRET not set' });
    if (req.query.secret !== secret) return res.status(401).json({ error: 'Invalid secret' });
    try {
      const out = await escrow.sweep(parseInt(req.query.limit, 10) || 40);
      res.json({ ok: true, summary: out.summary });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Tracking-Webhook. Der gemeldete Status wird nicht uebernommen,
  // sondern loest eine eigene Pruefung aus - ein Webhook ist ein
  // Anstoss, keine Auszahlungsanweisung.
  app.post('/api/webhooks/shippo-track', async (req, res) => {
    try {
      const out = await escrow.applyTrackingWebhook(req.body);
      res.json({ ok: true, result: out });
    } catch (err) {
      console.error('[webhook/shippo-track]', err.message);
      res.json({ ok: false, error: err.message }); // 200, damit nicht endlos wiederholt wird
    }
  });

  console.log('[shipping-v2] Versand- und Treuhand-Endpunkte registriert');
};
