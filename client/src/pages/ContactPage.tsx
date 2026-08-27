import React from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Mail } from 'lucide-react';

export default function ContactPage() {
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
        <h1 className="text-3xl font-black text-blue-950 mb-2">Contact Us</h1>
        <p className="text-sm text-slate-500 mb-8">We aim to respond within two business days.</p>

        <div className="space-y-6 text-slate-700 leading-relaxed">
          <div className="bg-white border border-slate-100 rounded-xl p-6 flex items-start gap-4 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-bold text-blue-950 mb-1">Email Support</p>
              <a
                href="mailto:support@padelfit.coach"
                className="text-blue-600 hover:underline font-semibold text-lg"
              >
                support@padelfit.coach
              </a>
              <p className="text-sm text-slate-500 mt-2">
                For general enquiries, gear advice, affiliate partnership requests, or to report a broken link.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 text-sm text-slate-600">
            <p className="font-semibold text-slate-800 mb-2">Please include in your message:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Your name (optional)</li>
              <li>The page or product you are enquiring about</li>
              <li>A brief description of your question or issue</li>
            </ul>
          </div>

          <p className="text-sm text-slate-500">
            Padel Fit is operated by an independent publisher. We are not affiliated with Amazon, Awin, or any of the brands featured on this site.
          </p>
        </div>
      </main>

      <footer className="bg-blue-950 text-slate-400 py-6 px-4 text-center text-xs">
        <p>© {new Date().getFullYear()} Padel Fit · <a href="mailto:support@padelfit.coach" className="hover:text-white">support@padelfit.coach</a></p>
      </footer>
    </div>
  );
}
