// auth.js — JWT-Helper + Middleware
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// Token-Laufzeiten (per ENV in Render aenderbar, Format wie '30d', '12h', '90m')
//   Haendler & Kunden: 30 Tage (bleiben im Dashboard eingeloggt)
//   Admins:            12 Stunden (Admin-Konto kann alles - kurze Laufzeit
//                      begrenzt den Schaden, falls ein Token abhanden kommt)
const ACCESS_TOKEN_TTL = process.env.ACCESS_TOKEN_TTL || '30d';
const ADMIN_TOKEN_TTL  = process.env.ADMIN_TOKEN_TTL  || '12h';

if (!JWT_SECRET) {
  console.error('FATAL: JWT_SECRET environment variable not set');
  process.exit(1);
}

function ttlFor(user) {
  return user && user.role === 'admin' ? ADMIN_TOKEN_TTL : ACCESS_TOKEN_TTL;
}

function signAccessToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: ttlFor(user) }
  );
}

function verifyAccessToken(token) {
  try { return jwt.verify(token, JWT_SECRET); }
  catch { return null; }
}

function requireAuth(req, res, next) {
  const header = (req.headers.authorization || '').trim();
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'auth_required' });
  const payload = verifyAccessToken(token);
  if (!payload) return res.status(401).json({ error: 'invalid_or_expired_token' });
  req.user = { id: payload.sub, email: payload.email, role: payload.role, name: payload.name };
  next();
}

function optionalAuth(req, res, next) {
  const header = (req.headers.authorization || '').trim();
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (token) {
    const payload = verifyAccessToken(token);
    if (payload) req.user = { id: payload.sub, email: payload.email, role: payload.role, name: payload.name };
  }
  next();
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'auth_required' });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'forbidden', required_roles: roles });
    }
    next();
  };
}

console.log('[auth] Token-Laufzeit: Nutzer', ACCESS_TOKEN_TTL, '| Admin', ADMIN_TOKEN_TTL);

module.exports = { signAccessToken, verifyAccessToken, requireAuth, optionalAuth, requireRole };
