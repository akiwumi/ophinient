# Ophinient

Full-stack web application built with React, Express, Node.js, and Supabase — featuring a cinematic dark-theme design system inspired by bold condensed typography and warm orange-red accents.

## Project Structure

```
ophinient/
├── frontend/                   # React app (Vite)
│   └── src/
│       ├── api/                # API client utilities
│       ├── styles/             # Design system (see below)
│       │   ├── design-system.css   # Single entry point
│       │   ├── tokens.css          # Colour, type, spacing tokens
│       │   ├── typography.css      # Font imports & heading hierarchy
│       │   ├── base.css            # Reset, layout primitives
│       │   └── components.css      # Buttons, cards, nav, forms…
│       ├── assets/
│       └── App.jsx
├── backend/                    # Express API server
│   └── src/
│       ├── config/             # Supabase client setup
│       ├── routes/             # API route handlers
│       └── server.js           # Entry point
├── package.json                # Root scripts (run both apps)
└── README.md
```

## Design System

The frontend ships with a purpose-built design system derived from the Ophini cinematic reference image. It is organised in four cascading layers imported via a single file (`styles/design-system.css`).

### Layers

| Layer | File | What it provides |
|---|---|---|
| **Tokens** | `tokens.css` | CSS custom properties — colours, type scale, spacing, radii, shadows, transitions, z-index |
| **Typography** | `typography.css` | Google Fonts imports (Bebas Neue + Inter), heading/display classes, text utilities, responsive scaling |
| **Base** | `base.css` | CSS reset, dark scrollbar, layout primitives (`.container`, `.section`), overlay/gradient helpers, flex/spacing utilities |
| **Components** | `components.css` | Buttons, cards, hero, floating nav, form inputs, stats, carousel, badges, watermark, animations |

### Colour Palette

| Token | Role | Value |
|---|---|---|
| `--bg-void` | Deepest background | `#050608` |
| `--bg-primary` | Page background | `#0A0C14` |
| `--bg-surface` | Cards, panels | `#141622` |
| `--bg-elevated` | Raised elements | `#1A1D2E` |
| `--accent` | Primary accent | `#D4572A` |
| `--accent-bright` | Hover / emphasis | `#E8633B` |
| `--accent-vivid` | High-energy highlight | `#FF7B4A` |
| `--text-primary` | Headings, body | `#F5F5F7` |
| `--text-secondary` | Captions, muted text | `#9499AE` |

### Typography

| Class | Size | Font | Style |
|---|---|---|---|
| `.display-hero` | 96 px | Bebas Neue | Uppercase, wide tracking |
| `.display-xl` | 72 px | Bebas Neue | Uppercase |
| `.display-lg` | 60 px | Bebas Neue | Uppercase |
| `h1` – `h4` | 60 → 32 px | Bebas Neue | Uppercase condensed |
| `h5` – `h6` | 20 → 18 px | Inter | Semibold body style |
| `.body-lg` / `.body-base` | 18 / 16 px | Inter | Secondary colour |
| `.stat-value` | 60 px | Bebas Neue | Large data numbers |
| `.overline-accent` | 12 px | Inter | Uppercase, accent, widest tracking |

### Key Components

- **Pill buttons** — outline borders, accent fills, ghost variants (`.btn`, `.btn-accent`, `.btn-ghost`)
- **Cards** — dark surface, glass variant with backdrop blur, interactive hover glow (`.card`, `.card-glass`, `.card-interactive`)
- **Floating nav** — glass-effect fixed bar with blur backdrop (`.nav-floating`)
- **Stats** — Bebas Neue numbers + small-caps labels (`.stat-value`, `.stat-label`)
- **Form inputs** — dark fields with accent focus rings (`.input`, `.form-group`)
- **Hero** — full-viewport with overlay + gradient fade (`.hero`, `.overlay`, `.gradient-fade-bottom`)
- **Watermark** — giant faded background text (`.watermark`)
- **Badges** — accent-tinted pill tags (`.badge`)

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A [Supabase](https://supabase.com/) project (free tier works)

## Getting Started

### 1. Install dependencies

```bash
npm install          # root dev dependencies (concurrently)
npm run install:all  # frontend + backend dependencies
```

### 2. Configure environment variables

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` with your Supabase project credentials:

| Variable | Description |
|---|---|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server-side only) |
| `PORT` | Backend port (default `3001`) |

### 3. Run the development servers

```bash
npm run dev
```

This starts both servers concurrently:

- **Frontend** — [http://localhost:5173](http://localhost:5173)
- **Backend** — [http://localhost:3001](http://localhost:3001)

API requests from the frontend are automatically proxied to the backend via Vite's dev proxy (`/api` → `localhost:3001`).

### Running individually

```bash
npm run dev:frontend   # React dev server only
npm run dev:backend    # Express dev server only
```

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite |
| Backend | Express 5, Node.js |
| Database | Supabase (PostgreSQL) |
| Design System | Custom CSS tokens, Bebas Neue + Inter |
| Dev tooling | Nodemon, Concurrently |
