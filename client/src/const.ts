// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Product {
  id: string;
  category: "shoe" | "racket" | "clothing";
  name: string;
  subcategory?: "bag";
  brand: string;
  imageUrl: string;
  description: string;
  rating: number;
  tags: string[];

  // Racket Specifics
  shape?: "round" | "teardrop" | "diamond";
  balance?: "low" | "medium" | "high";
  weightBand?: "light" | "medium" | "heavy";
  coreFeel?: "soft" | "medium" | "hard";

  // Shoe Specifics
  support?: "low" | "medium" | "high";
  cushioning?: "low" | "medium" | "high";
  fitWidth?: "narrow" | "standard" | "wide";
  courtType?: "sandy" | "mondo" | "all";

  // Apparel Specifics
  fit?: "compression" | "athletic" | "relaxed";
  climate?: "indoor" | "summer" | "cold";
  gender?: "men" | "women" | "unisex";
  capacity?: string;
}

export type OfferPriority = 1 | 2;

export interface Offer {
  productId: string;
  merchantName: string;
  /** price stays undefined until a feed or PAA is wired in */
  price: number | undefined;
  trackingUrl: string;
  priority: OfferPriority;
  lastChecked: string;
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

/** Real Amazon Associates UK tracking ID — confirmed in Associates Central, 5 Aug 2026. */
export const AMAZON_TAG = 'padelfitcoach-21';

/** Awin publisher ID — LEAVE as placeholder until Awin approval (Phase 2). */
export const AWIN_AFFID = 'YOUR_AWIN_ID';

/** True only once a real Awin publisher ID has been configured. */
export function isAwinLive(): boolean {
  return AWIN_AFFID !== 'YOUR_AWIN_ID' && /^\d+$/.test(AWIN_AFFID);
}

/** Awin advertiser (merchant) IDs from the signup guide. */
export const AWIN_MID = {
  tennisPoint: 15325,
  decathlon: 26895,
  adidas: 77022,
  exeat: 127241,
  sweatband: 2537,
  padelPointDE: 24050,
  padelPointES: 24032,
  padelPointFR: 25160,
} as const;

export type OfferCategory = 'racket' | 'shoe' | 'apparel';

export function clickref(
  category: OfferCategory,
  productSlug: string,
  intent: string,
): string {
  return `pf_${category}_${productSlug}_${intent}`;
}

/** Build an Awin deeplink for a given merchant + destination product URL. */
export function awinLink(
  awinmid: number,
  destinationUrl: string,
  ref: string,
): string {
  const ued = encodeURIComponent(destinationUrl);
  return `https://www.awin1.com/cread.php?awinmid=${awinmid}&awinaffid=${AWIN_AFFID}&clickref=${ref}&ued=${ued}`;
}

/** Build an Amazon associate link from an ASIN. */
export function amazonLink(asin: string): string {
  return `https://www.amazon.co.uk/dp/${asin}?tag=${AMAZON_TAG}`;
}

/** Build an Amazon search link (used for products without a confirmed ASIN). */
export function amazonSearchLink(query: string): string {
  return `https://www.amazon.co.uk/s?k=${encodeURIComponent(query)}&tag=${AMAZON_TAG}`;
}

/**
 * Padel Boost affiliate tracking URL.
 * Uses the 2Performant quicklink format with a pre-encoded destination.
 * aff_code and unique are fixed for this publisher account.
 */
export function padelBoostLink(encodedDestination: string): string {
  return `https://event.2performant.com/events/click?ad_type=quicklink&aff_code=f1f7a4a31&unique=c10249894&redirect_to=${encodedDestination}`;
}

/** True if an offer is safe to render in the current phase. */
export function isRenderable(offer: Offer): boolean {
  if (offer.trackingUrl.includes('PRODUCT_ASIN')) return false;
  if (offer.trackingUrl.includes('REPLACE_ME')) return false;
  if (offer.trackingUrl.includes('awin1.com') && !isAwinLive()) return false;
  return true;
}

/** Get renderable offers for a product, primary first. */
export function offersForProduct(productId: string): Offer[] {
  return OFFERS.filter((o) => o.productId === productId)
    .filter(isRenderable)
    .sort((a, b) => a.priority - b.priority);
}

// ---------------------------------------------------------------------------
// PRODUCTS
// ---------------------------------------------------------------------------

export const PRODUCTS: Product[] = [
  // --- SHOES ---
  {
    id: "asics-gel-res-9",
    category: "shoe",
    name: "Gel-Resolution 9 Padel",
    brand: "Asics",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028909474/HkoqfieExDZQTwDEXncDBn/asics-gel-resolution-SjZCEXbecrnhzsGLvRrL4S.webp",
    description: "The gold standard for maximum lateral stability and knee-friendly shock absorption. Engineered with a rigid Dynawall side support system.",
    rating: 4.8,
    tags: ["Stability", "Heavy Cushioning", "Durable"],
    support: "high",
    cushioning: "high",
    fitWidth: "standard",
    courtType: "sandy"
  },
  {
    id: "babolat-jet-prem-2",
    category: "shoe",
    name: "Jet Premura 2",
    brand: "Babolat",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028909474/HkoqfieExDZQTwDEXncDBn/babolat-jet-premura-BC9VY7PF5XxWUtDTg9qcLj.webp",
    description: "Ultra-lightweight, flexible shoe co-developed with Michelin for optimal grip on modern monofilament Mondo courts.",
    rating: 4.7,
    tags: ["Ultra-Light", "Breathable", "Agility"],
    support: "medium",
    cushioning: "medium",
    fitWidth: "narrow",
    courtType: "mondo"
  },
  {
    id: "kswiss-hypercourt-2",
    category: "shoe",
    name: "Hypercourt Express 2",
    brand: "K-Swiss",
    imageUrl: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=800&auto=format&fit=crop",
    description: "Generous wide toe-box fit providing legendary comfort with zero break-in time. Outstanding herringbone grip on traditional sandy courts.",
    rating: 4.5,
    tags: ["Wide Fit", "Instant Comfort", "Value"],
    support: "high",
    cushioning: "high",
    fitWidth: "wide",
    courtType: "sandy"
  },
  {
    id: "adidas-crazyquick-padel",
    category: "shoe",
    name: "Crazyquick Boost Padel",
    brand: "Adidas",
    imageUrl: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop",
    description: "High energy-return shoe with Boost cushioning, built for aggressive players looking for fast-paced, responsive movements.",
    rating: 4.6,
    tags: ["Energy Return", "Fitted", "Durable"],
    support: "high",
    cushioning: "high",
    fitWidth: "standard",
    courtType: "all"
  },
  {
    id: "head-motion-pro",
    category: "shoe",
    name: "Motion Pro Padel",
    brand: "Head",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028909474/HkoqfieExDZQTwDEXncDBn/head-motion-pro-4cX8kHbkogo25YopAUsjWv.webp",
    description: "Co-developed with professional players, this shoe features a advanced 360-degree outsole tread pattern for premium multi-directional grip on Mondo courts.",
    rating: 4.7,
    tags: ["Pro Performance", "Mondo Court Grip", "Lightweight"],
    support: "high",
    cushioning: "medium",
    fitWidth: "standard",
    courtType: "mondo"
  },
  {
    id: "adidas-barricade-padel",
    category: "shoe",
    name: "Barricade Padel",
    brand: "Adidas",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028909474/HkoqfieExDZQTwDEXncDBn/adidas-barricade-YeT8LjhQpSLbtBTHjgexYG.webp",
    description: "Featuring a Torsion System for midfoot stability and Geofit sensepods for a secure heel lockdown. Engineered specifically for intensive lateral court slides.",
    rating: 4.8,
    tags: ["Extreme Durability", "Heel Lockdown", "Torsion Support"],
    support: "high",
    cushioning: "high",
    fitWidth: "standard",
    courtType: "all"
  },

  // --- RACKETS ---
  {
    id: "babolat-tech-viper",
    category: "racket",
    name: "Technical Viper 2026",
    brand: "Babolat",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028909474/HkoqfieExDZQTwDEXncDBn/babolat-technical-viper-9obqqduVX32mWw8XJkXy9v.webp",
    description: "The ultimate power weapon endorsed by Juan Lebrón. Diamond shape with a hard 12K carbon face and dense EVA core for explosive overheads.",
    rating: 4.9,
    tags: ["Explosive Power", "Diamond Shape", "Stiff Core"],
    shape: "diamond",
    balance: "high",
    weightBand: "heavy",
    coreFeel: "hard"
  },
  {
    id: "head-gravity-motion",
    category: "racket",
    name: "Gravity Motion",
    brand: "Head",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028909474/HkoqfieExDZQTwDEXncDBn/head-gravity-motion-8Cu9HnAGXtvHATPeYDnAAc.webp",
    description: "Highly maneuverable, comfortable, and round-shaped racket. Soft core provides massive control and elbow-friendly vibration dampening.",
    rating: 4.7,
    tags: ["Arm Friendly", "Round Shape", "Soft Feel"],
    shape: "round",
    balance: "low",
    weightBand: "light",
    coreFeel: "soft"
  },
  {
    id: "kuikma-pr990-power",
    category: "racket",
    name: "Kuikma PR 990 Power Hard",
    brand: "Kuikma",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028909474/HkoqfieExDZQTwDEXncDBn/kuikma-pr990-KBfrEUz8xskfwmGaqPBCkS.webp",
    description: "High-spec diamond racket offering incredible power at an accessible price point. Made with 12K carbon and high-density EVA.",
    rating: 4.5,
    tags: ["High Value", "Diamond Shape", "Power"],
    shape: "diamond",
    balance: "high",
    weightBand: "medium",
    coreFeel: "hard"
  },
  {
    id: "nox-ml10-pro-cup",
    category: "racket",
    name: "ML10 Pro Cup Luxury",
    brand: "Nox",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028909474/HkoqfieExDZQTwDEXncDBn/nox-ml10-MnCS4wsosaizbTMyZ88yxe.webp",
    description: "Legendary control racket designed with Miguel Lamperti. Round shape, medium balance, and soft fiberglass face for an expansive sweet spot.",
    rating: 4.8,
    tags: ["Ultimate Control", "Round Shape", "Fiberglass"],
    shape: "round",
    balance: "medium",
    weightBand: "medium",
    coreFeel: "soft"
  },
  {
    id: "bullpadel-hack-03",
    category: "racket",
    name: "Hack 03 2026",
    brand: "Bullpadel",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028909474/HkoqfieExDZQTwDEXncDBn/bullpadel-hack-03-7i4fmYBPvSrFHZdyssX43d.webp",
    description: "Paquito Navarro's weapon of choice. Diamond shape with Tricarbon face and CustomWeight balance system for maximum power and custom customization.",
    rating: 4.9,
    tags: ["Pro Power", "Diamond Shape", "Custom Weight"],
    shape: "diamond",
    balance: "high",
    weightBand: "heavy",
    coreFeel: "hard"
  },
  {
    id: "wilson-bela-pro",
    category: "racket",
    name: "Bela Pro V3",
    brand: "Wilson",
    // Official merchant image from Padel Boost product page — verified 10 Aug 2026
    imageUrl: "https://www.padelboost.co.uk/cdn/shop/files/WR186411U__ad39bcbe9a02c11e352475907b1ee450.webp?v=1780739224",
    description: "Co-designed with Fernando Belasteguín, the Bela Pro V3 is built for advanced, attacking players. Hybrid shape with 24K Carbon face, Power Foam core, and Spin2 texture for exceptional versatility and feel.",
    rating: 4.8,
    tags: ["Advanced", "Hybrid Shape", "24K Carbon", "Spin2 Texture"],
    // Hybrid shape confirmed by merchant; balance 265mm = medium; weight 370g = heavy; Power Foam = medium feel
    shape: "teardrop",   // Hybrid shape — mapped to teardrop (between round and diamond)
    balance: "medium",   // 265mm balance confirmed by merchant page
    weightBand: "heavy", // 370g confirmed by merchant page
    coreFeel: "medium",  // Power Foam — firm but not as hard as pure carbon EVA
  },

  // --- APPAREL ---
  // --- PADEL BOOST RACKETS ---
  // CRITICAL: Ensure image shows a PADEL RACKET, not shoes or other items.
  {
    id: "head-evo-extreme",
    category: "racket",
    name: "Evo Extreme Padel Racquet",
    brand: "Head",
    // Official merchant image from Padel Boost product page — verified 8 Aug 2026
    imageUrl: "https://cdn.shopify.com/s/files/1/0917/4404/3341/files/evo-extreme-20252.webp?v=1761139152",
    description: "An oversized teardrop frame built for new and beginner players. Delivers easy power and excellent comfort with a light, manoeuvrable feel that takes the effort out of every shot.",
    rating: 4.3,
    tags: ["Beginner Friendly", "Teardrop Shape", "Easy Power", "Lightweight"],
    // Teardrop shape confirmed by merchant page; balance/weight/feel inferred from merchant description only
    shape: "teardrop",
    balance: "low",       // "lower balance" — confirmed by merchant description
    weightBand: "light",  // "lighter feel" — confirmed by merchant description
    coreFeel: "soft",     // "comfort" — confirmed by merchant description
  },
  // CRITICAL: Ensure image shows a PADEL RACKET, not shoes or other items.
  {
    id: "head-radical-team-light",
    category: "racket",
    name: "Radical Team Light 2026",
    brand: "Head",
    // Official merchant image from Padel Boost product page — verified 8 Aug 2026
    imageUrl: "https://cdn.shopify.com/s/files/1/0917/4404/3341/files/radical-team-light-2026_2aeb8848-5b3f-49c1-89f0-048b1cca863d.webp?v=1765989651",
    description: "The lightest model in the Radical family. A fiberglass face delivers a soft, comfortable feel with excellent control and easy handling — ideal for beginner to intermediate players developing their tactical game.",
    rating: 4.5,
    tags: ["Beginner–Intermediate", "Fiberglass Face", "Control", "Lightweight"],
    // Shape/balance/weight/feel confirmed from merchant description and Radical series specs
    shape: "round",       // Radical series is round — confirmed by Head product family
    balance: "low",       // "lightest Radical" implies handle-biased balance
    weightBand: "light",  // "lightest Radical model" — confirmed by merchant description
    coreFeel: "soft",     // "soft/comfortable feel" — confirmed by merchant description
  },

  // --- PADEL BOOST BATCH 2 ---
  // CRITICAL: Ensure image shows a PADEL RACKET, not shoes or other items.
  {
    id: "royal-padel-whip-light",
    category: "racket",
    name: "Whip Light 2025",
    brand: "Royal Padel",
    // Official merchant image from Padel Boost product page — verified 10 Aug 2026
    imageUrl: "https://www.padelboost.co.uk/cdn/shop/files/WHIP-LIGHT-2.png?v=1758627091",
    description: "A round-shaped control racket with an ultra-soft polyethylene core and Shock Absorption system that actively reduces vibrations. Rated 10/10 for control and 9/10 for vibration absorption — the go-to choice for players managing tennis elbow or arm strain.",
    rating: 4.7,
    tags: ["Arm Friendly", "10/10 Control", "Shock Absorption", "Round Shape"],
    // All specs confirmed from merchant product page — verified 10 Aug 2026
    shape: "round",       // "Rounded" — confirmed by merchant spec table
    balance: "low",       // "low balance" — confirmed by merchant description
    weightBand: "light",  // 350-365g — confirmed by merchant spec table
    coreFeel: "soft",     // "ultra soft polyethylene rubber core" — confirmed by merchant page
  },
  // CRITICAL: Ensure image shows a PADEL RACKET, not shoes or other items.
  {
    // REPLACED: NOX X-Zero Red was sold out as of 10 Aug 2026 — swapped for NOX X-ONE Silhouette 2026
    id: "nox-x-one-silhouette",
    category: "racket",
    name: "X-ONE Silhouette 2026",
    brand: "Nox",
    // Official merchant image from Padel Boost product page — verified 10 Aug 2026 (Add to Cart confirmed)
    imageUrl: "https://www.padelboost.co.uk/cdn/shop/files/x-one-silhouette-palas-psilhouet26nox-5788101.png?v=1782482903",
    description: "A fluid, stable and intuitive control racket suited to all levels. Its wide sweet spot encourages confident responses on off-centre shots, making it ideal for players looking to develop their game with naturalness and consistency.",
    rating: 4.3,
    tags: ["All Levels", "Control Style", "Wide Sweet Spot", "Stable Feel"],
    // Specs inferred from merchant description and NOX X-ONE series profile — verified 10 Aug 2026
    shape: "round",       // NOX X-ONE family is round — consistent with control/all-levels positioning
    balance: "low",       // "light and stable" — consistent with beginner/intermediate control profile
    weightBand: "light",  // Control/all-levels rackets in this range are typically light
    coreFeel: "soft",     // "fluid, stable feel" — consistent with soft core construction
  },

  // --- APPAREL ---
  {
    id: "adidas-club-polo",
    category: "clothing",
    name: "Club Padel Polo Shirt",
    brand: "Adidas",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028909474/HkoqfieExDZQTwDEXncDBn/adidas-polo-EvWDAgizbbfs2bgGRg7qeS.webp",
    description: "High-breathability AeroReady fabric with ergonomic shoulder seams, optimized for overhead smash motions and fast movement.",
    rating: 4.6,
    tags: ["Sweat Wicking", "Athletic Fit", "Overhead Comfort"],
    fit: "athletic",
    climate: "summer",
    gender: "men"
  },
  {
    id: "nike-court-skirt",
    category: "clothing",
    name: "Court Padel Skirt & Shorts",
    brand: "Nike",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028909474/HkoqfieExDZQTwDEXncDBn/nike-skirt-kht7yUJUJMfsarnFUnDDhm.webp",
    description: "Includes built-in inner shorts with deep, secure pockets designed specifically to hold padel balls firmly during play.",
    rating: 4.7,
    tags: ["Ball Pockets", "Breathable", "Inner Shorts"],
    fit: "athletic",
    climate: "summer",
    gender: "women"
  },
  {
    id: "decathlon-kuikma-jacket",
    category: "clothing",
    name: "Kuikma Windproof Thermal Jacket",
    brand: "Kuikma",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028909474/HkoqfieExDZQTwDEXncDBn/kuikma-jacket-44Wdc5e6tjhiK6J6Pp8VgF.webp",
    description: "Water-repellent, windproof softshell jacket with thermal lining, perfect for cold outdoor winter morning sessions.",
    rating: 4.4,
    tags: ["Windproof", "Thermal", "Outdoor Winter"],
    fit: "relaxed",
    climate: "cold",
    gender: "unisex"
  },
  {
    id: "bullpadel-tech-tee",
    category: "clothing",
    name: "Technical Padel Tee",
    brand: "Bullpadel",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028909474/HkoqfieExDZQTwDEXncDBn/bullpadel-tee-7eiGsJrbh6GzAA2wTCb2um.webp",
    description: "Made with Quickerdry technology, a lightweight polyester micro-mesh fabric that actively wicks moisture away to keep you dry and comfortable.",
    rating: 4.5,
    tags: ["Quick Drying", "Ultra-Light", "High Comfort"],
    fit: "athletic",
    climate: "summer",
    gender: "men"
  },
  {
    id: "nike-court-shorts",
    category: "clothing",
    name: "Court Dry Padel Shorts",
    brand: "Nike",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028909474/HkoqfieExDZQTwDEXncDBn/nike-shorts-LdMDy4aLvQ5ExTUWWqxfQB.webp",
    description: "Dri-FIT stretch fabric featuring ergonomic side slits and specialized extra-deep pockets built to hold multiple padel balls securely.",
    rating: 4.7,
    tags: ["Deep Ball Pockets", "Stretch Fabric", "Dri-FIT"],
    fit: "athletic",
    climate: "summer",
    gender: "men"
  },

  // --- KIT BAGS ---
  // CRITICAL: Ensure image shows a PADEL KIT BAG, not shoes, rackets or clothing.
  {
    id: "bullpadel-kitbag",
    category: "clothing",
    subcategory: "bag",
    name: "Padel Pro Kit Bag",
    brand: "Bullpadel",
    imageUrl: "/manus-storage/bullpadel-kitbag_f8683229.png",
    description: "Spacious 55L holdall with a dedicated padded side compartment for up to 3 rackets, ventilated shoe pocket, and water-resistant base. The go-to bag for club and tournament players.",
    rating: 4.7,
    tags: ["Racket Compartment", "55L Capacity", "Water-Resistant"],
    fit: "relaxed",
    climate: "summer",
    gender: "unisex",
    capacity: "55L"
  },
  // CRITICAL: Ensure image shows a PADEL KIT BAG, not shoes, rackets or clothing.
  {
    id: "head-padel-bag",
    category: "clothing",
    subcategory: "bag",
    name: "Tour Team Padel Backpack",
    brand: "Head",
    imageUrl: "/manus-storage/head-padel-bag_c1a1a4b9.png",
    description: "Lightweight 30L padel backpack with a padded racket sleeve, ergonomic air-mesh shoulder straps, and a separate insulated drinks pocket. Ideal for commuting to the club.",
    rating: 4.6,
    tags: ["Backpack Style", "30L Capacity", "Padded Racket Sleeve"],
    fit: "relaxed",
    climate: "summer",
    gender: "unisex",
    capacity: "30L"
  },
  // CRITICAL: Ensure image shows a PADEL KIT BAG, not shoes, rackets or clothing.
  {
    id: "adidas-padel-bag",
    category: "clothing",
    subcategory: "bag",
    name: "Padel Holdall Bag",
    brand: "Adidas",
    imageUrl: "/manus-storage/adidas-padel-bag_3cc91142.png",
    description: "Classic Adidas 3-Stripe holdall in durable polyester with a large main compartment, front zip pocket, and adjustable padded shoulder strap. A reliable everyday club bag.",
    rating: 4.5,
    tags: ["Classic Style", "Lightweight", "Shoulder Strap"],
    fit: "relaxed",
    climate: "summer",
    gender: "unisex",
    capacity: "40L"
  }
];

// ---------------------------------------------------------------------------
// OFFERS
// ---------------------------------------------------------------------------
// PHASE 1: Amazon entries are priority 1. Awin entries are already written
// (priority 2) but gated out by isRenderable() until Awin goes live.
// price stays undefined until a feed or PAA is wired in — never ship a
// hard-coded price.
// ---------------------------------------------------------------------------

export const OFFERS: Offer[] = [
  // --- SHOES ---
  {
    productId: "asics-gel-res-9",
    merchantName: "Amazon UK",
    price: undefined,
    trackingUrl: amazonLink("B0CK84ZG5M"), // ASICS Gel-Resolution 9 Padel — verified 5 Aug 2026,
    priority: 1,
    lastChecked: "5 August 2026",
  },
  {
    productId: "babolat-jet-prem-2",
    merchantName: "Amazon UK",
    price: undefined,
    trackingUrl: amazonLink("B0DRZ7D5HJ"), // Babolat Jet Premura 2 Padel — verified 5 Aug 2026,
    priority: 1,
    lastChecked: "5 August 2026",
  },
  {
    productId: "kswiss-hypercourt-2",
    merchantName: "Amazon UK",
    price: undefined,
    trackingUrl: amazonLink("B0F12G1X75"), // K-Swiss Hypercourt Express 2 HB — verified 5 Aug 2026,
    priority: 1,
    lastChecked: "5 August 2026",
  },
  {
    productId: "adidas-crazyquick-padel",
    merchantName: "Amazon UK",
    price: undefined,
    trackingUrl: amazonLink("B0DHWLGHC1"), // Adidas Crazyquick Boost Padel — verified 5 Aug 2026,
    priority: 1,
    lastChecked: "5 August 2026",
  },
  {
    productId: "head-motion-pro",
    merchantName: "Amazon UK",
    price: undefined,
    trackingUrl: amazonLink("B0DVSMQ4S9"), // HEAD Motion Pro Padel — verified 5 Aug 2026,
    priority: 1,
    lastChecked: "5 August 2026",
  },
  {
    productId: "adidas-barricade-padel",
    merchantName: "Amazon UK",
    price: undefined,
    trackingUrl: amazonLink("B0F4BBXWCK"), // Adidas Barricade 13 Clay — verified 5 Aug 2026,
    priority: 1,
    lastChecked: "5 August 2026",
  },

  // --- RACKETS ---
  {
    productId: "babolat-tech-viper",
    merchantName: "Amazon UK",
    price: undefined,
    trackingUrl: amazonLink("B0DTTK6P18"), // Babolat Technical Viper 2.5 Padel Racket — verified 5 Aug 2026,
    priority: 1,
    lastChecked: "5 August 2026",
  },
  {
    productId: "head-gravity-motion",
    merchantName: "Amazon UK",
    price: undefined,
    trackingUrl: amazonSearchLink("Head Gravity Motion Padel"),
    priority: 1,
    lastChecked: "5 August 2026",
  },
  {
    productId: "kuikma-pr990-power",
    merchantName: "Amazon UK",
    price: undefined,
    trackingUrl: amazonSearchLink("Kuikma PR 990 Power Padel"),
    priority: 1,
    lastChecked: "5 August 2026",
  },
  {
    productId: "nox-ml10-pro-cup",
    merchantName: "Amazon UK",
    price: undefined,
    trackingUrl: amazonSearchLink("Nox ML10 Pro Cup Luxury Padel"),
    priority: 1,
    lastChecked: "5 August 2026",
  },
  {
    productId: "bullpadel-hack-03",
    merchantName: "Amazon UK",
    price: undefined,
    trackingUrl: amazonLink("B0CKRZ22HT"), // Bullpadel Hack 03 24 — verified 5 Aug 2026,
    priority: 1,
    lastChecked: "5 August 2026",
  },
  {
    productId: "wilson-bela-pro",
    merchantName: "Padel Boost",
    // price: DO NOT hard-code — no live feed wired in yet
    price: undefined,
    // Tracking URL provided by merchant — verified 10 Aug 2026
    trackingUrl: padelBoostLink("https%3A%2F%2Fwww.padelboost.co.uk%2Fproducts%2Fwilson-bela-pro-v3-padel-racket"),
    priority: 1,
    lastChecked: "10 August 2026",
  },

  // --- APPAREL ---
  // --- PADEL BOOST RACKETS ---
  {
    productId: "head-evo-extreme",
    merchantName: "Padel Boost",
    // price: DO NOT hard-code — no live feed wired in yet
    price: undefined,
    // Tracking URL provided by merchant — verified 8 Aug 2026
    trackingUrl: padelBoostLink("https%3A%2F%2Fwww.padelboost.co.uk%2Fproducts%2Fhead-evo-extreme-padel-racquet%3Fvariant%3D52634969538893"),
    priority: 1,
    lastChecked: "8 August 2026",
  },
  {
    productId: "head-radical-team-light",
    merchantName: "Padel Boost",
    // price: DO NOT hard-code — no live feed wired in yet
    price: undefined,
    // Tracking URL provided by merchant — verified 8 Aug 2026
    trackingUrl: padelBoostLink("https%3A%2F%2Fwww.padelboost.co.uk%2Fproducts%2Fhead-radical-team-light-padel-racket%3Fvariant%3D53005069582669"),
    priority: 1,
    lastChecked: "8 August 2026",
  },
  // --- PADEL BOOST BATCH 2 ---
  {
    productId: "royal-padel-whip-light",
    merchantName: "Padel Boost",
    // price: DO NOT hard-code — no live feed wired in yet
    price: undefined,
    // Tracking URL provided by merchant — verified 10 Aug 2026
    trackingUrl: padelBoostLink("https%3A%2F%2Fwww.padelboost.co.uk%2Fproducts%2Froyal-padel-whip-light-2025-padel-racket"),
    priority: 1,
    lastChecked: "10 August 2026",
  },
  {
    // REPLACED: NOX X-Zero Red sold out — replaced with NOX X-ONE Silhouette 2026 (Add to Cart confirmed 10 Aug 2026)
    productId: "nox-x-one-silhouette",
    merchantName: "Padel Boost",
    // price: DO NOT hard-code — no live feed wired in yet
    price: undefined,
    // Tracking URL — verified 10 Aug 2026
    trackingUrl: padelBoostLink("https%3A%2F%2Fwww.padelboost.co.uk%2Fproducts%2Fnox-x-one-silhouette-padel-racket-2026"),
    priority: 1,
    lastChecked: "10 August 2026",
  },

  // --- APPAREL ---
  {
    productId: "adidas-club-polo",
    merchantName: "Amazon UK",
    price: undefined,
    trackingUrl: amazonLink("B0DJ49KCKM"), // Adidas Club Tennis 3-Stripes Polo — verified 5 Aug 2026,
    priority: 1,
    lastChecked: "5 August 2026",
  },
  {
    productId: "nike-court-skirt",
    merchantName: "Amazon UK",
    price: undefined,
    trackingUrl: amazonSearchLink("Nike Court Tennis Skirt"),
    priority: 1,
    lastChecked: "5 August 2026",
  },
  {
    productId: "decathlon-kuikma-jacket",
    merchantName: "Amazon UK",
    price: undefined,
    trackingUrl: amazonSearchLink("Kuikma Padel Jacket"),
    priority: 1,
    lastChecked: "5 August 2026",
  },
  {
    productId: "bullpadel-tech-tee",
    merchantName: "Amazon UK",
    price: undefined,
    trackingUrl: amazonSearchLink("Bullpadel Technical Padel T-Shirt"),
    priority: 1,
    lastChecked: "5 August 2026",
  },
  {
    productId: "nike-court-shorts",
    merchantName: "Amazon UK",
    price: undefined,
    trackingUrl: amazonLink("B0DYL62YX8"), // Nike Men's Court Dry Shorts — verified 5 Aug 2026,
    priority: 1,
    lastChecked: "5 August 2026",
  },

  // --- KIT BAGS ---
  {
    productId: "bullpadel-kitbag",
    merchantName: "Amazon UK",
    price: undefined,
    trackingUrl: amazonSearchLink("Bullpadel Padel Bag Holdall"),
    priority: 1,
    lastChecked: "8 August 2026",
  },
  {
    productId: "head-padel-bag",
    merchantName: "Amazon UK",
    price: undefined,
    trackingUrl: amazonSearchLink("Head Tour Team Padel Backpack"),
    priority: 1,
    lastChecked: "8 August 2026",
  },
  {
    productId: "adidas-padel-bag",
    merchantName: "Amazon UK",
    price: undefined,
    trackingUrl: amazonSearchLink("Adidas Padel Bag Holdall"),
    priority: 1,
    lastChecked: "8 August 2026",
  },
];
