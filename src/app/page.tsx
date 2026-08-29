"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Play,
  Check,
  ShieldCheck,
  Globe2,
  TreePine,
  UtensilsCrossed,
  ShoppingBag,
  HeartHandshake,
  Calendar,
  X,
} from "lucide-react";
import { useAuth } from "@/lib/context/auth-context";

export default function HomePage() {
  const { user } = useAuth();
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Live animated counters
  const [seatsCount, setSeatsCount] = useState(0);
  const [signaturesCount, setSignaturesCount] = useState(0);
  const [cuisinesCount, setCuisinesCount] = useState(0);
  const [guestsCount, setGuestsCount] = useState(0);

  useEffect(() => {
    const duration = 1800;
    const start = performance.now();

    function step(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setSeatsCount(Math.floor(ease * 300));
      setSignaturesCount(Math.floor(ease * 200));
      setCuisinesCount(Math.floor(ease * 1042));
      setGuestsCount(Math.floor(ease * 10000));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                                          */}
      {/* ========================================================================= */}
      <section className="relative bg-accf-charcoal text-accf-ivory pt-20 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient atmospheric glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[600px] h-[450px] bg-accf-gold/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-accf-green/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl space-y-6">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accf-green-deep border border-accf-gold/30 text-xs font-mono tracking-widest uppercase text-accf-gold">
              <span className="w-2 h-2 rounded-full bg-accf-gold animate-ping"></span>
              Africa&apos;s Largest Food, Culture & Peace Movement
            </div>

            {/* H1 Two-Tone Headline */}
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-semibold leading-[0.95] tracking-tight text-accf-ivory">
              Take A Seat <br />
              <em className="italic text-accf-gold font-normal">For Africa</em>
            </h1>

            {/* Subhead */}
            <div className="font-serif text-xl sm:text-2xl text-accf-gold-soft font-medium tracking-wide">
              Breaking The Kolanut For The Peace of Africa
            </div>

            {/* Lede body */}
            <p className="text-base sm:text-lg text-accf-ivory/80 max-w-2xl leading-relaxed">
              Uniting Africans through cultural and traditional cuisine to build peace, promote food security,
              celebrate heritage and create the world&apos;s largest digital food community.
            </p>

            {/* 3 CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/membership/checkout"
                className="px-7 py-3.5 rounded bg-accf-gold text-accf-charcoal font-bold text-sm uppercase tracking-wider hover:bg-accf-gold-soft transition-all transform hover:-translate-y-0.5 shadow-xl inline-flex items-center gap-2"
              >
                Take a Digital Seat
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/kolanut-tree"
                className="px-6 py-3.5 rounded bg-accf-green border border-accf-line text-accf-ivory font-semibold text-sm hover:bg-accf-green-light transition-all inline-flex items-center gap-2"
              >
                <TreePine className="w-4 h-4 text-accf-gold" />
                Join The Movement
              </Link>
              <button
                onClick={() => setVideoModalOpen(true)}
                className="px-4 py-3.5 text-sm text-accf-ivory hover:text-accf-gold transition-colors inline-flex items-center gap-2.5 group"
              >
                <span className="w-9 h-9 rounded-full border border-accf-ivory/40 group-hover:border-accf-gold flex items-center justify-center transition-colors">
                  <Play className="w-3.5 h-3.5 fill-current text-accf-gold ml-0.5" />
                </span>
                <span>Watch Documentary</span>
              </button>
            </div>
          </div>
        </div>

        {/* Seatline horizontal indicator at bottom of hero */}
        <div className="max-w-7xl mx-auto mt-16 pt-6">
          <div className="seatline filled opacity-40">
            <div className="dot"></div>
            <div className="track"></div>
            <div className="dot"></div>
            <div className="track"></div>
            <div className="dot"></div>
            <div className="track"></div>
            <div className="dot"></div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. LIVE STAT BAR (5 Counters)                                            */}
      {/* ========================================================================= */}
      <section className="bg-accf-green text-accf-ivory py-8 border-y border-accf-gold/20 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-accf-line/40">
            <div className="pt-3 md:pt-0">
              <div className="font-mono text-3xl sm:text-4xl font-bold text-accf-gold-soft">
                {seatsCount}M+
              </div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-accf-ivory/75 mt-1">
                Digital Seats Reserved
              </div>
            </div>
            <div className="pt-3 md:pt-0">
              <div className="font-mono text-3xl sm:text-4xl font-bold text-accf-gold-soft">
                {signaturesCount}M+
              </div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-accf-ivory/75 mt-1">
                Peace Signatures
              </div>
            </div>
            <div className="pt-3 md:pt-0">
              <div className="font-mono text-3xl sm:text-4xl font-bold text-accf-gold-soft">
                54
              </div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-accf-ivory/75 mt-1">
                African Countries
              </div>
            </div>
            <div className="pt-3 md:pt-0">
              <div className="font-mono text-3xl sm:text-4xl font-bold text-accf-gold-soft">
                {cuisinesCount > 0 ? cuisinesCount.toLocaleString() + "+" : "1,000+"}
              </div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-accf-ivory/75 mt-1">
                Traditional Cuisines
              </div>
            </div>
            <div className="pt-3 md:pt-0">
              <div className="font-mono text-3xl sm:text-4xl font-bold text-accf-gold-soft">
                {guestsCount > 0 ? guestsCount.toLocaleString() + "+" : "10,000+"}
              </div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-accf-ivory/75 mt-1">
                Expected Physical Guests
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. PEACE TABLE CALLOUT BANNER (Baobab Maroon Block)                      */}
      {/* ========================================================================= */}
      <section className="bg-accf-maroon text-accf-ivory py-10 px-4 sm:px-6 lg:px-8 border-b border-accf-line">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="text-xs font-mono uppercase tracking-widest text-accf-ivory/80 font-semibold">
              The Longest Multi-Cultural Dining Table In Africa
            </div>
            <div className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-accf-ivory">
              2 Kilometres
            </div>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-accf-ivory/90">
              <span><strong className="text-accf-gold-soft font-bold">10,000</strong> Accredited Guests</span>
              <span>•</span>
              <span><strong className="text-accf-gold-soft font-bold">54</strong> African Nations</span>
              <span>•</span>
              <span><strong className="text-accf-gold-soft font-bold">1,000</strong> Traditional Dishes</span>
            </div>
          </div>
          <Link
            href="/peace-table"
            className="px-6 py-3.5 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider hover:bg-accf-gold-soft transition-transform hover:scale-105 shadow-xl flex-shrink-0"
          >
            Explore Peace Table & Request Pass →
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FIVE DOORS INTO THE MOVEMENT                                          */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-accf-ivory">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-accf-maroon font-bold">
              Five Doors Into The Movement
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-accf-charcoal leading-tight">
              Everything Africa&apos;s food, heritage, and peace economy needs.
            </h2>
            <p className="text-sm sm:text-base text-accf-muted leading-relaxed">
              A comprehensive continental ecosystem designed to connect families, chefs, agribusinesses, and diplomats.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Card 01: Digital Table */}
            <Link
              href="/membership/checkout"
              className="p-6 bg-white border border-accf-line-dark rounded hover:border-accf-gold hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <span className="font-mono text-xs text-accf-maroon font-bold">01</span>
                <div className="w-10 h-10 rounded-full bg-accf-green/10 text-accf-green flex items-center justify-center group-hover:bg-accf-green group-hover:text-accf-gold transition-colors">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg text-accf-charcoal group-hover:text-accf-green">
                  Digital Table
                </h3>
                <p className="text-xs text-accf-muted leading-relaxed">
                  Take a seat at Africa&apos;s Digital Table and be part of the largest digital food community.
                </p>
              </div>
              <div className="pt-6 font-mono text-xs uppercase tracking-wider font-bold text-accf-green flex items-center gap-1 group-hover:text-accf-gold">
                <span>Learn More</span>
                <span>→</span>
              </div>
            </Link>

            {/* Card 02: Kolanut Tree */}
            <Link
              href="/kolanut-tree"
              className="p-6 bg-white border border-accf-line-dark rounded hover:border-accf-gold hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <span className="font-mono text-xs text-accf-maroon font-bold">02</span>
                <div className="w-10 h-10 rounded-full bg-accf-green/10 text-accf-green flex items-center justify-center group-hover:bg-accf-green group-hover:text-accf-gold transition-colors">
                  <TreePine className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg text-accf-charcoal group-hover:text-accf-green">
                  Kolanut Tree
                </h3>
                <p className="text-xs text-accf-muted leading-relaxed">
                  Sign the African Kolanut Digital Tree and add your permanent leaf for continental peace and unity.
                </p>
              </div>
              <div className="pt-6 font-mono text-xs uppercase tracking-wider font-bold text-accf-green flex items-center gap-1 group-hover:text-accf-gold">
                <span>Learn More</span>
                <span>→</span>
              </div>
            </Link>

            {/* Card 03: Meet & Eat Africa */}
            <Link
              href="/meet-and-eat"
              className="p-6 bg-white border border-accf-line-dark rounded hover:border-accf-gold hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <span className="font-mono text-xs text-accf-maroon font-bold">03</span>
                <div className="w-10 h-10 rounded-full bg-accf-green/10 text-accf-green flex items-center justify-center group-hover:bg-accf-green group-hover:text-accf-gold transition-colors">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg text-accf-charcoal group-hover:text-accf-green">
                  Meet &amp; Eat
                </h3>
                <p className="text-xs text-accf-muted leading-relaxed">
                  Connect with vetted hosts in 54 countries and share authentic home-cooked cultural meals.
                </p>
              </div>
              <div className="pt-6 font-mono text-xs uppercase tracking-wider font-bold text-accf-green flex items-center gap-1 group-hover:text-accf-gold">
                <span>Learn More</span>
                <span>→</span>
              </div>
            </Link>

            {/* Card 04: Festival 2026 */}
            <Link
              href="/festival"
              className="p-6 bg-white border border-accf-line-dark rounded hover:border-accf-gold hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <span className="font-mono text-xs text-accf-maroon font-bold">04</span>
                <div className="w-10 h-10 rounded-full bg-accf-green/10 text-accf-green flex items-center justify-center group-hover:bg-accf-green group-hover:text-accf-gold transition-colors">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg text-accf-charcoal group-hover:text-accf-green">
                  Festival 2026
                </h3>
                <p className="text-xs text-accf-muted leading-relaxed">
                  Join us in Abuja for the flagship African Cultural Culinary Festival: 8 summits, expos &amp; championships.
                </p>
              </div>
              <div className="pt-6 font-mono text-xs uppercase tracking-wider font-bold text-accf-green flex items-center gap-1 group-hover:text-accf-gold">
                <span>Learn More</span>
                <span>→</span>
              </div>
            </Link>

            {/* Card 05: Marketplace */}
            <Link
              href="/marketplace"
              className="p-6 bg-white border border-accf-line-dark rounded hover:border-accf-gold hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <span className="font-mono text-xs text-accf-maroon font-bold">05</span>
                <div className="w-10 h-10 rounded-full bg-accf-green/10 text-accf-green flex items-center justify-center group-hover:bg-accf-green group-hover:text-accf-gold transition-colors">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg text-accf-charcoal group-hover:text-accf-green">
                  Marketplace
                </h3>
                <p className="text-xs text-accf-muted leading-relaxed">
                  Buy, sell and trade African heirloom ingredients, spices, cookware, and cultural crafts.
                </p>
              </div>
              <div className="pt-6 font-mono text-xs uppercase tracking-wider font-bold text-accf-green flex items-center gap-1 group-hover:text-accf-gold">
                <span>Learn More</span>
                <span>→</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. RESERVE YOUR DIGITAL CHAIR SPLIT SECTION                              */}
      {/* ========================================================================= */}
      <section className="bg-accf-green-deep text-accf-ivory py-20 px-4 sm:px-6 lg:px-8 border-y border-accf-line">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Pitch & Benefits */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-accf-gold font-bold">
              Become A Member
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-accf-ivory">
              Reserve your Digital Chair.
            </h2>
            <p className="text-sm sm:text-base text-accf-ivory/80 leading-relaxed max-w-xl">
              For one seat, you get full access to the continent&apos;s leading food, culture and peace platform —
              plus a permanent leaf on the African Kolanut Digital Tree.
            </p>

            {/* Benefits Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                "Official Digital Membership Badge",
                "Personalized Profile & Chair Number",
                "Access to All Community Features",
                "Meet & Eat Cultural Exchange Network",
                "Marketplace & Business Network Access",
                "Festival Discounts & Priority Entry",
                "Digital Peace Ambassador Certificate",
                "Voting Rights on Community Projects",
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-accf-ivory/90">
                  <Check className="w-4 h-4 text-accf-gold flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Price Line */}
            <div className="pt-4 flex items-baseline gap-3">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-accf-gold">₦20,000</span>
              <span className="font-mono text-xs uppercase tracking-widest text-accf-ivory/70">
                / Year · Standard Seat
              </span>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/membership/checkout"
                className="px-7 py-3.5 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider hover:bg-accf-gold-soft transition-all shadow-lg"
              >
                Take a Seat Now
              </Link>
              <Link
                href="/membership"
                className="px-6 py-3.5 rounded border border-accf-line text-accf-ivory hover:border-accf-gold hover:text-accf-gold font-semibold text-xs transition-colors"
              >
                Compare All 3 Tiers
              </Link>
            </div>
          </div>

          {/* Right Column: Live Interactive Digital ID Card Preview */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm rounded-2xl bg-accf-charcoal-card border-2 border-accf-gold/60 p-6 shadow-2xl space-y-6 id-card-glow relative overflow-hidden">
              {/* Foil Stamp */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-accf-gold/30 to-transparent pointer-events-none rounded-tr-2xl"></div>

              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-accf-line/60 pb-4">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/accf-logo.jpg"
                    alt="African Cultural Culinary Festival Logo"
                    className="w-9 h-9 rounded-full object-contain bg-white/95 p-0.5 border border-accf-gold shadow"
                  />
                  <div>
                    <div className="font-serif font-bold text-xs text-accf-ivory">African Cultural</div>
                    <div className="text-[9px] font-mono tracking-wider text-accf-gold uppercase">
                      Diplomatic Seat
                    </div>
                  </div>
                </div>
                <div className="px-2 py-0.5 rounded bg-accf-gold text-accf-charcoal text-[10px] font-mono font-bold uppercase">
                  Official Pass
                </div>
              </div>

              {/* Card Avatar & Bio */}
              <div className="flex items-center gap-4">
                <img
                  src={user ? user.photoUrl : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"}
                  alt="Member"
                  className="w-16 h-16 rounded-full object-cover border-2 border-accf-gold shadow-md"
                />
                <div>
                  <h4 className="font-serif font-bold text-lg text-accf-ivory">
                    {user ? user.name : "Amina Okafor"}
                  </h4>
                  <div className="text-xs font-semibold text-accf-gold-soft">
                    {user?.tier === "Continental Ambassador" ? "Continental Ambassador" : "Peace Ambassador"}
                  </div>
                  <div className="text-[11px] text-accf-ivory/60">
                    {user ? user.city + ", " + user.country : "Lagos, Nigeria"}
                  </div>
                </div>
              </div>

              {/* Card Meta 4-Grid */}
              <div className="grid grid-cols-2 gap-3 p-3.5 bg-accf-charcoal/80 border border-accf-line/40 rounded-lg text-xs">
                <div>
                  <span className="text-[10px] text-accf-ivory/50 block font-mono">Chair No.</span>
                  <strong className="font-mono text-accf-gold">{user ? user.chairNo : "AKDT-0002548"}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-accf-ivory/50 block font-mono">Country</span>
                  <strong className="text-accf-ivory">{user ? user.country : "Nigeria 🇳🇬"}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-accf-ivory/50 block font-mono">Member Since</span>
                  <strong className="text-accf-ivory">{user ? user.joinDate : "May 2025"}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-accf-ivory/50 block font-mono">Tier</span>
                  <strong className="text-accf-gold-soft">{user ? user.tier : "Standard"}</strong>
                </div>
              </div>

              {/* Card Footer Line & Verification Badge */}
              <div className="pt-2 border-t border-accf-line/40 flex items-center justify-between text-[10px] text-accf-ivory/70">
                <span className="italic">Committed to Peace, Unity &amp; Cultural Solidarity</span>
                <div className="w-7 h-7 rounded border border-accf-gold/40 bg-accf-green flex items-center justify-center text-[9px] font-mono text-accf-gold">
                  QR
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. HOW IT WORKS (6-Step Spine with Seatline Rail)                        */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-accf-ivory">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-accf-maroon font-bold">
              Join. Connect. Share. Build Peace.
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-accf-charcoal">
              How it works.
            </h2>
            <p className="text-sm text-accf-muted">
              Six simple steps to claim your seat in continental history.
            </p>
          </div>

          {/* Spine indicator rail */}
          <div className="seatline on-ivory filled">
            <div className="dot"></div>
            <div className="track"></div>
            <div className="dot"></div>
            <div className="track"></div>
            <div className="dot"></div>
            <div className="track"></div>
            <div className="dot"></div>
            <div className="track"></div>
            <div className="dot"></div>
            <div className="track"></div>
            <div className="dot"></div>
          </div>

          {/* 6 Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 pt-4">
            {[
              { num: "01", title: "Choose Your Seat", desc: "Select your tier and complete quick registration." },
              { num: "02", title: "Get Your Badge", desc: "Receive your digital badge, profile and chair number." },
              { num: "03", title: "Connect", desc: "Meet Africans across 54 countries and the global diaspora." },
              { num: "04", title: "Meet & Eat", desc: "Arrange to meet hosts in person and share cultural meals." },
              { num: "05", title: "Sign The Tree", desc: "Add your permanent leaf and peace pledge to the tree." },
              { num: "06", title: "Be Part of History", desc: "Join a continental movement building a united Africa." },
            ].map((step, i) => (
              <div key={i} className="p-4 bg-white border border-accf-line-dark rounded space-y-2">
                <span className="font-mono text-xs font-bold text-accf-maroon">{step.num}</span>
                <h4 className="font-serif font-bold text-sm text-accf-charcoal">{step.title}</h4>
                <p className="text-xs text-accf-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. CULTURE GALLERY STRIP (5 Tiles)                                      */}
      {/* ========================================================================= */}
      <section className="py-12 bg-accf-charcoal text-accf-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              {
                title: "Celebrate Culture",
                img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&auto=format&fit=crop&q=80",
              },
              {
                title: "Taste Africa",
                img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
              },
              {
                title: "Share Heritage",
                img: "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?w=600&auto=format&fit=crop&q=80",
              },
              {
                title: "Empower Communities",
                img: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=600&auto=format&fit=crop&q=80",
              },
              {
                title: "Build Peace",
                img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&auto=format&fit=crop&q=80",
              },
            ].map((tile, i) => (
              <div
                key={i}
                className="relative h-64 rounded overflow-hidden group border border-accf-line shadow-lg"
              >
                <img
                  src={tile.img}
                  alt={tile.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                  <span className="font-serif font-semibold text-sm text-accf-ivory group-hover:text-accf-gold transition-colors">
                    {tile.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. PARTNER LOGO STRIP                                                    */}
      {/* ========================================================================= */}
      <section className="py-12 bg-accf-green-deep text-accf-ivory border-t border-accf-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-accf-gold-soft font-bold">
            Institutional &amp; Diplomatic Partners
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 items-center justify-center font-mono text-xs tracking-wider text-accf-ivory/70">
            <div className="p-3 border border-accf-line/40 rounded hover:border-accf-gold transition-colors">
              AFRICAN UNION
            </div>
            <div className="p-3 border border-accf-line/40 rounded hover:border-accf-gold transition-colors">
              AUDA-NEPAD
            </div>
            <div className="p-3 border border-accf-line/40 rounded hover:border-accf-gold transition-colors">
              UN FAO
            </div>
            <div className="p-3 border border-accf-line/40 rounded hover:border-accf-gold transition-colors">
              FED. MIN. AGRICULTURE (NG)
            </div>
            <div className="p-3 border border-accf-line/40 rounded hover:border-accf-gold transition-colors">
              UN ENVIRONMENT (UNEP)
            </div>
            <div className="p-3 border border-accf-line/40 rounded hover:border-accf-gold transition-colors">
              AFRICA CDC
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* VIDEO MODAL                                                              */}
      {/* ========================================================================= */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-accf-charcoal border border-accf-line rounded-xl max-w-2xl w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-accf-line pb-3">
              <h3 className="font-serif font-bold text-lg text-accf-ivory">
                The Sacred Kolanut: Africa&apos;s Ancient Peace Covenant
              </h3>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="p-1 rounded text-accf-ivory/60 hover:text-accf-ivory"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video bg-black rounded overflow-hidden flex items-center justify-center relative">
              <img
                src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&auto=format&fit=crop&q=80"
                alt="Documentary Preview"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black/40 space-y-3">
                <span className="w-16 h-16 rounded-full bg-accf-gold text-accf-charcoal flex items-center justify-center shadow-xl">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </span>
                <p className="text-xs text-accf-ivory/90 max-w-md font-mono">
                  Demo Preview: 18-minute master documentary on the ceremony of breaking the Kolanut across West, Central, East, and North Africa.
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setVideoModalOpen(false)}
                className="px-5 py-2 rounded bg-accf-green text-xs font-semibold text-accf-ivory hover:bg-accf-green-light"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

