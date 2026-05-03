-- migrations/001_initial_schema.sql
-- AFRICARPARTS - Initiales Postgres Schema
-- Erstellt alle Tabellen, Indizes und Trigger fuer den Marketplace.
--
-- WICHTIG: Die DROP TABLE Statements am Anfang loeschen alles vorhandene.
-- Das ist OK fuer den ersten Lauf (DB ist leer), aber gefaehrlich in Produktion
-- mit echten Daten. Nach dem ersten Lauf entfernen oder auskommentieren!

-- ============================================================
-- AUFRAEUMEN (nur fuer ersten Lauf / Reset)
-- ============================================================
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS banners CASCADE;
DROP TABLE IF EXISTS shops CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- ============================================================
-- USERS
-- ============================================================
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'buyer'
    CHECK (role IN ('buyer', 'seller', 'admin')),
  phone TEXT,
  country TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ============================================================
-- CATEGORIES
-- ============================================================
CREATE TABLE categories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- SHOPS
-- ============================================================
CREATE TABLE shops (
  id BIGSERIAL PRIMARY KEY,
  owner_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  country TEXT,
  is_china BOOLEAN NOT NULL DEFAULT FALSE,
  logo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_shops_owner ON shops(owner_id);
CREATE INDEX idx_shops_country ON shops(country);

-- ============================================================
-- PRODUCTS
-- ============================================================
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price_usd NUMERIC(12, 2) NOT NULL,
  brand TEXT,
  model TEXT,
  oem TEXT,
  condition TEXT NOT NULL DEFAULT 'new'
    CHECK (condition IN ('new', 'used', 'refurbished')),
  category_id BIGINT REFERENCES categories(id) ON DELETE SET NULL,
  shop_id BIGINT REFERENCES shops(id) ON DELETE CASCADE,
  seller_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  images JSONB NOT NULL DEFAULT '[]'::jsonb,
  stock INTEGER NOT NULL DEFAULT 0,
  is_china_seller BOOLEAN NOT NULL DEFAULT FALSE,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_shop ON products(shop_id);
CREATE INDEX idx_products_seller ON products(seller_id);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_active ON products(active);
CREATE INDEX idx_products_created ON products(created_at DESC);

-- Volltext-Suche fuer schnelle Produktsuche (title, brand, model, oem)
CREATE INDEX idx_products_search ON products USING gin(
  to_tsvector('simple',
    coalesce(title, '') || ' ' ||
    coalesce(brand, '') || ' ' ||
    coalesce(model, '') || ' ' ||
    coalesce(oem, '')
  )
);

-- ============================================================
-- BANNERS
-- ============================================================
CREATE TABLE banners (
  id BIGSERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  link_url TEXT,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_banners_active ON banners(active);
CREATE INDEX idx_banners_sort ON banners(sort_order);

-- ============================================================
-- ORDERS
-- ============================================================
CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  items JSONB NOT NULL,
  shipping JSONB,
  payment JSONB,
  address JSONB,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
  total_usd NUMERIC(12, 2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);

-- ============================================================
-- TRIGGER: updated_at automatisch aktualisieren
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
