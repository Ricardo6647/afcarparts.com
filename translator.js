/**
 * translator.js — Auto-Übersetzung via MyMemory Translation API (KOMPLETT KOSTENLOS)
 *
 * Verwendet die MyMemory API von Translated.net.
 * Komplett kostenlos, keine Kreditkarte, kein Cloud-Account nötig.
 *
 * LIMITS
 *   - Anonym: 5.000 Wörter/Tag (~5 Produkte/Tag)
 *   - Mit Email in env MYMEMORY_EMAIL: 50.000 Wörter/Tag (~50 Produkte/Tag)
 *   - MyMemory limitiert pro Anfrage auf 500 Zeichen — wir splitten längere
 *     Texte automatisch an Satzgrenzen und fügen das Ergebnis wieder zusammen.
 *
 * REQUIREMENTS
 *   - Node.js 18+ (für globales fetch). Bei älteren Versionen: `npm i node-fetch`
 *     und oben in dieser Datei `const fetch = require('node-fetch');` ergänzen.
 *   - Empfohlen: Env-Variable MYMEMORY_EMAIL für 10× höheres Limit.
 *     (Beliebige gültige Mailadresse — keine Bestätigung nötig.)
 *
 * SAFETY
 *   - API-Fehler werden geloggt, das Produkt wird trotzdem gespeichert.
 *   - Einzelne Zielsprachen können fehlschlagen, ohne andere zu beeinträchtigen.
 *   - Längen werden gekappt zum Schutz gegen Rate-Limit-Exhaustion.
 */

const SUPPORTED_LANGS = ['en', 'de', 'fr', 'pt', 'es', 'sw'];

const MAX_TITLE_LEN = 500;
const MAX_DESC_LEN = 5000;
const MYMEMORY_CHUNK = 450; // Sicherheitspuffer unter 500

/**
 * Splittet langen Text in Chunks <= MYMEMORY_CHUNK Zeichen.
 * Bevorzugt Splits an Satzgrenzen für bessere Übersetzungsqualität.
 */
function chunkText(text, maxLen = MYMEMORY_CHUNK) {
  if (!text) return [];
  if (text.length <= maxLen) return [text];

  const chunks = [];
  const sentences = text.split(/(?<=[.!?])\s+/); // Split an Satzende
  let current = '';

  for (const s of sentences) {
    if (s.length > maxLen) {
      // Einzelner Satz zu lang — hartes Splitten
      if (current) { chunks.push(current); current = ''; }
      for (let i = 0; i < s.length; i += maxLen) {
        chunks.push(s.substring(i, Math.min(i + maxLen, s.length)));
      }
    } else if ((current ? current + ' ' + s : s).length > maxLen) {
      if (current) chunks.push(current);
      current = s;
    } else {
      current = current ? current + ' ' + s : s;
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

/**
 * Interne Funktion: übersetzt ein einzelnes Textstück (<=500 Zeichen)
 * in eine Zielsprache via MyMemory.
 */
async function translateChunk(text, sourceLang, targetLang, email) {
  const params = new URLSearchParams({
    q: text,
    langpair: sourceLang + '|' + targetLang,
  });
  if (email) params.set('de', email);

  const url = 'https://api.mymemory.translated.net/get?' + params.toString();

  let res;
  try {
    res = await fetch(url);
  } catch (err) {
    throw new Error('mymemory network error: ' + err.message);
  }

  if (!res.ok) {
    throw new Error('mymemory API error ' + res.status);
  }

  const data = await res.json();

  // MyMemory liefert responseStatus auch als String "200" — beide Fälle abfangen
  const status = Number(data.responseStatus);
  if (status >= 400) {
    throw new Error('mymemory error ' + status + ': ' + (data.responseDetails || 'unknown'));
  }

  return (data.responseData && data.responseData.translatedText) || text;
}

/**
 * Übersetzt einen kompletten Text (mit ggf. automatischem Chunking) in eine Zielsprache.
 * Chunks werden parallel ausgeführt und zusammengefügt.
 */
async function translateFullText(text, sourceLang, targetLang, email) {
  if (!text || !text.trim()) return null;
  const chunks = chunkText(text);
  const promises = chunks.map((chunk) =>
    translateChunk(chunk, sourceLang, targetLang, email)
  );
  const translations = await Promise.all(promises);
  return translations.join(' ');
}

/**
 * Übersetzt Titel + Beschreibung von einer Quellsprache in mehrere Zielsprachen.
 * Vollständig parallel — über Sprachen UND über Text-Chunks.
 *
 * @param {object} opts
 * @param {string} opts.sourceLang - z.B. 'de'
 * @param {string} opts.title
 * @param {string} [opts.description]
 * @param {string[]} opts.targetLangs - Zielsprachen (Quellsprache wird automatisch ausgefiltert)
 * @returns {Promise<Object<string, {title:string, description:string|null}>>}
 */
async function translateProductFields({ sourceLang, title, description, targetLangs }) {
  if (!title || !title.trim()) throw new Error('translator: title is required');

  const email = process.env.MYMEMORY_EMAIL || null;

  const safeTitle = title.substring(0, MAX_TITLE_LEN);
  const safeDesc = (description || '').substring(0, MAX_DESC_LEN);

  const targets = (targetLangs || []).filter(
    (l) => l !== sourceLang && SUPPORTED_LANGS.includes(l)
  );
  if (targets.length === 0) return {};

  // Pro Zielsprache: Titel + Beschreibung gleichzeitig übersetzen, beide ggf. gechunkt
  const promises = targets.map(async (target) => {
    try {
      const [titleT, descT] = await Promise.all([
        translateFullText(safeTitle, sourceLang, target, email),
        safeDesc ? translateFullText(safeDesc, sourceLang, target, email) : Promise.resolve(null),
      ]);
      return { target, title: titleT, description: descT };
    } catch (err) {
      console.error('[translator] failed for "' + target + '":', err.message);
      return null;
    }
  });

  const results = await Promise.all(promises);

  const out = {};
  results.forEach((r) => {
    if (!r) return;
    out[r.target] = { title: r.title, description: r.description };
  });
  return out;
}

/**
 * Füllt das `translations` Feld eines Produkts mit Übersetzungen aller unterstützten Sprachen.
 * Wenn API fehlschlägt, wird nur die Quellsprache gespeichert (Produkt-Save nicht blockiert).
 *
 * @param {object} opts
 * @param {string} opts.defaultLang
 * @param {string} opts.title
 * @param {string} [opts.description]
 * @returns {Promise<Object<string, {title:string, description:string|null}>>}
 */
async function autoFillTranslations({ defaultLang, title, description }) {
  const lang = defaultLang && SUPPORTED_LANGS.includes(defaultLang) ? defaultLang : 'en';

  const translations = {
    [lang]: {
      title: (title || '').trim(),
      description: description ? description.trim() : null,
    },
  };

  if (!title || !title.trim()) return translations;

  const targets = SUPPORTED_LANGS.filter((l) => l !== lang);

  try {
    const translated = await translateProductFields({
      sourceLang: lang,
      title: title.trim(),
      description: description ? description.trim() : '',
      targetLangs: targets,
    });
    Object.assign(translations, translated);
  } catch (err) {
    console.error('[translator] autoFillTranslations failed:', err.message);
    // Nicht weiterwerfen — Produkt soll trotzdem gespeichert werden
  }

  return translations;
}

module.exports = {
  translateProductFields,
  autoFillTranslations,
  SUPPORTED_LANGS,
};
