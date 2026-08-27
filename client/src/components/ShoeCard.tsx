import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink } from 'lucide-react';
import { Product, offersForProduct } from '@/const';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';

interface ShoeCardProps {
  product: Product;
  onCompareToggle?: (id: string) => void;
  isCompared?: boolean;
}

export default function ShoeCard({ product, onCompareToggle, isCompared = false }: ShoeCardProps) {
  // Get the primary renderable offer for this product via the single source of truth
  const offers = offersForProduct(product.id);
  const primaryOffer = offers[0];
  const hasAmazonOffer = primaryOffer && primaryOffer.merchantName === 'Amazon UK';
  const hasPadelBoostOffer = primaryOffer && primaryOffer.merchantName === 'Padel Boost';

  return (
    <Card className="flex flex-col h-full overflow-hidden border border-slate-100 hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="p-0 relative bg-slate-50">
        <div className="h-56 w-full flex items-center justify-center p-6 overflow-hidden relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <Badge className="bg-blue-900 text-white font-mono text-[10px] font-bold border-none capitalize px-2 py-0.5">
              {product.category}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-2 mb-1.5">
            <div>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider font-mono">
                {product.brand}
              </span>
              <CardTitle className="text-base font-bold text-blue-950 mt-0.5 group-hover:text-blue-600 transition-colors">
                {product.name}
              </CardTitle>
            </div>
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded text-amber-700 border border-amber-100 shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
              <span className="text-xs font-bold font-mono">{product.rating.toFixed(1)}</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed mb-4">
            {product.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {product.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[10px] bg-slate-100 text-slate-700 hover:bg-slate-100 border-none font-mono">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Amazon Purchase Section */}
        <div className="border-t pt-4 space-y-3">
          {hasAmazonOffer ? (
            <>
              {/* Disclosure must appear beside/above every Amazon CTA */}
              <AffiliateDisclosure variant="amazon" />
              <a
                href={primaryOffer.trackingUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="block"
              >
                <Button
                  size="sm"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold flex items-center justify-center gap-1.5 shadow-sm shadow-amber-500/10 h-9"
                >
                  <ExternalLink className="w-4 h-4" />
                  Check price on Amazon
                </Button>
              </a>
            </>
          ) : hasPadelBoostOffer ? (
            <>
              {/* Neutral affiliate disclosure — not Amazon-specific */}
              <AffiliateDisclosure variant="affiliate" />
              <a
                href={primaryOffer.trackingUrl}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="block"
              >
                <Button
                  size="sm"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-600/10 h-9"
                >
                  <ExternalLink className="w-4 h-4" />
                  Check price at Padel Boost
                </Button>
              </a>
            </>
          ) : (
            <p className="text-xs text-muted-foreground italic">Currently unavailable — check back soon.</p>
          )}
        </div>
      </CardContent>

      {onCompareToggle && (
        <CardFooter className="p-5 pt-0 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCompareToggle(product.id)}
            className={`w-full font-mono text-xs ${
              isCompared
                ? 'bg-blue-600 text-white hover:bg-blue-700 border-blue-600'
                : 'hover:bg-slate-50'
            }`}
          >
            {isCompared ? 'Added to Compare' : 'Add to Compare'}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
