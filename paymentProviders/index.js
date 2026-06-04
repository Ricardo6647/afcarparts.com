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
  stripe:      './stripe',      // Phase 1 (Abo)
  paystack:    './paystack',    // Phase 2 (Afrika: Inkasso + Split)
  flutterwave: './flutterwave', // Alternative (ungenutzt)
  payoneer:    './payoneer',    // Phase 3 (China)
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

// Fluss 2b: Auszahlung an Haendler nach Haendler-Land.
const AFRICA_PAYSTACK = ['NG', 'GH', 'KE', 'ZA', 'CI'];
const CHINA_PAYONEER = ['CN', 'HK'];

function pickPayoutProvider(merchantCountry) {
  const c = String(merchantCountry || '').toUpperCase();
  if (CHINA_PAYONEER.includes(c)) return 'payoneer';
  if (AFRICA_PAYSTACK.includes(c)) return 'paystack';
  return 'stripe'; // EU/global -> Stripe Connect (Phase 4)
}

// Fluss 2a: Inkasso nach Kunden-Land (afrikanische Karten/Mobile Money -> Paystack).
function pickCollectionProvider(customerCountry) {
  const c = String(customerCountry || '').toUpperCase();
  if (AFRICA_PAYSTACK.includes(c)) return 'paystack';
  return 'stripe';
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
  pickCollectionProvider,
  ingestWebhook,
  markWebhookDone,
  // Konstanten exportiert fuer Tests/Transparenz
  _routing: { SUBSCRIPTION_PROVIDER, AFRICA_PAYSTACK, CHINA_PAYONEER },
};
