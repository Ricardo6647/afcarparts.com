// userDb.js — User-DB-Layer
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { query } = require('./storeDb'); // ← passt zur bestehenden Konvention

const BCRYPT_ROUNDS = 12;
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;
const DUMMY_HASH = '$2a$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalid';

const normalizeEmail = (e) => String(e || '').trim().toLowerCase();
const generateToken = () => crypto.randomBytes(32).toString('hex');
const sha256 = (s) => crypto.createHash('sha256').update(s).digest('hex');

// === REGISTER ===
async function registerUser({ email, password, name, role = 'customer', whatsapp = null }) {
  const e = normalizeEmail(email);
  if (!e || !password) throw new Error('email_password_required');
  if (password.length < 8) throw new Error('password_too_short');
  if (!['customer', 'dealer'].includes(role)) throw new Error('invalid_role');

  const hash = await bcrypt.hash(password, BCRYPT_ROUNDS);
  try {
    const { rows } = await query(
      `INSERT INTO users (email, password_hash, name, role, whatsapp)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, email, name, role, email_verified, created_at`,
      [e, hash, name, role, whatsapp]
    );
    return rows[0];
  } catch (err) {
    if (err.code === '23505') throw new Error('email_already_exists');
    throw err;
  }
}

// === LOGIN ===
async function loginUser({ email, password, ip = null }) {
  const e = normalizeEmail(email);
  if (!e || !password) throw new Error('email_password_required');

  const { rows } = await query(
    `SELECT id, email, name, role, password_hash, 
            failed_login_attempts, locked_until, email_verified
     FROM users WHERE LOWER(email) = $1`,
    [e]
  );

  if (rows.length === 0) {
    await bcrypt.compare(password, DUMMY_HASH);
    throw new Error('invalid_credentials');
  }

  const user = rows[0];

  if (user.locked_until && new Date(user.locked_until) > new Date()) {
    throw new Error('account_locked');
  }

  const valid = user.password_hash 
    ? await bcrypt.compare(password, user.password_hash) 
    : false;

  if (!valid) {
    const attempts = user.failed_login_attempts + 1;
    const lock = attempts >= MAX_FAILED_ATTEMPTS;
    await query(
      `UPDATE users SET 
         failed_login_attempts = $1,
         locked_until = CASE WHEN $2 
            THEN NOW() + INTERVAL '${LOCKOUT_MINUTES} minutes' 
            ELSE locked_until END
       WHERE id = $3`,
      [attempts, lock, user.id]
    );
    throw new Error(lock ? 'account_locked' : 'invalid_credentials');
  }

  await query(
    `UPDATE users SET 
       failed_login_attempts = 0, locked_until = NULL,
       last_login_at = NOW(), last_login_ip = $1
     WHERE id = $2`,
    [ip, user.id]
  );

  return {
    id: user.id, email: user.email, name: user.name,
    role: user.role, email_verified: user.email_verified,
  };
}

// === REFRESH TOKENS ===
async function createRefreshToken(userId, { userAgent, ip, ttlDays = 30 }) {
  const raw = generateToken();
  await query(
    `INSERT INTO refresh_tokens (user_id, token_hash, user_agent, ip_address, expires_at)
     VALUES ($1, $2, $3, $4, NOW() + INTERVAL '${ttlDays} days')`,
    [userId, sha256(raw), userAgent, ip]
  );
  return raw;
}

async function validateRefreshToken(rawToken) {
  if (!rawToken) return null;
  const { rows } = await query(
    `SELECT rt.id, rt.user_id, u.email, u.role, u.name
     FROM refresh_tokens rt
     JOIN users u ON u.id = rt.user_id
     WHERE rt.token_hash = $1 AND rt.revoked_at IS NULL AND rt.expires_at > NOW()`,
    [sha256(rawToken)]
  );
  return rows[0] || null;
}

async function revokeRefreshToken(rawToken) {
  if (!rawToken) return;
  await query(
    `UPDATE refresh_tokens SET revoked_at = NOW() WHERE token_hash = $1`,
    [sha256(rawToken)]
  );
}

async function revokeAllUserTokens(userId) {
  await query(
    `UPDATE refresh_tokens SET revoked_at = NOW() 
     WHERE user_id = $1 AND revoked_at IS NULL`,
    [userId]
  );
}

// === PASSWORD MANAGEMENT ===
async function changePassword(userId, oldPassword, newPassword) {
  if (!newPassword || newPassword.length < 8) throw new Error('password_too_short');
  const { rows } = await query('SELECT password_hash FROM users WHERE id = $1', [userId]);
  if (!rows[0]) throw new Error('user_not_found');
  const valid = await bcrypt.compare(oldPassword || '', rows[0].password_hash || '');
  if (!valid) throw new Error('invalid_credentials');
  const hash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
  await query('UPDATE users SET password_hash = $1 WHERE id = $2', [hash, userId]);
  await revokeAllUserTokens(userId);
}

async function requestPasswordReset(email) {
  const e = normalizeEmail(email);
  const token = generateToken();
  const { rowCount } = await query(
    `UPDATE users SET 
       password_reset_token = $1, 
       password_reset_expires_at = NOW() + INTERVAL '1 hour'
     WHERE LOWER(email) = $2`,
    [token, e]
  );
  return rowCount > 0 ? token : null;
}

async function resetPassword(token, newPassword) {
  if (!newPassword || newPassword.length < 8) throw new Error('password_too_short');
  const hash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
  const { rows } = await query(
    `UPDATE users SET 
       password_hash = $1, password_reset_token = NULL, 
       password_reset_expires_at = NULL,
       failed_login_attempts = 0, locked_until = NULL
     WHERE password_reset_token = $2 AND password_reset_expires_at > NOW()
     RETURNING id`,
    [hash, token]
  );
  if (rows.length === 0) throw new Error('invalid_or_expired_token');
  await revokeAllUserTokens(rows[0].id);
  return rows[0].id;
}

async function getUserById(id) {
  const { rows } = await query(
    `SELECT id, email, name, role, whatsapp, email_verified, last_login_at, created_at
     FROM users WHERE id = $1`,
    [id]
  );
  return rows[0] || null;
}

module.exports = {
  registerUser, loginUser,
  createRefreshToken, validateRefreshToken, revokeRefreshToken, revokeAllUserTokens,
  changePassword, requestPasswordReset, resetPassword, getUserById,
};
