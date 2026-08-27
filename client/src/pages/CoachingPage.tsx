import React, { useState } from 'react';
import { ExternalLink, Youtube, Users, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PageLayout from '@/components/PageLayout';

const CHANNELS = [
  {
    name: 'The Padel School',
    url: 'https://www.youtube.com/@ThePadelSchool',
    subscribers: '212K',
    focus: 'Technique & Tactics',
    description: 'Clear, well-produced tutorials covering everything from basic rules to advanced tactics. New videos every week, all in English. The go-to starting point for most English-speaking players.',
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    language: 'English',
    color: 'bg-red-50 border-red-100',
    badge: 'bg-red-100 text-red-800',
  },
  {
    name: 'Hello Padel Academy',
    url: 'https://www.youtube.com/@HelloPadelAcademy',
    subscribers: '59K',
    focus: 'Drills & Pro Lessons',
    description: 'Quick drills, tactical tips, and lessons from experienced coaches and professional players. Strong on practical, court-ready exercises.',
    levels: ['Intermediate', 'Advanced'],
    language: 'English',
    color: 'bg-blue-50 border-blue-100',
    badge: 'bg-blue-100 text-blue-800',
  },
  {
    name: 'Padel Trainer',
    url: 'https://www.youtube.com/@PadelTrainer',
    subscribers: '11.6K',
    focus: 'Coaching Education',
    description: 'Structured lessons and comprehensive theory talks aimed at players, coaches, and clubs. One of the most thorough English-language channels for understanding the game deeply.',
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    language: 'English',
    color: 'bg-emerald-50 border-emerald-100',
    badge: 'bg-emerald-100 text-emerald-800',
  },
  {
    name: 'Padel Academy 305',
    url: 'https://www.youtube.com/@PadelAcademy305',
    subscribers: '793K',
    focus: 'Comprehensive Coaching',
    description: 'One of the largest padel channels globally, covering all aspects of the game with high production quality. Excellent for players at any level looking for structured improvement.',
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    language: 'English',
    color: 'bg-purple-50 border-purple-100',
    badge: 'bg-purple-100 text-purple-800',
  },
  {
    name: 'Mejora Tu Padel',
    url: 'https://www.youtube.com/@MejoraTuPadel',
    subscribers: '850K+',
    focus: 'Pro Coaching Tips',
    description: 'Run by the coach of top professional players, combining technical tips with engaging lifestyle content. Primarily in Spanish — use subtitles. The most-subscribed padel coaching channel in the world.',
    levels: ['Intermediate', 'Advanced'],
    language: 'Spanish',
    color: 'bg-amber-50 border-amber-100',
    badge: 'bg-amber-100 text-amber-800',
  },
  {
    name: 'EverythingPadel',
    url: 'https://www.youtube.com/@EverythingPadel',
    subscribers: '116K',
    focus: 'Gear Reviews & Guides',
    description: 'Racket reviews, beginner guides, and equipment breakdowns. Ideal if you want to understand the gear side of the game alongside the technical side.',
    levels: ['Beginner', 'Intermediate'],
    language: 'English',
    color: 'bg-slate-50 border-slate-200',
    badge: 'bg-slate-100 text-slate-700',
  },
];

const ALL_LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const ALL_LANGUAGES = ['All', 'English', 'Spanish'];

export default function CoachingPage() {
  const [level, setLevel] = useState('All');
  const [language, setLanguage] = useState('All');

  const filtered = CHANNELS.filter((c) => {
    const levelMatch = level === 'All' || c.levels.includes(level);
    const langMatch = language === 'All' || c.language === language;
    return levelMatch && langMatch;
  });

  return (
    <PageLayout
      title="Padel Coaching Videos: Best YouTube Channels (2026) | Padel Fit"
      metaDescription="The best YouTube channels for improving your padel game — from beginner basics to advanced tactics, in English and Spanish."
      slug="/coaching"
    >
      {/* HERO */}
      <section className="bg-gradient-to-b from-blue-950 to-blue-900 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-red-600/20 rounded-full p-3 border border-red-500/30">
              <Youtube className="w-6 h-6 text-red-400" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Padel Coaching Hub</h1>
          <p className="text-blue-200 text-base max-w-xl mx-auto leading-relaxed">
            The best YouTube channels for improving your padel game — curated by level, language, and focus area.
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section className="bg-white border-b border-slate-100 sticky top-16 z-40 px-4 py-3">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono shrink-0">Level:</span>
          {ALL_LEVELS.map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                level === l
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'
              }`}
            >
              {l}
            </button>
          ))}
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono shrink-0 ml-2">Language:</span>
          {ALL_LANGUAGES.map((l) => (
            <button
              key={l}
              onClick={() => setLanguage(l)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                language === l
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </section>

      {/* CHANNEL CARDS */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        {filtered.length === 0 ? (
          <p className="text-center text-slate-400 py-16">No channels match these filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {filtered.map((ch) => (
              <Card key={ch.name} className={`border ${ch.color} hover:shadow-md transition-all duration-200`}>
                <CardContent className="p-5 flex flex-col gap-3 h-full">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="font-bold text-blue-950 text-sm leading-snug">{ch.name}</h2>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">{ch.focus}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded text-slate-600 shrink-0">
                      <Users className="w-3 h-3" />
                      <span className="text-[10px] font-bold font-mono">{ch.subscribers}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed flex-1">{ch.description}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {ch.levels.map((lv) => (
                      <Badge key={lv} className={`text-[10px] border-none font-mono ${ch.badge}`}>{lv}</Badge>
                    ))}
                    <Badge className="text-[10px] border-none font-mono bg-slate-100 text-slate-600 flex items-center gap-1">
                      <Globe className="w-2.5 h-2.5" />{ch.language}
                    </Badge>
                  </div>

                  <a href={ch.url} target="_blank" rel="noopener noreferrer" className="block mt-1">
                    <Button size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold flex items-center justify-center gap-1.5 h-9">
                      <Youtube className="w-4 h-4" />
                      Watch on YouTube
                      <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* QUIZ CTA */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="rounded-xl bg-gradient-to-r from-blue-950 to-blue-800 p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-base">Got the technique — now get the gear?</p>
            <p className="text-sm text-blue-200 mt-1">Our two-minute quiz matches you to the right shoes, racket, and apparel for your playing style.</p>
          </div>
          <a href="/#quiz-section">
            <Button className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shrink-0">
              Take the gear quiz →
            </Button>
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
