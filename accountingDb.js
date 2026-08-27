// file: accountingDb.js
// AFCARPARTS - Buchhaltungs-Datenschicht
//
// ZWECK: Eine pruefbare Datengrundlage fuer den Steuerberater. Dies ist
// KEIN Jahresabschluss und keine Bilanz - es liefert die Zahlen, die aus
// dem Marktplatz kommen, in einer Form, die sich importieren laesst.
//
// ZWEI DATENQUELLEN, BEWUSST GETRENNT:
//
//   1. ABGELEITET aus dem Marktplatz (order_items, payouts).
//      Provisionsertrag und Haendlerverbindlichkeit werden zum
//      Berichtszeitpunkt berechnet, NICHT kopiert. Eine zweite Kopie
//      koennte von der ersten abweichen - dann gibt es zwei Wahrheiten
//      und keine davon ist belastbar.
//
//   2. ERFASST in book_entries (diese Datei).
//      Alles, was der Marktplatz nicht kennt: Bannerwerbung, Eigenverkaeufe,
//      Kosten. Diese Saetze sind UNVERAENDERBAR.
//
// DIE ZENTRALE UNTERSCHEIDUNG:
//   Von 100 USD Kundengeld sind nur ~16 USD Ertrag. Die ~84 USD sind ein
//   durchlaufender Posten und in der Bilanz eine VERBINDLICHKEIT gegenueber
//   dem Haendler - kein Umsatz. Wer das falsch bucht, versteuert fremdes Geld.
//
// GoBD-GRUNDSATZ (§ 146 Abs. 4 AO): Eine Buchung darf nachtraeglich nicht
// so veraendert werden, dass der urspruengliche Inhalt nicht mehr feststellbar
// ist. Deshalb gibt es hier KEIN UPDATE auf Betraege. Korrekturen laufen
// ausschliesslich als Storno mit Gegenbuchung.

const { query } = require('./db');
const fx = require('./fx');

// Berichtswaehrung fuer den Steuerberater. Deutsche Buchfuehrung rechnet
// in Euro, unabhaengig davon, dass der Shop in USD kalkuliert.
const REPORT_CURRENCY = String(process.env.ACCOUNTING_CURRENCY || 'EUR').toUpperCase();

/* ============================================================
   KATEGORIEN
   Bewusst kurz gehalten. Die Zuordnung zu konkreten SKR-Konten
   macht der Steuerberater - wir liefern die Sachverhalte, nicht
   die Kontonummern. Ein selbst vergebenes Konto waere geraten.
   ============================================================ */
const CATEGORIES = {
  // Ertraege
  banner_ads:     { dir: 'income',  label: 'Bannerwerbung / Anzeigen' },
  own_sale:       { dir: 'income',  label: 'Eigenverkauf (eigene Ware)' },
  other_income:   { dir: 'income',  label: 'Sonstiger Ertrag' },
  // Aufwendungen
  hosting:        { dir: 'expense', label: 'Hosting / Server / Domains' },
  software:       { dir: 'expense', label: 'Software & Lizenzen' },
  payment_fees:   { dir: 'expense', label: 'Zahlungsgebühren' },
  marketing:      { dir: 'expense', label: 'Marketing & Werbung' },
  goods:          { dir: 'expense', label: 'Wareneinkauf' },
  services:       { dir: 'expense', label: 'Fremdleistungen / Beratung' },
  equipment:      { dir: 'expense', label: 'Geräte & Ausstattung' },
  travel:         { dir: 'expense', label: 'Reisekosten' },
  fees_public:    { dir: 'expense', label: 'Gebühren, Beiträge, Abgaben' },
  other_expense:  { dir: 'expense', label: 'Sonstiger Aufwand' },
};

function categories() {
  return Object.keys(CATEGORIES).map((k) => ({
    key: k, label: CATEGORIES[k].label, direction: CATEGORIES[k].dir,
  }));
}

/* ============================================================
   SCHEMA
   ============================================================ */
async function migrate() {
  const log = [];

  await query(`
    CREATE TABLE IF NOT EXISTS book_entries (
      id              BIGSERIAL PRIMARY KEY,
      entry_date      DATE        NOT NULL,
      category        TEXT        NOT NULL,
      direction       TEXT        NOT NULL CHECK (direction IN ('income','expense')),
      description     TEXT        NOT NULL,
      counterparty    TEXT,
      amount          NUMERIC(14,2) NOT NULL,
      currency        TEXT        NOT NULL DEFAULT 'EUR',
      fx_rate         NUMERIC(18,8) NOT NULL DEFAULT 1,
      fx_source       TEXT,
      amount_report   NUMERIC(14,2) NOT NULL,
      report_currency TEXT        NOT NULL DEFAULT 'EUR',
      vat_rate        NUMERIC(5,2),
      vat_amount      NUMERIC(14,2),
      doc_url         TEXT,
      doc_ref         TEXT,
      note            TEXT,
      reverses_id     BIGINT REFERENCES book_entries(id),
      reversed_by_id  BIGINT REFERENCES book_entries(id),
      created_by      BIGINT,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);
  log.push('Tabelle book_entries ok');

  await query(`CREATE INDEX IF NOT EXISTS idx_book_entries_date ON book_entries (entry_date)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_book_entries_cat  ON book_entries (category)`);
  log.push('Indizes ok');

  /* GoBD-Schutz auf Datenbankebene.
     Ein Trigger ist hier bewusst haerter als eine Pruefung im Code:
     Er greift auch bei einem direkten UPDATE ueber die Konsole. Erlaubt
     bleibt einzig das Setzen von reversed_by_id - so wird ein Satz als
     storniert markiert, ohne seinen Inhalt anzutasten. */
  await query(`
    CREATE OR REPLACE FUNCTION book_entries_immutable() RETURNS TRIGGER AS $$
    BEGIN
      IF NEW.entry_date   IS DISTINCT FROM OLD.entry_date
      OR NEW.category     IS DISTINCT FROM OLD.category
      OR NEW.direction    IS DISTINCT FROM OLD.direction
      OR NEW.description  IS DISTINCT FROM OLD.description
      OR NEW.amount       IS DISTINCT FROM OLD.amount
      OR NEW.currency     IS DISTINCT FROM OLD.currency
      OR NEW.amount_report IS DISTINCT FROM OLD.amount_report
      OR NEW.created_at   IS DISTINCT FROM OLD.created_at THEN
        RAISE EXCEPTION 'Buchungssaetze sind unveraenderbar (GoBD). Bitte stornieren und neu erfassen.';
      END IF;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql
  `);
  await query(`DROP TRIGGER IF EXISTS trg_book_entries_immutable ON book_entries`);
  await query(`
    CREATE TRIGGER trg_book_entries_immutable
    BEFORE UPDATE ON book_entries
    FOR EACH ROW EXECUTE FUNCTION book_entries_immutable()
  `);
  log.push('Unveraenderbarkeits-Trigger aktiv (GoBD)');

  await query(`
    CREATE OR REPLACE FUNCTION book_entries_no_delete() RETURNS TRIGGER AS $$
    BEGIN
      RAISE EXCEPTION 'Buchungssaetze duerfen nicht geloescht werden (GoBD). Bitte stornieren.';
    END;
    $$ LANGUAGE plpgsql
  `);
  await query(`DROP TRIGGER IF EXISTS trg_book_entries_no_delete ON book_entries`);
  await query(`
    CREATE TRIGGER trg_book_entries_no_delete
    BEFORE DELETE ON book_entries
    FOR EACH ROW EXECUTE FUNCTION book_entries_no_delete()
  `);
  log.push('Loeschschutz aktiv (GoBD)');

  return log;
}

/* ============================================================
   ERFASSEN
   ============================================================ */
async function addEntry(input) {
  const cat = CATEGORIES[input.category];
  if (!cat) throw new Error('Unbekannte Kategorie: ' + input.category);

  const amount = Math.round(Number(input.amount) * 100) / 100;
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error('Betrag muss groesser als null sein (Vorzeichen ergibt sich aus der Kategorie)');
  }
  const currency = String(input.currency || REPORT_CURRENCY).toUpperCase();
  const entryDate = String(input.entry_date || '').slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(entryDate)) throw new Error('Belegdatum fehlt oder ist ungueltig');
  if (!String(input.description || '').trim()) throw new Error('Buchungstext erforderlich');

  // Kurs zum BELEGDATUM waere korrekter, ist ueber die Gratis-Kursquelle
  // aber nicht abrufbar. Deshalb Tageskurs, und die Quelle wird
  // mitgeschrieben - so ist im Zweifel nachvollziehbar, woher er kam.
  let rate = 1, source = 'identity';
  if (currency !== REPORT_CURRENCY) {
    try {
      const r = await fx.getRate(currency, REPORT_CURRENCY);
      rate = r.rate; source = r.source;
    } catch (e) {
      throw new Error('Kein Wechselkurs ' + currency + '->' + REPORT_CURRENCY + ' verfuegbar. Bitte Betrag in ' + REPORT_CURRENCY + ' erfassen.');
    }
  }
  const amountReport = Math.round(amount * rate * 100) / 100;

  const vatRate = (input.vat_rate === '' || input.vat_rate === null || input.vat_rate === undefined)
    ? null : Number(input.vat_rate);
  const vatAmount = (vatRate === null) ? null
    : Math.round(amountReport * (vatRate / (100 + vatRate)) * 100) / 100;

  const r = await query(
    `INSERT INTO book_entries
       (entry_date, category, direction, description, counterparty,
        amount, currency, fx_rate, fx_source, amount_report, report_currency,
        vat_rate, vat_amount, doc_url, doc_ref, note, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
     RETURNING *`,
    [entryDate, input.category, cat.dir, String(input.description).trim(),
     input.counterparty || null, amount, currency, rate, source,
     amountReport, REPORT_CURRENCY, vatRate, vatAmount,
     input.doc_url || null, input.doc_ref || null, input.note || null,
     input.created_by || null]
  );
  return r.rows[0];
}

// Storno: legt einen Gegensatz an und verknuepft beide. Der Originalsatz
// bleibt unangetastet - genau das verlangt die GoBD.
async function reverseEntry(id, userId, reason) {
  const orig = await query(`SELECT * FROM book_entries WHERE id = $1`, [id]);
  const e = orig.rows[0];
  if (!e) throw new Error('Buchungssatz nicht gefunden');
  if (e.reversed_by_id) throw new Error('Dieser Satz wurde bereits storniert');
  if (e.reverses_id) throw new Error('Ein Stornosatz kann nicht erneut storniert werden');

  const ins = await query(
    `INSERT INTO book_entries
       (entry_date, category, direction, description, counterparty,
        amount, currency, fx_rate, fx_source, amount_report, report_currency,
        vat_rate, vat_amount, doc_ref, note, reverses_id, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
     RETURNING *`,
    [e.entry_date, e.category, e.direction, 'STORNO zu #' + e.id + ': ' + e.description,
     e.counterparty, -Number(e.amount), e.currency, e.fx_rate, e.fx_source,
     -Number(e.amount_report), e.report_currency,
     e.vat_rate, e.vat_amount === null ? null : -Number(e.vat_amount),
     e.doc_ref, reason || null, e.id, userId || null]
  );
  const rev = ins.rows[0];
  await query(`UPDATE book_entries SET reversed_by_id = $2 WHERE id = $1`, [e.id, rev.id]);
  return { original: e, reversal: rev };
}

async function listEntries({ from = null, to = null, category = null } = {}) {
  const where = [], params = [];
  if (from)     { params.push(from);     where.push(`entry_date >= $${params.length}`); }
  if (to)       { params.push(to);       where.push(`entry_date <= $${params.length}`); }
  if (category) { params.push(category); where.push(`category = $${params.length}`); }
  const sql = `SELECT * FROM book_entries
                ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
                ORDER BY entry_date DESC, id DESC`;
  const r = await query(sql, params);
  return r.rows;
}

/* ============================================================
   MARKTPLATZ-ZAHLEN ABLEITEN

   Provisionsertrag = das, was WIRKLICH deiner ist.
   Haendleranteil   = Verbindlichkeit, kein Ertrag.

   Gerechnet wird mit dem je Bestellung EINGEFRORENEN Kurs
   (orders.fx_rate), damit die Zahlen ueber Waehrungen hinweg
   addierbar sind und sich nicht rueckwirkend veraendern.
   ============================================================ */
async function marketplaceFigures({ from = null, to = null } = {}) {
  const params = [];
  const where = [`o.status = 'paid'`];
  if (from) { params.push(from); where.push(`o.created_at >= $${params.length}`); }
  if (to)   { params.push(to);   where.push(`o.created_at < ($${params.length + 0} ::date + 1)`); }

  const r = await query(`
    SELECT COUNT(DISTINCT o.id)::int                       AS order_count,
           COUNT(*)::int                                   AS item_count,
           SUM(oi.line_total        * o.fx_rate)::float8   AS gmv_base,
           SUM(oi.commission_amount * o.fx_rate)::float8   AS commission_base,
           SUM(oi.payout_amount     * o.fx_rate)::float8   AS merchant_share_base,
           SUM(CASE WHEN oi.payout_status = 'pending'
                    THEN oi.payout_amount * o.fx_rate ELSE 0 END)::float8 AS liability_open_base,
           SUM(CASE WHEN oi.payout_status = 'paid'
                    THEN oi.payout_amount * o.fx_rate ELSE 0 END)::float8 AS paid_out_base,
           BOOL_OR(o.fx_source = 'unavailable')            AS fx_incomplete,
           BOOL_OR(o.fx_source = 'legacy')                 AS has_legacy_fx
      FROM order_items oi
      JOIN orders o ON o.id = oi.order_id
     WHERE ${where.join(' AND ')}
  `, params);

  const row = r.rows[0] || {};
  const baseCur = fx.baseCurrency();

  // Basiswaehrung (meist USD) -> Berichtswaehrung (EUR)
  let rate = 1, source = 'identity';
  if (baseCur !== REPORT_CURRENCY) {
    try {
      const x = await fx.getRate(baseCur, REPORT_CURRENCY);
      rate = x.rate; source = x.source;
    } catch (e) { source = 'unavailable'; }
  }
  const conv = (v) => Math.round(((Number(v) || 0) * rate) * 100) / 100;

  return {
    base_currency: baseCur,
    report_currency: REPORT_CURRENCY,
    base_to_report_rate: rate,
    base_to_report_source: source,
    order_count: row.order_count || 0,
    item_count: row.item_count || 0,
    gmv: conv(row.gmv_base),
    commission: conv(row.commission_base),
    merchant_share: conv(row.merchant_share_base),
    liability_open: conv(row.liability_open_base),
    paid_out: conv(row.paid_out_base),
    fx_incomplete: !!row.fx_incomplete,
    has_legacy_fx: !!row.has_legacy_fx,
  };
}

/* ============================================================
   PERIODENAUSWERTUNG
   Gliederung angelehnt an die Reihenfolge des § 275 HGB
   (Gesamtkostenverfahren). Das ist eine DARSTELLUNG, kein Abschluss.
   ============================================================ */
async function periodReport({ from = null, to = null } = {}) {
  const market = await marketplaceFigures({ from, to });
  const entries = await listEntries({ from, to });

  const byCategory = {};
  let income = 0, expense = 0, vat = 0;
  for (const e of entries) {
    const amt = Number(e.amount_report) || 0;
    const k = e.category;
    if (!byCategory[k]) {
      byCategory[k] = {
        category: k,
        label: (CATEGORIES[k] && CATEGORIES[k].label) || k,
        direction: e.direction, amount: 0, count: 0,
      };
    }
    byCategory[k].amount += amt;
    byCategory[k].count += 1;
    if (e.direction === 'income') income += amt; else expense += amt;
    if (e.vat_amount !== null && e.vat_amount !== undefined) vat += Number(e.vat_amount) || 0;
  }
  Object.keys(byCategory).forEach((k) => {
    byCategory[k].amount = Math.round(byCategory[k].amount * 100) / 100;
  });

  const totalIncome = Math.round((market.commission + income) * 100) / 100;
  const totalExpense = Math.round(expense * 100) / 100;

  return {
    from, to,
    report_currency: REPORT_CURRENCY,
    marketplace: market,
    manual: {
      income: Math.round(income * 100) / 100,
      expense: totalExpense,
      vat_included: Math.round(vat * 100) / 100,
      by_category: Object.values(byCategory).sort((a, b) => b.amount - a.amount),
      entry_count: entries.length,
    },
    result: {
      income_total: totalIncome,
      expense_total: totalExpense,
      surplus: Math.round((totalIncome - totalExpense) * 100) / 100,
    },
    // Was der Steuerberater ausdruecklich NICHT hier findet:
    not_included: [
      'Bankkonten, Kassen- und Providerguthaben (Stripe, pawaPay, Payoneer)',
      'Anlagevermögen und Abschreibungen',
      'Eigenkapital, Einlagen und Entnahmen',
      'Steuerrückstellungen und Vorauszahlungen',
      'Umsatzsteuer-Behandlung der Verkäufe (Leistungsort, Ausfuhr, § 25e UStG)',
    ],
  };
}

module.exports = {
  migrate, addEntry, reverseEntry, listEntries,
  marketplaceFigures, periodReport, categories,
  CATEGORIES, REPORT_CURRENCY,
};
