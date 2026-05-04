-- migrations/005_products_multilang.sql
-- AFRICARPARTS - Products umbauen: mehrsprachig + Tags + bessere Suche
--
-- Was passiert:
-- 1. Alte products-Tabelle wird ersetzt (Daten gehen verloren - DB ist leer, also OK)
-- 2. Neue products-Tabelle ohne title/description (kommen in product_translations)
-- 3. Neue product_translations-Tabelle (title + description pro Sprache)
-- 4. Volltext-Suche-Index pro Sprache
-- 5. Tag-System ist schon angelegt (Migration 003), wird hier nur verknuepft

-- ============================================================
-- AUFRAEUMEN
-- ============================================================
DROP TABLE IF EXISTS product_tags CASCADE;
DROP TABLE IF EXISTS product_translations CASCADE;
DROP TABLE IF EXISTS products CASCADE;

-- ============================================================
-- PRODUCTS (sprachneutrale Felder)
-- ============================================================
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  
  -- Sprach-Default: in welcher Sprache wurde das Produkt urspruenglich eingegeben?
  -- Wird als Fallback verwendet, wenn die gewuenschte Sprache nicht vorhanden ist.
  default_lang TEXT NOT NULL DEFAULT 'en'
    CHECK (default_lang IN ('en', 'de', 'fr', 'pt', 'ar')),
  
  -- Sprachneutrale Felder
  price_usd NUMERIC(12, 2) NOT NULL,
  brand TEXT,
  model TEXT,
  oem TEXT,
  condition TEXT NOT NULL DEFAULT 'new'
    CHECK (condition IN ('new', 'used', 'refurbished')),
  
  -- Beziehungen
  category_id BIGINT REFERENCES categories(id) ON DELETE SET NULL,
  shop_id BIGINT REFERENCES shops(id) ON DELETE CASCADE,
  seller_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  
  -- Bilder als JSON-Array (echte Bilder kommen spaeter in R2)
  images JSONB NOT NULL DEFAULT '[]'::jsonb,
  
  -- Lager und Status
  stock INTEGER NOT NULL DEFAULT 0,
  is_china_seller BOOLEAN NOT NULL DEFAULT FALSE,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  
  -- Statistiken (fuer Sortierung/Empfehlungen)
  view_count INTEGER NOT NULL DEFAULT 0,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indizes fuer schnelle Filter
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_shop ON products(shop_id);
CREATE INDEX idx_products_seller ON products(seller_id);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_active ON products(active);
CREATE INDEX idx_products_china ON products(is_china_seller) WHERE is_china_seller = TRUE;
CREATE INDEX idx_products_created ON products(created_at DESC);
CREATE INDEX idx_products_price ON products(price_usd);
CREATE INDEX idx_products_oem ON products(oem) WHERE oem IS NOT NULL;

-- updated_at Trigger
CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- PRODUCT_TRANSLATIONS
-- ============================================================
CREATE TABLE product_translations (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  lang TEXT NOT NULL CHECK (lang IN ('en', 'de', 'fr', 'pt', 'ar')),
  title TEXT NOT NULL,
  description TEXT,
  UNIQUE (product_id, lang)
);

CREATE INDEX idx_prodtrans_product ON product_translations(product_id);
CREATE INDEX idx_prodtrans_lang ON product_translations(lang);

-- Volltext-Suche-Index (Postgres GIN auf tsvector)
-- Diese Variante nutzt 'simple' Konfiguration, die in allen Sprachen funktioniert.
-- Spezifischere Sprach-Konfigurationen koennen wir spaeter hinzufuegen.
CREATE INDEX idx_prodtrans_search ON product_translations USING gin(
  to_tsvector('simple',
    coalesce(title, '') || ' ' ||
    coalesce(description, '')
  )
);

-- Trigram-Index fuer "ILIKE %suchbegriff%" (fuzzy search)
-- Erfordert die pg_trgm Extension
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX idx_prodtrans_title_trgm ON product_translations USING gin(title gin_trgm_ops);

-- ============================================================
-- PRODUCT_TAGS (n:m Verknuepfung)
-- ============================================================
CREATE TABLE product_tags (
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  tag_id BIGINT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, tag_id)
);

CREATE INDEX idx_prodtag_product ON product_tags(product_id);
CREATE INDEX idx_prodtag_tag ON product_tags(tag_id);

-- ============================================================
-- TRIGGER: usage_count automatisch aktualisieren
-- Wenn ein product_tag eingefuegt/geloescht wird,
-- update tags.usage_count entsprechend
-- ============================================================
CREATE OR REPLACE FUNCTION update_tag_usage()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE tags SET usage_count = usage_count + 1 WHERE id = NEW.tag_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE tags SET usage_count = GREATEST(0, usage_count - 1) WHERE id = OLD.tag_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER product_tags_usage_count
  AFTER INSERT OR DELETE ON product_tags
  FOR EACH ROW EXECUTE FUNCTION update_tag_usage();
