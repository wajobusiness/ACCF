"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  Film,
  Volume2,
  VolumeX,
  Maximize2,
  Share2,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  X,
} from "lucide-react";

interface VideoChapter {
  id: string;
  chapterNo: string;
  title: string;
  subtitle: string;
  duration: string;
  thumbnailUrl: string;
  videoEmbedUrl: string;
  description: string;
  featuredSpeaker: string;
  speakerTitle: string;
  keyQuote: string;
}

const DOCUMENTARY_CHAPTERS: VideoChapter[] = [
  {
    id: "ch-01",
    chapterNo: "Chapter 01",
    title: "Breaking the Kolanut: The Sacred Rite of Continental Peace",
    subtitle: "Ancestral African Rituals of Welcome, Truth & Solidarity",
    duration: "12:40",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&auto=format&fit=crop&q=80",
    videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    description:
      "Witness traditional rulers, royal monarchs, and diplomatic delegates from across Africa gather to perform the ancestral Kolanut Rite—a sacred affirmation that 'He who brings the Kolanut brings life and peace.'",
    featuredSpeaker: "His Imperial Majesty, Royal Council of African Custodians",
    speakerTitle: "Continental Cultural Patriarch",
    keyQuote:
      "When we share the Kolanut, no weapon can be raised between brothers. The meal is our treaty.",
  },
  {
    id: "ch-02",
    chapterNo: "Chapter 02",
    title: "The 2-Kilometre African Peace Table at Eagle Square",
    subtitle: "Architectural Blueprint for 10,000 Guests & 1,000 Traditional Dishes",
    duration: "08:15",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80",
    videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    description:
      "An exclusive 3D spatial tour and behind-the-scenes architectural documentary of the longest multicultural banquet table in human history, anchoring Abuja 2026.",
    featuredSpeaker: "Chief Spatial Architect & Production Director",
    speakerTitle: "ACCF Infrastructure Committee",
    keyQuote:
      "Two unbroken kilometres of handcrafted terracotta, mahogany, and 1,000 ancestral cuisines under one sky.",
  },
  {
    id: "ch-03",
    chapterNo: "Chapter 03",
    title: "One Home. One Meal. One Africa: 54 Sovereign Cuisines",
    subtitle: "Master Chefs, Indigenous Grains & The Pan-African Taste Trails",
    duration: "15:30",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&auto=format&fit=crop&q=80",
    videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    description:
      "From Ethiopian Teff to West African Jollof, North African Tagines, and Southern African Braai—exploring the culinary diversity and indigenous agro-heritage uniting the African continent.",
    featuredSpeaker: "Chef Fatouma Toure & Master Heritage Guild",
    speakerTitle: "Executive Guild of African Culinary Arts",
    keyQuote:
      "Food is our deepest language. In every seed lies our resilience and our shared future.",
  },
  {
    id: "ch-04",
    chapterNo: "Chapter 04",
    title: "The Living African Kolanut Tree: Digital Heritage Movement",
    subtitle: "300 Million Seats, Sovereign Chair IDs & The Continental Digital Pass",
    duration: "06:45",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&auto=format&fit=crop&q=80",
    videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    description:
      "How millions of Africans and global Diaspora members are claiming sovereign digital seats on the Living Kolanut Tree to fund agricultural trade, peace summits, and cultural preservation.",
    featuredSpeaker: "Lead Digital Ecosystem Architect",
    speakerTitle: "ACCF Continental Technology Lead",
    keyQuote:
      "Every digital seat is a permanent leaf on the continental tree of solidarity.",
  },
];

export function CinematicVideoSection() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const activeChapter = DOCUMENTARY_CHAPTERS[activeChapterIndex];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-accf-charcoal text-accf-ivory overflow-hidden border-t border-accf-line">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accf-gold/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-10 w-[500px] h-[400px] bg-accf-green/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accf-green-deep border border-accf-gold/40 text-[10px] font-mono tracking-widest uppercase text-accf-gold">
              <Film className="w-3.5 h-3.5 text-accf-gold" />
              <span>Official Documentary &amp; Cinematic Broadcast</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-accf-ivory">
              Breaking The Silence. <br />
              <span className="gold-text-gradient italic font-normal">Sharing The Meal.</span>
            </h2>
            <p className="text-sm sm:text-base text-accf-ivory/80 leading-relaxed">
              Immerse yourself in the official video archive of the African Cultural Culinary Festival.
              Explore the history, the sacred rituals, and the people building continental peace.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider hover:bg-accf-gold-soft transition-all shadow-lg flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Play Full Documentary</span>
            </button>
            <Link
              href="/media"
              className="px-5 py-3 rounded-xl bg-accf-charcoal-card border border-accf-line text-accf-ivory text-xs font-semibold hover:border-accf-gold transition-colors"
            >
              All Dispatches &rarr;
            </Link>
          </div>
        </div>

        {/* Main Cinematic Video Viewport */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-accf-gold/60 shadow-2xl bg-black group">
          <div className="relative h-[340px] sm:h-[480px] lg:h-[560px] w-full overflow-hidden">
            {/* Background Thumbnail Image */}
            <img
              src={activeChapter.thumbnailUrl}
              alt={activeChapter.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Top Video Overlay Badges */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-accf-charcoal/80 border border-accf-gold/50 text-[10px] font-mono text-accf-gold font-bold uppercase backdrop-blur-md">
                  4K ULTRA HD
                </span>
                <span className="px-3 py-1 rounded-full bg-black/60 text-[10px] font-mono text-accf-ivory/80 backdrop-blur-md">
                  {activeChapter.duration}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-accf-green text-[10px] font-mono text-accf-gold font-bold uppercase border border-accf-line">
                  {activeChapter.chapterNo}
                </span>
              </div>
            </div>

            {/* Big Central Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setModalOpen(true)}
                className="relative group/btn focus:outline-none"
                aria-label="Play Video"
              >
                <div className="absolute -inset-4 bg-accf-gold/30 rounded-full blur-xl animate-pulse group-hover/btn:bg-accf-gold/50 transition-all" />
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-accf-gold to-accf-gold-soft text-accf-charcoal flex items-center justify-center shadow-2xl transform group-hover/btn:scale-110 transition-transform duration-300 border-2 border-white/40">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
                </div>
              </button>
            </div>

            {/* Bottom Video Meta & Quote Banner */}
            <div className="absolute bottom-6 left-6 right-6 space-y-3">
              <div className="max-w-3xl space-y-1">
                <span className="text-xs font-mono text-accf-gold uppercase tracking-wider font-semibold">
                  {activeChapter.subtitle}
                </span>
                <h3 className="font-serif font-bold text-xl sm:text-3xl text-accf-ivory drop-shadow-md">
                  {activeChapter.title}
                </h3>
              </div>

              {/* Highlight Quote Pill */}
              <div className="p-3.5 sm:p-4 bg-black/70 backdrop-blur-md rounded-2xl border border-accf-line/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <p className="italic text-accf-gold-soft font-serif">
                    &ldquo;{activeChapter.keyQuote}&rdquo;
                  </p>
                  <div className="text-[10px] font-mono text-accf-ivory/60">
                    — {activeChapter.featuredSpeaker}, {activeChapter.speakerTitle}
                  </div>
                </div>

                <button
                  onClick={() => setModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-accf-green border border-accf-gold/40 text-accf-gold font-bold text-xs hover:bg-accf-green-light self-start sm:self-auto flex items-center gap-1.5 transition-colors"
                >
                  <span>Watch Chapter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chapter Selection Carousel Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DOCUMENTARY_CHAPTERS.map((ch, idx) => {
            const isCurrent = activeChapterIndex === idx;
            return (
              <button
                key={ch.id}
                onClick={() => setActiveChapterIndex(idx)}
                className={`p-4 rounded-2xl text-left transition-all border flex flex-col justify-between gap-3 ${
                  isCurrent
                    ? "bg-accf-green-deep border-accf-gold shadow-xl ring-2 ring-accf-gold/60 text-accf-ivory"
                    : "bg-accf-charcoal-card border-accf-line hover:border-accf-gold/50 text-accf-ivory/80"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className={`font-bold ${isCurrent ? "text-accf-gold" : "text-accf-muted"}`}>
                    {ch.chapterNo}
                  </span>
                  <span className="flex items-center gap-1 text-accf-ivory/60">
                    <Clock className="w-3 h-3" />
                    {ch.duration}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-sm text-accf-ivory line-clamp-2">
                    {ch.title}
                  </h4>
                  <p className="text-[11px] text-accf-ivory/60 line-clamp-2 leading-relaxed">
                    {ch.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-mono text-accf-gold pt-2 border-t border-accf-line/40">
                  {isCurrent ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Now Selected</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 fill-current" />
                      <span>Preview Chapter</span>
                    </>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Full-Screen Cinematic Video Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl bg-accf-charcoal border-2 border-accf-gold rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            {/* Modal Bar */}
            <div className="p-4 sm:p-6 bg-accf-charcoal-card border-b border-accf-line flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-accf-gold font-bold block">
                  {activeChapter.chapterNo} &bull; Continental Broadcast
                </span>
                <h3 className="font-serif font-bold text-base sm:text-xl text-accf-ivory">
                  {activeChapter.title}
                </h3>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-full hover:bg-accf-green text-accf-ivory/70 hover:text-accf-ivory transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Video Frame */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={activeChapter.videoEmbedUrl}
                title={activeChapter.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Modal Footer with Actions */}
            <div className="p-4 sm:p-6 bg-accf-charcoal-card border-t border-accf-line flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-accf-ivory/80 max-w-xl leading-relaxed">
                {activeChapter.description}
              </p>

              <div className="flex items-center gap-3 flex-shrink-0">
                <Link
                  href="/membership/checkout"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider hover:bg-accf-gold-soft transition-all"
                >
                  Take Your Seat &rarr;
                </Link>
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-accf-charcoal border border-accf-line text-xs font-semibold text-accf-ivory hover:border-accf-gold"
                >
                  Close Player
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

