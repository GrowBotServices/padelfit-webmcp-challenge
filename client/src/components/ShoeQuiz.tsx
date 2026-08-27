import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RotateCcw, ShieldAlert, ExternalLink } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Product, offersForProduct } from '@/const';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import { recommendProducts, type GearProfile } from '@/lib/gearMatching';

type QuizCategory = 'shoe' | 'racket' | 'clothing';

type QuizAnswer = GearProfile & { category: QuizCategory };

export default function ShoeQuiz() {
  const [step, setStep] = useState<number>(1);
  const [category, setCategory] = useState<QuizCategory | null>(null);
  const [answers, setAnswers] = useState<Partial<QuizAnswer>>({});
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  const handleCategorySelect = (selectedCategory: QuizCategory) => {
    setCategory(selectedCategory);
    setAnswers({ category: selectedCategory });
    setStep(2);
  };

  const handleAnswer = (key: keyof QuizAnswer, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    
    // Determine next step based on selected category
    if (step === 2) {
      setStep(3); // Go to Injury step
    } else if (step === 3) {
      setStep(4); // Go to Play Frequency step
    } else if (step === 4) {
      // Step 5: Category-specific questions
      setStep(5);
    } else if (step === 5) {
      if (category === 'shoe') {
        setStep(6); // Shoes have court surface and then width
      } else {
        // Rackets and clothing finish at step 5 or 6 depending on questions
        calculateResults({ ...answers, [key]: value } as QuizAnswer);
      }
    } else if (step === 6) {
      if (category === 'shoe') {
        calculateResults({ ...answers, [key]: value } as QuizAnswer);
      }
    }
  };

  const calculateResults = (finalAnswers: QuizAnswer) => {
    setRecommendations(recommendProducts(finalAnswers, 2).map(({ product }) => product));
    setStep(10); // Results step
  };

  const resetQuiz = () => {
    setStep(1);
    setCategory(null);
    setAnswers({});
    setRecommendations([]);
  };

  const getProgress = () => {
    const totalSteps = category === 'shoe' ? 6 : 5;
    if (step === 10) return 100;
    return Math.round(((step - 1) / totalSteps) * 100);
  };

  return (
    <div className="max-w-2xl mx-auto font-sans">
      <Card className="border border-blue-100 shadow-xl rounded-2xl overflow-hidden bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-950 to-blue-900 text-white p-6 sm:p-8">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl sm:text-2xl font-black">Padel Fit Advisor</CardTitle>
              <CardDescription className="text-blue-200 text-xs sm:text-sm mt-1">
                Find the perfect gear fit to improve your Padel and protect your body.
              </CardDescription>
            </div>
            {step > 1 && step < 10 && (
              <span className="text-xs font-mono font-bold bg-blue-800 text-blue-100 px-2.5 py-1 rounded-full">
                {getProgress()}% Complete
              </span>
            )}
          </div>
          {step > 1 && step < 10 && (
            <Progress value={getProgress()} className="h-1.5 bg-blue-950 mt-4 [&>div]:bg-blue-400" />
          )}
        </CardHeader>

        <CardContent className="p-6 sm:p-8">
          {/* STEP 1: CATEGORY SELECTION */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-base sm:text-lg font-bold text-blue-950 text-center">What gear are you looking to find today?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button 
                  onClick={() => handleCategorySelect('shoe')}
                  className="flex flex-col items-center justify-center p-6 border border-slate-100 rounded-xl hover:border-blue-500 hover:bg-blue-50/20 transition-all duration-200 group text-center cursor-pointer"
                >
                  <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">👟</span>
                  <span className="font-bold text-blue-950 text-sm">Padel Shoes</span>
                  <span className="text-[10px] text-muted-foreground mt-1">Joint support & court grip</span>
                </button>
                <button 
                  onClick={() => handleCategorySelect('racket')}
                  className="flex flex-col items-center justify-center p-6 border border-slate-100 rounded-xl hover:border-blue-500 hover:bg-blue-50/20 transition-all duration-200 group text-center cursor-pointer"
                >
                  <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">🎾</span>
                  <span className="font-bold text-blue-950 text-sm">Padel Rackets</span>
                  <span className="text-[10px] text-muted-foreground mt-1">Elbow protection & power</span>
                </button>
                <button 
                  onClick={() => handleCategorySelect('clothing')}
                  className="flex flex-col items-center justify-center p-6 border border-slate-100 rounded-xl hover:border-blue-500 hover:bg-blue-50/20 transition-all duration-200 group text-center cursor-pointer"
                >
                  <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">👕</span>
                  <span className="font-bold text-blue-950 text-sm">Apparel</span>
                  <span className="text-[10px] text-muted-foreground mt-1">Breathable, high-comfort clothing</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: AGE BAND */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-base sm:text-lg font-bold text-blue-950 text-center">Select your age band</h3>
              <p className="text-xs text-muted-foreground text-center -mt-4">
                Joint elasticity and bone density change with age, requiring different cushioning thresholds.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {['Under 30', '30 - 45', '45+'].map((ageOption) => (
                  <Button 
                    key={ageOption}
                    variant="outline" 
                    className="py-6 border-slate-100 hover:border-blue-500 hover:bg-blue-50/10 text-blue-950 font-bold text-sm"
                    onClick={() => handleAnswer('age', ageOption)}
                  >
                    {ageOption}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: INJURY RISK */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-base sm:text-lg font-bold text-blue-950 text-center flex items-center justify-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-500" />
                Do you have any pre-existing injuries or joint pain?
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <Button 
                  variant="outline" 
                  className="py-6 justify-start px-6 border-slate-100 hover:border-blue-500 hover:bg-blue-50/10 text-blue-950 font-bold text-sm"
                  onClick={() => handleAnswer('injury', 'elbow')}
                >
                  💥 Tennis Elbow / Arm Strain (Requires soft core & handle-weight)
                </Button>
                <Button 
                  variant="outline" 
                  className="py-6 justify-start px-6 border-slate-100 hover:border-blue-500 hover:bg-blue-50/10 text-blue-950 font-bold text-sm"
                  onClick={() => handleAnswer('injury', 'knees')}
                >
                  🦵 Knee / Ankle Pain (Requires high shoe cushioning)
                </Button>
                <Button 
                  variant="outline" 
                  className="py-6 justify-start px-6 border-slate-100 hover:border-blue-500 hover:bg-blue-50/10 text-blue-950 font-bold text-sm"
                  onClick={() => handleAnswer('injury', 'none')}
                >
                  ✅ No pre-existing pain (Standard configuration)
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: PLAY FREQUENCY */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-base sm:text-lg font-bold text-blue-950 text-center">How often do you play padel?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button 
                  onClick={() => handleAnswer('frequency', 'light')}
                  className="p-5 border border-slate-100 rounded-xl hover:border-blue-500 hover:bg-blue-50/10 text-center cursor-pointer"
                >
                  <span className="block font-bold text-blue-950 text-sm">Occasional</span>
                  <span className="text-[10px] text-muted-foreground mt-1">1 - 2 times a month</span>
                </button>
                <button 
                  onClick={() => handleAnswer('frequency', 'medium')}
                  className="p-5 border border-slate-100 rounded-xl hover:border-blue-500 hover:bg-blue-50/10 text-center cursor-pointer"
                >
                  <span className="block font-bold text-blue-950 text-sm">Regular</span>
                  <span className="text-[10px] text-muted-foreground mt-1">1 - 2 times a week</span>
                </button>
                <button 
                  onClick={() => handleAnswer('frequency', 'heavy')}
                  className="p-5 border border-slate-100 rounded-xl hover:border-blue-500 hover:bg-blue-50/10 text-center cursor-pointer"
                >
                  <span className="block font-bold text-blue-950 text-sm">Competitive</span>
                  <span className="text-[10px] text-muted-foreground mt-1">3+ times a week</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: CATEGORY SPECIFIC QUESTIONS */}
          {step === 5 && (
            <div className="space-y-6">
              {category === 'shoe' && (
                <>
                  <h3 className="text-base sm:text-lg font-bold text-blue-950 text-center">What is the primary court surface you play on?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button 
                      onClick={() => handleAnswer('surface', 'sandy')}
                      className="p-5 border border-slate-100 rounded-xl hover:border-blue-500 hover:bg-blue-50/10 text-center cursor-pointer"
                    >
                      <span className="block font-bold text-blue-950 text-sm">Traditional Sandy</span>
                      <span className="text-[10px] text-muted-foreground mt-1">Visible surface sand (Requires herringbone clay sole)</span>
                    </button>
                    <button 
                      onClick={() => handleAnswer('surface', 'mondo')}
                      className="p-5 border border-slate-100 rounded-xl hover:border-blue-500 hover:bg-blue-50/10 text-center cursor-pointer"
                    >
                      <span className="block font-bold text-blue-950 text-sm">Modern Mondo Turf</span>
                      <span className="text-[10px] text-muted-foreground mt-1">Textured monofilament (Requires hybrid/Omni sole)</span>
                    </button>
                    <button 
                      onClick={() => handleAnswer('surface', 'all')}
                      className="p-5 border border-slate-100 rounded-xl hover:border-blue-500 hover:bg-blue-50/10 text-center cursor-pointer"
                    >
                      <span className="block font-bold text-blue-950 text-sm">Mixed / Multi-court</span>
                      <span className="text-[10px] text-muted-foreground mt-1">Frequent changes (Requires all-court sole)</span>
                    </button>
                  </div>
                </>
              )}

              {category === 'racket' && (
                <>
                  <h3 className="text-base sm:text-lg font-bold text-blue-950 text-center">What is your primary play style preference?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button 
                      onClick={() => handleAnswer('playStyle', 'control')}
                      className="p-5 border border-slate-100 rounded-xl hover:border-blue-500 hover:bg-blue-50/10 text-center cursor-pointer"
                    >
                      <span className="block font-bold text-blue-950 text-sm">Control & Precision</span>
                      <span className="text-[10px] text-muted-foreground mt-1">Prefers round shape, softer feel, low vibration</span>
                    </button>
                    <button 
                      onClick={() => handleAnswer('playStyle', 'power')}
                      className="p-5 border border-slate-100 rounded-xl hover:border-blue-500 hover:bg-blue-50/10 text-center cursor-pointer"
                    >
                      <span className="block font-bold text-blue-950 text-sm">Explosive Power</span>
                      <span className="text-[10px] text-muted-foreground mt-1">Prefers diamond shape, stiff carbon face</span>
                    </button>
                    <button 
                      onClick={() => handleAnswer('playStyle', 'balanced')}
                      className="p-5 border border-slate-100 rounded-xl hover:border-blue-500 hover:bg-blue-50/10 text-center cursor-pointer"
                    >
                      <span className="block font-bold text-blue-950 text-sm">All-Round Balance</span>
                      <span className="text-[10px] text-muted-foreground mt-1">Teardrop shape, medium balance</span>
                    </button>
                  </div>
                </>
              )}

              {category === 'clothing' && (
                <>
                  <h3 className="text-base sm:text-lg font-bold text-blue-950 text-center">Select Gender & Fit Preference</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button 
                      onClick={() => handleAnswer('gender', 'men')}
                      className="p-5 border border-slate-100 rounded-xl hover:border-blue-500 hover:bg-blue-50/10 text-center cursor-pointer"
                    >
                      <span className="block font-bold text-blue-950 text-sm">Men's Athletic</span>
                    </button>
                    <button 
                      onClick={() => handleAnswer('gender', 'women')}
                      className="p-5 border border-slate-100 rounded-xl hover:border-blue-500 hover:bg-blue-50/10 text-center cursor-pointer"
                    >
                      <span className="block font-bold text-blue-950 text-sm">Women's Athletic</span>
                    </button>
                    <button 
                      onClick={() => handleAnswer('gender', 'unisex')}
                      className="p-5 border border-slate-100 rounded-xl hover:border-blue-500 hover:bg-blue-50/10 text-center cursor-pointer"
                    >
                      <span className="block font-bold text-blue-950 text-sm">Relaxed / Unisex</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* STEP 6: SHOE SPECIFIC WIDTH QUESTION */}
          {step === 6 && category === 'shoe' && (
            <div className="space-y-6">
              <h3 className="text-base sm:text-lg font-bold text-blue-950 text-center">What is your typical foot width fit?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button 
                  onClick={() => handleAnswer('width', 'narrow')}
                  className="p-5 border border-slate-100 rounded-xl hover:border-blue-500 hover:bg-blue-50/10 text-center cursor-pointer"
                >
                  <span className="block font-bold text-blue-950 text-sm">Narrow / Fitted</span>
                  <span className="text-[10px] text-muted-foreground mt-1">Prefers snug support</span>
                </button>
                <button 
                  onClick={() => handleAnswer('width', 'standard')}
                  className="p-5 border border-slate-100 rounded-xl hover:border-blue-500 hover:bg-blue-50/10 text-center cursor-pointer"
                >
                  <span className="block font-bold text-blue-950 text-sm">Standard</span>
                  <span className="text-[10px] text-muted-foreground mt-1">Fits most typical shoes</span>
                </button>
                <button 
                  onClick={() => handleAnswer('width', 'wide')}
                  className="p-5 border border-slate-100 rounded-xl hover:border-blue-500 hover:bg-blue-50/10 text-center cursor-pointer"
                >
                  <span className="block font-bold text-blue-950 text-sm">Wide Toe Box</span>
                  <span className="text-[10px] text-muted-foreground mt-1">Prefers extra room in the forefoot</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 10: RECOMMENDATIONS RESULTS */}
          {step === 10 && (
            <div className="space-y-8 animate-fadeIn">
              <div className="text-center space-y-2">
                <span className="text-3xl">🎉</span>
                <h3 className="text-lg sm:text-xl font-black text-blue-950">Your Recommended Gear Fits</h3>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  Based on your age band ({answers.age}), pre-existing injury status ({answers.injury}), and playing style, these are your optimal gear recommendations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {recommendations.map((product) => {
                  const offers = offersForProduct(product.id);
                  const offer = offers[0];
                  const hasAmazonOffer = offer && offer.merchantName === 'Amazon UK';
                  return (
                    <Card key={product.id} className="flex flex-col h-full border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="h-44 w-full bg-slate-50 flex items-center justify-center p-4 relative">
                        <img src={product.imageUrl} alt={product.name} className="object-contain h-full w-full" />
                        <Badge className="absolute top-2.5 left-2.5 bg-blue-900 text-white text-[9px] font-bold border-none capitalize px-1.5 py-0.5">
                          {product.category}
                        </Badge>
                      </div>
                      <CardContent className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wider font-mono">{product.brand}</span>
                          <h4 className="font-bold text-blue-950 text-sm leading-tight mt-0.5">{product.name}</h4>
                          <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">{product.description}</p>
                        </div>
                        <div className="border-t pt-3 mt-4 space-y-2">
                          {hasAmazonOffer ? (
                            <>
                              <AffiliateDisclosure variant="amazon" />
                              <a href={offer.trackingUrl} target="_blank" rel="noopener noreferrer sponsored">
                                <Button size="sm" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold flex items-center justify-center gap-1 h-8 text-[11px]">
                                  <ExternalLink className="w-3.5 h-3.5" />
                                  Check price on Amazon
                                </Button>
                              </a>
                            </>
                          ) : offer && offer.merchantName === 'Padel Boost' ? (
                            <>
                              <AffiliateDisclosure variant="affiliate" />
                              <a href={offer.trackingUrl} target="_blank" rel="sponsored noopener noreferrer">
                                <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-1 h-8 text-[11px]">
                                  <ExternalLink className="w-3.5 h-3.5" />
                                  Check price at Padel Boost
                                </Button>
                              </a>
                            </>
                          ) : (
                            <p className="text-xs text-muted-foreground italic">Currently unavailable.</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="flex justify-center pt-4">
                <Button 
                  onClick={resetQuiz}
                  variant="outline" 
                  className="font-mono text-xs text-slate-600 border-slate-200 hover:bg-slate-50 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Retake Quiz
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
