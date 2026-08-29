"use client";

import React, { useState, useEffect } from "react";
import { dataProvider } from "@/lib/data-provider";
import { PeaceTableDish } from "@/types/master-models";
import Link from "next/link";
import {
  UtensilsCrossed,
  Search,
  Filter,
  Sparkles,
  MapPin,
  X,
  ChevronRight,
  BookOpen,
} from "lucide-react";

export default function FoodRecipesPage() {
  const [dishes, setDishes] = useState<PeaceTableDish[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDish, setSelectedDish] = useState<PeaceTableDish | null>(null);

  useEffect(() => {
    async function load() {
      const data = await dataProvider.getPeaceTableDishes();
      setDishes(data);
    }
    load();
  }, []);

  const filteredDishes = dishes.filter((dish) => {
    if (selectedCategory !== "All" && dish.category !== selectedCategory) return false;
    if (
      searchQuery &&
      !dish.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !dish.country.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !dish.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-accf-ivory">
      {/* Hero */}
      <section className="bg-accf-charcoal text-accf-ivory py-20 px-4 sm:px-6 lg:px-8 border-b border-accf-line">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-accf-gold font-bold inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accf-green-deep border border-accf-gold/30">
            <UtensilsCrossed className="w-4 h-4" />
            1,000 Traditional Cuisines
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-semibold leading-tight">
            African Culinary Archive <br />
            <em className="text-accf-gold italic font-normal">&amp; Indigenous Recipes</em>
          </h1>
          <p className="text-sm sm:text-base text-accf-ivory/80 max-w-2xl mx-auto leading-relaxed">
            &quot;Explore the rich tapestry of African food heritage. From the ancient grains of the Sahel to coastal Swahili seafood curries and North African tagines, discover the flavors that unite 54 nations.&quot;
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-20 z-30 bg-accf-ivory border-b border-accf-line-dark py-4 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-accf-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search recipes, indigenous ingredients, countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-accf-line-dark rounded focus:outline-none focus:border-accf-gold text-accf-charcoal font-medium"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-accf-muted flex-shrink-0 mr-1" />
            {[
              "All",
              "Soups & Stews",
              "Grains & Swallows",
              "Roasts & Braais",
              "Seafood",
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
        </div>
      </section>

      {/* Dishes Archive Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex-1 w-full space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDishes.map((dish) => (
            <div
              key={dish.id}
              onClick={() => setSelectedDish(dish)}
              className="bg-white rounded-2xl border border-accf-line-dark overflow-hidden shadow-sm hover:shadow-xl hover:border-accf-gold transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={dish.imageUrl}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/75 text-[10px] font-mono text-accf-gold font-semibold">
                    {dish.country}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-mono uppercase text-accf-maroon font-bold">
                    {dish.category}
                  </span>
                  <h3 className="font-serif font-bold text-base text-accf-charcoal group-hover:text-accf-green leading-snug">
                    {dish.name}
                  </h3>
                  <p className="text-xs text-accf-muted line-clamp-3 leading-relaxed">
                    {dish.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-accf-line-dark flex items-center justify-between text-xs font-bold text-accf-green group-hover:text-accf-gold">
                  <span>Inspect Recipe &amp; Origin</span>
                  <span>&rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DISH RECIPE MODAL */}
      {selectedDish && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-accf-charcoal text-accf-ivory border-2 border-accf-gold rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-accf-line pb-3">
              <span className="text-xs font-mono text-accf-gold font-bold uppercase">
                {selectedDish.category} &bull; {selectedDish.country} ({selectedDish.region})
              </span>
              <button
                onClick={() => setSelectedDish(null)}
                className="p-1 rounded text-accf-ivory/60 hover:text-accf-ivory"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-56 rounded-xl overflow-hidden border border-accf-line/60">
              <img
                src={selectedDish.imageUrl}
                alt={selectedDish.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3">
              <h3 className="font-serif font-bold text-2xl text-accf-ivory leading-snug">
                {selectedDish.name}
              </h3>
              <p className="text-xs sm:text-sm text-accf-ivory/80 leading-relaxed">
                {selectedDish.description}
              </p>

              <div className="p-4 bg-accf-charcoal-card border border-accf-line/60 rounded-xl space-y-2">
                <span className="text-[10px] font-mono uppercase text-accf-gold font-bold">
                  Key Indigenous Ingredients:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDish.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded bg-accf-green-deep border border-accf-line/40 text-xs font-medium text-accf-gold-soft"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-accf-line flex flex-wrap items-center justify-between gap-3 text-xs">
              <Link
                href="/meet-and-eat"
                onClick={() => setSelectedDish(null)}
                className="text-accf-gold hover:underline font-semibold"
              >
                Find a Host Cooking This Dish &rarr;
              </Link>
              <button
                onClick={() => setSelectedDish(null)}
                className="px-5 py-2.5 rounded bg-accf-green text-accf-ivory font-semibold hover:bg-accf-green-light"
              >
                Close Recipe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

