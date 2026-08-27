import React from 'react';
import { ExternalLink, Tv, Calendar, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/PageLayout';

const TOURNAMENTS = [
  { dates: '31 Aug – 6 Sep',  name: 'Madrid P1',             location: 'Madrid, Spain',       tier: 'P1',     broadcasters: ['TNT Sports 4', 'HBO Max'] },
  { dates: '7–13 Sep',        name: 'Paris Major',            location: 'Paris, France',        tier: 'Major',  broadcasters: ['TNT Sports 4', 'HBO Max', 'Red Bull TV'] },
  { dates: '28 Sep – 4 Oct',  name: 'Rotterdam P2',           location: 'Rotterdam, Netherlands', tier: 'P2',  broadcasters: ['TNT Sports 4', 'HBO Max'] },
  { dates: '5–11 Oct',        name: 'Germany P2',             location: 'Germany (TBC)',        tier: 'P2',     broadcasters: ['TNT Sports 4', 'HBO Max'] },
  { dates: '12–18 Oct',       name: 'Milano P1',              location: 'Milan, Italy',         tier: 'P1',     broadcasters: ['TNT Sports 4', 'HBO Max'] },
  { dates: '23–31 Oct',       name: 'Kuwait Major',           location: 'Kuwait City, Kuwait',  tier: 'Major',  broadcasters: ['TNT Sports 4', 'HBO Max'] },
  { dates: '9–15 Nov',        name: 'Dubai P1',               location: 'Dubai, UAE',           tier: 'P1',     broadcasters: ['TNT Sports 4', 'HBO Max'] },
  { dates: '7–13 Dec',        name: 'Premier Padel Finals',   location: 'Barcelona, Spain',     tier: 'Finals', broadcasters: ['TNT Sports 4', 'HBO Max', 'Red Bull TV'] },
];

const TIER_STYLES: Record<string, string> = {
  Major:  'bg-amber-100 text-amber-800 border-amber-200',
  P1:     'bg-blue-100 text-blue-800 border-blue-200',
  P2:     'bg-slate-100 text-slate-700 border-slate-200',
  Finals: 'bg-purple-100 text-purple-800 border-purple-200',
};

export default function CompetitionsPage() {
  return (
    <PageLayout
      title="Padel Competitions & Live TV Guide 2026 | Padel Fit"
      metaDescription="Premier Padel Tour 2026 schedule, broadcasters, and where to watch live. Plus a link to Where's the Match for real-time TV listings."
      slug="/competitions"
    >
      {/* HERO */}
      <section className="bg-gradient-to-b from-blue-950 to-blue-900 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-amber-500/20 rounded-full p-3 border border-amber-400/30">
              <Trophy className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Competitions & Live TV</h1>
          <p className="text-blue-200 text-base max-w-xl mx-auto leading-relaxed">
            The 2026 Premier Padel Tour schedule, where to watch, and real-time TV listings via Where's the Match.
          </p>
        </div>
      </section>

      {/* WHERE'S THE MATCH BANNER */}
      <section className="max-w-4xl mx-auto px-4 pt-10">
        <div className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col sm:flex-row items-center gap-4 shadow-sm">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center">
              <Tv className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-black text-blue-950 text-sm tracking-tight">Where's the Match</p>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Live TV Guide</p>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm text-slate-600 leading-relaxed">
              Real-time TV and streaming listings for padel and all sports — updated daily by fans. Find exactly which channel is showing today's match, what time it starts, and how to stream it.
            </p>
          </div>
          <a href="https://www.wheresthematch.com/" target="_blank" rel="noopener noreferrer" className="shrink-0">
            <Button className="bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center gap-2">
              <Tv className="w-4 h-4" />
              Find live padel
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </Button>
          </a>
        </div>
      </section>

      {/* 2026 SCHEDULE */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-black text-blue-950 tracking-tight">2026 Premier Padel Tour — Remaining Schedule</h2>
        </div>

        {/* Tier legend */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(TIER_STYLES).map(([tier, cls]) => (
            <Badge key={tier} className={`text-[10px] font-bold font-mono border ${cls}`}>{tier}</Badge>
          ))}
          <span className="text-xs text-slate-400 self-center ml-1">UK broadcast: TNT Sports 4 / HBO Max / Red Bull TV</span>
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">Dates</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">Tournament</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">Location</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">Tier</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">Watch</th>
              </tr>
            </thead>
            <tbody>
              {TOURNAMENTS.map((t, i) => (
                <tr key={t.name} className={`border-b border-slate-100 last:border-0 ${i % 2 === 0 ? '' : 'bg-slate-50/50'}`}>
                  <td className="px-4 py-3 text-xs font-mono text-slate-500 whitespace-nowrap">{t.dates}</td>
                  <td className="px-4 py-3 font-bold text-blue-950 text-sm">{t.name}</td>
                  <td className="px-4 py-3 text-xs text-slate-600">{t.location}</td>
                  <td className="px-4 py-3">
                    <Badge className={`text-[10px] font-bold font-mono border ${TIER_STYLES[t.tier]}`}>{t.tier}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {t.broadcasters.map((b) => (
                        <span key={b} className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-mono">{b}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="sm:hidden space-y-3">
          {TOURNAMENTS.map((t) => (
            <div key={t.name} className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-bold text-blue-950 text-sm">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.location}</p>
                </div>
                <Badge className={`text-[10px] font-bold font-mono border shrink-0 ${TIER_STYLES[t.tier]}`}>{t.tier}</Badge>
              </div>
              <p className="text-[10px] font-mono text-slate-400">{t.dates}</p>
              <div className="flex flex-wrap gap-1">
                {t.broadcasters.map((b) => (
                  <span key={b} className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-mono">{b}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-400 mt-4">
          Schedule correct as of August 2026. Dates and venues subject to change — check{' '}
          <a href="https://premierpadel.com/en/tournaments" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            premierpadel.com
          </a>{' '}
          for the latest.
        </p>
      </section>

      {/* STREAMING NOTE */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="rounded-xl bg-blue-50 border border-blue-100 p-5 space-y-2">
          <p className="text-sm font-bold text-blue-950">How to watch in the UK</p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Most Premier Padel matches are available on <strong>TNT Sports 4</strong> (via Sky, BT or discovery+) and <strong>HBO Max</strong>. Early rounds of some tournaments stream free on the{' '}
            <a href="https://www.youtube.com/@PremierPadel" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Premier Padel YouTube channel</a>.{' '}
            <strong>Red Bull TV</strong> carries Finals and Majors. Use{' '}
            <a href="https://www.wheresthematch.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Where's the Match</a>{' '}
            for real-time listings on match day.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
