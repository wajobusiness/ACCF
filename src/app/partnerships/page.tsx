"use client";

import React, { useState } from "react";
import { DEMO_SPONSORS } from "@/lib/demo-data/sponsors";
import { CheckCircle2, ShieldCheck, Sparkles, Building2, Send } from "lucide-react";

export default function PartnershipsPage() {
  const [selectedTier, setSelectedTier] = useState<string>("Platinum Partner");
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-accf-ivory">
      {/* Hero */}
      <section className="bg-accf-charcoal text-accf-ivory py-20 px-4 sm:px-6 lg:px-8 border-b border-accf-line">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-accf-gold font-bold">
            Institutional Engagement
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-semibold leading-tight">
            Partner With Africa&apos;s Largest <br />
            <em className="text-accf-gold italic font-normal">Food &amp; Peace Movement</em>
          </h1>
          <p className="text-base sm:text-lg text-accf-ivory/80 max-w-2xl mx-auto leading-relaxed">
            Gain high-level diplomatic visibility across 54 African nations, engage 300 million citizens,
            and lead continental CSR, ESG, and cultural diplomacy initiatives.
          </p>
        </div>
      </section>

      {/* Tiers & Benefits Table */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-widest text-accf-maroon font-bold">
            Sponsorship Tiers (Source of Truth)
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-accf-charcoal">
            Continental Strategic Tiers
          </h2>
          <p className="text-sm text-accf-muted">
            Institutional packages structured for sovereign ministries, multinational corporations, and development finance institutions.
          </p>
        </div>

        {/* 5 Tiers Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {DEMO_SPONSORS.map((sponsor) => (
            <div
              key={sponsor.id}
              className={`p-6 rounded-xl border flex flex-col justify-between transition-all ${
                selectedTier === sponsor.tier
                  ? "bg-accf-green-deep text-accf-ivory border-accf-gold shadow-xl ring-2 ring-accf-gold"
                  : "bg-white text-accf-charcoal border-accf-line-dark hover:border-accf-gold"
              }`}
            >
              <div className="space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider font-bold text-accf-gold-soft">
                  {sponsor.tier}
                </div>
                <div className="font-serif font-bold text-xl sm:text-2xl text-accf-gold">
                  {sponsor.priceFormatted}
                </div>
                <ul className="space-y-2 text-xs pt-2">
                  {sponsor.benefits?.map((b, i) => (
                    <li key={i} className="flex items-start gap-1.5 leading-tight opacity-90">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accf-gold flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setSelectedTier(sponsor.tier)}
                className={`mt-6 w-full py-2.5 rounded font-bold text-xs uppercase tracking-wider transition-colors ${
                  selectedTier === sponsor.tier
                    ? "bg-accf-gold text-accf-charcoal hover:bg-accf-gold-soft"
                    : "bg-accf-green text-accf-ivory hover:bg-accf-green-light"
                }`}
              >
                Select Tier
              </button>
            </div>
          ))}
        </div>

        {/* Institutional Partner Lead Capture Form */}
        <div className="max-w-3xl mx-auto bg-accf-charcoal text-accf-ivory rounded-2xl p-8 sm:p-12 border border-accf-line shadow-2xl space-y-6">
          <div className="space-y-2 text-center">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accf-gold font-bold">
              <Sparkles className="w-4 h-4" />
              Executive Proposal Request
            </div>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-accf-ivory">
              Initiate Institutional Partnership
            </h3>
            <p className="text-xs sm:text-sm text-accf-ivory/70 max-w-md mx-auto">
              Our Executive Liaison Bureau will transmit the official Abuja 2026 Partnership Prospectus and coordinate a high-level briefing.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 bg-accf-green-deep border border-accf-gold rounded text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-accf-gold mx-auto" />
              <h4 className="font-serif font-bold text-xl text-accf-gold-soft">
                Partnership Inquiry Transmitted
              </h4>
              <p className="text-xs text-accf-ivory/80 max-w-sm mx-auto leading-relaxed">
                Thank you, {name} from {org}. Your interest in the <strong className="text-accf-gold">{selectedTier}</strong> has been logged into the executive secretariat queue.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-accf-ivory/70 mb-1">Executive Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Alimatu Bello"
                    className="w-full px-3 py-2.5 bg-accf-charcoal-card border border-accf-line rounded text-accf-ivory focus:border-accf-gold"
                  />
                </div>
                <div>
                  <label className="block text-accf-ivory/70 mb-1">Organization / Ministry</label>
                  <input
                    type="text"
                    required
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                    placeholder="e.g. Federal Ministry of Agriculture"
                    className="w-full px-3 py-2.5 bg-accf-charcoal-card border border-accf-line rounded text-accf-ivory focus:border-accf-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-accf-ivory/70 mb-1">Official Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="executive@organization.gov / .com"
                    className="w-full px-3 py-2.5 bg-accf-charcoal-card border border-accf-line rounded text-accf-ivory focus:border-accf-gold"
                  />
                </div>
                <div>
                  <label className="block text-accf-ivory/70 mb-1">Tier of Interest</label>
                  <select
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value)}
                    className="w-full px-3 py-2.5 bg-accf-charcoal-card border border-accf-line rounded text-accf-ivory focus:border-accf-gold"
                  >
                    <option value="Platinum Partner">Platinum Partner (₦1,000,000,000)</option>
                    <option value="Diamond Partner">Diamond Partner (₦850,000,000)</option>
                    <option value="Gold Partner">Gold Partner (₦500,000,000)</option>
                    <option value="Silver Partner">Silver Partner (₦250,000,000)</option>
                    <option value="Bronze Partner">Bronze Partner (₦150,000,000)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-accf-ivory/70 mb-1">Strategic Objective / Comments</label>
                <textarea
                  rows={3}
                  placeholder="Outline key strategic goals, pavilion size requirements, or bilateral priorities..."
                  className="w-full px-3 py-2 bg-accf-charcoal-card border border-accf-line rounded text-accf-ivory focus:border-accf-gold"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-widest hover:bg-accf-gold-soft transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Executive Partnership Inquiry
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

