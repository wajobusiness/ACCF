"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/auth-context";
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
} from "lucide-react";
import Link from "next/link";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { registerUser } = useAuth();

  const tierQuery = (searchParams.get("tier") as MembershipTierType) || "Standard";

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedTier, setSelectedTier] = useState<MembershipTierType>(
    ["Standard", "Premium", "Continental Ambassador"].includes(tierQuery) ? tierQuery : "Standard"
  );

  // Form State
  const [name, setName] = useState("Amina Okafor");
  const [email, setEmail] = useState("amina.okafor@example.com");
  const [country, setCountry] = useState("Nigeria");
  const [city, setCity] = useState("Lagos");
  const [photoUrl, setPhotoUrl] = useState(
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
  );
  const [pledgeText, setPledgeText] = useState(
    "Breaking the Kolanut for the peace and fraternity of all 54 African nations."
  );

  // Created Member Result
  const [createdMember, setCreatedMember] = useState<Member | null>(null);

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

  const handleSimulatedPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const newMember = await registerUser({
      name,
      email,
      country,
      city,
      photoUrl,
      tier: selectedTier,
      pledgeText,
    });
    setCreatedMember(newMember);
    setStep(4);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
    });
  };

  return (
    <div className="min-h-screen bg-accf-ivory py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Progress Rail Header */}
        <div className="text-center space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-accf-gold-soft bg-accf-green-deep inline-block px-3 py-1 rounded-full font-bold">
            Abuja 2026 • Digital Chair Reservation
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-accf-charcoal">
            Claim Your Seat For Africa
          </h1>

          {/* Stepper Dots */}
          <div className="flex items-center justify-center gap-3 pt-2 font-mono text-xs text-accf-charcoal/70">
            <span className={`px-3 py-1 rounded ${step === 1 ? "bg-accf-green text-accf-gold font-bold" : "bg-accf-ivory-dark"}`}>
              1. Choose Tier
            </span>
            <span>→</span>
            <span className={`px-3 py-1 rounded ${step === 2 ? "bg-accf-green text-accf-gold font-bold" : "bg-accf-ivory-dark"}`}>
              2. Customization
            </span>
            <span>→</span>
            <span className={`px-3 py-1 rounded ${step === 3 ? "bg-accf-green text-accf-gold font-bold" : "bg-accf-ivory-dark"}`}>
              3. Payment
            </span>
            <span>→</span>
            <span className={`px-3 py-1 rounded ${step === 4 ? "bg-accf-gold text-accf-charcoal font-bold" : "bg-accf-ivory-dark"}`}>
              4. Pass Issuance
            </span>
          </div>
        </div>

        {/* STEP 1: CHOOSE TIER */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-accf-line-dark shadow-lg space-y-6">
            <h2 className="font-serif font-bold text-2xl text-accf-charcoal">
              Step 1: Select Your Membership Tier
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  tier: "Standard" as MembershipTierType,
                  price: 20000,
                  desc: "Digital Chair, Badge, Tree Leaf, Community & Meet & Eat access.",
                },
                {
                  tier: "Premium" as MembershipTierType,
                  price: 50000,
                  desc: "VIP Festival entry, Business Directory, Marketplace discounts & masterclasses.",
                  popular: true,
                },
                {
                  tier: "Continental Ambassador" as MembershipTierType,
                  price: 100000,
                  desc: "Diplomatic title, 2km Peace Table invitation, Ministerial leadership forums.",
                },
              ].map((item) => (
                <button
                  key={item.tier}
                  type="button"
                  onClick={() => setSelectedTier(item.tier)}
                  className={`p-6 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                    selectedTier === item.tier
                      ? "bg-accf-green-deep text-accf-ivory border-accf-gold shadow-xl ring-2 ring-accf-gold"
                      : "bg-accf-ivory/50 border-accf-line-dark hover:border-accf-gold text-accf-charcoal"
                  }`}
                >
                  {item.popular && (
                    <span className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full bg-accf-gold text-accf-charcoal text-[9px] font-mono font-bold uppercase">
                      Recommended
                    </span>
                  )}
                  <div className="space-y-3">
                    <h4 className="font-serif font-bold text-lg">{item.tier}</h4>
                    <div className="font-serif font-bold text-2xl text-accf-gold">
                      {formatNGN(item.price)}
                      <span className="text-[10px] font-mono text-accf-muted font-normal"> / year</span>
                    </div>
                    <p className="text-xs opacity-80 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-accf-line/40 text-xs font-semibold flex items-center gap-1.5 text-accf-gold">
                    <span>Select this seat</span>
                    <span>→</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-8 py-3.5 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-widest hover:bg-accf-gold-soft transition-all shadow-md flex items-center gap-2"
              >
                Proceed to Customization
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: CUSTOMIZE PROFILE & PLEDGE */}
        {step === 2 && (
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-accf-line-dark shadow-lg space-y-6">
            <div className="flex items-center justify-between border-b border-accf-line-dark pb-4">
              <div>
                <h2 className="font-serif font-bold text-2xl text-accf-charcoal">
                  Step 2: Profile &amp; Peace Pledge
                </h2>
                <p className="text-xs text-accf-muted mt-1">
                  Selected Seat: <strong className="text-accf-green">{selectedTier} ({formatNGN(getTierPrice(selectedTier))})</strong>
                </p>
              </div>
              <button
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-accf-muted hover:text-accf-charcoal underline"
              >
                Change Tier
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-accf-charcoal font-semibold mb-1">Full Legal / Preferred Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-accf-ivory border border-accf-line-dark rounded focus:border-accf-gold text-accf-charcoal font-medium"
                />
              </div>

              <div>
                <label className="block text-accf-charcoal font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 bg-accf-ivory border border-accf-line-dark rounded focus:border-accf-gold text-accf-charcoal font-medium"
                />
              </div>

              <div>
                <label className="block text-accf-charcoal font-semibold mb-1">Country of Origin / Representation</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2.5 bg-accf-ivory border border-accf-line-dark rounded focus:border-accf-gold text-accf-charcoal font-medium"
                >
                  <option value="Nigeria">Nigeria 🇳🇬</option>
                  <option value="Ghana">Ghana 🇬🇭</option>
                  <option value="Kenya">Kenya 🇰🇪</option>
                  <option value="Ethiopia">Ethiopia 🇪🇹</option>
                  <option value="Rwanda">Rwanda 🇷🇼</option>
                  <option value="South Africa">South Africa 🇿🇦</option>
                  <option value="Senegal">Senegal 🇸🇳</option>
                  <option value="Morocco">Morocco 🇲🇦</option>
                  <option value="Egypt">Egypt 🇪🇬</option>
                  <option value="Tanzania">Tanzania 🇹🇿</option>
                  <option value="Cameroon">Cameroon 🇨🇲</option>
                  <option value="Côte d'Ivoire">Côte d&apos;Ivoire 🇨🇮</option>
                  <option value="Benin">Benin 🇧🇯</option>
                  <option value="Diaspora (UK)">Diaspora (UK) 🇬🇧</option>
                  <option value="Diaspora (USA)">Diaspora (USA) 🇺🇸</option>
                </select>
              </div>

              <div>
                <label className="block text-accf-charcoal font-semibold mb-1">City / Region</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2.5 bg-accf-ivory border border-accf-line-dark rounded focus:border-accf-gold text-accf-charcoal font-medium"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-accf-charcoal font-semibold mb-1">
                  Your Sacred Peace Pledge (To be engraved on your Digital Leaf &amp; Peace Wall)
                </label>
                <textarea
                  rows={3}
                  required
                  value={pledgeText}
                  onChange={(e) => setPledgeText(e.target.value)}
                  className="w-full px-3 py-2 bg-accf-ivory border border-accf-line-dark rounded focus:border-accf-gold text-accf-charcoal font-medium"
                ></textarea>
                <span className="text-[10px] text-accf-muted mt-1 block">
                  Example: &quot;Breaking the Kolanut is our sacred commitment to African unity and shared heritage.&quot;
                </span>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2.5 rounded border border-accf-line-dark text-accf-charcoal text-xs font-semibold hover:border-accf-gold"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-8 py-3.5 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-widest hover:bg-accf-gold-soft transition-all shadow-md flex items-center gap-2"
              >
                Proceed to Payment ({formatNGN(getTierPrice(selectedTier))})
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SIMULATED PAYMENT GATEWAY */}
        {step === 3 && (
          <div className="bg-accf-charcoal text-accf-ivory rounded-2xl p-6 sm:p-10 border border-accf-line shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-accf-line pb-4">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-accf-gold" />
                <h2 className="font-serif font-bold text-xl sm:text-2xl text-accf-ivory">
                  Step 3: Simulated Pan-African Payment Gateway
                </h2>
              </div>
              <div className="text-xs font-mono text-accf-gold-soft">
                Paystack / Flutterwave Adapter
              </div>
            </div>

            {/* Order Summary Box */}
            <div className="p-4 bg-accf-charcoal-card border border-accf-line/60 rounded-xl space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span>Member:</span>
                <strong className="text-accf-ivory">{name} ({country})</strong>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span>Seat Tier:</span>
                <strong className="text-accf-gold">{selectedTier} Membership</strong>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span>Validity:</span>
                <span>1 Full Year (Renewable)</span>
              </div>
              <div className="pt-2 border-t border-accf-line/40 flex justify-between items-center font-bold text-base text-accf-gold">
                <span>Total Due:</span>
                <span className="font-mono text-xl">{formatNGN(getTierPrice(selectedTier))}</span>
              </div>
            </div>

            {/* Simulated Payment Notice */}
            <div className="p-3.5 bg-accf-green-deep border border-emerald-500/40 rounded flex items-start gap-3 text-xs text-emerald-200">
              <ShieldCheck className="w-5 h-5 text-accf-gold flex-shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong>Simulated Test Environment:</strong> Clicking &quot;Authorize Simulated Payment&quot; will instantly generate your official Digital Chair credentials, QR code, and plant your leaf on the Kolanut Tree without charging real money.
              </div>
            </div>

            <form onSubmit={handleSimulatedPayment} className="space-y-4">
              <div className="grid grid-cols-3 gap-3 text-xs font-mono text-center">
                <div className="p-3 bg-accf-charcoal-card border border-accf-gold rounded text-accf-gold font-bold">
                  ● Card (NGN)
                </div>
                <div className="p-3 bg-accf-charcoal-card border border-accf-line rounded text-accf-ivory/60">
                  Bank Transfer
                </div>
                <div className="p-3 bg-accf-charcoal-card border border-accf-line rounded text-accf-ivory/60">
                  Mobile Money
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded border border-accf-line text-accf-ivory text-xs font-semibold hover:border-accf-gold"
                >
                  ← Back to Details
                </button>
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-widest hover:bg-accf-gold-soft transition-all shadow-xl flex items-center gap-2"
                >
                  Authorize Simulated Payment ({formatNGN(getTierPrice(selectedTier))})
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 4: PASS ISSUANCE & DIGITAL CHAIR CREDENTIALS */}
        {step === 4 && createdMember && (
          <div className="bg-accf-charcoal text-accf-ivory rounded-2xl p-6 sm:p-10 border border-accf-gold/60 shadow-2xl space-y-8 animate-in zoom-in-95 duration-300">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-accf-green border-2 border-accf-gold flex items-center justify-center text-accf-gold mx-auto shadow-xl">
                <Award className="w-10 h-10" />
              </div>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-accf-gold-soft">
                Welcome to the Table, {createdMember.name}!
              </h2>
              <p className="text-xs sm:text-sm text-accf-ivory/80 max-w-lg mx-auto leading-relaxed">
                Your Digital Chair is officially registered and your leaf has been planted on the African Kolanut Digital Tree.
              </p>
            </div>

            {/* Ceremonial Digital ID Card & Certificate Preview Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
              {/* Left: ID Card */}
              <div className="bg-accf-charcoal-card border-2 border-accf-gold rounded-xl p-6 space-y-5 id-card-glow relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-accf-line/60 pb-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/images/accf-logo.jpg"
                      alt="African Cultural Culinary Festival Logo"
                      className="w-8 h-8 rounded-full object-contain bg-white/95 p-0.5 border border-accf-gold shadow"
                    />
                    <span className="font-serif font-bold text-xs text-accf-ivory">African Cultural Culinary Festival</span>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-accf-gold text-accf-charcoal font-bold">
                    VERIFIED PASS
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={createdMember.photoUrl}
                    alt={createdMember.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-accf-gold shadow-md"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-lg text-accf-ivory">{createdMember.name}</h4>
                    <div className="text-xs text-accf-gold-soft font-semibold">{createdMember.tier}</div>
                    <div className="text-[10px] text-accf-ivory/60">{createdMember.city}, {createdMember.country}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 p-3 bg-accf-charcoal border border-accf-line/40 rounded text-xs font-mono">
                  <div>
                    <span className="text-[9px] text-accf-ivory/50 block">Chair ID:</span>
                    <strong className="text-accf-gold">{createdMember.chairNo}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-accf-ivory/50 block">Member Since:</span>
                    <strong className="text-accf-ivory">{createdMember.joinDate}</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-accf-line/40 flex items-center justify-between text-[10px] text-accf-ivory/70">
                  <span className="italic">{createdMember.pledgeText}</span>
                  <div className="w-7 h-7 rounded border border-accf-gold/40 bg-accf-green flex items-center justify-center text-[9px] font-mono text-accf-gold">
                    QR
                  </div>
                </div>
              </div>

              {/* Right: Peace Ambassador Certificate Card */}
              <div className="bg-accf-green-deep border border-accf-gold/50 rounded-xl p-6 space-y-4 text-center">
                <Award className="w-8 h-8 text-accf-gold mx-auto" />
                <h4 className="font-serif font-bold text-lg text-accf-gold-soft">
                  African Peace Ambassador Certificate
                </h4>
                <p className="text-xs text-accf-ivory/80 leading-relaxed">
                  This certifies that <strong>{createdMember.name}</strong> of <strong>{createdMember.country}</strong> holds official Chair <strong>{createdMember.chairNo}</strong> and is an accredited Ambassador of African Cultural Fraternity.
                </p>
                <div className="pt-4 flex flex-wrap justify-center gap-3">
                  <Link
                    href={`/members/${createdMember.id}`}
                    className="px-4 py-2 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider hover:bg-accf-gold-soft"
                  >
                    View Public Profile Pass →
                  </Link>
                  <Link
                    href="/kolanut-tree"
                    className="px-4 py-2 rounded bg-accf-charcoal border border-accf-line text-accf-ivory text-xs font-semibold hover:border-accf-gold"
                  >
                    Inspect Tree Leaf →
                  </Link>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-accf-line/40 flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/dashboard"
                className="px-6 py-3 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-widest hover:bg-accf-gold-soft"
              >
                Go to Member Command Center
              </Link>
              <Link
                href="/meet-and-eat"
                className="text-xs text-accf-gold hover:underline font-semibold"
              >
                Browse Meet &amp; Eat Hosts in {createdMember.country} →
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
    <Suspense fallback={<div className="p-12 text-center text-accf-gold">Loading Chair Reservation...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

