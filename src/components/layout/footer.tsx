"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle2, Heart, Sparkles } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-accf-charcoal text-accf-ivory border-t border-accf-line pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-accf-line">
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/images/accf-logo.jpg"
                alt="African Cultural Culinary Festival Abuja 2026 Logo"
                className="w-12 h-12 rounded-full object-contain bg-white/95 p-0.5 border-2 border-accf-gold shadow-md flex-shrink-0"
              />
              <div>
                <div className="font-serif font-bold text-lg text-accf-ivory">African Cultural</div>
                <div className="text-[11px] font-mono tracking-widest uppercase text-accf-gold font-semibold">
                  Culinary Festival
                </div>
              </div>
            </Link>
            <p className="text-xs leading-relaxed text-accf-ivory/70">
              <strong className="text-accf-gold font-semibold block mb-1">
                Breaking The Kolanut For The Peace of Africa.
              </strong>
              300 Million Africans • One Digital Community • One Peace Movement.
            </p>
            <div className="pt-2 text-[11px] text-accf-gold-soft font-mono">
              Abuja 2026 Flagship Edition
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h5 className="font-serif font-semibold text-sm tracking-wider uppercase text-accf-gold">
              Navigation
            </h5>
            <ul className="space-y-2 text-xs text-accf-ivory/75">
              <li>
                <Link href="/" className="hover:text-accf-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accf-gold transition-colors">
                  About Us & Mandate
                </Link>
              </li>
              <li>
                <Link href="/festival" className="hover:text-accf-gold transition-colors">
                  Festival 2026 (Abuja Hub)
                </Link>
              </li>
              <li>
                <Link href="/peace-table" className="hover:text-accf-gold transition-colors">
                  2km African Peace Table
                </Link>
              </li>
              <li>
                <Link href="/kolanut-tree" className="hover:text-accf-gold transition-colors">
                  African Kolanut Digital Tree
                </Link>
              </li>
              <li>
                <Link href="/meet-and-eat" className="hover:text-accf-gold transition-colors">
                  Meet & Eat Africa
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-accf-gold transition-colors">
                  African Food Movement Hubs
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="hover:text-accf-gold transition-colors">
                  Africa Marketplace
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Institutional Head */}
          <div className="space-y-3">
            <h5 className="font-serif font-semibold text-sm tracking-wider uppercase text-accf-gold">
              Institutional Head
            </h5>
            <div className="space-y-2 text-xs text-accf-ivory/75 leading-relaxed">
              <p className="font-semibold text-accf-ivory">Afrigreen & Heritage Concepts Limited</p>
              <p>Federal Capital Territory, Abuja, Nigeria</p>
              <p className="font-mono text-accf-gold-soft">+234 805 123 4567</p>
              <p className="text-accf-ivory/90">info@africanculinaryfestival.africa</p>
            </div>
            <div className="pt-2">
              <Link
                href="/partnerships"
                className="inline-flex items-center gap-1.5 text-xs text-accf-gold hover:underline font-semibold"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Institutional Sponsorship Portal →
              </Link>
            </div>
          </div>

          {/* Col 4: Newsletter Subscription */}
          <div className="space-y-3">
            <h5 className="font-serif font-semibold text-sm tracking-wider uppercase text-accf-gold">
              Movement Dispatch
            </h5>
            <p className="text-xs text-accf-ivory/70 leading-relaxed">
              Receive updates on festival delegations, chef announcements, and peace table accreditations.
            </p>
            {subscribed ? (
              <div className="p-3 bg-accf-green-deep border border-accf-gold/40 rounded flex items-center gap-2 text-xs text-accf-gold-soft">
                <CheckCircle2 className="w-4 h-4 text-accf-gold flex-shrink-0" />
                <span>Thank you! Your seat in our newsletter dispatch is confirmed.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-3 py-2 text-xs bg-accf-charcoal-card border border-accf-line rounded-l focus:outline-none focus:border-accf-gold text-accf-ivory"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-accf-gold text-accf-charcoal font-bold text-xs rounded-r hover:bg-accf-gold-soft transition-colors flex items-center justify-center"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-[10px] text-accf-ivory/50">
                  By subscribing you join 300M Africans in cultural solidarity.
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-accf-ivory/60">
          <div>
            © 2026 African Cultural Culinary Festival. All Rights Reserved. Afrigreen & Heritage Concepts Limited.
          </div>
          <div className="font-serif font-semibold text-accf-gold-soft flex items-center gap-1.5 text-center">
            <span>Food For Peace. Culture For Unity. Africa For All.</span>
            <Heart className="w-3 h-3 text-accf-maroon fill-accf-maroon inline" />
          </div>
        </div>
      </div>
    </footer>
  );
}

