// file: paymentProviders/pawapay.js   (ERSETZT die bisherige Datei)
// AFCARPARTS - pawaPay-Adapter (Merchant API V2)
// Phase C: Inkasso von afrikanischen Kunden per Mobile Money (Payment Page).
// Phase E (spaeter): Auszahlungen an afrikanische Haendler.
//
// Alle Secrets kommen aus process.env:
//   PAWAPAY_API_TOKEN   - Bearer-Token aus dem pawaPay-Dashboard
//   PAWAPAY_BASE_URL    - optional; Standard: https://api.pawapay.io (LIVE)
//                         Sandbox waere: https://api.sandbox.pawapay.io
//
// Wichtig zur V2-API (unterscheidet sich von V1):
//   - msisdn             heisst jetzt  phoneNumber
//   - statementDescription heisst jetzt customerMessage
//   - amount/currency liegen im Objekt  amountDetails
//   - Statusabfrage liefert { status: 'FOUND'|'NOT_FOUND', data: {...} }

const crypto = require('crypto');
const { PaymentProvider } = require('./base');

const DEFAULT_BASE = 'https://api.pawapay.io';

// ISO-2 (unsere DB) -> ISO-3 (pawaPay) + Landeswaehrung
// Nur Laender, die pawaPay grundsaetzlich unterstuetzt.
// NICHT enthalten (pawaPay hat dort kein Mobile Money): Angola (AO),
// Suedafrika (ZA). Diese laufen automatisch ueber Stripe/Payoneer.
const COUNTRY_MAP = {
  BJ: { iso3: 'BEN', currency: 'XOF', dial: '229' },
  BF: { iso3: 'BFA', currency: 'XOF', dial: '226' },
  CM: { iso3: 'CMR', currency: 'XAF', dial: '237' },
  CD: { iso3: 'COD', currency: 'CDF', dial: '243' },
  CG: { iso3: 'COG', currency: 'XAF', dial: '242' },
  CI: { iso3: 'CIV', currency: 'XOF', dial: '225' },
  GA: { iso3: 'GAB', currency: 'XAF', dial: '241' },
  GH: { iso3: 'GHA', currency: 'GHS', dial: '233' },
  KE: { iso3: 'KEN', currency: 'KES', dial: '254' },
  MW: { iso3: 'MWI', currency: 'MWK', dial: '265' },
  ML: { iso3: 'MLI', currency: 'XOF', dial: '223' },
  MZ: { iso3: 'MOZ', currency: 'MZN', dial: '258' },
  NG: { iso3: 'NGA', currency: 'NGN', dial: '234' },
  RW: { iso3: 'RWA', currency: 'RWF', dial: '250' },
  SN: { iso3: 'SEN', currency: 'XOF', dial: '221' },
  SL: { iso3: 'SLE', currency: 'SLE', dial: '232' },
  TZ: { iso3: 'TZA', currency: 'TZS', dial: '255' },
  UG: { iso3: 'UGA', currency: 'UGX', dial: '256' },
  ZM: { iso3: 'ZMB', currency: 'ZMW', dial: '260' },
  ZW: { iso3: 'ZWE', currency: 'USD', dial: '263' }, // Simbabwe rechnet in USD ab
};

// Waehrungen ohne Nachkommastellen bei Mobile Money.
const ZERO_DECIMAL = ['XOF', 'XAF', 'CDF', 'RWF', 'UGX', 'TZS', 'MWK', 'NGN'];

/* ------------------------------------------------------------
   TELEFONNUMMER fuer pawaPay aufbereiten
   pawaPay erwartet die Nummer im internationalen Format OHNE '+'
   (z. B. 233241234567) und nur aus DEM Land der Zahlung.
   Liefert null, wenn die Nummer nicht zum Land passt (z. B. eine
   deutsche Nummer bei einer Ghana-Bestellung). Dann schicken wir
   KEINE Nummer mit - der Kunde gibt sie auf der pawaPay-Seite ein.
   ------------------------------------------------------------ */
function normalizePhone(phone, iso2) {
  const info = COUNTRY_MAP[String(iso2 || '').toUpperCase()];
  if (!info || !info.dial) return null;
  let d = String(phone || '').replace(/[^0-9]/g, '');
  if (!d) return null;
  if (d.indexOf('00') === 0) d = d.slice(2);                 // 00233... -> 233...
  if (d.indexOf(info.dial) !== 0) {
    if (d.charAt(0) === '0') d = info.dial + d.slice(1);     // 0241... -> 233241...
    else if (d.length <= 9) d = info.dial + d;               // 241234567 -> 233241234567
    else return null;                                        // andere Landesvorwahl
  }
  const local = d.slice(info.dial.length);
  if (local.length < 7 || local.length > 10) return null;    // unplausibel
  return d;
}

/* ------------------------------------------------------------
   AUSGESCHLOSSENE LAENDER (Entscheidung 08/2026)
   Nigeria und Ghana sind bei pawaPay zwar Maerkte, aber fuer unser
   Konto nicht nutzbar. Beide laufen deshalb komplett anders:
     Inkasso     -> Stripe   (Karte, Bank, internationale Karten)
     Auszahlung  -> Payoneer
   Angola und Suedafrika stehen gar nicht erst im COUNTRY_MAP und
   fallen dadurch automatisch in dieselbe Schiene.

   Ueber ENV umschaltbar, damit eine Freischaltung durch pawaPay
   ohne Code-Deploy wirksam wird:
     PAWAPAY_EXCLUDED_COUNTRIES=GH     -> nur Ghana bleibt draussen
     PAWAPAY_EXCLUDED_COUNTRIES=none   -> nichts ausgeschlossen
   ------------------------------------------------------------ */
const EXCLUDED_DEFAULT = ['NG', 'GH'];

function excludedCountries() {
  const raw = process.env.PAWAPAY_EXCLUDED_COUNTRIES;
  if (raw === undefined || raw === null || raw === '') return EXCLUDED_DEFAULT;
  const v = String(raw).trim().toLowerCase();
  if (v === 'none' || v === '-') return [];
  return String(raw).split(/[,;\s]+/).map(function (s) {
    return s.trim().toUpperCase();
  }).filter(Boolean);
}

class PawaPayProvider extends PaymentProvider {
  constructor() {
    super('pawapay');
    if (!process.env.PAWAPAY_API_TOKEN) {
      throw new Error('PAWAPAY_API_TOKEN fehlt (Render Environment)');
    }
    this.token = process.env.PAWAPAY_API_TOKEN;
    this.base = (process.env.PAWAPAY_BASE_URL || DEFAULT_BASE).replace(/\/+$/, '');
    this._fx = { at: 0, rates: null }; // Wechselkurs-Cache
  }

  static countryInfo(iso2) {
    return COUNTRY_MAP[String(iso2 || '').toUpperCase()] || null;
  }

  // Technische pawaPay-Abdeckung, ohne unsere Ausschluesse.
  static isKnownCountry(iso2) {
    return !!COUNTRY_MAP[String(iso2 || '').toUpperCase()];
  }

  // Ist dieses Land fuer uns AKTIV (Inkasso UND Auszahlung)?
  static isEnabled(iso2) {
    const c = String(iso2 || '').toUpperCase();
    if (!COUNTRY_MAP[c]) return false;
    return excludedCountries().indexOf(c) === -1;
  }

  // Inkasso vom Kunden per Mobile Money moeglich?
  static isCollectSupported(iso2) {
    return PawaPayProvider.isEnabled(iso2);
  }

  // Auszahlung an einen Haendler per Mobile Money moeglich?
  static isPayoutSupported(iso2) {
    return PawaPayProvider.isEnabled(iso2);
  }

  // Rueckwaerts-kompatibler Alias. Absichtlich auf die ENGERE
  // Inkasso-Pruefung gemappt: falls irgendwo noch eine alte Aufrufstelle
  // steht, faellt sie auf die sichere Variante zurueck.
  static isSupported(iso2) {
    return PawaPayProvider.isCollectSupported(iso2);
  }

  // Alle technisch bekannten Laender (inkl. ausgeschlossener).
  static supportedCountries() {
    return Object.keys(COUNTRY_MAP);
  }

  // Fuer uns aktive Laender - das ist die Liste fuer Routing & Dropdowns.
  static enabledCountries() {
    const ex = excludedCountries();
    return Object.keys(COUNTRY_MAP).filter(function (c) { return ex.indexOf(c) === -1; });
  }
  static collectCountries() { return PawaPayProvider.enabledCountries(); }
  static payoutCountries()  { return PawaPayProvider.enabledCountries(); }

  // Welche Laender sind aktuell ausgeschlossen? (fuer Admin/Diagnose)
  static excludedCountries() { return excludedCountries(); }

  // ---- HTTP-Grundlage ----
  async _req(method, path, body) {
    const url = this.base + path;
    const opts = {
      method,
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json',
      },
    };
    if (body !== undefined) opts.body = JSON.stringify(body);

    const r = await fetch(url, opts);
    const text = await r.text();
    let json = null;
    try { json = text ? JSON.parse(text) : null; } catch (e) { /* kein JSON */ }

    if (!r.ok) {
      const fr = json && json.failureReason;
      const msg = (fr && (fr.failureMessage || fr.failureCode))
        || (json && json.message)
        || ('pawaPay HTTP ' + r.status);
      console.error('[pawapay] ' + method + ' ' + path + ' -> HTTP ' + r.status + ' ' +
        String(text || '').slice(0, 500));
      const detail = String(text || '').slice(0, 300);
      const err = new Error(msg + (detail && msg.indexOf(detail) === -1 ? ' - Antwort: ' + detail : ''));
      err.status = r.status;
      err.failureCode = fr ? fr.failureCode : null;
      err.body = json || text;
      throw err;
    }
    return json;
  }

  // ---- WECHSELKURS USD -> Lokalwaehrung ----
  // Reihenfolge: 1) ENV-Override  2) Live-Kurs (6 h Cache)
  // ENV-Override (optional, JSON):  PAWAPAY_FX_RATES={"GHS":11.2,"NGN":1350}
  async fxRate(currency) {
    const cur = String(currency || '').toUpperCase();
    if (cur === 'USD') return 1;

    if (process.env.PAWAPAY_FX_RATES) {
      try {
        const manual = JSON.parse(process.env.PAWAPAY_FX_RATES);
        if (manual && manual[cur]) return Number(manual[cur]);
      } catch (e) {
        console.warn('[pawapay] PAWAPAY_FX_RATES ist kein gueltiges JSON - wird ignoriert');
      }
    }

    const SIX_HOURS = 6 * 60 * 60 * 1000;
    if (!this._fx.rates || (Date.now() - this._fx.at) > SIX_HOURS) {
      try {
        const r = await fetch('https://open.er-api.com/v6/latest/USD');
        const d = await r.json();
        if (d && d.result === 'success' && d.rates) {
          this._fx = { at: Date.now(), rates: d.rates };
        }
      } catch (e) {
        console.error('[pawapay] Wechselkurs-Abruf fehlgeschlagen:', e.message);
      }
    }
    const rate = this._fx.rates ? this._fx.rates[cur] : null;
    if (!rate) throw new Error('Kein Wechselkurs fuer ' + cur + ' verfuegbar');
    return Number(rate);
  }

  // USD-Betrag in Lokalwaehrung umrechnen und providergerecht runden.
  async convertFromUsd(amountUsd, currency) {
    const rate = await this.fxRate(currency);
    const raw = Number(amountUsd) * rate;
    const cur = String(currency).toUpperCase();
    // Aufrunden, damit nie zu wenig kassiert wird.
    const value = ZERO_DECIMAL.includes(cur)
      ? String(Math.ceil(raw))
      : (Math.ceil(raw * 100) / 100).toFixed(2);
    return { amount: value, currency: cur, rate };
  }

  // ---- PAYMENT PAGE (Inkasso) ----
  // Erzeugt eine gehostete Zahlseite und liefert { depositId, redirectUrl, ... }.
  async createPaymentPage({ depositId, amountUsd, countryIso2, returnUrl, reason, phoneNumber, language, metadata }) {
    if (!PawaPayProvider.isCollectSupported(countryIso2)) {
      throw new Error('Mobile Money ist fuer dieses Land nicht verfuegbar: ' + countryIso2);
    }
    const info = PawaPayProvider.countryInfo(countryIso2);
    if (!info) throw new Error('Land wird von pawaPay nicht unterstuetzt: ' + countryIso2);

    const conv = await this.convertFromUsd(amountUsd, info.currency);

    const body = {
      depositId,
      returnUrl,
      country: info.iso3,
      amountDetails: { amount: conv.amount, currency: conv.currency },
    };
    // customerMessage: 4-22 Zeichen, nur Buchstaben/Ziffern/Leerzeichen
    const msg = String(reason || 'AFCARPARTS order').replace(/[^a-zA-Z0-9 ]/g, ' ').trim().slice(0, 22);
    if (msg.length >= 4) body.customerMessage = msg;
    if (reason) body.reason = String(reason).slice(0, 100);
    const normPhone = normalizePhone(phoneNumber, countryIso2);
    if (normPhone) body.phoneNumber = normPhone;
    if (language) body.language = String(language).toUpperCase().slice(0, 2);
    if (metadata && Object.keys(metadata).length) {
      body.metadata = Object.keys(metadata).slice(0, 10).map((k) => {
        const o = {}; o[k] = String(metadata[k]); return o;
      });
    }

    let res = await this._req('POST', '/v2/paymentpage', body);

    // Nummer abgelehnt -> ohne Nummer erneut versuchen. Der Kunde gibt sie
    // dann auf der pawaPay-Seite selbst ein. Gleiche depositId ist hier
    // unkritisch, weil pawaPay die abgelehnte Anfrage nicht angelegt hat.
    const frFirst = res && res.failureReason;
    if (frFirst && frFirst.failureCode === 'INVALID_PHONE_NUMBER' && body.phoneNumber) {
      console.warn('[pawapay/paymentpage] Nummer abgelehnt, zweiter Versuch ohne Nummer');
      delete body.phoneNumber;
      res = await this._req('POST', '/v2/paymentpage', body);
    }

    // pawaPay antwortet bei Ablehnung mit status REJECTED + failureReason
    // (teils auch nur mit failureReason, ohne status)
    if (res && (res.status === 'REJECTED' || (res.failureReason && !res.redirectUrl))) {
      const fr = res.failureReason || {};
      const err = new Error(fr.failureMessage || fr.failureCode || 'pawaPay hat die Zahlung abgelehnt');
      err.failureCode = fr.failureCode || null;
      throw err;
    }
    if (!res || !res.redirectUrl) {
      // Rohantwort sichtbar machen - sonst ist die Ursache nicht erkennbar
      // (z. B. Sandbox-Token gegen Live-URL, Land/Waehrung nicht freigeschaltet).
      let raw;
      try { raw = JSON.stringify(res); } catch (e) { raw = String(res); }
      console.error('[pawapay/paymentpage] keine redirectUrl. base=' + this.base +
        ' country=' + info.iso3 + ' amount=' + conv.amount + ' ' + conv.currency +
        ' antwort=' + raw);
      const err = new Error('pawaPay hat keine redirectUrl geliefert - Antwort: ' +
        (raw && raw !== 'null' ? raw.slice(0, 300) : '(leer)'));
      err.failureCode = (res && res.failureReason && res.failureReason.failureCode) || null;
      err.body = res;
      throw err;
    }

    return {
      depositId,
      redirectUrl: res.redirectUrl,
      amountLocal: conv.amount,
      currency: conv.currency,
      rate: conv.rate,
      country: info.iso3,
    };
  }

  // ---- STATUSABFRAGE ----
  // Liefert immer ein normalisiertes Objekt:
  //   { found, status, amount, currency, country, providerTransactionId, failureCode, failureMessage, raw }
  // status ist einer von: ACCEPTED | PROCESSING | IN_RECONCILIATION | COMPLETED | FAILED | NOT_FOUND
  async checkDeposit(depositId) {
    const res = await this._req('GET', '/v2/deposits/' + encodeURIComponent(depositId));
    if (!res || res.status === 'NOT_FOUND' || !res.data) {
      return { found: false, status: 'NOT_FOUND', raw: res };
    }
    return this.normalizeDeposit(res.data);
  }

  // Normalisiert ein Deposit-Objekt (aus Statusabfrage ODER Callback).
  normalizeDeposit(d) {
    if (!d) return { found: false, status: 'NOT_FOUND', raw: null };
    const fr = d.failureReason || {};
    return {
      found: true,
      depositId: d.depositId || null,
      status: d.status || null,
      amount: d.amount || null,
      currency: d.currency || null,
      country: d.country || null,
      providerTransactionId: d.providerTransactionId || null,
      failureCode: fr.failureCode || null,
      failureMessage: fr.failureMessage || null,
      raw: d,
    };
  }

  // Callback-Body -> normalisiertes Deposit.
  // pawaPay schickt das Deposit-Objekt direkt; defensiv auch { data: {...} } akzeptieren.
  parseCallback(body) {
    const d = (body && body.data) ? body.data : body;
    return this.normalizeDeposit(d);
  }

  // Ist der Status endgueltig? (Nur dann Bestellung final setzen.)
  static isFinal(status) {
    return status === 'COMPLETED' || status === 'FAILED';
  }

  // ---- TOOLKIT ----
  // Validiert eine Rufnummer und sagt den Provider voraus.
  async predictProvider(phoneNumber) {
    const num = String(phoneNumber || '').replace(/[^0-9]/g, '');
    return this._req('POST', '/v2/predict-provider', { phoneNumber: num });
  }

  // Fuer dein Konto freigeschaltete Laender/Provider/Limits.
  async activeConfiguration() {
    return this._req('GET', '/v2/active-conf');
  }

  // ---- PAYOUTS (Phase E - hier nur vorbereitet) ----
  async createPayout({ payoutId, phoneNumber, provider, amount, currency, customerMessage }) {
    const body = {
      payoutId,
      recipient: {
        type: 'MMO',
        accountDetails: {
          phoneNumber: String(phoneNumber).replace(/[^0-9]/g, ''),
          provider,
        },
      },
      amount: String(amount),
      currency: String(currency).toUpperCase(),
    };
    if (customerMessage) {
      const m = String(customerMessage).replace(/[^a-zA-Z0-9 ]/g, ' ').trim().slice(0, 22);
      if (m.length >= 4) body.customerMessage = m;
    }
    return this._req('POST', '/v2/payouts', body);
  }

  async checkPayout(payoutId) {
    return this._req('GET', '/v2/payouts/' + encodeURIComponent(payoutId));
  }

  // UUIDv4 fuer depositId / payoutId
  static newId() {
    return crypto.randomUUID();
  }
}

module.exports = PawaPayProvider;
module.exports.PawaPayProvider = PawaPayProvider;
module.exports.COUNTRY_MAP = COUNTRY_MAP;
module.exports.normalizePhone = normalizePhone;
