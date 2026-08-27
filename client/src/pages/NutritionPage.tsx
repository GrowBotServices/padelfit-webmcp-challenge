import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Salad, Zap, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/PageLayout';

interface TierSection {
  phase: string;
  timing: string;
  foods: string[];
  notes: string;
}

interface Tier {
  id: string;
  label: string;
  icon: React.ReactNode;
  colour: string;
  headerBg: string;
  description: string;
  sections: TierSection[];
}

const TIERS: Tier[] = [
  {
    id: 'friendly',
    label: 'Friendly Match',
    icon: <Salad className="w-5 h-5" />,
    colour: 'border-emerald-200',
    headerBg: 'bg-emerald-50',
    description: '1–2 sets, casual play. Keep it simple — normal meals either side and consistent hydration throughout.',
    sections: [
      {
        phase: 'Pre-match',
        timing: '1–2 hours before',
        foods: ['Banana', 'Wholegrain toast with nut butter', 'Yoghurt with granola'],
        notes: 'Light, easily digestible carbs. Avoid heavy meals in the hour before.',
      },
      {
        phase: 'In-match',
        timing: 'During play',
        foods: ['Water every changeover', 'Banana if playing over 60 minutes'],
        notes: 'Consistent hydration is the priority. No need for energy drinks for a casual match.',
      },
      {
        phase: 'Post-match',
        timing: 'Within 1–2 hours',
        foods: ['Normal balanced meal', 'Plenty of water'],
        notes: 'No special recovery protocol needed — just eat normally and rehydrate.',
      },
    ],
  },
  {
    id: 'multi',
    label: 'Multiple Matches in a Day',
    icon: <Zap className="w-5 h-5" />,
    colour: 'border-amber-200',
    headerBg: 'bg-amber-50',
    description: 'Box leagues, club tournaments, back-to-back matches. Energy management and quick recovery between matches are the priorities.',
    sections: [
      {
        phase: 'Pre-match',
        timing: 'Morning of the day',
        foods: ['Oats, pasta, brown rice, or sweet potato', 'Lean protein (chicken, eggs, tofu)', 'Hydrate from the morning — 400–600ml water 1–2 hours before first match'],
        notes: 'Complex carbs for sustained energy. Start hydrating early, not just before you play.',
      },
      {
        phase: 'Between matches',
        timing: 'During the day',
        foods: ['Electrolyte drinks', 'Banana or energy bar between matches', 'Tuna or chicken wrap for a longer break'],
        notes: 'Avoid heavy meals between matches — they slow you down. Keep snacks small and quick-digesting.',
      },
      {
        phase: 'Post-day recovery',
        timing: 'Within 30–45 mins of finishing',
        foods: ['Protein smoothie with banana', 'Tuna or chicken wrap', 'Electrolyte drink'],
        notes: 'The 30-minute window after your last match is the most effective time to start recovery.',
      },
    ],
  },
  {
    id: 'competitive',
    label: 'Competitive Tournament',
    icon: <Trophy className="w-5 h-5" />,
    colour: 'border-blue-200',
    headerBg: 'bg-blue-50',
    description: 'Full tournament day, high intensity, multiple rounds. Structured nutrition from the night before through to post-match recovery.',
    sections: [
      {
        phase: 'Night before',
        timing: 'Evening meal',
        foods: ['High-carb loading: pasta, rice, or sweet potato', 'Lean protein', 'Avoid alcohol and heavy fats'],
        notes: 'Carb loading the night before is the most effective preparation for a full tournament day.',
      },
      {
        phase: 'Match morning',
        timing: '2–3 hours before',
        foods: ['Oatmeal with fruit and honey', 'Banana or dates closer to match time'],
        notes: 'Slow-release carbs in the morning, fast carbs in the final 30–60 minutes.',
      },
      {
        phase: 'In-match',
        timing: 'Throughout the day',
        foods: ['Electrolytes every 20 minutes in heat', 'Banana or dates every 45 minutes', 'Magnesium-rich snacks (pumpkin seeds, dark chocolate) to reduce cramping'],
        notes: 'In hot conditions, electrolyte loss accelerates significantly — do not rely on water alone.',
      },
      {
        phase: 'Post-tournament recovery',
        timing: 'Immediately after + within 2 hours',
        foods: ['Protein shake immediately after', 'Full recovery meal within 2 hours: chicken, rice, leafy greens', 'Anti-inflammatory foods: berries, turmeric, oily fish, nuts'],
        notes: 'Avoid alcohol — it significantly impairs muscle repair and sleep quality.',
      },
    ],
  },
];

const QUICK_TIPS = [
  { icon: '💧', tip: 'Hydrate 400–600ml of water 1–2 hours before playing' },
  { icon: '🍌', tip: 'Avoid sugary snacks that cause energy crashes — use bananas, oat bars, or dates' },
  { icon: '🥬', tip: 'Magnesium-rich foods (spinach, pumpkin seeds, dark chocolate) reduce cramping' },
  { icon: '🫐', tip: 'Anti-inflammatory recovery: berries, leafy greens, oily fish, turmeric, nuts' },
];

function TierAccordion({ tier }: { tier: Tier }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`rounded-xl border ${tier.colour} overflow-hidden`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between gap-3 px-5 py-4 ${tier.headerBg} text-left transition-colors hover:brightness-95`}
      >
        <div className="flex items-center gap-3">
          <div className="text-blue-700">{tier.icon}</div>
          <div>
            <p className="font-bold text-blue-950 text-sm">{tier.label}</p>
            <p className="text-xs text-slate-500 leading-snug mt-0.5 max-w-md">{tier.description}</p>
          </div>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
      </button>

      {open && (
        <div className="bg-white divide-y divide-slate-100">
          {tier.sections.map((section) => (
            <div key={section.phase} className="px-5 py-4">
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                <div className="sm:w-36 shrink-0">
                  <p className="font-bold text-blue-950 text-xs uppercase tracking-wider font-mono">{section.phase}</p>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">{section.timing}</p>
                </div>
                <div className="flex-1 space-y-2">
                  <ul className="space-y-1">
                    {section.foods.map((food) => (
                      <li key={food} className="text-sm text-slate-700 flex items-start gap-2">
                        <span className="text-blue-400 font-bold mt-0.5 shrink-0">·</span>
                        {food}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-slate-400 italic leading-relaxed">{section.notes}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function NutritionPage() {
  return (
    <PageLayout
      title="Padel Nutrition Guide: What to Eat Before, During & After | Padel Fit"
      metaDescription="Nutrition advice for padel players at every intensity level — from a casual friendly to a full competitive tournament day."
      slug="/nutrition"
    >
      {/* HERO */}
      <section className="bg-gradient-to-b from-blue-950 to-blue-900 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-emerald-500/20 rounded-full p-3 border border-emerald-400/30">
              <Salad className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Padel Nutrition Guide</h1>
          <p className="text-blue-200 text-base max-w-xl mx-auto leading-relaxed">
            What to eat and drink before, during, and after padel — tailored to your match intensity.
          </p>
          <p className="text-xs text-blue-300/70 max-w-md mx-auto">
            General sports nutrition guidance. For personalised advice, consult a qualified sports nutritionist or dietitian.
          </p>
        </div>
      </section>

      {/* QUICK TIPS */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-base font-bold text-blue-950 mb-4 flex items-center gap-2">
          <span className="block w-1 h-5 bg-blue-600 rounded-full" />
          Key principles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {QUICK_TIPS.map((tip) => (
            <div key={tip.tip} className="flex items-start gap-3 bg-white rounded-xl border border-slate-200 p-4">
              <span className="text-xl shrink-0">{tip.icon}</span>
              <p className="text-sm text-slate-700 leading-relaxed">{tip.tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THREE-TIER ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 pb-16 space-y-4">
        <h2 className="text-base font-bold text-blue-950 mb-2 flex items-center gap-2">
          <span className="block w-1 h-5 bg-blue-600 rounded-full" />
          By match intensity — tap to expand
        </h2>
        {TIERS.map((tier) => (
          <TierAccordion key={tier.id} tier={tier} />
        ))}

        {/* Quiz CTA */}
        <div className="rounded-xl bg-gradient-to-r from-blue-950 to-blue-800 p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <div>
            <p className="font-bold text-base">Fuelled up — now get the right gear?</p>
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

