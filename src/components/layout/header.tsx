"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/auth-context";
import { useCart } from "@/lib/context/cart-context";
import { dataProvider } from "@/lib/data-provider";
import { AppNotification } from "@/types/master-models";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ShoppingBag,
  User,
  Heart,
  Globe2,
  Calendar,
  UtensilsCrossed,
  Sparkles,
  TreePine,
  ShieldCheck,
  Award,
  Bell,
  CheckCircle2,
  HeartHandshake,
  Compass,
  BookOpen,
  ArrowRight,
  LogOut,
  LayoutDashboard,
  UserPlus,
} from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItemsCount, setIsOpen } = useCart();

  // Desktop Dropdown States
  const [festivalDropdownOpen, setFestivalDropdownOpen] = useState(false);
  const [movementDropdownOpen, setMovementDropdownOpen] = useState(false);
  const [cultureDropdownOpen, setCultureDropdownOpen] = useState(false);

  // Mobile Menu & Accordion States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFoodOpen, setMobileFoodOpen] = useState(false);
  const [mobileFestivalOpen, setMobileFestivalOpen] = useState(false);
  const [mobileMovementOpen, setMobileMovementOpen] = useState(false);

  // Notification Drawer State
  const [notifDrawerOpen, setNotifDrawerOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  // Client-side portal mount flag
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function loadNotifications() {
      if (user) {
        const data = await dataProvider.getNotifications(user.id);
        setNotifications(data);
      }
    }
    loadNotifications();
  }, [user]);

  // Lock body scroll when mobile menu or notification drawer is open
  useEffect(() => {
    if (mobileMenuOpen || notifDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen, notifDrawerOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setNotifDrawerOpen(false);
  }, [pathname]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleNotificationClick = async (notif: AppNotification) => {
    await dataProvider.markNotificationRead(notif.id);
    if (user) {
      const updated = await dataProvider.getNotifications(user.id);
      setNotifications(updated);
    }
    setNotifDrawerOpen(false);
    router.push(notif.linkUrl);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header className="sticky top-0 z-40 bg-accf-charcoal border-b border-accf-line text-accf-ivory">
        {/* Top Diplomatic Banner */}
        <div className="bg-accf-green-deep text-[11px] font-mono py-1.5 px-4 sm:px-6 lg:px-8 border-b border-accf-line/40 hidden sm:flex items-center justify-between text-accf-ivory/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accf-gold animate-pulse"></span>
            <span>Abuja 2026 Continental Movement &bull; &ldquo;Breaking the Kolanut for the Peace of Africa&rdquo;</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-accf-gold-soft">
            <Link href="/peace-table" className="hover:text-accf-gold transition-colors">2km Peace Table</Link>
            <span>&bull;</span>
            <Link href="/kolanut-tree" className="hover:text-accf-gold transition-colors">Digital Tree</Link>
            <span>&bull;</span>
            <Link href="/partnerships" className="hover:text-accf-gold transition-colors">Partnerships</Link>
          </div>
        </div>

        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center group py-1">
            <img
              src="/images/accf-logo.jpg"
              alt="African Cultural Culinary Festival Abuja 2026"
              className="w-14 h-14 rounded-full object-contain bg-white/95 p-0.5 border-2 border-accf-gold shadow-md group-hover:scale-105 transition-transform flex-shrink-0"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-5 text-sm font-medium text-accf-ivory/80">
            <Link
              href="/"
              className={`hover:text-accf-gold transition-colors py-2 ${isActive("/") ? "text-accf-gold font-semibold" : ""}`}
            >
              Home
            </Link>

            {/* Food & Heritage Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCultureDropdownOpen(true)}
              onMouseLeave={() => setCultureDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-accf-gold transition-colors py-2">
                Food &amp; Heritage
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {cultureDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-accf-charcoal-card border border-accf-line rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    href="/food"
                    className="flex items-center gap-2.5 px-4 py-2 hover:bg-accf-green/60 text-xs text-accf-ivory/90 hover:text-accf-gold"
                  >
                    <UtensilsCrossed className="w-4 h-4 text-accf-gold" />
                    <div>
                      <div className="font-semibold">1,000 Traditional Dishes</div>
                      <div className="text-[10px] text-accf-ivory/60">Indigenous Recipes &amp; Stories</div>
                    </div>
                  </Link>
                  <Link
                    href="/culture"
                    className="flex items-center gap-2.5 px-4 py-2 hover:bg-accf-green/60 text-xs text-accf-ivory/90 hover:text-accf-gold"
                  >
                    <BookOpen className="w-4 h-4 text-accf-gold" />
                    <div>
                      <div className="font-semibold">Cultural Traditions</div>
                      <div className="text-[10px] text-accf-ivory/60">Kolanut Rites &amp; Utensils</div>
                    </div>
                  </Link>
                  <Link
                    href="/tourism"
                    className="flex items-center gap-2.5 px-4 py-2 hover:bg-accf-green/60 text-xs text-accf-ivory/90 hover:text-accf-gold"
                  >
                    <Compass className="w-4 h-4 text-accf-gold" />
                    <div>
                      <div className="font-semibold">Culinary Tourism</div>
                      <div className="text-[10px] text-accf-ivory/60">54-Country Taste Trails</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Festival Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setFestivalDropdownOpen(true)}
              onMouseLeave={() => setFestivalDropdownOpen(false)}
            >
              <Link
                href="/festival"
                className={`flex items-center gap-1 hover:text-accf-gold transition-colors py-2 ${isActive("/festival") ? "text-accf-gold font-semibold" : ""}`}
              >
                Festival 2026
                <ChevronDown className="w-3.5 h-3.5" />
              </Link>
              {festivalDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-accf-charcoal-card border border-accf-line rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    href="/festival"
                    className="flex items-center gap-2.5 px-4 py-2 hover:bg-accf-green/60 text-xs text-accf-ivory/90 hover:text-accf-gold"
                  >
                    <Calendar className="w-4 h-4 text-accf-gold" />
                    <div>
                      <div className="font-semibold">Abuja 2026 Hub</div>
                      <div className="text-[10px] text-accf-ivory/60">Overview &amp; 8 Arenas</div>
                    </div>
                  </Link>
                  <Link
                    href="/peace-table"
                    className="flex items-center gap-2.5 px-4 py-2 hover:bg-accf-green/60 text-xs text-accf-ivory/90 hover:text-accf-gold"
                  >
                    <UtensilsCrossed className="w-4 h-4 text-accf-gold" />
                    <div>
                      <div className="font-semibold">2km African Peace Table</div>
                      <div className="text-[10px] text-accf-ivory/60">10,000 Guests &bull; 1,000 Dishes</div>
                    </div>
                  </Link>
                  <Link
                    href="/partnerships"
                    className="flex items-center gap-2.5 px-4 py-2 hover:bg-accf-green/60 text-xs text-accf-ivory/90 hover:text-accf-gold"
                  >
                    <ShieldCheck className="w-4 h-4 text-accf-gold" />
                    <div>
                      <div className="font-semibold">Partnerships &amp; Sponsors</div>
                      <div className="text-[10px] text-accf-ivory/60">Diplomatic &amp; Corporate</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Movement Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setMovementDropdownOpen(true)}
              onMouseLeave={() => setMovementDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-accf-gold transition-colors py-2">
                Movement
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {movementDropdownOpen && (
                <div className="absolute top-full left-0 w-72 bg-accf-charcoal-card border border-accf-line rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    href="/kolanut-tree"
                    className="flex items-center gap-2.5 px-4 py-2 hover:bg-accf-green/60 text-xs text-accf-ivory/90 hover:text-accf-gold"
                  >
                    <TreePine className="w-4 h-4 text-accf-gold" />
                    <div>
                      <div className="font-semibold">Living African Kolanut Tree</div>
                      <div className="text-[10px] text-accf-ivory/60">300M+ Sovereign Digital Seats</div>
                    </div>
                  </Link>
                  <Link
                    href="/meet-and-eat"
                    className="flex items-center gap-2.5 px-4 py-2 hover:bg-accf-green/60 text-xs text-accf-ivory/90 hover:text-accf-gold"
                  >
                    <Sparkles className="w-4 h-4 text-accf-gold" />
                    <div>
                      <div className="font-semibold">Meet &amp; Eat Africa</div>
                      <div className="text-[10px] text-accf-ivory/60">Food Friendship Network</div>
                    </div>
                  </Link>
                  <Link
                    href="/community"
                    className="flex items-center gap-2.5 px-4 py-2 hover:bg-accf-green/60 text-xs text-accf-ivory/90 hover:text-accf-gold"
                  >
                    <ShieldCheck className="w-4 h-4 text-accf-gold" />
                    <div>
                      <div className="font-semibold">Community Hubs</div>
                      <div className="text-[10px] text-accf-ivory/60">10 Continental Movement Channels</div>
                    </div>
                  </Link>
                  <Link
                    href="/peace-wall"
                    className="flex items-center gap-2.5 px-4 py-2 hover:bg-accf-green/60 text-xs text-accf-ivory/90 hover:text-accf-gold"
                  >
                    <HeartHandshake className="w-4 h-4 text-accf-gold" />
                    <div>
                      <div className="font-semibold">Digital Peace Wall</div>
                      <div className="text-[10px] text-accf-ivory/60">Live Pan-African Peace Stream</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/marketplace"
              className={`hover:text-accf-gold transition-colors py-2 ${isActive("/marketplace") ? "text-accf-gold font-semibold" : ""}`}
            >
              Marketplace
            </Link>

            <Link
              href="/business"
              className={`hover:text-accf-gold transition-colors py-2 ${isActive("/business") ? "text-accf-gold font-semibold" : ""}`}
            >
              Business
            </Link>

            <Link
              href="/media"
              className={`hover:text-accf-gold transition-colors py-2 ${isActive("/media") ? "text-accf-gold font-semibold" : ""}`}
            >
              Media
            </Link>
          </div>

          {/* Right CTA Actions */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Notifications Bell */}
            <button
              onClick={() => setNotifDrawerOpen(true)}
              className="relative p-2 rounded-full text-accf-ivory/80 hover:text-accf-gold hover:bg-accf-green/40 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accf-gold text-accf-charcoal text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 rounded-full text-accf-ivory/80 hover:text-accf-gold hover:bg-accf-green/40 transition-colors"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accf-gold text-accf-charcoal text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* User Auth Profile or Login */}
            {isAuthenticated && user ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-accf-green/60 border border-accf-line hover:border-accf-gold transition-all"
              >
                <img
                  src={user.photoUrl}
                  alt={user.name}
                  className="w-6 h-6 rounded-full object-cover border border-accf-gold"
                />
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-semibold leading-tight text-accf-ivory truncate max-w-[100px]">
                    {user.name.split(" ")[0]}
                  </span>
                  <span className="text-[9px] font-mono text-accf-gold-soft">{user.tier}</span>
                </div>
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-accf-ivory/90 hover:text-accf-gold border border-accf-line/60 rounded-xl hover:border-accf-gold transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login</span>
              </Link>
            )}

            {/* Primary Take A Seat CTA (Gold) */}
            <Link
              href="/membership/checkout"
              className="inline-flex items-center justify-center px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-accf-gold text-accf-charcoal hover:bg-accf-gold-soft transition-all transform hover:-translate-y-0.5 shadow-md uppercase tracking-wider flex-shrink-0"
            >
              Take A Seat
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-accf-ivory hover:text-accf-gold bg-accf-charcoal-card border border-accf-line hover:border-accf-gold transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-accf-gold" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* ========================================================================= */}
      {/* FULL-SCREEN MOBILE NAVIGATION DRAWER (Rendered via React Portal)           */}
      {/* ========================================================================= */}
      {mounted &&
        mobileMenuOpen &&
        createPortal(
          <div className="fixed inset-0 z-[9999] bg-[#0E1512]/95 backdrop-blur-2xl text-accf-ivory flex flex-col justify-between overflow-hidden animate-in fade-in duration-200">
            {/* Top Bar inside Mobile Drawer */}
            <div className="p-4 sm:p-6 border-b border-accf-line/60 flex items-center justify-between bg-accf-charcoal/90">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3"
              >
                <img
                  src="/images/accf-logo.jpg"
                  alt="ACCF Official Emblem"
                  className="w-12 h-12 rounded-full object-contain bg-white/95 p-0.5 border-2 border-accf-gold shadow"
                />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-accf-gold font-bold block">
                    Continental Movement
                  </span>
                  <h3 className="font-serif font-bold text-sm text-accf-ivory">
                    African Cultural Culinary Festival
                  </h3>
                </div>
              </Link>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl bg-accf-charcoal-card border border-accf-line text-accf-gold hover:bg-accf-green transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 max-w-lg mx-auto w-full">
              {/* User Profile Card (if authenticated) or Login / Register buttons */}
              {isAuthenticated && user ? (
                <div className="p-4 rounded-2xl bg-accf-green-deep border border-accf-gold shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.photoUrl}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-accf-gold shadow"
                    />
                    <div>
                      <h4 className="font-serif font-bold text-sm text-accf-ivory">{user.name}</h4>
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-accf-gold">
                        <span>{user.chairNo || "AKDT-0000001"}</span>
                        <span>&bull;</span>
                        <span className="text-accf-ivory/80">{user.tier}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2.5 rounded-xl bg-accf-green hover:bg-accf-green-light text-accf-gold shadow"
                      title="Command Center"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="p-2.5 rounded-xl bg-black/40 text-red-400 hover:text-red-300"
                      title="Logout"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 px-4 rounded-xl bg-accf-charcoal-card border border-accf-line text-center text-xs font-bold text-accf-ivory hover:border-accf-gold flex items-center justify-center gap-2"
                  >
                    <User className="w-3.5 h-3.5 text-accf-gold" />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 px-4 rounded-xl bg-accf-gold text-center text-xs font-bold text-accf-charcoal uppercase tracking-wider hover:bg-accf-gold-soft flex items-center justify-center gap-2 shadow-lg"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-accf-charcoal" />
                    <span>Register</span>
                  </Link>
                </div>
              )}

              {/* Navigation Items & Accordions */}
              <div className="space-y-2 border-t border-accf-line/60 pt-4">
                {/* Home */}
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl text-sm font-semibold transition-colors ${
                    isActive("/") ? "bg-accf-green text-accf-gold font-bold shadow-md" : "text-accf-ivory hover:bg-accf-charcoal-card"
                  }`}
                >
                  <span className="font-serif">Home</span>
                  <ChevronRight className="w-4 h-4 text-accf-gold/60" />
                </Link>

                {/* Food & Heritage Accordion */}
                <div className="rounded-2xl border border-accf-line/40 overflow-hidden bg-accf-charcoal/40">
                  <button
                    onClick={() => setMobileFoodOpen(!mobileFoodOpen)}
                    className="w-full flex items-center justify-between p-3.5 text-sm font-semibold text-accf-ivory hover:bg-accf-charcoal-card transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-accf-green/60 flex items-center justify-center text-accf-gold">
                        <UtensilsCrossed className="w-4 h-4" />
                      </div>
                      <span className="font-serif">Food &amp; Heritage</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-accf-gold transition-transform duration-200 ${
                        mobileFoodOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {mobileFoodOpen && (
                    <div className="px-4 pb-3 pt-1 space-y-1 bg-black/40 border-t border-accf-line/40">
                      <Link
                        href="/food"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 text-xs text-accf-ivory/85 hover:text-accf-gold"
                      >
                        1,000 Traditional Dishes &amp; Recipes &rarr;
                      </Link>
                      <Link
                        href="/culture"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 text-xs text-accf-ivory/85 hover:text-accf-gold"
                      >
                        Cultural Traditions &amp; Kolanut Rites &rarr;
                      </Link>
                      <Link
                        href="/tourism"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 text-xs text-accf-ivory/85 hover:text-accf-gold"
                      >
                        Culinary Tourism &amp; 54 Nations &rarr;
                      </Link>
                    </div>
                  )}
                </div>

                {/* Festival 2026 Accordion */}
                <div className="rounded-2xl border border-accf-line/40 overflow-hidden bg-accf-charcoal/40">
                  <button
                    onClick={() => setMobileFestivalOpen(!mobileFestivalOpen)}
                    className="w-full flex items-center justify-between p-3.5 text-sm font-semibold text-accf-ivory hover:bg-accf-charcoal-card transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-accf-green/60 flex items-center justify-center text-accf-gold">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <span className="font-serif">Festival 2026</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-accf-gold transition-transform duration-200 ${
                        mobileFestivalOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {mobileFestivalOpen && (
                    <div className="px-4 pb-3 pt-1 space-y-1 bg-black/40 border-t border-accf-line/40">
                      <Link
                        href="/festival"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 text-xs text-accf-ivory/85 hover:text-accf-gold"
                      >
                        Abuja 2026 Overview &amp; 8 Arenas &rarr;
                      </Link>
                      <Link
                        href="/peace-table"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 text-xs text-accf-ivory/85 hover:text-accf-gold"
                      >
                        2km African Peace Table (10,000 Guests) &rarr;
                      </Link>
                      <Link
                        href="/partnerships"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 text-xs text-accf-ivory/85 hover:text-accf-gold"
                      >
                        Partnerships &amp; Sponsorships &rarr;
                      </Link>
                    </div>
                  )}
                </div>

                {/* Continental Movement Accordion */}
                <div className="rounded-2xl border border-accf-line/40 overflow-hidden bg-accf-charcoal/40">
                  <button
                    onClick={() => setMobileMovementOpen(!mobileMovementOpen)}
                    className="w-full flex items-center justify-between p-3.5 text-sm font-semibold text-accf-ivory hover:bg-accf-charcoal-card transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-accf-green/60 flex items-center justify-center text-accf-gold">
                        <TreePine className="w-4 h-4" />
                      </div>
                      <span className="font-serif">Continental Movement</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-accf-gold transition-transform duration-200 ${
                        mobileMovementOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {mobileMovementOpen && (
                    <div className="px-4 pb-3 pt-1 space-y-1 bg-black/40 border-t border-accf-line/40">
                      <Link
                        href="/kolanut-tree"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 text-xs text-accf-ivory/85 hover:text-accf-gold"
                      >
                        Living African Kolanut Tree (300M+ Seats) &rarr;
                      </Link>
                      <Link
                        href="/meet-and-eat"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 text-xs text-accf-ivory/85 hover:text-accf-gold"
                      >
                        Meet &amp; Eat Africa &rarr;
                      </Link>
                      <Link
                        href="/community"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 text-xs text-accf-ivory/85 hover:text-accf-gold"
                      >
                        Community Hubs (10 Movement Channels) &rarr;
                      </Link>
                      <Link
                        href="/peace-wall"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 text-xs text-accf-ivory/85 hover:text-accf-gold"
                      >
                        Digital Peace Wall &rarr;
                      </Link>
                    </div>
                  )}
                </div>

                {/* Direct Links */}
                <Link
                  href="/marketplace"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl text-sm font-semibold transition-colors ${
                    isActive("/marketplace") ? "bg-accf-green text-accf-gold font-bold" : "text-accf-ivory hover:bg-accf-charcoal-card"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-accf-green/60 flex items-center justify-center text-accf-gold">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <span className="font-serif">Marketplace</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-accf-gold/60" />
                </Link>

                <Link
                  href="/business"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl text-sm font-semibold transition-colors ${
                    isActive("/business") ? "bg-accf-green text-accf-gold font-bold" : "text-accf-ivory hover:bg-accf-charcoal-card"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-accf-green/60 flex items-center justify-center text-accf-gold">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="font-serif">Agribusiness &amp; Trade</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-accf-gold/60" />
                </Link>

                <Link
                  href="/media"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl text-sm font-semibold transition-colors ${
                    isActive("/media") ? "bg-accf-green text-accf-gold font-bold" : "text-accf-ivory hover:bg-accf-charcoal-card"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-accf-green/60 flex items-center justify-center text-accf-gold">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <span className="font-serif">Media Center</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-accf-gold/60" />
                </Link>
              </div>
            </div>

            {/* Bottom Actions Footer inside Mobile Drawer */}
            <div className="p-5 border-t border-accf-line bg-accf-charcoal space-y-3">
              <Link
                href="/membership/checkout"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-accf-gold to-accf-gold-soft text-accf-charcoal font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <span>Take A Seat For Africa</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="text-center text-[10px] font-mono text-accf-gold-soft">
                &ldquo;Breaking the Kolanut for the Peace of Africa&rdquo;
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* ========================================================================= */}
      {/* NOTIFICATIONS DRAWER (Rendered via React Portal)                           */}
      {/* ========================================================================= */}
      {mounted &&
        notifDrawerOpen &&
        createPortal(
          <div className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-md flex justify-end animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-accf-charcoal text-accf-ivory h-full shadow-2xl border-l border-accf-line flex flex-col justify-between animate-in slide-in-from-right duration-200">
              <div className="p-5 border-b border-accf-line flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-accf-gold" />
                  <h3 className="font-serif font-bold text-lg">Notifications Center</h3>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-accf-gold text-accf-charcoal text-xs font-bold font-mono">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setNotifDrawerOpen(false)}
                  className="p-2 rounded-xl text-accf-ivory/60 hover:text-accf-ivory hover:bg-accf-green transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 space-y-3 overflow-y-auto flex-1">
                {notifications.length === 0 ? (
                  <div className="text-center py-16 space-y-2 text-accf-ivory/60">
                    <Bell className="w-10 h-10 mx-auto text-accf-ivory/30" />
                    <p className="text-xs">No notifications yet for this persona.</p>
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => handleNotificationClick(notif)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                        !notif.isRead
                          ? "bg-accf-green-deep border-accf-gold shadow-md"
                          : "bg-accf-charcoal-card border-accf-line/60 hover:border-accf-gold/60"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <h4 className="font-serif font-bold text-accf-ivory">{notif.title}</h4>
                        <span className="text-[10px] font-mono text-accf-gold-soft">{notif.timestamp}</span>
                      </div>
                      <p className="text-xs text-accf-ivory/80 leading-relaxed">{notif.message}</p>
                      <div className="pt-1 text-[10px] font-mono text-accf-gold flex items-center gap-1">
                        <span>Click to view details</span>
                        <span>&rarr;</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-4 border-t border-accf-line bg-accf-charcoal-card flex justify-between items-center text-xs">
                <span className="text-[10px] font-mono text-accf-ivory/50">
                  User: {user?.name || "Guest"}
                </span>
                <button
                  onClick={() => setNotifDrawerOpen(false)}
                  className="px-4 py-2 rounded-xl bg-accf-green text-accf-ivory font-semibold text-xs hover:bg-accf-green-light"
                >
                  Close Drawer
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
