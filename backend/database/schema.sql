-- Drop tables if they exist
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS properties CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Properties table
CREATE TABLE properties (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  address VARCHAR(200) NOT NULL,
  area VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  price INTEGER NOT NULL,
  size INTEGER NOT NULL,
  rooms INTEGER NOT NULL,
  floor INTEGER DEFAULT 0,
  available_from DATE NOT NULL,
  image_url TEXT,
  floorplan_url TEXT,
  description TEXT,
  dog_allowed BOOLEAN DEFAULT FALSE,
  cat_allowed BOOLEAN DEFAULT FALSE,
  balcony BOOLEAN DEFAULT FALSE,
  elevator BOOLEAN DEFAULT FALSE,
  parking BOOLEAN DEFAULT FALSE,
  washing_machine BOOLEAN DEFAULT FALSE,
  ev_charging BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Favorites table
CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, property_id)
);

-- Insert placeholder users
INSERT INTO users (name, email, password) VALUES
('Anders Nielsen', 'anders@example.dk', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
('Sofie Andersen', 'sofie@example.dk', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Insert placeholder properties
INSERT INTO properties (title, address, area, type, price, size, rooms, floor, available_from, image_url, floorplan_url, description, dog_allowed, cat_allowed, balcony, elevator, parking, washing_machine, ev_charging) VALUES

('Lys lejlighed tæt på søerne', 'Søndergade 12, 8600 Silkeborg', 'Silkeborg', 'Lejlighed', 7500, 78, 3, 2, '2025-06-01',
'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
'Smuk og lys 3-værelses lejlighed beliggende tæt på Silkeborgs naturskønne søer. Lejligheden er nyistandsat med moderne køkken og badeværelse. Stor altan med udsigt over gårdhaven.',
TRUE, TRUE, TRUE, FALSE, TRUE, TRUE, FALSE),

('Moderne villa i Virklund', 'Virklundvej 45, 8600 Virklund', 'Virklund', 'Hus', 18500, 185, 6, 0, '2025-07-01',
'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
'Stor og moderne villa med 6 værelser, dobbeltgarage og stor have. Beliggende i det rolige og naturskønne Virklund. Energimærke A med varmepumpe og solceller.',
TRUE, FALSE, TRUE, FALSE, TRUE, TRUE, TRUE),

('Hyggelig rækkehus i Sejs', 'Sejsvej 22, 8600 Sejs', 'Sejs', 'Rækkehus', 9800, 110, 4, 0, '2025-05-15',
'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
'Charmerende rækkehus med egen have og terrasse. 4 store værelser, nyt køkken og badeværelse. Tæt på skole og indkøbsmuligheder i Sejs.',
TRUE, TRUE, TRUE, FALSE, FALSE, TRUE, FALSE),

('Central lejlighed med elevator', 'Vestergade 8, 8600 Silkeborg', 'Silkeborg', 'Lejlighed', 8200, 85, 3, 4, '2025-06-15',
'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
'Flot 3-værelses lejlighed i centrum af Silkeborg. Bygningen har elevator og cykelkælder. Moderne køkken med opvaskemaskine og store vinduer med masser af lys.',
FALSE, TRUE, FALSE, TRUE, FALSE, TRUE, FALSE),

('Roligt parcelhus i Them', 'Themvej 67, 8653 Them', 'Them', 'Hus', 11200, 140, 5, 0, '2025-08-01',
'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
'Skønt parcelhus med stor have og dobbelt carport. 5 rummelige værelser og to badeværelser. Fredfyldt beliggenhed tæt på natur og skov.',
TRUE, TRUE, FALSE, FALSE, TRUE, TRUE, TRUE),

('Penthouse med søudsigt', 'Åhave Allé 3, 8600 Silkeborg', 'Silkeborg', 'Lejlighed', 14500, 120, 4, 6, '2025-09-01',
'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
'Eksklusivt penthouse med panoramaudsigt over Silkeborg Langsø. Takterrasse, elevator og to parkeringspladser. Luksusrenoveret med topkvalitet materialer.',
FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE),

('Lejlighed nær Silkeborg Station', 'Jernbanegade 5, 8600 Silkeborg', 'Silkeborg', 'Lejlighed', 6800, 65, 2, 1, '2025-05-01',
'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
'Praktisk 2-værelses lejlighed tæt på Silkeborg Station. Perfekt til pendlere. Moderne badeværelse og åbent køkken-alrum.',
FALSE, TRUE, FALSE, FALSE, FALSE, TRUE, FALSE),

('Familievenligt rækkehus i Resenbro', 'Resenbrovejen 14, 8600 Resenbro', 'Resenbro', 'Rækkehus', 10500, 125, 4, 0, '2025-07-15',
'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&q=80',
'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
'Flot rækkehus med lille have og terrasse. Perfekt til familien med 4 store værelser og to badeværelser. Tæt på skole og dagsinstitutioner.',
TRUE, FALSE, TRUE, FALSE, TRUE, TRUE, FALSE);

-- Insert placeholder favorites
INSERT INTO favorites (user_id, property_id) VALUES
(1, 1),
(1, 3),
(2, 2),
(2, 6);