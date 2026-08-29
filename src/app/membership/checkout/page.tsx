"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/auth-context";
import { dataProvider } from "@/lib/data-provider";
import { MembershipTierType, Member } from "@/types/master-models";
import { formatNGN } from "@/lib/utils";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  CreditCard,
  ShieldCheck,
  Award,
  TreePine,
  ArrowRight,
  User,
  Sparkles,
  Download,
  Share2,
  Lock,
} from "lucide-react";
import Link from "next/link";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, registerUser, updateProfile } = useAuth();

  const tierQuery = (searchParams.get("tier") as MembershipTierType) || "Standard";

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedTier, setSelectedTier] = useState<MembershipTierType>(
    ["Standard", "Premium", "Continental Ambassador"].includes(tierQuery) ? tierQuery : "Standard"
  );

  // Form State (initialized from active user if logged in)
  const [name, setName] = useState(user?.name || "Amina Okafor");
  const [email, setEmail] = useState(user?.email || "amina.okafor@example.com");
  const [country, setCountry] = useState(user?.country || "Nigeria");
  const [city, setCity] = useState(user?.city || "Lagos");
  const [photoUrl, setPhotoUrl] = useState(
    user?.photoUrl ||
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
  );
  const [pledgeText, setPledgeText] = useState(
    user?.pledgeText || "Breaking the Kolanut for the peace and fraternity of all 54 African nations."
  );
  const [paymentMethod, setPaymentMethod] = useState<"paystack" | "flutterwave" | "wallet">("paystack");
  const [isProcessing, setIsProcessing] = useState(false);

  // Created Member Result
  const [createdMember, setCreatedMember] = useState<Member | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setCountry(user.country);
      if (user.city) setCity(user.city);
      if (user.pledgeText) setPledgeText(user.pledgeText);
      if (user.photoUrl) setPhotoUrl(user.photoUrl);
    }
  }, [user]);

  const getTierPrice = (tier: MembershipTierType) => {
    switch (tier) {
      case "Continental Ambassador":
        return 100000;
      case "Premium":
        return 50000;
      default:
        return 20000;
    }
  };

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      let activeUserId = user?.id;

      if (!user) {
        // Register user if not authenticated
        const newMember = await registerUser({
          name,
          email,
          country,
          role: "member",
        });
        activeUserId = newMember.id;
      } else {
        await updateProfile({
          name,
          country,
          city,
          pledgeText,
          photoUrl,
        });
      }

      // Map tier to plan id
      const planId =
        selectedTier === "Continental Ambassador"
          ? "tier-ambassador"
          : selectedTier === "Premium"
          ? "tier-premium"
          : "tier-standard";

      const res = await dataProvider.processMembershipPayment(
        activeUserId!,
        planId,
        paymentMethod === "paystack" ? "Paystack NGN" : paymentMethod === "flutterwave" ? "Flutterwave" : "Wallet Balance"
      );

      setCreatedMember(res.member);
      setStep(4);
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.5 },
      });
    } catch (err: any) {
      alert(`Payment Processing Error: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-accf-ivory py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Progress Rail Header */}
        <div className="text-center space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-accf-gold-soft bg-accf-green-deep inline-block px-3 py-1 rounded-full font-bold">
            Abuja 2026 &bull; Digital Chair Reservation
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-accf-charcoal">
            Claim Your Seat For Africa
          </h1>

          {/* Stepper Dots */}
          <div className="flex items-center justify-center gap-3 pt-2 font-mono text-xs text-accf-charcoal/70">
            <span className={`px-3 py-1 rounded ${step === 1 ? "bg-accf-green text-accf-gold font-bold" : "bg-white border border-accf-line-dark"}`}>
              1. Choose Tier
            </span>
            <span>&rarr;</span>
            <span className={`px-3 py-1 rounded ${step === 2 ? "bg-accf-green text-accf-gold font-bold" : "bg-white border border-accf-line-dark"}`}>
              2. Customization
            </span>
            <span>&rarr;</span>
            <span className={`px-3 py-1 rounded ${step === 3 ? "bg-accf-green text-accf-gold font-bold" : "bg-white border border-accf-line-dark"}`}>
              3. Secure Payment
            </span>
            <span>&rarr;</span>
            <span className={`px-3 py-1 rounded ${step === 4 ? "bg-accf-green text-accf-gold font-bold" : "bg-white border border-accf-line-dark"}`}>
              4. Pass Issued
            </span>
          </div>
        </div>

        {/* STEP 1: SELECT TIER */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  tier: "Standard" as MembershipTierType,
                  name: "Standard Chair",
                  price: 20000,
                  desc: "Individual cultural seat, leaf on the Kolanut Tree, and physical pass.",
                  color: "border-accf-line-dark",
                },
                {
                  tier: "Premium" as MembershipTierType,
                  name: "Premium Chair",
                  price: 50000,
                  desc: "VIP seating at 2km Peace Table, summit access, and 15% marketplace discount.",
                  color: "border-accf-gold shadow-md",
                  popular: true,
                },
                {
                  tier: "Continental Ambassador" as MembershipTierType,
                  name: "Continental Ambassador",
                  price: 100000,
                  desc: "Diplomatic zone credential, national delegation leader, and private banquet reception.",
                  color: "border-accf-maroon",
                },
              ].map((item) => (
                <div
                  key={item.tier}
                  onClick={() => setSelectedTier(item.tier)}
                  className={`bg-white rounded-2xl p-6 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    selectedTier === item.tier
                      ? "border-accf-green shadow-xl ring-2 ring-accf-green"
                      : `${item.color} hover:border-accf-gold`
                  }`}
                >
                  <div className="space-y-3">
                    {item.popular && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accf-gold text-accf-charcoal font-bold uppercase">
                        Most Popular
                      </span>
                    )}
                    <h3 className="font-serif font-bold text-xl text-accf-charcoal">{item.name}</h3>
                    <div className="font-serif font-bold text-2xl text-accf-green">
                      {formatNGN(item.price)}
                      <span className="text-xs text-accf-muted font-normal"> / year</span>
                    </div>
                    <p className="text-xs text-accf-muted leading-relaxed">{item.desc}</p>
                  </div>

                  <div className="pt-6">
                    <button
                      type="button"
                      className={`w-full py-2.5 rounded font-bold text-xs uppercase tracking-wider ${
                        selectedTier === item.tier
                          ? "bg-accf-green text-accf-gold"
                          : "bg-accf-ivory text-accf-charcoal border border-accf-line-dark"
                      }`}
                    >
                      {selectedTier === item.tier ? "Selected" : "Select Tier"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-8 py-3.5 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-widest hover:bg-accf-gold-soft transition-all shadow-lg flex items-center gap-2"
              >
                <span>Continue to Customization</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: CUSTOMIZE DIGITAL CHAIR & IDENTITY */}
        {step === 2 && (
          <div className="bg-white rounded-3xl p-8 border border-accf-line-dark shadow-xl space-y-6">
            <h2 className="font-serif font-bold text-2xl text-accf-charcoal">
              Customize Your Sovereign Digital Chair
            </h2>
            <p className="text-xs text-accf-muted">
              Your name and peace pledge will be engraved on your verifiable Digital Pass and planted on the African Kolanut Tree.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-accf-charcoal mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-accf-ivory border border-accf-line-dark rounded-xl text-accf-charcoal focus:border-accf-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-accf-charcoal mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-accf-ivory border border-accf-line-dark rounded-xl text-accf-charcoal focus:border-accf-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-accf-charcoal mb-1">Country of Representation</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-accf-ivory border border-accf-line-dark rounded-xl text-accf-charcoal focus:border-accf-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-accf-charcoal mb-1">City / Base</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-accf-ivory border border-accf-line-dark rounded-xl text-accf-charcoal focus:border-accf-gold focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-accf-charcoal mb-1">
                  Peace Pledge (Recorded to Kolanut Tree)
                </label>
                <textarea
                  rows={2}
                  value={pledgeText}
                  onChange={(e) => setPledgeText(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-accf-ivory border border-accf-line-dark rounded-xl text-accf-charcoal focus:border-accf-gold focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-accf-line-dark">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-accf-muted hover:text-accf-charcoal"
              >
                &larr; Change Tier
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-8 py-3.5 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-widest hover:bg-accf-gold-soft transition-all shadow-lg flex items-center gap-2"
              >
                <span>Proceed to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PAYMENT & ACTIVATION */}
        {step === 3 && (
          <div className="bg-white rounded-3xl p-8 border border-accf-line-dark shadow-xl space-y-6">
            <div className="space-y-1">
              <h2 className="font-serif font-bold text-2xl text-accf-charcoal">
                Confirm &amp; Authorize Seat Activation
              </h2>
              <p className="text-xs text-accf-muted">
                Authoritative payment gateway execution. Generates immutable ledger records and issues verified credentials.
              </p>
            </div>

            {/* Order Summary */}
            <div className="p-5 bg-accf-ivory rounded-2xl border border-accf-line-dark space-y-3 font-mono text-xs">
              <div className="flex justify-between pb-2 border-b border-accf-line-dark">
                <span>Selected Plan:</span>
                <strong className="text-accf-charcoal">{selectedTier} Membership</strong>
              </div>
              <div className="flex justify-between pb-2 border-b border-accf-line-dark">
                <span>Delegate Name:</span>
                <strong className="text-accf-charcoal">{name} ({country})</strong>
              </div>
              <div className="flex justify-between text-sm font-bold">
                <span>Total Due:</span>
                <strong className="text-accf-green text-base">{formatNGN(getTierPrice(selectedTier))}</strong>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-accf-charcoal">Select Payment Gateway</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {[
                  { id: "paystack", name: "Paystack (Debit/Credit/Bank)", icon: CreditCard },
                  { id: "flutterwave", name: "Flutterwave (Pan-African Currencies)", icon: ShieldCheck },
                  { id: "wallet", name: "ACCF Wallet Balance", icon: Award },
                ].map((pm) => {
                  const Icon = pm.icon;
                  const isSel = paymentMethod === pm.id;
                  return (
                    <div
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        isSel
                          ? "bg-accf-green text-accf-gold border-accf-gold shadow"
                          : "bg-accf-ivory text-accf-charcoal border-accf-line-dark hover:border-accf-gold"
                      }`}
                    >
                      <Icon className="w-5 h-5 mb-1.5" />
                      <div className="font-semibold">{pm.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleProcessPayment} className="pt-4 border-t border-accf-line-dark flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs text-accf-muted hover:text-accf-charcoal"
              >
                &larr; Back
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="px-8 py-3.5 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-widest hover:bg-accf-gold-soft transition-all shadow-xl flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>{isProcessing ? "Processing Activation..." : `Authorize ${formatNGN(getTierPrice(selectedTier))}`}</span>
              </button>
            </form>
          </div>
        )}

        {/* STEP 4: PASS ISSUED & ACTIVATED */}
        {step === 4 && createdMember && (
          <div className="space-y-8 animate-in zoom-in-95">
            <div className="p-8 bg-accf-green-deep text-accf-ivory rounded-3xl border-2 border-accf-gold shadow-2xl text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-accf-gold mx-auto" />
              <h2 className="font-serif font-bold text-3xl text-accf-gold-soft">
                Digital Chair Officially Activated!
              </h2>
              <p className="text-xs sm:text-sm text-accf-ivory/90 max-w-lg mx-auto leading-relaxed">
                Welcome to the continental movement, <strong>{createdMember.name}</strong>. Your membership is active and your seat sequence is permanently registered on the African Kolanut Tree.
              </p>
            </div>

            {/* Generated Verifiable Pass Card */}
            <div className="flex justify-center">
              <div className="w-full max-w-md bg-accf-charcoal text-accf-ivory rounded-3xl p-8 border-2 border-accf-gold shadow-2xl space-y-6 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-accf-line pb-4">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/images/accf-logo.jpg"
                      alt="ACCF Logo"
                      className="w-9 h-9 rounded-full object-contain bg-white/95 p-0.5 border border-accf-gold shadow"
                    />
                    <div>
                      <div className="font-serif font-bold text-sm text-accf-ivory">African Cultural Culinary Festival</div>
                      <div className="text-[9px] font-mono tracking-widest text-accf-gold uppercase">
                        Official Diplomatic Pass
                      </div>
                    </div>
                  </div>
                  <div className="px-2 py-0.5 rounded bg-accf-gold text-accf-charcoal text-[9px] font-mono font-bold uppercase">
                    ACTIVE
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={createdMember.photoUrl}
                    alt={createdMember.name}
                    className="w-18 h-18 rounded-full object-cover border-2 border-accf-gold shadow-md"
                  />
                  <div>
                    <h3 className="font-serif font-bold text-xl text-accf-ivory">{createdMember.name}</h3>
                    <div className="text-xs font-semibold text-accf-gold-soft">{createdMember.tier}</div>
                    <div className="text-[11px] text-accf-ivory/60">{createdMember.city ? `${createdMember.city}, ` : ""}{createdMember.country}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3.5 bg-accf-charcoal-card border border-accf-line/60 rounded-xl text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-accf-ivory/50 block">Chair ID:</span>
                    <strong className="text-accf-gold">{createdMember.chairNo}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-accf-ivory/50 block">Join Date:</span>
                    <strong className="text-accf-ivory">{createdMember.joinDate}</strong>
                  </div>
                </div>

                <div className="p-3 bg-accf-green-deep border border-accf-line/60 rounded-lg text-xs italic text-accf-ivory/90">
                  &ldquo;{createdMember.pledgeText}&rdquo;
                </div>
              </div>
            </div>

            {/* Next Action CTAs */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link
                href="/onboarding"
                className="px-8 py-3.5 rounded-xl bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-widest hover:bg-accf-gold-soft transition-all shadow-xl text-center"
              >
                Proceed to Guided Onboarding &rarr;
              </Link>
              <Link
                href="/dashboard"
                className="px-8 py-3.5 rounded-xl bg-accf-green text-accf-ivory font-bold text-xs uppercase tracking-widest hover:bg-accf-green-light transition-all shadow-xl text-center"
              >
                Enter Platform Dashboard &rarr;
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center text-accf-gold">Loading Checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
