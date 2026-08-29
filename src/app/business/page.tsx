"use client";

import React, { useState, useEffect } from "react";
import { dataProvider } from "@/lib/data-provider";
import { BusinessOpportunity } from "@/types/master-models";
import {
  Briefcase,
  TrendingUp,
  Filter,
  Plus,
  Globe2,
  CheckCircle2,
  X,
  Mail,
  ShieldCheck,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function BusinessNetworkPage() {
  const [opportunities, setOpportunities] = useState<BusinessOpportunity[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [category, setCategory] = useState<BusinessOpportunity["category"]>("Trade Partnerships");
  const [description, setDescription] = useState("");
  const [investmentRange, setInvestmentRange] = useState("$50,000 – $200,000 USD");
  const [contactInfo, setContactInfo] = useState("");
  const [postedSuccess, setPostedSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await dataProvider.getBusinessOpportunities(selectedCategory);
      setOpportunities(data);
    }
    load();
  }, [selectedCategory]);

  const handlePostOpportunity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    await dataProvider.createBusinessOpportunity({
      postedByMemberId: "mem-02",
      posterName: "Kwame Mensah",
      posterCompany: company || "Pan-African Ventures",
      category,
      country,
      title,
      description,
      investmentRange,
      contactInfo: contactInfo || "trade@accf-network.africa",
      status: "Open",
    });

    const updated = await dataProvider.getBusinessOpportunities(selectedCategory);
    setOpportunities(updated);
    setPostedSuccess(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-accf-ivory">
      {/* Hero */}
      <section className="bg-accf-charcoal text-accf-ivory py-20 px-4 sm:px-6 lg:px-8 border-b border-accf-line">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-accf-gold font-bold inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accf-green-deep border border-accf-gold/30">
            <Briefcase className="w-4 h-4" />
            Continental Trade &amp; Investment
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-semibold leading-tight">
            Africa Business Network
          </h1>
          <p className="text-sm sm:text-base text-accf-ivory/80 max-w-2xl mx-auto leading-relaxed">
            &quot;CONNECT. TRADE. INVEST. Members gain direct access to intra-African agribusiness corridors, food export deals, solar cold-chain co-investments, and cross-border trade matches under AfCFTA protocols.&quot;
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setIsPostModalOpen(true);
                setPostedSuccess(false);
              }}
              className="px-8 py-3.5 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-widest hover:bg-accf-gold-soft transition-all shadow-xl inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Post Trade Opportunity
            </button>
          </div>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="sticky top-20 z-30 bg-accf-ivory border-b border-accf-line-dark py-4 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto pb-1">
          <Filter className="w-4 h-4 text-accf-muted flex-shrink-0 mr-2" />
          {[
            "All",
            "Trade Partnerships",
            "Agribusiness Investments",
            "Food Export Networks",
            "Food Technology",
          ].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-accf-green text-accf-gold shadow"
                  : "bg-white text-accf-charcoal border border-accf-line-dark hover:border-accf-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Opportunities Board */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex-1 w-full space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {opportunities.map((opp) => (
            <div
              key={opp.id}
              className="p-8 bg-white rounded-2xl border border-accf-line-dark shadow-sm hover:shadow-xl hover:border-accf-gold transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-accf-maroon px-2.5 py-1 rounded bg-accf-maroon/10">
                    {opp.category}
                  </span>
                  <span className="text-xs font-mono font-semibold text-accf-muted">
                    {opp.country}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-xl text-accf-charcoal leading-snug">
                  {opp.title}
                </h3>

                <p className="text-xs sm:text-sm text-accf-charcoal/80 leading-relaxed">
                  {opp.description}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-mono">
                  <div className="p-2.5 bg-accf-ivory rounded border border-accf-line-dark">
                    <span className="text-[10px] text-accf-muted block">Deal / Value Range:</span>
                    <strong className="text-accf-green">{opp.investmentRange}</strong>
                  </div>
                  <div className="p-2.5 bg-accf-ivory rounded border border-accf-line-dark">
                    <span className="text-[10px] text-accf-muted block">Enterprise:</span>
                    <strong className="truncate block text-accf-charcoal">{opp.posterCompany}</strong>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-accf-line-dark flex items-center justify-between">
                <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase">
                  ● Status: {opp.status}
                </span>
                <button
                  onClick={() =>
                    alert(`Direct Matchmaking Connection: Routing inquiry to ${opp.posterCompany} (${opp.contactInfo})`)
                  }
                  className="px-4 py-2 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider hover:bg-accf-gold-soft transition-colors flex items-center gap-1.5 shadow"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Connect Partner
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* POST OPPORTUNITY MODAL */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-accf-charcoal text-accf-ivory border-2 border-accf-gold rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-accf-line pb-3">
              <h3 className="font-serif font-bold text-lg">Post Continental Trade Deal</h3>
              <button
                onClick={() => setIsPostModalOpen(false)}
                className="p-1 rounded text-accf-ivory/60 hover:text-accf-ivory"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {postedSuccess ? (
              <div className="text-center space-y-3 py-4">
                <CheckCircle2 className="w-12 h-12 text-accf-gold mx-auto" />
                <h4 className="font-serif font-bold text-xl text-accf-gold-soft">
                  Opportunity Transmitted!
                </h4>
                <p className="text-xs text-accf-ivory/80 leading-relaxed">
                  Your business deal is now visible across the Africa Business Network directory.
                </p>
                <button
                  onClick={() => setIsPostModalOpen(false)}
                  className="mt-2 px-6 py-2 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handlePostOpportunity} className="space-y-4 text-xs">
                <div>
                  <label className="block text-accf-ivory/70 mb-1">Company / Consortium Name</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Great Rift Logistics Ltd"
                    className="w-full px-3 py-2 bg-accf-charcoal-card border border-accf-line rounded text-accf-ivory focus:border-accf-gold"
                  />
                </div>

                <div>
                  <label className="block text-accf-ivory/70 mb-1">Sector Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as BusinessOpportunity["category"])}
                    className="w-full px-3 py-2 bg-accf-charcoal-card border border-accf-line rounded text-accf-ivory focus:border-accf-gold"
                  >
                    <option value="Trade Partnerships">Trade Partnerships</option>
                    <option value="Agribusiness Investments">Agribusiness Investments</option>
                    <option value="Food Export Networks">Food Export Networks</option>
                    <option value="Food Technology">Food Technology &amp; Cold Chain</option>
                  </select>
                </div>

                <div>
                  <label className="block text-accf-ivory/70 mb-1">Opportunity Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Seeking off-take partners for 500 tons of organic single-origin coffee"
                    className="w-full px-3 py-2 bg-accf-charcoal-card border border-accf-line rounded text-accf-ivory focus:border-accf-gold"
                  />
                </div>

                <div>
                  <label className="block text-accf-ivory/70 mb-1">Detailed Commercial Terms &amp; Description</label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Outline deal structure, volume requirements, certifications, and expected partnership timeline..."
                    className="w-full px-3 py-2 bg-accf-charcoal-card border border-accf-line rounded text-accf-ivory focus:border-accf-gold"
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-accf-ivory/70 mb-1">Investment / Deal Range</label>
                    <input
                      type="text"
                      value={investmentRange}
                      onChange={(e) => setInvestmentRange(e.target.value)}
                      placeholder="e.g. $100,000 – $500,000"
                      className="w-full px-3 py-2 bg-accf-charcoal-card border border-accf-line rounded text-accf-ivory focus:border-accf-gold font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-accf-ivory/70 mb-1">Official Contact Email</label>
                    <input
                      type="email"
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      placeholder="trade@company.africa"
                      className="w-full px-3 py-2 bg-accf-charcoal-card border border-accf-line rounded text-accf-ivory focus:border-accf-gold font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-widest hover:bg-accf-gold-soft transition-colors shadow-lg"
                >
                  Publish Trade Opportunity
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

