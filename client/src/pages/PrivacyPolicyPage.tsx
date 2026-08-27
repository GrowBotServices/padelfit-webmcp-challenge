import React from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
        <h1 className="text-3xl font-black text-blue-950 mb-2">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: 5 August 2026</p>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-blue-950 mb-3">1. Introduction</h2>
            <p>
              Welcome to Padel Fit (<strong>padelfit.coach</strong>). We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we look after your personal data when you visit our website and informs you of your privacy rights under UK GDPR.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-950 mb-3">2. Data We Collect</h2>
            <p>
              We do not require users to create accounts. We may collect anonymous usage statistics via analytical tools (such as page views, duration on site, and quiz selections) to improve our recommendation engine. If you contact us via <a href="mailto:support@padelfit.coach" className="text-blue-600 hover:underline">support@padelfit.coach</a>, we will retain your email address and message history solely to resolve your query.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-950 mb-3">3. Cookies and Tracking</h2>
            <p>
              We use cookies to remember your quiz selections and comparison matrix items. Third-party affiliate networks (Amazon) may also set tracking cookies when you click on referral links to credit commissions correctly. Amazon's privacy policy governs data collected through their tracking cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-950 mb-3">4. How We Use Your Data</h2>
            <p>
              Any personal data we collect is used solely to respond to your enquiry or to improve the service. We do not sell, rent, or share your personal data with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-950 mb-3">5. Your Rights</h2>
            <p>
              Under UK GDPR, you have the right to access, rectify, or erase personal data we hold about you. To exercise these rights, contact us at <a href="mailto:support@padelfit.coach" className="text-blue-600 hover:underline font-semibold">support@padelfit.coach</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-950 mb-3">6. Contact</h2>
            <p>
              Questions about this policy: <a href="mailto:support@padelfit.coach" className="text-blue-600 hover:underline font-semibold">support@padelfit.coach</a>.
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
