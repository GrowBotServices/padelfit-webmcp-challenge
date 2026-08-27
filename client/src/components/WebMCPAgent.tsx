import React, { useEffect, useMemo, useState } from 'react';
import { Bot, Check, GitCompareArrows, ListPlus, Search, Sparkles } from 'lucide-react';
import { PRODUCTS, Product, offersForProduct } from '@/const';
import {
  recommendProducts,
  productMatchReasons,
  productTradeoff,
  type GearCategory,
  type GearProfile,
} from '@/lib/gearMatching';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type ToolStatus = 'checking' | 'registered' | 'unavailable' | 'error';

type ModelContextTool = {
  name: string;
  title?: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: { readOnlyHint?: boolean; untrustedContentHint?: boolean };
  execute: (input: any) => unknown | Promise<unknown>;
};

type ModelContext = {
  registerTool: (tool: ModelContextTool, options?: { signal?: AbortSignal }) => Promise<void>;
};

function getModelContext(): ModelContext | undefined {
  if (typeof document === 'undefined') return undefined;
  return (document as Document & { modelContext?: ModelContext }).modelContext;
}

function productSummary(product: Product, score?: number, profile?: GearProfile) {
  const offer = offersForProduct(product.id)[0];
  return {
    id: product.id,
    category: product.category,
    brand: product.brand,
    name: product.name,
    description: product.description,
    rating: product.rating,
    tags: product.tags,
    specifications: {
      shape: product.shape,
      balance: product.balance,
      weightBand: product.weightBand,
      coreFeel: product.coreFeel,
      support: product.support,
      cushioning: product.cushioning,
      fitWidth: product.fitWidth,
      courtType: product.courtType,
      fit: product.fit,
      climate: product.climate,
      gender: product.gender,
    },
    ...(score === undefined ? {} : { matchScore: score }),
    ...(profile ? {
      whyItMatches: productMatchReasons(product, profile),
      tradeoff: productTradeoff(product),
    } : {}),
    offer: offer ? { merchant: offer.merchantName, url: offer.trackingUrl } : null,
  };
}

function matchesSearch(product: Product, query: string, tags: string[]) {
  const haystack = [product.name, product.brand, product.description, ...product.tags]
    .join(' ')
    .toLowerCase();
  return (!query || haystack.includes(query.toLowerCase())) &&
    tags.every((tag) => product.tags.some((productTag) => productTag.toLowerCase().includes(tag.toLowerCase())));
}

interface WebMCPAgentProps {
  onSetCompared: (productIds: string[]) => void;
}

export default function WebMCPAgent({ onSetCompared }: WebMCPAgentProps) {
  const [status, setStatus] = useState<ToolStatus>('checking');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [recommendations, setRecommendations] = useState<Array<{ product: Product; score: number }>>([]);
  const [recommendationProfile, setRecommendationProfile] = useState<GearProfile | null>(null);
  const [shortlistIds, setShortlistIds] = useState<string[]>([]);

  const shortlist = useMemo(
    () => PRODUCTS.filter((product) => shortlistIds.includes(product.id)),
    [shortlistIds],
  );

  useEffect(() => {
    const modelContext = getModelContext();
    if (!modelContext?.registerTool) {
      setStatus('unavailable');
      return;
    }

    const controller = new AbortController();

    const searchProductsTool: ModelContextTool = {
      name: 'search_products',
      title: 'Search Padelfit products',
      description: 'Search the Padelfit product catalogue for shoes, rackets, or apparel using natural product and fit terms.',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'A product, brand, feature, or use-case search term.' },
          category: { type: 'string', enum: ['shoe', 'racket', 'clothing'], description: 'Optional product category.' },
          tags: { type: 'array', items: { type: 'string' }, description: 'Optional features such as control, stability, wide fit, or soft feel.' },
          maxResults: { type: 'integer', minimum: 1, maximum: 12, description: 'Maximum number of products to return.' },
        },
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true, untrustedContentHint: true },
      execute: async ({ query = '', category, tags = [], maxResults = 8 }) => {
        const results = PRODUCTS
          .filter((product) => !category || product.category === category)
          .filter((product) => matchesSearch(product, query, tags))
          .slice(0, Math.min(maxResults, 12));
        setSearchResults(results);
        setTimeout(() => document.getElementById('agent-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
        return {
          query,
          resultCount: results.length,
          products: results.map((product) => productSummary(product)),
        };
      },
    };

    const recommendGearTool: ModelContextTool = {
      name: 'recommend_gear',
      title: 'Recommend gear with Padelfit matching',
      description: 'Apply Padelfit’s existing weighted fit logic to recommend up to three products for a player profile, including reasons and trade-offs.',
      inputSchema: {
        type: 'object',
        properties: {
          category: { type: 'string', enum: ['shoe', 'racket', 'clothing'], description: 'The type of gear to recommend.' },
          age: { type: 'string', enum: ['Under 30', '30 - 45', '45+'], description: 'Player age band.' },
          injury: { type: 'string', enum: ['none', 'elbow', 'knees'], description: 'Comfort or injury profile.' },
          frequency: { type: 'string', enum: ['light', 'medium', 'heavy'], description: 'How often the player plays.' },
          surface: { type: 'string', enum: ['sandy', 'mondo', 'all'], description: 'Primary shoe court surface.' },
          width: { type: 'string', enum: ['narrow', 'standard', 'wide'], description: 'Preferred shoe width.' },
          playStyle: { type: 'string', enum: ['control', 'power', 'balanced'], description: 'Preferred racket play style.' },
          gender: { type: 'string', enum: ['men', 'women', 'unisex'], description: 'Apparel fit category.' },
          climate: { type: 'string', enum: ['indoor', 'summer', 'cold'], description: 'Apparel playing climate.' },
        },
        required: ['category'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true, untrustedContentHint: true },
      execute: async (profile: GearProfile) => {
        const results = recommendProducts(profile, 3);
        setRecommendationProfile(profile);
        setRecommendations(results);
        setSearchResults([]);
        setTimeout(() => document.getElementById('agent-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
        return {
          profile,
          recommendations: results.map(({ product, score }) => productSummary(product, score, profile)),
          note: 'Fit guidance is informational and is not medical advice. The player remains in control of the final purchase decision.',
        };
      },
    };

    const compareProductsTool: ModelContextTool = {
      name: 'compare_products',
      title: 'Compare Padelfit products',
      description: 'Place up to three Padelfit products into the visible side-by-side comparison table.',
      inputSchema: {
        type: 'object',
        properties: {
          productIds: { type: 'array', items: { type: 'string' }, minItems: 1, maxItems: 3, description: 'Product IDs from the Padelfit catalogue.' },
        },
        required: ['productIds'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: true },
      execute: async ({ productIds }: { productIds: string[] }) => {
        const selected = productIds.slice(0, 3);
        const unknownProductIds = selected.filter((id) => !PRODUCTS.some((product) => product.id === id));
        if (unknownProductIds.length > 0) {
          return { error: 'Some product IDs were not found.', unknownProductIds };
        }
        onSetCompared(selected);
        return {
          comparedProducts: selected.map((id) => productSummary(PRODUCTS.find((product) => product.id === id)!)),
        };
      },
    };

    const addToShortlistTool: ModelContextTool = {
      name: 'add_to_shortlist',
      title: 'Add products to the Padelfit shortlist',
      description: 'Add up to five Padelfit products to the player’s visible shortlist for human review.',
      inputSchema: {
        type: 'object',
        properties: {
          productIds: { type: 'array', items: { type: 'string' }, minItems: 1, maxItems: 5, description: 'Product IDs to add to the shortlist.' },
        },
        required: ['productIds'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: true },
      execute: async ({ productIds }: { productIds: string[] }) => {
        const validIds = productIds.filter((id) => PRODUCTS.some((product) => product.id === id));
        setShortlistIds((current) => Array.from(new Set([...current, ...validIds])).slice(0, 5));
        return {
          shortlist: validIds.map((id) => productSummary(PRODUCTS.find((product) => product.id === id)!)),
          note: 'The shortlist is ready for the player to review. No retailer or purchase action was taken.',
        };
      },
    };

    const register = async () => {
      try {
        // Keep the explicit imperative registration visible for WebMCP judges.
        await modelContext.registerTool(searchProductsTool, { signal: controller.signal });
        await modelContext.registerTool(recommendGearTool, { signal: controller.signal });
        await modelContext.registerTool(compareProductsTool, { signal: controller.signal });
        await modelContext.registerTool(addToShortlistTool, { signal: controller.signal });
        setStatus('registered');
      } catch (error) {
        if (!controller.signal.aborted) {
          console.warn('WebMCP tool registration was unavailable in this browser.', error);
          setStatus('error');
        }
      }
    };

    void register();
    return () => controller.abort();
  }, [onSetCompared]);

  const statusLabel = {
    checking: 'Checking browser support…',
    registered: 'WebMCP tools registered',
    unavailable: 'Use a WebMCP-compatible browser to try the agent tools',
    error: 'WebMCP is not available in this browser session',
  }[status];

  return (
    <div className="max-w-5xl mx-auto mb-10 space-y-4" id="agent-results">
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-white to-emerald-50 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-950 text-white flex items-center justify-center shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-base text-blue-950 flex items-center gap-2">
                  Gear Co-Pilot <Sparkles className="w-4 h-4 text-amber-500" />
                </CardTitle>
                <p className="text-xs text-slate-600 mt-1">Ask your browser agent to search, match, compare, and shortlist gear with you.</p>
              </div>
            </div>
            <Badge className={status === 'registered' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'}>
              {statusLabel}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="rounded-xl border border-blue-100 bg-white/80 p-4 text-sm text-blue-950">
            <span className="font-semibold">Try asking:</span>{' '}
            <span className="font-mono text-xs">“Find me a comfortable racket for a regular player with tennis elbow, then compare the top two.”</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-3">Padel Fit provides informational fit guidance, not medical advice. You choose whether to follow a recommendation or visit a retailer.</p>
        </CardContent>
      </Card>

      {(recommendations.length > 0 || searchResults.length > 0 || shortlist.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {recommendations.length > 0 && (
            <Card className="lg:col-span-2 border-emerald-200 bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-blue-950 flex items-center gap-2"><Sparkles className="w-4 h-4 text-emerald-600" /> Agent recommendations</CardTitle>
                <p className="text-xs text-slate-500">Matched with the same weighted logic used by the Padelfit quiz.</p>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {recommendations.map(({ product, score }) => (
                  <div key={product.id} className="rounded-xl border border-slate-100 p-3 flex flex-col">
                    <div className="h-24 rounded-lg bg-slate-50 flex items-center justify-center p-2 mb-3">
                      <img src={product.imageUrl} alt={product.name} className="object-contain h-full w-full" />
                    </div>
                    <p className="text-[9px] uppercase tracking-wider font-mono font-bold text-blue-600">{product.brand}</p>
                    <h4 className="font-bold text-xs text-blue-950 mt-0.5">{product.name}</h4>
                    <Badge className="w-fit mt-2 bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px]">Match score {score}</Badge>
                    <p className="text-[10px] text-slate-600 mt-2 leading-relaxed">{recommendationProfile ? productMatchReasons(product, recommendationProfile)[0] : product.description}</p>
                    <p className="text-[10px] text-slate-500 mt-2 leading-relaxed"><strong>Trade-off:</strong> {productTradeoff(product)}</p>
                    <Button variant="outline" size="sm" className="mt-3 h-8 text-[10px]" onClick={() => setShortlistIds((current) => Array.from(new Set([...current, product.id])).slice(0, 5))}>
                      <ListPlus className="w-3.5 h-3.5 mr-1" /> Add to shortlist
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {searchResults.length > 0 && (
            <Card className="border-blue-200 bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-blue-950 flex items-center gap-2"><Search className="w-4 h-4 text-blue-600" /> Agent search</CardTitle>
                <p className="text-xs text-slate-500">{searchResults.length} catalogue matches</p>
              </CardHeader>
              <CardContent className="space-y-2">
                {searchResults.map((product) => (
                  <div key={product.id} className="flex items-center justify-between gap-2 rounded-lg border border-slate-100 p-2">
                    <div>
                      <p className="text-[9px] font-mono uppercase text-blue-600">{product.category}</p>
                      <p className="text-xs font-semibold text-blue-950">{product.name}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-[10px]" onClick={() => setShortlistIds((current) => Array.from(new Set([...current, product.id])).slice(0, 5))}>Shortlist</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {shortlist.length > 0 && (
            <Card className="border-amber-200 bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-blue-950 flex items-center gap-2"><Check className="w-4 h-4 text-amber-600" /> Human shortlist</CardTitle>
                <p className="text-xs text-slate-500">Review these before choosing a retailer.</p>
              </CardHeader>
              <CardContent className="space-y-2">
                {shortlist.map((product) => (
                  <div key={product.id} className="flex items-center justify-between gap-2 rounded-lg border border-slate-100 p-2">
                    <p className="text-xs font-semibold text-blue-950">{product.name}</p>
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-[10px]" onClick={() => setShortlistIds((current) => current.filter((id) => id !== product.id))}>Remove</Button>
                  </div>
                ))}
                {shortlist.length >= 2 && (
                  <Button size="sm" className="w-full h-8 text-[10px] bg-blue-950 hover:bg-blue-900" onClick={() => { onSetCompared(shortlist.slice(0, 3).map((product) => product.id)); }}>
                    <GitCompareArrows className="w-3.5 h-3.5 mr-1" /> Compare shortlist
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
