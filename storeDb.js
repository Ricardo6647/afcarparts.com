// file: storeDb.js
// AFRICARPARTS - Postgres Helper-Funktionen
//
// Bietet einfache Helfer-Funktionen fuer typische DB-Aufgaben:
// - all(table)            -> alle Zeilen lesen
// - byId(table, id)       -> eine Zeile per ID
// - insert(table, data)   -> neue Zeile einfuegen, gibt sie zurueck
// - update(table, id, d)  -> Zeile per ID aktualisieren
// - remove(table, id)     -> Zeile per ID loeschen
// - count(table, where)   -> Anzahl Zeilen

const { query } = require('./db');

// Erlaubte Tabellen-Namen (Schutz gegen SQL-Injection bei Tabellen-Namen)
const ALLOWED_TABLES = new Set([
  'users',
  'categories',
  'category_translations',
  'shops',
  'shop_translations',
  'products',
  'product_tags',
  'tags',
  'banners',
  'orders'
]);

function assertTable(table) {
  if (!ALLOWED_TABLES.has(table)) {
    throw new Error('Invalid table: ' + table);
  }
}

/**
 * Alle Zeilen einer Tabelle lesen.
 */
async function all(table, orderBy = 'id ASC') {
  assertTable(table);
  const safeOrder = /^[a-z_]+\s+(ASC|DESC)$/i.test(orderBy) ? orderBy : 'id ASC';
  const sql = `SELECT * FROM ${table} ORDER BY ${safeOrder}`;
  const res = await query(sql);
  return res.rows;
}

/**
 * Eine Zeile per ID lesen.
 */
async function byId(table, id) {
  assertTable(table);
  const res = await query(`SELECT * FROM ${table} WHERE id = $1`, [id]);
  return res.rows[0] || null;
}

/**
 * Neue Zeile einfuegen.
 */
async function insert(table, data) {
  assertTable(table);
  const keys = Object.keys(data);
  if (keys.length === 0) throw new Error('No data to insert');

  const cols = keys.map(k => `"${k}"`).join(', ');
  const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
  const values = keys.map(k => data[k]);

  const sql = `INSERT INTO ${table} (${cols}) VALUES (${placeholders}) RETURNING *`;
  const res = await query(sql, values);
  return res.rows[0];
}

/**
 * Zeile per ID aktualisieren.
 */
async function update(table, id, data) {
  assertTable(table);
  const keys = Object.keys(data);
  if (keys.length === 0) return await byId(table, id);

  const setClause = keys.map((k, i) => `"${k}" = $${i + 1}`).join(', ');
  const values = keys.map(k => data[k]);
  values.push(id);

  const sql = `UPDATE ${table} SET ${setClause} WHERE id = $${values.length} RETURNING *`;
  const res = await query(sql, values);
  return res.rows[0] || null;
}

/**
 * Zeile per ID loeschen.
 */
async function remove(table, id) {
  assertTable(table);
  const res = await query(`DELETE FROM ${table} WHERE id = $1`, [id]);
  return res.rowCount > 0;
}

/**
 * Anzahl Zeilen in einer Tabelle.
 */
async function count(table, where = '', params = []) {
  assertTable(table);
  const sql = `SELECT COUNT(*) AS c FROM ${table}` + (where ? ' WHERE ' + where : '');
  const res = await query(sql, params);
  return parseInt(res.rows[0].c, 10);
}

module.exports = { all, byId, insert, update, remove, count, query };
