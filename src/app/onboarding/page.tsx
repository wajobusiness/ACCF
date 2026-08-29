"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/auth-context";
import { dataProvider } from "@/lib/data-provider";
import { Member } from "@/types/master-models";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Circle,
  Play,
  User,
  Store,
  Compass,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Award,
  Video,
  X,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function OnboardingPage() {
  const { user, onboarding, refreshOnboarding, updateProfile } = useAuth();
  const router = useRouter();

  const [activeStep, setActiveStep] = useState<number>(1);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Profile Form State
  const [bio, setBio] = useState(user?.bio || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [foodInterests, setFoodInterests] = useState<string[]>(user?.foodInterests || ["Ancient Grains", "West African Soups"]);
  const [culturalInterests, setCulturalInterests] = useState<string[]>(user?.culturalInterests || ["Kolanut Ceremonies", "Pan-African Peace"]);

  // Business Track State
  const [businessRole, setBusinessRole] = useState<Member["role"]>(user?.role || "member");

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  const handleCompleteTour = async () => {
    if (user) {
      await dataProvider.updateOnboardingProgress(user.id, { watchedTour: true });
      await refreshOnboarding();
      setShowVideoModal(false);
      setActiveStep(2);
      confetti({ particleCount: 50, spread: 60 });
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      await updateProfile({
        bio,
        phone,
        foodInterests,
        culturalInterests,
      });
      await dataProvider.updateOnboardingProgress(user.id, { profileCompleted: true });
      await refreshOnboarding();
      setActiveStep(3);
      confetti({ particleCount: 50, spread: 60 });
    }
  };

  const handleSaveBusinessTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      await updateProfile({
        role: businessRole,
        isHost: businessRole === "host",
        isVendor: businessRole === "vendor",
      });
      await dataProvider.updateOnboardingProgress(user.id, {
        businessSetup: true,
        firstActionCompleted: true,
        isCompleted: true,
      });
      await refreshOnboarding();
      confetti({ particleCount: 100, spread: 80 });
      router.push("/dashboard");
    }
  };

  const handleSkipToDashboard = async () => {
    if (user) {
      await dataProvider.updateOnboardingProgress(user.id, { isCompleted: true });
      await refreshOnboarding();
      router.push("/dashboard");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-accf-ivory py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Welcome Card */}
        <div className="bg-accf-charcoal text-accf-ivory rounded-3xl p-8 sm:p-10 border-2 border-accf-gold shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-accf-line pb-6">
            <div className="flex items-center gap-4">
              <img
                src={user.photoUrl}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-accf-gold shadow-md"
              />
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-accf-gold font-bold">
                  Welcome to the Platform
                </div>
                <h1 className="font-serif font-bold text-2xl sm:text-3xl text-accf-ivory">
                  Greetings, {user.name}
                </h1>
                <div className="text-xs font-mono text-accf-gold-soft">
                  Chair ID: {user.chairNo} &bull; {user.country}
                </div>
              </div>
            </div>

            <button
              onClick={handleSkipToDashboard}
              className="text-xs text-accf-ivory/60 hover:text-accf-gold underline self-start sm:self-center"
            >
              Skip to Dashboard &rarr;
            </button>
          </div>

          <p className="text-xs sm:text-sm text-accf-ivory/80 max-w-2xl leading-relaxed">
            &quot;You&apos;re all set! Let&apos;s get your digital profile, culinary interests, and sovereign delegation preferences configured for the Abuja 2026 Continental Movement.&quot;
          </p>

          {/* Onboarding Steps Progress Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs">
            <div className="p-3 bg-accf-green-deep border border-accf-gold/50 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-accf-gold flex-shrink-0" />
              <div>
                <div className="text-[9px] text-accf-ivory/50 uppercase">Step 1</div>
                <span className="text-accf-ivory font-bold">Account Created</span>
              </div>
            </div>

            <div className="p-3 bg-accf-green-deep border border-accf-gold/50 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-accf-gold flex-shrink-0" />
              <div>
                <div className="text-[9px] text-accf-ivory/50 uppercase">Step 2</div>
                <span className="text-accf-ivory font-bold">{user.tier} Active</span>
              </div>
            </div>

            <div
              className={`p-3 rounded-xl border flex items-center gap-2 ${
                onboarding?.watchedTour
                  ? "bg-accf-green-deep border-accf-gold/50"
                  : "bg-accf-charcoal-card border-accf-line"
              }`}
            >
              {onboarding?.watchedTour ? (
                <CheckCircle2 className="w-4 h-4 text-accf-gold flex-shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-accf-gold/60 flex-shrink-0" />
              )}
              <div>
                <div className="text-[9px] text-accf-ivory/50 uppercase">Step 3</div>
                <span className="text-accf-ivory font-bold">Platform Tour</span>
              </div>
            </div>

            <div
              className={`p-3 rounded-xl border flex items-center gap-2 ${
                onboarding?.profileCompleted
                  ? "bg-accf-green-deep border-accf-gold/50"
                  : "bg-accf-charcoal-card border-accf-line"
              }`}
            >
              {onboarding?.profileCompleted ? (
                <CheckCircle2 className="w-4 h-4 text-accf-gold flex-shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-accf-gold/60 flex-shrink-0" />
              )}
              <div>
                <div className="text-[9px] text-accf-ivory/50 uppercase">Step 4</div>
                <span className="text-accf-ivory font-bold">Setup Profile</span>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 1: WATCH PLATFORM TOUR */}
        {activeStep === 1 && (
          <div className="bg-white rounded-3xl p-8 border border-accf-line-dark shadow-xl space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-widest text-accf-maroon font-bold">
                Guided Orientation
              </div>
              <h2 className="font-serif font-bold text-2xl text-accf-charcoal">
                Explore The ACCF Continental Architecture
              </h2>
              <p className="text-xs sm:text-sm text-accf-muted leading-relaxed">
                Take a quick interactive walkthrough to understand how your Digital Chair, Private Wallet, Kolanut Tree Leaf, 2km Peace Table accreditation, and CRM work together.
              </p>
            </div>

            {/* Video Preview Card */}
            <div
              onClick={() => setShowVideoModal(true)}
              className="relative h-64 rounded-2xl overflow-hidden border border-accf-line-dark group cursor-pointer shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&auto=format&fit=crop&q=80"
                alt="Platform Tour Preview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 rounded-full bg-accf-gold text-accf-charcoal flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 fill-accf-charcoal ml-1" />
                </div>
                <span className="font-mono text-xs text-accf-ivory font-bold tracking-wider uppercase">
                  Click to Watch 2-Minute Platform Walkthrough
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-4 bg-accf-ivory rounded-xl border border-accf-line-dark">
                <strong className="text-accf-charcoal block mb-1">💳 Private Wallet</strong>
                <p className="text-accf-muted text-[11px]">Authoritative ledger tracking deposits, withdrawals, and earnings.</p>
              </div>
              <div className="p-4 bg-accf-ivory rounded-xl border border-accf-line-dark">
                <strong className="text-accf-charcoal block mb-1">🌿 Kolanut Tree</strong>
                <p className="text-accf-muted text-[11px]">54-nation constellation where your peace pledge is permanently anchored.</p>
              </div>
              <div className="p-4 bg-accf-ivory rounded-xl border border-accf-line-dark">
                <strong className="text-accf-charcoal block mb-1">🍽️ 2km Peace Table</strong>
                <p className="text-accf-muted text-[11px]">10,000-seat banquet blueprint with diplomatic accreditation zones.</p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-accf-line-dark">
              <button
                onClick={handleSkipToDashboard}
                className="text-xs text-accf-muted hover:text-accf-charcoal"
              >
                Skip Walkthrough
              </button>
              <button
                onClick={handleCompleteTour}
                className="px-6 py-3 rounded-xl bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider hover:bg-accf-gold-soft transition-all shadow-md flex items-center gap-2"
              >
                <span>Continue to Profile Setup</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PROFILE SETUP */}
        {activeStep === 2 && (
          <div className="bg-white rounded-3xl p-8 border border-accf-line-dark shadow-xl space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-widest text-accf-maroon font-bold">
                Step 2 of 3
              </div>
              <h2 className="font-serif font-bold text-2xl text-accf-charcoal">
                Complete Your Continental Profile
              </h2>
              <p className="text-xs sm:text-sm text-accf-muted leading-relaxed">
                Tell the community about your culinary passions, heritage roots, and hospitality background.
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-accf-charcoal mb-1">
                  Personal Biography / Heritage Statement
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Share a short bio about your connection to African culture, culinary traditions, and peace..."
                  className="w-full px-3.5 py-2.5 bg-accf-ivory border border-accf-line-dark rounded-xl text-accf-charcoal focus:border-accf-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-accf-charcoal mb-1">
                  Direct Phone / WhatsApp Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+234 803 123 4567"
                  className="w-full px-3.5 py-2.5 bg-accf-ivory border border-accf-line-dark rounded-xl text-accf-charcoal focus:border-accf-gold focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-semibold text-accf-charcoal">
                  Culinary Interests &amp; Indigenous Food Traditions
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Ancient Grains & Fonio",
                    "West African Soups",
                    "North African Tagines",
                    "Swahili Coastal Curries",
                    "Ethiopian Sourdough Injera",
                    "Southern Braai & Roasts",
                    "Artisanal Spices & Peppers",
                    "Wild Honey & Fermentations",
                  ].map((interest) => {
                    const isSelected = foodInterests.includes(interest);
                    return (
                      <button
                        type="button"
                        key={interest}
                        onClick={() => {
                          if (isSelected) {
                            setFoodInterests(foodInterests.filter((i) => i !== interest));
                          } else {
                            setFoodInterests([...foodInterests, interest]);
                          }
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                          isSelected
                            ? "bg-accf-green text-accf-gold shadow"
                            : "bg-accf-ivory text-accf-charcoal border border-accf-line-dark hover:border-accf-gold"
                        }`}
                      >
                        {isSelected ? "✓ " : "+ "} {interest}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-accf-line-dark">
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="text-xs text-accf-muted hover:text-accf-charcoal"
                >
                  &larr; Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider hover:bg-accf-gold-soft transition-all shadow-md flex items-center gap-2"
                >
                  <span>Save &amp; Choose Participation Track</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3: BUSINESS TRACK & PLATFORM ACTIVATION */}
        {activeStep === 3 && (
          <div className="bg-white rounded-3xl p-8 border border-accf-line-dark shadow-xl space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-widest text-accf-maroon font-bold">
                Step 3 of 3
              </div>
              <h2 className="font-serif font-bold text-2xl text-accf-charcoal">
                Select Your Primary Platform Activity
              </h2>
              <p className="text-xs sm:text-sm text-accf-muted leading-relaxed">
                Choose how you intend to engage with the ACCF ecosystem. You can expand into other modules at any time from your dashboard.
              </p>
            </div>

            <form onSubmit={handleSaveBusinessTrack} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    id: "member",
                    title: "Cultural Member & Delegate",
                    desc: "Participate in summits, explore 1,000 recipes, book dining experiences, and plant leaves on the Kolanut Tree.",
                    icon: User,
                  },
                  {
                    id: "host",
                    title: "Cultural Dining Host",
                    desc: "Host authentic home-cooked meals in your city, welcome international travelers, and earn hospitality revenue.",
                    icon: Compass,
                  },
                  {
                    id: "vendor",
                    title: "Marketplace Vendor",
                    desc: "Sell authentic African spices, grains, cookware, and crafts with direct wallet payouts.",
                    icon: Store,
                  },
                  {
                    id: "business",
                    title: "Agribusiness & B2B Partner",
                    desc: "Access AfCFTA trade deal flow, investment matchmaking, and cross-border food tech partnerships.",
                    icon: ShieldCheck,
                  },
                ].map((track) => {
                  const Icon = track.icon;
                  const isSelected = businessRole === track.id;
                  return (
                    <div
                      key={track.id}
                      onClick={() => setBusinessRole(track.id as any)}
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer space-y-2 ${
                        isSelected
                          ? "bg-accf-charcoal text-accf-ivory border-accf-gold shadow-xl"
                          : "bg-accf-ivory text-accf-charcoal border-accf-line-dark hover:border-accf-gold"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Icon className={`w-5 h-5 ${isSelected ? "text-accf-gold" : "text-accf-green"}`} />
                        {isSelected && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accf-gold text-accf-charcoal font-bold uppercase">
                            Selected
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif font-bold text-base">{track.title}</h4>
                      <p className={`text-xs leading-relaxed ${isSelected ? "text-accf-ivory/80" : "text-accf-muted"}`}>
                        {track.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-accf-line-dark">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="text-xs text-accf-muted hover:text-accf-charcoal"
                >
                  &larr; Back
                </button>
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-widest hover:bg-accf-gold-soft transition-all shadow-xl flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Enter Platform Command Center &rarr;</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* WALKTHROUGH VIDEO MODAL */}
        {showVideoModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-accf-charcoal text-accf-ivory border-2 border-accf-gold rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-accf-line pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-accf-gold font-bold">
                  <Video className="w-4 h-4" />
                  <span>ACCF Digital Ecosystem Walkthrough</span>
                </div>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="p-1 rounded text-accf-ivory/60 hover:text-accf-ivory"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-video rounded-2xl bg-black overflow-hidden flex flex-col items-center justify-center p-8 text-center space-y-4 border border-accf-line">
                <Sparkles className="w-12 h-12 text-accf-gold animate-bounce" />
                <h3 className="font-serif font-bold text-2xl text-accf-ivory">
                  &ldquo;One Home. One Meal. One Africa.&rdquo;
                </h3>
                <p className="text-xs text-accf-ivory/75 max-w-md leading-relaxed">
                  The ACCF platform connects food culture, culinary tourism, B2B trade, and sacred peace traditions across 54 sovereign nations.
                </p>
                <div className="text-[10px] font-mono text-accf-gold">
                  Abuja 2026 Secretariat &bull; Video Master Track Active
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={handleCompleteTour}
                  className="px-6 py-2.5 rounded-xl bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider hover:bg-accf-gold-soft transition-all shadow"
                >
                  Complete Tour &amp; Continue &rarr;
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

