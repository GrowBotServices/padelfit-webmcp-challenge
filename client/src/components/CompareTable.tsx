import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Star, Scale, HelpCircle, ExternalLink } from 'lucide-react';
import { Product, offersForProduct } from '@/const';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';

interface CompareTableProps {
  comparedProducts: Product[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export default function CompareTable({ comparedProducts, onRemove, onClear }: CompareTableProps) {
  if (comparedProducts.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed rounded-xl bg-card text-card-foreground p-6 max-w-xl mx-auto">
        <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <h3 className="text-lg font-bold text-foreground">No items selected for comparison</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
          Add up to 3 products from the reviews section below to compare their technical specifications side-by-side.
        </p>
      </div>
    );
  }

  // Get the primary renderable offer via the single source of truth
  const getPrimaryOffer = (productId: string) => {
    const offers = offersForProduct(productId);
    return offers[0] ?? null;
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-extrabold text-foreground flex items-center gap-2">
          <Scale className="w-5 h-5 text-blue-600" />
          Side-by-Side Comparison ({comparedProducts.length} selected)
        </h3>
        <Button variant="outline" size="sm" onClick={onClear} className="text-xs font-mono">
          Clear All
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card text-card-foreground shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[180px] font-mono text-xs uppercase tracking-wider">Technical Spec</TableHead>
                {comparedProducts.map((product) => (
                  <TableHead key={product.id} className="min-w-[200px] relative pr-10">
                    <div className="font-extrabold text-foreground text-sm">{product.name}</div>
                    <div className="text-xs font-mono text-blue-600 dark:text-blue-400">{product.brand}</div>
                    <button 
                      onClick={() => onRemove(product.id)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-destructive transition-colors"
                      title="Remove from comparison"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* Category */}
              <TableRow>
                <TableCell className="font-mono text-xs font-bold">Category</TableCell>
                {comparedProducts.map((product) => (
                  <TableCell key={product.id}>
                    <Badge className="capitalize font-mono text-[10px] bg-blue-50 text-blue-700 border-none">
                      {product.category}
                    </Badge>
                  </TableCell>
                ))}
              </TableRow>

              {/* Rating */}
              <TableRow>
                <TableCell className="font-mono text-xs font-bold">Expert Rating</TableCell>
                {comparedProducts.map((product) => (
                  <TableCell key={product.id}>
                    <div className="flex items-center gap-1 font-bold text-sm">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>{product.rating.toFixed(1)}</span>
                    </div>
                  </TableCell>
                ))}
              </TableRow>

              {/* Unique Key Specifications based on Category */}
              <TableRow>
                <TableCell className="font-mono text-xs font-bold">Primary Attributes</TableCell>
                {comparedProducts.map((product) => (
                  <TableCell key={product.id} className="text-sm">
                    {product.category === 'shoe' && (
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-slate-400">Support:</span>
                          <span className="font-bold text-slate-700 capitalize">{product.support}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-slate-400">Cushioning:</span>
                          <span className="font-bold text-slate-700 capitalize">{product.cushioning}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Width:</span>
                          <span className="font-bold text-slate-700 capitalize">{product.fitWidth}</span>
                        </div>
                      </div>
                    )}
                    {product.category === 'racket' && (
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-slate-400">Shape:</span>
                          <span className="font-bold text-slate-700 capitalize">{product.shape}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-slate-400">Balance:</span>
                          <span className="font-bold text-slate-700 capitalize">{product.balance}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Core Feel:</span>
                          <span className="font-bold text-slate-700 capitalize">{product.coreFeel}</span>
                        </div>
                      </div>
                    )}
                    {product.category === 'clothing' && (
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-slate-400">Fit Cut:</span>
                          <span className="font-bold text-slate-700 capitalize">{product.fit}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-slate-400">Climate:</span>
                          <span className="font-bold text-slate-700 capitalize">{product.climate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Gender:</span>
                          <span className="font-bold text-slate-700 capitalize">{product.gender}</span>
                        </div>
                      </div>
                    )}
                  </TableCell>
                ))}
              </TableRow>

              {/* Tags */}
              <TableRow>
                <TableCell className="font-mono text-xs font-bold">Key Features</TableCell>
                {comparedProducts.map((product) => (
                  <TableCell key={product.id}>
                    <div className="flex flex-wrap gap-1">
                      {product.tags.map(tag => (
                        <span key={tag} className="bg-muted text-[10px] px-2 py-0.5 rounded font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                ))}
              </TableRow>

              {/* Buy CTA row */}
              <TableRow className="bg-muted/30">
                <TableCell className="font-mono text-xs font-bold text-blue-900">Buy</TableCell>
                {comparedProducts.map((product) => {
                  const offer = getPrimaryOffer(product.id);
                  const hasAmazonOffer = offer && offer.merchantName === 'Amazon UK';
                  const hasPadelBoostOffer = offer && offer.merchantName === 'Padel Boost';
                  return (
                    <TableCell key={product.id} className="align-middle">
                      {hasAmazonOffer ? (
                        <div className="flex flex-col gap-2">
                          <AffiliateDisclosure variant="amazon" />
                          <a href={offer.trackingUrl} target="_blank" rel="noopener noreferrer sponsored">
                            <Button size="sm" className="h-8 px-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-mono text-[11px] font-bold flex items-center gap-1">
                              <ExternalLink className="w-3.5 h-3.5" />
                              Check price on Amazon
                            </Button>
                          </a>
                        </div>
                      ) : hasPadelBoostOffer ? (
                        <div className="flex flex-col gap-2">
                          <AffiliateDisclosure variant="affiliate" />
                          <a href={offer.trackingUrl} target="_blank" rel="sponsored noopener noreferrer">
                            <Button size="sm" className="h-8 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-[11px] font-bold flex items-center gap-1">
                              <ExternalLink className="w-3.5 h-3.5" />
                              Check price at Padel Boost
                            </Button>
                          </a>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground italic">Currently unavailable</span>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
