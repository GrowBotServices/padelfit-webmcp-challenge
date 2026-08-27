import { PRODUCTS, Product } from '@/const';

export type GearCategory = 'shoe' | 'racket' | 'clothing';
export type AgeBand = 'Under 30' | '30 - 45' | '45+';
export type InjuryProfile = 'none' | 'elbow' | 'knees';
export type PlayingFrequency = 'light' | 'medium' | 'heavy';
export type CourtSurface = 'sandy' | 'mondo' | 'all';
export type FootWidth = 'narrow' | 'standard' | 'wide';
export type PlayStyle = 'control' | 'power' | 'balanced';
export type ClothingGender = 'men' | 'women' | 'unisex';
export type Climate = 'indoor' | 'summer' | 'cold';

export interface GearProfile {
  category: GearCategory;
  age?: AgeBand;
  injury?: InjuryProfile;
  frequency?: PlayingFrequency;
  surface?: CourtSurface;
  width?: FootWidth;
  playStyle?: PlayStyle;
  gender?: ClothingGender;
  climate?: Climate;
}

export interface ScoredProduct {
  product: Product;
  score: number;
}

/**
 * The single source of truth for catalogue matching. The human quiz and the
 * WebMCP recommendation tool both call this function.
 */
export function scoreProducts(profile: GearProfile): ScoredProduct[] {
  const categoryProducts = PRODUCTS.filter((product) => product.category === profile.category);

  return categoryProducts
    .map((product) => {
      let score = 50;

      // AGE FACTOR
      if (profile.age === '45+') {
        if (profile.category === 'shoe' && product.cushioning === 'high') score += 25;
        if (profile.category === 'racket' && product.coreFeel === 'soft') score += 25;
      }

      // INJURY / COMFORT PROFILE
      if (profile.injury === 'elbow' && profile.category === 'racket') {
        if (product.coreFeel === 'soft') score += 30;
        if (product.balance === 'low') score += 20;
        if (product.shape === 'diamond') score -= 25;
        if (product.id === 'royal-padel-whip-light') score += 15;
      } else if (profile.injury === 'knees' && profile.category === 'shoe') {
        if (product.cushioning === 'high') score += 30;
      }

      // PLAYING FREQUENCY
      if (profile.category === 'racket') {
        if (profile.frequency === 'light') {
          if (product.weightBand === 'light') score += 25;
          if (product.coreFeel === 'soft') score += 20;
          if (product.balance === 'low') score += 15;
          if (product.weightBand === 'heavy') score -= 30;
          if (product.coreFeel === 'hard') score -= 25;
          if (product.balance === 'high') score -= 20;
        } else if (profile.frequency === 'medium') {
          if (product.weightBand === 'medium') score += 10;
          if (product.coreFeel === 'medium') score += 10;
          if (product.weightBand === 'heavy' && product.coreFeel === 'hard') score -= 15;
        } else if (profile.frequency === 'heavy') {
          if (product.rating >= 4.7) score += 15;
          if (product.weightBand === 'heavy') score += 10;
        }
      } else if (profile.frequency === 'heavy' && product.rating >= 4.7) {
        score += 15;
      }

      // CATEGORY-SPECIFIC FIT
      if (profile.category === 'shoe') {
        if (profile.surface === product.courtType || product.courtType === 'all') score += 20;
        if (profile.width === product.fitWidth) score += 20;
      } else if (profile.category === 'racket') {
        if (profile.playStyle === 'power') {
          if (product.shape === 'diamond') score += 30;
          if (product.shape === 'round') score -= 10;
        }
        if (profile.playStyle === 'control') {
          if (product.shape === 'round') score += 30;
          if (product.coreFeel === 'soft') score += 15;
          if (product.shape === 'diamond' && product.coreFeel === 'hard') score -= 15;
        }
        if (profile.playStyle === 'balanced') {
          if (product.shape === 'teardrop') score += 35;
          if (product.shape === 'round') score += 10;
          if (product.shape === 'diamond' && product.coreFeel === 'hard') score -= 20;
        }
      } else if (profile.category === 'clothing') {
        if (profile.gender === product.gender || product.gender === 'unisex') score += 30;
        if (profile.climate === product.climate) score += 20;
      }

      return { product, score };
    })
    .sort((a, b) => b.score - a.score);
}

export function recommendProducts(profile: GearProfile, limit = 3): ScoredProduct[] {
  return scoreProducts(profile).slice(0, limit);
}

export function productMatchReasons(product: Product, profile: GearProfile): string[] {
  const reasons: string[] = [];

  if (profile.injury === 'elbow' && profile.category === 'racket') {
    if (product.coreFeel === 'soft') reasons.push('soft feel is comfort-oriented for arm-sensitive players');
    if (product.balance === 'low') reasons.push('lower balance helps keep the swing manageable');
    if (product.shape === 'round') reasons.push('round shape offers a larger, more forgiving sweet spot');
  }
  if (profile.injury === 'knees' && profile.category === 'shoe' && product.cushioning === 'high') {
    reasons.push('high cushioning matches your comfort priority');
  }
  if (profile.surface && profile.category === 'shoe' && (product.courtType === profile.surface || product.courtType === 'all')) {
    reasons.push('outsole profile matches your court surface');
  }
  if (profile.width && profile.category === 'shoe' && product.fitWidth === profile.width) {
    reasons.push('fit width matches your preference');
  }
  if (profile.playStyle === 'power' && profile.category === 'racket' && product.shape === 'diamond') {
    reasons.push('diamond shape supports an attacking power preference');
  }
  if (profile.playStyle === 'control' && profile.category === 'racket' && product.shape === 'round') {
    reasons.push('round shape supports control and precision');
  }
  if (profile.playStyle === 'balanced' && profile.category === 'racket' && product.shape === 'teardrop') {
    reasons.push('teardrop shape is a balanced all-round option');
  }
  if (profile.age === '45+' && product.cushioning === 'high') {
    reasons.push('higher cushioning suits a comfort-first profile');
  }

  return reasons.length > 0 ? reasons.slice(0, 3) : ['strongest overall match in the selected category'];
}

export function productTradeoff(product: Product): string {
  if (product.category === 'racket') {
    if (product.shape === 'diamond') return 'More demanding swing and a smaller sweet spot than a round racket.';
    if (product.coreFeel === 'soft') return 'Comfort and forgiveness come with less explosive response at high swing speeds.';
    return 'Balanced performance, without specialising as strongly for power or comfort.';
  }
  if (product.category === 'shoe') {
    if (product.fitWidth === 'narrow') return 'Performance fit may feel restrictive if you prefer more forefoot room.';
    if (product.cushioning === 'high') return 'Extra cushioning can feel less nimble than a lightweight court shoe.';
    return 'A general-purpose option may be less specialised for one court surface.';
  }
  return 'Check the fit and climate details before choosing between apparel options.';
}
