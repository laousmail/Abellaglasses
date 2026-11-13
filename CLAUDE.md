# Lunetterie Abella & De Montigny — website

Project brief for Claude Code. Read this before every task.

## The client
- **Business:** Lunetterie Abella & De Montigny — optometry + optical shop, Montréal.
- **Address / phone (from a public directory, confirm with client):** 8888, rue Lajeunesse, Montréal (QC) H2M 1R6 · 514 387-7177
- **People (confirm):** Dr Sylvain de Montigny, optometrist · Yazid Abella, optician (opticien d'ordonnances), owner.
- **Since 1980.** Evening and weekend appointments, on-site repairs and adjustments, kids' exams, service in French, English and other languages.
- **Brands they want featured:** Tom Ford, Varilux, Crizal, Silhouette, Etnia Barcelona, Perry Ellis.
- **Patients come from:** Ahuntsic-Cartierville, Villeray, Mont-Royal, Laval, Youville, Saint-Léonard.
- **Search terms they expect:** examen de la vue, optométriste, lunetterie, opticien.
- **Built by:** Smail and Anas (agency). Language of the site: French first, English second.

## What the client told us (drives every decision)
- Owner's single priority: **trust**.
- Main objection: "independent clinics are expensive." The team thinks they are actually cheaper. → Show "starting at" prices and explain insurance clearly.
- They lose patients when people compare prices, wait for an answer, or try to book. → Booking always one tap away, fast replies.
- Most asked questions: insurance coverage, price, promotions, when glasses are ready, on-site fitting.
- Team finds it hard to sell premium lenses or a second pair. → Explain lens layers simply (later upsell: lens comparator).

## The rule
Every feature must answer two questions:
1. How does it bring in or measure money?
2. What happens when it fails?
If it can't answer both, it's a toy. Don't build it.

## Stack (long-term)
- **Next.js (App Router, TypeScript)**, hosted on **Vercel**.
- Styling: CSS variables + Tailwind (or CSS modules), using the tokens below.
- 3D: three.js (react-three-fiber + drei is fine). Scroll motion: GSAP + ScrollTrigger.
- Later, when data is needed: **Supabase, Canada region (ca-central-1)** for privacy (Loi 25).
- Forms for now: Jotform (account already connected) or a Next.js route handler with spam protection.

## Starting point
`index.html` in this folder is the approved homepage prototype (single file, CDN three.js r128 + GSAP 3.12.2).
First task: port it into Next.js components with the same look and behaviour, then build the other pages.

## Design system
- **No italics anywhere.** Not in headings, quotes, emphasis or UI. (`i, em { font-style: normal }`)
- **Big text by default.** Visitors to an optician's site literally don't see well. Base 18px (112.5%).
- Fonts: **Plus Jakarta Sans** (headings, 700–800) + **DM Sans** (body, 400–700).
- Colours:
  - ink `#0E1220` · paper `#F6F5F1` · white `#FFFFFF` · muted `#454B5E`
  - night `#0A0E1A` / night2 `#151B2E` (dark showcase bands) · on-night `#F3F1EB` · on-night-muted `#BCC2D2`
  - amber `#E8A23E` (fills, buttons) · amber-ink `#8E520B` (amber text on light) · amber-soft `rgba(232,162,62,.16)`
- Look: Apple-style scroll story. Large type, generous space, cards with soft layered shadows, dark bands for showcase sections, one amber accent.
- Radius 24px on cards, pill buttons, min touch target 44px.

## Reading comfort (core feature, keep it)
- Eye-chart panel on first visit: "Quelle ligne lisez-vous sans effort ?" → tapping a line sets the level.
  - Lines 1–2 → Très grand (xl), lines 3–4 → Grand (lg), lines 5–6 → Standard (std).
- `data-comfort` on `<html>`: std = 1, lg = 1.2, xl = 1.4 font scale.
- Everything is sized in `rem` so the whole layout scales together.
- lg: max 2 columns. xl: 1 column, stronger contrast, no backdrop blur, marquee stops.
- Choice saved in localStorage (wrap in try/catch). "Aa" button in the header reopens it.
- Panel is non-blocking, closes with Escape, never covers the booking bar.
- Note under it: "Ce n'est pas un examen de la vue. Si la lecture était difficile, prenez rendez-vous." (links to booking).
- After a level change, call `ScrollTrigger.refresh()`.
- Do NOT use third-party "accessibility overlay" widgets.

## 3D and motion
- One showpiece: the 3D glasses in the hero (turn on scroll, lenses tint amber at the end). Plus the exploded lens layers section.
- The 3D must never block the first paint: load it lazily, cap pixel ratio at 2, pause rendering when off screen.
- Fallback when WebGL or scripts fail: static SVG glasses. Content must stay fully readable.
- `prefers-reduced-motion: reduce` → no scroll-jacking, no idle animation, everything shown statically.
- GSAP must not overwrite CSS 3D transforms on the lens discs (animate the `--gap` variable instead).

## Pages (French URLs; English under /en later)
- `/` Accueil (prototype)
- `/services` — exams, prescription glasses, progressives, contacts, sunglasses, kids & myopia control, sport/safety
- `/verres` — lens guide (layers explained)
- `/prix-assurances` — "starting at" prices + how insurance works
- `/equipe` — team, since 1980, values
- `/faq`
- `/rendez-vous` — booking + phone + address + hours + map link
- `/confidentialite` — privacy policy (Loi 25)

## Conversion
- "Prendre rendez-vous" in the header on every page; fixed call + book bar on mobile.
- Every page ends with a booking call to action.
- Phone shown as text next to every `tel:` link.

## Tracking (GA4)
Events: `book_click`, `call_click`, `directions_click`, `form_submit`, `comfort_set` (with level), `faq_open`.
Tag links from social/influencers with UTM parameters. Respect consent (Loi 25) before loading analytics.

## Quality bar before launch
- Lighthouse 90+ on performance, accessibility, best practices, SEO (mobile).
- Test every page at all three comfort levels, on a real phone, with reduced motion on, and with JavaScript off.
- Keyboard: visible focus, logical order, Escape closes panels.
- Contrast 4.5:1 for body text.

## Security & privacy
- HTTPS only, security headers (CSP, HSTS, X-Frame-Options, Referrer-Policy).
- Forms: spam protection (honeypot or Turnstile), server-side validation, rate limiting.
- No secrets in the repo: environment variables only. 2FA on Vercel, GitHub, domain, Jotform, Google.
- Collect the minimum: never ask for health details in web forms.
- Loi 25: privacy policy, named person in charge of personal information, cookie/analytics consent.
- Backups of content and any database; uptime monitoring with alerts.

## Advertising rules (professional orders)
- Don't publish "the cheapest" or comparative price claims until the client validates them with the Ordre.
- No patient testimonials about professional services on the site without checking the rules first.
- Referral rewards (later) apply to products only, never to exams or prescription lenses.

## Out of scope now (upsells later)
- Le Cercle Abella referral program
- Virtual try-on (test glasses at home)
- Insurance checker
- Interactive good / better / best lens comparator, face-shape quiz
- Automatic texts (Twilio), client portal, Wallet cards
- Neighbourhood landing pages

## Placeholders to fill (marked with yellow `.fill` in the prototype)
- Starting prices: exam, complete glasses, progressives, adjustments
- Usual delay for glasses (days)
- Opening hours
- Online booking link / tool the clinic uses
- Logo and brand files, real photos (store, team, frames)
- Confirm names, titles, address and phone
