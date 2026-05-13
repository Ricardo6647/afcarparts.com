// file: r2.js
// Cloudflare R2 Upload Helper
// Phase 2 — lädt Bilder zu R2 hoch statt aufs Render-Filesystem
//
// Erwartete Env-Variablen:
//   R2_ENDPOINT             https://dee04e941f5c789ccf6988a4dbc94ea2.r2.cloudflarestorage.com
//   R2_ACCESS_KEY_ID        f8906b2a8086ad2f25e84cfd8cb3f2de
//   R2_SECRET_ACCESS_KEY    6939d5da78408471b1dde67016b6b3dd1306f21cff2dae63afa4d9391badf39f
//   R2_BUCKET               afcarparts-uploads
//   R2_PUBLIC_URL           https://pub-b1d8a7c0f5d44beea6807a65be08c3e4.r2.dev

const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const path = require('path');
const crypto = require('crypto');

const {
  R2_ENDPOINT,
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
  R2_BUCKET,
  R2_PUBLIC_URL,
} = process.env;

const isConfigured = !!(R2_ENDPOINT && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY && R2_BUCKET && R2_PUBLIC_URL);

if (!isConfigured) {
  console.warn('[R2] Nicht konfiguriert — alle benoetigten Env-Variablen pruefen: R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET, R2_PUBLIC_URL.');
} else {
  console.log('[R2] konfiguriert, Bucket=' + R2_BUCKET + ', Public=' + R2_PUBLIC_URL);
}

const s3 = isConfigured ? new S3Client({
  region: 'auto',
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
}) : null;

const ALLOWED_EXT = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

/**
 * Laedt einen Buffer zu R2 hoch und gibt die oeffentliche URL zurueck.
 * @param {Buffer} buffer        Datei-Inhalt
 * @param {string} originalName  Original-Dateiname (fuer die Endung)
 * @param {string} mimeType      MIME-Typ (image/jpeg, image/png ...)
 * @param {string} folder        Unterordner im Bucket ('products' | 'banners' | ...)
 * @returns {Promise<string>}    Oeffentliche URL des hochgeladenen Bildes
 */
async function uploadToR2(buffer, originalName, mimeType, folder = 'products') {
  if (!isConfigured) {
    throw new Error('R2 nicht konfiguriert — Env-Variablen pruefen');
  }

  const ext = (path.extname(originalName) || '.jpg').toLowerCase();
  const safeExt = ALLOWED_EXT.includes(ext) ? ext : '.jpg';
  const safeFolder = String(folder || 'products').replace(/[^a-z0-9-]/gi, '').toLowerCase() || 'products';

  const filename = Date.now() + '-' + crypto.randomBytes(6).toString('hex') + safeExt;
  const key = safeFolder + '/' + filename;

  await s3.send(new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
    Body: buffer,
    ContentType: mimeType || 'application/octet-stream',
    CacheControl: 'public, max-age=31536000, immutable',
  }));

  const publicBase = R2_PUBLIC_URL.replace(/\/$/, '');
  return publicBase + '/' + key;
}

/**
 * Loescht ein Objekt aus R2 anhand seiner oeffentlichen URL.
 * Idempotent: Fehler werden geloggt, nicht geworfen.
 * @param {string} url
 */
async function deleteFromR2(url) {
  if (!isConfigured || !url) return;
  const publicBase = R2_PUBLIC_URL.replace(/\/$/, '');
  if (!url.startsWith(publicBase + '/')) return; // nicht auf unserem R2 → ignorieren

  const key = url.slice(publicBase.length + 1);

  try {
    await s3.send(new DeleteObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
    }));
    console.log('[R2] geloescht:', key);
  } catch (err) {
    console.error('[R2] Delete fehlgeschlagen:', key, err.message);
  }
}

module.exports = { uploadToR2, deleteFromR2, isConfigured };
