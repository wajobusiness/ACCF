"use client";

import React from "react";
import Link from "next/link";
import { DEMO_MEMBERSHIP_TIERS } from "@/lib/demo-data/tiers";
import { Check, ShieldCheck, Sparkles, ArrowRight, Award } from "lucide-react";

export default function MembershipPage() {
  return (
    <div className="flex flex-col min-h-screen bg-accf-ivory">
      {/* Hero */}
      <section className="bg-accf-charcoal text-accf-ivory py-20 px-4 sm:px-6 lg:px-8 border-b border-accf-line">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-accf-gold font-bold">
            Digital Chair &amp; Membership
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-semibold leading-tight">
            Your Digital Chair Opens <br />
            <em className="text-accf-gold italic font-normal">The Door to Africa</em>
          </h1>
          <p className="text-base sm:text-lg text-accf-ivory/80 max-w-2xl mx-auto leading-relaxed">
            Every Digital Chair purchased on the platform represents a commitment to peace, unity, and African cultural solidarity.
          </p>
        </div>
      </section>

      {/* 3 Tiers Comparison */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {DEMO_MEMBERSHIP_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`p-8 rounded-2xl border flex flex-col justify-between transition-all ${
                tier.isPopular
                  ? "bg-accf-green-deep text-accf-ivory border-accf-gold shadow-2xl ring-2 ring-accf-gold scale-105"
                  : "bg-white text-accf-charcoal border-accf-line-dark shadow-md"
              }`}
            >
              <div className="space-y-6">
                {tier.isPopular && (
                  <div className="inline-block px-3 py-1 rounded-full bg-accf-gold text-accf-charcoal text-[10px] font-mono font-bold uppercase tracking-wider">
                    Most Popular Choice
                  </div>
                )}
                <div>
                  <h3 className="font-serif font-bold text-2xl mb-1">{tier.name}</h3>
                  <div className="text-xs text-accf-gold font-mono uppercase tracking-wider">
                    {tier.badgeLabel}
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-accf-gold">
                    {tier.priceFormatted}
                  </span>
                  <span className="text-xs text-accf-muted font-mono">/ {tier.period}</span>
                </div>

                <div className="pt-4 border-t border-accf-line/40 space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider font-semibold opacity-75">
                    Included Privileges:
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 leading-tight">
                        <Check className="w-4 h-4 text-accf-gold flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href={`/membership/checkout?tier=${tier.name}`}
                  className={`w-full py-3.5 rounded font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                    tier.isPopular
                      ? "bg-accf-gold text-accf-charcoal hover:bg-accf-gold-soft shadow-xl"
                      : "bg-accf-green text-accf-ivory hover:bg-accf-green-light"
                  }`}
                >
                  Reserve {tier.name} Seat
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Detail Grid */}
        <div className="p-8 sm:p-12 bg-accf-charcoal text-accf-ivory rounded-2xl border border-accf-line space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-accf-gold-soft">
              Every Seat Strengthens Africa
            </h3>
            <p className="text-xs sm:text-sm text-accf-ivory/70">
              When you reserve your Digital Chair, you receive an authentic diplomatic membership package recognized across our continental network.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-accf-ivory/80">
            <div className="p-4 bg-accf-charcoal-card border border-accf-line/40 rounded space-y-2">
              <Award className="w-6 h-6 text-accf-gold" />
              <h4 className="font-serif font-bold text-sm text-accf-ivory">Peace Ambassador Certificate</h4>
              <p className="leading-relaxed text-accf-ivory/60">
                Official high-resolution verifiable digital certificate signed by the ACCF council.
              </p>
            </div>
            <div className="p-4 bg-accf-charcoal-card border border-accf-line/40 rounded space-y-2">
              <ShieldCheck className="w-6 h-6 text-accf-gold" />
              <h4 className="font-serif font-bold text-sm text-accf-ivory">Permanent Tree Leaf</h4>
              <p className="leading-relaxed text-accf-ivory/60">
                Your photograph and peace pledge immortalized on the Digital Kolanut Tree monument.
              </p>
            </div>
            <div className="p-4 bg-accf-charcoal-card border border-accf-line/40 rounded space-y-2">
              <Sparkles className="w-6 h-6 text-accf-gold" />
              <h4 className="font-serif font-bold text-sm text-accf-ivory">Meet &amp; Eat Privileges</h4>
              <p className="leading-relaxed text-accf-ivory/60">
                Verified access to book and host authentic cultural home meals across 54 nations.
              </p>
            </div>
            <div className="p-4 bg-accf-charcoal-card border border-accf-line/40 rounded space-y-2">
              <Check className="w-6 h-6 text-accf-gold" />
              <h4 className="font-serif font-bold text-sm text-accf-ivory">Festival VIP Fast-Track</h4>
              <p className="leading-relaxed text-accf-ivory/60">
                Priority access and discounts to all 8 summits and arenas at Abuja 2026.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

