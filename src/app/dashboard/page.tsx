"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/auth-context";
import { dataProvider } from "@/lib/data-provider";
import {
  Wallet,
  LedgerTransaction,
  BusinessLead,
  NetworkMember,
  ReferralStats,
  Order,
  Booking,
  AppNotification,
} from "@/types/master-models";
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
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Copy,
  Users,
  Search,
  Bell,
  SlidersHorizontal,
  Layers,
  FileText,
  Activity,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function DashboardPage() {
  const { user, logout, onboarding, refreshOnboarding } = useAuth();

  // State Management
  const [activeTab, setActiveTab] = useState<
    "overview" | "wallet" | "crm" | "network" | "orders" | "dining" | "settings"
  >("overview");
  const [timeRange, setTimeRange] = useState<"7D" | "30D" | "90D" | "1Y">("30D");

  // Authoritative Data
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<LedgerTransaction[]>([]);
  const [leads, setLeads] = useState<BusinessLead[]>([]);
  const [network, setNetwork] = useState<NetworkMember[]>([]);
  const [referralStats, setReferralStats] = useState<ReferralStats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modals & Action Forms
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState<number>(50000);
  const [depositMethod, setDepositMethod] = useState<string>("Paystack");
  const [withdrawAmount, setWithdrawAmount] = useState<number>(20000);
  const [withdrawBank, setWithdrawBank] = useState<string>("Zenith Bank - 2049102931");

  // New Lead Form State
  const [newLeadName, setNewLeadName] = useState("");
  const [newLeadCompany, setNewLeadCompany] = useState("");
  const [newLeadEmail, setNewLeadEmail] = useState("");
  const [newLeadPhone, setNewLeadPhone] = useState("");
  const [newLeadCountry, setNewLeadCountry] = useState("Nigeria");
  const [newLeadValue, setNewLeadValue] = useState<number>(150000);
  const [newLeadNotes, setNewLeadNotes] = useState("");

  const [copiedLink, setCopiedLink] = useState(false);

  // Load strictly user-scoped authoritative data
  const loadUserData = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const [w, tx, ld, net, ref, ords, bks, notifs] = await Promise.all([
        dataProvider.getWallet(user.id),
        dataProvider.getLedgerTransactions(user.id),
        dataProvider.getLeads(user.id),
        dataProvider.getNetworkMembers(user.id),
        dataProvider.getReferralStats(user.id),
        dataProvider.getOrders(user.id),
        dataProvider.getBookings(user.id),
        dataProvider.getNotifications(user.id),
      ]);
      setWallet(w);
      setTransactions(tx);
      setLeads(ld);
      setNetwork(net);
      setReferralStats(ref);
      setOrders(ords);
      setBookings(bks);
      setNotifications(notifs);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-accf-ivory flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl border border-accf-line-dark text-center space-y-4 max-w-md shadow-xl">
          <User className="w-12 h-12 text-accf-gold mx-auto" />
          <h2 className="font-serif font-bold text-2xl text-accf-charcoal">Sign In Required</h2>
          <p className="text-xs text-accf-muted">
            Please authenticate to access your isolated continental dashboard and financial ledger.
          </p>
          <div className="flex gap-3 pt-2">
            <Link
              href="/auth/login"
              className="flex-1 py-2.5 rounded-xl bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider text-center"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="flex-1 py-2.5 rounded-xl bg-accf-green text-accf-ivory font-bold text-xs uppercase tracking-wider text-center"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Action: Deposit
  const handleExecuteDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (depositAmount <= 0) return;
    try {
      await dataProvider.depositFunds(user.id, depositAmount, depositMethod);
      setShowDepositModal(false);
      await loadUserData();
      confetti({ particleCount: 60, spread: 70 });
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Action: Withdraw
  const handleExecuteWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawAmount <= 0) return;
    try {
      await dataProvider.withdrawFunds(user.id, withdrawAmount, withdrawBank);
      setShowWithdrawModal(false);
      await loadUserData();
      confetti({ particleCount: 60, spread: 70 });
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Action: Add Lead
  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName || !newLeadCompany) return;
    try {
      await dataProvider.createLead(user.id, {
        name: newLeadName,
        company: newLeadCompany,
        email: newLeadEmail,
        phone: newLeadPhone,
        country: newLeadCountry,
        status: "new",
        value: newLeadValue,
        source: "Dashboard CRM Entry",
        notes: newLeadNotes,
      });
      setShowAddLeadModal(false);
      setNewLeadName("");
      setNewLeadCompany("");
      setNewLeadEmail("");
      setNewLeadPhone("");
      setNewLeadNotes("");
      await loadUserData();
      confetti({ particleCount: 50, spread: 60 });
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleCopyReferral = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(
        `${window.location.origin}/auth/register?ref=${referralStats?.referralCode || user.chairNo}`
      );
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Calculate Lead Pipeline Value
  const totalPipelineValue = leads.reduce((acc, l) => acc + l.value, 0);

  return (
    <div className="min-h-screen bg-accf-ivory flex flex-col">
      {/* Top Command Header */}
      <div className="bg-accf-charcoal text-accf-ivory border-b border-accf-line px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={user.photoUrl}
              alt={user.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-accf-gold shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-xl text-accf-ivory">{user.name}</h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accf-gold text-accf-charcoal font-bold uppercase">
                  {user.tier}
                </span>
                {user.isVerified && (
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </span>
                )}
              </div>
              <div className="text-xs font-mono text-accf-gold-soft">
                Chair ID: <strong className="text-accf-gold">{user.chairNo}</strong> &bull; {user.country}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowDepositModal(true)}
              className="px-4 py-2 rounded-xl bg-accf-green text-accf-ivory text-xs font-bold hover:bg-accf-green-light border border-accf-line/40 transition-all flex items-center gap-1.5 shadow"
            >
              <ArrowDownLeft className="w-3.5 h-3.5 text-accf-gold" />
              <span>Deposit</span>
            </button>
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="px-4 py-2 rounded-xl bg-accf-charcoal-card border border-accf-line text-accf-gold text-xs font-bold hover:border-accf-gold transition-all flex items-center gap-1.5"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Withdraw</span>
            </button>
            <Link
              href={`/members/${user.id}`}
              className="px-4 py-2 rounded-xl bg-accf-charcoal-card border border-accf-line text-accf-ivory/80 text-xs font-semibold hover:text-accf-gold"
            >
              Public Pass &rarr;
            </Link>
            <button
              onClick={logout}
              className="px-3.5 py-2 rounded-xl bg-accf-charcoal-card border border-accf-line text-accf-maroon text-xs font-semibold hover:border-accf-gold"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Dashboard Layout: Sidebar + Workspace */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col md:flex-row gap-8">
        {/* Navigation Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-6">
          <div className="bg-white rounded-3xl p-4 border border-accf-line-dark shadow-sm space-y-1">
            {[
              { id: "overview", label: "Overview & Analytics", icon: Activity },
              { id: "wallet", label: "Wallet & Ledger", icon: DollarSign },
              { id: "crm", label: "Business Leads (CRM)", icon: Briefcase },
              { id: "network", label: "Network & Referrals", icon: Users },
              { id: "orders", label: "Marketplace Orders", icon: ShoppingBag },
              { id: "dining", label: "Meet & Eat Dining", icon: UtensilsCrossed },
              { id: "settings", label: "Account Settings", icon: User },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSel = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full px-4 py-3 rounded-2xl text-xs font-semibold flex items-center justify-between transition-all ${
                    isSel
                      ? "bg-accf-green text-accf-gold shadow-md font-bold"
                      : "text-accf-charcoal hover:bg-accf-ivory"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isSel ? "text-accf-gold" : "text-accf-muted"}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.id === "crm" && leads.length > 0 && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accf-gold text-accf-charcoal font-bold">
                      {leads.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Referral Invite Card */}
          <div className="p-5 bg-gradient-to-br from-accf-green-deep to-accf-charcoal text-accf-ivory rounded-3xl border border-accf-gold/50 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-accf-gold font-bold">
                African Trade Network
              </span>
              <Users className="w-4 h-4 text-accf-gold" />
            </div>
            <h4 className="font-serif font-bold text-sm text-accf-ivory">Invite Partners to Seat</h4>
            <p className="text-[11px] text-accf-ivory/70 leading-relaxed">
              Earn continental commissions on community activations and direct marketplace trade.
            </p>
            <button
              onClick={handleCopyReferral}
              className="w-full py-2.5 rounded-xl bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider hover:bg-accf-gold-soft transition-all shadow flex items-center justify-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedLink ? "Link Copied!" : "Copy Referral Link"}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Workspace Container */}
        <div className="flex-1 space-y-8 min-w-0">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Contextual Onboarding Progress (if not 100% complete) */}
              {onboarding && !onboarding.isCompleted && (
                <div className="p-6 bg-gradient-to-r from-accf-green-deep to-accf-charcoal text-accf-ivory rounded-3xl border border-accf-gold/60 shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-accf-gold font-bold">
                        Getting Started Guide
                      </span>
                      <h3 className="font-serif font-bold text-xl text-accf-ivory">
                        Complete Your Continental Setup
                      </h3>
                    </div>
                    <Link
                      href="/onboarding"
                      className="px-4 py-2 rounded-xl bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider hover:bg-accf-gold-soft"
                    >
                      Resume Onboarding &rarr;
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                    <div className="p-2.5 bg-black/30 rounded-xl flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accf-gold flex-shrink-0" />
                      <span>Account Created</span>
                    </div>
                    <div className="p-2.5 bg-black/30 rounded-xl flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accf-gold flex-shrink-0" />
                      <span>Seat Activated</span>
                    </div>
                    <div className="p-2.5 bg-black/30 rounded-xl flex items-center gap-2">
                      {onboarding.watchedTour ? (
                        <CheckCircle2 className="w-4 h-4 text-accf-gold flex-shrink-0" />
                      ) : (
                        <Clock className="w-4 h-4 text-accf-muted flex-shrink-0" />
                      )}
                      <span>Platform Tour</span>
                    </div>
                    <div className="p-2.5 bg-black/30 rounded-xl flex items-center gap-2">
                      {onboarding.profileCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-accf-gold flex-shrink-0" />
                      ) : (
                        <Clock className="w-4 h-4 text-accf-muted flex-shrink-0" />
                      )}
                      <span>Profile Setup</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Authoritative Primary Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Metric 1: Available Wallet Balance */}
                <div
                  onClick={() => setActiveTab("wallet")}
                  className="p-6 bg-white rounded-3xl border border-accf-line-dark shadow-sm hover:border-accf-gold transition-all cursor-pointer space-y-2"
                >
                  <div className="flex items-center justify-between text-xs font-mono uppercase text-accf-muted">
                    <span>Available Balance</span>
                    <DollarSign className="w-4 h-4 text-accf-green" />
                  </div>
                  <div className="font-serif font-bold text-2xl text-accf-green">
                    {wallet ? formatNGN(wallet.availableBalance) : "₦0"}
                  </div>
                  <div className="text-[10px] text-accf-muted font-mono">
                    Total Deposited: {wallet ? formatNGN(wallet.totalDeposits) : "₦0"}
                  </div>
                </div>

                {/* Metric 2: Total Earnings */}
                <div
                  onClick={() => setActiveTab("wallet")}
                  className="p-6 bg-white rounded-3xl border border-accf-line-dark shadow-sm hover:border-accf-gold transition-all cursor-pointer space-y-2"
                >
                  <div className="flex items-center justify-between text-xs font-mono uppercase text-accf-muted">
                    <span>Total Earnings</span>
                    <TrendingUp className="w-4 h-4 text-accf-gold" />
                  </div>
                  <div className="font-serif font-bold text-2xl text-accf-gold">
                    {wallet ? formatNGN(wallet.totalEarnings) : "₦0"}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-mono">
                    Commissions &amp; Payouts
                  </div>
                </div>

                {/* Metric 3: Active CRM Leads */}
                <div
                  onClick={() => setActiveTab("crm")}
                  className="p-6 bg-white rounded-3xl border border-accf-line-dark shadow-sm hover:border-accf-gold transition-all cursor-pointer space-y-2"
                >
                  <div className="flex items-center justify-between text-xs font-mono uppercase text-accf-muted">
                    <span>Active Leads</span>
                    <Briefcase className="w-4 h-4 text-accf-maroon" />
                  </div>
                  <div className="font-serif font-bold text-2xl text-accf-charcoal">
                    {leads.length} Leads
                  </div>
                  <div className="text-[10px] text-accf-muted font-mono">
                    Pipeline: {formatNGN(totalPipelineValue)}
                  </div>
                </div>

                {/* Metric 4: Team Network */}
                <div
                  onClick={() => setActiveTab("network")}
                  className="p-6 bg-white rounded-3xl border border-accf-line-dark shadow-sm hover:border-accf-gold transition-all cursor-pointer space-y-2"
                >
                  <div className="flex items-center justify-between text-xs font-mono uppercase text-accf-muted">
                    <span>Trade Network</span>
                    <Users className="w-4 h-4 text-accf-gold" />
                  </div>
                  <div className="font-serif font-bold text-2xl text-accf-charcoal">
                    {network.length} Members
                  </div>
                  <div className="text-[10px] text-emerald-600 font-mono">
                    {referralStats?.activeMembers || 0} Active delegates
                  </div>
                </div>
              </div>

              {/* Performance Analytics Chart & Timeline */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-accf-line-dark shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-accf-charcoal">
                      Financial &amp; Trade Performance
                    </h3>
                    <p className="text-xs text-accf-muted">
                      Authoritative ledger activity aggregated over selected period.
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 p-1 bg-accf-ivory rounded-xl border border-accf-line-dark self-start">
                    {(["7D", "30D", "90D", "1Y"] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => setTimeRange(r)}
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                          timeRange === r
                            ? "bg-accf-green text-accf-gold shadow"
                            : "text-accf-muted hover:text-accf-charcoal"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Visual Performance Bars */}
                <div className="h-44 flex items-end gap-3 pt-6 pb-2 border-b border-accf-line-dark">
                  {[
                    { label: "Week 1", val: 40, amt: "₦80,000" },
                    { label: "Week 2", val: 65, amt: "₦130,000" },
                    { label: "Week 3", val: 45, amt: "₦90,000" },
                    { label: "Week 4", val: 85, amt: "₦170,000" },
                    { label: "Week 5", val: 100, amt: "₦200,000" },
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="text-[9px] font-mono text-accf-muted opacity-0 group-hover:opacity-100 transition-opacity">
                        {bar.amt}
                      </div>
                      <div
                        style={{ height: `${bar.val}%` }}
                        className="w-full bg-accf-green rounded-t-xl group-hover:bg-accf-gold transition-colors shadow-sm"
                      />
                      <span className="text-[10px] font-mono text-accf-muted">{bar.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Authoritative Ledger Transactions */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-accf-line-dark shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-xl text-accf-charcoal">
                    Recent Ledger Activity
                  </h3>
                  <button
                    onClick={() => setActiveTab("wallet")}
                    className="text-xs text-accf-green font-bold hover:underline"
                  >
                    View All Transactions &rarr;
                  </button>
                </div>

                {transactions.length === 0 ? (
                  <div className="p-8 bg-accf-ivory rounded-2xl border border-accf-line-dark text-center space-y-2">
                    <DollarSign className="w-8 h-8 text-accf-muted mx-auto" />
                    <p className="text-xs text-accf-muted font-medium">
                      You have no ledger transactions yet. Make a deposit or activate a plan to see records.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {transactions.slice(0, 4).map((tx) => (
                      <div
                        key={tx.id}
                        className="p-4 bg-accf-ivory rounded-2xl border border-accf-line-dark flex items-center justify-between gap-4 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                              tx.type === "deposit" || tx.type === "earning"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {tx.type === "deposit" || tx.type === "earning" ? (
                              <ArrowDownLeft className="w-4 h-4" />
                            ) : (
                              <ArrowUpRight className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-accf-charcoal">{tx.description}</div>
                            <div className="text-[10px] font-mono text-accf-muted">
                              Ref: {tx.reference} &bull; {tx.createdAt}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`font-mono font-bold ${
                              tx.type === "deposit" || tx.type === "earning"
                                ? "text-emerald-700"
                                : "text-accf-charcoal"
                            }`}
                          >
                            {tx.type === "deposit" || tx.type === "earning" ? "+" : "-"}
                            {formatNGN(tx.amount)}
                          </div>
                          <span className="text-[10px] font-mono text-emerald-600">● {tx.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: WALLET & FINANCIAL LEDGER */}
          {activeTab === "wallet" && (
            <div className="space-y-8">
              {/* Wallet Balances Card */}
              <div className="bg-gradient-to-r from-accf-charcoal to-accf-green-deep text-accf-ivory rounded-3xl p-8 border-2 border-accf-gold shadow-2xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-accf-line pb-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-accf-gold font-bold">
                      Authoritative Ledger Account
                    </span>
                    <h2 className="font-serif font-bold text-3xl text-accf-ivory">
                      {wallet ? formatNGN(wallet.availableBalance) : "₦0"}
                    </h2>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowDepositModal(true)}
                      className="px-5 py-2.5 rounded-xl bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider hover:bg-accf-gold-soft transition-all shadow"
                    >
                      + Deposit Funds
                    </button>
                    <button
                      onClick={() => setShowWithdrawModal(true)}
                      className="px-5 py-2.5 rounded-xl bg-accf-charcoal-card border border-accf-line text-accf-ivory font-bold text-xs uppercase tracking-wider hover:border-accf-gold transition-all"
                    >
                      Withdraw Funds
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-accf-ivory/50 block">Total Deposited</span>
                    <strong className="text-accf-ivory text-sm">
                      {wallet ? formatNGN(wallet.totalDeposits) : "₦0"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-accf-ivory/50 block">Total Earnings</span>
                    <strong className="text-accf-gold text-sm">
                      {wallet ? formatNGN(wallet.totalEarnings) : "₦0"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-accf-ivory/50 block">Total Payouts</span>
                    <strong className="text-accf-ivory text-sm">
                      {wallet ? formatNGN(wallet.totalWithdrawals) : "₦0"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-accf-ivory/50 block">Ledger State</span>
                    <strong className="text-emerald-400 text-sm">● Synchronized</strong>
                  </div>
                </div>
              </div>

              {/* Complete Ledger Records Table */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-accf-line-dark shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-accf-line-dark pb-4">
                  <h3 className="font-serif font-bold text-xl text-accf-charcoal">
                    Immutable Transaction Ledger
                  </h3>
                  <span className="text-xs font-mono text-accf-muted">{transactions.length} Records</span>
                </div>

                {transactions.length === 0 ? (
                  <div className="p-12 text-center text-xs text-accf-muted space-y-2">
                    <DollarSign className="w-10 h-10 text-accf-muted mx-auto" />
                    <p>No transaction history recorded yet.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-accf-line-dark text-[10px] text-accf-muted uppercase">
                          <th className="pb-3">Timestamp</th>
                          <th className="pb-3">Type</th>
                          <th className="pb-3">Description</th>
                          <th className="pb-3">Method</th>
                          <th className="pb-3">Amount</th>
                          <th className="pb-3">Balance After</th>
                          <th className="pb-3 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-accf-line-dark/60">
                        {transactions.map((tx) => (
                          <tr key={tx.id} className="hover:bg-accf-ivory/60">
                            <td className="py-3 text-accf-muted">{tx.createdAt}</td>
                            <td className="py-3 font-bold uppercase text-accf-charcoal">{tx.type}</td>
                            <td className="py-3 text-accf-charcoal font-medium">{tx.description}</td>
                            <td className="py-3 text-accf-muted">{tx.paymentMethod || "Direct"}</td>
                            <td
                              className={`py-3 font-bold ${
                                tx.type === "deposit" || tx.type === "earning"
                                  ? "text-emerald-700"
                                  : "text-accf-charcoal"
                              }`}
                            >
                              {tx.type === "deposit" || tx.type === "earning" ? "+" : "-"}
                              {formatNGN(tx.amount)}
                            </td>
                            <td className="py-3 text-accf-muted">{formatNGN(tx.balanceAfter)}</td>
                            <td className="py-3 text-right text-emerald-600 font-bold">● {tx.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: BUSINESS LEADS (CRM) */}
          {activeTab === "crm" && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-accf-line-dark shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-accf-line-dark pb-4">
                  <div>
                    <h3 className="font-serif font-bold text-2xl text-accf-charcoal">
                      B2B Trade &amp; Agribusiness CRM
                    </h3>
                    <p className="text-xs text-accf-muted">
                      Track cross-border commercial leads, buyer inquiries, and food trade partnerships.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddLeadModal(true)}
                    className="px-5 py-2.5 rounded-xl bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider hover:bg-accf-gold-soft transition-all shadow flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Lead</span>
                  </button>
                </div>

                {leads.length === 0 ? (
                  <div className="p-12 text-center text-xs text-accf-muted space-y-3">
                    <Briefcase className="w-12 h-12 text-accf-muted mx-auto" />
                    <p className="font-medium">No business leads in your pipeline yet.</p>
                    <button
                      onClick={() => setShowAddLeadModal(true)}
                      className="px-4 py-2 rounded-xl bg-accf-green text-accf-ivory font-bold text-xs hover:bg-accf-green-light"
                    >
                      Create Your First Lead &rarr;
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {leads.map((lead) => (
                      <div
                        key={lead.id}
                        className="p-5 bg-accf-ivory rounded-2xl border border-accf-line-dark space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-accf-line-dark pb-2 text-xs">
                          <div className="flex items-center gap-2">
                            <h4 className="font-serif font-bold text-base text-accf-charcoal">
                              {lead.name}
                            </h4>
                            <span className="font-mono text-accf-muted">&bull; {lead.company} ({lead.country})</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-mono font-bold text-accf-green">{formatNGN(lead.value)}</span>
                            <span className="px-2.5 py-0.5 rounded bg-accf-gold/20 text-accf-charcoal font-mono text-[10px] font-bold uppercase">
                              {lead.status}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-accf-muted">
                          <div>Email: <strong className="text-accf-charcoal">{lead.email || "N/A"}</strong></div>
                          <div>Phone: <strong className="text-accf-charcoal">{lead.phone || "N/A"}</strong></div>
                        </div>

                        {lead.notes && (
                          <p className="text-xs text-accf-charcoal/80 bg-white p-3 rounded-xl border border-accf-line-dark">
                            &ldquo;{lead.notes}&rdquo;
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: NETWORK & REFERRALS */}
          {activeTab === "network" && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-accf-line-dark shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-accf-line-dark pb-4">
                  <div>
                    <h3 className="font-serif font-bold text-2xl text-accf-charcoal">
                      Your African Trade Team &amp; Referrals
                    </h3>
                    <p className="text-xs text-accf-muted">
                      Partners and delegates registered through your sovereign invitation code.
                    </p>
                  </div>
                  <div className="font-mono text-xs text-accf-green font-bold px-3 py-1.5 bg-accf-ivory rounded-xl border border-accf-line-dark">
                    Code: {referralStats?.referralCode}
                  </div>
                </div>

                {network.length === 0 ? (
                  <div className="p-12 text-center text-xs text-accf-muted space-y-3">
                    <Users className="w-12 h-12 text-accf-muted mx-auto" />
                    <p className="font-medium">You haven&apos;t invited any team members yet.</p>
                    <button
                      onClick={handleCopyReferral}
                      className="px-4 py-2 rounded-xl bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider"
                    >
                      Copy Your Invite Link
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {network.map((member) => (
                      <div
                        key={member.id}
                        className="p-5 bg-accf-ivory rounded-2xl border border-accf-line-dark space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <h4 className="font-serif font-bold text-base text-accf-charcoal">
                            {member.name}
                          </h4>
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold uppercase">
                            {member.tier}
                          </span>
                        </div>
                        <div className="text-xs text-accf-muted font-mono">{member.country} &bull; Joined {member.joinedAt}</div>
                        <div className="pt-2 border-t border-accf-line-dark flex justify-between text-xs font-mono">
                          <span>Commission Earned:</span>
                          <strong className="text-accf-gold">{formatNGN(member.commissionEarned)}</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: ORDERS */}
          {activeTab === "orders" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-accf-line-dark shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-accf-line-dark pb-4">
                <h3 className="font-serif font-bold text-2xl text-accf-charcoal">Marketplace Orders</h3>
                <Link
                  href="/marketplace"
                  className="px-4 py-2 rounded-xl bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider"
                >
                  Browse Marketplace &rarr;
                </Link>
              </div>

              {orders.length === 0 ? (
                <div className="p-12 text-center text-xs text-accf-muted space-y-2">
                  <ShoppingBag className="w-10 h-10 text-accf-muted mx-auto" />
                  <p>You haven&apos;t placed any marketplace orders yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div key={ord.id} className="p-5 bg-accf-ivory rounded-2xl border border-accf-line-dark space-y-2 text-xs font-mono">
                      <div className="flex justify-between border-b border-accf-line-dark pb-2">
                        <span>Order #{ord.id} &bull; {ord.createdAt}</span>
                        <span className="font-bold text-accf-green">{ord.status}</span>
                      </div>
                      <div className="space-y-1">
                        {ord.items.map((it, i) => (
                          <div key={i} className="flex justify-between">
                            <span>{it.quantity}x {it.title}</span>
                            <span>{formatNGN(it.price * it.quantity)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-accf-line-dark flex justify-between font-bold">
                        <span>Total:</span>
                        <span className="text-accf-gold">{formatNGN(ord.totalAmountNGN)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: DINING */}
          {activeTab === "dining" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-accf-line-dark shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-accf-line-dark pb-4">
                <h3 className="font-serif font-bold text-2xl text-accf-charcoal">Meet &amp; Eat Bookings</h3>
                <Link
                  href="/meet-and-eat"
                  className="px-4 py-2 rounded-xl bg-accf-green text-accf-ivory font-bold text-xs"
                >
                  Find Cultural Hosts &rarr;
                </Link>
              </div>

              {bookings.length === 0 ? (
                <div className="p-12 text-center text-xs text-accf-muted space-y-2">
                  <UtensilsCrossed className="w-10 h-10 text-accf-muted mx-auto" />
                  <p>You have no dining bookings yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {bookings.map((b) => (
                    <div key={b.id} className="p-4 bg-accf-ivory rounded-2xl border border-accf-line-dark flex justify-between items-center text-xs">
                      <div>
                        <h4 className="font-serif font-bold text-sm text-accf-charcoal">{b.listingTitle}</h4>
                        <div className="text-accf-muted font-mono">{b.date} &bull; {b.partySize} Guests</div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold">
                        {b.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 7: SETTINGS */}
          {activeTab === "settings" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-accf-line-dark shadow-sm space-y-6">
              <h3 className="font-serif font-bold text-2xl text-accf-charcoal">Profile &amp; Account Settings</h3>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-accf-muted mb-1">Full Name</label>
                  <input
                    type="text"
                    readOnly
                    value={user.name}
                    className="w-full px-3.5 py-2.5 bg-accf-ivory border border-accf-line-dark rounded-xl text-accf-charcoal font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-accf-muted mb-1">Email Address</label>
                  <input
                    type="email"
                    readOnly
                    value={user.email}
                    className="w-full px-3.5 py-2.5 bg-accf-ivory border border-accf-line-dark rounded-xl text-accf-charcoal font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-accf-muted mb-1">Country &amp; Chair Sequence</label>
                  <input
                    type="text"
                    readOnly
                    value={`${user.country} (${user.chairNo})`}
                    className="w-full px-3.5 py-2.5 bg-accf-ivory border border-accf-line-dark rounded-xl text-accf-gold font-mono font-bold"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* DEPOSIT MODAL */}
      {showDepositModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-accf-charcoal text-accf-ivory border-2 border-accf-gold rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <h3 className="font-serif font-bold text-2xl text-accf-ivory">Deposit to ACCF Wallet</h3>
            <form onSubmit={handleExecuteDeposit} className="space-y-4 text-xs">
              <div>
                <label className="block text-accf-ivory/70 mb-1">Deposit Amount (NGN)</label>
                <input
                  type="number"
                  required
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(parseFloat(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-accf-charcoal-card border border-accf-line rounded-xl text-accf-gold font-mono text-base font-bold"
                />
              </div>

              <div>
                <label className="block text-accf-ivory/70 mb-1">Payment Channel</label>
                <select
                  value={depositMethod}
                  onChange={(e) => setDepositMethod(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-accf-charcoal-card border border-accf-line rounded-xl text-accf-ivory"
                >
                  <option value="Paystack">Paystack (Debit/Credit Card/Direct Bank)</option>
                  <option value="Flutterwave">Flutterwave (Pan-African Mobile Money)</option>
                  <option value="Direct Wire">Direct Central Bank Wire</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-accf-line">
                <button
                  type="button"
                  onClick={() => setShowDepositModal(false)}
                  className="px-4 py-2 text-xs text-accf-ivory/60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider"
                >
                  Confirm Deposit &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* WITHDRAW MODAL */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-accf-charcoal text-accf-ivory border-2 border-accf-gold rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <h3 className="font-serif font-bold text-2xl text-accf-ivory">Withdraw Funds to Bank</h3>
            <form onSubmit={handleExecuteWithdraw} className="space-y-4 text-xs">
              <div>
                <label className="block text-accf-ivory/70 mb-1">Withdrawal Amount (NGN)</label>
                <input
                  type="number"
                  required
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(parseFloat(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-accf-charcoal-card border border-accf-line rounded-xl text-accf-gold font-mono text-base font-bold"
                />
              </div>

              <div>
                <label className="block text-accf-ivory/70 mb-1">Destination Bank Account</label>
                <input
                  type="text"
                  required
                  value={withdrawBank}
                  onChange={(e) => setWithdrawBank(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-accf-charcoal-card border border-accf-line rounded-xl text-accf-ivory"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-accf-line">
                <button
                  type="button"
                  onClick={() => setShowWithdrawModal(false)}
                  className="px-4 py-2 text-xs text-accf-ivory/60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider"
                >
                  Process Withdrawal &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD LEAD MODAL */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-accf-charcoal text-accf-ivory border-2 border-accf-gold rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <h3 className="font-serif font-bold text-2xl text-accf-ivory">Add Business Lead to CRM</h3>
            <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-accf-ivory/70 mb-1">Contact Name</label>
                  <input
                    type="text"
                    required
                    value={newLeadName}
                    onChange={(e) => setNewLeadName(e.target.value)}
                    placeholder="e.g. Ousmane Diop"
                    className="w-full px-3.5 py-2.5 bg-accf-charcoal-card border border-accf-line rounded-xl text-accf-ivory"
                  />
                </div>
                <div>
                  <label className="block text-accf-ivory/70 mb-1">Company / Organization</label>
                  <input
                    type="text"
                    required
                    value={newLeadCompany}
                    onChange={(e) => setNewLeadCompany(e.target.value)}
                    placeholder="e.g. Dakar Agrotech"
                    className="w-full px-3.5 py-2.5 bg-accf-charcoal-card border border-accf-line rounded-xl text-accf-ivory"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-accf-ivory/70 mb-1">Email</label>
                  <input
                    type="email"
                    value={newLeadEmail}
                    onChange={(e) => setNewLeadEmail(e.target.value)}
                    placeholder="contact@company.africa"
                    className="w-full px-3.5 py-2.5 bg-accf-charcoal-card border border-accf-line rounded-xl text-accf-ivory"
                  />
                </div>
                <div>
                  <label className="block text-accf-ivory/70 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={newLeadPhone}
                    onChange={(e) => setNewLeadPhone(e.target.value)}
                    placeholder="+221 77 000 0000"
                    className="w-full px-3.5 py-2.5 bg-accf-charcoal-card border border-accf-line rounded-xl text-accf-ivory"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-accf-ivory/70 mb-1">Country</label>
                  <input
                    type="text"
                    value={newLeadCountry}
                    onChange={(e) => setNewLeadCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-accf-charcoal-card border border-accf-line rounded-xl text-accf-ivory"
                  />
                </div>
                <div>
                  <label className="block text-accf-ivory/70 mb-1">Estimated Deal Value (NGN)</label>
                  <input
                    type="number"
                    value={newLeadValue}
                    onChange={(e) => setNewLeadValue(parseFloat(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-accf-charcoal-card border border-accf-line rounded-xl text-accf-gold font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-accf-ivory/70 mb-1">Opportunity Notes</label>
                <textarea
                  rows={2}
                  value={newLeadNotes}
                  onChange={(e) => setNewLeadNotes(e.target.value)}
                  placeholder="Key details about trade requirements..."
                  className="w-full px-3.5 py-2.5 bg-accf-charcoal-card border border-accf-line rounded-xl text-accf-ivory"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-accf-line">
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  className="px-4 py-2 text-xs text-accf-ivory/60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider"
                >
                  Save Lead &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
