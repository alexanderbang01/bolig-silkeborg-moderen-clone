# BoligSilkeborg

En moderne boligplatform bygget til Silkeborg og omegn. Projektet erstatter den gamle boligsilkeborg.dk med en hurtigere og mere brugervenlig løsning.

---

## Tech stack

**Frontend** — React med Vite, TailwindCSS, React Router, Framer Motion, Axios, Lucide React

**Backend** — Node.js med Express, PostgreSQL, JWT authentication, bcrypt

**Sprog** — Oversættelse via Anthropic Claude API (live DOM-oversættelse med caching)

---

## Kom i gang

Du skal bruge Node.js og PostgreSQL installeret på din maskine.

**Opret databasen**

```bash
psql -U dit_brugernavn -c "CREATE DATABASE boligsilkeborg_db"
psql -U dit_brugernavn -d boligsilkeborg_db -f backend/database/schema.sql
```

**Backend**

Opret en `.env` fil i `/backend`:

```
PORT=5001
DB_USER=dit_brugernavn
DB_HOST=localhost
DB_NAME=boligsilkeborg_db
DB_PASSWORD=din_adgangskode
DB_PORT=5432
JWT_SECRET=en_hemmelig_streng
```

Start backend:

```bash
cd backend
npm install
npm run dev
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

Frontend kører på `http://localhost:5173`, backend på `http://localhost:5001`.

---

## Struktur

```
backend/
  database/schema.sql     Database schema og seed data
  middleware/auth.js      JWT verification
  routes/
    auth.js               Login og registrering
    properties.js         Boliger med filtrering
    favorites.js          Gemte favoritter

frontend/src/
  context/
    AuthContext.jsx        Login state
    FavoritesContext.jsx   Favoritter
    LanguageContext.jsx    Sprogstyring og oversættelse
  pages/
    Forside.jsx
    Boliger.jsx
    BoligDetalje.jsx
    Profil.jsx
    Indstillinger.jsx
    OmOs.jsx
    Login.jsx
    OpretBruger.jsx
    Favoritter.jsx
  components/
    layout/Navbar.jsx
    layout/Footer.jsx
    ui/PropertyCard.jsx
    ui/FilterPanel.jsx
    ui/Badge.jsx
```

---

## Features

- Filtrer boliger på type, område, størrelse, antal værelser, pris og faciliteter
- Brugeroprettelse og login med JWT
- Gem favoritboliger
- Detaljeside med billedgalleri, lightbox, kort og anmeldelser
- Sprogskifter der oversætter hele siden via AI (Dansk, Engelsk, Tysk, Norsk, Svensk, Polsk)
- Indstillingsside med notifikationer, udseende og privatlivsindstillinger

---

## Demo login

```
Email:       anders@example.dk
Adgangskode: password
```

---

## Database

Schema indeholder tre tabeller: `users`, `properties` og `favorites`. Databasen kommer med 8 eksempelboliger i Silkeborg-området og to demo-brugere.

For at nulstille databasen og genindlæse seed data:

```bash
psql -U dit_brugernavn -d boligsilkeborg_db -f backend/database/schema.sql
```