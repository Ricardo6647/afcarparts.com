// db.js — zentrale Postgres-Verbindung
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('render.com')
    ? { rejectUnauthorized: false }
    : false,
});

pool.on('connect', () => {
  console.log('✅ Postgres connected');
});

pool.on('error', (err) => {
  console.error('❌ Postgres pool error:', err);
});

async function query(text, params) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('Query:', { duration, rows: res.rowCount });
  return res;
}

module.exports = { query, pool };
