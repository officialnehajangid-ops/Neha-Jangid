# Neha Jangid — SaaS SEO & Organic Growth

Portfolio and case study site, built with the Next.js App Router and TypeScript.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values you need
npm run dev                  # http://localhost:3000
```

| Script              | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Development server with fast refresh           |
| `npm run build`     | Production build (prerenders every page)       |
| `npm run start`     | Serves the production build                    |
| `npm run lint`      | ESLint, using `next/core-web-vitals`           |
| `npm run typecheck` | `tsc --noEmit`                                 |

## Project layout

```
src/
├─ app/                        Routes, metadata, sitemap, robots, API handlers
│  ├─ page.tsx                 Home page — composes the sections below
│  ├─ case-studies/[slug]/     One component renders every case study
│  ├─ api/ask/route.ts         POST endpoint for the "ask a question" form
│  └─ globals.css              The single stylesheet (see "Styling")
├─ components/
│  ├─ layout/                  Header, footer, back-to-top, global observers
│  ├─ home/                    One component per home page section
│  ├─ seo/                     JSON-LD emitter
│  └─ ui/                      Icons and other shared primitives
├─ content/                    All copy and data, separated from presentation
├─ hooks/                      Reusable client behaviour
└─ lib/                        Framework-free logic: appearance, email, schema
```

### Adding a case study

Append an entry to `CASE_STUDIES` in `src/content/case-studies.ts`. The route,
metadata, structured data, sitemap entry, home page card and previous/next links
are all derived from that array — no new page component is needed.

### Adding a section to the home page

Add a component under `src/components/home/`, keep its copy in `src/content/`,
and render it from `src/app/page.tsx`. If it needs a nav link, add it to
`NAVIGATION_LINKS` in `src/content/navigation.ts` and give the section the
matching id from `HOME_SECTION_IDS`.

## Styling

`src/app/globals.css` is the original hand-written stylesheet, kept as one global
file on purpose:

- every class is already namespaced by hand, so CSS Modules would add churn
  without preventing any collision;
- the accent tokens are rewritten at runtime from JavaScript, which needs stable
  custom property names on `:root`;
- keeping it intact guarantees the React markup renders exactly like the static
  site it replaced.

Colours, spacing, radii and fonts are all CSS custom properties defined at the
top of the file. Prefer adding a token over hard-coding a value.

## Theme and accent colour

Visitors pick a light/dark theme and one of twelve accent schemes; both persist
in `localStorage`.

- `src/lib/appearance.ts` owns the schemes and the colour maths.
- `AppearanceBootstrapScript` inlines that maths into a blocking `<script>` so the
  saved colours are applied **before the first paint** — without it, a returning
  visitor would see the default teal flash past.
- `useAppearance()` takes over from the first interaction onwards. `SiteHeader`
  calls it once and passes the handlers to both buttons, so they stay in sync.

Visitors who have never shuffled keep the stylesheet's own hand-tuned accents;
the JavaScript tokens are only applied once a scheme has been chosen explicitly.

## Environment variables

See `.env.example`. Only `NEXT_PUBLIC_SITE_URL` matters for a plain deployment.

| Variable                | Purpose                                                  |
| ----------------------- | -------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`  | Canonical origin for canonical tags, OG tags and sitemap  |
| `RESEND_API_KEY`        | Mail provider credential for `/api/ask`                   |
| `ASK_FORM_FROM_EMAIL`   | Verified sender address                                   |
| `ASK_FORM_INBOX_EMAIL`  | Where question submissions are delivered                  |

Until the mail variables are set, `/api/ask` answers `503` with
`email_delivery_not_configured` and the form falls back to opening the visitor's
mail client — the behaviour the static site had.

**Still to fill in:** `CONTACT_EMAIL` in `src/content/site.ts` is the placeholder
`hello@example.com` carried over from the original code. It is shown to visitors
whenever the form cannot deliver, so it should be replaced with a real address.

## SEO

- Per-page `title`, `description`, canonical URL, Open Graph and Twitter tags.
- JSON-LD: `Person` + `WebSite` + `FAQPage` on the home page, `Article` +
  `BreadcrumbList` on each case study.
- `sitemap.xml` and `robots.txt` are generated from the same content data.
- Fonts are self-hosted through `next/font`, so there is no render-blocking
  request to Google Fonts and no flash of fallback text.
- Images go through `next/image` (AVIF/WebP, correct intrinsic sizes).
- The old `/index.html`, `/case-study-01.html` and `/case-study-02.html` URLs
  redirect permanently to their new routes — see `next.config.ts`.

