// file: dhlStations.js   (NEUE DATEI, ins Backend-Repo neben server.js)
// ============================================================
// DHL Service Points (Afrika) als Abholstationen importieren.
//
// Quelle: DHL "Location Finder – Unified" API (developer.dhl.com)
//   GET https://api.dhl.com/location-finder/v1/find-by-address
//   Header: DHL-API-Key: <Key>
//   Kostenloser Key, Start-Kontingent 500 Aufrufe/Tag.
//
// Regionen (Nord-, West-, Zentral-, Ost-, Suedliches Afrika) werden
// NICHT gespeichert, sondern immer aus dem Laendercode abgeleitet -
// so kann eine Station nie in der falschen Region stehen.
//
// Eingehaengt ueber shippingV2Routes.js (eine Zeile), server.js bleibt
// unveraendert.
//
// ENV (Render):
//   DHL_API_KEY          Pflicht fuer den Import
//   DHL_LF_RADIUS        Suchradius in Metern um die Stadt (Default 25000)
//   DHL_LF_PROVIDER      'express' (Default) | leer = alle DHL-Netze
//   DHL_LF_DELAY_MS      Pause zwischen Aufrufen (Default 1100)
//
// Migration (einmal):  GET /api/migrate-dhl-stations?secret=MIGRATION_SECRET
//
// Endpunkte (Admin):
//   GET    /api/admin/dhl-stations/meta            Regionen, Laender, Staedte
//   POST   /api/admin/dhl-stations/import          { country, cities? }
//   DELETE /api/admin/dhl-stations?country=XX      nur DHL-Importe loeschen
// Oeffentlich (Checkout):
//   GET    /api/pickup-stations/coverage          Laender + Staedte mit aktiven Stationen
// ============================================================

const { query } = require('./db');

const API_URL = 'https://api.dhl.com/location-finder/v1/find-by-address';

/* ------------------------------------------------------------
   REGIONEN + LAENDER + SUCHSTAEDTE
   Staedte = Suchzentren (Hauptstadt + groessere Staedte). Jede
   Stadt kostet 1 API-Aufruf; Doppeltreffer werden ueber die
   DHL-Standort-ID zusammengefuehrt.
   ------------------------------------------------------------ */
const REGIONS = [
  { key: 'north', label: 'Nordafrika', countries: [
    { iso: 'EG', name: 'Ägypten', cities: ['Cairo', 'Giza', 'Alexandria', 'Port Said', 'Suez', 'Mansoura', 'Tanta', 'Asyut', 'Luxor', 'Aswan', 'Hurghada', 'Sharm El Sheikh'] },
    { iso: 'DZ', name: 'Algerien', cities: ['Algiers', 'Oran', 'Constantine', 'Annaba', 'Setif', 'Blida', 'Batna', 'Hassi Messaoud'] },
    { iso: 'LY', name: 'Libyen', cities: ['Tripoli', 'Benghazi', 'Misrata'] },
    { iso: 'MA', name: 'Marokko', cities: ['Casablanca', 'Rabat', 'Marrakech', 'Tangier', 'Fes', 'Agadir', 'Meknes', 'Oujda', 'Kenitra'] },
    { iso: 'SD', name: 'Sudan', cities: ['Khartoum', 'Omdurman', 'Port Sudan'] },
    { iso: 'TN', name: 'Tunesien', cities: ['Tunis', 'Sfax', 'Sousse', 'Bizerte', 'Monastir', 'Gabes'] },
    { iso: 'EH', name: 'Westsahara', cities: ['Laayoune', 'Dakhla'] },
  ]},
  { key: 'west', label: 'Westafrika', countries: [
    { iso: 'BJ', name: 'Benin', cities: ['Cotonou', 'Porto-Novo', 'Parakou'] },
    { iso: 'BF', name: 'Burkina Faso', cities: ['Ouagadougou', 'Bobo-Dioulasso'] },
    { iso: 'CI', name: "Côte d'Ivoire", cities: ['Abidjan', 'Yamoussoukro', 'Bouake', 'San-Pedro'] },
    { iso: 'GM', name: 'Gambia', cities: ['Banjul', 'Serrekunda'] },
    { iso: 'GH', name: 'Ghana', cities: ['Accra', 'Tema', 'Kumasi', 'Takoradi', 'Tamale', 'Cape Coast'] },
    { iso: 'GN', name: 'Guinea', cities: ['Conakry'] },
    { iso: 'GW', name: 'Guinea-Bissau', cities: ['Bissau'] },
    { iso: 'CV', name: 'Kap Verde', cities: ['Praia', 'Mindelo', 'Espargos'] },
    { iso: 'LR', name: 'Liberia', cities: ['Monrovia'] },
    { iso: 'ML', name: 'Mali', cities: ['Bamako'] },
    { iso: 'MR', name: 'Mauretanien', cities: ['Nouakchott', 'Nouadhibou'] },
    { iso: 'NE', name: 'Niger', cities: ['Niamey'] },
    { iso: 'NG', name: 'Nigeria', cities: ['Lagos', 'Ikeja', 'Lekki', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan', 'Benin City', 'Enugu', 'Kaduna', 'Warri', 'Onitsha', 'Owerri', 'Calabar', 'Uyo', 'Aba', 'Jos', 'Ilorin', 'Abeokuta'] },
    { iso: 'SN', name: 'Senegal', cities: ['Dakar', 'Thies', 'Saint-Louis', 'Touba'] },
    { iso: 'SL', name: 'Sierra Leone', cities: ['Freetown'] },
    { iso: 'TG', name: 'Togo', cities: ['Lome'] },
  ]},
  { key: 'central', label: 'Zentralafrika', countries: [
    { iso: 'GQ', name: 'Äquatorialguinea', cities: ['Malabo', 'Bata'] },
    { iso: 'AO', name: 'Angola', cities: ['Luanda', 'Lobito', 'Benguela', 'Cabinda', 'Lubango'] },
    { iso: 'GA', name: 'Gabun', cities: ['Libreville', 'Port-Gentil'] },
    { iso: 'CM', name: 'Kamerun', cities: ['Douala', 'Yaounde', 'Limbe', 'Garoua'] },
    { iso: 'CG', name: 'Republik Kongo', cities: ['Brazzaville', 'Pointe-Noire'] },
    { iso: 'CD', name: 'DR Kongo', cities: ['Kinshasa', 'Lubumbashi', 'Goma', 'Matadi', 'Kolwezi', 'Bukavu', 'Kisangani', 'Mbuji-Mayi'] },
    { iso: 'ST', name: 'São Tomé und Príncipe', cities: ['Sao Tome'] },
    { iso: 'TD', name: 'Tschad', cities: ["N'Djamena"] },
    { iso: 'CF', name: 'Zentralafrikanische Republik', cities: ['Bangui'] },
  ]},
  { key: 'east', label: 'Ostafrika', countries: [
    { iso: 'BI', name: 'Burundi', cities: ['Bujumbura'] },
    { iso: 'DJ', name: 'Dschibuti', cities: ['Djibouti'] },
    { iso: 'ER', name: 'Eritrea', cities: ['Asmara'] },
    { iso: 'ET', name: 'Äthiopien', cities: ['Addis Ababa', 'Dire Dawa', 'Hawassa', 'Bahir Dar', 'Mekelle'] },
    { iso: 'KE', name: 'Kenia', cities: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika'] },
    { iso: 'RW', name: 'Ruanda', cities: ['Kigali'] },
    { iso: 'SC', name: 'Seychellen', cities: ['Victoria'] },
    { iso: 'SO', name: 'Somalia', cities: ['Mogadishu', 'Hargeisa'] },
    { iso: 'SS', name: 'Südsudan', cities: ['Juba'] },
    { iso: 'TZ', name: 'Tansania', cities: ['Dar es Salaam', 'Arusha', 'Dodoma', 'Mwanza', 'Zanzibar', 'Moshi'] },
    { iso: 'UG', name: 'Uganda', cities: ['Kampala', 'Entebbe', 'Jinja', 'Mbarara'] },
    { iso: 'KM', name: 'Komoren', cities: ['Moroni'] },
    { iso: 'MG', name: 'Madagaskar', cities: ['Antananarivo', 'Toamasina'] },
    { iso: 'MU', name: 'Mauritius', cities: ['Port Louis', 'Curepipe', 'Ebene'] },
  ]},
  { key: 'south', label: 'Südliches Afrika', countries: [
    { iso: 'BW', name: 'Botsuana', cities: ['Gaborone', 'Francistown'] },
    { iso: 'SZ', name: 'Eswatini', cities: ['Mbabane', 'Manzini'] },
    { iso: 'LS', name: 'Lesotho', cities: ['Maseru'] },
    { iso: 'MW', name: 'Malawi', cities: ['Lilongwe', 'Blantyre'] },
    { iso: 'MZ', name: 'Mosambik', cities: ['Maputo', 'Beira', 'Nampula'] },
    { iso: 'NA', name: 'Namibia', cities: ['Windhoek', 'Walvis Bay'] },
    { iso: 'ZM', name: 'Sambia', cities: ['Lusaka', 'Ndola', 'Kitwe'] },
    { iso: 'ZW', name: 'Simbabwe', cities: ['Harare', 'Bulawayo'] },
    { iso: 'ZA', name: 'Südafrika', cities: ['Johannesburg', 'Sandton', 'Pretoria', 'Cape Town', 'Durban', 'Gqeberha', 'Bloemfontein', 'East London', 'Polokwane', 'Mbombela', 'Kimberley', 'Rustenburg', 'Pietermaritzburg', 'George'] },
  ]},
];

const COUNTRY_INDEX = {};
REGIONS.forEach((r) => r.countries.forEach((c) => { COUNTRY_INDEX[c.iso] = { region: r.key, country: c }; }));

function regionOf(iso) {
  const e = COUNTRY_INDEX[String(iso || '').toUpperCase()];
  return e ? e.region : null;
}

/* ------------------------------------------------------------
   HILFSFUNKTIONEN
   ------------------------------------------------------------ */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function titleCase(s) {
  s = String(s || '').trim();
  if (!s) return s;
  // Nur umformen, wenn DHL alles in GROSSBUCHSTABEN liefert
  if (s !== s.toUpperCase()) return s;
  return s.toLowerCase().replace(/(^|[\s\-'’(])([a-zà-ÿ])/g, (m, p, c) => p + c.toUpperCase());
}

const DAY_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DAY_DE = { Monday: 'Mo', Tuesday: 'Di', Wednesday: 'Mi', Thursday: 'Do', Friday: 'Fr', Saturday: 'Sa', Sunday: 'So' };

// [{opens:'08:00:00',closes:'16:30:00',dayOfWeek:'http://schema.org/Monday'}] -> "Mo–Fr 08:00–16:30 · Sa 09:00–12:00"
function formatOpeningHours(list) {
  if (!Array.isArray(list) || !list.length) return null;
  const perDay = {};
  list.forEach((o) => {
    const day = String(o.dayOfWeek || '').split('/').pop();
    if (!DAY_DE[day]) return;
    const slot = String(o.opens || '').slice(0, 5) + '–' + String(o.closes || '').slice(0, 5);
    (perDay[day] = perDay[day] || []).push(slot);
  });
  const groups = [];
  DAY_ORDER.forEach((d) => {
    if (!perDay[d]) return;
    const hours = perDay[d].sort().join('/');
    const last = groups[groups.length - 1];
    const prevIdx = last ? DAY_ORDER.indexOf(last.to) : -2;
    if (last && last.hours === hours && prevIdx === DAY_ORDER.indexOf(d) - 1) last.to = d;
    else groups.push({ from: d, to: d, hours });
  });
  if (!groups.length) return null;
  return groups.map((g) => DAY_DE[g.from] + (g.to !== g.from ? '–' + DAY_DE[g.to] : '') + ' ' + g.hours).join(' · ');
}

/* ------------------------------------------------------------
   DHL-API
   ------------------------------------------------------------ */
async function dhlFind(countryCode, city) {
  const key = process.env.DHL_API_KEY;
  if (!key) { const e = new Error('DHL_API_KEY ist in Render nicht gesetzt'); e.code = 'NO_KEY'; throw e; }

  const radius = parseInt(process.env.DHL_LF_RADIUS || '25000', 10);
  const provider = process.env.DHL_LF_PROVIDER === undefined ? 'express' : process.env.DHL_LF_PROVIDER;

  const full = new URLSearchParams({ countryCode, addressLocality: city, limit: '50' });
  if (radius > 0) full.set('radius', String(radius));
  if (provider) full.set('providerType', provider);
  const minimal = new URLSearchParams({ countryCode, addressLocality: city, limit: '50' });

  // Erst mit allen Filtern; lehnt die API einen Parameter ab (400), minimal wiederholen.
  for (const params of [full, minimal]) {
    const r = await fetch(API_URL + '?' + params.toString(), {
      headers: { 'DHL-API-Key': key, Accept: 'application/json' },
    });
    if (r.status === 429) { const e = new Error('DHL-Tageslimit / Ratenlimit erreicht'); e.code = 'RATE_LIMIT'; throw e; }
    if (r.status === 401 || r.status === 403) { const e = new Error('DHL-API-Key ungültig oder nicht für Location Finder freigeschaltet'); e.code = 'NO_KEY'; throw e; }
    if (r.status === 404) return []; // keine Standorte / Ort unbekannt
    if (r.status === 400 && params === full) continue;
    if (!r.ok) {
      const t = await r.text().catch(() => '');
      throw new Error('DHL ' + r.status + ': ' + t.slice(0, 160));
    }
    const d = await r.json().catch(() => ({}));
    return Array.isArray(d.locations) ? d.locations : [];
  }
  return [];
}

function mapLocation(loc, fallbackCountry, fallbackCity) {
  const ids = (loc.location && loc.location.ids) || [];
  const externalId = (ids[0] && ids[0].locationId) || (loc.url ? String(loc.url).split('/').pop() : null);
  const addr = (loc.place && loc.place.address) || {};
  const geo = (loc.place && loc.place.geo) || {};
  const country = String(addr.countryCode || fallbackCountry || '').toUpperCase();
  const street = [addr.streetAddress, addr.postalCode].filter(Boolean).join(', ');
  return {
    external_id: externalId ? String(externalId) : null,
    country,
    city: titleCase(addr.addressLocality) || fallbackCity,
    name: loc.name || 'DHL Service Point',
    address: titleCase(street) || street,
    opening_hours: formatOpeningHours(loc.openingHours),
    latitude: geo.latitude != null ? Number(geo.latitude) : null,
    longitude: geo.longitude != null ? Number(geo.longitude) : null,
    services: Array.isArray(loc.serviceTypes) ? loc.serviceTypes : [],
  };
}

async function upsertStation(s) {
  // Neue Stationen aktiv; bei Wiederholung werden Adresse/Zeiten aktualisiert,
  // ein vom Admin gesetztes "inaktiv" bleibt erhalten.
  const r = await query(
    `INSERT INTO pickup_stations
       (country, city, name, address, phone, opening_hours, active,
        source, external_id, latitude, longitude, services)
     VALUES ($1,$2,$3,$4,NULL,$5,true,'dhl',$6,$7,$8,$9::jsonb)
     ON CONFLICT (source, external_id) WHERE external_id IS NOT NULL
     DO UPDATE SET
       country = EXCLUDED.country, city = EXCLUDED.city, name = EXCLUDED.name,
       address = EXCLUDED.address, opening_hours = EXCLUDED.opening_hours,
       latitude = EXCLUDED.latitude, longitude = EXCLUDED.longitude,
       services = EXCLUDED.services, updated_at = now()
     RETURNING (xmax = 0) AS inserted`,
    [s.country, s.city, s.name, s.address, s.opening_hours, s.external_id,
     s.latitude, s.longitude, JSON.stringify(s.services || [])]
  );
  return r.rows[0] && r.rows[0].inserted;
}

async function importCountry(iso, cities) {
  iso = String(iso || '').toUpperCase();
  const entry = COUNTRY_INDEX[iso];
  if (!entry) throw new Error('Unbekanntes Land: ' + iso);
  const list = (Array.isArray(cities) && cities.length ? cities : entry.country.cities)
    .map((c) => String(c).trim()).filter(Boolean);
  const delay = parseInt(process.env.DHL_LF_DELAY_MS || '1100', 10);

  const out = { country: iso, name: entry.country.name, region: entry.region,
    calls: 0, found: 0, inserted: 0, updated: 0, skipped: 0, errors: [], stopped: null };
  const seen = new Set();

  for (let i = 0; i < list.length; i++) {
    const city = list[i];
    let locs;
    try {
      out.calls++;
      locs = await dhlFind(iso, city);
    } catch (e) {
      if (e.code === 'RATE_LIMIT' || e.code === 'NO_KEY') { out.stopped = e.code; out.errors.push(e.message); break; }
      out.errors.push(city + ': ' + e.message);
      locs = [];
    }
    for (const loc of locs) {
      const s = mapLocation(loc, iso, city);
      // Nur Afrika-Laender speichern (Radius kann Grenzen ueberschreiten, z. B. Kinshasa/Brazzaville)
      if (!s.external_id || !COUNTRY_INDEX[s.country]) { out.skipped++; continue; }
      if (seen.has(s.external_id)) continue;
      seen.add(s.external_id);
      out.found++;
      if (await upsertStation(s)) out.inserted++; else out.updated++;
    }
    if (i < list.length - 1) await sleep(delay);
  }
  return out;
}

/* ------------------------------------------------------------
   ROUTEN
   ------------------------------------------------------------ */
function register(app, { requireAdmin }) {
  // Migration: Zusatzspalten + eindeutiger Index fuer DHL-IDs (idempotent)
  app.get('/api/migrate-dhl-stations', async (req, res) => {
    if (!process.env.MIGRATION_SECRET) return res.status(503).json({ error: 'MIGRATION_SECRET not set' });
    if (req.query.secret !== process.env.MIGRATION_SECRET) return res.status(401).json({ error: 'Invalid secret' });
    const log = [];
    try {
      const stmts = [
        `ALTER TABLE pickup_stations ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT 'manual'`,
        `ALTER TABLE pickup_stations ADD COLUMN IF NOT EXISTS external_id TEXT`,
        `ALTER TABLE pickup_stations ADD COLUMN IF NOT EXISTS latitude NUMERIC(9,6)`,
        `ALTER TABLE pickup_stations ADD COLUMN IF NOT EXISTS longitude NUMERIC(9,6)`,
        `ALTER TABLE pickup_stations ADD COLUMN IF NOT EXISTS services JSONB NOT NULL DEFAULT '[]'::jsonb`,
        `CREATE UNIQUE INDEX IF NOT EXISTS uniq_pickup_stations_source_ext
           ON pickup_stations (source, external_id) WHERE external_id IS NOT NULL`,
        `CREATE INDEX IF NOT EXISTS idx_pickup_stations_source ON pickup_stations (source)`,
      ];
      for (const sql of stmts) { await query(sql); log.push('ok: ' + sql.replace(/\s+/g, ' ').slice(0, 80)); }
      res.json({ ok: true, message: 'DHL-Stations-Schema bereit', log });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message, log });
    }
  });

  // OEFFENTLICH (Checkout): alle Laender + Staedte, in denen es aktive Abholstationen gibt.
  // So erscheinen neue Laender im Checkout automatisch, sobald dort eine Station aktiv ist.
  app.get('/api/pickup-stations/coverage', async (req, res) => {
    try {
      const r = await query(
        `SELECT country, array_agg(DISTINCT city ORDER BY city) AS cities, count(*)::int AS stations
           FROM pickup_stations
          WHERE active = true AND country <> '' AND city <> ''
          GROUP BY country
          ORDER BY country`
      );
      res.set('Cache-Control', 'public, max-age=300');
      res.json({ countries: r.rows });
    } catch (err) {
      res.json({ countries: [], error: err.message }); // Checkout darf nie blockieren
    }
  });

  app.get('/api/admin/dhl-stations/meta', requireAdmin, (req, res) => {
    res.json({
      keyConfigured: !!process.env.DHL_API_KEY,
      regions: REGIONS,
      totalCalls: REGIONS.reduce((n, r) => n + r.countries.reduce((m, c) => m + c.cities.length, 0), 0),
    });
  });

  // Ein Land pro Aufruf (haelt jede Anfrage kurz); das Frontend geht die Laender nacheinander durch.
  app.post('/api/admin/dhl-stations/import', requireAdmin, async (req, res) => {
    try {
      const { country, cities } = req.body || {};
      if (!country) return res.status(400).json({ error: 'country fehlt' });
      const out = await importCountry(country, cities);
      if (out.stopped === 'NO_KEY') return res.status(400).json({ error: out.errors[0], result: out });
      if (out.stopped === 'RATE_LIMIT') return res.status(429).json({ error: out.errors[0], result: out });
      res.json({ ok: true, result: out });
    } catch (err) {
      if (/column .* does not exist|no unique or exclusion constraint/i.test(err.message)) {
        return res.status(500).json({ error: 'Migration fehlt: /api/migrate-dhl-stations?secret=… aufrufen' });
      }
      res.status(500).json({ error: err.message });
    }
  });

  // Nur importierte DHL-Stationen loeschen (manuelle bleiben). Sendungen behalten ihre Daten nicht - pickup_station_id wird NULL.
  app.delete('/api/admin/dhl-stations', requireAdmin, async (req, res) => {
    try {
      const params = [];
      let where = `source = 'dhl'`;
      if (req.query.country) { params.push(String(req.query.country).toUpperCase()); where += ` AND country = $1`; }
      const r = await query(`DELETE FROM pickup_stations WHERE ${where}`, params);
      res.json({ ok: true, deleted: r.rowCount });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  console.log('[dhl-stations] DHL-Import-Endpunkte registriert');
}

module.exports = { register, REGIONS, regionOf, importCountry, formatOpeningHours };
