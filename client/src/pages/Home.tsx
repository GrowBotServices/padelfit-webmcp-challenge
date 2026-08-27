import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PRODUCTS, Product } from '@/const';
import ShoeQuiz from '@/components/ShoeQuiz';
import ShoeCard from '@/components/ShoeCard';
import CompareTable from '@/components/CompareTable';
import WebMCPAgent from '@/components/WebMCPAgent';
import { ArrowRight, Mail, ChevronDown, Youtube, Trophy, MapPin, Salad } from 'lucide-react';
import { Link } from 'wouter';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'shoe' | 'racket' | 'clothing'>('all');
  const [playOpen, setPlayOpen] = useState(false);
  const playRef = React.useRef<HTMLDivElement>(null);

  // Close play dropdown on outside click
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (playRef.current && !playRef.current.contains(e.target as Node)) {
        setPlayOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);
  const [comparedIds, setComparedIds] = useState<string[]>([]);

  // Filter products based on active category tab
  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const handleCompareToggle = (id: string) => {
    setComparedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleRemoveCompare = (id: string) => {
    setComparedIds(prev => prev.filter(item => item !== id));
  };

  const handleClearCompare = () => {
    setComparedIds([]);
  };

  const handleSetCompared = React.useCallback((ids: string[]) => {
    setComparedIds(Array.from(new Set(ids)).slice(0, 3));
    window.setTimeout(() => {
      document.getElementById('compare-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }, []);

  const comparedProducts = useMemo(() => {
    return PRODUCTS.filter(p => comparedIds.includes(p.id));
  }, [comparedIds]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      {/* HEADER DISCLOSURE */}
      <div className="bg-blue-950 text-blue-200 text-center py-2 px-4 text-xs font-medium border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <Badge className="bg-blue-800 text-blue-100 hover:bg-blue-800 border-none font-mono text-[9px] px-1.5 py-0.5">AD DISCLOSURE</Badge>
          <span>PadelFit is reader-supported. We may earn a commission when you purchase through our links. </span>
          <Link href="/affiliate-disclosure" className="underline hover:text-white transition-colors">Learn more</Link>
        </div>
      </div>

      {/* NAVIGATION BAR */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-12 h-12 flex items-center justify-center shrink-0 overflow-hidden rounded-md bg-white p-0.5 shadow-sm border border-slate-100">
              <img
                src="/manus-storage/padelfit-logo_ff1cdec5.png"
                alt="Padel Fit Logo"
                className="object-contain w-full h-full"
              />
            </div>
            <div>
              <span className="font-extrabold text-blue-950 text-lg tracking-tight block leading-none">Padel Fit</span>
              <span className="text-[10px] font-mono text-blue-600 uppercase tracking-widest block mt-0.5">Improve Your Padel</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-5 text-sm font-semibold text-slate-600">
            <Link href="/coaching" className="hover:text-blue-600 transition-colors">Coaching</Link>
            <Link href="/competitions" className="hover:text-blue-600 transition-colors">Competitions</Link>
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
            <Link href="/guides" className="hover:text-blue-600 transition-colors">Guides</Link>
            <a href="#quiz-section" className="hover:text-blue-600 transition-colors">Gear Quiz</a>
            <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
          </nav>
          <a href="#quiz-section">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs shadow-md shadow-blue-500/10 h-9">
              Find Your Gear
            </Button>
          </a>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900 text-white py-16 sm:py-24 px-4 overflow-hidden">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

          <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
            <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono px-3 py-1 text-xs uppercase tracking-wider">
              Welcome To Your Ultimate Padel Hub
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none">
              Find the perfect fit<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400">
                to improve your Padel.
              </span>
            </h1>
            <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Find the right gear, get the right coaching, eat to win, play more, play better and have fun!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
              <a href="#quiz-section">
                <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-mono text-sm px-8 py-6 rounded-xl shadow-lg shadow-blue-500/20 flex items-center gap-2">
                  Start Gear Finder Quiz
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <a href="#reviews-section">
                <Button variant="outline" className="w-full sm:w-auto border-slate-700 text-white hover:bg-slate-800 font-mono text-sm px-8 py-6 rounded-xl">
                  Browse All Gear
                </Button>
              </a>
            </div>
          </div>
        </section>


        {/* FEATURE CARDS SECTION */}
        <section className="py-10 px-4 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto">
            <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-6">Everything you need to improve your padel</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { href: '/coaching', icon: <Youtube className="w-5 h-5 text-red-500" />, label: 'Coaching Videos', desc: '6 curated YouTube channels' },
                { href: '/competitions', icon: <Trophy className="w-5 h-5 text-amber-500" />, label: 'Competitions', desc: '2026 Premier Padel schedule' },
                { href: '/play', icon: <MapPin className="w-5 h-5 text-emerald-500" />, label: 'Find & Book', desc: 'Clubs + Playtomic booking' },
                { href: '/nutrition', icon: <Salad className="w-5 h-5 text-blue-500" />, label: 'Nutrition', desc: 'Pre, in & post-match fuel' },
              ].map((card) => (
                <Link key={card.href} href={card.href} className="group flex flex-col items-center text-center gap-2 p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-md bg-white transition-all duration-200">
                  <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                    {card.icon}
                  </div>
                  <p className="text-xs font-bold text-blue-950 group-hover:text-blue-600 transition-colors">{card.label}</p>
                  <p className="text-[10px] text-slate-400 leading-snug">{card.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* INTERACTIVE QUIZ SECTION */}
        <section id="quiz-section" className="py-12 sm:py-16 px-4 max-w-7xl mx-auto scroll-mt-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight">Interactive Gear Finder</h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
              Our clinical scoring matches your physical profile, age, and court surface with the perfect racket, shoe, or clothing.
            </p>
          </div>
          <WebMCPAgent onSetCompared={handleSetCompared} />
          <ShoeQuiz />
        </section>

        {/* COMPARISON MATRIX SECTION */}
        <section id="compare-section" className="py-12 sm:py-16 px-4 bg-slate-100/50 border-y border-slate-200/40 scroll-mt-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight">Side-by-Side Comparison</h2>
              <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                Add up to 3 items from the reviews below to compare their technical specifications side-by-side.
              </p>
            </div>
            <CompareTable
              comparedProducts={comparedProducts}
              onRemove={handleRemoveCompare}
              onClear={handleClearCompare}
            />
          </div>
        </section>

        {/* EXPERT REVIEWS SECTION */}
        <section id="reviews-section" className="py-12 sm:py-16 px-4 max-w-7xl mx-auto scroll-mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight">Expert Reviews & Tech Specs</h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
              Every piece of gear is fully reviewed and verified by our clinical play-testers.
            </p>
          </div>

          {/* Category Tabs Filter */}
          <div className="flex justify-center mb-10">
            <Tabs
              value={activeCategory}
              onValueChange={(val) => setActiveCategory(val as any)}
              className="w-full max-w-md"
            >
              <TabsList className="grid grid-cols-4 bg-slate-100 p-1 rounded-xl">
                <TabsTrigger value="all" className="rounded-lg font-mono text-xs py-2">All</TabsTrigger>
                <TabsTrigger value="shoe" className="rounded-lg font-mono text-xs py-2">Shoes</TabsTrigger>
                <TabsTrigger value="racket" className="rounded-lg font-mono text-xs py-2">Rackets</TabsTrigger>
                <TabsTrigger value="clothing" className="rounded-lg font-mono text-xs py-2">Apparel</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ShoeCard
                key={product.id}
                product={product}
                onCompareToggle={handleCompareToggle}
                isCompared={comparedIds.includes(product.id)}
              />
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER & COMPLIANCE */}
      <footer className="bg-blue-950 text-slate-400 py-12 px-4 border-t border-blue-900/60">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 flex items-center justify-center shrink-0 overflow-hidden rounded-md bg-white p-0.5 shadow-sm border border-slate-100">
                <img
                  src="/manus-storage/padelfit-logo_ff1cdec5.png"
                  alt="Padel Fit Logo"
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="font-extrabold text-white text-base tracking-tight">Padel Fit</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Clinical biomechanical gear analysis designed to help players enjoy padel safely, perform at their peak, and protect their elbows, knees, and ankles from injury.
            </p>
            <p className="text-xs text-slate-500">
              <a href="https://padelfit.coach" className="hover:text-white transition-colors">padelfit.coach</a>
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-mono">Support & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="mailto:support@padelfit.coach"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  support@padelfit.coach
                </a>
              </li>
              <li>
                <Link href="/coaching" className="hover:text-white transition-colors">
                  Coaching
                </Link>
              </li>
              <li>
                <Link href="/competitions" className="hover:text-white transition-colors">
                  Competitions
                </Link>
              </li>
              <li>
                <Link href="/play" className="hover:text-white transition-colors">
                  Play
                </Link>
              </li>
              <li>
                <Link href="/nutrition" className="hover:text-white transition-colors">
                  Nutrition
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-white transition-colors">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/affiliate-disclosure" className="hover:text-white transition-colors">
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="hover:text-white transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-mono">Affiliate & Ad Disclosure</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              As an Amazon Associate, Padel Fit earns from qualifying purchases. We recommend products based on strict fit criteria, but we may earn a small commission when you purchase through our links, at no additional cost to you.
            </p>
            <p className="text-[11px] text-slate-500">
              <Link href="/affiliate-disclosure" className="hover:text-slate-300 underline">
                Full Affiliate Disclosure →
              </Link>
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-blue-900/40 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Padel Fit · padelfit.coach · All rights reserved. Play safe, play hard.</p>
        </div>
      </footer>
    </div>
  );
}
