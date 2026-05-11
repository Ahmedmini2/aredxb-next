// Server-side AI analyzer math — ported from legacy property-detail.html
// Used to render the 4 inline analyzers on the property detail page:
//   • Property Fit Analyzer
//   • Exit Strategy Analyzer
//   • Capital Appreciation Analyzer
//   • Rental Yield Analyzer

export type CommunityData = { label: string; yield: number; app: number; sqft: number };

export const COMMUNITY_DATA: Record<string, CommunityData> = {
  'dubai-marina':     { label: 'Dubai Marina',       yield: 0.062, app: 0.072, sqft: 2300 },
  'downtown':         { label: 'Downtown Dubai',     yield: 0.058, app: 0.068, sqft: 2700 },
  'palm-jumeirah':    { label: 'Palm Jumeirah',      yield: 0.052, app: 0.082, sqft: 3800 },
  'business-bay':     { label: 'Business Bay',       yield: 0.068, app: 0.075, sqft: 1900 },
  'jvc':              { label: 'JVC',                yield: 0.082, app: 0.085, sqft: 1100 },
  'dubai-hills':      { label: 'Dubai Hills Estate', yield: 0.064, app: 0.078, sqft: 2100 },
  'damac-lagoons':    { label: 'Damac Lagoons',      yield: 0.075, app: 0.092, sqft: 1700 },
  'emaar-beachfront': { label: 'Emaar Beachfront',   yield: 0.061, app: 0.095, sqft: 3200 },
  'sobha-hartland':   { label: 'Sobha Hartland',     yield: 0.069, app: 0.080, sqft: 2000 },
  'arabian-ranches':  { label: 'Arabian Ranches',    yield: 0.058, app: 0.062, sqft: 1600 },
};

export function communitySlug(name: string): string {
  return String(name || 'dubai-marina').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
export function lookupCommunity(slug: string): CommunityData {
  return COMMUNITY_DATA[slug] || COMMUNITY_DATA['dubai-marina'];
}

export const PCT = (n: number) => (Number(n) * 100).toFixed(1) + '%';
export const AED = (n: number) => 'AED ' + Math.round(Number(n) || 0).toLocaleString('en-US');
export const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export type FitContext = {
  propertyType: string; beds: number; sqft: number; price: number;
  chargesPerSqft: number; estCharges: number; estRent: number; isRental: boolean;
  communityLabel: string; communitySlug: string;
};

export type FitResult = {
  thesis: string;
  yieldScore: number; compScore: number; thesisScore: number; riskScore: number;
  total: number; verdict: 'BUY' | 'WATCH' | 'SKIP';
  sqftPrice: number; sqftRatio: number; netYield: number; estRent: number; chargesAnnual: number;
};

export function computePropertyFit(ctx: FitContext, cd: CommunityData, thesis: 'yield' | 'appreciation' | 'balanced' = 'balanced'): FitResult {
  const beds = Math.max(0, ctx.beds);
  const area = Math.max(200, ctx.sqft);
  const price = Math.max(1, ctx.price);
  const chargesPerSqft = ctx.chargesPerSqft;

  const sqftPrice = price / area;
  const chargesAnnual = chargesPerSqft * area;
  const estRent = price * cd.yield * (beds <= 1 ? 1.05 : (beds >= 4 ? 0.94 : 1.0));
  const netYield = (estRent - chargesAnnual) / price;

  const yieldScore = clamp(((netYield / cd.yield) * 80) + 20, 0, 100);
  const sqftRatio = sqftPrice / cd.sqft;
  const compScore = clamp(70 - (sqftRatio - 1) * 100, 0, 100);

  let thesisScore: number;
  if (thesis === 'yield')             thesisScore = clamp((netYield / 0.07) * 90, 0, 100);
  else if (thesis === 'appreciation') thesisScore = clamp((cd.app / 0.10) * 95, 0, 100);
  else                                thesisScore = clamp(75 + (cd.app - 0.07) * 100, 40, 100);

  let riskScore = 70;
  if (chargesPerSqft > 22) riskScore -= 20;
  if (chargesPerSqft < 14) riskScore += 10;
  if (sqftRatio > 1.15) riskScore -= 15;
  if (sqftRatio < 0.92) riskScore += 8;
  riskScore = clamp(riskScore, 0, 100);

  const weights = (thesis === 'yield' ? [0.40, 0.20, 0.30, 0.10]
    : thesis === 'appreciation' ? [0.20, 0.30, 0.30, 0.20]
    : [0.25, 0.25, 0.25, 0.25]);
  const total = yieldScore * weights[0] + compScore * weights[1] + thesisScore * weights[2] + riskScore * weights[3];
  const verdict: 'BUY' | 'WATCH' | 'SKIP' = total >= 75 ? 'BUY' : total >= 55 ? 'WATCH' : 'SKIP';

  return { thesis, yieldScore, compScore, thesisScore, riskScore, total, verdict, sqftPrice, sqftRatio, netYield, estRent, chargesAnnual };
}

export type ExitScenario = { name: string; years: number; finalValue: number; irr: number; totalReturn: number };
export type ExitResult = { scenarios: ExitScenario[]; best: ExitScenario; targetIrr: number; netAnnual: number; valueAt: (y: number) => number };

export function computeExitStrategy(ctx: FitContext, cd: CommunityData): ExitResult {
  const price = Math.max(1, ctx.price);
  const hold = 5;
  const targetIrr = 0.11;
  const netAnnual = ctx.estRent - ctx.estCharges;

  const valueAt = (y: number) => price * Math.pow(1 + cd.app, y);
  const cumulativeNet = (y: number) => netAnnual * y;
  const irrFor = (years: number, finalValue: number, rentSum: number) => {
    const totalReturn = (finalValue - price) + rentSum;
    return Math.pow((totalReturn + price) / price, 1 / years) - 1;
  };

  const flip: ExitScenario = { name: 'Flip at Y1', years: 1, finalValue: valueAt(1), irr: 0, totalReturn: 0 };
  flip.irr = irrFor(1, flip.finalValue, cumulativeNet(1));
  flip.totalReturn = (flip.finalValue - price) + cumulativeNet(1);

  const refiYears = 3;
  const refiUplift = (valueAt(refiYears) * 0.70) * 0.07 * (hold - refiYears);
  const refi: ExitScenario = { name: 'Refinance Y3', years: refiYears, finalValue: valueAt(refiYears), irr: 0, totalReturn: 0 };
  refi.totalReturn = (refi.finalValue - price) + cumulativeNet(refiYears) + refiUplift;
  refi.irr = Math.pow((refi.totalReturn + price) / price, 1 / hold) - 1;

  const holdS: ExitScenario = { name: `Hold to Y${hold}`, years: hold, finalValue: valueAt(hold), irr: 0, totalReturn: 0 };
  holdS.irr = irrFor(hold, holdS.finalValue, cumulativeNet(hold));
  holdS.totalReturn = (holdS.finalValue - price) + cumulativeNet(hold);

  const scenarios = [flip, refi, holdS].sort((a, b) => b.irr - a.irr);
  return { scenarios, best: scenarios[0], targetIrr, netAnnual, valueAt };
}

export function verdictKind(v: 'BUY' | 'WATCH' | 'SKIP'): 'good' | 'warn' | 'bad' {
  return v === 'BUY' ? 'good' : v === 'WATCH' ? 'warn' : 'bad';
}
