// file: trackingProviders.js   (NEUE DATEI, ins Backend-Repo neben shippingProviders.js)
// ============================================================
// TRACKING-VERIFIKATION
//
// Der Haendler traegt eine Nummer ein - das allein ist kein Nachweis.
// Dieses Modul fragt den Carrier (DHL, UPS, FedEx, USPS ...) ueber
// Shippo Tracking und liefert eine ehrliche Antwort:
//
//   valid = false  ->  der Carrier kennt diese Nummer nicht.
//                      Kein Versandnachweis, kein Geld.
//   valid = true   ->  die Nummer existiert beim Carrier.
//                      Versandanteil darf freigegeben werden.
//   state = 'delivered' -> zugestellt. Warenwert darf freigegeben werden.
//
// ENV:
//   SHIPPO_API_TOKEN      - derselbe Token wie fuer Labels.
//                           Testtoken (shippo_test_) funktioniert nur mit
//                           den Testnummern unten; fuer echte DHL-/UPS-
//                           Nummern wird ein Live-Token gebraucht.
//   TRACKING_WEBHOOK_URL  - optional, z. B.
//                           https://<render-domain>/api/webhooks/shippo-track
//
// TESTNUMMERN (carrier = 'shippo'), um den Ablauf ohne echtes Paket
// durchzuspielen:
//   SHIPPO_PRE_TRANSIT   -> angekuendigt
//   SHIPPO_TRANSIT       -> unterwegs      (Versandanteil wird frei)
//   SHIPPO_DELIVERED     -> zugestellt     (Warenwert wird frei)
//   SHIPPO_RETURNED      -> Ruecklaeufer
//   SHIPPO_FAILURE       -> Zustellung gescheitert
// ============================================================

const SHIPPO_BASE = 'https://api.goshippo.com';

/* ------------------------------------------------------------
   Carrier-Liste fuer das Haendler-Dropdown.
   slug = Shippo-Kennung, label = Anzeige im Frontend.
   ------------------------------------------------------------ */
const CARRIERS = [
  { slug: 'dhl_express',   label: 'DHL Express' },
  { slug: 'dhl_germany',   label: 'DHL Paket (DE)' },
  { slug: 'dhl_ecommerce', label: 'DHL eCommerce' },
  { slug: 'ups',           label: 'UPS' },
  { slug: 'fedex',         label: 'FedEx' },
  { slug: 'usps',          label: 'USPS' },
  { slug: 'tnt',           label: 'TNT' },
  { slug: 'aramex',        label: 'Aramex' },
  { slug: 'shippo',        label: 'Shippo (nur Test)' },
];

function carrierLabel(slug) {
  const c = CARRIERS.find((x) => x.slug === String(slug || '').toLowerCase());
  return c ? c.label : (slug || '');
}

function isTestNumber(number) {
  return /^SHIPPO_[A-Z_]+$/.test(String(number || '').trim().toUpperCase());
}

/* ------------------------------------------------------------
   Carrier aus dem Nummernformat raten.
   Nur ein Vorschlag - der Haendler waehlt im Dropdown selbst.
   Bewusst konservativ: lieber null als falsch geraten, denn ein
   falscher Carrier laesst eine ECHTE Nummer als ungueltig aussehen.
   ------------------------------------------------------------ */
function guessCarrier(number) {
  const n = String(number || '').replace(/\s+/g, '').toUpperCase();
  if (!n) return null;
  if (isTestNumber(n)) return 'shippo';
  if (/^1Z[0-9A-Z]{16}$/.test(n)) return 'ups';
  if (/^JJD\d{10,20}$/.test(n)) return 'dhl_express';
  if (/^(00340|00341|003400)\d{10,15}$/.test(n)) return 'dhl_germany';
  if (/^\d{10}$/.test(n)) return 'dhl_express';     // DHL Express Waybill
  if (/^9[0-9]{19,21}$/.test(n)) return 'usps';
  if (/^\d{12}$/.test(n) || /^\d{15}$/.test(n) || /^\d{20}$/.test(n)) return 'fedex';
  return null;
}

/* ------------------------------------------------------------
   Direktlink zur Carrier-Seite - fuer Admin und Kunde, damit man
   den Verlauf auch manuell nachsehen kann.
   ------------------------------------------------------------ */
function trackingUrl(carrier, number) {
  const n = encodeURIComponent(String(number || '').trim());
  if (!n) return null;
  switch (String(carrier || '').toLowerCase()) {
    case 'dhl_express':
    case 'dhl_germany':
    case 'dhl_ecommerce':
      return 'https://www.dhl.com/de-de/home/tracking.html?tracking-id=' + n;
    case 'ups':
      return 'https://www.ups.com/track?tracknum=' + n;
    case 'fedex':
      return 'https://www.fedex.com/fedextrack/?trknbr=' + n;
    case 'usps':
      return 'https://tools.usps.com/go/TrackConfirmAction?tLabels=' + n;
    case 'aramex':
      return 'https://www.aramex.com/track/results?ShipmentNumber=' + n;
    default:
      return null;
  }
}

/* ------------------------------------------------------------
   Shippo-Status -> unsere Zustaende
   ------------------------------------------------------------ */
function mapState(shippoStatus) {
  switch (String(shippoStatus || '').toUpperCase()) {
    case 'PRE_TRANSIT': return 'pre_transit';
    case 'TRANSIT':     return 'in_transit';
    case 'DELIVERED':   return 'delivered';
    case 'RETURNED':    return 'returned';
    case 'FAILURE':     return 'failure';
    default:            return 'unknown';
  }
}

// Der Sendungsstatus, den wir in shipments.status schreiben.
function shipmentStatusFor(state) {
  switch (state) {
    case 'pre_transit':
    case 'in_transit': return 'in_transit';
    case 'delivered':  return 'delivered';
    case 'returned':   return 'returned';
    case 'failure':    return 'problem';
    default:           return null; // unbekannt -> Status nicht anfassen
  }
}

async function shippoGet(path) {
  const token = process.env.SHIPPO_API_TOKEN;
  if (!token) {
    const e = new Error('SHIPPO_API_TOKEN nicht gesetzt (Render -> Environment).');
    e.code = 'NO_TOKEN';
    throw e;
  }
  const r = await fetch(SHIPPO_BASE + path, {
    headers: { 'Authorization': 'ShippoToken ' + token },
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) {
    const e = new Error('Shippo ' + path + ' -> ' + r.status + ' ' +
      (data.detail || JSON.stringify(data).slice(0, 200)));
    e.code = (r.status === 404) ? 'NOT_FOUND' : 'HTTP_' + r.status;
    e.status = r.status;
    throw e;
  }
  return data;
}

async function shippoPost(path, body) {
  const token = process.env.SHIPPO_API_TOKEN;
  if (!token) {
    const e = new Error('SHIPPO_API_TOKEN nicht gesetzt.');
    e.code = 'NO_TOKEN';
    throw e;
  }
  const r = await fetch(SHIPPO_BASE + path, {
    method: 'POST',
    headers: { 'Authorization': 'ShippoToken ' + token, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) {
    throw new Error('Shippo ' + path + ' -> ' + r.status + ' ' +
      (data.detail || JSON.stringify(data).slice(0, 200)));
  }
  return data;
}

/* ------------------------------------------------------------
   HAUPTFUNKTION: Nummer beim Carrier pruefen.

   Rueckgabe (wirft NIE - ein Fehler beim Abruf darf nie als
   "Haendler hat betrogen" gewertet werden):
   {
     ok,          // Abfrage technisch erfolgreich?
     valid,       // Carrier kennt die Nummer
     state,       // unknown | pre_transit | in_transit | delivered | returned | failure
     status,      // passender shipments.status (oder null)
     carrier,     // verwendeter Carrier-Slug
     detail,      // Klartext fuer die Oberflaeche
     eta,         // YYYY-MM-DD oder null
     url,         // Direktlink zum Carrier
     error,       // Fehlertext, wenn ok=false
   }

   WICHTIG zur Unterscheidung:
     ok=false  -> WIR konnten nicht pruefen (Token fehlt, API down).
                  Nichts freigeben, aber auch niemanden beschuldigen.
     ok=true, valid=false -> der Carrier kennt die Nummer nicht.
                  Das ist der Fall "Haendler hat etwas erfunden".
   ------------------------------------------------------------ */
async function verify({ carrier, tracking_number }) {
  const num = String(tracking_number || '').replace(/\s+/g, '').trim();
  const slug = String(carrier || '').toLowerCase().trim() || guessCarrier(num);

  const base = {
    ok: false, valid: false, state: 'unknown', status: null,
    carrier: slug || null, detail: null, eta: null,
    url: trackingUrl(slug, num), error: null,
    checked_at: new Date().toISOString(),
  };

  if (!num) return { ...base, error: 'Keine Trackingnummer angegeben.' };
  if (!slug) {
    return { ...base, ok: true, valid: false,
      detail: 'Versanddienst konnte der Nummer nicht zugeordnet werden - bitte auswaehlen.' };
  }

  try {
    const d = await shippoGet('/tracks/' + encodeURIComponent(slug) + '/' + encodeURIComponent(num));
    const ts = d.tracking_status || {};
    const state = mapState(ts.status);
    const history = Array.isArray(d.tracking_history) ? d.tracking_history : [];

    // Der Carrier "kennt" die Nummer, wenn er einen echten Status oder
    // mindestens einen Verlaufseintrag liefert. UNKNOWN ohne Verlauf
    // heisst: die Nummer existiert dort nicht (oder noch nicht).
    const valid = (state !== 'unknown') || history.length > 0;

    return {
      ...base,
      ok: true,
      valid,
      state,
      status: shipmentStatusFor(state),
      carrier: d.carrier || slug,
      detail: ts.status_details ||
              (valid ? 'Vom Versanddienst bestaetigt.'
                     : 'Der Versanddienst kennt diese Nummer nicht.'),
      eta: d.eta ? String(d.eta).slice(0, 10) : null,
      url: trackingUrl(d.carrier || slug, num),
    };
  } catch (e) {
    // 404 ist eine ECHTE Aussage: die Nummer gibt es bei diesem Carrier nicht.
    if (e.code === 'NOT_FOUND') {
      return { ...base, ok: true, valid: false,
        detail: 'Der Versanddienst kennt diese Nummer nicht.' };
    }
    // Alles andere ist unser Problem, nicht das des Haendlers.
    return { ...base, ok: false, error: e.message };
  }
}

/* ------------------------------------------------------------
   Nummer bei Shippo registrieren, damit Statusaenderungen per
   Webhook kommen statt gepollt werden zu muessen.
   Optional - schlaegt es fehl, faellt alles auf verify() zurueck.
   ------------------------------------------------------------ */
async function subscribe({ carrier, tracking_number, metadata }) {
  const num = String(tracking_number || '').replace(/\s+/g, '').trim();
  const slug = String(carrier || '').toLowerCase().trim() || guessCarrier(num);
  if (!num || !slug) return null;
  try {
    return await shippoPost('/tracks/', {
      carrier: slug,
      tracking_number: num,
      metadata: String(metadata || '').slice(0, 100),
    });
  } catch (e) {
    console.warn('[tracking] Webhook-Registrierung fehlgeschlagen:', e.message);
    return null;
  }
}

/* ------------------------------------------------------------
   Webhook-Nutzlast von Shippo auf dasselbe Format bringen wie verify().
   Signaturpruefung hat Shippo beim Track-Webhook nicht; deshalb wird
   der gemeldete Status in der Verarbeitung noch einmal gegen
   verify() geprueft, bevor Geld bewegt wird.
   ------------------------------------------------------------ */
function parseWebhook(body) {
  const d = (body && body.data) ? body.data : body;
  if (!d || !d.tracking_number) return null;
  const ts = d.tracking_status || {};
  const state = mapState(ts.status);
  return {
    tracking_number: d.tracking_number,
    carrier: d.carrier || null,
    state,
    status: shipmentStatusFor(state),
    detail: ts.status_details || null,
    eta: d.eta ? String(d.eta).slice(0, 10) : null,
    metadata: d.metadata || null,
  };
}

module.exports = {
  CARRIERS, carrierLabel, guessCarrier, trackingUrl, isTestNumber,
  verify, subscribe, parseWebhook, mapState, shipmentStatusFor,
};
