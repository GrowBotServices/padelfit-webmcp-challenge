# PadelFit.Coach - Editable Source Export

This archive is an editable source-code snapshot of the **Padel Fit** website. It includes the React and TypeScript application, product catalogue, recommendation and scoring logic, routing, legal pages, build configuration, lockfile and downloadable media backups. It excludes `node_modules`, generated build output, local logs, project-management metadata and all secrets.

> **Snapshot provenance.** The source snapshot corresponds to Git commit `2694edbf1896b415139f44520160f4a9263eac49`, recorded at `2026-08-10T09:41:34+00:00`. See [`PROJECT-HISTORY.md`](./PROJECT-HISTORY.md) for the available checkpoint history.

## Technology and Hosting

| Concern | Current implementation |
|---|---|
| Application framework | **React 19** with **TypeScript** |
| Build tool | **Vite 7** |
| Styling | **Tailwind CSS 4** with shadcn/Radix UI primitives |
| Client-side routing | **Wouter** |
| Production web server | **Express** static server with SPA fallback |
| Dependency manager | **pnpm**, locked by `pnpm-lock.yaml` |
| Current hosting | **Manus WebDev**, configured with `padelfit.coach` and `www.padelfit.coach` |
| Current publishing process | A validated Manus project checkpoint automatically publishes to the configured domains. This export did not create a checkpoint or alter the live deployment. |

The application is currently a **frontend-first static project**. Product data, affiliate URLs, weighted quiz recommendations, comparisons and legal content are maintained in source files rather than a database.

## Local Setup and Commands

The project uses Node.js and pnpm. Node.js 22 or later is recommended.

```bash
# From the extracted source folder
corepack enable
pnpm install --frozen-lockfile

# Type-check the application
pnpm check

# Start the Vite development server
pnpm dev

# Build the production application
pnpm build

# Serve the built application locally, including SPA route fallback
pnpm start

# Optional: choose a production port
PORT=4173 pnpm start
```

`pnpm build` writes browser output to `dist/public` and bundles `server/index.ts` with esbuild. `pnpm start` runs the Express server, serving static files and returning `index.html` for client-side routes.

## Environment Configuration

Copy `.env.example` to `.env` only if a relevant integration needs a local value:

```bash
cp .env.example .env
```

No secret values are required to inspect the source, type-check it, or create a production build. The `BUILT_IN_FORGE_*` names are used by the Manus development-only storage proxy in `vite.config.ts`; they are deliberately empty in this export. Project-owned `manus-storage` files are included in `client/public/manus-storage/` for the included Express production server.

`VITE_` values are browser-visible by design. Do not place private API keys, passwords, secret tokens or private publisher credentials in any `VITE_` variable.

## Deployment

### Current managed deployment

The live Padel Fit project uses **Manus WebDev**. The project publishing sequence is: make and validate source changes, run `pnpm check` and `pnpm build`, then save a project checkpoint. The configured auto-publish workflow serves that checkpoint to the configured domains. This source export did not run that sequence.

### External Node hosting

For a generic Node host, install dependencies, type-check, build, set `NODE_ENV=production`, and run the Express server:

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm check
pnpm build
NODE_ENV=production PORT=3000 pnpm start
```

Configure the host to route public traffic to its injected `PORT`. If analytics is enabled, supply `VITE_ANALYTICS_ENDPOINT` and `VITE_ANALYTICS_WEBSITE_ID` at build time.

## Project Structure

```text
client/
  index.html                         # HTML shell, analytics embed and base metadata
  public/                            # Robots, sitemap, debug collector and copied project assets
  src/
    App.tsx                          # Wouter route registration and global providers
    const.ts                         # Product catalogue, offers, affiliate helpers and filters
    components/
      ShoeQuiz.tsx                   # Weighted gear recommendation quiz
      ShoeCard.tsx                   # Review/catalogue product card
      CompareTable.tsx               # Multi-product comparison interface
      AffiliateDisclosure.tsx        # Amazon and neutral affiliate disclosure variants
      PageLayout.tsx                 # Shared inner-page navigation and footer
      GuideLayout.tsx                # Shared layout for buying-guide pages
    pages/                           # Home, feature, guide, legal and About pages
    pages/guides/                    # Three editorial buying-guide pages
  public/manus-storage/              # Copied logo, bag and About image assets
server/index.ts                      # Express static server and SPA fallback
shared/                              # Template compatibility types/constants
vite.config.ts                       # Vite, Tailwind, aliases, debug and storage-proxy config
quiz-scoring-test.mjs                # Deterministic quiz recommendation checks
package.json / pnpm-lock.yaml        # Dependency and lockfile definitions
```

## Routes

The full route map is defined in [`client/src/App.tsx`](./client/src/App.tsx).

| Path | Purpose |
|---|---|
| `/` | Main hub, gear catalogue, quiz and comparison experience |
| `/coaching` | Curated coaching-channel hub |
| `/competitions` | Competition schedule and viewing guidance |
| `/play` | Court and club-finder resources |
| `/nutrition` | Match-preparation and nutrition guidance |
| `/guides` | Buying-guide index |
| `/guides/*` | Three editorial buying-guide pages |
| `/about` | Founder story, approach and contribution routes |
| `/contact` | Public contact route |
| `/affiliate-disclosure` | Affiliate disclosure page |
| `/privacy-policy` | Privacy policy |
| `/terms-of-use` | Terms of use |

## Product, Affiliate and Recommendation Architecture

The source of truth for products and offers is [`client/src/const.ts`](./client/src/const.ts).

| Area | Location | Purpose |
|---|---|---|
| Product catalogue | `PRODUCTS` in `client/src/const.ts` | Product attributes, imagery, fit tags and category-specific fields |
| Merchant offers | `OFFERS` in `client/src/const.ts` | Merchant name, tracking URL, priority and last-checked details |
| Amazon links | `amazonLink()` and `amazonSearchLink()` | Centralises the existing Amazon tag `padelfitcoach-21` |
| Padel Boost links | `padelBoostLink()` | Preserves the existing 2Performant tracking URL structure |
| Offer filtering | `isRenderable()` and `offersForProduct()` | Prevents inactive or placeholder offers appearing in cards |
| Recommendation logic | `client/src/components/ShoeQuiz.tsx` | Weighted scoring by category, age, injury, frequency and playing style |
| Comparison interface | `client/src/components/CompareTable.tsx` | Displays selected products and merchant-aware purchase CTAs |
| Regression test | `quiz-scoring-test.mjs` | Deterministic checks for key racket recommendation profiles |

Run the deterministic quiz coverage after installing dependencies:

```bash
node quiz-scoring-test.mjs
```

## WebMCP Extension Points

The current buyer experience can be retained while introducing WebMCP tools.

| Proposed tool | Existing code to preserve | Recommended extension boundary |
|---|---|---|
| `search_products` | `PRODUCTS`, `OFFERS`, `offersForProduct()` | Wrap catalogue search and filtering as a read-only tool initially |
| `recommend_gear` | `ShoeQuiz.tsx` and `quiz-scoring-test.mjs` | Extract the pure scoring routine to a shared module before exposing it |
| `compare_products` | `CompareTable.tsx`, `Product` fields | Return a normalised subset of existing product specifications |
| `add_to_shortlist` | Existing cards and quiz results | Add a client-side store initially, or a user database only after backend/authentication decisions |

Keep affiliate link generation centralised in `client/src/const.ts`, and preserve current disclosures and `rel="sponsored noopener noreferrer"` conventions in UI components.

## Static Assets

The archive includes project-owned images in `client/public/manus-storage/` and point-in-time backups of currently referenced third-party product media in `static-assets/remote-image-backup/`. The source still uses its current URLs unchanged. See [`ASSET-MANIFEST.md`](./ASSET-MANIFEST.md) for file mappings, provenance and migration guidance.

## History and Export Scope

[`PROJECT-HISTORY.md`](./PROJECT-HISTORY.md) contains the available, timestamped Git/checkpoint history, including a separate record for functionality before and after **25 August 2026**. No available commit is dated on or after that cutoff.

| Excluded item | Reason |
|---|---|
| `node_modules/` | Recreated from `pnpm-lock.yaml` with `pnpm install --frozen-lockfile` |
| `dist/` | Generated by `pnpm build` |
| `.manus-logs/` | Local diagnostics, not editable application source |
| `.project-config.json` | Environment-specific project-management metadata |
| `.env*` values | No environment files were present; `.env.example` lists names only |
| `.git/` | Git metadata and remote configuration excluded; available history is recorded in `PROJECT-HISTORY.md` |

## Licence and Third-Party Assets

This project is released under the MIT License in [`LICENSE`](./LICENSE).

This export preserves the source and current image references for continued project development. Before distributing, relicensing or serving copied third-party product images from a new environment, verify the relevant merchant, manufacturer and CDN permissions. The backups are included to support controlled migration and restoration, not as a claim of ownership over brand imagery.
