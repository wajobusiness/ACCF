"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/context/auth-context";
import { useCart } from "@/lib/context/cart-context";
import {
  Menu,
  X,
  ShoppingBag,
  User,
  ChevronDown,
  Sparkles,
  TreePine,
  UtensilsCrossed,
  ShieldCheck,
  Calendar,
  Compass,
  Building2,
  Newspaper,
  HeartHandshake,
} from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItemsCount, setIsOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [festivalDropdownOpen, setFestivalDropdownOpen] = useState(false);
  const [movementDropdownOpen, setMovementDropdownOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-40 bg-accf-charcoal/95 backdrop-blur-md border-b border-accf-line text-accf-ivory">
      {/* Top diplomatic banner ticker */}
      <div className="bg-accf-green-deep border-b border-accf-line/40 py-1.5 px-4 text-xs font-mono text-accf-ivory/80 flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <span className="inline-block w-2 h-2 rounded-full bg-accf-gold animate-pulse"></span>
          <span className="text-accf-gold-soft font-semibold">ABUJA 2026 OFFICIAL PLATFORM:</span>
          <span className="truncate">Breaking the Kolanut for the Peace of Africa • 54 Nations • 300 Million Africans</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[11px] text-accf-ivory/60">
          <Link href="/peace-table" className="hover:text-accf-gold transition-colors">2km Peace Table</Link>
          <span>•</span>
          <Link href="/kolanut-tree" className="hover:text-accf-gold transition-colors">Digital Tree</Link>
          <span>•</span>
          <Link href="/partnerships" className="hover:text-accf-gold transition-colors">Partnerships</Link>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/images/accf-logo.jpg"
            alt="African Cultural Culinary Festival Abuja 2026 Logo"
            className="w-12 h-12 rounded-full object-contain bg-white/95 p-0.5 border-2 border-accf-gold shadow-md group-hover:scale-105 transition-transform flex-shrink-0"
          />
          <div className="flex flex-col">
            <span className="font-serif font-bold text-base sm:text-lg leading-tight tracking-tight text-accf-ivory group-hover:text-accf-gold-soft transition-colors">
              African Cultural
            </span>
            <span className="text-[11px] font-mono tracking-widest uppercase text-accf-gold font-semibold">
              Culinary Festival
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-accf-ivory/80">
          <Link
            href="/"
            className={`hover:text-accf-gold transition-colors py-2 ${isActive("/") ? "text-accf-gold font-semibold" : ""}`}
          >
            Home
          </Link>

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
                    <div className="text-[10px] text-accf-ivory/60">Overview & 8 Sub-Events</div>
                  </div>
                </Link>
                <Link
                  href="/peace-table"
                  className="flex items-center gap-2.5 px-4 py-2 hover:bg-accf-green/60 text-xs text-accf-ivory/90 hover:text-accf-gold"
                >
                  <UtensilsCrossed className="w-4 h-4 text-accf-gold" />
                  <div>
                    <div className="font-semibold">2km African Peace Table</div>
                    <div className="text-[10px] text-accf-ivory/60">10,000 Guests • 1,000 Dishes</div>
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
                    <div className="font-semibold">Meet & Eat Africa</div>
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

          <Link
            href="/about"
            className={`hover:text-accf-gold transition-colors py-2 ${isActive("/about") ? "text-accf-gold font-semibold" : ""}`}
          >
            About
          </Link>
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
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

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-accf-ivory hover:text-accf-gold"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-accf-charcoal-card border-b border-accf-line px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded bg-accf-green/30 hover:bg-accf-green text-accf-ivory"
            >
              Home
            </Link>
            <Link
              href="/festival"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded bg-accf-green/30 hover:bg-accf-green text-accf-ivory"
            >
              Festival 2026
            </Link>
            <Link
              href="/peace-table"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded bg-accf-green/30 hover:bg-accf-green text-accf-gold font-semibold"
            >
              2km Peace Table
            </Link>
            <Link
              href="/kolanut-tree"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded bg-accf-green/30 hover:bg-accf-green text-accf-ivory"
            >
              Kolanut Tree
            </Link>
            <Link
              href="/meet-and-eat"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded bg-accf-green/30 hover:bg-accf-green text-accf-ivory"
            >
              Meet & Eat
            </Link>
            <Link
              href="/community"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded bg-accf-green/30 hover:bg-accf-green text-accf-ivory"
            >
              Community Hubs
            </Link>
            <Link
              href="/marketplace"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded bg-accf-green/30 hover:bg-accf-green text-accf-ivory"
            >
              Marketplace
            </Link>
            <Link
              href="/business"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded bg-accf-green/30 hover:bg-accf-green text-accf-ivory"
            >
              Business Network
            </Link>
            <Link
              href="/media"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded bg-accf-green/30 hover:bg-accf-green text-accf-ivory"
            >
              Media Center
            </Link>
            <Link
              href="/partnerships"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded bg-accf-green/30 hover:bg-accf-green text-accf-ivory"
            >
              Sponsorships
            </Link>
            <Link
              href="/peace-wall"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded bg-accf-green/30 hover:bg-accf-green text-accf-ivory"
            >
              Peace Wall
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded bg-accf-green/30 hover:bg-accf-green text-accf-ivory"
            >
              About Us
            </Link>
          </div>

          <div className="pt-4 border-t border-accf-line/60 flex items-center justify-between">
            {isAuthenticated && user ? (
              <div className="flex items-center justify-between w-full">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-sm text-accf-gold font-semibold"
                >
                  <img src={user.photoUrl} alt={user.name} className="w-8 h-8 rounded-full border border-accf-gold" />
                  <div>
                    <div>{user.name}</div>
                    <div className="text-[10px] text-accf-ivory/60">{user.chairNo}</div>
                  </div>
                </Link>
                <button
                  onClick={logout}
                  className="text-xs text-accf-maroon font-semibold px-3 py-1 bg-accf-maroon/20 rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-xs font-semibold text-accf-ivory border border-accf-gold rounded"
              >
                Login / Select Demo Persona
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

