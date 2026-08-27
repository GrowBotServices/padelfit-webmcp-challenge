# PadelFit.Coach — Static Asset Manifest

This source export includes project-owned image files and non-served backup copies of third-party product media. The application source URLs are intentionally unchanged. This manifest makes the export portable while preserving the current live-site behaviour.

## Project-Owned Static Assets

The following files are copied into `client/public/manus-storage/`. They are served by the included Express production server after `pnpm build && pnpm start`.

| Export path | Purpose | Source reference in application |
|---|---|---|
| `client/public/manus-storage/padelfit-logo_ff1cdec5.png` | Padel Fit logo | Header and footer layouts |
| `client/public/manus-storage/adidas-padel-bag_3cc91142.png` | Adidas padel bag product image | Product catalogue |
| `client/public/manus-storage/bullpadel-kitbag_f8683229.png` | Bullpadel kit bag product image | Product catalogue |
| `client/public/manus-storage/head-padel-bag_c1a1a4b9.png` | Head padel bag product image | Product catalogue |
| `client/public/manus-storage/damian-tedx-montage_1e4df01e.webp` | TEDx montage on `/about` | `AboutPage.tsx` |
| `client/public/manus-storage/damian-dance-championship_3a4e936c.webp` | Dance championship image on `/about` | `AboutPage.tsx` |

## Third-Party Product Media Backups

The UI presently references merchant/CDN image URLs held in `client/src/const.ts`. A point-in-time backup has been included in `static-assets/remote-image-backup/` so the images can be reviewed or deliberately migrated later. These files are **not** automatically used by the application and have no effect on the live site.

| Backup file | Current source asset |
|---|---|
| `01.webp` | HEAD Evo Extreme product image - Padel Boost Shopify CDN |
| `02.webp` | HEAD Radical Team Light 2026 product image - Padel Boost Shopify CDN |
| `03.webp` | Adidas Barricade product image - project CDN |
| `04.webp` | Adidas Club Polo product image - project CDN |
| `05.webp` | Asics Gel-Resolution product image - project CDN |
| `06.webp` | Babolat Jet Premura product image - project CDN |
| `07.webp` | Babolat Technical Viper product image - project CDN |
| `08.webp` | Bullpadel Hack 03 product image - project CDN |
| `09.webp` | Bullpadel Technical Tee product image - project CDN |
| `10.webp` | HEAD Gravity Motion product image - project CDN |
| `11.webp` | HEAD Motion Pro product image - project CDN |
| `12.webp` | Kuikma jacket product image - project CDN |
| `13.webp` | Kuikma PR 990 product image - project CDN |
| `14.webp` | Nike Court Shorts product image - project CDN |
| `15.webp` | Nike Court Skirt product image - project CDN |
| `16.webp` | NOX ML10 product image - project CDN |
| `17.png` | Royal Padel Whip Light product image - Padel Boost CDN |
| `18.webp` | Wilson Bela Pro V3 product image - Padel Boost CDN |
| `19.png` | NOX X-ONE Silhouette product image - Padel Boost CDN |

## Migration Guidance

If moving the application to hosting outside the current managed environment, first confirm licences and merchant permissions. Then, if you choose to self-host a particular image, copy the relevant backup file into an appropriate publicly served directory, update only that product's `imageUrl` in `client/src/const.ts`, and test product-card, quiz-result and comparison views. Avoid bulk URL replacements: the project intentionally maintains category-specific image assignments to prevent product/image mismatches.
