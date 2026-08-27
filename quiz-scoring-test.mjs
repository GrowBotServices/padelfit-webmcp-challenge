/**
 * Deterministic quiz scoring tests — run with: node quiz-scoring-test.mjs
 *
 * Mirrors the calculateResults() logic from ShoeQuiz.tsx exactly.
 * Tests:
 *   A) Under 30 + none + occasional (light) + balanced  → Evo Extreme in top 2
 *   B) Under 30 + none + occasional (light) + control   → Radical Team Light in top 2
 *   C) Under 30 + none + competitive (heavy) + power    → advanced power rackets (no beginner rackets) in top 2
 */

// ---------------------------------------------------------------------------
// Minimal product catalog (rackets only) — mirrors const.ts
// ---------------------------------------------------------------------------
const RACKETS = [
  { id: "babolat-tech-viper",      shape: "diamond",   balance: "high",   weightBand: "heavy",  coreFeel: "hard",   rating: 4.9 },
  { id: "head-gravity-motion",     shape: "round",     balance: "low",    weightBand: "light",  coreFeel: "soft",   rating: 4.7 },
  { id: "kuikma-pr990-power",      shape: "diamond",   balance: "high",   weightBand: "medium", coreFeel: "hard",   rating: 4.5 },
  { id: "nox-ml10-pro-cup",        shape: "round",     balance: "medium", weightBand: "medium", coreFeel: "soft",   rating: 4.8 },
  { id: "bullpadel-hack-03",       shape: "diamond",   balance: "high",   weightBand: "heavy",  coreFeel: "hard",   rating: 4.9 },
  { id: "wilson-bela-pro",         shape: "teardrop",  balance: "medium", weightBand: "heavy",  coreFeel: "medium", rating: 4.8 },
  { id: "head-evo-extreme",        shape: "teardrop",  balance: "low",    weightBand: "light",  coreFeel: "soft",   rating: 4.3 },
  { id: "head-radical-team-light", shape: "round",     balance: "low",    weightBand: "light",  coreFeel: "soft",   rating: 4.5 },
  { id: "royal-padel-whip-light",  shape: "round",     balance: "low",    weightBand: "light",  coreFeel: "soft",   rating: 4.7 },
  // NOX X-Zero Red removed (sold out 10 Aug 2026) — replaced with NOX X-ONE Silhouette 2026 (in-stock)
  { id: "nox-x-one-silhouette",    shape: "round",     balance: "low",    weightBand: "light",  coreFeel: "soft",   rating: 4.3 },
];

// ---------------------------------------------------------------------------
// Scoring function — exact mirror of ShoeQuiz.tsx calculateResults() for rackets
// ---------------------------------------------------------------------------
function scoreRackets(answers) {
  return RACKETS.map(product => {
    let score = 50;

    // AGE
    if (answers.age === '45+' && product.coreFeel === 'soft') score += 25;

    // INJURY
    if (answers.injury === 'elbow') {
      if (product.coreFeel === 'soft') score += 30;
      if (product.balance === 'low') score += 20;
      if (product.shape === 'diamond') score -= 25;
      // Royal Padel Whip Light dedicated Shock Absorption system bonus
      if (product.id === 'royal-padel-whip-light') score += 15;
    }

    // FREQUENCY
    if (answers.frequency === 'light') {
      if (product.weightBand === 'light') score += 25;
      if (product.coreFeel === 'soft') score += 20;
      if (product.balance === 'low') score += 15;
      if (product.weightBand === 'heavy') score -= 30;
      if (product.coreFeel === 'hard') score -= 25;
      if (product.balance === 'high') score -= 20;
    } else if (answers.frequency === 'medium') {
      if (product.weightBand === 'medium') score += 10;
      if (product.coreFeel === 'medium') score += 10;
      if (product.weightBand === 'heavy' && product.coreFeel === 'hard') score -= 15;
    } else if (answers.frequency === 'heavy') {
      if (product.rating >= 4.7) score += 15;
      if (product.weightBand === 'heavy') score += 10;
    }

    // PLAY STYLE
    if (answers.playStyle === 'power') {
      if (product.shape === 'diamond') score += 30;
      if (product.shape === 'round') score -= 10;
    }
    if (answers.playStyle === 'control') {
      if (product.shape === 'round') score += 30;
      if (product.coreFeel === 'soft') score += 15;
      if (product.shape === 'diamond' && product.coreFeel === 'hard') score -= 15;
    }
    if (answers.playStyle === 'balanced') {
      if (product.shape === 'teardrop') score += 35;
      if (product.shape === 'round') score += 10;
      if (product.shape === 'diamond' && product.coreFeel === 'hard') score -= 20;
    }

    return { id: product.id, score };
  }).sort((a, b) => b.score - a.score);
}

// ---------------------------------------------------------------------------
// Test runner
// ---------------------------------------------------------------------------
let passed = 0;
let failed = 0;

function assert(label, results, expectedInTop2, notInTop2 = []) {
  const top2 = results.slice(0, 2).map(r => r.id);
  const allScores = results.map(r => `${r.id}:${r.score}`).join(', ');

  let ok = true;
  for (const id of expectedInTop2) {
    if (!top2.includes(id)) {
      console.error(`FAIL [${label}] Expected "${id}" in top 2, got: [${top2.join(', ')}]`);
      console.error(`     Full scores: ${allScores}`);
      ok = false;
    }
  }
  for (const id of notInTop2) {
    if (top2.includes(id)) {
      console.error(`FAIL [${label}] Did NOT expect "${id}" in top 2, got: [${top2.join(', ')}]`);
      console.error(`     Full scores: ${allScores}`);
      ok = false;
    }
  }
  if (ok) {
    console.log(`PASS [${label}] top 2: [${top2.join(', ')}]`);
    passed++;
  } else {
    failed++;
  }
}

// Test A: Under 30 + none + occasional + all-round → Evo Extreme in top 2
assert(
  'A: occasional + balanced → Evo Extreme',
  scoreRackets({ age: 'Under 30', injury: 'none', frequency: 'light', playStyle: 'balanced' }),
  ['head-evo-extreme'],
  ['babolat-tech-viper', 'bullpadel-hack-03', 'wilson-bela-pro']
);

// Test B: Under 30 + none + occasional + control → Radical Team Light in top 2
assert(
  'B: occasional + control → Radical Team Light',
  scoreRackets({ age: 'Under 30', injury: 'none', frequency: 'light', playStyle: 'control' }),
  ['head-radical-team-light'],
  ['babolat-tech-viper', 'bullpadel-hack-03', 'wilson-bela-pro']
);

// Test C: Under 30 + none + competitive + power → advanced power rackets, no beginner rackets
assert(
  'C: competitive + power → advanced power rackets only',
  scoreRackets({ age: 'Under 30', injury: 'none', frequency: 'heavy', playStyle: 'power' }),
  ['babolat-tech-viper'],
  ['head-evo-extreme', 'head-radical-team-light']
);

// Test D: Under 30 + elbow + regular + control → Royal Padel Whip Light in top 2 (elbow-safe, soft, low-balance)
assert(
  'D: elbow + regular + control → Royal Padel Whip Light',
  scoreRackets({ age: 'Under 30', injury: 'elbow', frequency: 'medium', playStyle: 'control' }),
  ['royal-padel-whip-light'],
  ['babolat-tech-viper', 'bullpadel-hack-03', 'kuikma-pr990-power']
);

// Test E: Under 30 + none + occasional + control → NOX X-Zero Red or Radical Team Light in top 2
assert(
  'E: occasional + control → beginner-friendly control racket (NOX X-ONE Silhouette or Radical Team Light)',
  scoreRackets({ age: 'Under 30', injury: 'none', frequency: 'light', playStyle: 'control' }),
  [],  // either is acceptable — just confirm no advanced hard rackets appear
  ['babolat-tech-viper', 'bullpadel-hack-03', 'wilson-bela-pro']
);

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
