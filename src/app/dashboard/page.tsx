"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/auth-context";
import { dataProvider } from "@/lib/data-provider";
import { Order, Booking, TreeLeaf } from "@/types/master-models";
import { formatNGN } from "@/lib/utils";
import Link from "next/link";
import {
  User,
  Award,
  TreePine,
  UtensilsCrossed,
  ShoppingBag,
  Ticket,
  ShieldCheck,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "idcard" | "meeteat" | "orders" | "tree">("overview");

  useEffect(() => {
    async function load() {
      if (user) {
        const ords = await dataProvider.getOrders(user.id);
        setOrders(ords);
        const bks = await dataProvider.getBookings();
        setBookings(bks);
      }
    }
    load();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-accf-ivory flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl border border-accf-line-dark text-center space-y-4 max-w-md">
          <User className="w-12 h-12 text-accf-gold mx-auto" />
          <h2 className="font-serif font-bold text-2xl text-accf-charcoal">Member Sign In Required</h2>
          <p className="text-xs text-accf-muted">
            Please log in or select one of the 9 simulated demo personas to access your command center.
          </p>
          <Link
            href="/auth/login"
            className="px-6 py-2.5 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider block"
          >
            Go to Login / Persona Selector
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-accf-ivory py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header Card */}
        <div className="bg-accf-charcoal text-accf-ivory rounded-3xl p-6 sm:p-8 border border-accf-line shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={user.photoUrl}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-accf-gold shadow-lg"
            />
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="font-serif font-bold text-2xl sm:text-3xl text-accf-ivory">{user.name}</h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accf-gold text-accf-charcoal font-bold uppercase">
                  {user.tier}
                </span>
              </div>
              <div className="text-xs font-mono text-accf-gold-soft">
                Chair ID: <strong className="text-accf-gold">{user.chairNo}</strong> • {user.city ? `${user.city}, ` : ""}{user.country}
              </div>
              <p className="text-xs text-accf-ivory/70 italic line-clamp-1">
                &quot;{user.pledgeText}&quot;
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/members/${user.id}`}
              className="px-4 py-2.5 rounded bg-accf-green text-accf-ivory text-xs font-semibold hover:bg-accf-green-light border border-accf-line/40 transition-colors"
            >
              Public Profile Pass →
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2.5 rounded bg-accf-charcoal-card border border-accf-line text-accf-maroon text-xs font-semibold hover:border-accf-gold"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-accf-line-dark pb-2 overflow-x-auto">
          {[
            { id: "overview", label: "Command Overview", icon: Sparkles },
            { id: "idcard", label: "Digital ID Pass", icon: Award },
            { id: "meeteat", label: "Meet & Eat Meals", icon: UtensilsCrossed },
            { id: "orders", label: "Marketplace Orders", icon: ShoppingBag },
            { id: "tree", label: "Tree Leaf & Pledge", icon: TreePine },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
                  activeTab === tab.id
                    ? "bg-accf-green text-accf-gold shadow"
                    : "bg-white text-accf-charcoal border border-accf-line-dark hover:border-accf-gold"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Widget 1: Digital ID Snapshot */}
            <div className="p-6 bg-accf-charcoal text-accf-ivory rounded-2xl border border-accf-gold shadow-lg space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-accf-gold uppercase tracking-wider font-bold">
                    Digital Chair Credentials
                  </span>
                  <Award className="w-4 h-4 text-accf-gold" />
                </div>
                <div className="font-serif font-bold text-xl">{user.chairNo}</div>
                <div className="text-xs text-accf-ivory/75">
                  Tier: <strong className="text-accf-gold-soft">{user.tier}</strong> • Valid for Abuja 2026
                </div>
              </div>
              <button
                onClick={() => setActiveTab("idcard")}
                className="w-full py-2 rounded bg-accf-green text-accf-ivory text-xs font-semibold hover:bg-accf-green-light"
              >
                Open Full Holographic Pass
              </button>
            </div>

            {/* Widget 2: Meet & Eat Dining */}
            <div className="p-6 bg-white rounded-2xl border border-accf-line-dark shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-accf-maroon uppercase tracking-wider font-bold">
                    Meet &amp; Eat Bookings
                  </span>
                  <UtensilsCrossed className="w-4 h-4 text-accf-green" />
                </div>
                <div className="font-serif font-bold text-2xl text-accf-charcoal">
                  {bookings.length} {bookings.length === 1 ? "Meal" : "Meals"}
                </div>
                <p className="text-xs text-accf-muted leading-relaxed">
                  Active reservations and hosted dining experiences across the Pan-African friendship network.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("meeteat")}
                className="w-full py-2 rounded bg-accf-ivory text-accf-charcoal border border-accf-line-dark text-xs font-semibold hover:border-accf-gold"
              >
                Manage Reservations
              </button>
            </div>

            {/* Widget 3: Marketplace Orders */}
            <div className="p-6 bg-white rounded-2xl border border-accf-line-dark shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-accf-maroon uppercase tracking-wider font-bold">
                    Marketplace Orders
                  </span>
                  <ShoppingBag className="w-4 h-4 text-accf-gold" />
                </div>
                <div className="font-serif font-bold text-2xl text-accf-charcoal">
                  {orders.length} {orders.length === 1 ? "Order" : "Orders"}
                </div>
                <p className="text-xs text-accf-muted leading-relaxed">
                  Track shipment status for single-origin coffees, traditional spices, and cultural crafts.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("orders")}
                className="w-full py-2 rounded bg-accf-ivory text-accf-charcoal border border-accf-line-dark text-xs font-semibold hover:border-accf-gold"
              >
                View Order History
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: DIGITAL ID PASS */}
        {activeTab === "idcard" && (
          <div className="flex justify-center py-6">
            <div className="w-full max-w-md bg-accf-charcoal text-accf-ivory rounded-3xl p-8 border-2 border-accf-gold shadow-2xl space-y-6 id-card-glow relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-accf-line pb-4">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/images/accf-logo.jpg"
                    alt="African Cultural Culinary Festival Logo"
                    className="w-9 h-9 rounded-full object-contain bg-white/95 p-0.5 border border-accf-gold shadow"
                  />
                  <div>
                    <div className="font-serif font-bold text-sm text-accf-ivory">African Cultural Culinary Festival</div>
                    <div className="text-[9px] font-mono tracking-widest text-accf-gold uppercase">
                      Official Diplomatic Seat Pass
                    </div>
                  </div>
                </div>
                <div className="px-2 py-0.5 rounded bg-accf-gold text-accf-charcoal text-[9px] font-mono font-bold uppercase">
                  VERIFIED
                </div>
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={user.photoUrl}
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-accf-gold shadow-md"
                />
                <div>
                  <h3 className="font-serif font-bold text-xl text-accf-ivory">{user.name}</h3>
                  <div className="text-xs font-semibold text-accf-gold-soft">{user.tier}</div>
                  <div className="text-[11px] text-accf-ivory/60">{user.city ? `${user.city}, ` : ""}{user.country}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3.5 bg-accf-charcoal-card border border-accf-line/60 rounded-xl text-xs font-mono">
                <div>
                  <span className="text-[10px] text-accf-ivory/50 block">Chair ID:</span>
                  <strong className="text-accf-gold">{user.chairNo}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-accf-ivory/50 block">Member Since:</span>
                  <strong className="text-accf-ivory">{user.joinDate}</strong>
                </div>
              </div>

              <div className="p-3 bg-accf-green-deep border border-accf-line/60 rounded-lg text-xs italic text-accf-ivory/90">
                &quot;{user.pledgeText}&quot;
              </div>

              <div className="pt-2 border-t border-accf-line/60 flex items-center justify-between text-[10px] text-accf-ivory/70">
                <span>Committed to Peace, Unity &amp; Cultural Solidarity</span>
                <div className="w-8 h-8 rounded border border-accf-gold/40 bg-accf-green flex items-center justify-center font-mono text-[9px] text-accf-gold">
                  QR
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MEET & EAT */}
        {activeTab === "meeteat" && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-accf-line-dark shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-accf-line-dark pb-4">
              <div>
                <h3 className="font-serif font-bold text-xl text-accf-charcoal">Your Cultural Dining Bookings</h3>
                <p className="text-xs text-accf-muted mt-0.5">
                  Shared home meals across Nigeria, Ghana, Kenya, Ethiopia, and 50 other nations.
                </p>
              </div>
              <Link
                href="/meet-and-eat"
                className="px-4 py-2 rounded bg-accf-green text-accf-ivory text-xs font-semibold hover:bg-accf-green-light"
              >
                Browse More Hosts →
              </Link>
            </div>

            {bookings.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <UtensilsCrossed className="w-12 h-12 text-accf-muted mx-auto" />
                <p className="text-xs text-accf-muted">You haven&apos;t booked a cultural meal yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 bg-accf-ivory rounded-xl border border-accf-line-dark flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <h4 className="font-serif font-bold text-base text-accf-charcoal">{b.listingTitle}</h4>
                      <div className="text-xs text-accf-muted font-mono mt-1">
                        Host: <strong>{b.hostName}</strong> • {b.partySize} Guests • {b.date}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">
                        ● {b.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: ORDERS */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-accf-line-dark shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-accf-line-dark pb-4">
              <div>
                <h3 className="font-serif font-bold text-xl text-accf-charcoal">Marketplace Order History</h3>
                <p className="text-xs text-accf-muted mt-0.5">
                  Track authentic ingredients, spices, and cookware ordered from African vendors.
                </p>
              </div>
              <Link
                href="/marketplace"
                className="px-4 py-2 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider hover:bg-accf-gold-soft"
              >
                Shop Marketplace →
              </Link>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <ShoppingBag className="w-12 h-12 text-accf-muted mx-auto" />
                <p className="text-xs text-accf-muted">No marketplace orders recorded yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-5 bg-accf-ivory rounded-xl border border-accf-line-dark space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono border-b border-accf-line-dark pb-2">
                      <div>
                        Order Ref: <strong className="text-accf-green">{ord.id}</strong> • {ord.createdAt}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-accf-muted">Tracking: {ord.trackingNumber}</span>
                        <span className="px-2 py-0.5 rounded bg-accf-green text-accf-gold font-bold">
                          {ord.status}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {ord.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <span className="text-accf-charcoal font-medium">
                            {item.quantity}x {item.title}
                          </span>
                          <span className="font-mono text-accf-muted">{formatNGN(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-accf-line-dark flex justify-between items-center text-xs font-bold">
                      <span>Total Paid:</span>
                      <span className="font-mono text-accf-gold text-sm">{formatNGN(ord.totalAmountNGN)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: TREE LEAF */}
        {activeTab === "tree" && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-accf-line-dark shadow-sm space-y-6">
            <h3 className="font-serif font-bold text-xl text-accf-charcoal">Your Leaf on the Kolanut Tree</h3>
            <div className="p-6 bg-accf-charcoal text-accf-ivory rounded-2xl border border-accf-gold space-y-4 max-w-lg">
              <div className="flex items-center gap-3">
                <img
                  src={user.photoUrl}
                  alt={user.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-accf-gold shadow"
                />
                <div>
                  <h4 className="font-serif font-bold text-lg">{user.name}</h4>
                  <div className="text-xs font-mono text-accf-gold">{user.chairNo}</div>
                  <div className="text-[11px] text-accf-ivory/60">{user.country}</div>
                </div>
              </div>
              <blockquote className="font-serif italic text-base text-accf-ivory/90 border-l-2 border-accf-gold pl-3">
                &quot;{user.pledgeText}&quot;
              </blockquote>
              <div className="pt-2 flex justify-end">
                <Link
                  href="/kolanut-tree"
                  className="text-xs text-accf-gold hover:underline font-semibold"
                >
                  Locate on Tree of Peace →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

