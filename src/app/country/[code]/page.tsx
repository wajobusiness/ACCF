"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { dataProvider } from "@/lib/data-provider";
import { CountryProfile, MeetEatListing, MarketplaceListing, TreeLeaf } from "@/types/master-models";
import { formatNGN } from "@/lib/utils";
import Link from "next/link";
import {
  Globe2,
  MapPin,
  UtensilsCrossed,
  ShoppingBag,
  TreePine,
  Sparkles,
  ArrowLeft,
  Users,
  Heart,
  ChevronRight,
} from "lucide-react";

export default function CountryDossierPage() {
  const params = useParams();
  const code = (params.code as string).toUpperCase();
  const [country, setCountry] = useState<CountryProfile | null>(null);
  const [hosts, setHosts] = useState<MeetEatListing[]>([]);
  const [products, setProducts] = useState<MarketplaceListing[]>([]);
  const [leaves, setLeaves] = useState<TreeLeaf[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const c = await dataProvider.getCountryByCode(code);
      if (c) {
        setCountry(c);
        const h = await dataProvider.getMeetEatListings(c.name);
        setHosts(h);
        const p = await dataProvider.getMarketplaceListings("All", c.name);
        setProducts(p);
        const l = await dataProvider.getTreeLeaves("", c.name);
        setLeaves(l);
      } else {
        const allCountries = await dataProvider.getCountries();
        setCountry(allCountries[0]);
      }
      setIsLoading(false);
    }
    load();
  }, [code]);

  if (isLoading || !country) {
    return <div className="p-20 text-center text-accf-gold">Loading African Country Dossier...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-accf-ivory">
      {/* Hero Header */}
      <section className="relative bg-accf-charcoal text-accf-ivory py-16 px-4 sm:px-6 lg:px-8 border-b border-accf-line overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img src={country.coverImage} alt={country.name} className="w-full h-full object-cover filter blur-sm" />
        </div>

        <div className="relative max-w-7xl mx-auto space-y-6">
          <Link
            href="/peace-table"
            className="inline-flex items-center gap-1.5 text-xs text-accf-gold font-semibold hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to 2km Peace Table Nations
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{country.flagEmoji}</span>
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-accf-gold font-bold">
                    {country.region} • Capital: {country.capital}
                  </div>
                  <h1 className="font-serif font-bold text-4xl sm:text-5xl text-accf-ivory">
                    {country.name}
                  </h1>
                </div>
              </div>
              <p className="text-sm sm:text-base text-accf-ivory/80 max-w-2xl leading-relaxed pt-2">
                {country.foodHeritageBrief}
              </p>
            </div>

            {/* Metrics Badge */}
            <div className="grid grid-cols-2 gap-3 p-4 bg-accf-charcoal-card/90 border border-accf-gold/50 rounded-2xl text-xs font-mono text-center">
              <div className="p-2.5 bg-accf-green-deep rounded">
                <span className="text-lg font-bold text-accf-gold block">{country.peaceSignatures.toLocaleString()}</span>
                <span className="text-[10px] text-accf-ivory/60 uppercase">Peace Signatures</span>
              </div>
              <div className="p-2.5 bg-accf-green-deep rounded">
                <span className="text-lg font-bold text-emerald-400 block">{country.membersCount.toLocaleString()}</span>
                <span className="text-[10px] text-accf-ivory/60 uppercase">Digital Chairs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Dish & Traditional Ingredients Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-8 border border-accf-line-dark shadow-sm">
          <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-lg h-72">
            <img
              src={country.coverImage}
              alt={country.signatureDish}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-accf-maroon font-bold">
              National Signature Dish
            </div>
            <h2 className="font-serif font-bold text-3xl text-accf-charcoal">
              {country.signatureDish}
            </h2>
            <p className="text-xs sm:text-sm text-accf-charcoal/80 leading-relaxed">
              {country.dishDescription}
            </p>

            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-mono uppercase text-accf-muted block">
                Indigenous Ingredients &amp; Crops:
              </span>
              <div className="flex flex-wrap gap-2">
                {country.traditionalIngredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-accf-ivory border border-accf-line-dark text-xs font-semibold text-accf-green"
                  >
                    🌿 {ing}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Connected Hosts in this Country */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-accf-maroon font-bold">
                Meet &amp; Eat Network
              </div>
              <h3 className="font-serif font-bold text-2xl text-accf-charcoal">
                Cultural Hosts in {country.name}
              </h3>
            </div>
            <Link
              href="/meet-and-eat"
              className="text-xs text-accf-green font-bold hover:text-accf-gold flex items-center gap-1"
            >
              Browse All African Hosts <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {hosts.length === 0 ? (
            <div className="p-8 bg-white rounded-2xl border border-accf-line-dark text-center text-xs text-accf-muted">
              Hosting slots in {country.name} are filling for Abuja 2026. Join as a cultural host!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {hosts.map((host) => (
                <div
                  key={host.id}
                  className="bg-white rounded-2xl border border-accf-line-dark p-5 space-y-3 shadow-sm hover:shadow-xl hover:border-accf-gold transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={host.hostPhoto}
                      alt={host.hostName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-accf-gold"
                    />
                    <div>
                      <h4 className="font-serif font-bold text-base text-accf-charcoal">{host.hostName}</h4>
                      <div className="text-xs text-accf-muted font-mono">{host.city}</div>
                    </div>
                  </div>
                  <h5 className="font-semibold text-sm text-accf-green">{host.title}</h5>
                  <p className="text-xs text-accf-muted line-clamp-2">{host.description}</p>
                  <div className="pt-2 border-t border-accf-line-dark flex justify-between items-center text-xs">
                    <span className="font-mono font-bold text-accf-gold">{formatNGN(host.priceNGN)} / guest</span>
                    <Link
                      href="/meet-and-eat"
                      className="text-accf-green font-bold hover:underline"
                    >
                      Book Meal &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Connected Marketplace Products */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-accf-maroon font-bold">
                Direct Trade Commerce
              </div>
              <h3 className="font-serif font-bold text-2xl text-accf-charcoal">
                Authentic Goods from {country.name}
              </h3>
            </div>
            <Link
              href="/marketplace"
              className="text-xs text-accf-green font-bold hover:text-accf-gold flex items-center gap-1"
            >
              Explore Full Marketplace <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl border border-accf-line-dark p-4 space-y-2 shadow-sm hover:shadow-md hover:border-accf-gold transition-all"
              >
                <div className="h-40 rounded-lg overflow-hidden">
                  <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <div className="text-[10px] font-mono text-accf-maroon uppercase font-bold">{p.category}</div>
                <h4 className="font-serif font-bold text-sm text-accf-charcoal truncate">{p.title}</h4>
                <div className="font-mono text-sm font-bold text-accf-charcoal">{formatNGN(p.priceNGN)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Bar */}
        <div className="p-8 bg-accf-charcoal text-accf-ivory rounded-3xl border-2 border-accf-gold flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif font-bold text-2xl text-accf-gold-soft">
              Represent {country.name} at the African Peace Table
            </h3>
            <p className="text-xs sm:text-sm text-accf-ivory/80 max-w-xl">
              Plant a leaf on the Kolanut Tree or claim your official Digital Chair pass representing {country.name}.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link
              href="/kolanut-tree"
              className="px-5 py-3 rounded bg-accf-green text-accf-ivory font-bold text-xs hover:bg-accf-green-light transition-colors"
            >
              Sign Kolanut Tree
            </Link>
            <Link
              href="/membership/checkout"
              className="px-6 py-3 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider hover:bg-accf-gold-soft transition-colors shadow-lg"
            >
              Take A Seat
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

