"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/auth-context";
import { User, Shield, Sparkles, Check, ArrowRight, Lock, Mail, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { loginAsPersona, loginWithEmail, availablePersonas } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await loginWithEmail(email, password);
      if (res.success && res.member) {
        if (res.member.status === "pending_activation") {
          router.push("/membership/checkout");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (err: any) {
      setError(err.message || "Failed to sign in.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPersona = async (id: string) => {
    const mem = await loginAsPersona(id);
    if (mem) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-accf-ivory py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Left: Email Login */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-accf-line-dark shadow-xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <img
              src="/images/accf-logo.jpg"
              alt="African Cultural Culinary Festival Logo"
              className="w-14 h-14 rounded-full object-contain bg-white/95 p-0.5 border-2 border-accf-gold shadow-md"
            />
            <div className="space-y-1">
              <h1 className="font-serif font-bold text-2xl text-accf-charcoal">Member Sign In</h1>
              <p className="text-xs text-accf-muted">
                Access your authoritative African Cultural Culinary Festival command center.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleEmailLogin} className="space-y-4 text-xs pt-2">
              <div>
                <label className="block text-accf-charcoal font-semibold mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-accf-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="amina.okafor@accf.africa"
                    className="w-full pl-9 pr-3 py-2.5 bg-accf-ivory border border-accf-line-dark rounded-xl focus:border-accf-gold text-accf-charcoal font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-accf-charcoal font-semibold mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-accf-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 bg-accf-ivory border border-accf-line-dark rounded-xl focus:border-accf-gold text-accf-charcoal font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-widest hover:bg-accf-gold-soft transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>{isLoading ? "Signing in..." : "Sign In to Dashboard"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="pt-4 border-t border-accf-line-dark text-center text-xs text-accf-muted space-y-2">
            <div>
              New to the platform?{" "}
              <Link href="/auth/register" className="text-accf-green font-bold hover:underline">
                Create New Account &rarr;
              </Link>
            </div>
            <div>
              <Link href="/membership" className="text-accf-gold hover:underline">
                Explore Membership Tiers &amp; Plans &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Quick Stakeholder Persona Switcher */}
        <div className="bg-accf-charcoal text-accf-ivory rounded-3xl p-8 border border-accf-line shadow-2xl space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-accf-green text-accf-gold text-[10px] font-mono font-bold uppercase">
              <Sparkles className="w-3 h-3" />
              Presentation Quick Access
            </div>
            <h2 className="font-serif font-bold text-xl text-accf-ivory">
              1-Click Stakeholder Personas
            </h2>
            <p className="text-xs text-accf-ivory/70 leading-relaxed">
              Test and demonstrate each isolated user role and wallet:
            </p>
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {availablePersonas.map((persona) => (
              <button
                key={persona.id}
                onClick={() => handleSelectPersona(persona.id)}
                className="w-full p-2.5 rounded-xl bg-accf-charcoal-card border border-accf-line hover:border-accf-gold text-left flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={persona.photoUrl}
                    alt={persona.name}
                    className="w-8 h-8 rounded-full object-cover border border-accf-gold"
                  />
                  <div>
                    <div className="font-serif font-bold text-xs text-accf-ivory group-hover:text-accf-gold">
                      {persona.name}
                    </div>
                    <div className="text-[10px] text-accf-ivory/50 font-mono">
                      {persona.tier} &bull; {persona.country}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-accf-gold group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </button>
            ))}
          </div>

          <div className="text-[11px] text-accf-ivory/50 font-mono pt-2 border-t border-accf-line">
            All user data, wallets, and notifications are strictly isolated.
          </div>
        </div>
      </div>
    </div>
  );
}
