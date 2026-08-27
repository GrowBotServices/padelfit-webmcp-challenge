/**
 * PageLayout
 *
 * Shared shell for the four new feature pages (Coaching, Competitions, Play, Nutrition).
 * Handles sticky nav, AD DISCLOSURE banner, SEO head injection, and footer.
 * Does NOT inject Article JSON-LD (these are not editorial articles).
 */
import React from 'react';
import { Link } from 'wouter';
import { BookOpen, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PageLayoutProps {
  title: string;
  metaDescription: string;
  slug: string;
  children: React.ReactNode;
}

export default function PageLayout({ title, metaDescription, slug, children }: PageLayoutProps) {
  const [playOpen, setPlayOpen] = React.useState(false);
  const playRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (playRef.current && !playRef.current.contains(e.target as Node)) {
        setPlayOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // SEO head injection
  React.useEffect(() => {
    const prev = document.title;
    document.title = title;

    let metaEl = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaEl) {
      metaEl = document.createElement('meta');
      metaEl.name = 'description';
      document.head.appendChild(metaEl);
    }
    const prevDesc = metaEl.content;
    metaEl.content = metaDescription;

    let canonEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonEl) {
      canonEl = document.createElement('link');
      canonEl.rel = 'canonical';
      document.head.appendChild(canonEl);
    }
    const prevCanon = canonEl.href;
    canonEl.href = `https://padelfit.coach${slug}`;

    return () => {
      document.title = prev;
      if (metaEl) metaEl.content = prevDesc;
      if (canonEl) canonEl.href = prevCanon;
    };
  }, [title, metaDescription, slug]);

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
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 flex items-center justify-center shrink-0 overflow-hidden rounded-md bg-white p-0.5 shadow-sm border border-slate-100">
              <img src="/manus-storage/padelfit-logo_ff1cdec5.png" alt="Padel Fit Logo" className="object-contain w-full h-full" />
            </div>
            <div>
              <span className="font-extrabold text-blue-950 text-base tracking-tight block leading-none group-hover:text-blue-600 transition-colors">Padel Fit</span>
              <span className="text-[10px] font-mono text-blue-600 uppercase tracking-widest block mt-0.5">Improve Your Padel</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-semibold text-slate-600">
            <Link href="/coaching" className="hover:text-blue-600 transition-colors">Coaching</Link>
            <Link href="/competitions" className="hover:text-blue-600 transition-colors">Competitions</Link>

            {/* Play dropdown */}
            <div className="relative" ref={playRef}>
              <button
                onClick={() => setPlayOpen((o) => !o)}
                className="flex items-center gap-1 hover:text-blue-600 transition-colors focus:outline-none"
              >
                Play <ChevronDown className={`w-3.5 h-3.5 transition-transform ${playOpen ? 'rotate-180' : ''}`} />
              </button>
              {playOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-100 py-1 z-50">
                  <Link href="/play#club-finder" onClick={() => setPlayOpen(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    Find a Club
                  </Link>
                  <Link href="/play#playtomic" onClick={() => setPlayOpen(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    Book via Playtomic
                  </Link>
                </div>
              )}
            </div>

            <Link href="/nutrition" className="hover:text-blue-600 transition-colors">Nutrition</Link>
            <Link href="/guides" className="hover:text-blue-600 transition-colors flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> Guides
            </Link>
            <Link href="/#quiz-section" className="hover:text-blue-600 transition-colors">Gear Quiz</Link>
            <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
          </nav>

          <Link href="/#quiz-section">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs shadow-md shadow-blue-500/10 h-9 px-4 rounded-md font-semibold transition-colors">
              Find Your Gear
            </button>
          </Link>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="flex-1">{children}</main>

      {/* FOOTER */}
      <footer className="bg-blue-950 text-slate-400 py-8 px-4 border-t border-blue-900/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start gap-6 text-xs">
          <div>
            <p className="text-slate-500 leading-relaxed max-w-xs">
              As an Amazon Associate, Padel Fit earns from qualifying purchases. Recommendations are based on clinical fit criteria, not commercial relationships.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-slate-400">
            <Link href="/coaching" className="hover:text-white transition-colors">Coaching</Link>
            <Link href="/competitions" className="hover:text-white transition-colors">Competitions</Link>
            <Link href="/play" className="hover:text-white transition-colors">Play</Link>
            <Link href="/nutrition" className="hover:text-white transition-colors">Nutrition</Link>
            <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
            <Link href="/affiliate-disclosure" className="hover:text-white transition-colors">Affiliate Disclosure</Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms-of-use" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-blue-900/40 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Padel Fit · padelfit.coach</p>
        </div>
      </footer>
    </div>
  );
}
