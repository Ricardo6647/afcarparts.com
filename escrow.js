// file: escrow.js   (NEUE DATEI, ins Backend-Repo neben shippingDb.js)
// ============================================================
// TREUHAND - wann welches Geld freigegeben wird
//
// Zwei getrennte Freigaben je Sendung:
//
//   1. VERSANDANTEIL  -> frei, sobald der Carrier die Trackingnummer
//      kennt. Der Haendler hat vorgelegt, das Paket ist nachweislich
//      im System. Risiko fuer uns praktisch null.
//
//   2. WARENWERT      -> frei, sobald der Carrier "zugestellt" meldet
//      ODER der Kunde auf "Erhalten" drueckt. Was zuerst kommt.
//
// Was NICHT freigibt:
//   - eine Nummer, die der Carrier nicht kennt
//   - ein Abruf, der technisch fehlgeschlagen ist (dann wissen WIR
//     nichts - das ist kein Vorwurf an den Haendler, aber auch kein
//     Nachweis)
//   - Ruecklaeufer oder gescheiterte Zustellung
//
// Nach TRACKING_MAX_ATTEMPTS erfolglosen Pruefungen (Standard 8, bei
// 3-Stunden-Takt also rund einen Tag) wird die Sendung auf 'problem'
// gesetzt. Das ist der Fall "erfundene Nummer" - er landet im
// Admin-Board, nicht in einer stillen Warteschlange.
// ============================================================

const shippingDb = require('./shippingDb');
const tracking = require('./trackingProviders');

function maxAttempts() {
  const n = parseInt(process.env.TRACKING_MAX_ATTEMPTS || '8', 10);
  return (n > 0) ? n : 8;
}

/* ------------------------------------------------------------
   Eine Sendung pruefen und die faelligen Freigaben ausloesen.
   Wirft nicht - ein Fehler darf den Prueflauf nicht abbrechen.
   ------------------------------------------------------------ */
async function checkShipment(shipmentId) {
  const out = {
    shipment_id: shipmentId,
    ok: false, valid: false, state: null,
    released_shipping: false, released_goods: false,
    flagged: false, error: null,
  };

  let s = await shippingDb.getShipment(shipmentId);
  if (!s) { out.error = 'Sendung nicht gefunden'; return out; }
  if (!s.tracking_number) { out.error = 'Keine Trackingnummer hinterlegt'; return out; }

  const result = await tracking.verify({
    carrier: s.carrier,
    tracking_number: s.tracking_number,
  });
  out.ok = result.ok;
  out.valid = result.valid;
  out.state = result.state;
  out.error = result.error;

  s = await shippingDb.saveTrackingResult(shipmentId, result) || s;

  // --- Freigabe 1: Versandanteil ---
  if (result.valid && s.shipping_payout_status === 'held') {
    const rel = await shippingDb.releaseShippingFee(shipmentId);
    if (rel) {
      out.released_shipping = true;
      console.log('[escrow] Sendung', shipmentId, '- Versandanteil freigegeben:',
        rel.shipping_fee_usd, 'USD (Tracking bestaetigt von', (result.carrier || '?') + ')');
    }
  }

  // --- Freigabe 2: Warenwert bei Zustellung ---
  if (result.valid && result.state === 'delivered' && !s.released_at) {
    const rel = await shippingDb.releaseGoods(shipmentId, 'carrier_delivered');
    out.released_goods = rel.items.length > 0;
    if (out.released_goods) {
      console.log('[escrow] Sendung', shipmentId, '- Warenwert freigegeben (Carrier: zugestellt),',
        rel.items.length, 'Position(en)');
    }
  }

  // --- Verdachtsfall: Nummer wird dauerhaft nicht anerkannt ---
  if (result.ok && !result.valid && !s.tracking_verified) {
    if ((s.tracking_attempts || 0) >= maxAttempts() && s.status !== 'problem') {
      await shippingDb.setShipmentStatus(shipmentId, 'problem');
      out.flagged = true;
      console.warn('[escrow] Sendung', shipmentId, '- Trackingnummer', s.tracking_number,
        'wird von', (s.carrier || 'dem Versanddienst'), 'nach', s.tracking_attempts,
        'Versuchen nicht anerkannt -> als Problem markiert');
    }
  }

  return out;
}

/* ------------------------------------------------------------
   Kunde bestaetigt den Empfang. Zweiter Weg zur Freigabe des
   Warenwerts - unabhaengig davon, was der Carrier meldet. Wichtig
   fuer lokale Kuriere ohne Statusmeldung.
   ------------------------------------------------------------ */
async function confirmReceipt(shipmentId, buyerUserId) {
  const s = await shippingDb.setBuyerConfirmed(shipmentId, buyerUserId);
  if (!s) return { ok: false, error: 'Sendung nicht gefunden oder gehoert nicht zu diesem Konto' };

  // Bestaetigt der Kunde, ist auch der Versand erbracht - selbst wenn
  // der Carrier nie etwas gemeldet hat.
  if (s.shipping_payout_status === 'held') {
    await shippingDb.releaseShippingFee(shipmentId);
  }

  const rel = await shippingDb.releaseGoods(shipmentId, 'buyer_confirmed');
  console.log('[escrow] Sendung', shipmentId, '- Kunde hat den Empfang bestaetigt,',
    rel.items.length, 'Position(en) freigegeben');

  return { ok: true, shipment: rel.shipment || s, released_items: rel.items.length };
}

/* ------------------------------------------------------------
   Prueflauf ueber alle offenen Sendungen.
   Aufruf per Cron (Render Cron Job) oder Admin-Knopf.
   ------------------------------------------------------------ */
async function sweep(limit = 40) {
  const open = await shippingDb.listForTrackingCheck(limit);
  const results = [];
  for (const row of open) {
    try {
      results.push(await checkShipment(row.id));
    } catch (e) {
      console.error('[escrow] Pruefung fehlgeschlagen fuer Sendung', row.id, '-', e.message);
      results.push({ shipment_id: row.id, ok: false, error: e.message });
    }
  }
  const summary = {
    checked: results.length,
    verified: results.filter((r) => r.valid).length,
    released_shipping: results.filter((r) => r.released_shipping).length,
    released_goods: results.filter((r) => r.released_goods).length,
    flagged: results.filter((r) => r.flagged).length,
    errors: results.filter((r) => r.error && !r.ok).length,
  };
  if (summary.checked) {
    console.log('[escrow] Prueflauf:', JSON.stringify(summary));
  }
  return { summary, results };
}

/* ------------------------------------------------------------
   Webhook-Meldung des Trackinganbieters verarbeiten.
   Der gemeldete Status wird NICHT blind uebernommen - wir fragen
   selbst nach (checkShipment). Ein Webhook ist ein Anstoss zur
   Pruefung, keine Anweisung zur Auszahlung.
   ------------------------------------------------------------ */
async function applyTrackingWebhook(body) {
  const evt = tracking.parseWebhook(body);
  if (!evt) return { ok: false, error: 'Webhook ohne Trackingnummer' };

  const s = await shippingDb.findByTracking(evt.tracking_number);
  if (!s) return { ok: false, error: 'Keine Sendung zu dieser Nummer' };

  return await checkShipment(s.id);
}

module.exports = { checkShipment, confirmReceipt, sweep, applyTrackingWebhook, maxAttempts };
