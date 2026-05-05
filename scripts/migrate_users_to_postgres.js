// scripts/migrate_users_to_postgres.js
// One-Time-Migration: data/users.json → Postgres users (mit bcrypt)
// Verwendet 'phone' Spalte (wie in der echten Tabelle)

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { query } = require('../storeDb');

const ROLE_MAP = {
  'admin': 'admin',
  'buyer': 'customer',
  'customer': 'customer',
  'seller': 'dealer',
  'dealer': 'dealer',
};

async function migrateUsers() {
  const jsonPath = path.join(__dirname, '..', 'data', 'users.json');

  if (!fs.existsSync(jsonPath)) {
    return { ok: true, migrated: 0, skipped: 0, message: 'users.json nicht gefunden' };
  }

  let users;
  try {
    users = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  } catch (err) {
    return { ok: false, error: 'users.json konnte nicht geparst werden: ' + err.message };
  }

  if (!Array.isArray(users)) {
    return { ok: false, error: 'users.json ist kein Array' };
  }

  let migrated = 0;
  let skipped = 0;
  const errors = [];

  for (const u of users) {
    if (!u.email || !u.password) {
      skipped++;
      errors.push(`(unbekannte email): email oder password fehlt im JSON`);
      continue;
    }

    const email = String(u.email).trim().toLowerCase();
    const role = ROLE_MAP[u.role] || 'customer';
    const passwordHash = await bcrypt.hash(String(u.password), 12);
    const name = u.name || null;
    const phone = u.phone || u.whatsapp || null;
    const country = u.country || null;

    try {
      const result = await query(`
        INSERT INTO users (email, password_hash, name, role, phone, country, email_verified)
        VALUES ($1, $2, $3, $4, $5, $6, FALSE)
        ON CONFLICT (LOWER(email)) DO NOTHING
        RETURNING id
      `, [email, passwordHash, name, role, phone, country]);

      if (result.rows.length > 0) {
        migrated++;
      } else {
        skipped++;
        errors.push(`${email}: bereits in Postgres vorhanden`);
      }
    } catch (err) {
      skipped++;
      errors.push(`${email}: ${err.message}`);
    }
  }

  return {
    ok: true,
    total: users.length,
    migrated,
    skipped,
    errors: errors.slice(0, 10),
  };
}

module.exports = { migrateUsers };
