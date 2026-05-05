-- Etappe 3.4 Fix: alte role-CHECK-Constraint durch neue ersetzen
BEGIN;

-- Alte Constraint entfernen (akzeptierte nur 'buyer', 'seller', 'admin')
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check;

-- Neue Constraint mit den neuen Rollen-Werten
ALTER TABLE users ADD CONSTRAINT users_role_check 
  CHECK (role IN ('admin', 'customer', 'dealer'));

-- Default auf 'customer' ändern (war 'buyer')
ALTER TABLE users ALTER COLUMN role SET DEFAULT 'customer';

COMMIT;
