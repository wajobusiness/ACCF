"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  MapPin,
  Sparkles,
  Calendar,
  UtensilsCrossed,
  ArrowRight,
  Clock,
  Globe2,
} from "lucide-react";

export default function CulinaryTourismPage() {
  const [activeTrail, setActiveTrail] = useState(0);

  const trails = [
    {
      id: "trail-1",
      title: "The Ancient Sahel Grain & Hearth Trail",
      region: "West & Central Africa (Senegal, Mali, Niger, Northern Nigeria)",
      duration: "7 Days • 4 Capitals",
      highlights: ["Fonio & Millet Mills", "Ancient Suya Masters of Kano", "Dakar Fish Hearth", "Sahelian Pastoral Cheeses"],
      coverImage: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&auto=format&fit=crop&q=80",
      description: "Traverse the cradle of African ancient grains. Witness women's cooperatives harvesting wild fonio, attend open-air camel roast hearths, and learn ancient fermentation techniques preserved across dynasties.",
    },
    {
      id: "trail-2",
      title: "The Swahili Coast Spice & Ocean Circuit",
      region: "East Africa (Zanzibar, Mombasa, Dar es Salaam, Lamu)",
      duration: "6 Days • Coastal Swahili Archipelago",
      highlights: ["Zanzibar Clove & Cardamom Plantations", "Dhow Seafood Dinners", "Tamarind Swahili Curries", "Stone Town Night Markets"],
      coverImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop&q=80",
      description: "Sail traditional wooden dhows across the Indian Ocean to secret spice farms. Feast on freshly caught red snapper baked in banana leaves and coconut milk under the stars in Stone Town.",
    },
    {
      id: "trail-3",
      title: "The Great Rift Valley & Coffee Highlands",
      region: "Horn of Africa (Ethiopia, Kenya, Rwanda)",
      duration: "8 Days • Volcanic Highlands",
      highlights: ["Yirgacheffe Coffee Bean Harvests", "Injera Teff Fields", "Kigali Farm-to-Table Hubs", "Nairobi Chef Tastings"],
      coverImage: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
      description: "Climb the cloud-forested origins of Arabica coffee. Participate in sacred Buna coffee roasting ceremonies and enjoy organic teff injera shared on massive woven mesob platters.",
    },
    {
      id: "trail-4",
      title: "The Atlas Honey, Argan & Olive Escarpment",
      region: "North Africa (Morocco, Algeria, Tunisia)",
      duration: "5 Days • Berber Foothills",
      highlights: ["Organic Argan Oil Cooperatives", "Clay Tagine Workshops", "Wild Thyme Honey Apiaries", "Marrakech Spice Souks"],
      coverImage: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800&auto=format&fit=crop&q=80",
      description: "Walk ancient terrace orchards with Berber families. Master the art of slow-cooking with woodfire terracotta tagines and cold-pressed olive oils.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-accf-ivory">
      {/* Hero */}
      <section className="bg-accf-charcoal text-accf-ivory py-20 px-4 sm:px-6 lg:px-8 border-b border-accf-line">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-accf-gold font-bold inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accf-green-deep border border-accf-gold/30">
            <Compass className="w-4 h-4" />
            Pan-African Taste Trails
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-semibold leading-tight">
            Culinary Tourism Africa <br />
            <em className="text-accf-gold italic font-normal">&amp; Heritage Journeys</em>
          </h1>
          <p className="text-sm sm:text-base text-accf-ivory/80 max-w-2xl mx-auto leading-relaxed">
            &quot;Travel Africa through taste. Discover curated culinary itineraries, local farm feasts, artisanal spice tours, and village cooking circles across 54 nations.&quot;
          </p>
        </div>
      </section>

      {/* Interactive Taste Trails */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 flex-1 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-accf-maroon font-bold">
              Signature Itineraries
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-accf-charcoal">
              Featured Continental Taste Trails
            </h2>
          </div>
        </div>

        {/* Trail Selector & Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Trail Menu Buttons */}
          <div className="lg:col-span-5 space-y-3">
            {trails.map((trail, index) => (
              <button
                key={trail.id}
                onClick={() => setActiveTrail(index)}
                className={`w-full p-5 rounded-2xl border text-left transition-all ${
                  activeTrail === index
                    ? "bg-accf-charcoal text-accf-ivory border-accf-gold shadow-xl ring-2 ring-accf-gold"
                    : "bg-white text-accf-charcoal border-accf-line-dark hover:border-accf-gold"
                }`}
              >
                <div className="text-[10px] font-mono text-accf-gold font-bold uppercase mb-1">
                  {trail.duration}
                </div>
                <h3 className="font-serif font-bold text-lg leading-snug">{trail.title}</h3>
                <div className="text-xs text-accf-muted mt-1">{trail.region}</div>
              </button>
            ))}
          </div>

          {/* Right: Active Trail Detailed Blueprint */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-accf-line-dark shadow-xl space-y-6">
            <div className="h-64 rounded-2xl overflow-hidden shadow-md">
              <img
                src={trails[activeTrail].coverImage}
                alt={trails[activeTrail].title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-accf-maroon font-bold">{trails[activeTrail].region}</span>
                <span className="text-accf-green font-semibold">{trails[activeTrail].duration}</span>
              </div>

              <h3 className="font-serif font-bold text-2xl text-accf-charcoal">
                {trails[activeTrail].title}
              </h3>

              <p className="text-xs sm:text-sm text-accf-charcoal/80 leading-relaxed">
                {trails[activeTrail].description}
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-mono uppercase text-accf-muted block">
                  Itinerary Key Experiences:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {trails[activeTrail].highlights.map((hl, i) => (
                    <div
                      key={i}
                      className="p-2.5 bg-accf-ivory rounded-xl border border-accf-line-dark text-xs font-medium text-accf-charcoal flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-accf-gold flex-shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-accf-line-dark flex items-center justify-between">
              <Link
                href="/meet-and-eat"
                className="text-xs font-bold text-accf-green hover:underline flex items-center gap-1"
              >
                Meet Local Trail Hosts &rarr;
              </Link>
              <button
                onClick={() => alert("Taste Trail Inquiry: We have pre-registered your delegation for this itinerary.")}
                className="px-6 py-2.5 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider hover:bg-accf-gold-soft transition-colors shadow"
              >
                Book Excursion Pass
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

