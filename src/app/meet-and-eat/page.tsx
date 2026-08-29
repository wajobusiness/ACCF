"use client";

import React, { useState, useEffect } from "react";
import { dataProvider } from "@/lib/data-provider";
import { MeetEatListing, Booking } from "@/types/master-models";
import { formatNGN } from "@/lib/utils";
import {
  Sparkles,
  Search,
  Filter,
  MapPin,
  Star,
  Users,
  Calendar,
  UtensilsCrossed,
  CheckCircle2,
  X,
  MessageSquare,
  Send,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function MeetAndEatPage() {
  const [listings, setListings] = useState<MeetEatListing[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedListing, setSelectedListing] = useState<MeetEatListing | null>(null);
  const [partySize, setPartySize] = useState(2);
  const [dietaryNotes, setDietaryNotes] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Chat Simulation State
  const [chattingWithHost, setChattingWithHost] = useState<MeetEatListing | null>(null);
  const [chatMessages, setChatMessages] = useState<{ sender: "user" | "host"; text: string; time: string }[]>([
    { sender: "host", text: "Hello! Welcome to our dining circle. Looking forward to hosting you for authentic home-cooked hospitality!", time: "10:30 AM" }
  ]);
  const [inputMsg, setInputMsg] = useState("");

  useEffect(() => {
    async function load() {
      const data = await dataProvider.getMeetEatListings(selectedCountry);
      setListings(data);
    }
    load();
  }, [selectedCountry]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedListing) return;

    await dataProvider.createBooking({
      listingId: selectedListing.id,
      listingTitle: selectedListing.title,
      hostMemberId: selectedListing.hostMemberId,
      hostName: selectedListing.hostName,
      requesterMemberId: "mem-01",
      requesterName: "Amina Okafor",
      partySize,
      date: selectedListing.date,
      dietaryNotes,
      totalAmountNGN: selectedListing.priceNGN * partySize,
      status: "Confirmed",
    });

    setBookingConfirmed(true);
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    setChatMessages((prev) => [
      ...prev,
      { sender: "user", text: userText, time: "Just now" }
    ]);
    setInputMsg("");

    // Simulated host reply after 1s
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "host",
          text: `Thank you for your message! Yes, we can certainly accommodate your preferences and prepare fresh hibiscus tea as a welcome blessing.`,
          time: "Just now"
        }
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-accf-ivory">
      {/* Hero */}
      <section className="bg-accf-charcoal text-accf-ivory py-20 px-4 sm:px-6 lg:px-8 border-b border-accf-line">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-accf-gold font-bold inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accf-green-deep border border-accf-gold/30">
            <Sparkles className="w-4 h-4" />
            Pan-African Food Friendship Network
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-semibold leading-tight">
            Meet &amp; Eat Africa
          </h1>
          <p className="text-sm sm:text-base text-accf-ivory/80 max-w-2xl mx-auto leading-relaxed">
            &quot;Food is the shortest route to friendship. Connect with vetted members across 54 countries, share authentic home-cooked meals, and experience true African hospitality.&quot;
          </p>
          <div className="text-xs font-mono text-accf-gold-soft pt-1">
            &quot;One Home! One Meal! One Africa!&quot;
          </div>
        </div>
      </section>

      {/* Country Filter Bar */}
      <section className="sticky top-20 z-30 bg-accf-ivory border-b border-accf-line-dark py-4 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto pb-1">
          <Filter className="w-4 h-4 text-accf-muted flex-shrink-0 mr-2" />
          {["All", "Nigeria", "Ghana", "Kenya", "Ethiopia", "Rwanda", "South Africa", "Senegal", "Morocco", "Tanzania"].map(
            (c) => (
              <button
                key={c}
                onClick={() => setSelectedCountry(c)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCountry === c
                    ? "bg-accf-green text-accf-gold shadow"
                    : "bg-white text-accf-charcoal border border-accf-line-dark hover:border-accf-gold"
                }`}
              >
                {c}
              </button>
            )
          )}
        </div>
      </section>

      {/* Host Listings Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex-1 w-full space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedListing(item);
                setBookingConfirmed(false);
              }}
              className="bg-white rounded-2xl border border-accf-line-dark overflow-hidden shadow-sm hover:shadow-2xl hover:border-accf-gold transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm text-xs font-semibold text-accf-ivory">
                    <img
                      src={item.hostPhoto}
                      alt={item.hostName}
                      className="w-5 h-5 rounded-full object-cover border border-accf-gold"
                    />
                    <span>{item.hostName}</span>
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-1 rounded bg-accf-gold text-accf-charcoal text-xs font-bold font-mono">
                    {formatNGN(item.priceNGN)} / guest
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-accf-muted">
                    <span className="font-mono font-semibold text-accf-maroon">{item.cuisine}</span>
                    <div className="flex items-center gap-1 text-accf-gold font-bold">
                      <Star className="w-3.5 h-3.5 fill-accf-gold" />
                      <span>{item.rating}</span>
                      <span className="text-accf-muted font-normal">({item.reviewsCount})</span>
                    </div>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-accf-charcoal group-hover:text-accf-green leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-accf-muted line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 text-xs font-mono text-accf-charcoal/70 flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-accf-gold flex-shrink-0" />
                    <span className="truncate">{item.city}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-3">
                <div className="pt-4 border-t border-accf-line-dark flex items-center justify-between text-xs font-bold text-accf-green group-hover:text-accf-gold">
                  <span>View Experience &amp; Book</span>
                  <span>&rarr;</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setChattingWithHost(item);
                  }}
                  className="w-full py-2 rounded bg-accf-ivory border border-accf-line-dark text-accf-charcoal text-xs font-semibold hover:border-accf-gold flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-accf-green" />
                  Chat with Host {item.hostName.split(" ")[0]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOST EXPERIENCE & BOOKING MODAL */}
      {selectedListing && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-accf-charcoal text-accf-ivory border-2 border-accf-gold rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-accf-line pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedListing.hostPhoto}
                  alt={selectedListing.hostName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-accf-gold shadow"
                />
                <div>
                  <h3 className="font-serif font-bold text-lg">{selectedListing.title}</h3>
                  <div className="text-xs font-mono text-accf-gold-soft">
                    Hosted by {selectedListing.hostName} &bull; {selectedListing.city}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedListing(null)}
                className="p-1 rounded text-accf-ivory/60 hover:text-accf-ivory"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-accf-ivory/80 leading-relaxed">
              {selectedListing.description}
            </p>

            {/* Menu Highlights */}
            <div className="space-y-2 p-4 bg-accf-charcoal-card border border-accf-line/60 rounded-xl">
              <span className="text-[10px] font-mono uppercase text-accf-gold font-bold">
                Experience Menu Highlights:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedListing.menuHighlights.map((m, i) => (
                  <li key={i} className="flex items-center gap-2 text-accf-ivory/90">
                    <UtensilsCrossed className="w-3.5 h-3.5 text-accf-gold flex-shrink-0" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Booking Form */}
            {bookingConfirmed ? (
              <div className="p-6 bg-accf-green-deep border border-accf-gold rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-accf-gold mx-auto" />
                <h4 className="font-serif font-bold text-xl text-accf-gold-soft">
                  Cultural Dining Confirmed!
                </h4>
                <p className="text-xs text-accf-ivory/80 max-w-sm mx-auto leading-relaxed">
                  Host <strong>{selectedListing.hostName}</strong> has accepted your booking for {partySize} guests in {selectedListing.city}. Check your dashboard for directions and in-app chat.
                </p>
                <button
                  onClick={() => setSelectedListing(null)}
                  className="mt-2 px-6 py-2 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider"
                >
                  Close &amp; Continue
                </button>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-4 text-xs pt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-accf-ivory/70 mb-1">Party Size (Guests)</label>
                    <select
                      value={partySize}
                      onChange={(e) => setPartySize(parseInt(e.target.value, 10))}
                      className="w-full px-3 py-2 bg-accf-charcoal-card border border-accf-line rounded text-accf-ivory focus:border-accf-gold"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-accf-ivory/70 mb-1">Date &amp; Schedule</label>
                    <input
                      type="text"
                      readOnly
                      value={`${selectedListing.date} (${selectedListing.timeSlot})`}
                      className="w-full px-3 py-2 bg-accf-charcoal-card border border-accf-line rounded text-accf-gold font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-accf-ivory/70 mb-1">Dietary Preferences / Notes</label>
                  <input
                    type="text"
                    value={dietaryNotes}
                    onChange={(e) => setDietaryNotes(e.target.value)}
                    placeholder="e.g. Vegetarian, Halal, No Shellfish, Peanut Allergy"
                    className="w-full px-3 py-2 bg-accf-charcoal-card border border-accf-line rounded text-accf-ivory focus:border-accf-gold"
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div>
                    <span className="text-[10px] text-accf-ivory/50 block font-mono">Total Estimated:</span>
                    <strong className="font-mono text-accf-gold text-lg">
                      {formatNGN(selectedListing.priceNGN * partySize)}
                    </strong>
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-widest hover:bg-accf-gold-soft transition-all shadow-xl"
                  >
                    Request Cultural Meal Booking
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* HOST CHAT SIMULATION MODAL */}
      {chattingWithHost && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-accf-charcoal text-accf-ivory border-2 border-accf-gold rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl flex flex-col h-[500px]">
            <div className="flex items-center justify-between border-b border-accf-line pb-3">
              <div className="flex items-center gap-2.5">
                <img
                  src={chattingWithHost.hostPhoto}
                  alt={chattingWithHost.hostName}
                  className="w-8 h-8 rounded-full object-cover border border-accf-gold"
                />
                <div>
                  <h4 className="font-serif font-bold text-sm text-accf-ivory">{chattingWithHost.hostName}</h4>
                  <span className="text-[10px] font-mono text-emerald-400">● Online &bull; {chattingWithHost.city}</span>
                </div>
              </div>
              <button
                onClick={() => setChattingWithHost(null)}
                className="p-1 rounded text-accf-ivory/60 hover:text-accf-ivory"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Stream */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.sender === "user"
                        ? "bg-accf-gold text-accf-charcoal font-medium rounded-tr-none"
                        : "bg-accf-green-deep text-accf-ivory border border-accf-line/60 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-accf-ivory/50 mt-1 font-mono">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendChat} className="flex gap-2 pt-2 border-t border-accf-line">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Ask host about menu, arrival, ingredients..."
                className="flex-1 px-3 py-2 bg-accf-charcoal-card border border-accf-line rounded text-accf-ivory text-xs focus:border-accf-gold"
              />
              <button
                type="submit"
                className="p-2.5 rounded bg-accf-gold text-accf-charcoal hover:bg-accf-gold-soft transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
