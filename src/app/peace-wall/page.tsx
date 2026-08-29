"use client";

import React, { useState, useEffect } from "react";
import { dataProvider } from "@/lib/data-provider";
import { PeaceWallEntry } from "@/types/master-models";
import { HeartHandshake, Heart, Send, Plus, CheckCircle2, MessageSquare, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export default function PeaceWallPage() {
  const [entries, setEntries] = useState<PeaceWallEntry[]>([]);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await dataProvider.getPeaceWallEntries();
      setEntries(data);
    }
    load();
  }, []);

  const handleLike = async (id: string) => {
    await dataProvider.likePeaceWallEntry(id);
    const updated = await dataProvider.getPeaceWallEntries();
    setEntries(updated);
  };

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    await dataProvider.createPeaceWallEntry({
      guestName: name,
      country,
      message,
      isApproved: true,
      authorPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    });

    const updated = await dataProvider.getPeaceWallEntries();
    setEntries(updated);
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-accf-ivory">
      {/* Hero */}
      <section className="bg-accf-charcoal text-accf-ivory py-20 px-4 sm:px-6 lg:px-8 border-b border-accf-line">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-accf-gold font-bold inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accf-green-deep border border-accf-gold/30">
            <HeartHandshake className="w-4 h-4" />
            Continental Unity Stream
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-semibold leading-tight">
            The Digital Peace Wall
          </h1>
          <p className="text-sm sm:text-base text-accf-ivory/80 max-w-2xl mx-auto leading-relaxed">
            &quot;A permanent platform where Africans and global friends share messages of peace, fraternity, and cultural solidarity through the sacred medium of food.&quot;
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setIsModalOpen(true);
                setSubmitted(false);
              }}
              className="px-8 py-3.5 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-widest hover:bg-accf-gold-soft transition-all shadow-xl inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Write on the Peace Wall
            </button>
          </div>
        </div>
      </section>

      {/* Peace Wall Masonry Feed */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex-1 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="p-6 bg-white border border-accf-line-dark rounded-2xl shadow-sm hover:shadow-xl hover:border-accf-gold transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={
                        entry.authorPhoto ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
                      }
                      alt={entry.guestName || "Member"}
                      className="w-8 h-8 rounded-full object-cover border border-accf-gold"
                    />
                    <div>
                      <h4 className="font-serif font-bold text-sm text-accf-charcoal">
                        {entry.guestName || "Peace Supporter"}
                      </h4>
                      <span className="text-[10px] text-accf-muted font-mono">{entry.country}</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-accf-gold-soft px-2 py-0.5 rounded bg-accf-green-deep">
                    Verified
                  </span>
                </div>

                <blockquote className="font-serif italic text-sm sm:text-base text-accf-charcoal/90 leading-relaxed border-l-2 border-accf-gold pl-3">
                  &quot;{entry.message}&quot;
                </blockquote>
              </div>

              <div className="pt-3 border-t border-accf-line-dark flex items-center justify-between text-xs text-accf-muted">
                <span>{entry.createdAt}</span>
                <button
                  onClick={() => handleLike(entry.id)}
                  className="flex items-center gap-1 text-accf-maroon hover:scale-110 transition-transform font-mono"
                >
                  <Heart className="w-4 h-4 fill-accf-maroon" />
                  <span>{entry.likesCount}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* POST MESSAGE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-accf-charcoal border border-accf-line text-accf-ivory rounded-2xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-accf-line pb-3">
              <h3 className="font-serif font-bold text-lg">Leave Your Peace Message</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded text-accf-ivory/60 hover:text-accf-ivory"
              >
                ✕
              </button>
            </div>

            {submitted ? (
              <div className="text-center space-y-3 py-4">
                <CheckCircle2 className="w-12 h-12 text-accf-gold mx-auto" />
                <h4 className="font-serif font-bold text-xl text-accf-gold-soft">
                  Message Published!
                </h4>
                <p className="text-xs text-accf-ivory/80 leading-relaxed">
                  Your message of peace is now live on the Digital Peace Wall for all 54 African nations to see.
                </p>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-2 px-6 py-2 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handlePost} className="space-y-4 text-xs">
                <div>
                  <label className="block text-accf-ivory/70 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Amina Okafor"
                    className="w-full px-3 py-2 bg-accf-charcoal-card border border-accf-line rounded text-accf-ivory focus:border-accf-gold"
                  />
                </div>

                <div>
                  <label className="block text-accf-ivory/70 mb-1">Country</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
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
                    <option value="Diaspora (UK)">Diaspora (UK) 🇬🇧</option>
                    <option value="Diaspora (USA)">Diaspora (USA) 🇺🇸</option>
                  </select>
                </div>

                <div>
                  <label className="block text-accf-ivory/70 mb-1">Peace Message</label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. Food Has No Borders. Breaking the Kolanut brings us together."
                    className="w-full px-3 py-2 bg-accf-charcoal-card border border-accf-line rounded text-accf-ivory focus:border-accf-gold"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-widest hover:bg-accf-gold-soft transition-colors shadow-lg"
                >
                  Publish on Peace Wall
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

