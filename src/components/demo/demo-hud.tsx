"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/context/auth-context";
import {
  Users,
  Shield,
  ChefHat,
  Store,
  Briefcase,
  Ticket,
  Eye,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Check,
} from "lucide-react";

export function DemoHud() {
  const { user, loginAsPersona, availablePersonas } = useAuth();
  const [expanded, setExpanded] = useState(false);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="w-3.5 h-3.5 text-red-400" />;
      case "ambassador":
        return <Sparkles className="w-3.5 h-3.5 text-accf-gold" />;
      case "host":
        return <ChefHat className="w-3.5 h-3.5 text-emerald-400" />;
      case "vendor":
        return <Store className="w-3.5 h-3.5 text-amber-400" />;
      case "business":
        return <Briefcase className="w-3.5 h-3.5 text-blue-400" />;
      case "moderator":
        return <Eye className="w-3.5 h-3.5 text-purple-400" />;
      default:
        return <Users className="w-3.5 h-3.5 text-accf-gold-soft" />;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      {/* Minimized Pill */}
      {!expanded ? (
        <button
          onClick={() => setExpanded(true)}
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-accf-charcoal/90 hover:bg-accf-charcoal text-accf-ivory border border-accf-gold/40 shadow-2xl backdrop-blur-md transition-all hover:scale-105 group"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <div className="text-left text-xs">
            <span className="text-[10px] text-accf-gold font-mono uppercase tracking-wider block">
              Demo Persona HUD
            </span>
            <span className="font-semibold text-accf-ivory flex items-center gap-1.5 truncate max-w-[150px]">
              {user ? user.name : "Guest Preview"}
            </span>
          </div>
          <ChevronUp className="w-4 h-4 text-accf-gold group-hover:-translate-y-0.5 transition-transform" />
        </button>
      ) : (
        /* Expanded Drawer */
        <div className="bg-accf-charcoal-card border border-accf-gold/50 rounded-xl shadow-2xl p-4 text-accf-ivory animate-in slide-in-from-bottom-3 duration-200 backdrop-blur-xl w-80">
          <div className="flex items-center justify-between pb-3 border-b border-accf-line">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-accf-green text-accf-gold font-bold">
                  Interactive Demo Mode
                </span>
              </div>
              <h4 className="font-serif font-semibold text-sm text-accf-ivory mt-0.5">
                Switch Demo Persona
              </h4>
            </div>
            <button
              onClick={() => setExpanded(false)}
              className="p-1 rounded hover:bg-accf-green text-accf-ivory/60 hover:text-accf-ivory"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-accf-ivory/70 my-2.5 leading-tight">
            Select any of the 9 simulated African stakeholder personas to instantly preview their tailored platform experience:
          </p>

          <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
            {availablePersonas.map((persona) => {
              const isCurrent = user?.id === persona.id;
              return (
                <button
                  key={persona.id}
                  onClick={() => {
                    loginAsPersona(persona.id);
                  }}
                  className={`w-full text-left p-2 rounded flex items-center justify-between gap-2 text-xs transition-all ${
                    isCurrent
                      ? "bg-accf-green border border-accf-gold text-accf-ivory font-semibold shadow-inner"
                      : "bg-accf-charcoal/60 hover:bg-accf-green/50 border border-accf-line/40 text-accf-ivory/80"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <img
                      src={persona.photoUrl}
                      alt={persona.name}
                      className="w-7 h-7 rounded-full object-cover border border-accf-gold/60 flex-shrink-0"
                    />
                    <div className="truncate">
                      <div className="truncate text-accf-ivory">{persona.name}</div>
                      <div className="text-[10px] text-accf-gold-soft font-mono flex items-center gap-1">
                        {getRoleIcon(persona.role)}
                        <span>{persona.tier}</span> • <span>{persona.country}</span>
                      </div>
                    </div>
                  </div>
                  {isCurrent && <Check className="w-4 h-4 text-accf-gold flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-2.5 border-t border-accf-line/60 flex items-center justify-between text-[10px] text-accf-ivory/50 font-mono">
            <span>Chair ID: {user?.chairNo || "N/A"}</span>
            <span className="text-emerald-400">● Simulated Data Active</span>
          </div>
        </div>
      )}
    </div>
  );
}

