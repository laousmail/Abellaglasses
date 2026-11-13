# Lunetterie Abella & De Montigny: website

Next.js (App Router, TypeScript) site for the clinic. Read `CLAUDE.md` (project brief) before any task.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all pages are static)
npm run typecheck
```

## Structure
- `app/`: one folder per page (`/services`, `/verres`, `/prix-assurances`, `/equipe`, `/faq`, `/rendez-vous`, `/confidentialite`), plus `sitemap.ts` and `robots.ts`.
- `app/globals.css`: design tokens and styles, ported from the approved prototype.
- `components/`: `Header` (nav + reading-comfort panel), `Hero` (3D glasses + scroll story), `LensLayers`, `Sections` (all the static sections), `ClientEffects` (card reveal + GA4 events).
- `lib/site.ts`: **business facts and placeholders** (phone, address, hours, booking link, privacy officer). Fill these in once the client confirms.
- `lib/content.ts`: services, prices, team, FAQ copy.
- `lib/glasses3d.ts`: three.js scene, loaded lazily after first paint.
- `reference/index.html`: the approved single-file prototype, kept for comparison.

## Behaviour notes
- Placeholders (`null` in `lib/site.ts` / `lib/content.ts`) render as yellow `.fill` boxes.
- While `SITE.bookingUrl` is `null`, the booking button calls the clinic instead of linking to a missing page.
- Without JavaScript or WebGL, the hero shows the static SVG glasses and all content stays readable.
- `prefers-reduced-motion`: no pinning, no idle animation, no reveal.
- GA4 events fire only if `window.gtag` exists. Nothing loads analytics yet (it needs Loi 25 consent first).

## Preview on GitHub Pages
`.github/workflows/pages.yml` builds a static copy of the site (`PAGES_BASE_PATH=/<repo>`) and publishes it on every push to `main`.
One-time setup: GitHub → Settings → Pages → Source: **GitHub Actions**. Production hosting stays on Vercel (normal build, with security headers).
