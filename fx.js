// file: fx.js
// AFCARPARTS - Wechselkurse mit EINFRIERUNG zum Bestellzeitpunkt
//
// Grundsatz: Ein Kurs, der einer Bestellung zugeordnet ist, wird NIE
// neu berechnet. Er wird beim Anlegen der Bestellung ermittelt, in
// orders.fx_rate gespeichert und danach nur noch gelesen. Alle Berichte,
// Guthaben und Nachweise rechnen mit genau diesem Kurs.
//
// Warum das wichtig ist: Ein Haendler verkauft fuer 100 USD, wir kassieren
// GHS zum Kurs 11,2. Zahlen wir drei Wochen spaeter zum Kurs 13 aus, haben
// wir 16 % mehr bezahlt, als wir eingenommen haben - bei jeder Bestellung.
// Mit eingefrorenem Kurs steht die Schuld fest, sobald der Kunde zahlt.
//
// ENV:
//   FX_BASE_CURRENCY  - Berichtswaehrung, Standard 'USD'
//   FX_RATES          - manuelle Kurse als JSON, z. B. {"GHS":11.2,"NGN":1350}
//                       (Basis -> Zielwaehrung). Hat IMMER Vorrang.
//   FX_PROVIDER_URL   - Alternative Kursquelle, Standard open.er-api.com

const { query } = require('./db');

const BASE = String(process.env.FX_BASE_CURRENCY || 'USD').toUpperCase();
const PROVIDER_URL = process.env.FX_PROVIDER_URL || 'https://open.er-api.com/v6/latest/';
const CACHE_MS = 6 * 60 * 60 * 1000; // 6 Stunden

const _cache = { at: 0, base: null, rates: null, source: null };

function baseCurrency() { return BASE; }

function manualRates() {
  if (!process.env.FX_RATES) return null;
  try {
    const parsed = JSON.parse(process.env.FX_RATES);
    return (parsed && typeof parsed === 'object') ? parsed : null;
  } catch (e) {
    console.warn('[fx] FX_RATES ist kein gueltiges JSON - wird ignoriert');
    return null;
  }
}

// Kurstabelle mit Basis BASE laden (gecached).
async function loadRates() {
  if (_cache.rates && _cache.base === BASE && (Date.now() - _cache.at) < CACHE_MS) {
    return _cache;
  }
  try {
    const r = await fetch(PROVIDER_URL + BASE);
    const d = await r.json();
    if (d && d.rates && Object.keys(d.rates).length) {
      _cache.at = Date.now();
      _cache.base = BASE;
      _cache.rates = d.rates;
      _cache.source = 'open.er-api.com';
      return _cache;
    }
    throw new Error('Antwort ohne rates');
  } catch (e) {
    console.error('[fx] Kursabruf fehlgeschlagen:', e.message);
    // Alten Cache weiterverwenden statt zu scheitern - ein leicht
    // veralteter Kurs ist besser als eine abgebrochene Bestellung.
    if (_cache.rates) return _cache;
    throw new Error('Keine Wechselkurse verfuegbar');
  }
}

/* ------------------------------------------------------------
   Kurs von `from` nach `to`.
   Rueckgabe: { rate, source, at }
   rate bedeutet:  betrag_in_from * rate = betrag_in_to
   ------------------------------------------------------------ */
async function getRate(from, to) {
  const f = String(from || BASE).toUpperCase();
  const t = String(to || BASE).toUpperCase();
  if (f === t) return { rate: 1, source: 'identity', at: new Date().toISOString() };

  // 1) Manuelle Kurse (Basis -> Zielwaehrung)
  const manual = manualRates();
  if (manual) {
    if (f === BASE && manual[t]) {
      return { rate: Number(manual[t]), source: 'env', at: new Date().toISOString() };
    }
    if (t === BASE && manual[f]) {
      return { rate: 1 / Number(manual[f]), source: 'env', at: new Date().toISOString() };
    }
  }

  // 2) Live-Kurse mit Basis BASE; Kreuzkurs ueber die Basis rechnen.
  const c = await loadRates();
  const rf = (f === BASE) ? 1 : Number(c.rates[f]);
  const rt = (t === BASE) ? 1 : Number(c.rates[t]);
  if (!rf || !rt) throw new Error('Kein Wechselkurs fuer ' + f + '->' + t);

  return { rate: rt / rf, source: c.source, at: new Date(c.at).toISOString() };
}

/* ------------------------------------------------------------
   Kurs fuer eine Bestellung EINFRIEREN.
   Liefert alles, was in orders geschrieben wird. Wird genau einmal
   beim Anlegen der Bestellung aufgerufen.
   fx_rate: Bestellwaehrung -> Berichtswaehrung
   ------------------------------------------------------------ */
async function freezeForOrder(orderCurrency) {
  const cur = String(orderCurrency || BASE).toUpperCase();
  try {
    const r = await getRate(cur, BASE);
    await snapshot(cur, BASE, r.rate, r.source);
    return {
      base_currency: BASE,
      fx_rate: r.rate,
      fx_source: r.source,
      fx_at: new Date().toISOString(),
    };
  } catch (e) {
    // Kurs nicht ermittelbar: Bestellung darf trotzdem entstehen.
    // Kurs 1 mit Quelle 'unavailable' macht den Fall im Bericht sichtbar,
    // statt ihn stillschweigend als korrekt auszugeben.
    console.error('[fx] Einfrieren fehlgeschlagen fuer', cur, '-', e.message);
    return {
      base_currency: BASE,
      fx_rate: cur === BASE ? 1 : 0,
      fx_source: cur === BASE ? 'identity' : 'unavailable',
      fx_at: new Date().toISOString(),
    };
  }
}

// Kurs zur Nachvollziehbarkeit protokollieren (taeglich ein Eintrag je Paar).
async function snapshot(from, to, rate, source) {
  try {
    await query(
      `INSERT INTO fx_rates (from_currency, to_currency, rate, source, day)
       VALUES ($1, $2, $3, $4, CURRENT_DATE)
       ON CONFLICT (from_currency, to_currency, day) DO NOTHING`,
      [String(from).toUpperCase(), String(to).toUpperCase(), rate, source || null]
    );
  } catch (e) {
    // Protokoll ist Beiwerk - darf eine Bestellung nie blockieren.
    if (!/relation .*fx_rates.* does not exist/i.test(e.message)) {
      console.warn('[fx] Snapshot nicht gespeichert:', e.message);
    }
  }
}

// Betrag mit einem BEREITS eingefrorenen Kurs umrechnen.
function convertWithFrozen(amount, frozenRate) {
  const a = Number(amount) || 0;
  const r = Number(frozenRate);
  if (!r || r <= 0) return null; // Kurs fehlt -> bewusst null, nicht 0
  return Math.round(a * r * 100) / 100;
}

module.exports = {
  baseCurrency, getRate, freezeForOrder, snapshot, convertWithFrozen,
};
