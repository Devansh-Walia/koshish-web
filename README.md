# Koshish Family — Website

Source for [koshishfamily.org](https://koshishfamily.org), the website of **Koshish Family**, a Dehradun-based non-profit that helps underprivileged children through education (Pathshala), art & craft, and community drives.

Built with [Astro](https://astro.build), [Svelte](https://svelte.dev) (interactive islands) and [Tailwind CSS v4](https://tailwindcss.com).

## Getting started

**Requirements:** Node.js `>= 22.22` (Astro 7 needs it), npm `>= 9.6.5`.

```sh
npm install     # once
npm run dev     # local dev server at http://localhost:4321
npm run format  # format with Prettier before pushing
```

## Commands

| Command           | Action                                          |
| :---------------- | :---------------------------------------------- |
| `npm run dev`     | Start the dev server at `localhost:4321`        |
| `npm run build`   | Build the production site to `./dist/`          |
| `npm run preview` | Preview the production build locally            |
| `npm run lint`    | Type-check the project (`astro check`)          |
| `npm run format`  | Format all files with Prettier                  |
| `npm run astro`   | Run Astro CLI commands (`astro add`, etc.)      |

## Pages

| Route             | Description                                                     |
| :---------------- | :-------------------------------------------------------------- |
| `/`               | Home: hero, journey timeline, stats, events, testimonials       |
| `/pathshala`      | Pathshala education program and teachers                        |
| `/art-and-craft`  | Art & craft programs and products made by the kids              |
| `/collectdkure`   | Collect–Distribute "Kure" donation drive                        |
| `/donate`         | Donation page with UPI QR and live donation tracker             |
| `/challenge`      | DIT University "5000 Lights of Kindness" points dashboard       |
| `/contact`        | Contact form and map                                            |

## Project structure

```text
/
├── public/              # Static assets (images, favicon, robots.txt, sitemap.xml, _headers)
├── src/
│   ├── components/      # Astro + Svelte components (Header, Footer, Hero, dashboards…)
│   ├── data/            # Page content and constants — edit these to update copy
│   ├── lib/             # Shared client logic (tracking.ts = Firestore totals, donation.ts = formatting)
│   ├── pages/           # One file per route
│   ├── styles/          # Global CSS (Tailwind)
│   └── types/           # Shared TypeScript types/enums
├── astro.config.mjs     # Astro config (Svelte, Tailwind, compression, Terser)
└── .github/workflows/   # GitHub Pages deploy workflow
```

### Updating content

Most text, images and links live in `src/data/`, not in the pages:

- `constants.ts` — contact details and external links
- `seoConstants.ts` — site metadata, organization info for SEO
- `homeData.ts`, `pathshalaData.ts`, `artAndCraftData.ts`, `collectDistributionKureData.ts`, `donateData.ts` — per-page content
- `challengeData.ts` — challenge goal, deadline, tagline and point sources

### Donation & challenge tracking

Totals for `/donate` and `/challenge` live in a single Firestore document (`challenge/totals`) and update live on every device (see `src/lib/tracking.ts`). Points: ₹100 donated/sold = 1 point, each Insta/YT follow = 1 point, each game participant = 1 point.

If no Firebase config is set (e.g. local dev without `.env`), the site falls back to **browser-only** mode (localStorage) and shows an "Offline mode" notice.

**Setup (one time):**

1. Create a Firebase project → add a **Web app** → enable **Firestore** (production mode).
2. Deploy the rules: paste `firestore.rules` into Firestore → Rules, or run `npx firebase-tools deploy --only firestore:rules --project <project-id>`.
3. Local dev: copy `.env.example` to `.env` and fill in the web config.
4. Deployment: add the same four `PUBLIC_FIREBASE_*` values under GitHub repo **Settings → Secrets and variables → Actions → Variables**.

The web config is public by design. Security comes from `firestore.rules`: anyone can read the totals, but writes can only add one capped item at a time (a sale of ₹1–₹1,00,000, +1 follow, +1 participant, or one QR donation of its exact amount). Nothing can be lowered, reset or deleted. If you change the QR options in `src/data/donateData.ts`, update the rules to match.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which installs dependencies, runs `npm run lint`, builds with Astro and deploys `dist/` to GitHub Pages.

The production build compresses HTML/CSS/JS/images/SVG (`astro-compress`) and strips `console`/`debugger` calls via Terser.
