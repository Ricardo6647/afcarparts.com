// banner.controller.js
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR  = path.join(__dirname, 'data');
const FILE      = path.join(DATA_DIR, 'banners.json');

async function ensureFile() {
  if (!existsSync(DATA_DIR)) await mkdir(DATA_DIR, { recursive: true });
  if (!existsSync(FILE))     await writeFile(FILE, '[]', 'utf8');
}

async function readAll() {
  await ensureFile();
  const txt = await readFile(FILE, 'utf8');
  try { return JSON.parse(txt) || []; }
  catch { return []; }
}

async function writeAll(arr) {
  await ensureFile();
  await writeFile(FILE, JSON.stringify(arr, null, 2), 'utf8');
}

function nextId(arr) {
  return arr.reduce((max, b) => Math.max(max, Number(b.id) || 0), 0) + 1;
}

function isWithinSchedule(b, now = Date.now()) {
  if (b.start_date && new Date(b.start_date).getTime() > now) return false;
  if (b.end_date   && new Date(b.end_date).getTime()   < now) return false;
  return true;
}

// ----- PUBLIC -----
export async function getActiveBanners(req, res) {
  try {
    const all = await readAll();
    const active = all
      .filter(b => b.active && isWithinSchedule(b))
      .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
      .map(({ id, title, image_url, link_url, alt_text, position }) =>
           ({ id, title, image_url, link_url, alt_text, position }));
    res.json(active);
  } catch (err) {
    console.error('getActiveBanners', err);
    res.status(500).json({ error: 'Failed to load banners' });
  }
}

// ----- ADMIN -----
export async function listBanners(req, res) {
  try {
    const all = await readAll();
    all.sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
    res.json(all);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load banners' });
  }
}

export async function createBanner(req, res) {
  try {
    const { title, image_url } = req.body || {};
    if (!title || !image_url) {
      return res.status(400).json({ error: 'title and image_url are required' });
    }
    const all = await readAll();
    const now = new Date().toISOString();
    const banner = {
      id:         nextId(all),
      title,
      image_url,
      link_url:   req.body.link_url   || null,
      alt_text:   req.body.alt_text   || null,
      position:   Number(req.body.position ?? 0),
      active:     req.body.active !== undefined ? !!req.body.active : true,
      start_date: req.body.start_date || null,
      end_date:   req.body.end_date   || null,
      created_at: now,
      updated_at: now,
    };
    all.push(banner);
    await writeAll(all);
    res.status(201).json(banner);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create banner' });
  }
}

export async function updateBanner(req, res) {
  try {
    const id = Number(req.params.id);
    const all = await readAll();
    const idx = all.findIndex(b => Number(b.id) === id);
    if (idx === -1) return res.status(404).json({ error: 'Banner not found' });

    const allowed = ['title', 'image_url', 'link_url', 'alt_text', 'position', 'active', 'start_date', 'end_date'];
    for (const key of allowed) {
      if (req.body[key] !== undefined) {
        all[idx][key] = (key === 'position') ? Number(req.body[key])
                      : (key === 'active')   ? !!req.body[key]
                      : req.body[key];
      }
    }
    all[idx].updated_at = new Date().toISOString();
    await writeAll(all);
    res.json(all[idx]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update banner' });
  }
}

export async function deleteBanner(req, res) {
  try {
    const id = Number(req.params.id);
    const all = await readAll();
    const next = all.filter(b => Number(b.id) !== id);
    if (next.length === all.length) return res.status(404).json({ error: 'Banner not found' });
    await writeAll(next);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete banner' });
  }
}
