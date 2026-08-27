// file: paymentProviders/index.js
// AFCARPARTS - PaymentService (Phase 0)
// Zentrale Fassade + Routing. Der Rest der App importiert NUR dieses Modul.
//
// Zwei getrennte Geldfluesse:
//   Fluss 1 - Haendler-Abo            -> EIN Provider (Standard: Stripe Billing)
//   Fluss 2 - Verkauf (Inkasso+Payout):
//             Inkasso  -> nach KUNDEN-Region
//             Auszahlung -> nach HAENDLER-Region

const billingDb = require('../billingDb');

/* ------------------------------------------------------------
   Provider-Registry: Name -> Modulpfad (lazy require)
   Adapter werden erst in ihrer Phase angelegt. Fehlt einer noch,
   gibt es eine klare Fehlermeldung statt eines stillen No-Ops.
   ------------------------------------------------------------ */
const REGISTRY = {
  stripe:   './stripe',   // Karten + Abos (Live)
  pawapay:  './pawapay',  // Afrika: Mobile-Money-Inkasso (Phase C) + Payouts (Phase E)
  payoneer: './payoneer', // Europa & weltweit: Payouts (zunaechst manuell/CSV, Adapter spaeter)
};

const _cache = {};
function getProvider(name) {
  if (!name) throw new Error('getProvider: kein Provider-Name angegeben');
  if (_cache[name]) return _cache[name];
  const modPath = REGISTRY[name];
  if (!modPath) throw new Error(`Unbekannter Provider: ${name}`);
  let mod;
  try {
    mod = require(modPath);
  } catch (e) {
    throw new Error(`Provider-Adapter "${name}" ist noch nicht verfuegbar (Phase ausstehend). Detail: ${e.message}`);
  }
  const instance = typeof mod === 'function' ? new mod() : (mod.default ? new mod.default() : mod);
  _cache[name] = instance;
  return instance;
}

/* ------------------------------------------------------------
   ROUTING-Konfiguration (Laendercodes ISO-3166 alpha-2)
   ------------------------------------------------------------ */

// Fluss 1: Abo-Rueckgrat. Einheitlich, damit es EINE Quelle der Wahrheit
// fuer "Abo aktiv -> Portal-Zugang" gibt.
const SUBSCRIPTION_PROVIDER = 'stripe';

// EINE Quelle der Wahrheit fuer die pawaPay-Laenderliste: der Adapter.
// Damit koennen Routing, Server-Validierung und Frontend-Dropdown nicht
// mehr auseinanderlaufen. Ausschluesse (aktuell NG, GH) stehen dort.
const PawaPay = require('./pawapay');

/* ------------------------------------------------------------
   Fluss 2b: AUSZAHLUNG AN HAENDLER

   Grundsatz: Massgeblich ist NICHT, wo der Haendler wohnt, sondern
   WO ER GELD EMPFANGEN KANN. Ein Haendler in Luanda mit portugiesischer
   IBAN ist fuer uns ein EWR-Haendler und laeuft ueber Stripe Connect.
   Das Wohnsitzland liefert nur den Vorschlag bei der Registrierung.

   Rangfolge, wenn nichts gespeichert ist:
     1. Bankkonto im EWR/UK/CH/US/CA -> stripe   (Stripe traegt die Compliance)
     2. aktives pawaPay-Land         -> pawapay  (Mobile Money, Landeswaehrung)
     3. sonst                        -> payoneer (NG, ZA, China, Rest der Welt)
   ------------------------------------------------------------ */

// Laender, in denen ein Haendler ein Stripe-Connect-Konto bekommen kann.
// Quelle: Stripe Cross-Border Payouts (Plattform DE -> EWR/UK/CH/US/CA).
const STRIPE_CONNECT_COUNTRIES = [
  'AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT',
  'LV','LI','LT','LU','MT','NL','NO','PL','PT','RO','SK','SI','ES','SE',
  'GB','CH','US','CA','AU','NZ','JP','SG','HK','MY','MX','BR','AE',
];

const PAYOUT_METHODS = ['stripe', 'pawapay', 'payoneer'];

function canUseStripeConnect(country) {
  return STRIPE_CONNECT_COUNTRIES.includes(String(country || '').toUpperCase());
}

// Vorschlag fuer die Registrierung - nur eine Voreinstellung, kein Zwang.
function suggestPayoutProvider(merchantCountry) {
  if (canUseStripeConnect(merchantCountry)) return 'stripe';
  if (PawaPay.isPayoutSupported(merchantCountry)) return 'pawapay';
  return 'payoneer';
}

// Welche Methoden stehen einem Haendler dieses Landes offen?
// Payoneer ist fast ueberall moeglich, deshalb immer als Rueckfalloption
// dabei - der Haendler kann sein Empfangsziel selbst waehlen.
function payoutOptions(merchantCountry) {
  const out = [];
  if (canUseStripeConnect(merchantCountry)) out.push('stripe');
  if (PawaPay.isPayoutSupported(merchantCountry)) out.push('pawapay');
  out.push('payoneer');
  if (!out.includes('stripe')) out.push('stripe'); // eigenes Auslandskonto
  return out;
}

// Die eigentliche Routing-Entscheidung. `stored` ist merchants.default_payout_provider.
// Ein gespeicherter, gueltiger Wert gewinnt IMMER gegen die Landesableitung.
function pickPayoutProvider(merchantCountry, stored) {
  const s = String(stored || '').toLowerCase();
  if (PAYOUT_METHODS.includes(s)) return s;
  return suggestPayoutProvider(merchantCountry);
}

// Fluss 2a: Inkasso nach Kunden-Land.
//   pawaPay-Land aktiv -> pawapay (Mobile Money)
//   sonst              -> stripe  (Karte / Bank / internationale Karten)
// Nigeria, Ghana, Angola und Suedafrika sind Kartenlaender -> Stripe.
function pickCollectionProvider(customerCountry) {
  return PawaPay.isCollectSupported(customerCountry) ? 'pawapay' : 'stripe';
}

function subscriptionProvider() {
  return SUBSCRIPTION_PROVIDER;
}

/* ------------------------------------------------------------
   WEBHOOK-Eingang (idempotent, provider-neutral)
   Jeder Provider-Webhook laeuft durch diese Funktion. Sie:
     1. verifiziert Signatur ueber den Adapter
     2. speichert das Event (Doppel-Retries werden ignoriert)
     3. gibt das normalisierte Event zurueck (oder null, wenn Duplikat)
   Die fachliche Verarbeitung (Abo-Status, Payout-Status ...) folgt
   in den jeweiligen Phasen.
   ------------------------------------------------------------ */
async function ingestWebhook(providerName, { rawBody, headers }) {
  const provider = getProvider(providerName);

  // 1. Signatur pruefen -> liefert das verifizierte, native Provider-Event (wirft bei Manipulation)
  const verifiedEvent = provider.verifyWebhook({ rawBody, headers });

  // 2. Normalisieren
  const evt = provider.parseWebhook(verifiedEvent);
  if (!evt || !evt.eventId) throw new Error(`[${providerName}] Webhook ohne eventId`);

  // 3. Idempotenz (Doppel-Retries werden ignoriert); Roh-Event fuer Audit speichern
  const { isNew } = await billingDb.recordEvent({
    provider: providerName,
    eventId: evt.eventId,
    type: evt.type,
    payload: verifiedEvent || {},
  });
  if (!isNew) return null; // bereits gesehen -> ignorieren

  return evt; // -> Phasen-Handler verarbeitet evt.kind ('subscription'|'payment'|'payout'|'dispute')
}

async function markWebhookDone(providerName, eventId) {
  await billingDb.markEventProcessed(providerName, eventId);
}

module.exports = {
  getProvider,
  subscriptionProvider,
  pickPayoutProvider,
  suggestPayoutProvider,
  payoutOptions,
  canUseStripeConnect,
  PAYOUT_METHODS,
  pickCollectionProvider,
  ingestWebhook,
  markWebhookDone,
  // Konstanten exportiert fuer Tests/Transparenz
  _routing: {
    SUBSCRIPTION_PROVIDER,
    get PAWAPAY_ENABLED()  { return PawaPay.enabledCountries(); },
    get PAWAPAY_EXCLUDED() { return PawaPay.excludedCountries(); },
    STRIPE_CONNECT_COUNTRIES,
  },
};
