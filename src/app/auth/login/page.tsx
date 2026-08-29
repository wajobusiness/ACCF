"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/auth-context";
import { User, Shield, Sparkles, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { loginAsPersona, loginWithEmail, availablePersonas, user } = useAuth();
  const [email, setEmail] = useState("");

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      loginWithEmail(email);
      router.push("/dashboard");
    }
  };

  const handleSelectPersona = (id: string) => {
    loginAsPersona(id);
    router.push("/dashboard");
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
                Enter your credentials or test with an instant demo persona.
              </p>
            </div>

            <form onSubmit={handleEmailLogin} className="space-y-4 text-xs pt-2">
              <div>
                <label className="block text-accf-charcoal font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="amina.okafor@accf-demo.africa"
                  className="w-full px-3 py-2.5 bg-accf-ivory border border-accf-line-dark rounded focus:border-accf-gold text-accf-charcoal font-medium"
                />
              </div>

              <div>
                <label className="block text-accf-charcoal font-semibold mb-1">Password</label>
                <input
                  type="password"
                  required
                  defaultValue="demo-password-2026"
                  className="w-full px-3 py-2.5 bg-accf-ivory border border-accf-line-dark rounded focus:border-accf-gold text-accf-charcoal font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-widest hover:bg-accf-gold-soft transition-all shadow-md"
              >
                Sign In to Dashboard
              </button>
            </form>
          </div>

          <div className="pt-4 border-t border-accf-line-dark text-center text-xs text-accf-muted">
            Don&apos;t have a chair yet?{" "}
            <Link href="/membership/checkout" className="text-accf-green font-bold hover:underline">
              Reserve A Digital Chair →
            </Link>
          </div>
        </div>

        {/* Right: Instant 1-Click Demo Persona Selector */}
        <div className="bg-accf-charcoal text-accf-ivory rounded-3xl p-8 border border-accf-line shadow-2xl space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-accf-green text-accf-gold text-[10px] font-mono font-bold uppercase">
              <Sparkles className="w-3 h-3" />
              Interactive Demo Mode
            </div>
            <h2 className="font-serif font-bold text-xl text-accf-ivory">
              1-Click Stakeholder Personas
            </h2>
            <p className="text-xs text-accf-ivory/70 leading-relaxed">
              Instantly log in as any of the 9 simulated African stakeholder roles:
            </p>
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {availablePersonas.map((persona) => (
              <button
                key={persona.id}
                onClick={() => handleSelectPersona(persona.id)}
                className="w-full p-2.5 rounded-xl bg-accf-charcoal-card border border-accf-line/60 hover:border-accf-gold hover:bg-accf-green/40 transition-all flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={persona.photoUrl}
                    alt={persona.name}
                    className="w-8 h-8 rounded-full object-cover border border-accf-gold"
                  />
                  <div>
                    <div className="text-xs font-bold text-accf-ivory group-hover:text-accf-gold">
                      {persona.name}
                    </div>
                    <div className="text-[10px] text-accf-gold-soft font-mono">
                      {persona.tier} • {persona.country}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-accf-ivory/40 group-hover:text-accf-gold transition-colors" />
              </button>
            ))}
          </div>

          <div className="pt-2 text-[10px] font-mono text-accf-ivory/50">
            Note: Demo accounts never alter production balances or real ledgers.
          </div>
        </div>
      </div>
    </div>
  );
}

