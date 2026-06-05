// file: paymentProviders/paystack.js
// AFCARPARTS - Paystack-Adapter (Phase 2.1: Haendler-Subaccounts / Afrika-Auszahlung)
// Liest PAYSTACK_SECRET_KEY aus process.env. Nutzt Node global fetch (Node >= 18).

const { PaymentProvider } = require('./base');
const PS_BASE = 'https://api.paystack.co';

class PaystackProvider extends PaymentProvider {
  constructor() {
    super('paystack');
    if (!process.env.PAYSTACK_SECRET_KEY) throw new Error('PAYSTACK_SECRET_KEY fehlt (Render Environment)');
    this.key = process.env.PAYSTACK_SECRET_KEY;
  }

  async _req(method, path, body) {
    const r = await fetch(PS_BASE + path, {
      method,
      headers: { Authorization: 'Bearer ' + this.key, 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    let d = {};
    try { d = await r.json(); } catch (e) { /* leerer Body */ }
    if (!r.ok || d.status === false) {
      throw new Error(d.message || ('Paystack HTTP ' + r.status));
    }
    return d; // { status:true, message, data }
  }

  // ---- Bankliste (fuer das Dropdown im Onboarding) ----
  // country: 'nigeria' | 'ghana' | 'south africa' | 'kenya' | 'cote d'ivoire'
  async listBanks(country) {
    const c = encodeURIComponent((country || 'nigeria').toLowerCase());
    const d = await this._req('GET', `/bank?country=${c}&perPage=100`);
    return (d.data || []).map(b => ({ name: b.name, code: b.code, currency: b.currency }));
  }

  // ---- Subaccount = Auszahlungsziel des Haendlers ----
  // percentageCharge = Plattform-Provision in % (z. B. 16). Pro Transaktion in 2.2 ueberschreibbar.
  async createSubaccount({ businessName, settlementBank, accountNumber, percentageCharge, primaryContactEmail, primaryContactName, primaryContactPhone, description }) {
    if (!settlementBank || !accountNumber) throw new Error('settlementBank und accountNumber erforderlich');
    const body = {
      business_name: businessName,
      settlement_bank: settlementBank,
      account_number: accountNumber,
      percentage_charge: (percentageCharge != null ? percentageCharge : 16),
      description: description || undefined,
      primary_contact_email: primaryContactEmail || undefined,
      primary_contact_name: primaryContactName || undefined,
      primary_contact_phone: primaryContactPhone || undefined,
    };
    const d = await this._req('POST', '/subaccount', body);
    return d.data; // { id, subaccount_code, account_name, settlement_bank, account_number, ... }
  }

  // base-Methode -> delegiert auf createSubaccount
  async createPayoutAccount({ merchant, bank }) {
    return this.createSubaccount(bank);
  }

  // ---- INKASSO + SPLIT (Phase 2.2) ----

  // Transaktion initialisieren; gibt { authorization_url, reference, access_code } zurueck.
  async initializeTransaction({ email, amountKobo, currency, reference, callbackUrl, subaccount, transactionCharge, splitCode, bearer, metadata }) {
    const body = { email: email, amount: amountKobo, currency: currency || 'NGN' };
    if (reference) body.reference = reference;
    if (callbackUrl) body.callback_url = callbackUrl;
    if (splitCode) {
      body.split_code = splitCode;
    } else if (subaccount) {
      body.subaccount = subaccount;
      if (transactionCharge != null) body.transaction_charge = transactionCharge;
      if (bearer) body.bearer = bearer;
    }
    if (metadata) body.metadata = metadata;
    const d = await this._req('POST', '/transaction/initialize', body);
    return d.data; // { authorization_url, access_code, reference }
  }

  // Multi-Split-Gruppe anlegen (mehrere Subaccounts in einer Transaktion). Gibt { split_code } zurueck.
  async createSplit({ name, type, currency, subaccounts, bearerType, bearerSubaccount }) {
    const body = { name: name, type: type || 'flat', currency: currency || 'NGN', subaccounts: subaccounts };
    if (bearerType) body.bearer_type = bearerType;
    if (bearerSubaccount) body.bearer_subaccount = bearerSubaccount;
    const d = await this._req('POST', '/split', body);
    return d.data; // { split_code, ... }
  }

  // Transaktion verifizieren (nach Rueckkehr vom Checkout).
  async verifyTransaction(reference) {
    const d = await this._req('GET', '/transaction/verify/' + encodeURIComponent(reference));
    return d.data; // { status, amount, currency, reference, ... }
  }

  // verifyWebhook / parseWebhook -> Phase 2.3
}

module.exports = PaystackProvider;
