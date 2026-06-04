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

  // collectPayment / verifyWebhook / parseWebhook -> Phase 2.2 / 2.3 (erben Stub aus base)
}

module.exports = PaystackProvider;
