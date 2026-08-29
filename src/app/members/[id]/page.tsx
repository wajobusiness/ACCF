"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { dataProvider } from "@/lib/data-provider";
import { Member } from "@/types/master-models";
import { ShieldCheck, Award, TreePine, MapPin, Calendar, Heart, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function MemberProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const [member, setMember] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await dataProvider.getMemberById(id);
      if (data) {
        setMember(data);
      } else {
        const all = await dataProvider.getMembers();
        setMember(all[0]);
      }
      setIsLoading(false);
    }
    load();
  }, [id]);

  if (isLoading || !member) {
    return <div className="p-20 text-center text-accf-gold">Loading Diplomatic Credentials...</div>;
  }

  return (
    <div className="min-h-screen bg-accf-ivory py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link
          href="/kolanut-tree"
          className="inline-flex items-center gap-1.5 text-xs text-accf-green font-semibold hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to African Kolanut Digital Tree
        </Link>

        {/* Ceremonial Digital ID Pass */}
        <div className="bg-accf-charcoal text-accf-ivory rounded-3xl p-8 sm:p-12 border-2 border-accf-gold/70 shadow-2xl space-y-8 id-card-glow relative overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-accf-line pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-accf-gold bg-accf-green flex items-center justify-center font-serif font-bold text-accf-gold text-lg">
                AF
              </div>
              <div>
                <h1 className="font-serif font-bold text-xl sm:text-2xl text-accf-ivory">
                  African Cultural Culinary Festival
                </h1>
                <div className="text-xs font-mono text-accf-gold tracking-widest uppercase">
                  Official Diplomatic Seat Verification
                </div>
              </div>
            </div>
            <div className="px-3 py-1 rounded bg-accf-gold text-accf-charcoal text-xs font-mono font-bold uppercase tracking-wider">
              VERIFIED PASS
            </div>
          </div>

          {/* Member Profile Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 flex flex-col items-center text-center space-y-3">
              <img
                src={member.photoUrl}
                alt={member.name}
                className="w-36 h-36 rounded-full object-cover border-4 border-accf-gold shadow-2xl"
              />
              <div className="space-y-1">
                <h2 className="font-serif font-bold text-2xl text-accf-ivory">{member.name}</h2>
                <div className="text-xs font-mono text-accf-gold-soft font-semibold">{member.tier}</div>
                <div className="text-xs text-accf-ivory/60 flex items-center justify-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-accf-gold" />
                  <span>{member.city ? `${member.city}, ` : ""}{member.country}</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-8 space-y-5">
              <div className="p-4 bg-accf-charcoal-card border border-accf-line/60 rounded-xl space-y-2">
                <span className="text-[11px] font-mono text-accf-gold uppercase tracking-wider block">
                  Sacred Peace Pledge:
                </span>
                <blockquote className="font-serif text-base sm:text-lg text-accf-ivory italic leading-snug">
                  &quot;{member.pledgeText}&quot;
                </blockquote>
              </div>

              {/* Bio & Interests */}
              {member.bio && (
                <p className="text-xs text-accf-ivory/80 leading-relaxed">
                  {member.bio}
                </p>
              )}

              {member.foodInterests && member.foodInterests.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-accf-ivory/50">Culinary Passions:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {member.foodInterests.map((interest, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded bg-accf-green/50 border border-accf-line/40 text-[11px] text-accf-gold-soft"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Credentials Metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-accf-charcoal-card border border-accf-line/60 rounded-xl text-xs font-mono">
            <div>
              <span className="text-[10px] text-accf-ivory/50 block">Chair ID:</span>
              <strong className="text-accf-gold">{member.chairNo}</strong>
            </div>
            <div>
              <span className="text-[10px] text-accf-ivory/50 block">Member Since:</span>
              <strong className="text-accf-ivory">{member.joinDate}</strong>
            </div>
            <div>
              <span className="text-[10px] text-accf-ivory/50 block">Tree Leaf:</span>
              <strong className="text-emerald-400">Planted &amp; Active</strong>
            </div>
            <div>
              <span className="text-[10px] text-accf-ivory/50 block">Verification:</span>
              <strong className="text-accf-gold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Authentic
              </strong>
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-accf-line">
            <Link
              href="/kolanut-tree"
              className="inline-flex items-center gap-2 text-xs text-accf-gold hover:underline font-semibold"
            >
              <TreePine className="w-4 h-4" />
              Find this leaf on the Digital Kolanut Tree →
            </Link>
            <div className="flex gap-2">
              <Link
                href="/membership/checkout"
                className="px-4 py-2 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider hover:bg-accf-gold-soft"
              >
                Claim Your Own Chair
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

