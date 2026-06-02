// file: paymentProviders/base.js
// AFCARPARTS - Provider-Abstraktion (Phase 0)
// Definiert die EINHEITLICHE Schnittstelle, die jeder Provider-Adapter erfuellen muss.
// Der Rest der App ruft NIE Stripe/Flutterwave/Payoneer direkt auf, sondern nur diese Methoden.
// Konkrete Adapter (stripe.js, flutterwave.js, payoneer.js) erben hiervon und werden
// in den jeweiligen Phasen implementiert.

class PaymentProvider {
  constructor(name) {
    this.name = name; // 'stripe' | 'flutterwave' | 'payoneer'
  }

  _ni(method) {
    throw new Error(`[${this.name}] ${method}() ist noch nicht implementiert (kommt in einer spaeteren Phase).`);
  }

  // ---- ABO / SUBSCRIPTIONS (Fluss 1) ----
  // Legt bei Bedarf einen Kunden beim Provider an und gibt dessen externe ID zurueck.
  async ensureCustomer(/* { merchant, email, name } */) { this._ni('ensureCustomer'); }
  // Startet ein Abo (plan: 'basic'|'pro'); gibt { providerSubscriptionId, status, currentPeriodEnd, checkoutUrl? } zurueck.
  async createSubscription(/* { merchant, plan } */) { this._ni('createSubscription'); }
  // Kuendigt ein Abo (sofort oder zum Periodenende).
  async cancelSubscription(/* { providerSubscriptionId, atPeriodEnd } */) { this._ni('cancelSubscription'); }

  // ---- VERKAUF: INKASSO (Fluss 2a) ----
  // Initialisiert eine Kundenzahlung; gibt { providerPaymentId, status, redirectUrl?, clientSecret? } zurueck.
  async collectPayment(/* { order, amount, currency, customer } */) { this._ni('collectPayment'); }

  // ---- VERKAUF: AUSZAHLUNG AN HAENDLER (Fluss 2b) ----
  // Legt ein Auszahlungsziel an (Flutterwave subaccount / Payoneer payee / Stripe connect acct).
  async createPayoutAccount(/* { merchant, bank } */) { this._ni('createPayoutAccount'); }
  // Fuehrt eine Auszahlung an einen Haendler aus (Batch/Mass-Payout oder Einzeltransfer).
  async payout(/* { merchant, amount, currency, reference } */) { this._ni('payout'); }

  // ---- WEBHOOKS ----
  // Verifiziert die Signatur des eingehenden Webhooks (Secret pro Provider).
  verifyWebhook(/* { rawBody, headers } */) { this._ni('verifyWebhook'); }
  // Normalisiert ein Provider-Event in ein einheitliches Format:
  // { eventId, type, kind: 'subscription'|'payment'|'payout'|'dispute', data }
  parseWebhook(/* parsedEvent */) { this._ni('parseWebhook'); }
}

module.exports = { PaymentProvider };
