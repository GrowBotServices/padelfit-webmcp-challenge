import React from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfUsePage() {
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
        <h1 className="text-3xl font-black text-blue-950 mb-2">Terms of Use</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: 5 August 2026</p>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-blue-950 mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing <strong>padelfit.coach</strong>, you agree to be bound by these Terms of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-950 mb-3">2. Use Licence</h2>
            <p>
              Permission is granted to temporarily view the materials on Padel Fit's website for personal, non-commercial transitory viewing only. This is the grant of a licence, not a transfer of title, and under this licence you may not: modify or copy the materials; use the materials for any commercial purpose; attempt to decompile or reverse engineer any software contained on the website; remove any copyright or other proprietary notations from the materials; or transfer the materials to another person or "mirror" the materials on any other server.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-950 mb-3">3. Disclaimer</h2>
            <p>
              The materials on Padel Fit's website are provided on an "as is" basis. Padel Fit makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p>
              Padel Fit does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website. Always consult a qualified medical professional before starting any strenuous exercise programme if you have pre-existing joint or heart conditions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-950 mb-3">4. Affiliate Links</h2>
            <p>
              This site contains affiliate links. When you click on a link and make a purchase, we may earn a commission at no additional cost to you. See our{' '}
              <Link href="/affiliate-disclosure" className="text-blue-600 hover:underline font-semibold">
                Affiliate Disclosure
              </Link>{' '}
              for full details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-950 mb-3">5. Limitations</h2>
            <p>
              In no event shall Padel Fit or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Padel Fit's website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-950 mb-3">6. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of England and Wales, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-950 mb-3">7. Contact Us</h2>
            <p>
              Questions regarding these terms: <a href="mailto:support@padelfit.coach" className="text-blue-600 hover:underline font-semibold">support@padelfit.coach</a>.
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

