"use client";

import React, { useState, useEffect } from "react";
import { dataProvider } from "@/lib/data-provider";
import { FestivalEvent } from "@/types/master-models";
import {
  Calendar,
  MapPin,
  Users,
  Award,
  Sparkles,
  UtensilsCrossed,
  Ticket,
  CheckCircle2,
  X,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function FestivalPage() {
  const [events, setEvents] = useState<FestivalEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<FestivalEvent | null>(null);
  const [ticketReserved, setTicketReserved] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await dataProvider.getFestivalEvents();
      setEvents(data);
    }
    load();
  }, []);

  const handleTicketReserve = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketReserved(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-accf-ivory">
      {/* Hero */}
      <section className="bg-accf-charcoal text-accf-ivory py-20 px-4 sm:px-6 lg:px-8 border-b border-accf-line">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-accf-gold font-bold inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accf-green-deep border border-accf-gold/30">
            <Calendar className="w-4 h-4" />
            October 14–18, 2026 • Abuja, Nigeria
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-semibold leading-tight">
            African Cultural Culinary Festival <br />
            <em className="text-accf-gold italic font-normal">Abuja 2026 Hub</em>
          </h1>
          <p className="text-sm sm:text-base text-accf-ivory/80 max-w-2xl mx-auto leading-relaxed">
            Eight premier arenas, summits, culinary championships, and cultural villages celebrating the heritage, food security, and unity of Africa.
          </p>
        </div>
      </section>

      {/* 8 Sub-Events Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex-1 w-full space-y-12">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-widest text-accf-maroon font-bold">
            Flagship Festival Programs
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-accf-charcoal">
            Eight Signature Summits &amp; Arenas
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => {
                setSelectedEvent(event);
                setTicketReserved(false);
              }}
              className="bg-white border border-accf-line-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-accf-gold transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={event.coverImage}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-accf-charcoal/80 text-[10px] font-mono text-accf-gold font-semibold">
                    {event.date.split(",")[0]}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-serif font-bold text-lg text-accf-charcoal group-hover:text-accf-green transition-colors leading-snug">
                    {event.name}
                  </h3>
                  <p className="text-xs text-accf-muted line-clamp-3 leading-relaxed">
                    {event.description}
                  </p>
                  <div className="space-y-1 text-[11px] font-mono text-accf-charcoal/70">
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-accf-gold flex-shrink-0" />
                      <span className="truncate">{event.venueLocation}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-accf-line-dark flex items-center justify-between text-xs font-semibold text-accf-green group-hover:text-accf-gold">
                  <span>View Details &amp; Reserve</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EVENT DETAIL & TICKET MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-accf-charcoal text-accf-ivory border-2 border-accf-gold rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-accf-line pb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-accf-gold font-semibold">
                <Ticket className="w-4 h-4" />
                <span>Festival Arena Pass</span>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1 rounded text-accf-ivory/60 hover:text-accf-ivory"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif font-bold text-2xl text-accf-ivory">{selectedEvent.name}</h3>
              <p className="text-xs text-accf-ivory/80 leading-relaxed">{selectedEvent.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3.5 bg-accf-charcoal-card border border-accf-line/60 rounded-xl text-xs font-mono">
              <div>
                <span className="text-[10px] text-accf-ivory/50 block">Date &amp; Time</span>
                <strong className="text-accf-gold">{selectedEvent.date}</strong>
                <span className="block text-[10px] text-accf-ivory/70">{selectedEvent.time}</span>
              </div>
              <div>
                <span className="text-[10px] text-accf-ivory/50 block">Venue &amp; Hall</span>
                <strong className="text-accf-ivory">{selectedEvent.hallName}</strong>
                <span className="block text-[10px] text-accf-ivory/70">{selectedEvent.venueLocation}</span>
              </div>
            </div>

            {/* Speakers / Chefs */}
            {selectedEvent.speakers.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-accf-gold">Keynote Speakers:</span>
                <div className="flex flex-wrap gap-3">
                  {selectedEvent.speakers.map((spk, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-accf-green/30 rounded border border-accf-line/40 text-xs">
                      <img src={spk.photoUrl} alt={spk.name} className="w-6 h-6 rounded-full object-cover border border-accf-gold" />
                      <div>
                        <div className="font-semibold text-accf-ivory">{spk.name}</div>
                        <div className="text-[9px] text-accf-ivory/60">{spk.role} ({spk.country})</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {ticketReserved ? (
              <div className="p-4 bg-accf-green-deep border border-accf-gold rounded text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-accf-gold mx-auto" />
                <h4 className="font-serif font-bold text-lg text-accf-gold-soft">Pass Confirmed!</h4>
                <p className="text-xs text-accf-ivory/80">
                  Your seat for <strong>{selectedEvent.name}</strong> is reserved in your Member Dashboard.
                </p>
              </div>
            ) : (
              <form onSubmit={handleTicketReserve} className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-widest hover:bg-accf-gold-soft transition-all shadow-xl flex items-center justify-center gap-2"
                >
                  <Ticket className="w-4 h-4" />
                  Reserve Free Member Arena Pass
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

