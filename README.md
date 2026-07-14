# DCQ Bikes – Klantenenquête Kiosk

Een eenvoudige, moderne kiosk-webapp voor DCQ Bikes om na elke verkoop snel te registreren hoe klanten de winkel hebben gevonden en of de website invloed had op de aankoop.

Gebouwd met **Next.js (App Router)**, **TypeScript**, **Tailwind CSS** en **Supabase**.

## Functies

- **Kiosk-enquête** (`/`) – grote touch-knoppen, geoptimaliseerd voor iPad landscape
- **Automatisch reset** – na verzending bedankscherm (2 sec) en direct klaar voor de volgende klant
- **Row Level Security** – alleen anonieme inserts vanuit de kiosk

De antwoorden bekijk je rechtstreeks in je Supabase-project (**Table Editor → `survey_answers`**), waar je ook naar CSV kunt exporteren.

## Vereisten

- Node.js 18.18+ (20+ aanbevolen voor productie)
- npm
- Supabase-account

## Installatie

### 1. Repository klonen en dependencies installeren

```bash
git clone <repository-url>
cd dcqbikesenquete
npm install
```

### 2. Environment variables

Kopieer het voorbeeldbestand en vul je Supabase-gegevens in:

```bash
cp .env.local.example .env.local
```

| Variabele | Beschrijving |
|-----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase publishable/anon key |

### 3. Supabase database instellen

1. Open je Supabase-project → **SQL Editor**
2. Voer `supabase/schema.sql` uit (idempotent, veilig om opnieuw uit te voeren)

Dit maakt de tabel `survey_answers` aan met RLS-beleid:
- **INSERT**: toegestaan voor anonieme gebruikers (kiosk)

### 4. Development server starten

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) voor de kiosk-enquête.

## iPad kioskmodus

1. Open de app in **Safari** op de iPad
2. Tik op **Delen** → **Voeg toe aan beginscherm**
3. Open de app vanuit het beginscherm (fullscreen, geen browserbalk)
4. Zet **Begeleide toegang** aan (Instellingen → Toegankelijkheid) om de iPad te vergrendelen op deze app

De enquête reset automatisch na elke inzending – geen browser-refresh nodig.

## Projectstructuur

```
src/
├── app/
│   ├── page.tsx              # Kiosk-enquête
│   └── layout.tsx            # Root layout + kiosk viewport
├── components/
│   ├── survey/               # Enquête-componenten
│   └── ui/                   # Herbruikbare UI
├── lib/
│   ├── constants.ts          # Enquête-opties en configuratie
│   └── supabase/             # Supabase clients
└── types/
    └── survey.ts             # TypeScript types
supabase/
└── schema.sql                # Volledig databaseschema
```

## Productie deployen (GitHub Pages → msonsite.be/dcqbikesenquete)

GitHub toont standaard enkel de **README** — de Next.js-app moet eerst gebouwd worden via GitHub Actions.

### 1. Supabase-gegevens

De workflow `.github/workflows/deploy-pages.yml` bevat de publishable key als fallback (die is openbaar; data blijft beschermd door RLS). Wil je andere waarden, stel dan repository-secrets in via **Settings → Secrets and variables → Actions**:

| Secret | Waarde |
|--------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Je Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Je publishable/anon key |

### 2. GitHub Pages instellen

1. **Settings → Pages**
2. Bij **Build and deployment → Source**: kies **GitHub Actions** (niet "Deploy from a branch")
3. Push de code naar `main` — de workflow bouwt en deployt automatisch

### 3. URL

Na een geslaagde deploy:

- **Enquête:** https://msonsite.be/dcqbikesenquete/

### Lokaal testen met hetzelfde pad

```bash
npm run build:pages
npx serve out
# Open http://localhost:3000/dcqbikesenquete/
```

## Enquêtevragen

De enquête gebruikt een slimme vertakking, zodat elke vraag logisch is en er nooit
tegenstrijdige antwoorden mogelijk zijn. Altijd twee tikken:

1. **Heeft u dcqbikes.be bekeken vóór uw bezoek?** — Ja / Nee
2. Afhankelijk van het antwoord:
   - **Ja → Welke rol speelde de website?** (overtuigde me om langs te komen / hielp bij mijn keuze / geen echte rol)
   - **Nee → Hoe heeft u ons dan gevonden?** (Google / Facebook / Instagram / Reviews / via familie of vrienden / in het voorbijrijden / ik ben al klant)

Zo meet je in één oogopslag het **bereik** van de vernieuwde website (bekeken ja/nee),
de **impact** ervan op wie ze wél bekeek, en het **kanaal** van wie ze niet bekeek.

Antwoorden worden opgeslagen in `survey_answers`:
- `visited_website` (boolean) — vraag 1
- `website_influence` (`decisive` / `helped` / `no_influence` / `not_visited`) — vraag 2a (of `not_visited` bij Nee)
- `source` (tekst) — vraag 2b (leeg wanneer de website wél bekeken werd)

## Licentie

Privé project voor DCQ Bikes.
