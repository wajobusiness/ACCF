"use client";

import React, { useState, Suspense } from "react";
import { useAuth } from "@/lib/context/auth-context";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  UserPlus,
  ShieldCheck,
  Globe2,
  Mail,
  Lock,
  Phone,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import confetti from "canvas-confetti";

function RegisterFormContent() {
  const { registerUser } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const refCode = searchParams.get("ref") || "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [password, setPassword] = useState("");
  const [sponsorId, setSponsorId] = useState(refCode);
  const [role, setRole] = useState<"member" | "host" | "vendor" | "business">("member");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please provide your full legal name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please provide a valid email address.");
      return;
    }
    if (!agreed) {
      setError("You must agree to the ACCF Charter of African Cultural Solidarity & Terms.");
      return;
    }

    try {
      setIsSubmitting(true);
      const created = await registerUser({
        name,
        email,
        phone,
        country,
        password: password || "accf-secure-pass",
        sponsorId: sponsorId || undefined,
        role,
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      // Forward directly to Plan Selection / Checkout
      router.push(`/membership/checkout?registered=true&userId=${created.id}`);
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-accf-ivory flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <img
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=120&auto=format&fit=crop&q=80"
              alt="ACCF Official Emblem"
              className="w-16 h-16 rounded-full mx-auto border-2 border-accf-gold shadow-md object-cover"
            />
          </Link>
          <span className="text-[10px] font-mono uppercase tracking-widest text-accf-gold font-bold block">
            Digital African Cultural Movement
          </span>
          <h2 className="font-serif font-bold text-3xl text-accf-charcoal">
            Create Your Sovereign Account
          </h2>
          <p className="text-xs text-accf-muted max-w-sm mx-auto">
            Take your seat at the continental table. Connect to food, heritage, trade, and peace across 54 nations.
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-white p-8 rounded-3xl border border-accf-line-dark shadow-xl space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-xs text-red-800">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-accf-charcoal mb-1">
                Full Legal Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Amina Okafor"
                className="w-full px-3.5 py-2.5 bg-accf-ivory border border-accf-line-dark rounded-xl text-xs text-accf-charcoal focus:border-accf-gold focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-accf-charcoal mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-accf-muted absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.africa"
                    className="w-full pl-9 pr-3 py-2.5 bg-accf-ivory border border-accf-line-dark rounded-xl text-xs text-accf-charcoal focus:border-accf-gold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-accf-charcoal mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-accf-muted absolute left-3 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 800 000 0000"
                    className="w-full pl-9 pr-3 py-2.5 bg-accf-ivory border border-accf-line-dark rounded-xl text-xs text-accf-charcoal focus:border-accf-gold focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-accf-charcoal mb-1">
                  Country of Heritage / Residence
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2.5 bg-accf-ivory border border-accf-line-dark rounded-xl text-xs text-accf-charcoal focus:border-accf-gold focus:outline-none"
                >
                  <option value="Nigeria">Nigeria</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Kenya">Kenya</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="Senegal">Senegal</option>
                  <option value="Morocco">Morocco</option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="United Kingdom (Diaspora)">United Kingdom (Diaspora)</option>
                  <option value="United States (Diaspora)">United States (Diaspora)</option>
                  <option value="Canada (Diaspora)">Canada (Diaspora)</option>
                  <option value="Brazil (Diaspora)">Brazil (Diaspora)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-accf-charcoal mb-1">
                  Participation Track
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full px-3 py-2.5 bg-accf-ivory border border-accf-line-dark rounded-xl text-xs text-accf-charcoal focus:border-accf-gold focus:outline-none"
                >
                  <option value="member">General Cultural Member</option>
                  <option value="host">Cultural Culinary Host</option>
                  <option value="vendor">Marketplace Food Vendor</option>
                  <option value="business">Agribusiness / Corporate Buyer</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-accf-charcoal mb-1">
                Create Security Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-accf-muted absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-accf-ivory border border-accf-line-dark rounded-xl text-xs text-accf-charcoal focus:border-accf-gold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-accf-charcoal mb-1">
                Sponsor / Referral Chair Code (Optional)
              </label>
              <input
                type="text"
                value={sponsorId}
                onChange={(e) => setSponsorId(e.target.value)}
                placeholder="e.g. AKDT-0000001"
                className="w-full px-3.5 py-2.5 bg-accf-ivory border border-accf-line-dark rounded-xl text-xs text-accf-charcoal font-mono uppercase focus:border-accf-gold focus:outline-none"
              />
            </div>

            <div className="flex items-start gap-2.5 pt-2">
              <input
                type="checkbox"
                id="terms"
                required
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-accf-green border-accf-line-dark focus:ring-accf-gold"
              />
              <label htmlFor="terms" className="text-[11px] text-accf-muted leading-relaxed">
                I agree to the ACCF Charter of African Cultural Solidarity, Terms of Service, and pledge to support peace and unity across Africa.
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-widest hover:bg-accf-gold-soft transition-all shadow-lg flex items-center justify-center gap-2 mt-4"
            >
              <UserPlus className="w-4 h-4" />
              <span>{isSubmitting ? "Creating Account..." : "Create Account & Select Plan"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-accf-line-dark text-center text-xs text-accf-muted">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-accf-green font-bold hover:underline">
              Sign In here &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-accf-ivory flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accf-gold"></div>
        </div>
      }
    >
      <RegisterFormContent />
    </Suspense>
  );
}
