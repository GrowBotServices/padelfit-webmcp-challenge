import React from 'react';
import { ExternalLink, MapPin, Smartphone, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PageLayout from '@/components/PageLayout';

const DIRECTORIES = [
  {
    name: 'LTA Padel Court Finder',
    url: 'https://www.ltapadel.org.uk/play/find-a-padel-court/',
    description: 'The official Lawn Tennis Association tool. Search over 800 padel courts across Britain by postcode, town, or city. The most comprehensive and up-to-date database for UK courts.',
    badge: 'Official',
    badgeColor: 'bg-emerald-100 text-emerald-800',
  },
  {
    name: 'The Padel Directory',
    url: 'https://www.thepadeldirectory.co.uk/find-padel-courts',
    description: 'Filter by indoor, outdoor, or covered courts, and by region. Good for comparing facilities before you visit.',
    badge: 'Filter by type',
    badgeColor: 'bg-blue-100 text-blue-800',
  },
  {
    name: 'Padel Court Finder',
    url: 'https://padelcourtfinder.co.uk/',
    description: 'Quick postcode search with direct booking links. Useful when you want to go from search to booking in one step.',
    badge: 'Quick booking',
    badgeColor: 'bg-amber-100 text-amber-800',
  },
];

export default function PlayPage() {
  return (
    <PageLayout
      title="Find a Padel Club & Book Courts in the UK | Padel Fit"
      metaDescription="Find padel clubs near you using the LTA court finder and UK directories, or book courts instantly with the Playtomic app."
      slug="/play"
    >
      {/* HERO */}
      <section className="bg-gradient-to-b from-blue-950 to-blue-900 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-emerald-500/20 rounded-full p-3 border border-emerald-400/30">
              <MapPin className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Find a Club & Book a Court</h1>
          <p className="text-blue-200 text-base max-w-xl mx-auto leading-relaxed">
            Find padel clubs near you across the UK, or book a court instantly with the Playtomic app.
          </p>
        </div>
      </section>

      {/* CLUB FINDER */}
      <section id="club-finder" className="max-w-4xl mx-auto px-4 py-12 scroll-mt-20">
        <div className="flex items-center gap-2 mb-2">
          <Search className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-black text-blue-950 tracking-tight">Find a Club</h2>
        </div>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          Three trusted directories covering 800+ courts across the UK. The LTA finder is the most comprehensive; the others are useful for filtering by court type or going straight to booking.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {DIRECTORIES.map((dir) => (
            <Card key={dir.name} className="border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200">
              <CardContent className="p-5 flex flex-col gap-3 h-full">
                <div>
                  <span className={`inline-block text-[10px] font-bold uppercase tracking-wider font-mono px-2 py-0.5 rounded mb-2 ${dir.badgeColor}`}>
                    {dir.badge}
                  </span>
                  <h3 className="font-bold text-blue-950 text-sm leading-snug">{dir.name}</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed flex-1">{dir.description}</p>
                <a href={dir.url} target="_blank" rel="noopener noreferrer" className="block mt-auto">
                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center gap-1.5 h-9">
                    <MapPin className="w-3.5 h-3.5" />
                    Find courts
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-4xl mx-auto px-4">
        <hr className="border-slate-200" />
      </div>

      {/* PLAYTOMIC */}
      <section id="playtomic" className="max-w-4xl mx-auto px-4 py-12 scroll-mt-20">
        <div className="flex items-center gap-2 mb-2">
          <Smartphone className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-black text-blue-950 tracking-tight">Book via Playtomic</h2>
        </div>
        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          Playtomic is the world's leading racket sports booking app — 2 million+ players, 5,500+ clubs across 52 countries. Search for nearby clubs, book courts online, join public matches, and track your progress with a built-in player level system.
        </p>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          {/* Feature grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-slate-100">
            {[
              { label: 'Players worldwide', value: '2M+' },
              { label: 'Clubs & venues', value: '5,500+' },
              { label: 'Countries', value: '52' },
              { label: 'Sports supported', value: 'Padel, Tennis & more' },
            ].map((stat) => (
              <div key={stat.label} className="p-4 text-center">
                <p className="text-xl font-black text-blue-950">{stat.value}</p>
                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="p-6 border-t border-slate-100 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ul className="space-y-2 text-sm text-slate-600">
                {['Search for nearby clubs and courts', 'Book courts online in seconds', 'Join public matches and find partners'].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <ul className="space-y-2 text-sm text-slate-600">
                {['Track your progress with a player level system', 'Connect with other players in your area', 'Available on iOS and Android'].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="https://apps.apple.com/us/app/playtomic-padel-pickleball/id1242321076"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center justify-center gap-2 h-11">
                  <Smartphone className="w-4 h-4" />
                  Download on the App Store
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </Button>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.playtomic"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-2 h-11">
                  <Smartphone className="w-4 h-4" />
                  Get it on Google Play
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </Button>
              </a>
              <a
                href="https://playtomic.com/padel-courts"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 font-bold flex items-center justify-center gap-2 h-11">
                  <ExternalLink className="w-4 h-4" />
                  Find courts on web
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
