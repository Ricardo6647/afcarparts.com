// file: shippingProviders.js  (NEUE DATEI, ins Backend-Repo neben shippingDb.js)
// Provider-Adapter fuer Versandlabels.
//   Testphase : Shippo (Test-Token -> kostenlose Sample-Labels mit Wasserzeichen "SAMPLE - DO NOT MAIL")
//   Vor Live  : Terminal Africa (innerafrikanischer Versand) -> Branch createLabelTerminal unten
//
// Aktiver Provider via ENV  SHIPPING_PROVIDER = 'shippo' | 'terminal'   (Default 'shippo')
// Shippo-Test-Token via ENV SHIPPO_API_TOKEN                            (beginnt mit shippo_test_)
//
// Normalisiertes Ergebnis (passt 1:1 in shippingDb.setShipmentTracking):
//   { provider, provider_shipment_id, carrier, tracking_number, label_url, cost_usd }
//
// Nutzt global fetch (Node 18+, wie der Rest von server.js).

const SHIPPO_BASE = 'https://api.goshippo.com';

function activeProvider() {
  return (process.env.SHIPPING_PROVIDER || 'shippo').toLowerCase().trim();
}

// Standard-Paketmasse (cm / kg) - per ENV ueberschreibbar, sonst Kleinteil-Default.
// weightKg uebersteuert das Gewicht (z. B. summiertes Produktgewicht einer Sendung).
function defaultParcel(weightKg) {
  const w = (weightKg && weightKg > 0) ? weightKg : (process.env.SHIP_PARCEL_KG || '1');
  return {
    length: process.env.SHIP_PARCEL_L || '20',
    width:  process.env.SHIP_PARCEL_W || '15',
    height: process.env.SHIP_PARCEL_H || '10',
    distance_unit: 'cm',
    weight: String(w),
    mass_unit: 'kg',
  };
}

// Verifizierbare US-Adressen, damit USPS im Shippo-Testmodus zuverlaessig eine Rate
// + ein Sample-Label liefert (Test-Carrier sind US-domestic). Der Empfaenger-NAME wird
// mit der echten Abholstation befuellt, damit das Label zuordenbar bleibt; die ECHTEN
// afrikanischen Adressen zaehlen erst beim Live-Provider (Terminal Africa).
// Absender per ENV ueberschreibbar (SHIP_FROM_*), Default = Shippo-Beispieladresse.
function shippoTestFrom() {
  return {
    name:    process.env.SHIP_FROM_NAME    || 'AFCARPARTS Warehouse',
    company: 'AFCARPARTS',
    street1: process.env.SHIP_FROM_STREET  || '215 Clayton St.',
    city:    process.env.SHIP_FROM_CITY    || 'San Francisco',
    state:   process.env.SHIP_FROM_STATE   || 'CA',
    zip:     process.env.SHIP_FROM_ZIP     || '94117',
    country: process.env.SHIP_FROM_COUNTRY || 'US',
    phone:   process.env.SHIP_FROM_PHONE   || '+1 555 341 9393',
    email:   process.env.SHIP_FROM_EMAIL   || 'warehouse@afcarparts.com',
  };
}

function shippoTestTo(shipment) {
  const station = [shipment.pickup_station_name, shipment.pickup_station_city]
    .filter(Boolean).join(' / ');
  return {
    name:    station || ('Order ' + (shipment.order_id || '')),
    company: 'AFCARPARTS Pickup',
    street1: '1600 Pennsylvania Ave NW',
    city:    'Washington',
    state:   'DC',
    zip:     '20500',
    country: 'US',
    phone:   '+1 202 555 0100',
    email:   'pickup@afcarparts.com',
    metadata: 'shipment ' + shipment.id + ' / order ' + shipment.order_id,
  };
}

async function shippoFetch(path, body) {
  const token = process.env.SHIPPO_API_TOKEN;
  if (!token) {
    const e = new Error('SHIPPO_API_TOKEN nicht gesetzt (Render -> Environment).');
    e.code = 'NO_TOKEN';
    throw e;
  }
  const r = await fetch(SHIPPO_BASE + path, {
    method: 'POST',
    headers: {
      'Authorization': 'ShippoToken ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) {
    throw new Error('Shippo ' + path + ' -> ' + r.status + ' ' +
      (data.detail || JSON.stringify(data).slice(0, 300)));
  }
  return data;
}

// Shippo: Shipment anlegen (liefert Rates) -> guenstigste Rate -> Transaction (Label).
async function createLabelShippo(shipment) {
  const shipmentObj = await shippoFetch('/shipments/', {
    address_from: shippoTestFrom(),
    address_to: shippoTestTo(shipment),
    parcels: [defaultParcel(shipment && shipment.weight_kg)],
    async: false,
  });

  const rates = (shipmentObj.rates || []).filter((x) => x && x.object_id);
  if (!rates.length) {
    throw new Error('Shippo: keine Rates erhalten (Carrier/Adresse pruefen). messages=' +
      JSON.stringify(shipmentObj.messages || []).slice(0, 300));
  }
  // guenstigste Rate waehlen
  rates.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));
  const rate = rates[0];

  const tx = await shippoFetch('/transactions/', {
    rate: rate.object_id,
    label_file_type: 'PDF',
    async: false,
  });

  if (tx.status !== 'SUCCESS') {
    throw new Error('Shippo Transaction status=' + tx.status + ' ' +
      JSON.stringify(tx.messages || []).slice(0, 300));
  }

  return {
    provider: 'shippo',
    provider_shipment_id: shipmentObj.object_id || tx.object_id || null,
    carrier: rate.provider || null,
    tracking_number: tx.tracking_number || null,
    label_url: tx.label_url || null,
    cost_usd: rate.amount ? parseFloat(rate.amount) : 0,
  };
}

// Terminal Africa - Platzhalter fuer Live (innerafrikanischer Versand).
// Struktur steht, Implementierung folgt vor dem Go-Live.
async function createLabelTerminal(/* shipment */) {
  const e = new Error('Provider "terminal" (Terminal Africa) ist noch nicht konfiguriert.');
  e.code = 'NOT_CONFIGURED';
  throw e;
}

// Dispatch: erzeugt ein Label fuer eine Sendung beim aktiven Provider.
// shipment muss enthalten: id, order_id, (optional) pickup_station_name, pickup_station_city
async function createLabel(shipment) {
  const p = activeProvider();
  if (p === 'terminal') return createLabelTerminal(shipment);
  return createLabelShippo(shipment);
}

/* ============================================================
   VERSANDKOSTEN-SCHAETZUNG (Checkout)  -  Hybrid B + A-Fallback
   ------------------------------------------------------------
   A-Fallback (regelbasiert): Basis + pro-kg, beide per ENV tunebar.
     SHIP_FALLBACK_BASE_USD     (Default 8)
     SHIP_FALLBACK_PER_KG_USD   (Default 2.5)
   B-Carrier-Rate: echte Provider-Rate (nur abgefragt, KEIN Label-Kauf).
     - terminal (Live): Terminal-Africa-Rate -> Fallback bei Fehler
     - shippo  (Test) : standardmaessig FALLBACK (Shippo-Test liefert nur
       US-Preise, fuer Afrika unrealistisch). Mit SHIP_QUOTE_USE_SHIPPO=1
       kann die Shippo-Rate zu Testzwecken erzwungen werden.
   quote() wirft NIE - der Checkout darf nie an der Schaetzung scheitern.
   ============================================================ */

function defaultWeightKg() {
  const w = parseFloat(process.env.SHIP_DEFAULT_WEIGHT_KG || '2');
  return (w > 0) ? w : 2;
}

function round2(n) { return Math.round((Number(n) || 0) * 100) / 100; }

function fallbackQuote(weightKg) {
  const base = parseFloat(process.env.SHIP_FALLBACK_BASE_USD || '8');
  const perKg = parseFloat(process.env.SHIP_FALLBACK_PER_KG_USD || '2.5');
  const w = (weightKg && weightKg > 0) ? weightKg : defaultWeightKg();
  return { cost_usd: round2(base + perKg * w), source: 'fallback', carrier: null };
}

// Shippo-Rate (nur Schaetzung, ohne Label-Kauf). Nutzt dieselben Test-Adressen.
async function shippoRateOnly(weightKg) {
  const shipmentObj = await shippoFetch('/shipments/', {
    address_from: shippoTestFrom(),
    address_to: { name: 'Quote', street1: '1600 Pennsylvania Ave NW', city: 'Washington', state: 'DC', zip: '20500', country: 'US' },
    parcels: [defaultParcel(weightKg)],
    async: false,
  });
  const rates = (shipmentObj.rates || []).filter((x) => x && x.object_id);
  if (!rates.length) throw new Error('Shippo: keine Rates');
  rates.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));
  return { cost_usd: round2(parseFloat(rates[0].amount)), source: 'carrier', carrier: rates[0].provider || null };
}

// Terminal Africa - Rate (Platzhalter bis Live-Anbindung).
async function terminalRateOnly(/* weightKg, destination */) {
  const e = new Error('Terminal Africa Rate noch nicht konfiguriert.');
  e.code = 'NOT_CONFIGURED';
  throw e;
}

// Schaetzt die Versandkosten EINER Sendung (ein Haendler) anhand Gewicht + Ziel.
// Liefert immer ein Ergebnis (Fallback, wenn Carrier nicht verfuegbar/fehlerhaft).
async function quote({ weightKg, destination } = {}) {
  const p = activeProvider();
  try {
    if (p === 'terminal') {
      return await terminalRateOnly(weightKg, destination);
    }
    if (process.env.SHIP_QUOTE_USE_SHIPPO === '1') {
      return await shippoRateOnly(weightKg);
    }
    // Testmodus-Default: regelbasierter Fallback (realistischer als US-Testpreise)
    return fallbackQuote(weightKg);
  } catch (e) {
    return fallbackQuote(weightKg);
  }
}

module.exports = { activeProvider, createLabel, quote, fallbackQuote, defaultWeightKg };
