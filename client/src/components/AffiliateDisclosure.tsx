import React from 'react';

interface AffiliateDisclosureProps {
  /**
   * "amazon"  — shows the contractually required Amazon Associates sentence
   *             plus the general earnings disclosure.
   * "inline"  — compact one-liner for tight spaces (still visible, not a tooltip).
   * "affiliate" — neutral disclosure for non-Amazon affiliate merchants (e.g. Padel Boost).
   */
  variant?: 'amazon' | 'inline' | 'affiliate';
  className?: string;
}

/**
 * AffiliateDisclosure
 *
 * MUST be rendered visibly beside or above every product CTA.
 * Never hide behind a tooltip or behind a tap.
 *
 * UK ASA + Amazon Operating Agreement requirements:
 *  - The exact sentence "As an Amazon Associate, Padel Fit earns from
 *    qualifying purchases." MUST appear on every page containing an
 *    Amazon affiliate link (variant="amazon").
 */
export default function AffiliateDisclosure({
  variant = 'amazon',
  className = '',
}: AffiliateDisclosureProps) {
  if (variant === 'inline') {
    return (
      <p
        className={`text-[10px] text-slate-400 leading-snug ${className}`}
        aria-label="Affiliate disclosure"
      >
        <span className="font-semibold text-slate-500">Ad disclosure:</span>{' '}
        We may earn a commission on purchases made through our links, at no extra cost to you.
      </p>
    );
  }

  if (variant === 'affiliate') {
    return (
      <p
        className={`text-[10px] text-slate-500 leading-snug ${className}`}
        aria-label="Affiliate disclosure"
      >
        <span className="font-semibold">Affiliate link</span> — Padel Fit may earn a commission at no extra cost to you.
      </p>
    );
  }

  // variant === 'amazon'
  return (
    <div
      className={`rounded-md bg-amber-50 border border-amber-100 px-3 py-2 space-y-0.5 ${className}`}
      aria-label="Amazon affiliate disclosure"
    >
      <p className="text-[10px] font-semibold text-amber-800 leading-snug">
        As an Amazon Associate, Padel Fit earns from qualifying purchases.
      </p>
      <p className="text-[10px] text-amber-700 leading-snug">
        Clicking "Check price on Amazon" takes you to Amazon at no extra cost to you.
      </p>
    </div>
  );
}
