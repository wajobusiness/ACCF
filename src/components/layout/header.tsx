"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItemsCount, setIsOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [festivalDropdownOpen, setFestivalDropdownOpen] = useState(false);
  const [movementDropdownOpen, setMovementDropdownOpen] = useState(false);
  const [cultureDropdownOpen, setCultureDropdownOpen] = useState(false);

  // Notification Drawer State
  const [notifDrawerOpen, setNotifDrawerOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    async function loadNotifications() {
      if (user) {
        const data = await dataProvider.getNotifications(user.id);
        setNotifications(data);
      }
    }
    loadNotifications();
  }, [user]);

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
    <header className="sticky top-0 z-40 bg-accf-charcoal/95 backdrop-blur-md border-b border-accf-line text-accf-ivory">
      {/* Top Diplomatic Banner */}
      <div className="bg-accf-green-deep text-[11px] font-mono py-1 px-4 sm:px-6 lg:px-8 border-b border-accf-line/40 hidden sm:flex items-center justify-between text-accf-ivory/80">
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
              <div className="absolute top-full left-0 w-64 bg-accf-charcoal-card border border-accf-line rounded shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
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
              <div className="absolute top-full left-0 w-64 bg-accf-charcoal-card border border-accf-line rounded shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
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
              <div className="absolute top-full left-0 w-72 bg-accf-charcoal-card border border-accf-line rounded shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <Link
                  href="/kolanut-tree"
                  className="flex items-center gap-2.5 px-4 py-2 hover:bg-accf-green/60 text-xs text-accf-ivory/90 hover:text-accf-gold"
                >
                  <TreePine className="w-4 h-4 text-accf-gold" />
                  <div>
                    <div className="font-semibold">African Kolanut Tree</div>
                    <div className="text-[10px] text-accf-ivory/60">The Living Tree of Peace</div>
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
                    <div className="text-[10px] text-accf-ivory/60">10 African Food Movement Channels</div>
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
        <div className="flex items-center gap-3 sm:gap-4">
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
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded bg-accf-green/60 border border-accf-line hover:border-accf-gold transition-all"
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
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-accf-ivory/90 hover:text-accf-gold border border-accf-line/60 rounded hover:border-accf-gold transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              Login
            </Link>
          )}

          {/* Primary Take A Seat CTA (Gold) */}
          <Link
            href="/membership/checkout"
            className="inline-flex items-center justify-center px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold rounded bg-accf-gold text-accf-charcoal hover:bg-accf-gold-soft transition-all transform hover:-translate-y-0.5 shadow-md uppercase tracking-wider"
          >
            Take A Seat
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-accf-ivory hover:text-accf-gold"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* NOTIFICATIONS DRAWER */}
      {notifDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
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
                className="p-1 rounded text-accf-ivory/60 hover:text-accf-ivory"
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
                    className={`p-4 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
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
                Persona: {user?.name || "Guest"}
              </span>
              <button
                onClick={() => setNotifDrawerOpen(false)}
                className="px-4 py-2 rounded bg-accf-green text-accf-ivory font-semibold text-xs hover:bg-accf-green-light"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
