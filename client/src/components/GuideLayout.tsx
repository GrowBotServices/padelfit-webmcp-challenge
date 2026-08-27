import React from 'react';
import { Link } from 'wouter';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface GuideLayoutProps {
  /** Page <title> and <meta name="description"> — injected via useEffect */
  title: string;
  metaDescription: string;
  /** Canonical slug, e.g. "/guides/best-padel-shoes-stability" */
  slug: string;
  /** Article structured data */
  headline: string;
  datePublished: string;
  children: React.ReactNode;
}

export default function GuideLayout({
  title,
  metaDescription,
  slug,
  headline,
  datePublished,
  children,
}: GuideLayoutProps) {
  // Inject <title>, <meta description>, <link canonical> and Article JSON-LD
  React.useEffect(() => {
    const prev = document.title;
    document.title = title;

    // meta description
    let metaEl = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaEl) {
      metaEl = document.createElement('meta');
      metaEl.name = 'description';
      document.head.appendChild(metaEl);
    }
    const prevDesc = metaEl.content;
    metaEl.content = metaDescription;

    // canonical
    let canonEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonEl) {
      canonEl = document.createElement('link');
      canonEl.rel = 'canonical';
      document.head.appendChild(canonEl);
    }
    const prevCanon = canonEl.href;
    canonEl.href = `https://padelfit.coach${slug}`;

    // Article JSON-LD structured data
    const ldId = 'guide-jsonld';
    let ldEl = document.getElementById(ldId) as HTMLScriptElement | null;
    if (!ldEl) {
      ldEl = document.createElement('script');
      ldEl.id = ldId;
      ldEl.type = 'application/ld+json';
      document.head.appendChild(ldEl);
    }
    ldEl.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline,
      datePublished,
      author: { '@type': 'Organization', name: 'Padel Fit', url: 'https://padelfit.coach' },
      publisher: { '@type': 'Organization', name: 'Padel Fit', url: 'https://padelfit.coach' },
      url: `https://padelfit.coach${slug}`,
    });

    return () => {
      document.title = prev;
      if (metaEl) metaEl.content = prevDesc;
      if (canonEl) canonEl.href = prevCanon;
      if (ldEl) ldEl.remove();
    };
  }, [title, metaDescription, slug, headline, datePublished]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      {/* AD DISCLOSURE BANNER */}
      <div className="bg-blue-950 text-blue-200 text-center py-2 px-4 text-xs font-medium border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <Badge className="bg-blue-800 text-blue-100 hover:bg-blue-800 border-none font-mono text-[9px] px-1.5 py-0.5">AD DISCLOSURE</Badge>
          <span>PadelFit is reader-supported. We may earn a commission when you purchase through our links. </span>
          <Link href="/affiliate-disclosure" className="underline hover:text-white transition-colors">Learn more</Link>
        </div>
      </div>

      {/* STICKY NAV */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 flex items-center justify-center shrink-0 overflow-hidden rounded-md bg-white p-0.5 shadow-sm border border-slate-100">
              <img
                src="/manus-storage/padelfit-logo_ff1cdec5.png"
                alt="Padel Fit Logo"
                className="object-contain w-full h-full"
              />
            </div>
            <div>
              <span className="font-extrabold text-blue-950 text-base tracking-tight block leading-none group-hover:text-blue-600 transition-colors">Padel Fit</span>
              <span className="text-[10px] font-mono text-blue-600 uppercase tracking-widest block mt-0.5">Improve Your Padel</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <Link href="/guides" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              Guides
            </Link>
            <Link href="/#quiz-section" className="hover:text-blue-600 transition-colors">Gear Quiz</Link>
            <Link href="/#reviews-section" className="hover:text-blue-600 transition-colors">Expert Reviews</Link>
          </nav>
          <Link href="/#quiz-section">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs shadow-md shadow-blue-500/10 h-9 px-4 rounded-md font-semibold transition-colors">
              Find Your Gear
            </button>
          </Link>
        </div>
      </header>

      {/* BREADCRUMB */}
      <div className="max-w-3xl mx-auto w-full px-4 pt-6">
        <nav className="flex items-center gap-1.5 text-xs text-slate-400" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-blue-600 transition-colors">Guides</Link>
          <span>/</span>
          <span className="text-slate-600 truncate max-w-[200px]">{headline}</span>
        </nav>
      </div>

      {/* ARTICLE CONTENT */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 pb-16 pt-4">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="bg-blue-950 text-slate-400 py-8 px-4 border-t border-blue-900/60">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between items-start gap-6 text-xs">
          <div>
            <p className="text-slate-500 leading-relaxed max-w-xs">
              As an Amazon Associate, Padel Fit earns from qualifying purchases. Recommendations are based on clinical fit criteria, not commercial relationships.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-slate-400">
            <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
            <Link href="/affiliate-disclosure" className="hover:text-white transition-colors">Affiliate Disclosure</Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms-of-use" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
        <div className="max-w-3xl mx-auto mt-6 pt-6 border-t border-blue-900/40 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Padel Fit · padelfit.coach</p>
        </div>
      </footer>
    </div>
  );
}
