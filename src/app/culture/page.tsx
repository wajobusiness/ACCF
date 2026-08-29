"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Sparkles,
  TreePine,
  UtensilsCrossed,
  HeartHandshake,
  ShieldCheck,
  Award,
} from "lucide-react";

export default function CultureHeritagePage() {
  return (
    <div className="flex flex-col min-h-screen bg-accf-ivory">
      {/* Hero */}
      <section className="bg-accf-charcoal text-accf-ivory py-20 px-4 sm:px-6 lg:px-8 border-b border-accf-line">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-accf-gold font-bold inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accf-green-deep border border-accf-gold/30">
            <BookOpen className="w-4 h-4" />
            Sacred African Heritage
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-semibold leading-tight">
            Breaking the Kolanut <br />
            <em className="text-accf-gold italic font-normal">for the Peace of Africa</em>
          </h1>
          <p className="text-sm sm:text-base text-accf-ivory/80 max-w-2xl mx-auto leading-relaxed">
            &quot;In African tradition, peace does not begin at diplomatic tables. It begins at the food mat, where the kolanut is presented, blessed, broken, and shared among kin and strangers alike.&quot;
          </p>
        </div>
      </section>

      {/* The Kolanut Breaking Ceremony Feature */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white rounded-3xl p-8 sm:p-12 border border-accf-line-dark shadow-sm">
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-accf-maroon font-bold">
              Ancient Rite of Welcome
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-accf-charcoal leading-snug">
              The 4 Sacred Stages of the Kolanut Rite
            </h2>
            <p className="text-xs sm:text-sm text-accf-charcoal/80 leading-relaxed">
              Across West and Central Africa, the kolanut (*Cola acuminata*) is the supreme symbol of goodwill, hospitality, and solemn covenant.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 bg-accf-ivory rounded-xl border border-accf-line-dark space-y-1">
                <h4 className="font-serif font-bold text-sm text-accf-green">1. Presentation (Iche Oji)</h4>
                <p className="text-xs text-accf-muted">The host presents the kolanut to the eldest elder or guest of honour on a carved wooden platter.</p>
              </div>

              <div className="p-4 bg-accf-ivory rounded-xl border border-accf-line-dark space-y-1">
                <h4 className="font-serif font-bold text-sm text-accf-green">2. Blessing &amp; Invocation (Igo Oji)</h4>
                <p className="text-xs text-accf-muted">The elder lifts the nut to the ancestors, praying for long life, fertile soils, peace among clans, and bountiful harvest.</p>
              </div>

              <div className="p-4 bg-accf-ivory rounded-xl border border-accf-line-dark space-y-1">
                <h4 className="font-serif font-bold text-sm text-accf-green">3. The Breaking (Iwa Oji)</h4>
                <p className="text-xs text-accf-muted">The nut is split naturally along its cotyledon lobes. A nut with multiple lobes signifies good omen and multiplying prosperity.</p>
              </div>

              <div className="p-4 bg-accf-ivory rounded-xl border border-accf-line-dark space-y-1">
                <h4 className="font-serif font-bold text-sm text-accf-green">4. The Sharing (Ike Oji)</h4>
                <p className="text-xs text-accf-muted">Every person in the gathering eats a portion. Having broken kolanut together, violence between parties is spiritually forbidden.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-accf-line-dark h-80">
              <img
                src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&auto=format&fit=crop&q=80"
                alt="Traditional African Harvest"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 bg-accf-charcoal text-accf-ivory rounded-2xl border border-accf-gold shadow-lg space-y-2">
              <span className="text-[10px] font-mono text-accf-gold uppercase font-bold">Sacred Proverb:</span>
              <blockquote className="font-serif italic text-base sm:text-lg text-accf-ivory/95">
                &quot;Onye wetara oji, wetara ndu.&quot; <br />
                <span className="text-xs font-sans text-accf-gold-soft font-normal not-italic">
                  (He who brings kolanut, brings life and peace to the home.)
                </span>
              </blockquote>
            </div>
          </div>
        </div>

        {/* Traditional Cookware & Vessels of Africa */}
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="text-xs font-mono uppercase tracking-widest text-accf-maroon font-bold">
              Material Heritage
            </div>
            <h3 className="font-serif font-bold text-3xl text-accf-charcoal">
              Traditional Cookware &amp; Vessels
            </h3>
            <p className="text-xs sm:text-sm text-accf-muted">
              Centuries of craftsmanship in terracotta, clay, soapstone, and dried gourds that define authentic African food preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Asanka Grinding Bowl",
                origin: "Ghana & Côte d'Ivoire",
                material: "Fired Black Clay with Wooden Pestle (Tapoli)",
                desc: "Fluted interior ridges designed for hand-grinding hot peppers, roasted tomatoes, and groundnut pastes with zero electricity.",
                img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format&fit=crop&q=80",
              },
              {
                name: "Moroccan Clay Tagine",
                origin: "Morocco & North Africa",
                material: "Unglazed Terracotta Conical Lid",
                desc: "The conical top traps steam and returns condensation to the stew, producing tender lamb and vegetable slow-cooks.",
                img: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=400&auto=format&fit=crop&q=80",
              },
              {
                name: "Jebena Coffee Pot",
                origin: "Ethiopia & Eritrea",
                material: "Black Clay with Straw Base",
                desc: "Spherical clay vessel with long neck used in the sacred Ethiopian Coffee Ceremony (Buna tetu) boiled three times.",
                img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop&q=80",
              },
              {
                name: "Carved Palm Gourd Calabash",
                origin: "Nigeria, Kenya, Mali",
                material: "Dried & Carved Lagenaria Gourd",
                desc: "Natural organic bowls for pouring palm wine, serving sorghum porridge, and sharing water with traveling delegates.",
                img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-accf-line-dark overflow-hidden p-5 space-y-3 shadow-sm hover:shadow-xl hover:border-accf-gold transition-all"
              >
                <div className="h-44 rounded-xl overflow-hidden">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-accf-maroon uppercase font-bold">{item.origin}</div>
                  <h4 className="font-serif font-bold text-base text-accf-charcoal">{item.name}</h4>
                  <p className="text-[11px] font-mono text-accf-green">{item.material}</p>
                </div>
                <p className="text-xs text-accf-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Bar */}
        <div className="p-8 sm:p-12 bg-accf-green-deep text-accf-ivory rounded-3xl border border-accf-gold flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-accf-gold-soft">
              Experience Authentic Hospitality
            </h3>
            <p className="text-xs sm:text-sm text-accf-ivory/80 leading-relaxed">
              Join Meet &amp; Eat Africa to break bread and experience centuries of heritage with local families and culinary masters.
            </p>
          </div>
          <Link
            href="/meet-and-eat"
            className="px-8 py-3.5 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-widest hover:bg-accf-gold-soft transition-all shadow-xl flex-shrink-0"
          >
            Find a Cultural Host &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}

