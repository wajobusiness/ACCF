"use client";

import React, { useState, useEffect } from "react";
import { dataProvider } from "@/lib/data-provider";
import {
  PlatformAnalytics,
  AccreditationRequest,
  Member,
  AuditLog,
  HubPost,
  PeaceWallEntry,
  MarketplaceListing,
} from "@/types/master-models";
import { formatNGN } from "@/lib/utils";
import Link from "next/link";
import {
  ShieldCheck,
  Users,
  Award,
  Globe2,
  UtensilsCrossed,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  AlertCircle,
  ShoppingBag,
  MessageSquare,
  FileText,
  DollarSign,
  Settings,
  Activity,
  Search,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function AdminDashboardPage() {
  const [activeAdminTab, setActiveAdminTab] = useState<
    "overview" | "members" | "accreditations" | "moderation" | "marketplace" | "audit" | "settings"
  >("overview");

  const [analytics, setAnalytics] = useState<PlatformAnalytics | null>(null);
  const [accreditations, setAccreditations] = useState<AccreditationRequest[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [peaceWall, setPeaceWall] = useState<PeaceWallEntry[]>([]);
  const [products, setProducts] = useState<MarketplaceListing[]>([]);
  const [searchMember, setSearchMember] = useState("");

  useEffect(() => {
    async function load() {
      const a = await dataProvider.getAnalytics();
      setAnalytics(a);
      const acc = await dataProvider.getAccreditations();
      setAccreditations(acc);
      const mems = await dataProvider.getMembers();
      setMembers(mems);
      const aud = await dataProvider.getAuditLogs();
      setAuditLogs(aud);
      const pw = await dataProvider.getPeaceWallEntries();
      setPeaceWall(pw);
      const prod = await dataProvider.getMarketplaceListings();
      setProducts(prod);
    }
    load();
  }, []);

  const handleStatusChange = async (id: string, status: AccreditationRequest["status"]) => {
    await dataProvider.updateAccreditationStatus(id, status);
    const updated = await dataProvider.getAccreditations();
    setAccreditations(updated);
    if (status === "Approved") {
      confetti({ particleCount: 60, spread: 60 });
    }
  };

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchMember.toLowerCase()) ||
      m.chairNo.toLowerCase().includes(searchMember.toLowerCase()) ||
      m.country.toLowerCase().includes(searchMember.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-accf-ivory py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Admin Executive Header */}
        <div className="bg-accf-charcoal text-accf-ivory rounded-3xl p-8 border border-accf-line shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-accf-maroon text-accf-ivory text-[10px] font-mono font-bold uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-accf-gold" />
              Executive Secretariat Command Console
            </div>
            <h1 className="font-serif font-bold text-3xl text-accf-ivory">
              ACCF Continental Operations Suite
            </h1>
            <p className="text-xs text-accf-ivory/70">
              Real-time monitoring across 54 nations: Memberships, 2km Peace Table delegations, commerce, and moderation.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-accf-green-deep border border-accf-gold rounded-xl text-center font-mono">
              <div className="text-[10px] uppercase text-accf-gold">Platform State</div>
              <div className="font-bold text-xs text-emerald-400">● DEMO PREVIEW ACTIVE</div>
            </div>
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded bg-accf-charcoal-card border border-accf-line text-accf-gold text-xs font-semibold hover:border-accf-gold"
            >
              &larr; Member View
            </Link>
          </div>
        </div>

        {/* Administration Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-accf-line-dark pb-2 overflow-x-auto">
          {[
            { id: "overview", label: "Continental Overview", icon: Activity },
            { id: "accreditations", label: "2km Peace Table Queue", icon: Award },
            { id: "members", label: "Master Chair Registry", icon: Users },
            { id: "moderation", label: "Peace Wall Moderation", icon: ShieldCheck },
            { id: "marketplace", label: "Commerce & Vendors", icon: ShoppingBag },
            { id: "audit", label: "System Audit Trail", icon: FileText },
            { id: "settings", label: "Secretariat Settings", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAdminTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
                  activeAdminTab === tab.id
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
        {activeAdminTab === "overview" && (
          <div className="space-y-8">
            {/* KPI 4-Grid */}
            {analytics && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 bg-white rounded-2xl border border-accf-line-dark shadow-sm space-y-2">
                  <div className="text-xs font-mono uppercase text-accf-muted">Registered Digital Chairs</div>
                  <div className="font-serif font-bold text-3xl text-accf-charcoal">
                    {analytics.totalMembers.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-mono flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +12.4% continental surge
                  </div>
                </div>

                <div className="p-6 bg-white rounded-2xl border border-accf-line-dark shadow-sm space-y-2">
                  <div className="text-xs font-mono uppercase text-accf-muted">Peace Signatures</div>
                  <div className="font-serif font-bold text-3xl text-accf-gold">
                    {analytics.peaceSignatures.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-accf-muted font-mono">54 African Nations</div>
                </div>

                <div className="p-6 bg-white rounded-2xl border border-accf-line-dark shadow-sm space-y-2">
                  <div className="text-xs font-mono uppercase text-accf-muted">Accredited VIP Delegates</div>
                  <div className="font-serif font-bold text-3xl text-accf-maroon">
                    {analytics.accreditedDelegates.toLocaleString()} / 10,000
                  </div>
                  <div className="text-[10px] text-accf-muted font-mono">7 Diplomatic Categories</div>
                </div>

                <div className="p-6 bg-white rounded-2xl border border-accf-line-dark shadow-sm space-y-2">
                  <div className="text-xs font-mono uppercase text-accf-muted">Marketplace Volume</div>
                  <div className="font-serif font-bold text-2xl text-accf-green">
                    {formatNGN(analytics.totalSimulatedVolumeNGN)}
                  </div>
                  <div className="text-[10px] text-accf-muted font-mono">Direct Cross-Border Sales</div>
                </div>
              </div>
            )}

            {/* Quick Action Dispatch Panels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-accf-charcoal text-accf-ivory rounded-2xl border border-accf-gold space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-accf-gold uppercase font-bold">Priority Pending Action</span>
                  <Award className="w-4 h-4 text-accf-gold" />
                </div>
                <h3 className="font-serif font-bold text-xl">
                  {accreditations.filter((a) => a.status === "Pending").length} VIP Accreditations Require Assignment
                </h3>
                <p className="text-xs text-accf-ivory/70 leading-relaxed">
                  Delegates from traditional monarchies, diplomatic missions, and youth coalitions are awaiting zone allocations.
                </p>
                <button
                  onClick={() => setActiveAdminTab("accreditations")}
                  className="px-4 py-2 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider"
                >
                  Review Accreditation Queue &rarr;
                </button>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-accf-line-dark space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-accf-maroon uppercase font-bold">Moderation Health</span>
                  <ShieldCheck className="w-4 h-4 text-accf-green" />
                </div>
                <h3 className="font-serif font-bold text-xl text-accf-charcoal">
                  Digital Peace Wall &amp; Forums Operational
                </h3>
                <p className="text-xs text-accf-muted leading-relaxed">
                  Community streams across 10 hubs are active. No urgent policy violations detected in the last 6 hours.
                </p>
                <button
                  onClick={() => setActiveAdminTab("moderation")}
                  className="px-4 py-2 rounded bg-accf-ivory text-accf-charcoal border border-accf-line-dark font-bold text-xs hover:border-accf-gold"
                >
                  Inspect Moderation Stream &rarr;
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ACCREDITATION QUEUE */}
        {activeAdminTab === "accreditations" && (
          <div className="bg-white rounded-3xl p-8 border border-accf-line-dark shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-accf-line-dark pb-4">
              <div>
                <h2 className="font-serif font-bold text-2xl text-accf-charcoal">
                  2-Kilometre Peace Table Accreditation Queue
                </h2>
                <p className="text-xs text-accf-muted mt-0.5">
                  Approve and allocate official table zones across the 2,000-metre banquet layout.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-accf-maroon px-3 py-1 bg-accf-maroon/10 rounded">
                {accreditations.length} Total Requests
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-medium">
                <thead>
                  <tr className="border-b border-accf-line-dark text-[10px] font-mono uppercase text-accf-muted">
                    <th className="pb-3">Delegate Name</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Organization</th>
                    <th className="pb-3">Country</th>
                    <th className="pb-3">Zone Assignment</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-accf-line-dark/60">
                  {accreditations.map((acc) => (
                    <tr key={acc.id} className="hover:bg-accf-ivory/60 transition-colors">
                      <td className="py-4 font-serif font-bold text-sm text-accf-charcoal">
                        {acc.name}
                      </td>
                      <td className="py-4 font-mono text-[11px] text-accf-maroon">
                        {acc.category}
                      </td>
                      <td className="py-4 text-accf-charcoal/80 truncate max-w-[180px]">
                        {acc.organization}
                      </td>
                      <td className="py-4 font-mono text-accf-muted">
                        {acc.country}
                      </td>
                      <td className="py-4 font-mono text-[11px] text-accf-green font-bold">
                        {acc.tableSeatZone}
                      </td>
                      <td className="py-4">
                        <span
                          className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                            acc.status === "Approved"
                              ? "bg-emerald-100 text-emerald-800"
                              : acc.status === "Declined"
                              ? "bg-red-100 text-red-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          ● {acc.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {acc.status !== "Approved" && (
                            <button
                              onClick={() => handleStatusChange(acc.id, "Approved")}
                              className="px-3 py-1 rounded bg-accf-green text-accf-ivory hover:bg-accf-green-light text-[10px] font-bold"
                            >
                              Approve
                            </button>
                          )}
                          {acc.status !== "Declined" && (
                            <button
                              onClick={() => handleStatusChange(acc.id, "Declined")}
                              className="px-3 py-1 rounded bg-accf-maroon/20 text-accf-maroon hover:bg-accf-maroon hover:text-white text-[10px] font-bold"
                            >
                              Decline
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: MEMBERS REGISTRY */}
        {activeAdminTab === "members" && (
          <div className="bg-white rounded-3xl p-8 border border-accf-line-dark shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-accf-line-dark pb-4">
              <div>
                <h2 className="font-serif font-bold text-2xl text-accf-charcoal">
                  Master Chair Registry (`AKDT-000XXXX`)
                </h2>
                <p className="text-xs text-accf-muted mt-0.5">
                  Sequential diplomatic chair issuance database across all 54 African nations.
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-accf-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by name, chair #, country..."
                  value={searchMember}
                  onChange={(e) => setSearchMember(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-accf-ivory border border-accf-line-dark rounded focus:border-accf-gold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMembers.map((m) => (
                <div
                  key={m.id}
                  className="p-4 bg-accf-ivory rounded-xl border border-accf-line-dark flex items-center gap-3.5"
                >
                  <img
                    src={m.photoUrl}
                    alt={m.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-accf-gold flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-serif font-bold text-sm text-accf-charcoal truncate">{m.name}</div>
                    <div className="text-[10px] font-mono text-accf-gold font-bold">
                      {m.chairNo} &bull; {m.tier}
                    </div>
                    <div className="text-[10px] text-accf-muted">{m.country}</div>
                  </div>
                  <Link
                    href={`/members/${m.id}`}
                    className="text-xs text-accf-green font-bold hover:underline"
                  >
                    Pass &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: MODERATION */}
        {activeAdminTab === "moderation" && (
          <div className="bg-white rounded-3xl p-8 border border-accf-line-dark shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-accf-line-dark pb-4">
              <div>
                <h2 className="font-serif font-bold text-2xl text-accf-charcoal">Peace Wall &amp; Hub Moderation</h2>
                <p className="text-xs text-accf-muted mt-0.5">Live review of public messages and pledges submitted across 54 nations.</p>
              </div>
            </div>

            <div className="space-y-3">
              {peaceWall.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 bg-accf-ivory rounded-xl border border-accf-line-dark flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-sm text-accf-charcoal">{entry.guestName || "Member"}</span>
                      <span className="text-[10px] font-mono text-accf-muted">{entry.country}</span>
                    </div>
                    <p className="text-xs text-accf-charcoal/80 italic">&ldquo;{entry.message}&rdquo;</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                      Approved
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: MARKETPLACE */}
        {activeAdminTab === "marketplace" && (
          <div className="bg-white rounded-3xl p-8 border border-accf-line-dark shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-accf-line-dark pb-4">
              <div>
                <h2 className="font-serif font-bold text-2xl text-accf-charcoal">Marketplace &amp; Merchant Oversight</h2>
                <p className="text-xs text-accf-muted mt-0.5">Active product catalog and vendor verification queue.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((prod) => (
                <div key={prod.id} className="p-4 bg-accf-ivory rounded-xl border border-accf-line-dark space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-accf-maroon font-bold">{prod.category}</span>
                    <span className="text-accf-gold font-bold">{formatNGN(prod.priceNGN)}</span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-accf-charcoal">{prod.title}</h4>
                  <div className="text-[10px] text-accf-muted font-mono">Vendor: {prod.vendorName} ({prod.vendorCountry})</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: AUDIT TRAIL */}
        {activeAdminTab === "audit" && (
          <div className="bg-white rounded-3xl p-8 border border-accf-line-dark shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-accf-line-dark pb-4">
              <div>
                <h2 className="font-serif font-bold text-2xl text-accf-charcoal">System Audit Logs</h2>
                <p className="text-xs text-accf-muted mt-0.5">Immutable record of secretariat administrative actions.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-accf-line-dark text-[10px] text-accf-muted uppercase">
                    <th className="pb-3">Timestamp</th>
                    <th className="pb-3">Actor</th>
                    <th className="pb-3">Role</th>
                    <th className="pb-3">Action</th>
                    <th className="pb-3">Target</th>
                    <th className="pb-3">IP Address</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-accf-line-dark/60">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-accf-ivory/60">
                      <td className="py-3 text-accf-muted">{log.timestamp}</td>
                      <td className="py-3 font-bold text-accf-charcoal">{log.actorName}</td>
                      <td className="py-3 text-accf-gold">{log.actorRole}</td>
                      <td className="py-3 text-accf-green font-semibold">{log.action}</td>
                      <td className="py-3 text-accf-charcoal/80">{log.target}</td>
                      <td className="py-3 text-accf-muted">{log.ipAddress}</td>
                      <td className="py-3 text-right text-emerald-600 font-bold">● {log.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 7: SETTINGS */}
        {activeAdminTab === "settings" && (
          <div className="bg-white rounded-3xl p-8 border border-accf-line-dark shadow-sm space-y-6">
            <h2 className="font-serif font-bold text-2xl text-accf-charcoal">Secretariat Platform Configuration</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-mono">
              <div className="p-5 bg-accf-ivory rounded-2xl border border-accf-line-dark space-y-2">
                <span className="text-accf-muted uppercase block">Data Provider Engine</span>
                <strong className="text-accf-green text-sm block">DemoDataProvider (In-Memory / LocalStorage)</strong>
                <p className="text-[11px] text-accf-muted">Zero-rewrite ready for PostgreSQL / Supabase connection.</p>
              </div>

              <div className="p-5 bg-accf-ivory rounded-2xl border border-accf-line-dark space-y-2">
                <span className="text-accf-muted uppercase block">Payment Gateway Adapter</span>
                <strong className="text-accf-gold text-sm block">Simulated Paystack &amp; Flutterwave NGN</strong>
                <p className="text-[11px] text-accf-muted">Safe sandbox mode with instant mock authorization.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
