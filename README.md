# DCQ Bikes – Klantenenquête Kiosk

Een eenvoudige, moderne kiosk-webapp voor DCQ Bikes om na elke verkoop snel te registreren hoe klanten de winkel hebben gevonden en of de website invloed had op de aankoop.

Gebouwd met **Next.js (App Router)**, **TypeScript**, **Tailwind CSS** en **Supabase**.

## Functies

- **Kiosk-enquête** (`/`) – grote touch-knoppen, geoptimaliseerd voor iPad landscape
- **Automatisch reset** – na verzending bedankscherm (2 sec) en direct klaar voor de volgende klant
- **Dashboard** (`/dashboard`) – statistieken, grafieken en CSV-export (alleen voor ingelogde admins)
- **Row Level Security** – anonieme inserts, alleen admins kunnen data lezen

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
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `NEXT_PUBLIC_SHOW_PURCHASE_REASON` | `true` om vraag 3 te tonen, anders `false` |

### 3. Supabase database instellen

1. Open je Supabase-project → **SQL Editor**
2. Voer het migratiebestand uit: `supabase/migrations/001_survey_answers.sql`

Dit maakt de tabel `survey_answers` aan met RLS-beleid:
- **INSERT**: toegestaan voor anonieme gebruikers (kiosk)
- **SELECT**: alleen voor geauthenticeerde admins

### 4. Admin-account aanmaken

1. Ga in Supabase naar **Authentication → Users**
2. Klik **Add user** en maak een admin-account aan (e-mail + wachtwoord)
3. Gebruik deze gegevens om in te loggen op `/dashboard/login`

### 5. Development server starten

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
│   ├── layout.tsx            # Root layout + kiosk viewport
│   └── dashboard/
│       ├── page.tsx          # Admin dashboard (Server Component)
│       └── login/page.tsx    # Admin login
├── components/
│   ├── survey/               # Enquête-componenten
│   ├── dashboard/            # Dashboard-componenten
│   └── ui/                   # Herbruikbare UI
├── lib/
│   ├── constants.ts          # Enquête-opties en configuratie
│   ├── supabase/             # Supabase clients
│   └── utils/                # Statistieken en CSV-export
└── types/
    └── survey.ts             # TypeScript types
supabase/
└── migrations/
    └── 001_survey_answers.sql
```

## Productie deployen (GitHub Pages → msonsite.be/dcqbikesenquete)

GitHub toont standaard enkel de **README** — de Next.js-app moet eerst gebouwd worden via GitHub Actions.

### 1. Secrets instellen in GitHub

Ga naar **github.com/msonsite/dcqbikesenquete → Settings → Secrets and variables → Actions** en voeg toe:

| Secret | Waarde |
|--------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Je Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Je publishable/anon key |

### 2. GitHub Pages instellen

1. **Settings → Pages**
2. Bij **Build and deployment → Source**: kies **GitHub Actions** (niet "Deploy from a branch")
3. Push de code naar `main` — de workflow `.github/workflows/deploy-pages.yml` bouwt en deployt automatisch

### 3. URL

Na een geslaagde deploy:

- **Enquête:** https://msonsite.be/dcqbikesenquete/
- **Dashboard:** https://msonsite.be/dcqbikesenquete/dashboard/login

### Lokaal testen met hetzelfde pad

```bash
npm run build:pages
npx serve out
# Open http://localhost:3000/dcqbikesenquete/
```

### Alternatief: Vercel

Voor eenvoudiger hosting (subdomein `dcqbikesenquete.msonsite.be`):

```bash
npm run build
npm start
```

Deploy naar [Vercel](https://vercel.com) en koppel je GitHub-repo. Voeg de environment variables toe in het Vercel-dashboard.

## Enquêtevragen

1. **Hoe bent u bij DCQ Bikes terechtgekomen?** (verplicht)
2. **Hebt u vóór uw aankoop onze website bekeken?** (verplicht)
3. **Wat gaf uiteindelijk de doorslag om bij ons te kopen?** (optioneel, via env var)

## Licentie

Privé project voor DCQ Bikes.
