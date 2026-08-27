/**
 * RelatedGuides
 *
 * Renders a "Read next" row of guide cards, excluding the current guide.
 * Pass the current slug to filter it out automatically.
 */
import React from 'react';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';

export const ALL_GUIDES = [
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

interface RelatedGuidesProps {
  currentSlug: string;
}

export default function RelatedGuides({ currentSlug }: RelatedGuidesProps) {
  const related = ALL_GUIDES.filter((g) => g.slug !== currentSlug);

  if (related.length === 0) return null;

  return (
    <section className="not-prose mt-12 mb-4">
      <h2 className="text-base font-bold text-blue-950 mb-4 flex items-center gap-2">
        <span className="block w-1 h-5 bg-blue-600 rounded-full" />
        Read next
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {related.map((guide) => (
          <Link key={guide.slug} href={guide.slug} className="block group">
            <div className="h-full rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-md transition-all duration-200 p-4 flex flex-col gap-2">
              <span
                className={`self-start text-[10px] font-bold uppercase tracking-wider font-mono px-2 py-0.5 rounded ${guide.categoryColor}`}
              >
                {guide.category}
              </span>
              <p className="text-sm font-semibold text-blue-950 group-hover:text-blue-600 transition-colors leading-snug flex-1">
                {guide.title}
              </p>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{guide.summary}</p>
              <span className="text-xs font-semibold text-blue-600 flex items-center gap-1 mt-1">
                Read guide <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
