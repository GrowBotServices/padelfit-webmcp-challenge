import React from 'react';
import { Link } from 'wouter';
import { ArrowRight, BookOpen, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const GUIDES = [
  {
    slug: '/guides/best-padel-shoes-stability',
    title: 'Best padel shoes for stability and lateral support (2026)',
    summary: 'Which padel shoes give the most lateral support? Our stability-first guide compares the leading options for players who want a planted, secure feel on court.',
    category: 'Shoes',
    categoryColor: 'bg-emerald-100 text-emerald-800',
  },
  {
    slug: '/guides/padel-racket-shapes-explained',
    title: 'Padel racket shapes explained: round, teardrop and diamond',
    summary: 'Round, teardrop or diamond? What padel racket shape actually changes, who each suits, and how to pick the right one for your game.',
    category: 'Rackets',
    categoryColor: 'bg-blue-100 text-blue-800',
  },
  {
    slug: '/guides/how-to-choose-a-padel-racket',
    title: 'How to choose a padel racket: the 6 questions that matter',
    summary: 'Ignore the marketing. These six questions - level, style, shape, weight, face, comfort - are how coaches actually match players to padel rackets.',
    category: 'Rackets',
    categoryColor: 'bg-blue-100 text-blue-800',
  },
];

export default function GuidesIndexPage() {
  React.useEffect(() => {
    const prev = document.title;
    document.title = 'Padel Guides: Shoes, Rackets & Gear Advice | Padel Fit';

    let metaEl = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaEl) {
      metaEl = document.createElement('meta');
      metaEl.name = 'description';
      document.head.appendChild(metaEl);
    }
    const prevDesc = metaEl.content;
    metaEl.content = 'In-depth padel guides covering shoes, rackets and gear selection. Clinically grounded advice for players of every level.';

    let canonEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonEl) {
      canonEl = document.createElement('link');
      canonEl.rel = 'canonical';
      document.head.appendChild(canonEl);
    }
    const prevCanon = canonEl.href;
    canonEl.href = 'https://padelfit.coach/guides';

    return () => {
      document.title = prev;
      if (metaEl) metaEl.content = prevDesc;
      if (canonEl) canonEl.href = prevCanon;
    };
  }, []);

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
            <Link href="/guides" className="text-blue-600 flex items-center gap-1.5">
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

      <main className="flex-1">
        {/* PAGE HEADER */}
        <section className="bg-gradient-to-b from-blue-950 to-blue-900 text-white py-14 px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-blue-800/50 rounded-full p-3 border border-blue-700/40">
                <BookOpen className="w-6 h-6 text-blue-300" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Padel Guides</h1>
            <p className="text-blue-200 text-base max-w-xl mx-auto leading-relaxed">
              In-depth guides on shoes, rackets and gear selection. Clinically grounded advice for players of every level - no marketing fluff.
            </p>
          </div>
        </section>

        {/* GUIDE CARDS */}
        <section className="max-w-3xl mx-auto px-4 py-12 space-y-6">
          {GUIDES.map((guide) => (
            <Link key={guide.slug} href={guide.slug} className="block group">
              <Card className="border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 overflow-hidden">
                <CardContent className="p-6 flex flex-col sm:flex-row items-start gap-4">
                  <div className="flex-1 space-y-2">
                    <span className={`inline-block text-[10px] font-bold uppercase tracking-wider font-mono px-2 py-0.5 rounded ${guide.categoryColor}`}>
                      {guide.category}
                    </span>
                    <h2 className="text-base font-bold text-blue-950 group-hover:text-blue-600 transition-colors leading-snug">
                      {guide.title}
                    </h2>
                    <p className="text-sm text-slate-500 leading-relaxed">{guide.summary}</p>
                  </div>
                  <div className="shrink-0 self-center">
                    <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                      <ArrowRight className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>

        {/* QUIZ CTA */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <div className="rounded-xl bg-gradient-to-r from-blue-950 to-blue-800 p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-base">Want a personalised recommendation?</p>
              <p className="text-sm text-blue-200 mt-1">Our two-minute quiz matches you to the right gear for your playing style, court surface and body.</p>
            </div>
            <Link href="/#quiz-section">
              <Button className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shrink-0 flex items-center gap-2">
                Take the gear quiz <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>
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
