"use client";

import React, { useState, useEffect, useRef } from "react";
import { dataProvider } from "@/lib/data-provider";
import { TreeLeaf } from "@/types/master-models";
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
} from "lucide-react";
import confetti from "canvas-confetti";

export default function KolanutTreePage() {
  const [leaves, setLeaves] = useState<TreeLeaf[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedLeaf, setSelectedLeaf] = useState<TreeLeaf | null>(null);
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);

  // Form State
  const [signName, setSignName] = useState("");
  const [signCountry, setSignCountry] = useState("Nigeria");
  const [signPledge, setSignPledge] = useState("");
  const [signSuccess, setSignSuccess] = useState(false);

  // Canvas visual tree ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    async function load() {
      const data = await dataProvider.getTreeLeaves(searchQuery, selectedCountry);
      setLeaves(data);
    }
    load();
  }, [searchQuery, selectedCountry]);

  // Interactive Tree Canvas Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx = context;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 400);

    const particles: { x: number; y: number; radius: number; speedX: number; speedY: number; color: string }[] = [];
    const colors = ["#D4A017", "#163B2E", "#E8C158", "#235B48", "#FDF3D6"];

    for (let i = 0; i < 75; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Draw Tree Trunk & Branch Arcs
      ctx.strokeStyle = "rgba(212, 160, 23, 0.25)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width / 2, height);
      ctx.bezierCurveTo(width / 2, height * 0.5, width * 0.2, height * 0.3, width * 0.2, height * 0.1);
      ctx.moveTo(width / 2, height);
      ctx.bezierCurveTo(width / 2, height * 0.5, width * 0.8, height * 0.3, width * 0.8, height * 0.1);
      ctx.moveTo(width / 2, height);
      ctx.bezierCurveTo(width / 2, height * 0.4, width * 0.5, height * 0.2, width * 0.5, height * 0.05);
      ctx.stroke();

      // Connect near particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < 80) {
            ctx.strokeStyle = `rgba(212, 160, 23, ${1 - dist / 80})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particle leaves
      particles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;
      });

      animationFrameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleSignTree = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signName || !signPledge) return;

    await dataProvider.createTreeLeaf({
      memberId: `guest-${Date.now()}`,
      memberName: signName,
      chairNo: `AKDT-000${Math.floor(2600 + Math.random() * 5000)}`,
      pledgeText: signPledge,
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      country: signCountry,
      region: "West Africa",
      leafType: "gold",
    });

    const updated = await dataProvider.getTreeLeaves(searchQuery, selectedCountry);
    setLeaves(updated);
    setSignSuccess(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-accf-ivory">
      {/* Hero Header */}
      <section className="bg-accf-charcoal text-accf-ivory pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-b border-accf-line">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accf-green-deep border border-accf-gold/30 text-xs font-mono tracking-widest uppercase text-accf-gold font-bold">
              <TreePine className="w-4 h-4" />
              The Tree of Peace
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-semibold leading-tight">
              The African Kolanut <br />
              <em className="text-accf-gold italic font-normal">Digital Tree</em>
            </h1>
            <p className="text-xs sm:text-base text-accf-ivory/80 leading-relaxed">
              &quot;The African Kolanut Digital Tree is a living digital monument representing millions of Africans committed to peace and unity. Every member becomes a digital leaf on the tree. Every leaf tells a story. Every story strengthens Africa.&quot;
            </p>

            {/* Target Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 font-mono text-center">
              <div className="p-3 bg-accf-charcoal-card border border-accf-line rounded">
                <div className="text-xl sm:text-2xl font-bold text-accf-gold">300M+</div>
                <div className="text-[10px] text-accf-ivory/60 uppercase">Community Members</div>
              </div>
              <div className="p-3 bg-accf-charcoal-card border border-accf-line rounded">
                <div className="text-xl sm:text-2xl font-bold text-accf-gold">200M+</div>
                <div className="text-[10px] text-accf-ivory/60 uppercase">Peace Signatories</div>
              </div>
              <div className="p-3 bg-accf-charcoal-card border border-accf-line rounded">
                <div className="text-xl sm:text-2xl font-bold text-accf-gold">54</div>
                <div className="text-[10px] text-accf-ivory/60 uppercase">African Nations</div>
              </div>
              <div className="p-3 bg-accf-charcoal-card border border-accf-line rounded">
                <div className="text-xl sm:text-2xl font-bold text-accf-gold">100+</div>
                <div className="text-[10px] text-accf-ivory/60 uppercase">Diaspora Countries</div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setIsSignModalOpen(true);
                  setSignSuccess(false);
                }}
                className="px-8 py-3.5 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-widest hover:bg-accf-gold-soft transition-all shadow-xl inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Sign The Tree &amp; Add Your Leaf
              </button>
            </div>
          </div>

          {/* Interactive Tree Constellation Canvas */}
          <div className="relative rounded-2xl overflow-hidden bg-accf-charcoal-card border border-accf-line/60 mt-8 shadow-2xl">
            <canvas ref={canvasRef} className="w-full h-72 block" />
            <div className="absolute bottom-3 left-4 text-[10px] font-mono text-accf-gold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accf-gold animate-ping"></span>
              <span>Interactive Leaf Constellation • 54 Nations Connected</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-20 z-30 bg-accf-ivory border-b border-accf-line-dark py-4 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-accf-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search leaves by name, country, chair number, or pledge..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-accf-line-dark rounded focus:outline-none focus:border-accf-gold text-accf-charcoal font-medium"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <Filter className="w-4 h-4 text-accf-muted flex-shrink-0" />
            {["All", "Nigeria", "Ghana", "Kenya", "Ethiopia", "Rwanda", "South Africa", "Senegal", "Morocco", "Diaspora"].map(
              (country) => (
                <button
                  key={country}
                  onClick={() => setSelectedCountry(country)}
                  className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-colors ${
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

      {/* Masonry Leaf Cards Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex-1 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {leaves.map((leaf) => (
            <div
              key={leaf.id}
              onClick={() => setSelectedLeaf(leaf)}
              className="p-6 bg-white border border-accf-line-dark rounded-xl hover:border-accf-gold hover:shadow-xl transition-all cursor-pointer space-y-4 group relative overflow-hidden"
            >
              {/* Leaf Badge */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-accf-gold-soft font-bold px-2 py-0.5 rounded bg-accf-green-deep">
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
                &quot;{leaf.pledgeText}&quot;
              </blockquote>

              <div className="pt-2 border-t border-accf-line-dark flex items-center justify-between text-[10px] text-accf-muted">
                <span>Planted: {leaf.createdAt}</span>
                <span className="text-accf-green font-semibold group-hover:text-accf-gold">Inspect Leaf →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LEAF INSPECT MODAL */}
      {selectedLeaf && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-accf-charcoal border-2 border-accf-gold text-accf-ivory rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-accf-line pb-4">
              <div className="flex items-center gap-2">
                <TreePine className="w-5 h-5 text-accf-gold" />
                <h3 className="font-serif font-bold text-lg">Sacred Kolanut Leaf</h3>
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
              <div>
                <h4 className="font-serif font-bold text-xl text-accf-ivory">{selectedLeaf.memberName}</h4>
                <div className="text-xs font-mono text-accf-gold">{selectedLeaf.chairNo}</div>
                <div className="text-xs text-accf-ivory/60">{selectedLeaf.country} • {selectedLeaf.region}</div>
              </div>
            </div>

            <div className="p-4 bg-accf-charcoal-card border border-accf-line/60 rounded-xl space-y-2">
              <span className="text-[10px] font-mono uppercase text-accf-gold">Peace Pledge:</span>
              <p className="font-serif italic text-base sm:text-lg text-accf-ivory leading-snug">
                &quot;{selectedLeaf.pledgeText}&quot;
              </p>
            </div>

            <div className="flex justify-between items-center pt-2 text-xs">
              <Link
                href={`/members/${selectedLeaf.memberId}`}
                className="text-accf-gold hover:underline font-semibold"
              >
                View Full Diplomatic Pass →
              </Link>
              <button
                onClick={() => setSelectedLeaf(null)}
                className="px-4 py-2 rounded bg-accf-green text-accf-ivory font-semibold text-xs hover:bg-accf-green-light"
              >
                Close Leaf
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SIGN THE TREE MODAL */}
      {isSignModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-accf-charcoal border border-accf-line text-accf-ivory rounded-2xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-accf-line pb-3">
              <div className="flex items-center gap-2">
                <TreePine className="w-5 h-5 text-accf-gold" />
                <h3 className="font-serif font-bold text-lg">Sign The Tree of Peace</h3>
              </div>
              <button
                onClick={() => setIsSignModalOpen(false)}
                className="p-1 rounded text-accf-ivory/60 hover:text-accf-ivory"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {signSuccess ? (
              <div className="text-center space-y-4 py-4">
                <CheckCircle2 className="w-12 h-12 text-accf-gold mx-auto" />
                <h4 className="font-serif font-bold text-xl text-accf-gold-soft">
                  Your Leaf is Planted!
                </h4>
                <p className="text-xs text-accf-ivory/80 leading-relaxed">
                  Thank you, <strong>{signName}</strong>. Your pledge is now immortalized on the African Kolanut Digital Tree and streaming on the Digital Peace Wall.
                </p>
                <div className="pt-2 flex flex-col gap-2">
                  <Link
                    href="/membership/checkout"
                    className="w-full py-2.5 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider hover:bg-accf-gold-soft"
                  >
                    Upgrade to Official Chair Pass
                  </Link>
                  <button
                    onClick={() => setIsSignModalOpen(false)}
                    className="text-xs text-accf-ivory/60 hover:underline pt-1"
                  >
                    Continue Browsing Tree
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSignTree} className="space-y-4 text-xs">
                <div>
                  <label className="block text-accf-ivory/70 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={signName}
                    onChange={(e) => setSignName(e.target.value)}
                    placeholder="e.g. Kwame Mensah"
                    className="w-full px-3 py-2 bg-accf-charcoal-card border border-accf-line rounded text-accf-ivory focus:border-accf-gold font-medium"
                  />
                </div>

                <div>
                  <label className="block text-accf-ivory/70 mb-1">Country</label>
                  <select
                    value={signCountry}
                    onChange={(e) => setSignCountry(e.target.value)}
                    className="w-full px-3 py-2 bg-accf-charcoal-card border border-accf-line rounded text-accf-ivory focus:border-accf-gold"
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
                  <label className="block text-accf-ivory/70 mb-1">Your Peace Pledge</label>
                  <textarea
                    rows={3}
                    required
                    value={signPledge}
                    onChange={(e) => setSignPledge(e.target.value)}
                    placeholder="Share your message of African unity, heritage, and peace..."
                    className="w-full px-3 py-2 bg-accf-charcoal-card border border-accf-line rounded text-accf-ivory focus:border-accf-gold font-medium"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-widest hover:bg-accf-gold-soft transition-colors shadow-lg"
                >
                  Plant My Leaf on The Tree
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
