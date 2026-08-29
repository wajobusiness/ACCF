"use client";

import React, { useState, useEffect } from "react";
import { dataProvider } from "@/lib/data-provider";
import { PeaceTableZone, PeaceTableDish, AccreditationRequest } from "@/types/master-models";
import {
  UtensilsCrossed,
  ShieldCheck,
  Award,
  Globe2,
  Users,
  CheckCircle2,
  Send,
  Sparkles,
  MapPin,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function PeaceTablePage() {
  const [zones, setZones] = useState<PeaceTableZone[]>([]);
  const [dishes, setDishes] = useState<PeaceTableDish[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [activeZone, setActiveZone] = useState<string>("zone-1");

  // Accreditation Form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState<AccreditationRequest["category"]>("Diplomatic Community");
  const [organization, setOrganization] = useState("");
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [guestCount, setGuestCount] = useState(1);
  const [dietaryNotes, setDietaryNotes] = useState("Strict Halal");
  const [submittedAccreditation, setSubmittedAccreditation] = useState<AccreditationRequest | null>(null);

  useEffect(() => {
    async function load() {
      const z = await dataProvider.getPeaceTableZones();
      setZones(z);
      const d = await dataProvider.getPeaceTableDishes();
      setDishes(d);
    }
    load();
  }, []);

  const handleAccreditationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dataProvider.submitAccreditation({
      name,
      email,
      category,
      organization,
      title,
      country,
      guestCount,
      dietaryNotes,
    });
    setSubmittedAccreditation(result);
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const filteredDishes = dishes.filter((dish) => {
    if (selectedCategory !== "All" && dish.category !== selectedCategory) return false;
    if (selectedRegion !== "All" && dish.region !== selectedRegion) return false;
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-accf-ivory">
      {/* Hero */}
      <section className="bg-accf-maroon text-accf-ivory py-20 px-4 sm:px-6 lg:px-8 border-b border-accf-line">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-accf-gold-soft font-bold inline-block px-3 py-1 rounded-full bg-accf-charcoal/40 border border-accf-gold/30">
            Abuja 2026 Flagship Monument
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-semibold leading-tight">
            The African Peace Table
          </h1>
          <div className="font-serif text-xl sm:text-2xl text-accf-gold-soft font-medium">
            2 Kilometres • 10,000 Guests • 1 Continent • 1 Table
          </div>
          <p className="text-sm sm:text-base text-accf-ivory/85 max-w-2xl mx-auto leading-relaxed">
            &quot;The longest multicultural dining table in African history. A signature gathering where thousands of Africans will gather physically to share 1,000 traditional cuisines and affirm that regardless of our differences, Africa remains one family.&quot;
          </p>
        </div>
      </section>

      {/* 2-Kilometre Interactive Spatial Visualizer */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-widest text-accf-maroon font-bold">
            Banquet Architecture
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-accf-charcoal">
            The 5 Continental Seating Zones
          </h2>
          <p className="text-sm text-accf-muted">
            Explore the spatial arrangement of delegations and regional cuisines along the 2,000-metre boulevard.
          </p>
        </div>

        {/* Zone Selector Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 font-mono text-xs">
          {zones.map((zone) => (
            <button
              key={zone.id}
              onClick={() => setActiveZone(zone.id)}
              className={`p-4 rounded-xl border text-left transition-all ${
                activeZone === zone.id
                  ? "bg-accf-charcoal text-accf-ivory border-accf-gold shadow-lg ring-2 ring-accf-gold"
                  : "bg-white text-accf-charcoal border-accf-line-dark hover:border-accf-gold"
              }`}
            >
              <span className="text-[10px] text-accf-gold font-bold block mb-1">
                {zone.lengthMeters}m Length
              </span>
              <div className="font-serif font-bold text-sm truncate">{zone.name.split(":")[0]}</div>
              <div className="text-[10px] text-accf-muted mt-1">{zone.capacity.toLocaleString()} Seats</div>
            </button>
          ))}
        </div>

        {/* Active Zone Detail Card */}
        {(() => {
          const current = zones.find((z) => z.id === activeZone) || zones[0];
          if (!current) return null;
          return (
            <div className="p-8 bg-accf-charcoal text-accf-ivory rounded-2xl border border-accf-gold shadow-2xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-accf-line pb-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-accf-gold font-bold">
                    Zone Blueprint
                  </span>
                  <h3 className="font-serif font-bold text-2xl text-accf-ivory">{current.name}</h3>
                </div>
                <div className="flex gap-4 font-mono text-xs text-accf-gold-soft">
                  <span>Capacity: <strong>{current.capacity.toLocaleString()} Delegates</strong></span>
                  <span>•</span>
                  <span>Span: <strong>{current.lengthMeters} Metres</strong></span>
                </div>
              </div>
              <p className="text-sm text-accf-ivory/80 leading-relaxed">{current.description}</p>
              <div className="p-3 bg-accf-charcoal-card border border-accf-line/60 rounded text-xs font-mono flex items-center gap-2 text-accf-gold">
                <UtensilsCrossed className="w-4 h-4" />
                <span>Assigned Culinary Dossier: {current.assignedDishesRegion}</span>
              </div>
            </div>
          );
        })()}
      </section>

      {/* 1,000 Traditional Dishes Showcase */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-accf-line-dark">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="text-xs font-mono uppercase tracking-widest text-accf-maroon font-bold">
                Culinary Archive
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-accf-charcoal">
                1,000 Traditional Dishes of Africa
              </h2>
              <p className="text-xs sm:text-sm text-accf-muted">
                Every recipe prepared at the Peace Table is an authentic, centuries-old dish representing the agricultural biodiversity of our 54 nations.
              </p>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              {["All", "Grains & Swallows", "Soups & Stews", "Roasts & Braais", "Seafood"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded transition-colors ${
                    selectedCategory === cat
                      ? "bg-accf-green text-accf-gold font-bold"
                      : "bg-accf-ivory text-accf-charcoal border border-accf-line-dark hover:border-accf-gold"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Dishes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-accf-ivory rounded-xl border border-accf-line-dark overflow-hidden hover:border-accf-gold hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={dish.imageUrl}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-accf-gold">
                      {dish.country}
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-mono uppercase text-accf-maroon font-bold">
                      {dish.category}
                    </span>
                    <h3 className="font-serif font-bold text-base text-accf-charcoal leading-snug">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-accf-muted leading-relaxed line-clamp-3">
                      {dish.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-accf-line-dark flex flex-wrap gap-1">
                    {dish.dietary.map((d, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-white text-[9px] font-mono text-accf-green font-semibold border border-accf-line-dark"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Accreditation Form (7 Categories) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-accf-maroon font-bold">
            Diplomatic &amp; Public Accreditation
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-accf-charcoal">
            Register for the 2km Peace Table
          </h2>
          <p className="text-xs sm:text-sm text-accf-muted max-w-lg mx-auto">
            Accreditation is open for Government, Traditional Rulers, Private Sector, Diplomats, Youth Leaders, Women Leaders, and the African Diaspora.
          </p>
        </div>

        {submittedAccreditation ? (
          <div className="p-8 bg-accf-charcoal text-accf-ivory rounded-2xl border-2 border-accf-gold shadow-2xl text-center space-y-4 animate-in zoom-in-95">
            <CheckCircle2 className="w-16 h-16 text-accf-gold mx-auto" />
            <h3 className="font-serif font-bold text-2xl text-accf-gold-soft">
              Accreditation Issued!
            </h3>
            <p className="text-sm text-accf-ivory/80 max-w-md mx-auto leading-relaxed">
              Delegate <strong>{submittedAccreditation.name}</strong> from <strong>{submittedAccreditation.organization}</strong> ({submittedAccreditation.country}) is confirmed.
            </p>
            <div className="p-4 bg-accf-charcoal-card border border-accf-line/60 rounded-xl inline-block text-xs font-mono text-accf-gold">
              Allocated Seating: <strong>{submittedAccreditation.tableSeatZone}</strong>
            </div>
            <div className="pt-2">
              <button
                onClick={() => setSubmittedAccreditation(null)}
                className="px-6 py-2.5 rounded bg-accf-green text-accf-ivory text-xs font-semibold hover:bg-accf-green-light"
              >
                Submit Another Accreditation
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleAccreditationSubmit}
            className="bg-white rounded-2xl p-8 sm:p-12 border border-accf-line-dark shadow-xl space-y-6 text-xs"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-accf-charcoal font-semibold mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ambassador Fatima Al-Zahra"
                  className="w-full px-3 py-2.5 bg-accf-ivory border border-accf-line-dark rounded focus:border-accf-gold text-accf-charcoal font-medium"
                />
              </div>

              <div>
                <label className="block text-accf-charcoal font-semibold mb-1">Official Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="delegate@organization.africa"
                  className="w-full px-3 py-2.5 bg-accf-ivory border border-accf-line-dark rounded focus:border-accf-gold text-accf-charcoal font-medium"
                />
              </div>

              <div>
                <label className="block text-accf-charcoal font-semibold mb-1">Accreditation Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as AccreditationRequest["category"])}
                  className="w-full px-3 py-2.5 bg-accf-ivory border border-accf-line-dark rounded focus:border-accf-gold text-accf-charcoal font-medium"
                >
                  <option value="Diplomatic Community">Diplomatic Community</option>
                  <option value="Government">Government Leaders</option>
                  <option value="Traditional Institutions">Traditional Monarchs &amp; Institutions</option>
                  <option value="Private Sector">Private Sector &amp; Agribusiness Leaders</option>
                  <option value="Women Leaders">Women in Food Leadership</option>
                  <option value="Youth Representatives">Youth Representatives</option>
                  <option value="African Diaspora">African Diaspora Delegation</option>
                </select>
              </div>

              <div>
                <label className="block text-accf-charcoal font-semibold mb-1">Country of Representation</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2.5 bg-accf-ivory border border-accf-line-dark rounded focus:border-accf-gold text-accf-charcoal font-medium"
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
                  <option value="United Kingdom">United Kingdom (Diaspora) 🇬🇧</option>
                  <option value="United States">United States (Diaspora) 🇺🇸</option>
                </select>
              </div>

              <div>
                <label className="block text-accf-charcoal font-semibold mb-1">Organization / Title</label>
                <input
                  type="text"
                  required
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. African Union Food Commission"
                  className="w-full px-3 py-2.5 bg-accf-ivory border border-accf-line-dark rounded focus:border-accf-gold text-accf-charcoal font-medium"
                />
              </div>

              <div>
                <label className="block text-accf-charcoal font-semibold mb-1">Dietary Preferences</label>
                <input
                  type="text"
                  value={dietaryNotes}
                  onChange={(e) => setDietaryNotes(e.target.value)}
                  placeholder="e.g. Strict Halal, Vegetarian, Gluten-Free"
                  className="w-full px-3 py-2.5 bg-accf-ivory border border-accf-line-dark rounded focus:border-accf-gold text-accf-charcoal font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-widest hover:bg-accf-gold-soft transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Submit Delegate Accreditation Request
            </button>
          </form>
        )}
      </section>
    </div>
  );
}

