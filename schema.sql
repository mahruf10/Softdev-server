-- Neon SQL Editor e eita run koro

CREATE TABLE users (
  id          SERIAL PRIMARY KEY,
  user_name   TEXT,
  user_email  TEXT UNIQUE NOT NULL,
  user_image  TEXT,
  role        TEXT NOT NULL DEFAULT 'user'   -- 'user' | 'agent' | 'admin'
);

CREATE TABLE properties (
  id           SERIAL PRIMARY KEY,
  title        TEXT NOT NULL,
  location     TEXT,
  price_min    NUMERIC,
  price_max    NUMERIC,
  image        TEXT,
  post_at      TEXT,
  agent_name   TEXT,
  agent_email  TEXT NOT NULL,
  agent_img    TEXT,
  verified     BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE reviews (
  id           SERIAL PRIMARY KEY,
  email        TEXT,                -- frontend ekhon pathay na, tai nullable (MyReviews er jonno pore dorkar hobe)
  title        TEXT NOT NULL,       -- property title
  name         TEXT,                -- reviewer name
  image        TEXT,                -- reviewer image
  description  TEXT,
  agent_name   TEXT,
  date         TEXT
);

CREATE TABLE wishlists (
  id           SERIAL PRIMARY KEY,
  user_email   TEXT NOT NULL,
  property_id  INTEGER REFERENCES properties(id) ON DELETE CASCADE,
  title        TEXT,
  location     TEXT,
  image        TEXT,
  price_min    NUMERIC,
  price_max    NUMERIC,
  agent_name   TEXT,
  agent_img    TEXT,
  verified     BOOLEAN
);

CREATE TABLE offers (
  id           SERIAL PRIMARY KEY,
  user_email   TEXT NOT NULL,
  user_name    TEXT,
  property_id  INTEGER,             -- frontend ekhane wishlist er id pathay, tai properties er sathe jora na
  title        TEXT,
  location     TEXT,
  image        TEXT,
  agent_name   TEXT,
  offer        NUMERIC,
  date         TEXT,                -- buying date
  status       TEXT NOT NULL DEFAULT 'pending'   -- pending | Confirm | Rejected
);

CREATE TABLE payments (
  id              SERIAL PRIMARY KEY,
  email           TEXT,             -- buyer email
  name            TEXT,             -- buyer name
  title           TEXT[],           -- frontend array pathay (offer prottek ta er jonno ekta kore)
  location        TEXT[],
  agent_name      TEXT[],
  price           NUMERIC,
  cart_ids        INTEGER[] NOT NULL DEFAULT '{}',
  property_ids    INTEGER[],
  transaction_id  TEXT,
  date            TEXT
);

CREATE TABLE temporary_products (
  id           SERIAL PRIMARY KEY,
  title        TEXT NOT NULL,
  location     TEXT,
  price_range  JSONB,
  image        TEXT,
  post_at      TEXT,
  agent_name   TEXT,
  agent_email  TEXT NOT NULL,
  agent_img    TEXT
);

CREATE INDEX idx_temporary_products_agent_email ON temporary_products(agent_email);

CREATE INDEX idx_properties_agent_email ON properties(agent_email);
CREATE INDEX idx_reviews_title ON reviews(title);
CREATE INDEX idx_offers_user_email ON offers(user_email);
CREATE INDEX idx_wishlists_user_email ON wishlists(user_email);
