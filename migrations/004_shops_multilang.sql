-- migrations/004_shops_multilang.sql
-- AFRICARPARTS - Shops umbauen: zusaetzliche Felder + mehrsprachige Beschreibung
--
-- Was passiert:
-- 1. shops-Tabelle bekommt neue Spalten (slug, city, email, phone)
-- 2. Spalte description wird ENTFERNT aus shops (kommt in shop_translations)
-- 3. Neue shop_translations-Tabelle (Beschreibung pro Sprache)

-- Falls schon Daten in shops, wuerden sie verloren gehen.
-- Da die Tabelle gerade erst angelegt wurde und leer ist, ist das OK.

-- ============================================================
-- AUFRAEUMEN VON ABHAENGIGKEITEN
-- ============================================================
-- Falls products.shop_id schon Foreign Key hat, kurz raus damit
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_shop_id_fkey;

DROP TABLE IF EXISTS shop_translations CASCADE;
DROP TABLE IF EXISTS shops CASCADE;

-- ============================================================
-- SHOPS (erweitert)
-- ============================================================
CREATE TABLE shops (
  id BIGSERIAL PRIMARY KEY,
  owner_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  country TEXT,
  city TEXT,
  email TEXT,
  phone TEXT,
  is_china BOOLEAN NOT NULL DEFAULT FALSE,
  logo_url TEXT,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_shops_slug ON shops(slug);
CREATE INDEX idx_shops_owner ON shops(owner_id);
CREATE INDEX idx_shops_country ON shops(country);
CREATE INDEX idx_shops_active ON shops(active);

-- updated_at Trigger
CREATE TRIGGER shops_updated_at
  BEFORE UPDATE ON shops
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- SHOP_TRANSLATIONS
-- ============================================================
CREATE TABLE shop_translations (
  id BIGSERIAL PRIMARY KEY,
  shop_id BIGINT NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
  lang TEXT NOT NULL CHECK (lang IN ('en', 'de', 'fr', 'pt', 'ar')),
  description TEXT,
  UNIQUE (shop_id, lang)
);

CREATE INDEX idx_shoptrans_shop ON shop_translations(shop_id);
CREATE INDEX idx_shoptrans_lang ON shop_translations(lang);

-- ============================================================
-- Foreign Key zu products wieder herstellen
-- ============================================================
ALTER TABLE products
  ADD CONSTRAINT products_shop_id_fkey
  FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE;
