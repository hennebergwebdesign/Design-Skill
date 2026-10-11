-- Stripe-Ereignisse, die schon verarbeitet wurden. Enthaelt KEINE personenbezogenen Daten:
-- nur die Kennung des Ereignisses, den Typ und den Zeitpunkt. Anlegen mit
--   wrangler d1 execute <datenbank> --file=schema.sql
CREATE TABLE IF NOT EXISTS stripe_ereignisse (
  id TEXT PRIMARY KEY,
  typ TEXT NOT NULL,
  verarbeitet_am TEXT NOT NULL
);
