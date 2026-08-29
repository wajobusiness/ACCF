"use client";

import React, { useState } from "react";
import { useCart } from "@/lib/context/cart-context";
import { formatNGN } from "@/lib/utils";
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle2, CreditCard, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalAmountNGN, checkout } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [address, setAddress] = useState("14 Victoria Island Boulevard");
  const [country, setCountry] = useState("Nigeria");
  const [orderPlacedId, setOrderPlacedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulatedPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = await checkout(address, country);
    setOrderPlacedId(orderId);
    setIsCheckingOut(false);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-accf-charcoal text-accf-ivory border-l border-accf-line shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-accf-line flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-accf-gold" />
              <h3 className="font-serif font-bold text-lg">Marketplace Cart</h3>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setOrderPlacedId(null);
                setIsCheckingOut(false);
              }}
              className="p-1.5 rounded-full hover:bg-accf-green text-accf-ivory/70 hover:text-accf-ivory"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success State */}
          {orderPlacedId ? (
            <div className="p-8 text-center flex-1 flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-accf-green border-2 border-accf-gold flex items-center justify-center text-accf-gold">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-serif font-bold text-2xl text-accf-gold-soft">Order Confirmed!</h4>
              <p className="text-sm text-accf-ivory/80">
                Order Reference: <strong className="font-mono text-accf-gold">{orderPlacedId}</strong>
              </p>
              <p className="text-xs text-accf-ivory/60 max-w-xs leading-relaxed">
                Your simulated payment was authorized via the ACCF Pan-African Settlement Gateway. The vendor will package your traditional ingredients for shipment.
              </p>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setOrderPlacedId(null);
                }}
                className="mt-4 px-6 py-2.5 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider hover:bg-accf-gold-soft"
              >
                Continue Shopping
              </button>
            </div>
          ) : isCheckingOut ? (
            /* Checkout Form */
            <div className="p-6 flex-1 overflow-y-auto space-y-5">
              <div className="flex items-center gap-2 pb-2 border-b border-accf-line">
                <CreditCard className="w-4 h-4 text-accf-gold" />
                <h4 className="font-serif font-semibold text-sm">Simulated Pan-African Checkout</h4>
              </div>

              <form onSubmit={handleSimulatedPayment} className="space-y-4 text-xs">
                <div>
                  <label className="block text-accf-ivory/70 mb-1">Destination Country</label>
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
                    <option value="United Kingdom">United Kingdom (Diaspora) 🇬🇧</option>
                    <option value="United States">United States (Diaspora) 🇺🇸</option>
                  </select>
                </div>

                <div>
                  <label className="block text-accf-ivory/70 mb-1">Delivery Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-accf-charcoal-card border border-accf-line rounded text-accf-ivory focus:border-accf-gold"
                  />
                </div>

                <div className="p-3 bg-accf-green-deep border border-accf-line rounded space-y-2">
                  <div className="flex justify-between font-mono">
                    <span>Subtotal:</span>
                    <span>{formatNGN(totalAmountNGN)}</span>
                  </div>
                  <div className="flex justify-between font-mono text-accf-gold-soft">
                    <span>Intra-African Freight:</span>
                    <span>₦0 (Demo Preview)</span>
                  </div>
                  <div className="pt-2 border-t border-accf-line/60 flex justify-between font-bold text-sm text-accf-gold">
                    <span>Total:</span>
                    <span>{formatNGN(totalAmountNGN)}</span>
                  </div>
                </div>

                <div className="p-2.5 bg-accf-charcoal-card border border-amber-500/30 rounded flex items-start gap-2 text-[11px] text-amber-200/90">
                  <ShieldCheck className="w-4 h-4 text-accf-gold flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Demo Payment Adapter:</strong> Simulated NGN transaction. No real credit card or bank charge is executed.
                  </span>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="w-1/2 py-2.5 rounded border border-accf-line hover:border-accf-gold text-accf-ivory font-semibold"
                  >
                    Back to Cart
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2.5 rounded bg-accf-gold text-accf-charcoal font-bold hover:bg-accf-gold-soft uppercase tracking-wider"
                  >
                    Pay {formatNGN(totalAmountNGN)}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Items List */
            <>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <ShoppingBag className="w-12 h-12 text-accf-ivory/30 mx-auto" />
                    <p className="text-sm text-accf-ivory/60">Your cart is currently empty.</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.listingId}
                      className="p-3 bg-accf-charcoal-card border border-accf-line rounded flex gap-3 items-center"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 rounded object-cover border border-accf-line flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold truncate text-accf-ivory">{item.title}</h4>
                        <div className="text-xs font-mono text-accf-gold-soft mt-1">
                          {formatNGN(item.price)}
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-accf-line rounded bg-accf-charcoal">
                            <button
                              onClick={() => updateQuantity(item.listingId, item.quantity - 1)}
                              className="p-1 hover:text-accf-gold"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-mono">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.listingId, item.quantity + 1)}
                              className="p-1 hover:text-accf-gold"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.listingId)}
                            className="text-accf-maroon hover:text-red-400 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Bottom Totals */}
              {items.length > 0 && (
                <div className="p-6 border-t border-accf-line bg-accf-charcoal-card space-y-4">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span>Total Amount:</span>
                    <span className="font-mono text-accf-gold text-lg">{formatNGN(totalAmountNGN)}</span>
                  </div>
                  <button
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full py-3 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-widest hover:bg-accf-gold-soft transition-colors shadow-lg"
                  >
                    Proceed to Simulated Checkout
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

