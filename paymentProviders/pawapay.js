// file: paymentProviders/pawapay.js
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
// Nur Laender, die pawaPay unterstuetzt.
const COUNTRY_MAP = {
  BJ: { iso3: 'BEN', currency: 'XOF' },
  BF: { iso3: 'BFA', currency: 'XOF' },
  CM: { iso3: 'CMR', currency: 'XAF' },
  CD: { iso3: 'COD', currency: 'CDF' },
  CG: { iso3: 'COG', currency: 'XAF' },
  CI: { iso3: 'CIV', currency: 'XOF' },
  GA: { iso3: 'GAB', currency: 'XAF' },
  GH: { iso3: 'GHA', currency: 'GHS' },
  KE: { iso3: 'KEN', currency: 'KES' },
  MW: { iso3: 'MWI', currency: 'MWK' },
  ML: { iso3: 'MLI', currency: 'XOF' },
  MZ: { iso3: 'MOZ', currency: 'MZN' },
  NG: { iso3: 'NGA', currency: 'NGN' },
  RW: { iso3: 'RWA', currency: 'RWF' },
  SN: { iso3: 'SEN', currency: 'XOF' },
  SL: { iso3: 'SLE', currency: 'SLE' },
  TZ: { iso3: 'TZA', currency: 'TZS' },
  UG: { iso3: 'UGA', currency: 'UGX' },
  ZM: { iso3: 'ZMB', currency: 'ZMW' },
  ZW: { iso3: 'ZWE', currency: 'USD' }, // Simbabwe rechnet in USD ab
};

// Waehrungen ohne Nachkommastellen bei Mobile Money.
const ZERO_DECIMAL = ['XOF', 'XAF', 'CDF', 'RWF', 'UGX', 'TZS', 'MWK', 'NGN'];

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
  static isSupported(iso2) {
    return !!COUNTRY_MAP[String(iso2 || '').toUpperCase()];
  }
  static supportedCountries() {
    return Object.keys(COUNTRY_MAP);
  }

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
      const err = new Error(msg);
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
    if (phoneNumber) body.phoneNumber = String(phoneNumber).replace(/[^0-9]/g, '');
    if (language) body.language = String(language).toUpperCase().slice(0, 2);
    if (metadata && Object.keys(metadata).length) {
      body.metadata = Object.keys(metadata).slice(0, 10).map((k) => {
        const o = {}; o[k] = String(metadata[k]); return o;
      });
    }

    const res = await this._req('POST', '/v2/paymentpage', body);

    // pawaPay antwortet bei Ablehnung mit status REJECTED + failureReason
    if (res && res.status === 'REJECTED') {
      const fr = res.failureReason || {};
      const err = new Error(fr.failureMessage || fr.failureCode || 'pawaPay hat die Zahlung abgelehnt');
      err.failureCode = fr.failureCode || null;
      throw err;
    }
    if (!res || !res.redirectUrl) throw new Error('pawaPay hat keine redirectUrl geliefert');

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
