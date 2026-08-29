"use client";

import React, { useState, useEffect } from "react";
import { dataProvider } from "@/lib/data-provider";
import { MarketplaceListing } from "@/types/master-models";
import { useCart } from "@/lib/context/cart-context";
import { formatNGN } from "@/lib/utils";
import {
  ShoppingBag,
  Filter,
  Search,
  Star,
  Plus,
  Check,
  Store,
  Sparkles,
  MapPin,
  X,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function MarketplacePage() {
  const [products, setProducts] = useState<MarketplaceListing[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<MarketplaceListing | null>(null);
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const data = await dataProvider.getMarketplaceListings(selectedCategory);
      setProducts(data);
    }
    load();
  }, [selectedCategory]);

  const handleAddToCart = (product: MarketplaceListing, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    addItem(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-accf-ivory">
      {/* Hero */}
      <section className="bg-accf-charcoal text-accf-ivory py-20 px-4 sm:px-6 lg:px-8 border-b border-accf-line">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-accf-gold font-bold inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accf-green-deep border border-accf-gold/30">
            <ShoppingBag className="w-4 h-4" />
            Pan-African Food &amp; Heritage Commerce
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-semibold leading-tight">
            Africa Marketplace
          </h1>
          <p className="text-sm sm:text-base text-accf-ivory/80 max-w-2xl mx-auto leading-relaxed">
            &quot;BUY • SELL • CONNECT. A digital marketplace for traditional ingredients, single-origin coffees, heirloom spices, terracotta cookware, and cultural textiles.&quot;
          </p>
        </div>
      </section>

      {/* Categories Filter Bar */}
      <section className="sticky top-20 z-30 bg-accf-ivory border-b border-accf-line-dark py-4 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto pb-1">
          <Filter className="w-4 h-4 text-accf-muted flex-shrink-0 mr-2" />
          {[
            "All",
            "Traditional Ingredients",
            "Food Products",
            "Food Equipment",
            "Fashion & Textiles",
            "Books & Publications",
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
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex-1 w-full space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((prod) => (
            <div
              key={prod.id}
              onClick={() => setSelectedProduct(prod)}
              className="bg-white rounded-2xl border border-accf-line-dark overflow-hidden shadow-sm hover:shadow-xl hover:border-accf-gold transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={prod.images[0]}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/75 text-[10px] font-mono text-accf-gold">
                    {prod.vendorCountry}
                  </div>
                  {prod.isFeatured && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-accf-gold text-accf-charcoal text-[9px] font-mono font-bold uppercase">
                      Featured
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-accf-maroon font-semibold">{prod.category}</span>
                    <div className="flex items-center gap-1 text-accf-gold font-bold">
                      <Star className="w-3.5 h-3.5 fill-accf-gold" />
                      <span>{prod.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-serif font-bold text-base text-accf-charcoal group-hover:text-accf-green leading-snug">
                    {prod.title}
                  </h3>

                  <p className="text-xs text-accf-muted line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>

                  <div className="pt-1 text-[11px] text-accf-muted font-mono truncate">
                    Vendor: {prod.vendorName}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-accf-line-dark flex items-center justify-between">
                  <div className="font-serif font-bold text-lg text-accf-charcoal">
                    {formatNGN(prod.priceNGN)}
                  </div>
                  <button
                    onClick={(e) => handleAddToCart(prod, e)}
                    className="p-2.5 rounded bg-accf-gold text-accf-charcoal hover:bg-accf-gold-soft transition-transform hover:scale-105 flex items-center gap-1 text-xs font-bold shadow"
                  >
                    {addedId === prod.id ? (
                      <Check className="w-4 h-4 text-accf-green" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Become a Vendor Banner */}
        <div className="p-8 sm:p-12 bg-accf-green-deep text-accf-ivory rounded-3xl border border-accf-gold flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <div className="text-xs font-mono uppercase tracking-widest text-accf-gold font-bold">
              Vendor Membership
            </div>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-accf-ivory">
              Sell Your Authentic African Culinary Products
            </h3>
            <p className="text-xs sm:text-sm text-accf-ivory/80 leading-relaxed">
              Reach over 300 million African consumers, diaspora buyers, and hospitality operators with zero cross-border friction.
            </p>
          </div>
          <button
            onClick={() => alert("Vendor Onboarding Portal: Simulated application submitted for review.")}
            className="px-8 py-3.5 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-widest hover:bg-accf-gold-soft transition-all shadow-xl flex-shrink-0"
          >
            Apply for Vendor Storefront
          </button>
        </div>
      </section>

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-accf-charcoal text-accf-ivory border-2 border-accf-gold rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-accf-line pb-3">
              <span className="text-xs font-mono text-accf-gold font-semibold uppercase">
                {selectedProduct.category}
              </span>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-1 rounded text-accf-ivory/60 hover:text-accf-ivory"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-56 rounded-xl overflow-hidden border border-accf-line/60">
              <img
                src={selectedProduct.images[0]}
                alt={selectedProduct.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-accf-ivory">
                {selectedProduct.title}
              </h3>
              <p className="text-xs text-accf-ivory/80 leading-relaxed">
                {selectedProduct.description}
              </p>
              <div className="pt-2 text-xs font-mono text-accf-gold-soft">
                Origin: {selectedProduct.originRegion}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-accf-line">
              <div className="font-serif font-bold text-2xl text-accf-gold">
                {formatNGN(selectedProduct.priceNGN)}
              </div>
              <button
                onClick={() => {
                  handleAddToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="px-6 py-3 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-widest hover:bg-accf-gold-soft flex items-center gap-2 shadow-xl"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

