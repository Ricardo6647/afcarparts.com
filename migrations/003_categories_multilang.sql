-- migrations/003_categories_multilang.sql
-- AFRICARPARTS - Categories umbauen auf mehrsprachiges Schema + Tags-System
--
-- Was passiert:
-- 1. Alte categories-Tabelle wird ersetzt (Daten gehen verloren - das ist OK)
-- 2. Neue categories-Tabelle ohne name (sprachneutral mit slug)
-- 3. Neue category_translations-Tabelle fuer Uebersetzungen
-- 4. Neue tags-Tabelle (organisch wachsender Pool)
-- 5. Neue product_tags-Tabelle (Verknuepfung Produkt <-> Tag)
-- 6. 12 Standard-Hauptkategorien in 5 Sprachen (en, de, fr, pt, ar)

-- ============================================================
-- AUFRAEUMEN
-- ============================================================
-- Foreign Key zu products.category_id muss vorher gedroppt werden
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_category_id_fkey;

DROP TABLE IF EXISTS product_tags CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS category_translations CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- ============================================================
-- CATEGORIES (sprachneutral)
-- ============================================================
CREATE TABLE categories (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  icon_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_active ON categories(active);
CREATE INDEX idx_categories_sort ON categories(sort_order);

-- ============================================================
-- CATEGORY_TRANSLATIONS
-- ============================================================
CREATE TABLE category_translations (
  id BIGSERIAL PRIMARY KEY,
  category_id BIGINT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  lang TEXT NOT NULL CHECK (lang IN ('en', 'de', 'fr', 'pt', 'ar')),
  name TEXT NOT NULL,
  UNIQUE (category_id, lang)
);

CREATE INDEX idx_cattrans_category ON category_translations(category_id);
CREATE INDEX idx_cattrans_lang ON category_translations(lang);

-- ============================================================
-- TAGS (Pool von wiederverwendbaren Tags)
-- ============================================================
CREATE TABLE tags (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  usage_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_tags_slug ON tags(slug);
CREATE INDEX idx_tags_usage ON tags(usage_count DESC);

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
-- Foreign Key zu products wieder herstellen
-- ============================================================
ALTER TABLE products
  ADD CONSTRAINT products_category_id_fkey
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL;

-- ============================================================
-- 12 STANDARD-KATEGORIEN MIT UEBERSETZUNGEN
-- ============================================================

-- Kategorie 1: Bremsen
INSERT INTO categories (slug, sort_order) VALUES ('brakes', 10);
INSERT INTO category_translations (category_id, lang, name) VALUES
  ((SELECT id FROM categories WHERE slug='brakes'), 'en', 'Brakes'),
  ((SELECT id FROM categories WHERE slug='brakes'), 'de', 'Bremsen'),
  ((SELECT id FROM categories WHERE slug='brakes'), 'fr', 'Freins'),
  ((SELECT id FROM categories WHERE slug='brakes'), 'pt', 'Travões'),
  ((SELECT id FROM categories WHERE slug='brakes'), 'ar', 'الفرامل');

-- Kategorie 2: Motor
INSERT INTO categories (slug, sort_order) VALUES ('engine', 20);
INSERT INTO category_translations (category_id, lang, name) VALUES
  ((SELECT id FROM categories WHERE slug='engine'), 'en', 'Engine'),
  ((SELECT id FROM categories WHERE slug='engine'), 'de', 'Motor'),
  ((SELECT id FROM categories WHERE slug='engine'), 'fr', 'Moteur'),
  ((SELECT id FROM categories WHERE slug='engine'), 'pt', 'Motor'),
  ((SELECT id FROM categories WHERE slug='engine'), 'ar', 'المحرك');

-- Kategorie 3: Filter
INSERT INTO categories (slug, sort_order) VALUES ('filters', 30);
INSERT INTO category_translations (category_id, lang, name) VALUES
  ((SELECT id FROM categories WHERE slug='filters'), 'en', 'Filters'),
  ((SELECT id FROM categories WHERE slug='filters'), 'de', 'Filter'),
  ((SELECT id FROM categories WHERE slug='filters'), 'fr', 'Filtres'),
  ((SELECT id FROM categories WHERE slug='filters'), 'pt', 'Filtros'),
  ((SELECT id FROM categories WHERE slug='filters'), 'ar', 'المرشحات');

-- Kategorie 4: Karosserie
INSERT INTO categories (slug, sort_order) VALUES ('body', 40);
INSERT INTO category_translations (category_id, lang, name) VALUES
  ((SELECT id FROM categories WHERE slug='body'), 'en', 'Body'),
  ((SELECT id FROM categories WHERE slug='body'), 'de', 'Karosserie'),
  ((SELECT id FROM categories WHERE slug='body'), 'fr', 'Carrosserie'),
  ((SELECT id FROM categories WHERE slug='body'), 'pt', 'Carroceria'),
  ((SELECT id FROM categories WHERE slug='body'), 'ar', 'الهيكل');

-- Kategorie 5: Beleuchtung
INSERT INTO categories (slug, sort_order) VALUES ('lighting', 50);
INSERT INTO category_translations (category_id, lang, name) VALUES
  ((SELECT id FROM categories WHERE slug='lighting'), 'en', 'Lighting'),
  ((SELECT id FROM categories WHERE slug='lighting'), 'de', 'Beleuchtung'),
  ((SELECT id FROM categories WHERE slug='lighting'), 'fr', 'Éclairage'),
  ((SELECT id FROM categories WHERE slug='lighting'), 'pt', 'Iluminação'),
  ((SELECT id FROM categories WHERE slug='lighting'), 'ar', 'الإضاءة');

-- Kategorie 6: Reifen & Felgen
INSERT INTO categories (slug, sort_order) VALUES ('tires-wheels', 60);
INSERT INTO category_translations (category_id, lang, name) VALUES
  ((SELECT id FROM categories WHERE slug='tires-wheels'), 'en', 'Tires & Wheels'),
  ((SELECT id FROM categories WHERE slug='tires-wheels'), 'de', 'Reifen & Felgen'),
  ((SELECT id FROM categories WHERE slug='tires-wheels'), 'fr', 'Pneus & Jantes'),
  ((SELECT id FROM categories WHERE slug='tires-wheels'), 'pt', 'Pneus e Jantes'),
  ((SELECT id FROM categories WHERE slug='tires-wheels'), 'ar', 'الإطارات والعجلات');

-- Kategorie 7: Elektrik
INSERT INTO categories (slug, sort_order) VALUES ('electrical', 70);
INSERT INTO category_translations (category_id, lang, name) VALUES
  ((SELECT id FROM categories WHERE slug='electrical'), 'en', 'Electrical'),
  ((SELECT id FROM categories WHERE slug='electrical'), 'de', 'Elektrik'),
  ((SELECT id FROM categories WHERE slug='electrical'), 'fr', 'Électricité'),
  ((SELECT id FROM categories WHERE slug='electrical'), 'pt', 'Sistema elétrico'),
  ((SELECT id FROM categories WHERE slug='electrical'), 'ar', 'الكهرباء');

-- Kategorie 8: Auspuff
INSERT INTO categories (slug, sort_order) VALUES ('exhaust', 80);
INSERT INTO category_translations (category_id, lang, name) VALUES
  ((SELECT id FROM categories WHERE slug='exhaust'), 'en', 'Exhaust'),
  ((SELECT id FROM categories WHERE slug='exhaust'), 'de', 'Auspuff'),
  ((SELECT id FROM categories WHERE slug='exhaust'), 'fr', 'Échappement'),
  ((SELECT id FROM categories WHERE slug='exhaust'), 'pt', 'Escape'),
  ((SELECT id FROM categories WHERE slug='exhaust'), 'ar', 'العادم');

-- Kategorie 9: Federung & Lenkung
INSERT INTO categories (slug, sort_order) VALUES ('suspension-steering', 90);
INSERT INTO category_translations (category_id, lang, name) VALUES
  ((SELECT id FROM categories WHERE slug='suspension-steering'), 'en', 'Suspension & Steering'),
  ((SELECT id FROM categories WHERE slug='suspension-steering'), 'de', 'Federung & Lenkung'),
  ((SELECT id FROM categories WHERE slug='suspension-steering'), 'fr', 'Suspension & Direction'),
  ((SELECT id FROM categories WHERE slug='suspension-steering'), 'pt', 'Suspensão e Direção'),
  ((SELECT id FROM categories WHERE slug='suspension-steering'), 'ar', 'التعليق والتوجيه');

-- Kategorie 10: Getriebe
INSERT INTO categories (slug, sort_order) VALUES ('transmission', 100);
INSERT INTO category_translations (category_id, lang, name) VALUES
  ((SELECT id FROM categories WHERE slug='transmission'), 'en', 'Transmission'),
  ((SELECT id FROM categories WHERE slug='transmission'), 'de', 'Getriebe'),
  ((SELECT id FROM categories WHERE slug='transmission'), 'fr', 'Transmission'),
  ((SELECT id FROM categories WHERE slug='transmission'), 'pt', 'Transmissão'),
  ((SELECT id FROM categories WHERE slug='transmission'), 'ar', 'ناقل الحركة');

-- Kategorie 11: Innenraum
INSERT INTO categories (slug, sort_order) VALUES ('interior', 110);
INSERT INTO category_translations (category_id, lang, name) VALUES
  ((SELECT id FROM categories WHERE slug='interior'), 'en', 'Interior'),
  ((SELECT id FROM categories WHERE slug='interior'), 'de', 'Innenraum'),
  ((SELECT id FROM categories WHERE slug='interior'), 'fr', 'Intérieur'),
  ((SELECT id FROM categories WHERE slug='interior'), 'pt', 'Interior'),
  ((SELECT id FROM categories WHERE slug='interior'), 'ar', 'المقصورة الداخلية');

-- Kategorie 12: Öle & Flüssigkeiten
INSERT INTO categories (slug, sort_order) VALUES ('oils-fluids', 120);
INSERT INTO category_translations (category_id, lang, name) VALUES
  ((SELECT id FROM categories WHERE slug='oils-fluids'), 'en', 'Oils & Fluids'),
  ((SELECT id FROM categories WHERE slug='oils-fluids'), 'de', 'Öle & Flüssigkeiten'),
  ((SELECT id FROM categories WHERE slug='oils-fluids'), 'fr', 'Huiles & Liquides'),
  ((SELECT id FROM categories WHERE slug='oils-fluids'), 'pt', 'Óleos e Fluidos'),
  ((SELECT id FROM categories WHERE slug='oils-fluids'), 'ar', 'الزيوت والسوائل');
