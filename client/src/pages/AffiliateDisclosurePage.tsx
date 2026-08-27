import React from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function AffiliateDisclosurePage() {
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <header className="bg-white border-b border-slate-100 py-4 px-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Padel Fit
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12">
        <h1 className="text-3xl font-black text-blue-950 mb-2">Affiliate Disclosure</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: 5 August 2026</p>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-blue-950 mb-3">How Our Affiliate Relationships Work</h2>
            <p>
              Padel Fit (<strong>padelfit.coach</strong>) is a professional review and gear recommendation platform. To support our deep biomechanical research and clinical play-testing, we partner with major racket-sport retailers via the <strong>Amazon Services LLC Associates Program</strong> and, in future, the <strong>Awin Affiliate Network</strong>.
            </p>
            <p>
              This means that when you click on certain links on our website — such as "Check price on Amazon" — and make a purchase, we may receive a small referral commission from the retailer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-950 mb-3">Amazon Associates Programme</h2>
            <p className="font-semibold text-blue-900 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
              As an Amazon Associate, Padel Fit earns from qualifying purchases.
            </p>
            <p>
              Padel Fit is a participant in the Amazon Services LLC Associates Programme, an affiliate advertising programme designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.co.uk.
            </p>
            <p>
              Our Amazon tracking ID is <strong>padelfitcoach-21</strong>. This tag appears in all Amazon links on this site so that qualifying purchases are correctly attributed to us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-950 mb-3">Does This Cost You Anything Extra?</h2>
            <p className="font-bold text-slate-800">No, absolutely not.</p>
            <p>
              The pricing and promotional deals you see are exactly the same as if you visited the retailer directly. We never inflate prices to cover our commission — the retailer pays us from their own margin.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-950 mb-3">Our Commitment to Editorial Integrity</h2>
            <p>
              We never accept payment or free gear in exchange for positive reviews. Every shoe, racket, and apparel recommendation is determined purely by our technical algorithms and clinical criteria — including age-appropriate cushioning, joint stability, and elbow safety. We only recommend gear we genuinely believe will improve your padel and protect your body.
            </p>
            <p>
              Affiliate relationships do not influence our editorial rankings. A product with no affiliate link will still appear in our results if it is the best fit for your profile.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-950 mb-3">UK ASA Compliance</h2>
            <p>
              In accordance with UK Advertising Standards Authority (ASA) guidelines, all affiliate links on this site are clearly labelled. The "AD DISCLOSURE" banner at the top of every page, and the disclosure notice beside every product CTA, serve as the required notification that we may earn a commission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-950 mb-3">Contact Us</h2>
            <p>
              If you have any questions about our affiliate relationships, please contact us at{' '}
              <a href="mailto:support@padelfit.coach" className="text-blue-600 hover:underline font-semibold">
                support@padelfit.coach
              </a>.
            </p>
          </section>
        </div>
      </main>

      <footer className="bg-blue-950 text-slate-400 py-6 px-4 text-center text-xs">
        <p>© {new Date().getFullYear()} Padel Fit · <a href="mailto:support@padelfit.coach" className="hover:text-white">support@padelfit.coach</a></p>
      </footer>
    </div>
  );
}
