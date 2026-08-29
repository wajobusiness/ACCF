"use client";

import React, { useState, useEffect } from "react";
import { dataProvider } from "@/lib/data-provider";
import { PlatformAnalytics, AccreditationRequest, Member } from "@/types/master-models";
import { formatNGN } from "@/lib/utils";
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
} from "lucide-react";

export default function AdminDashboardPage() {
  const [analytics, setAnalytics] = useState<PlatformAnalytics | null>(null);
  const [accreditations, setAccreditations] = useState<AccreditationRequest[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    async function load() {
      const a = await dataProvider.getAnalytics();
      setAnalytics(a);
      const acc = await dataProvider.getAccreditations();
      setAccreditations(acc);
      const mems = await dataProvider.getMembers();
      setMembers(mems);
    }
    load();
  }, []);

  const handleStatusChange = async (id: string, status: AccreditationRequest["status"]) => {
    await dataProvider.updateAccreditationStatus(id, status);
    const updated = await dataProvider.getAccreditations();
    setAccreditations(updated);
  };

  return (
    <div className="min-h-screen bg-accf-ivory py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Admin Header */}
        <div className="bg-accf-charcoal text-accf-ivory rounded-3xl p-8 border border-accf-line shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-accf-maroon text-accf-ivory text-[10px] font-mono font-bold uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-accf-gold" />
              Executive Secretariat Command
            </div>
            <h1 className="font-serif font-bold text-3xl text-accf-ivory">
              ACCF Continental Operations &amp; Analytics
            </h1>
            <p className="text-xs text-accf-ivory/70">
              Live simulated monitoring of memberships, peace signatures, accreditations, and marketplace volume.
            </p>
          </div>
          <div className="px-4 py-2 bg-accf-green-deep border border-accf-gold rounded-xl text-center">
            <div className="text-[10px] font-mono uppercase text-accf-gold">Platform Status</div>
            <div className="font-bold text-xs text-emerald-400 font-mono">● DEMO PREVIEW ACTIVE</div>
          </div>
        </div>

        {/* Analytics KPI 4-Grid */}
        {analytics && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-accf-line-dark shadow-sm space-y-2">
              <div className="text-xs font-mono uppercase text-accf-muted">Total Registered Members</div>
              <div className="font-serif font-bold text-3xl text-accf-charcoal">
                {analytics.totalMembers.toLocaleString()}
              </div>
              <div className="text-[10px] text-emerald-600 font-mono flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +12.4% this week
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-accf-line-dark shadow-sm space-y-2">
              <div className="text-xs font-mono uppercase text-accf-muted">Peace Signatures</div>
              <div className="font-serif font-bold text-3xl text-accf-gold">
                {analytics.peaceSignatures.toLocaleString()}
              </div>
              <div className="text-[10px] text-accf-muted font-mono">54 Nations Connected</div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-accf-line-dark shadow-sm space-y-2">
              <div className="text-xs font-mono uppercase text-accf-muted">2km Table Accreditations</div>
              <div className="font-serif font-bold text-3xl text-accf-maroon">
                {analytics.accreditedDelegates.toLocaleString()} / 10,000
              </div>
              <div className="text-[10px] text-accf-muted font-mono">7 Diplomatic Categories</div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-accf-line-dark shadow-sm space-y-2">
              <div className="text-xs font-mono uppercase text-accf-muted">Simulated Commerce Vol</div>
              <div className="font-serif font-bold text-2xl text-accf-green">
                {formatNGN(analytics.totalSimulatedVolumeNGN)}
              </div>
              <div className="text-[10px] text-accf-muted font-mono">Demo Trade Transactions</div>
            </div>
          </div>
        )}

        {/* Accreditation Request Approval Queue */}
        <div className="bg-white rounded-3xl p-8 border border-accf-line-dark shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-accf-line-dark pb-4">
            <div>
              <h2 className="font-serif font-bold text-2xl text-accf-charcoal">
                2-Kilometre Peace Table Accreditation Queue
              </h2>
              <p className="text-xs text-accf-muted mt-0.5">
                Review and assign official seating zones for sovereign, royal, and youth delegations.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-accf-maroon px-3 py-1 bg-accf-maroon/10 rounded">
              {accreditations.length} Requests
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
                  <th className="pb-3">Guests</th>
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
                    <td className="py-4 font-mono text-center">
                      {acc.guestCount}
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
                            className="px-2.5 py-1 rounded bg-accf-green text-accf-ivory hover:bg-accf-green-light text-[10px] font-bold"
                          >
                            Approve
                          </button>
                        )}
                        {acc.status !== "Declined" && (
                          <button
                            onClick={() => handleStatusChange(acc.id, "Declined")}
                            className="px-2.5 py-1 rounded bg-accf-maroon/20 text-accf-maroon hover:bg-accf-maroon hover:text-white text-[10px] font-bold"
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

        {/* Member Chair Number Registry */}
        <div className="bg-white rounded-3xl p-8 border border-accf-line-dark shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-accf-line-dark pb-4">
            <div>
              <h2 className="font-serif font-bold text-2xl text-accf-charcoal">
                Master Chair Registry (`AKDT-000XXXX`)
              </h2>
              <p className="text-xs text-accf-muted mt-0.5">
                Sequential chair issuance records across standard, premium, and ambassador seats.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-accf-green px-3 py-1 bg-accf-green/10 rounded">
              {members.length} Members
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.slice(0, 9).map((m) => (
              <div
                key={m.id}
                className="p-4 bg-accf-ivory rounded-xl border border-accf-line-dark flex items-center gap-3"
              >
                <img
                  src={m.photoUrl}
                  alt={m.name}
                  className="w-10 h-10 rounded-full object-cover border border-accf-gold"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-serif font-bold text-sm text-accf-charcoal truncate">
                    {m.name}
                  </div>
                  <div className="text-[10px] font-mono text-accf-gold font-bold">
                    {m.chairNo} • {m.tier}
                  </div>
                  <div className="text-[10px] text-accf-muted">{m.country}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

