/**
 * GuideProductCard
 *
 * Inline product card for use inside guide articles.
 * Sources its CTA via offersForProduct() — same logic as ShoeCard and ShoeQuiz.
 * No price, no stock claim, disclosure always adjacent.
 */
import React from 'react';
import { ExternalLink, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PRODUCTS, offersForProduct } from '@/const';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';

interface GuideProductCardProps {
  productId: string;
}

export default function GuideProductCard({ productId }: GuideProductCardProps) {
  const product = PRODUCTS.find((p) => p.id === productId);

  if (!product) {
    // Should never happen in production — flag clearly in dev
    return (
      <div className="my-6 p-4 border border-red-200 bg-red-50 rounded-lg text-red-700 text-sm font-mono">
        ⚠ Unknown productId: "{productId}" — no product found in PRODUCTS
      </div>
    );
  }

  const offers = offersForProduct(product.id);
  const primaryOffer = offers[0];
  const hasAmazonOffer = !!primaryOffer && primaryOffer.merchantName === 'Amazon UK';

  return (
    <div className="my-6 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col sm:flex-row">
      {/* Product image */}
      <div className="sm:w-40 shrink-0 bg-slate-50 flex items-center justify-center p-4 border-b sm:border-b-0 sm:border-r border-slate-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-contain h-28 w-28 sm:h-32 sm:w-32"
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col justify-between gap-3">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider font-mono">
                {product.brand}
              </span>
              <h3 className="text-sm font-bold text-blue-950 mt-0.5">{product.name}</h3>
            </div>
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded text-amber-700 border border-amber-100 shrink-0">
              <Star className="w-3 h-3 fill-amber-500 stroke-amber-500" />
              <span className="text-xs font-bold font-mono">{product.rating.toFixed(1)}</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">{product.description}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {product.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[10px] bg-slate-100 text-slate-600 border-none font-mono">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-2">
          <AffiliateDisclosure variant="amazon" />
          {hasAmazonOffer ? (
            <a
              href={primaryOffer.trackingUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="block"
            >
              <Button
                size="sm"
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold flex items-center justify-center gap-1.5 shadow-sm h-9"
              >
                <ExternalLink className="w-4 h-4" />
                Check price on Amazon
              </Button>
            </a>
          ) : (
            <p className="text-xs text-slate-400 italic">Currently unavailable — check back soon.</p>
          )}
        </div>
      </div>
    </div>
  );
}

