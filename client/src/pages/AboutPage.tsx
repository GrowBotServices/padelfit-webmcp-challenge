/**
 * About Padel Fit — /about
 *
 * Design system: PageLayout (shared header/footer/nav, AD DISCLOSURE banner, sticky nav).
 * Copy: approved by Damian Mark Smyth — do NOT edit without sign-off.
 * Metadata: title "About Padel Fit | Our Story and Approach", canonical https://padelfit.coach/about
 * Images: damian-tedx-montage_1e4df01e.webp (TEDx, landscape 501×175) and
 *         damian-dance-championship_3a4e936c.webp (dance, portrait 820×1614).
 * Preserve original aspect ratios. Lazy-load below-fold images. No medical/therapeutic claims.
 */
import React from 'react';
import { Link } from 'wouter';
import PageLayout from '@/components/PageLayout';

export default function AboutPage() {
  return (
    <PageLayout
      title="About Padel Fit | Our Story and Approach"
      metaDescription="Padel Fit was created by Damian Mark Smyth — a racket-sport enthusiast and AI early adopter who built a single place for gear guidance, coaching, nutrition, competitions and opportunities to play padel."
      slug="/about"
    >
      {/* PAGE HERO */}
      <section className="bg-gradient-to-b from-blue-950 to-blue-900 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-3">Our Story</p>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400">Padel Fit</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
            A single place for gear guidance, coaching, nutrition, competitions and opportunities to play — built by a player, for players.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-10">

          {/* Origin story */}
          <div className="prose prose-slate max-w-none space-y-4">
            <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
              Padel Fit was created by Damian Mark Smyth - a racket-sport enthusiast, AI early adopter and recent convert to padel. Having played matchplay squash, county badminton and racketball, Damian adopted padel at the age of 56 and quickly fell in love with the sport. Its combination of competition, accessibility, sociability and sheer enjoyment makes it a game that people of almost every age and ability can enjoy.
            </p>
            <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
              But when trying to improve his own game, Damian found useful information scattered across retailer websites, videos, coaching channels and specialist publications. There wasn't one straightforward place bringing together gear guidance, coaching, nutrition, competitions and opportunities to play. So he decided to build it.
            </p>
            <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
              Through his work helping small and medium-sized businesses adopt AI safely and effectively, Damian has developed practical experience using modern AI tools to research, organise and communicate complex information. Padel Fit puts those skills to work for the padel community. The aim is simple: to curate useful information that helps improving players choose suitable equipment, find good coaching, understand the game and enjoy playing more.
            </p>
          </div>

          {/* Divider */}
          <hr className="border-slate-200" />

          {/* AI-assisted, human-curated section */}

          {/* ── EXPERIENCE BEYOND THE COURT ── */}
          <div>
            <h2 className="text-2xl font-black text-blue-950 mb-5">Experience beyond the court</h2>

            {/* Speaking & authorship — TEDx montage beside copy */}
            {/* TEDx montage — full content width, copy below in three paragraphs */}
            <div className="mb-8">
              <img
                src="/manus-storage/damian-tedx-montage_1e4df01e.webp"
                alt="Damian Mark Smyth speaking at TEDx events"
                loading="lazy"
                decoding="async"
                className="w-full rounded-xl object-cover shadow-md mb-6"
                style={{ aspectRatio: '501 / 175' }}
              />
              <div className="prose prose-slate max-w-none space-y-4">
                <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
                  Damian is a published author on mental health and has delivered multiple TEDx talks.
                </p>
                <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
                  His writing and speaking explore how people think, feel and change - and how the right environment can help them do all three more effectively.
                </p>
                <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
                  That background shapes how Padel Fit approaches the sport. Padel is not just a fitness activity. Its combination of social connection, skill development, competition and fun creates the kind of environment where people genuinely want to keep showing up. That matters.
                </p>
              </div>
            </div>

            {/* Sport & movement — dance photo beside copy */}
            <div className="flex flex-col sm:flex-row-reverse gap-6 items-start">
              <div className="w-full sm:w-1/3 shrink-0">
                <img
                  src="/manus-storage/damian-dance-championship_3a4e936c.webp"
                  alt="Damian Mark Smyth and his dance partner holding national ballroom and Latin championship trophies"
                  loading="lazy"
                  decoding="async"
                  className="w-full rounded-xl object-cover shadow-md"
                  style={{ aspectRatio: '820 / 1614' }}
                />
              </div>
              <div className="prose prose-slate max-w-none">
                <div className="space-y-4">
                  <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
                    Damian is also a National ballroom and Latin dance champion. Competitive dance demands precision, physical conditioning, partnership and the ability to perform under pressure - qualities that translate directly to racket sports and to life more broadly.
                  </p>
                  <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
                    Movement, learning, competition and social connection are things Damian has pursued across many disciplines. Padel's particular strength is that it makes all four accessible to people regardless of age or athletic background. That inclusivity is a big part of why this project exists.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-slate-200" />

          {/* ── CONTRIBUTE TO PADEL FIT ── */}
          <div>
            <h2 className="text-2xl font-black text-blue-950 mb-3">Contribute to Padel Fit</h2>
            <p className="text-slate-600 text-base leading-relaxed mb-6">
              Padel Fit is a community project and grows through the knowledge and experience of players, coaches and enthusiasts. There are three ways to get involved:
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <p className="font-bold text-blue-950 text-sm mb-2">Coaching channels</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  If you run a reputable padel coaching channel and would like your content considered for the Padel Fit coaching section, get in touch and tell us about your channel and audience.
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <p className="font-bold text-blue-950 text-sm mb-2">Player stories</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Has padel made a positive difference to your physical or mental wellbeing? Padel Fit would love to hear your story. Genuine player experiences help others understand what the sport can offer.
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <p className="font-bold text-blue-950 text-sm mb-2">Gear suggestions</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Spotted excellent padel gear that isn't yet featured on the site? Share the details and we will review it for inclusion in the guide.
                </p>
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              To submit any of the above, use the{' '}
              <Link href="/contact" className="text-blue-600 hover:underline font-semibold">contact page</Link>
              {' '}or email{' '}
              <a href="mailto:support@padelfit.coach" className="text-blue-600 hover:underline font-semibold">support@padelfit.coach</a>
              {' '}directly.
            </p>
          </div>

          {/* Divider */}
          <hr className="border-slate-200" />

          <div>
            <h2 className="text-2xl font-black text-blue-950 mb-5">AI-assisted, human-curated</h2>
            <div className="prose prose-slate max-w-none space-y-4">
              <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
                AI tools help Padel Fit research, organise and maintain information, but the site isn't intended to be an automated content factory. Recommendations are shaped around practical player needs, product characteristics and transparent fit criteria. Retailer availability, product specifications and links can change, so readers should always confirm the latest information before purchasing.
              </p>
              <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
                Where Padel Fit uses affiliate links, these are clearly disclosed. A commission may be earned at no additional cost to the buyer. Padel Fit is an independent project built by a player, for players who want to improve - and have fun doing it.
              </p>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-slate-200" />

          {/* Contact CTA */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-blue-950 mb-2">Get in touch</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Questions, feedback or partnership enquiries are welcome at{' '}
              <a href="mailto:support@padelfit.coach" className="text-blue-600 hover:underline font-semibold">
                support@padelfit.coach
              </a>
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/#quiz-section">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs h-9 px-4 rounded-md font-semibold transition-colors">
                  Find Your Gear
                </button>
              </Link>
              <Link href="/affiliate-disclosure">
                <button className="border border-blue-200 text-blue-700 hover:bg-blue-100 font-mono text-xs h-9 px-4 rounded-md font-semibold transition-colors">
                  Affiliate Disclosure
                </button>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </PageLayout>
  );
}
