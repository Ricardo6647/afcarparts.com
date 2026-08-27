// file: paymentProviders/payoneer.js
// AFCARPARTS - Payoneer-Adapter (Phase F)
//
// WAS DIESER ADAPTER IST:
//   Ein Datei-Generator, kein API-Client. Unser Payoneer-Konto hat KEINEN
//   Mass-Payout-Bereich (der braucht eine separate Partnerschaft). Wir haben
//   nur die normalen Business-Zahlwege. Genutzt wird davon:
//       Zahlen -> Zahllauf -> CSV hochladen
//   Dieser Adapter baut genau die CSV, die dort akzeptiert wird.
//
// GRUNDREGELN (bewusst getroffen, 2026-08-27):
//   1. Die GEBUEHR TRAEGT DIE PLATTFORM. Deshalb wird die Spalte
//      "Amount Recipient Gets" gefuellt und "Amount to Pay" bleibt LEER.
//      Der Haendler bekommt exakt den Betrag, der in seinem Dashboard steht.
//   2. NUR GLEICHE WAEHRUNG. "Amount Recipient Gets" ist der Betrag in der
//      EMPFAENGER-BANKWAEHRUNG. Stuende im Ledger 84.00 USD und der Haendler
//      haette ein NGN-Konto, waere die Zeile "84 NGN" - etwa fuenf Cent.
//      Solche Zeilen werden deshalb blockiert und muessen einzeln in der
//      Payoneer-Oberflaeche gemacht werden, wo der Kurs sichtbar ist.
//   3. MINDESTAUSZAHLUNG. Kleine Betraege werden nicht ausgezahlt, sondern
//      rollen in die naechste Woche. Sonst frisst eine Pauschalgebuehr bei
//      15 USD Guthaben einen zweistelligen Prozentsatz - und den zahlen wir.
//
// ENV:
//   PAYOUT_MIN_USD                  - Mindestauszahlung, Standard 50
//   PAYONEER_BALANCES               - eigene Guthabenwaehrungen, Standard USD,EUR,GBP
//   PAYONEER_UNCONFIRMED_COUNTRIES  - Laender ohne bestaetigte Abdeckung, Standard AO
//   PAYONEER_MAX_ROWS               - Zeilen je Datei, Standard 1000

// base.js defensiv laden: bei Datei-fuer-Datei-Deploys kann server.js schon
// neu und base.js noch alt sein. Ein fehlender Import darf den Start nicht
// killen - deshalb notfalls eine minimale Ersatzklasse.
let PaymentProvider;
try {
  PaymentProvider = require('./base').PaymentProvider;
} catch (e) {
  PaymentProvider = class { constructor(name) { this.name = name; } };
}
if (!PaymentProvider) {
  PaymentProvider = class { constructor(name) { this.name = name; } };
}

/* ------------------------------------------------------------
   EXAKTE KOPFZEILE DER PAYONEER-VORLAGE
   Payoneer prueft diese Zeile beim Upload zeichengenau. Nicht
   umbenennen, nicht umsortieren, keine Spalte weglassen.
   Quelle: PayoneerBatchPaymentsTemplate.csv (heruntergeladen 2026-08-27)
   ------------------------------------------------------------ */
const CSV_HEADER = [
  'Bank Account Holder Name',
  'Bank Account Number/IBAN',
  'Payoneer Balance to Pay From',
  'Amount to Pay',
  'Amount Recipient Gets',
  'Recipient Bank Account Currency',
  'Payment Reference (Optional)',
  'Transaction Description (Optional)',
];

const BOM = '\uFEFF'; // Payoneer-Vorlage ist UTF-8 mit BOM

function envList(name, fallback) {
  const raw = process.env[name];
  if (raw === undefined || raw === null || raw === '') return fallback;
  const v = String(raw).trim().toLowerCase();
  if (v === 'none' || v === '-') return [];
  return String(raw).split(/[,;\s]+/).map((s) => s.trim().toUpperCase()).filter(Boolean);
}

function envNum(name, fallback) {
  const n = Number(process.env[name]);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

// Unsere eigenen Guthabenwaehrungen bei Payoneer.
function balanceCurrencies() { return envList('PAYONEER_BALANCES', ['USD', 'EUR', 'GBP']); }

// Laender, fuer die die Abdeckung NICHT schriftlich bestaetigt ist.
// Angola steht hier, weil Payoneer es in keiner Laenderliste fuehrt und
// die Support-Anfrage dazu noch offen ist. Lieber blockieren als eine
// Auszahlung losschicken, die im Nirgendwo haengen bleibt.
function unconfirmedCountries() { return envList('PAYONEER_UNCONFIRMED_COUNTRIES', ['AO']); }

// Laender, in die grundsaetzlich nicht ausgezahlt wird (Sanktionen/Embargo).
const BLOCKED_COUNTRIES = ['IR', 'KP', 'SY', 'CU', 'RU', 'BY', 'AF'];

function minPayout() { return envNum('PAYOUT_MIN_USD', 50); }
function maxRows() { return envNum('PAYONEER_MAX_ROWS', 1000); }

/* ------------------------------------------------------------
   CSV-Feld maskieren. Payoneer-Vorlage ist KOMMA-getrennt.
   ------------------------------------------------------------ */
function esc(v) {
  const s = (v === null || v === undefined) ? '' : String(v);
  return /[",\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

// Zahl auf zwei Nachkommastellen, Punkt als Dezimaltrenner (Payoneer erwartet
// das englische Format - ein deutsches Komma waere hier ein Feldtrenner).
function money(n) {
  return (Math.round((Number(n) || 0) * 100) / 100).toFixed(2);
}

// Batch-Referenz, unter der du die Zahlung spaeter im Payoneer-Kontoauszug
// wiederfindest. Format: AFCP-20260827-01
function newBatchRef(seq) {
  const d = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  return 'AFCP-' + d + '-' + String(seq || 1).padStart(2, '0');
}

class PayoneerProvider extends PaymentProvider {
  constructor() {
    super('payoneer');
    // Bewusst KEINE Pflicht-ENV: dieser Adapter braucht keine Credentials,
    // solange er nur Dateien baut. Er muss sich immer laden lassen.
  }

  /* ----------------------------------------------------------
     PAYEE-PRUEFUNG
     Welche Angaben braucht eine Zeile, damit Payoneer sie annimmt?
     `meta` ist provider_accounts.meta des Haendlers.
     Rueckgabe: { ok: true } oder { ok: false, reason: '...' }
     ---------------------------------------------------------- */
  static validatePayee(meta) {
    const m = meta || {};
    const holder = String(m.holder_name || m.business_name || '').trim();
    const country = String(m.bank_country || '').toUpperCase();
    const currency = String(m.bank_currency || '').toUpperCase();
    const account = String(m.bank_account || m.iban || '').replace(/\s+/g, '');

    if (!holder || holder.length < 2) {
      return { ok: false, reason: 'Kontoinhaber fehlt' };
    }
    if (!/^[A-Z]{2}$/.test(country)) {
      return { ok: false, reason: 'Bankland fehlt' };
    }
    if (BLOCKED_COUNTRIES.includes(country)) {
      return { ok: false, reason: 'Auszahlung in dieses Land nicht moeglich (' + country + ')' };
    }
    if (unconfirmedCountries().includes(country)) {
      return { ok: false, reason: 'Abdeckung fuer ' + country + ' bei Payoneer nicht bestaetigt - bitte vorab klaeren' };
    }
    if (!/^[A-Z]{3}$/.test(currency)) {
      return { ok: false, reason: 'Bankwaehrung fehlt' };
    }
    if (!account || account.length < 5) {
      return { ok: false, reason: 'Kontonummer/IBAN fehlt - Haendler muss sie bei Payoneer hinterlegen' };
    }
    if (m.approved === false) {
      return { ok: false, reason: 'Bankkonto bei Payoneer noch nicht freigegeben' };
    }
    return { ok: true };
  }

  /* ----------------------------------------------------------
     Ist dieser offene Posten auszahlbar?
     item: { merchant_id, amount, currency, meta, business_name }
     ---------------------------------------------------------- */
  static checkItem(item) {
    const amount = Number(item.amount) || 0;
    const ledgerCur = String(item.currency || '').toUpperCase();
    const meta = item.meta || {};
    const bankCur = String(meta.bank_currency || '').toUpperCase();

    const payee = PayoneerProvider.validatePayee(meta);
    if (!payee.ok) return { ok: false, reason: payee.reason };

    // Regel 2: nur gleiche Waehrung (siehe Kopfkommentar).
    if (ledgerCur !== bankCur) {
      return {
        ok: false,
        reason: 'Waehrung ungleich (Guthaben ' + ledgerCur + ', Bankkonto ' + bankCur +
                ') - bitte einzeln in Payoneer mit Umrechnung zahlen',
      };
    }
    // Wir koennen nur aus Waehrungen zahlen, in denen wir Guthaben halten.
    if (!balanceCurrencies().includes(ledgerCur)) {
      return { ok: false, reason: 'Kein Payoneer-Guthaben in ' + ledgerCur };
    }
    // Regel 3: Mindestauszahlung.
    const min = minPayout();
    if (amount < min) {
      return { ok: false, reason: 'Unter Mindestauszahlung (' + money(amount) + ' ' + ledgerCur +
                                  ' < ' + money(min) + '), rollt in die naechste Woche', rollover: true };
    }
    if (!(amount > 0)) return { ok: false, reason: 'Betrag ist null' };
    return { ok: true };
  }

  /* ----------------------------------------------------------
     BATCH BAUEN
     items: [{ merchant_id, amount, currency, meta, business_name }]
     Rueckgabe: {
       batches: [{ ref, rows, total, currency }],   // je Datei
       payable: [...],                              // was in die Datei geht
       blocked: [{ merchant_id, amount, currency, reason, rollover }]
     }
     Getrennt wird nach Waehrung - eine Datei zahlt aus EINEM Guthaben.
     ---------------------------------------------------------- */
  static buildBatch(items, opts) {
    const options = opts || {};
    const payable = [];
    const blocked = [];

    for (const it of (items || [])) {
      const check = PayoneerProvider.checkItem(it);
      if (check.ok) {
        payable.push(it);
      } else {
        blocked.push({
          merchant_id: it.merchant_id,
          amount: Number(it.amount) || 0,
          currency: it.currency,
          reason: check.reason,
          rollover: !!check.rollover,
        });
      }
    }

    // Nach Waehrung gruppieren
    const byCurrency = {};
    for (const it of payable) {
      const c = String(it.currency).toUpperCase();
      if (!byCurrency[c]) byCurrency[c] = [];
      byCurrency[c].push(it);
    }

    const batches = [];
    let seq = 1;
    for (const currency of Object.keys(byCurrency)) {
      const list = byCurrency[currency];
      const limit = maxRows();
      for (let i = 0; i < list.length; i += limit) {
        const slice = list.slice(i, i + limit);
        const ref = options.reference || newBatchRef(seq++);
        batches.push({
          ref,
          currency,
          rows: slice.map((it) => PayoneerProvider.toRow(it, ref, currency)),
          items: slice,
          total: slice.reduce((s, it) => s + (Number(it.amount) || 0), 0),
        });
      }
    }

    return { batches, payable, blocked };
  }

  /* ----------------------------------------------------------
     Eine Ledger-Position -> eine CSV-Zeile.
     WICHTIG: "Amount to Pay" bleibt LEER, damit die Gebuehr bei uns
     bleibt und der Haendler exakt sein Guthaben erhaelt.
     ---------------------------------------------------------- */
  static toRow(item, batchRef, balanceCurrency) {
    const meta = item.meta || {};
    const holder = String(meta.holder_name || meta.business_name || item.business_name || '').trim();
    const account = String(meta.bank_account || meta.iban || '').replace(/\s+/g, '');
    const bankCur = String(meta.bank_currency || '').toUpperCase();

    return {
      'Bank Account Holder Name': holder,
      'Bank Account Number/IBAN': account,
      'Payoneer Balance to Pay From': String(balanceCurrency || item.currency).toUpperCase(),
      'Amount to Pay': '',                      // LEER = wir tragen die Gebuehr
      'Amount Recipient Gets': money(item.amount),
      'Recipient Bank Account Currency': bankCur,
      'Payment Reference (Optional)': batchRef + '-M' + item.merchant_id,
      'Transaction Description (Optional)': 'AFCARPARTS Auszahlung ' + batchRef,
    };
  }

  /* ----------------------------------------------------------
     Zeilen -> fertige CSV-Datei (String, inkl. BOM).
     ---------------------------------------------------------- */
  static toCsv(rows) {
    const lines = [CSV_HEADER.map(esc).join(',')];
    for (const r of (rows || [])) {
      lines.push(CSV_HEADER.map((h) => esc(r[h])).join(','));
    }
    return BOM + lines.join('\r\n') + '\r\n';
  }

  // Dateiname fuer den Download.
  static fileName(batchRef, currency) {
    return 'payoneer-' + String(currency || 'USD').toLowerCase() + '-' + batchRef + '.csv';
  }

  // Diagnose fuers Admin-Dashboard.
  static config() {
    return {
      min_payout: minPayout(),
      balances: balanceCurrencies(),
      unconfirmed_countries: unconfirmedCountries(),
      blocked_countries: BLOCKED_COUNTRIES,
      max_rows: maxRows(),
      fee_borne_by: 'platform',
      csv_header: CSV_HEADER,
    };
  }

  /* ----------------------------------------------------------
     SPAETER: Mass-Payout-API.
     Erst moeglich, wenn Payoneer die Partnerschaft freigibt. Bis dahin
     bewusst ein klarer Fehler statt eines stillen No-Ops.
     ---------------------------------------------------------- */
  async createPayout() {
    throw new Error('Payoneer Mass-Payout-API ist nicht freigeschaltet - Auszahlung laeuft ueber CSV-Zahllauf');
  }

  verifyWebhook() {
    throw new Error('Payoneer sendet keine Webhooks an uns');
  }

  parseWebhook() {
    return null;
  }
}

module.exports = PayoneerProvider;
module.exports.PayoneerProvider = PayoneerProvider;
module.exports.CSV_HEADER = CSV_HEADER;
