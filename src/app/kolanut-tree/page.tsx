"use client";

import React, { useState, useEffect } from "react";
import { dataProvider } from "@/lib/data-provider";
import { TreeLeaf } from "@/types/master-models";
import { LivingKolanutTree } from "@/components/tree/living-kolanut-tree";
import Link from "next/link";
import {
  TreePine,
  Search,
  Filter,
  Sparkles,
  Heart,
  Plus,
  X,
  Share2,
  CheckCircle2,
  Globe2,
  ShieldCheck,
  Award,
  ExternalLink,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function KolanutTreePage() {
  const [leaves, setLeaves] = useState<TreeLeaf[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedLeaf, setSelectedLeaf] = useState<TreeLeaf | null>(null);
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [blessingCount, setBlessingCount] = useState<Record<string, number>>({});

  // Form State
  const [signName, setSignName] = useState("");
  const [signCountry, setSignCountry] = useState("Nigeria");
  const [signRegion, setSignRegion] = useState<"West Africa" | "East Africa" | "North Africa" | "Southern Africa" | "Central Africa" | "Diaspora">("West Africa");
  const [signPledge, setSignPledge] = useState("");
  const [signSuccess, setSignSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await dataProvider.getTreeLeaves(searchQuery, selectedCountry);
      setLeaves(data);
    }
    load();
  }, [searchQuery, selectedCountry]);

  const handleSignTree = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signName.trim() || !signPledge.trim()) return;

    const newLeaf = await dataProvider.createTreeLeaf({
      memberId: `guest-${Date.now()}`,
      memberName: signName,
      chairNo: `AKDT-000${Math.floor(2600 + Math.random() * 5000)}`,
      pledgeText: signPledge,
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      country: signCountry,
      region: signRegion,
      leafType: "gold",
    });

    const updated = await dataProvider.getTreeLeaves(searchQuery, selectedCountry);
    setLeaves(updated);
    setSignSuccess(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  const handleBlessLeaf = (leafId: string) => {
    setBlessingCount((prev) => ({
      ...prev,
      [leafId]: (prev[leafId] || 0) + 1,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-accf-ivory">
      {/* ========================================================================= */}
      {/* HERO SECTION                                                             */}
      {/* ========================================================================= */}
      <section className="bg-accf-charcoal text-accf-ivory pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-b border-accf-line">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accf-green-deep border border-accf-gold/30 text-xs font-mono tracking-widest uppercase text-accf-gold font-bold">
              <TreePine className="w-4 h-4" />
              <span>The Living Monument of African Unity</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-semibold leading-tight">
              The Living African Kolanut <br />
              <em className="text-accf-gold italic font-normal">Tree of Peace</em>
            </h1>
            <p className="text-xs sm:text-base text-accf-ivory/80 leading-relaxed font-light">
              &quot;The African Kolanut Tree is a living digital monument representing 300 million Africans committed to peace and unity. Every member becomes a digital leaf on the tree. Every leaf tells a story. Every story strengthens Africa.&quot;
            </p>

            {/* Target Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 font-mono text-center">
              <div className="p-3 bg-accf-charcoal-card border border-accf-line rounded-xl">
                <div className="text-xl sm:text-2xl font-bold text-accf-gold">300M+</div>
                <div className="text-[10px] text-accf-ivory/60 uppercase">Community Leaves</div>
              </div>
              <div className="p-3 bg-accf-charcoal-card border border-accf-line rounded-xl">
                <div className="text-xl sm:text-2xl font-bold text-accf-gold">200M+</div>
                <div className="text-[10px] text-accf-ivory/60 uppercase">Peace Signatories</div>
              </div>
              <div className="p-3 bg-accf-charcoal-card border border-accf-line rounded-xl">
                <div className="text-xl sm:text-2xl font-bold text-accf-gold">54</div>
                <div className="text-[10px] text-accf-ivory/60 uppercase">Nations Canopy</div>
              </div>
              <div className="p-3 bg-accf-charcoal-card border border-accf-line rounded-xl">
                <div className="text-xl sm:text-2xl font-bold text-accf-gold">100+</div>
                <div className="text-[10px] text-accf-ivory/60 uppercase">Diaspora Roots</div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setIsSignModalOpen(true);
                  setSignSuccess(false);
                }}
                className="px-8 py-3.5 rounded-xl bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-widest hover:bg-accf-gold-soft transition-all transform hover:-translate-y-0.5 shadow-xl inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Plant Your Leaf on Africa&apos;s Tree</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* LIVING INTERACTIVE TREE STAGE                                            */}
      {/* ========================================================================= */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-6">
        {/* Regional Canopy Selector Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-4 p-4 rounded-2xl bg-white border border-accf-line-dark shadow-sm">
          <div className="flex items-center gap-2">
            <TreePine className="w-4 h-4 text-accf-green" />
            <span className="text-xs font-bold text-accf-charcoal uppercase tracking-wider font-mono">
              Canopy Filter:
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: "All", label: "Full Tree (All 54 Nations)" },
              { id: "West Africa", label: "West Africa Bough" },
              { id: "East Africa", label: "East Africa Bough" },
              { id: "Central Africa", label: "Central Africa Bough" },
              { id: "North Africa", label: "North Africa Bough" },
              { id: "Southern Africa", label: "Southern Africa Bough" },
              { id: "Diaspora", label: "Global Diaspora Crown" },
            ].map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedRegion === reg.id
                    ? "bg-accf-green text-accf-gold shadow-md font-bold"
                    : "bg-accf-ivory text-accf-charcoal hover:bg-accf-gold/20"
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Real Interactive Living Tree Canvas */}
        <LivingKolanutTree
          leaves={leaves}
          selectedRegion={selectedRegion}
          searchQuery={searchQuery}
          onSelectLeaf={(leaf) => setSelectedLeaf(leaf)}
          onOpenSignModal={() => {
            setIsSignModalOpen(true);
            setSignSuccess(false);
          }}
        />
      </section>

      {/* ========================================================================= */}
      {/* DIRECTORY & SEARCH BAR                                                   */}
      {/* ========================================================================= */}
      <section className="sticky top-20 z-30 bg-accf-ivory border-y border-accf-line-dark py-4 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-accf-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search members by name, country, chair #..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-accf-line-dark rounded-xl focus:outline-none focus:border-accf-gold text-accf-charcoal font-medium"
            />
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <Filter className="w-4 h-4 text-accf-muted flex-shrink-0" />
            {["All", "Nigeria", "Ghana", "Kenya", "Ethiopia", "Rwanda", "South Africa", "Senegal", "Morocco", "Diaspora"].map(
              (country) => (
                <button
                  key={country}
                  onClick={() => setSelectedCountry(country)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedCountry === country
                      ? "bg-accf-green text-accf-gold"
                      : "bg-white text-accf-charcoal border border-accf-line-dark hover:border-accf-gold"
                  }`}
                >
                  {country}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MASONRY LEAF CARDS DIRECTORY GRID                                         */}
      {/* ========================================================================= */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex-1 w-full space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-xl text-accf-charcoal">
            All Planted Sovereign Leaves ({leaves.length})
          </h3>
          <span className="text-xs text-accf-muted font-mono">
            Click any card to inspect or bless
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {leaves.map((leaf) => (
            <div
              key={leaf.id}
              onClick={() => setSelectedLeaf(leaf)}
              className="p-6 bg-white border border-accf-line-dark rounded-2xl hover:border-accf-gold hover:shadow-xl transition-all cursor-pointer space-y-4 group relative overflow-hidden"
            >
              {/* Leaf Badge */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-accf-gold font-bold px-2.5 py-0.5 rounded-full bg-accf-green-deep border border-accf-gold/30">
                  {leaf.chairNo}
                </span>
                <span className="text-xs text-accf-muted font-medium">{leaf.country}</span>
              </div>

              {/* Author & Photo */}
              <div className="flex items-center gap-3">
                <img
                  src={leaf.photoUrl}
                  alt={leaf.memberName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-accf-gold shadow"
                />
                <div>
                  <h3 className="font-serif font-bold text-base text-accf-charcoal group-hover:text-accf-green transition-colors">
                    {leaf.memberName}
                  </h3>
                  <div className="text-[10px] text-accf-muted font-mono">{leaf.region}</div>
                </div>
              </div>

              {/* Pledge Snippet */}
              <blockquote className="text-xs italic text-accf-charcoal/80 line-clamp-3 leading-relaxed border-l-2 border-accf-gold pl-2.5">
                &ldquo;{leaf.pledgeText}&rdquo;
              </blockquote>

              <div className="pt-2 border-t border-accf-line-dark flex items-center justify-between text-[10px] text-accf-muted">
                <span>Planted: {leaf.createdAt}</span>
                <span className="text-accf-green font-semibold group-hover:text-accf-gold flex items-center gap-1">
                  <span>Inspect Leaf</span>
                  <span>&rarr;</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* LEAF INSPECT MODAL                                                        */}
      {/* ========================================================================= */}
      {selectedLeaf && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-accf-charcoal border-2 border-accf-gold text-accf-ivory rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-accf-line pb-4">
              <div className="flex items-center gap-2">
                <TreePine className="w-5 h-5 text-accf-gold" />
                <span className="font-mono text-xs text-accf-gold uppercase font-bold tracking-widest">
                  Sovereign Leaf &bull; {selectedLeaf.chairNo}
                </span>
              </div>
              <button
                onClick={() => setSelectedLeaf(null)}
                className="p-1 rounded text-accf-ivory/60 hover:text-accf-ivory"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <img
                src={selectedLeaf.photoUrl}
                alt={selectedLeaf.memberName}
                className="w-16 h-16 rounded-full object-cover border-2 border-accf-gold shadow-lg"
              />
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-xl text-accf-ivory">
                  {selectedLeaf.memberName}
                </h3>
                <div className="text-xs text-accf-ivory/80 flex items-center gap-2 font-mono">
                  <span>{selectedLeaf.country}</span>
                  <span>&bull;</span>
                  <span className="text-accf-gold font-bold">{selectedLeaf.region}</span>
                </div>
                <div className="text-[10px] text-accf-ivory/60">
                  Planted on the Tree: {selectedLeaf.createdAt}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-accf-line space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-accf-gold block font-semibold">
                Sovereign Peace Pledge
              </span>
              <p className="font-serif italic text-sm text-accf-ivory leading-relaxed">
                &ldquo;{selectedLeaf.pledgeText}&rdquo;
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => handleBlessLeaf(selectedLeaf.id)}
                className="px-4 py-2 rounded-xl bg-accf-green border border-accf-gold/40 text-accf-gold font-bold text-xs hover:bg-accf-green-light transition-colors flex items-center gap-2"
              >
                <Heart className="w-4 h-4 fill-current text-red-400" />
                <span>Bless This Leaf ({(blessingCount[selectedLeaf.id] || 0) + 24})</span>
              </button>

              <Link
                href="/membership/checkout"
                className="px-4 py-2 rounded-xl bg-accf-gold text-accf-charcoal font-bold text-xs uppercase hover:bg-accf-gold-soft transition-all"
              >
                Take Your Seat &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SIGN THE TREE MODAL                                                      */}
      {/* ========================================================================= */}
      {isSignModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-accf-charcoal border-2 border-accf-gold text-accf-ivory rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-accf-line pb-4">
              <div className="flex items-center gap-2">
                <TreePine className="w-5 h-5 text-accf-gold" />
                <h3 className="font-serif font-bold text-lg text-accf-ivory">
                  Plant Your Leaf on Africa&apos;s Tree
                </h3>
              </div>
              <button
                onClick={() => setIsSignModalOpen(false)}
                className="p-1 rounded text-accf-ivory/60 hover:text-accf-ivory"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {signSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-accf-gold text-accf-charcoal flex items-center justify-center mx-auto shadow-xl">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif font-bold text-2xl text-accf-ivory">
                  Your Leaf Has Sprouted!
                </h4>
                <p className="text-xs text-accf-ivory/80 max-w-sm mx-auto leading-relaxed">
                  Your pledge has been added to the Living African Kolanut Tree. Your digital seat is active for peace and solidarity.
                </p>
                <button
                  onClick={() => setIsSignModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-accf-gold text-accf-charcoal font-bold text-xs uppercase"
                >
                  View Your Leaf on The Tree
                </button>
              </div>
            ) : (
              <form onSubmit={handleSignTree} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-accf-ivory/90 mb-1">
                    Your Full Name <span className="text-accf-gold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={signName}
                    onChange={(e) => setSignName(e.target.value)}
                    placeholder="e.g. Chinelo Nnamdi"
                    className="w-full px-3 py-2 bg-accf-charcoal-card border border-accf-line rounded-xl text-xs text-accf-ivory focus:border-accf-gold focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-accf-ivory/90 mb-1">
                      Country of Heritage
                    </label>
                    <select
                      value={signCountry}
                      onChange={(e) => setSignCountry(e.target.value)}
                      className="w-full px-3 py-2 bg-accf-charcoal-card border border-accf-line rounded-xl text-xs text-accf-ivory focus:border-accf-gold focus:outline-none"
                    >
                      <option value="Nigeria">Nigeria</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Kenya">Kenya</option>
                      <option value="Ethiopia">Ethiopia</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Rwanda">Rwanda</option>
                      <option value="Morocco">Morocco</option>
                      <option value="Senegal">Senegal</option>
                      <option value="United Kingdom (Diaspora)">United Kingdom (Diaspora)</option>
                      <option value="United States (Diaspora)">United States (Diaspora)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-accf-ivory/90 mb-1">
                      Continental Bough
                    </label>
                    <select
                      value={signRegion}
                      onChange={(e) => setSignRegion(e.target.value as any)}
                      className="w-full px-3 py-2 bg-accf-charcoal-card border border-accf-line rounded-xl text-xs text-accf-ivory focus:border-accf-gold focus:outline-none"
                    >
                      <option value="West Africa">West Africa Bough</option>
                      <option value="East Africa">East Africa Bough</option>
                      <option value="Central Africa">Central Africa Bough</option>
                      <option value="North Africa">North Africa Bough</option>
                      <option value="Southern Africa">Southern Africa Bough</option>
                      <option value="Diaspora">Global Diaspora Crown</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-accf-ivory/90 mb-1">
                    Your Sovereign Peace Pledge <span className="text-accf-gold">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={signPledge}
                    onChange={(e) => setSignPledge(e.target.value)}
                    placeholder="Write a sentence on what peace, food security, or cultural unity means to you..."
                    className="w-full px-3 py-2 bg-accf-charcoal-card border border-accf-line rounded-xl text-xs text-accf-ivory focus:border-accf-gold focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider hover:bg-accf-gold-soft transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Sprout Leaf on Africa&apos;s Tree</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
