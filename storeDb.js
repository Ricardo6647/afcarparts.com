// file: storeDb.js
// AFRICARPARTS - Postgres Helper-Funktionen

const { query } = require('./db');

// Erlaubte Tabellen-Namen (Schutz gegen SQL-Injection bei Tabellen-Namen)
const ALLOWED_TABLES = new Set([
  'users',
  'categories',
  'category_translations',
  'shops',
  'shop_translations',
  'products',
  'product_translations',
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

async function all(table, orderBy = 'id ASC') {
  assertTable(table);
  const safeOrder = /^[a-z_]+\s+(ASC|DESC)$/i.test(orderBy) ? orderBy : 'id ASC';
  const sql = `SELECT * FROM ${table} ORDER BY ${safeOrder}`;
  const res = await query(sql);
  return res.rows;
}

async function byId(table, id) {
  assertTable(table);
  const res = await query(`SELECT * FROM ${table} WHERE id = $1`, [id]);
  return res.rows[0] || null;
}

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

async function remove(table, id) {
  assertTable(table);
  const res = await query(`DELETE FROM ${table} WHERE id = $1`, [id]);
  return res.rowCount > 0;
}

async function count(table, where = '', params = []) {
  assertTable(table);
  const sql = `SELECT COUNT(*) AS c FROM ${table}` + (where ? ' WHERE ' + where : '');
  const res = await query(sql, params);
  return parseInt(res.rows[0].c, 10);
}

module.exports = { all, byId, insert, update, remove, count, query };
