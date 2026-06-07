// file: paymentProviders/stripe.js
// AFCARPARTS - Stripe-Adapter (Phase 1: Haendler-Abo / Billing)
// Liest Secret-Key & Price-IDs aus process.env. Keine Secrets im Code.

const Stripe = require('stripe');
const { PaymentProvider } = require('./base');
const billingDb = require('../billingDb');

// Plan -> ENV-Variable mit der Stripe-Price-ID + Produktlimit
const PLAN_CONFIG = {
  basic: { priceEnv: 'STRIPE_PRICE_BASIC', productLimit: 10 },
  pro:   { priceEnv: 'STRIPE_PRICE_PRO',   productLimit: 100 },
};

class StripeProvider extends PaymentProvider {
  constructor() {
    super('stripe');
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY fehlt (Render Environment)');
    }
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  planConfig(plan) {
    const cfg = PLAN_CONFIG[plan];
    if (!cfg) throw new Error('Unbekannter Plan: ' + plan);
    const priceId = process.env[cfg.priceEnv];
    if (!priceId) throw new Error(cfg.priceEnv + ' fehlt (Render Environment)');
    return { priceId, productLimit: cfg.productLimit };
  }

  // ---- ABO / SUBSCRIPTIONS ----

  // Legt bei Bedarf einen Stripe-Kunden an und merkt die ID in provider_accounts.
  async ensureCustomer({ merchant, email, name }) {
    const existing = await billingDb.getProviderAccount(merchant.id, 'stripe', 'customer');
    if (existing && existing.external_id) return existing.external_id;

    const customer = await this.stripe.customers.create({
      email: email || undefined,
      name: name || undefined,
      metadata: { merchant_id: String(merchant.id), user_id: String(merchant.user_id) },
    });

    await billingDb.upsertProviderAccount({
      merchantId: merchant.id, provider: 'stripe', kind: 'customer',
      externalId: customer.id, status: 'active', meta: {},
    });
    return customer.id;
  }

  // Erstellt eine gehostete Checkout-Session fuer ein Abo und gibt die URL zurueck.
  async createSubscriptionCheckout({ merchant, plan, customerId, successUrl, cancelUrl }) {
    const { priceId } = this.planConfig(plan);
    const session = await this.stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      // metadata in BEIDEN Objekten -> Webhook kennt Merchant + Plan
      metadata: { merchant_id: String(merchant.id), plan },
      subscription_data: { metadata: { merchant_id: String(merchant.id), plan } },
    });
    return session.url;
  }

  // Stripe-Kundenportal (Abo verwalten / kuendigen).
  async createBillingPortal({ customerId, returnUrl }) {
    const session = await this.stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });
    return session.url;
  }

  // ---- CONNECT (Phase 3: Haendler-Auszahlung EU/US/global) ----

  // Legt bei Bedarf ein Express-Connect-Konto an und merkt die ID in provider_accounts.
  async createConnectAccount({ merchant, email, country }) {
    const existing = await billingDb.getProviderAccount(merchant.id, 'stripe', 'connect');
    if (existing && existing.external_id) return existing.external_id;

    const account = await this.stripe.accounts.create({
      type: 'express',
      email: email || undefined,
      country: country || undefined, // z. B. 'DE', 'US' - Haendlerland
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      metadata: { merchant_id: String(merchant.id) },
    });

    await billingDb.upsertProviderAccount({
      merchantId: merchant.id, provider: 'stripe', kind: 'connect',
      externalId: account.id, status: 'pending', meta: { country: country || null },
    });
    return account.id;
  }

  // Erstellt einen einmaligen, gehosteten Onboarding-Link (KYC laeuft bei Stripe).
  async createAccountLink({ accountId, refreshUrl, returnUrl }) {
    const link = await this.stripe.accountLinks.create({
      account: accountId,
      refresh_url: refreshUrl,
      return_url: returnUrl,
      type: 'account_onboarding',
    });
    return link.url;
  }

  // Status eines Connect-Kontos abfragen (ist es zahlungs-/auszahlungsbereit?).
  async getConnectAccount(accountId) {
    const a = await this.stripe.accounts.retrieve(accountId);
    return {
      id: a.id,
      chargesEnabled: !!a.charges_enabled,
      payoutsEnabled: !!a.payouts_enabled,
      detailsSubmitted: !!a.details_submitted,
      country: a.country || null,
    };
  }

  // ---- WEBHOOKS ----

  // Verifiziert die Signatur und gibt das native Stripe-Event zurueck.
  // Wirft, wenn die Signatur ungueltig ist (Schutz vor gefaelschten Webhooks).
  verifyWebhook({ rawBody, headers }) {
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!secret) throw new Error('STRIPE_WEBHOOK_SECRET fehlt (Render Environment)');
    const sig = headers['stripe-signature'];
    return this.stripe.webhooks.constructEvent(rawBody, sig, secret);
  }

  // Normalisiert ein Stripe-Event in das einheitliche Format.
  parseWebhook(event) {
    const obj = (event.data && event.data.object) ? event.data.object : {};
    let kind = 'other';
    let data = {};

    switch (event.type) {
      case 'checkout.session.completed':
        kind = 'subscription';
        data = {
          action: 'checkout_completed',
          merchantId: (obj.metadata && obj.metadata.merchant_id) ? Number(obj.metadata.merchant_id) : null,
          plan: (obj.metadata && obj.metadata.plan) ? obj.metadata.plan : null,
          providerSubscriptionId: obj.subscription || null,
          customerId: obj.customer || null,
        };
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        kind = 'subscription';
        data = {
          action: 'sub_updated',
          merchantId: (obj.metadata && obj.metadata.merchant_id) ? Number(obj.metadata.merchant_id) : null,
          plan: (obj.metadata && obj.metadata.plan) ? obj.metadata.plan : null,
          providerSubscriptionId: obj.id,
          status: obj.status, // active | past_due | canceled | unpaid | incomplete
          currentPeriodEnd: obj.current_period_end ? new Date(obj.current_period_end * 1000).toISOString() : null,
          cancelAtPeriodEnd: !!obj.cancel_at_period_end,
        };
        break;

      case 'customer.subscription.deleted':
        kind = 'subscription';
        data = {
          action: 'sub_canceled',
          providerSubscriptionId: obj.id,
          status: 'canceled',
        };
        break;

      case 'invoice.payment_failed':
        kind = 'subscription';
        data = {
          action: 'payment_failed',
          providerSubscriptionId: obj.subscription || null,
          status: 'past_due',
        };
        break;

      default:
        kind = 'other';
    }

    return { eventId: event.id, type: event.type, kind, data };
  }
}

module.exports = StripeProvider;
