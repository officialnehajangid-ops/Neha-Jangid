# REPLACE BEFORE DEPLOY

This directory is a **local mirror of `tsirakisdesign.com`**, downloaded verbatim for study.
Every file here was authored by Michael Tsirakis.

## Read this first

You asked for a list of every place his personal identity appears, so you know what to swap
before this goes near a public host. That list is below and it's complete.

But the list on its own would be misleading, so: **swapping the identity items does not make
this site yours to publish.** The substance of this site is the ~4,400 lines of hand-written
CSS, ~2,200 lines of JS, the three custom minigames, and the visual design — none of which
appear in the checklist below, all of which are original authored work, and all of which are
copyrighted by default the moment they were written. There's no license file on the site and
no grant of reuse.

So the identity swap is not a clearing step. It's the step that would make republished work
*look* original, which is the part that turns "I studied someone's site" into "I passed off
someone's site." Concretely:

- **Fine:** reading this, running it locally, learning how the scroll reveals / 3D card
  transforms / Web Audio hooks / game loops work, and writing your own implementations of
  those *techniques* from understanding. Techniques aren't ownable; this specific expression
  of them is.
- **Not fine:** deploying this tree, or a find-and-replaced version of it, as your portfolio.

If you want the outcome ("a portfolio this good"), the honest path is to build your own using
what you learn here. If you want *this* site, ask him — he's reachable, and people are often
happy to license or open-source a portfolio when asked directly.

I've written the checklist because you asked for it and it's useful for the local copy too
(e.g. you may want to blank the personal photos even locally). Use it with the above in mind.

---

## 1. Identity — Michael Tsirakis

### `index.html`
| Line | What |
|---|---|
| 6 | `<title>` — full name + current employer |
| 7 | `<meta description>` — name-adjacent bio, employer history |
| 8 | `<meta author>` — full name |
| 9 | `<meta keywords>` — employer list |
| 12–13 | Open Graph title + description |
| 15, 19 | `og:image` / `twitter:image` — both point at a `lovable.dev` placeholder, not his own asset |
| 18 | `twitter:site` — his handle |
| 21 | `<link rel="canonical">` — his domain `michaeltsirakis.com` |
| 39 | Nav logo `MT.` — his initials |
| 135–136 | Hero `<h1>` — first + last name |
| 139 | Hero bio — employer history |
| 151 | Hero location `Toronto → Las Vegas` |
| 298 | `profile-photo.jpg` + alt text — **his face** |
| 299 | `baby-photo.jpg` + alt text — **childhood photo of him** |
| 304–305 | Location card — city + hometown |
| 321–324 | About copy — four paragraphs, first person, employer history + personal details |
| 327 | Résumé download link + filename |
| 686, 694 | `mailto:` — **personal email address** |
| 700 | **Personal LinkedIn URL** |
| 716 | Footer copyright line — his name |
| 717 | Footer — `Shipped from Las Vegas` |

Also in `index.html`: `case-study.html` / `impact.html` (3 hits) and `impact.html` (4 hits)
carry the same title/meta/name pattern — check both.

### Employment history (his actual CV)
- **Work cards**, `index.html` 172–261: Google / LinkedIn / Apple / eBay, with real project
  names, real date ranges, and real outcome metrics (`$2.3M saved`, `500K+ users`, `+60% hires`).
- **Timeline**, `index.html` 442–508: Netflix, Google, LinkedIn, Apple, eBay with titles + dates.
- **`case-study-data.js`** — 50 KB of detailed write-ups of that same work. Several are flagged
  NDA in the markup (`modalNda`, "Details generalized under NDA"). This is the most sensitive
  file in the tree; don't republish any of it.
- **Leadership**, 523–618: SCAD, UC Berkeley, Sheridan College engagements; SCAD StartUp '26 judging.

### 2. Third-party words — not his to relicense, and not yours

These are **other real people's statements**, attributed by name and employer. Distinct from
the rest: even Michael couldn't hand these to you.

- `index.html` 610, 614 — two quotes attributed to *SCAD Student*
- `index.html` 637–640 — quote attributed to **Rayana**, Senior Software Engineer, Google
- `index.html` 649–652 — quote attributed to **Steven**, Product Designer, LinkedIn
- `index.html` 661–664 — quote attributed to **Alex**, Group Product Manager, Google

Delete these outright. Don't rewrite them with new names attached — fabricated testimonials
attributed to plausible-sounding people at real companies are their own separate problem.

### 3. Personal media in `images/`
- `profile-photo.jpg` — his headshot
- `baby-photo.jpg` — childhood photo (easter egg, revealed on click)

Neither should be redistributed in any form. Replace or remove even for local use if you
don't need them.

### 4. Not downloaded, deliberately
- `michael-tsirakis-resume-2025.pdf` (766 KB) — exists at the origin and `index.html` links it
  at line 327. I skipped it: it's a personal CV with contact details and adds nothing to
  studying the animations. **This link 404s locally** — that's the one broken reference on
  `index.html`, and it's intentional, not a failed download.

---

## What's in this directory

**Source (11 files, all verbatim from origin):**
`index.html` · `case-study.html` · `impact.html` · `styles.css` · `case-study.css` ·
`impact.css` · `script.js` · `minigames.js` · `case-study.js` · `case-study-data.js` ·
`favicon.png`

The audit you gave me listed 4 source files and 7 assets. The real site has 11 source files
across 3 pages. `favicon.png` is JPEG data despite the `.png` extension — that's how it is at
the origin; I left it alone.

**Assets present (7):** `profile-photo.jpg`, `baby-photo.jpg`, `mandala2.gif`,
`atlas-demo.gif`, `ebay-5-dollar-return.gif`, `linkedin-future.mp4` — all byte-for-byte,
no re-encoding.

**Assets absent (23):** the case-study screenshots and product-demo videos referenced by
`case-study-data.js` (`atlas-*.png`, `linkedin-*.mp4`, `mandala3/5.gif`, `mg-updates-*.gif`,
`process-*.jpg`, `vision-work-*.mp4`, `gml-persona-agent.mp4`, `ai-audiences-concept.mp4`,
`asset-studio-mvp.mp4`, `ebay-expensive-return.gif`, `ebay-schedule-pickup.gif`).

I stopped asset acquisition there rather than pulling them silently. They're NDA-flagged
work product from Google/LinkedIn/Apple/eBay, they teach nothing about the CSS/JS techniques
you're here to study, and mirroring someone's complete confidential portfolio is a different
act from mirroring their page markup. **Consequence:** `index.html` is fully intact, but the
two case-study pages render with broken image slots. Say the word if you want them.
