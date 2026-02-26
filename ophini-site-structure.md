# Ophini Entertainment — Site Structure & Schema

---

## 1. High-Level Architecture

| Layer | Technology Recommendation | Purpose |
|-------|--------------------------|---------|
| Frontend | Single Page Application (React, Vue, or vanilla JS + CSS) | Full-page sections, smooth scrolling, carousel |
| Theme | Dark theme throughout | Dark backgrounds, light text, high-contrast accents |
| Backend / API | Node.js (Express) or Python (Flask/FastAPI) | Contact form processing, email verification |
| Email Verification | Third-party API (e.g. ZeroBounce, Hunter.io, Abstract API) or MX-record lookup | Validates that submitted emails are real and deliverable |
| Hosting | Static host (Vercel, Netlify) + serverless function for contact endpoint | Simple deployment |

---

## 2. Creative Direction & Visual Identity

**Concept:** *Cinematic, visually commanding, and steeped in the elegance of 1960s Hollywood — the golden age of widescreen glamour, title design, and auteur filmmaking.*

### Mood & Tone

| Attribute | Direction |
|-----------|-----------|
| Era reference | 1960s Hollywood — Saul Bass title sequences, Technicolor richness, Hitchcock sophistication, the glamour of studio portraiture |
| Mood | Luxurious, confident, mysterious, cinematic |
| Pacing | Slow, deliberate transitions — every scroll and animation should feel like a camera move |
| Photography | High-contrast, shallow depth of field, dramatic lighting reminiscent of studio-era cinematography |
| Colour sensibility | Deep blacks, warm golds, muted creams, and selective pops of saturated colour (jewel tones, crimson, teal) |

### Typography

| Role | Style Guidance |
|------|----------------|
| Display / Headings | Elegant serif or high-contrast didone typeface (e.g. Playfair Display, Cormorant Garant, Freight Display) — evoking vintage movie title cards |
| Body | Clean, refined sans-serif (e.g. Inter, Outfit, or a humanist sans like Garnett) for readability against dark backgrounds |
| Accent / Logotype | Custom or curated display face for the "Ophini Entertainment" wordmark — could reference hand-lettered 60s title design |
| Sizing | Generous, cinematic scale for headings; comfortable reading size for body copy |

### Motion & Interaction

| Element | Behaviour |
|---------|-----------|
| Section transitions | Smooth, slow scroll-snapping with subtle parallax — mimicking a long tracking shot |
| Text reveals | Fade-in or slide-up on scroll, timed like opening credits rolling onto screen |
| Carousel | Elegant horizontal glide; cards drift into view rather than snapping harshly |
| Hover states | Subtle film-grain overlay or gentle zoom on project card images |
| Page transitions | Cinematic fade-to-black or iris-wipe effect when navigating to/from project detail pages |
| Cursor | Optional: custom cursor styled as a minimal crosshair or film-reel motif on desktop |

### Signature Visual Elements

| Element | Description |
|---------|-------------|
| Film grain | Subtle, animated grain texture overlaid site-wide for a celluloid quality |
| Letterboxing | Optional thin black bars above/below the hero video to reinforce widescreen cinema framing |
| Dividers | Thin gold horizontal rules or art-deco-inspired ornamental dividers between sections |
| Vignette | Soft dark vignette around viewport edges to focus attention inward, like a projector |
| Background texture | Very subtle noise or paper-stock texture on dark surfaces to avoid flat digital feel |

---

## 3. Page Map (Single-Page Sections)

The site is a **single HTML document** with full-viewport sections stacked vertically. A floating nav links to each section via anchor scroll.

```
/                          ← Single page (index)
├── #hero                  ← Section 1 – Full-screen video
├── #projects              ← Section 2 – Horizontal project carousel
├── #about                 ← Section 3 – About Ophini Entertainment
├── #contact               ← Section 4 – Contact form
│
/projects/:slug            ← Separate route – Individual project detail page
```

---

## 4. Section-by-Section Breakdown

### 4.1 Hero Section (`#hero`)

| Attribute | Detail |
|-----------|--------|
| Layout | Full viewport height and width (100vh × 100vw) |
| Background | Auto-playing video that loops continuously (muted by default), covers entire viewport |
| Overlay | Semi-transparent dark overlay (`--bg-overlay`) for legibility, consistent with dark theme |
| Content | "Ophini Entertainment" wordmark in elegant serif/display type, centered; optional tagline in refined sans-serif beneath |
| Scroll cue | Subtle animated down-arrow or "scroll" indicator at bottom edge, styled in gold (`--accent-gold`) |
| Film grain | Subtle animated grain texture overlaid on the video for a celluloid quality |
| Letterboxing | Optional thin black bars top and bottom to evoke widescreen cinema framing (e.g. 2.39:1 aspect) |

### 4.2 Projects Section (`#projects`)

| Attribute | Detail |
|-----------|--------|
| Layout | Full viewport section |
| Section heading | "Our Projects" in elegant serif display type |
| Carousel | Horizontally scrollable row of project cards with smooth, gliding motion |
| Navigation | Left / right arrows (gold accent) and/or drag-to-scroll; optional dot indicators |
| Card contents | See **Project Card Schema** below |
| Card link | Each card is a clickable link → `/projects/:slug` |
| Card hover | Gentle zoom on thumbnail + subtle film-grain overlay + gold border fade-in |

#### Project Card Schema

| Field | Type | Description |
|-------|------|-------------|
| `id` | string / int | Unique identifier |
| `slug` | string | URL-safe name (e.g. `the-last-horizon`) |
| `title` | string | Project / film title |
| `thumbnail` | image URL | Placeholder image (16:9 or poster ratio) |
| `logline` | string (≤ 200 chars) | One- or two-sentence project summary |

### 4.3 About Ophini Entertainment Section (`#about`)

| Attribute | Detail |
|-----------|--------|
| Layout | Full viewport section, text-focused with cinematic typography |
| Visual treatment | Elegant serif headings, warm cream body text; optional vintage-style portrait photography or film-strip motifs |
| Subsections | **Company Overview** — who Ophini Entertainment is and what they do |
|  | **History** — founding story, milestones, timeline (consider a horizontal timeline with gold accent markers) |
|  | **Mandate & Focus** — mission statement, genres or types of work, creative values |
| Media | Optional supporting image(s) with high-contrast, studio-lit photography aesthetic |

#### About Content Schema

| Field | Type | Description |
|-------|------|-------------|
| `overview` | rich text | General company description |
| `history` | rich text or array of milestones | Key dates and events |
| `mandate` | rich text | Mission, vision, focus areas |
| `teamPhoto` | image URL (optional) | Company or team image |

### 4.4 Contact Section (`#contact`)

| Attribute | Detail |
|-----------|--------|
| Layout | Full viewport section |
| Heading | "Get in Touch" in elegant serif display type |
| Form fields | See **Contact Form Schema** below |
| Validation | Client-side + server-side (see Section 5) |
| Success state | Inline confirmation message on successful submission |
| Error state | Inline error messages per field; server-level email rejection message |

#### Contact Form Schema

| Field | Name Attr | Type | Required | Validation Rules |
|-------|-----------|------|----------|-----------------|
| Full Name | `name` | text | ✅ | Min 2 characters; letters, spaces, hyphens only |
| Email Address | `email` | email | ✅ | Valid format (client); real/deliverable address (server) |
| Subject | `subject` | text | Optional | Max 150 characters |
| Message | `message` | textarea | ✅ | Min 10 characters, max 2000 characters |

---

## 5. Project Detail Page (`/projects/:slug`)

This is a **separate routed page** (or dynamically rendered view) outside the single-page scroll.

| Attribute | Detail |
|-----------|--------|
| Transition in | Cinematic fade-from-black or iris-wipe effect on page entry |
| Header | Project title in elegant serif display type |
| Hero image / video | Large featured image or trailer embed with letterbox framing |
| Body content | Full synopsis, director, cast, crew, production year, status — warm cream text on dark background |
| Gallery | Optional image gallery or stills with subtle hover zoom |
| Back button | Prominent "← Back to Projects" button (gold accent) that navigates to `/#projects` with a fade-to-black transition |

#### Project Detail Schema

| Field | Type | Description |
|-------|------|-------------|
| `id` | string / int | Unique identifier |
| `slug` | string | URL-safe name |
| `title` | string | Film / project title |
| `featuredImage` | image URL | Large hero image |
| `trailer` | video URL (optional) | Embedded trailer |
| `synopsis` | rich text | Full project description |
| `director` | string | Director name |
| `cast` | string[] | List of key cast members |
| `crew` | object[] | Key crew (role + name) |
| `year` | number | Production or release year |
| `status` | enum | `development` · `pre-production` · `production` · `post-production` · `released` |
| `gallery` | image URL[] | Additional stills / behind-the-scenes |
| `logline` | string | Short summary (shared with card) |

---

## 6. Floating Navigation Panel

| Attribute | Detail |
|-----------|--------|
| Position | Fixed position on viewport (e.g. right edge, vertically centered — or top bar) |
| Behaviour | Always visible; follows the user as they scroll |
| Items | Hero · Projects · About Ophini Entertainment · Contact |
| Active state | Highlights the current section based on scroll position (Intersection Observer) |
| Click action | Smooth-scrolls the viewport to the target section |
| Responsive | Collapses to hamburger or minimal dots on mobile |

#### Nav Item Schema

| Field | Type | Description |
|-------|------|-------------|
| `label` | string | Display text (e.g. "Projects") |
| `target` | string | Anchor ID (e.g. `#projects`) |
| `icon` | SVG / icon ref (optional) | Visual indicator |

---

## 7. Server-Side Email Verification Flow

```
┌──────────────┐
│  User fills   │
│  contact form │
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│ Client-side check │  ← Format validation (regex / HTML5 `type="email"`)
│  Pass?            │
└──────┬───────────┘
       │ Yes
       ▼
┌──────────────────┐
│ POST /api/contact │  ← Send name, email, subject, message to server
└──────┬───────────┘
       │
       ▼
┌──────────────────────────┐
│ Server validates fields   │
│ (name length, msg length) │
└──────┬───────────────────┘
       │
       ▼
┌────────────────────────────────┐
│ Server verifies email reality  │
│                                │
│  Option A — MX Record Lookup   │
│    DNS query for domain's MX   │
│    records; reject if none     │
│                                │
│  Option B — Third-Party API    │
│    Call ZeroBounce / Hunter /  │
│    Abstract API to check       │
│    deliverability              │
└──────┬─────────────────────────┘
       │
       ▼
┌─────────────────────────┐       ┌──────────────────────────────┐
│ Email is valid &        │──No──▶│ Return 422 JSON:             │
│ deliverable?            │       │ { "error":                   │
└──────┬──────────────────┘       │   "Please use a real email   │
       │ Yes                      │    address." }               │
       ▼                          └──────────────────────────────┘
┌─────────────────────────┐
│ Store message / send     │
│ notification email       │
│ Return 200 JSON:         │
│ { "success": true }      │
└─────────────────────────┘
```

### API Endpoint Schema

**`POST /api/contact`**

Request body:

| Field | Type | Required |
|-------|------|----------|
| `name` | string | ✅ |
| `email` | string | ✅ |
| `subject` | string | ❌ |
| `message` | string | ✅ |

Success response (`200`):

| Field | Value |
|-------|-------|
| `success` | `true` |
| `message` | `"Thank you for reaching out. We'll be in touch."` |

Validation error response (`422`):

| Field | Value |
|-------|-------|
| `success` | `false` |
| `error` | `"Please use a real email address."` or field-specific message |

---

## 8. Data Model Summary

### Projects Collection / Table

| Column | Type | Notes |
|--------|------|-------|
| id | UUID / int | Primary key |
| slug | varchar | Unique, URL-safe |
| title | varchar | |
| logline | varchar(200) | Short summary for card |
| synopsis | text | Full description for detail page |
| featured_image | varchar (URL) | Hero image |
| thumbnail | varchar (URL) | Card image |
| trailer_url | varchar (URL) | Nullable |
| director | varchar | |
| cast | JSON / text[] | Array of names |
| crew | JSON | Array of { role, name } |
| year | int | |
| status | enum | development / pre-prod / production / post-prod / released |
| gallery | JSON / text[] | Array of image URLs |
| sort_order | int | Controls carousel position |
| created_at | timestamp | |
| updated_at | timestamp | |

### Contact Submissions Collection / Table

| Column | Type | Notes |
|--------|------|-------|
| id | UUID / int | Primary key |
| name | varchar | |
| email | varchar | Verified before insert |
| subject | varchar | Nullable |
| message | text | |
| submitted_at | timestamp | |
| ip_address | varchar | Optional, for spam tracking |

### About Content (CMS or static config)

| Field | Type |
|-------|------|
| overview | rich text / markdown |
| history | rich text / markdown or JSON milestones array |
| mandate | rich text / markdown |
| team_photo | image URL |

---

## 9. Dark Theme & Cinematic Palette

The entire site uses a dark colour scheme inspired by 1960s Hollywood — rich blacks, warm golds, and selective jewel-tone accents.

| Token | Role | Example Value |
|-------|------|---------------|
| `--bg-primary` | Page / section backgrounds | `#09090B` (deep cinema black) |
| `--bg-surface` | Cards, form fields, nav panel | `#161618` (charcoal) |
| `--bg-overlay` | Hero video overlay | `rgba(0, 0, 0, 0.55)` |
| `--text-primary` | Headings, body copy | `#EDE8D0` (warm cream — like vintage title cards) |
| `--text-secondary` | Captions, labels, muted text | `#9A9486` (warm grey) |
| `--accent-gold` | Links, active nav, buttons, focus rings, dividers | `#C8A24D` (old-Hollywood gold) |
| `--accent-gold-hover` | Button / link hover state | `#DEBB6A` (lighter gold) |
| `--accent-crimson` | Selective highlight, call-to-action emphasis | `#A03030` (deep Technicolor red) |
| `--accent-teal` | Secondary accent, subtle UI details | `#2A7A7A` (vintage teal) |
| `--border` | Subtle dividers, card edges | `#2A2826` (warm dark border) |
| `--error` | Form validation errors | `#D94848` |
| `--success` | Form success confirmation | `#4CAF50` |
| `--grain-opacity` | Film grain overlay intensity | `0.04` – `0.06` |

**General rules:**
- All section backgrounds use `--bg-primary` or `--bg-surface` — no white or light backgrounds anywhere.
- Text is warm cream on dark, never pure white — this softens the look and evokes vintage print.
- The floating nav panel uses a semi-transparent dark background with a subtle blur/frost effect and a thin gold border or underline for the active item.
- Form inputs use dark fields (`--bg-surface`) with cream text and a gold focus ring.
- Project cards use `--bg-surface` with warm text; on hover, a subtle gold border fades in alongside the film-grain effect.
- Gold ornamental dividers (`--accent-gold`) separate sections, echoing art-deco title-card styling.
- Scrollbar styling should use dark track with a gold thumb where browser-supported.
- Film grain texture is applied globally at low opacity (`--grain-opacity`) via a CSS pseudo-element or canvas overlay.

---

## 10. Responsive Behaviour Notes

| Breakpoint | Behaviour |
|------------|-----------|
| Desktop (≥ 1024px) | Full layout; floating side nav; horizontal carousel with arrows |
| Tablet (768–1023px) | Stacked layout; top nav bar; carousel with swipe + arrows |
| Mobile (< 768px) | Hamburger nav; carousel swipe only; video may show a cinematic poster-frame fallback on low bandwidth |

---

## 11. File / Folder Structure (Suggested)

```
ophini-website/
├── public/
│   ├── videos/              ← Hero video assets
│   ├── images/
│   │   ├── projects/        ← Thumbnails and featured images
│   │   └── about/           ← Team / company images
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── FloatingNav       ← Sticky navigation panel
│   │   ├── HeroSection       ← Full-screen video hero
│   │   ├── ProjectsCarousel  ← Horizontal scroll carousel
│   │   ├── ProjectCard       ← Individual carousel card
│   │   ├── AboutSection      ← Company info section
│   │   ├── ContactForm       ← Form with client validation
│   │   └── ProjectDetail     ← Full project detail view
│   ├── pages/
│   │   ├── Home              ← Single-page scroll (all sections)
│   │   └── ProjectPage       ← /projects/:slug route
│   ├── data/
│   │   └── projects.json     ← Project data (or fetched from API/CMS)
│   ├── styles/
│   └── App
├── server/
│   ├── routes/
│   │   └── contact           ← POST /api/contact handler
│   ├── services/
│   │   └── emailVerifier     ← MX lookup or API integration
│   └── index                 ← Server entry point
├── package.json
└── README.md
```

---

## 12. Key UX Interactions Summary

1. **Page load** → Fade-from-black reveal. Hero video auto-plays in a continuous loop (muted). Film grain overlay active. Floating nav appears.
2. **Nav click** → Smooth, cinematic scroll to target section (slow easing).
3. **Scroll** → Nav active state updates with gold highlight to match visible section; parallax layers shift subtly.
4. **Projects carousel** → Swipe or arrow-click; cards glide into view with elegant easing.
5. **Card hover** → Gentle image zoom + film-grain overlay + gold border fade-in.
6. **Card click** → Cinematic fade-to-black transition → `/projects/:slug` (detail page).
7. **"Back to Projects" click** → Fade-to-black → return to `/#projects` section.
8. **Contact submit** → Client validates → Server verifies email → Success or error message displayed inline with gold/red accents.
