"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/auth-context";
import { dataProvider } from "@/lib/data-provider";
import { Order, Booking, TreeLeaf, MeetEatListing, MarketplaceListing, BusinessOpportunity } from "@/types/master-models";
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
  Briefcase,
  Store,
  DollarSign,
  TrendingUp,
  MessageSquare,
  Star,
  ChevronRight,
  Plus,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function DashboardPage() {
  const { user, logout, loginAsPersona } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [hostListings, setHostListings] = useState<MeetEatListing[]>([]);
  const [vendorProducts, setVendorProducts] = useState<MarketplaceListing[]>([]);
  const [businessDeals, setBusinessDeals] = useState<BusinessOpportunity[]>([]);
  const [activeTab, setActiveTab] = useState<string>("overview");

  useEffect(() => {
    async function load() {
      if (user) {
        const ords = await dataProvider.getOrders(user.id);
        setOrders(ords);
        const bks = await dataProvider.getBookings();
        setBookings(bks);
        const hl = await dataProvider.getMeetEatListings();
        setHostListings(hl.filter((h) => h.hostMemberId === user.id || h.hostName.includes(user.name.split(" ")[0])));
        const vp = await dataProvider.getMarketplaceListings();
        setVendorProducts(vp.filter((p) => p.vendorName.includes(user.name.split(" ")[0])));
        const bd = await dataProvider.getBusinessOpportunities();
        setBusinessDeals(bd.filter((d) => d.postedByMemberId === user.id || d.posterName.includes(user.name.split(" ")[0])));
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

  // Determine available tabs based on user role
  const isHost = user.role === "host" || user.isHost || user.id === "mem-04";
  const isVendor = user.role === "vendor" || user.isVendor || user.id === "mem-05";
  const isBusiness = user.role === "business" || user.id === "mem-06";
  const isAmbassador = user.role === "ambassador" || user.tier === "Continental Ambassador" || user.id === "mem-03";
  const isParticipant = user.id === "mem-07";
  const isModerator = user.role === "moderator" || user.id === "mem-08";
  const isAdmin = user.role === "admin" || user.id === "mem-09";

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
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-accf-gold text-accf-charcoal font-bold uppercase">
                  {user.tier}
                </span>
              </div>
              <div className="text-xs font-mono text-accf-gold-soft">
                Chair ID: <strong className="text-accf-gold">{user.chairNo}</strong> &bull; {user.city ? `${user.city}, ` : ""}{user.country}
              </div>
              <p className="text-xs text-accf-ivory/70 italic line-clamp-1">
                &ldquo;{user.pledgeText}&rdquo;
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {isAdmin && (
              <Link
                href="/admin"
                className="px-4 py-2.5 rounded bg-accf-maroon text-accf-ivory text-xs font-bold hover:bg-accf-maroon/80 border border-accf-gold transition-colors shadow"
              >
                Secretariat Admin Console &rarr;
              </Link>
            )}
            <Link
              href={`/members/${user.id}`}
              className="px-4 py-2.5 rounded bg-accf-green text-accf-ivory text-xs font-semibold hover:bg-accf-green-light border border-accf-line/40 transition-colors"
            >
              Public Pass &rarr;
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2.5 rounded bg-accf-charcoal-card border border-accf-line text-accf-maroon text-xs font-semibold hover:border-accf-gold"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-accf-line-dark pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === "overview"
                ? "bg-accf-green text-accf-gold shadow"
                : "bg-white text-accf-charcoal border border-accf-line-dark hover:border-accf-gold"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Command Overview</span>
          </button>

          <button
            onClick={() => setActiveTab("idcard")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === "idcard"
                ? "bg-accf-green text-accf-gold shadow"
                : "bg-white text-accf-charcoal border border-accf-line-dark hover:border-accf-gold"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Digital ID Pass</span>
          </button>

          {/* Role-Specific Tabs */}
          {isHost && (
            <button
              onClick={() => setActiveTab("host_studio")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
                activeTab === "host_studio"
                  ? "bg-accf-gold text-accf-charcoal shadow"
                  : "bg-white text-accf-charcoal border border-accf-line-dark hover:border-accf-gold"
              }`}
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Cultural Host Studio</span>
            </button>
          )}

          {isVendor && (
            <button
              onClick={() => setActiveTab("vendor_portal")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
                activeTab === "vendor_portal"
                  ? "bg-accf-gold text-accf-charcoal shadow"
                  : "bg-white text-accf-charcoal border border-accf-line-dark hover:border-accf-gold"
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Vendor Storefront</span>
            </button>
          )}

          {isBusiness && (
            <button
              onClick={() => setActiveTab("trade_desk")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
                activeTab === "trade_desk"
                  ? "bg-accf-gold text-accf-charcoal shadow"
                  : "bg-white text-accf-charcoal border border-accf-line-dark hover:border-accf-gold"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>B2B Trade Desk</span>
            </button>
          )}

          {isAmbassador && (
            <button
              onClick={() => setActiveTab("ambassador_suite")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
                activeTab === "ambassador_suite"
                  ? "bg-accf-gold text-accf-charcoal shadow"
                  : "bg-white text-accf-charcoal border border-accf-line-dark hover:border-accf-gold"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Ambassador Suite</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab("meeteat")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === "meeteat"
                ? "bg-accf-green text-accf-gold shadow"
                : "bg-white text-accf-charcoal border border-accf-line-dark hover:border-accf-gold"
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Meet &amp; Eat Dining</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === "orders"
                ? "bg-accf-green text-accf-gold shadow"
                : "bg-white text-accf-charcoal border border-accf-line-dark hover:border-accf-gold"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Marketplace Orders</span>
          </button>

          <button
            onClick={() => setActiveTab("tree")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === "tree"
                ? "bg-accf-green text-accf-gold shadow"
                : "bg-white text-accf-charcoal border border-accf-line-dark hover:border-accf-gold"
            }`}
          >
            <TreePine className="w-4 h-4" />
            <span>Tree Leaf</span>
          </button>
        </div>

        {/* TAB: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Primary Action Recommendation Banner (No Dead Ends) */}
            <div className="p-6 bg-gradient-to-r from-accf-green-deep to-accf-charcoal text-accf-ivory rounded-3xl border border-accf-gold/60 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-left">
                <div className="text-[10px] font-mono uppercase tracking-widest text-accf-gold font-bold">
                  Recommended Next Action
                </div>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-accf-ivory">
                  {isHost
                    ? "Review and confirm your 2 pending cultural dining requests"
                    : isVendor
                    ? "Fulfill order #ORD-2026-9082 and inspect weekly payout"
                    : isBusiness
                    ? "Connect with East African Agribusiness buyer matching your deal"
                    : isAmbassador
                    ? "Inspect your VIP seat allocation in Zone 1 for the 2km Peace Table"
                    : "Explore the 1,000 Traditional Dishes and book a dining experience"}
                </h3>
                <p className="text-xs text-accf-ivory/70">
                  {isHost
                    ? "Keep your hospitality acceptance rate high for Abuja 2026 certification."
                    : "Stay connected across the 54-nation continental movement."}
                </p>
              </div>
              <button
                onClick={() => {
                  if (isHost) setActiveTab("host_studio");
                  else if (isVendor) setActiveTab("vendor_portal");
                  else if (isBusiness) setActiveTab("trade_desk");
                  else if (isAmbassador) setActiveTab("ambassador_suite");
                  else setActiveTab("meeteat");
                }}
                className="px-6 py-3 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider hover:bg-accf-gold-soft transition-all shadow-lg flex-shrink-0"
              >
                Proceed Now &rarr;
              </button>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div
                onClick={() => setActiveTab("idcard")}
                className="p-6 bg-white rounded-2xl border border-accf-line-dark shadow-sm hover:border-accf-gold transition-all cursor-pointer space-y-2"
              >
                <div className="text-xs font-mono uppercase text-accf-muted">Chair Sequence</div>
                <div className="font-serif font-bold text-2xl text-accf-charcoal">{user.chairNo}</div>
                <div className="text-[10px] text-emerald-600 font-mono">● Verified &amp; Active</div>
              </div>

              <div
                onClick={() => setActiveTab("meeteat")}
                className="p-6 bg-white rounded-2xl border border-accf-line-dark shadow-sm hover:border-accf-gold transition-all cursor-pointer space-y-2"
              >
                <div className="text-xs font-mono uppercase text-accf-muted">Meet &amp; Eat Meals</div>
                <div className="font-serif font-bold text-2xl text-accf-green">
                  {isHost ? "8 Hosted" : `${bookings.length} Booked`}
                </div>
                <div className="text-[10px] text-accf-muted font-mono">Pan-African Friendship</div>
              </div>

              <div
                onClick={() => setActiveTab("orders")}
                className="p-6 bg-white rounded-2xl border border-accf-line-dark shadow-sm hover:border-accf-gold transition-all cursor-pointer space-y-2"
              >
                <div className="text-xs font-mono uppercase text-accf-muted">
                  {isVendor ? "Vendor Sales" : "Marketplace Orders"}
                </div>
                <div className="font-serif font-bold text-2xl text-accf-gold">
                  {isVendor ? "₦1,240,000" : `${orders.length} Orders`}
                </div>
                <div className="text-[10px] text-accf-muted font-mono">
                  {isVendor ? "14 Products Sold" : "Direct African Trade"}
                </div>
              </div>

              <div
                onClick={() => setActiveTab("tree")}
                className="p-6 bg-white rounded-2xl border border-accf-line-dark shadow-sm hover:border-accf-gold transition-all cursor-pointer space-y-2"
              >
                <div className="text-xs font-mono uppercase text-accf-muted">Kolanut Tree Leaf</div>
                <div className="font-serif font-bold text-2xl text-accf-maroon">Planted</div>
                <div className="text-[10px] text-accf-muted font-mono">{user.country} Canopy</div>
              </div>
            </div>

            {/* Cross-Platform Ecosystem Navigation Hub */}
            <div className="p-8 bg-white rounded-3xl border border-accf-line-dark shadow-sm space-y-6">
              <div>
                <h3 className="font-serif font-bold text-2xl text-accf-charcoal">
                  Explore The Continental Ecosystem
                </h3>
                <p className="text-xs text-accf-muted mt-1">
                  Seamlessly navigate between food archives, community channels, trade networks, and peace monuments.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <Link
                  href="/food"
                  className="p-4 rounded-xl bg-accf-ivory border border-accf-line-dark hover:border-accf-gold transition-all space-y-1 block group"
                >
                  <div className="font-bold text-accf-charcoal group-hover:text-accf-green flex items-center justify-between">
                    <span>1,000 Traditional Dishes</span>
                    <span>&rarr;</span>
                  </div>
                  <p className="text-accf-muted text-[11px]">Indigenous recipes and culinary heritage across 54 nations.</p>
                </Link>

                <Link
                  href="/community"
                  className="p-4 rounded-xl bg-accf-ivory border border-accf-line-dark hover:border-accf-gold transition-all space-y-1 block group"
                >
                  <div className="font-bold text-accf-charcoal group-hover:text-accf-green flex items-center justify-between">
                    <span>Community Hubs</span>
                    <span>&rarr;</span>
                  </div>
                  <p className="text-accf-muted text-[11px]">10 forum channels connecting farmers, chefs, and leaders.</p>
                </Link>

                <Link
                  href="/marketplace"
                  className="p-4 rounded-xl bg-accf-ivory border border-accf-line-dark hover:border-accf-gold transition-all space-y-1 block group"
                >
                  <div className="font-bold text-accf-charcoal group-hover:text-accf-green flex items-center justify-between">
                    <span>Africa Marketplace</span>
                    <span>&rarr;</span>
                  </div>
                  <p className="text-accf-muted text-[11px]">Shop authentic ingredients, cookware, and spices.</p>
                </Link>

                <Link
                  href="/peace-table"
                  className="p-4 rounded-xl bg-accf-ivory border border-accf-line-dark hover:border-accf-gold transition-all space-y-1 block group"
                >
                  <div className="font-bold text-accf-charcoal group-hover:text-accf-green flex items-center justify-between">
                    <span>2km African Peace Table</span>
                    <span>&rarr;</span>
                  </div>
                  <p className="text-accf-muted text-[11px]">Banquet blueprints and delegate accreditation.</p>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* TAB: CULTURAL HOST STUDIO */}
        {activeTab === "host_studio" && isHost && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-accf-line-dark shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-accf-line-dark pb-4">
                <div>
                  <h3 className="font-serif font-bold text-2xl text-accf-charcoal">Cultural Host Studio</h3>
                  <p className="text-xs text-accf-muted">Manage your authentic dining experiences, guest reservations, and reviews.</p>
                </div>
                <button
                  onClick={() => alert("Simulated: New Cultural Dining Experience Creator modal initialized.")}
                  className="px-4 py-2 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider hover:bg-accf-gold-soft flex items-center gap-1.5 shadow"
                >
                  <Plus className="w-4 h-4" />
                  List New Dining Experience
                </button>
              </div>

              {/* Inbound Booking Requests */}
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-lg text-accf-charcoal">Inbound Guest Requests</h4>
                <div className="p-4 bg-accf-ivory rounded-xl border border-accf-line-dark flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-sm text-accf-charcoal">Amina Okafor</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accf-green text-accf-gold">2 Guests</span>
                    </div>
                    <p className="text-xs text-accf-muted">Experience: <strong>Sahelian Feast &amp; Ancient Grains</strong> &bull; Oct 14, 2026</p>
                    <p className="text-[11px] text-accf-charcoal/70 italic">&ldquo;Excited to learn about ancient fonio preparation!&rdquo;</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        alert("Guest Booking Accepted! Directional instructions sent to guest.");
                        confetti();
                      }}
                      className="px-3.5 py-1.5 rounded bg-accf-green text-accf-ivory font-bold text-xs hover:bg-accf-green-light"
                    >
                      Accept Booking
                    </button>
                    <button
                      onClick={() => alert("Booking rescheduled.")}
                      className="px-3 py-1.5 rounded bg-accf-ivory text-accf-charcoal border border-accf-line-dark text-xs hover:border-accf-gold"
                    >
                      Reschedule
                    </button>
                  </div>
                </div>
              </div>

              {/* Host Experience Listings */}
              <div className="space-y-3 pt-4">
                <h4 className="font-serif font-bold text-lg text-accf-charcoal">Your Active Dining Listings</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {hostListings.map((hl) => (
                    <div key={hl.id} className="p-4 bg-white rounded-xl border border-accf-line-dark shadow-sm space-y-2">
                      <div className="h-32 rounded-lg overflow-hidden">
                        <img src={hl.images[0]} alt={hl.title} className="w-full h-full object-cover" />
                      </div>
                      <h5 className="font-serif font-bold text-sm text-accf-charcoal">{hl.title}</h5>
                      <div className="flex justify-between text-xs font-mono text-accf-gold font-bold">
                        <span>{formatNGN(hl.priceNGN)} / guest</span>
                        <span className="text-accf-muted">{hl.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: VENDOR PORTAL */}
        {activeTab === "vendor_portal" && isVendor && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-accf-line-dark shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-accf-line-dark pb-4">
                <div>
                  <h3 className="font-serif font-bold text-2xl text-accf-charcoal">Merchant Storefront &amp; Sales</h3>
                  <p className="text-xs text-accf-muted">Fulfill customer orders, update product stock, and monitor payouts.</p>
                </div>
                <button
                  onClick={() => alert("Simulated: Product Listing modal opened.")}
                  className="px-4 py-2 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider hover:bg-accf-gold-soft flex items-center gap-1.5 shadow"
                >
                  <Plus className="w-4 h-4" />
                  Add New Product
                </button>
              </div>

              {/* Financial KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-center">
                <div className="p-4 bg-accf-ivory rounded-xl border border-accf-line-dark">
                  <span className="text-xs text-accf-muted uppercase block">Gross Storefront Sales</span>
                  <strong className="text-xl text-accf-green">₦1,240,000</strong>
                </div>
                <div className="p-4 bg-accf-ivory rounded-xl border border-accf-line-dark">
                  <span className="text-xs text-accf-muted uppercase block">Pending Settlement</span>
                  <strong className="text-xl text-accf-gold">₦348,000</strong>
                </div>
                <div className="p-4 bg-accf-ivory rounded-xl border border-accf-line-dark">
                  <span className="text-xs text-accf-muted uppercase block">Active SKU Inventory</span>
                  <strong className="text-xl text-accf-charcoal">6 Products</strong>
                </div>
              </div>

              {/* Inbound Orders to fulfill */}
              <div className="space-y-3 pt-4">
                <h4 className="font-serif font-bold text-lg text-accf-charcoal">Orders Awaiting Fulfillment</h4>
                <div className="p-4 bg-accf-ivory rounded-xl border border-accf-line-dark flex items-center justify-between gap-4 text-xs font-mono">
                  <div>
                    <div>Order Ref: <strong>#ORD-2026-9082</strong> &bull; Customer: Amina Okafor</div>
                    <div className="text-accf-muted mt-0.5">2x Handcrafted Moroccan Tagine Pot &bull; Total: ₦44,000</div>
                  </div>
                  <button
                    onClick={() => alert("Order marked as Packaged & Shipped. Tracking code generated.")}
                    className="px-3.5 py-1.5 rounded bg-accf-gold text-accf-charcoal font-bold hover:bg-accf-gold-soft"
                  >
                    Mark as Shipped
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: B2B TRADE DESK */}
        {activeTab === "trade_desk" && isBusiness && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-accf-line-dark shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-accf-line-dark pb-4">
                <div>
                  <h3 className="font-serif font-bold text-2xl text-accf-charcoal">Africa B2B Trade Desk</h3>
                  <p className="text-xs text-accf-muted">Commercial matchmaking, intra-African food corridors, and agribusiness co-investments.</p>
                </div>
                <Link
                  href="/business"
                  className="px-4 py-2 rounded bg-accf-green text-accf-ivory font-bold text-xs hover:bg-accf-green-light"
                >
                  Browse All Continental Deals &rarr;
                </Link>
              </div>

              <div className="p-5 bg-accf-ivory rounded-2xl border border-accf-line-dark space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-accf-maroon font-bold uppercase">Active Deal Lead</span>
                  <span className="text-emerald-700 font-bold">● High Match Quality (94%)</span>
                </div>
                <h4 className="font-serif font-bold text-lg text-accf-charcoal">
                  Solar Cold-Chain Storage &amp; Fresh Produce Off-Take
                </h4>
                <p className="text-xs text-accf-charcoal/80 leading-relaxed">
                  East African Agribusiness Consortium is seeking cold-storage distribution partners across Mombasa and Nairobi corridors.
                </p>
                <div className="pt-2 flex justify-between items-center text-xs">
                  <span className="font-mono text-accf-green font-bold">Value: $500,000 USD Co-investment</span>
                  <button
                    onClick={() => alert("Matchmaking connection requested! Our investment officer will facilitate the introduction.")}
                    className="px-4 py-2 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider"
                  >
                    Initiate Direct Trade Match
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: AMBASSADOR SUITE */}
        {activeTab === "ambassador_suite" && isAmbassador && (
          <div className="space-y-8">
            <div className="bg-accf-charcoal text-accf-ivory rounded-3xl p-8 border-2 border-accf-gold shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-accf-line pb-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-accf-gold font-bold">
                    Diplomatic Mission Portfolio
                  </span>
                  <h3 className="font-serif font-bold text-2xl text-accf-ivory">Continental Ambassador Suite</h3>
                </div>
                <span className="px-3 py-1 rounded bg-accf-gold text-accf-charcoal text-xs font-mono font-bold uppercase">
                  SOVEREIGN ACCREDITATION
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 bg-accf-charcoal-card border border-accf-line/60 rounded-xl space-y-1">
                  <span className="text-[10px] text-accf-ivory/50 block uppercase">2km Peace Table Seat</span>
                  <strong className="text-accf-gold text-sm">Zone 1: Elders &amp; Diplomatic Pavilion</strong>
                </div>
                <div className="p-4 bg-accf-charcoal-card border border-accf-line/60 rounded-xl space-y-1">
                  <span className="text-[10px] text-accf-ivory/50 block uppercase">National Leaves Endorsed</span>
                  <strong className="text-emerald-400 text-sm">3,490 Signatures</strong>
                </div>
                <div className="p-4 bg-accf-charcoal-card border border-accf-line/60 rounded-xl space-y-1">
                  <span className="text-[10px] text-accf-ivory/50 block uppercase">Delegation Quota</span>
                  <strong className="text-accf-ivory text-sm">50 Accredited Delegates</strong>
                </div>
              </div>

              <div className="p-5 bg-accf-green-deep border border-accf-gold/40 rounded-2xl space-y-2">
                <h4 className="font-serif font-bold text-base text-accf-gold-soft">Ambassadorial Mandate</h4>
                <p className="text-xs text-accf-ivory/85 leading-relaxed">
                  As a Continental Ambassador, you hold the authority to lead national delegations, bless the breaking of the kolanut during the Abuja 2026 Opening Rite, and represent your nation at the Ministerial Food Security Dialogue.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB: DIGITAL ID PASS */}
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
                &ldquo;{user.pledgeText}&rdquo;
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

        {/* TAB: MEET & EAT */}
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
                Browse More Hosts &rarr;
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
                        Host: <strong>{b.hostName}</strong> &bull; {b.partySize} Guests &bull; {b.date}
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

        {/* TAB: ORDERS */}
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
                Shop Marketplace &rarr;
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
                        Order Ref: <strong className="text-accf-green">{ord.id}</strong> &bull; {ord.createdAt}
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

        {/* TAB: TREE LEAF */}
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
                &ldquo;{user.pledgeText}&rdquo;
              </blockquote>
              <div className="pt-2 flex justify-end">
                <Link
                  href="/kolanut-tree"
                  className="text-xs text-accf-gold hover:underline font-semibold"
                >
                  Locate on Tree of Peace &rarr;
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
