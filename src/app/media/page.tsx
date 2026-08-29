"use client";

import React, { useState, useEffect } from "react";
import { dataProvider } from "@/lib/data-provider";
import { MediaPost } from "@/types/master-models";
import {
  Newspaper,
  Play,
  Filter,
  Calendar,
  Clock,
  ArrowRight,
  Share2,
  X,
} from "lucide-react";

export default function MediaCenterPage() {
  const [posts, setPosts] = useState<MediaPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<MediaPost | null>(null);

  useEffect(() => {
    async function load() {
      const data = await dataProvider.getMediaPosts(selectedCategory);
      setPosts(data);
    }
    load();
  }, [selectedCategory]);

  return (
    <div className="flex flex-col min-h-screen bg-accf-ivory">
      {/* Hero */}
      <section className="bg-accf-charcoal text-accf-ivory py-20 px-4 sm:px-6 lg:px-8 border-b border-accf-line">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-accf-gold font-bold inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accf-green-deep border border-accf-gold/30">
            <Newspaper className="w-4 h-4" />
            Official Broadcast &amp; Editorial Bureau
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-semibold leading-tight">
            ACCF Media Center
          </h1>
          <p className="text-sm sm:text-base text-accf-ivory/80 max-w-2xl mx-auto leading-relaxed">
            Latest news dispatches, master documentaries, chef interviews, festival announcements, and continental food heritage reports.
          </p>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="sticky top-20 z-30 bg-accf-ivory border-b border-accf-line-dark py-4 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto pb-1">
          <Filter className="w-4 h-4 text-accf-muted flex-shrink-0 mr-2" />
          {[
            "All",
            "Latest News",
            "Festival Updates",
            "Documentaries",
            "Success Stories",
          ].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-accf-green text-accf-gold shadow"
                  : "bg-white text-accf-charcoal border border-accf-line-dark hover:border-accf-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Media Articles & Videos Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex-1 w-full space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-2xl border border-accf-line-dark overflow-hidden shadow-sm hover:shadow-2xl hover:border-accf-gold transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-accf-charcoal/80 text-[10px] font-mono text-accf-gold font-semibold uppercase">
                    {post.category}
                  </div>
                  {post.mediaType === "video" && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <span className="w-12 h-12 rounded-full bg-accf-gold text-accf-charcoal flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </span>
                      {post.videoDuration && (
                        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-accf-ivory">
                          {post.videoDuration}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] font-mono text-accf-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-accf-gold" />
                      {post.publishedAt}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-accf-gold" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-accf-charcoal group-hover:text-accf-green leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-accf-muted line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-3 border-t border-accf-line-dark flex items-center justify-between text-xs font-bold text-accf-green group-hover:text-accf-gold">
                  <span>{post.mediaType === "video" ? "Watch Video" : "Read Full Dispatch"}</span>
                  <span>→</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ARTICLE / VIDEO READER MODAL */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-accf-charcoal text-accf-ivory border-2 border-accf-gold rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-accf-line pb-3">
              <span className="text-xs font-mono text-accf-gold font-bold uppercase">
                {selectedPost.category} • {selectedPost.readTime}
              </span>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1 rounded text-accf-ivory/60 hover:text-accf-ivory"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-64 rounded-xl overflow-hidden relative border border-accf-line/60">
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              {selectedPost.mediaType === "video" && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="w-16 h-16 rounded-full bg-accf-gold text-accf-charcoal flex items-center justify-center shadow-xl">
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h3 className="font-serif font-bold text-2xl text-accf-ivory leading-tight">
                {selectedPost.title}
              </h3>
              <div className="text-xs font-mono text-accf-gold-soft">
                By {selectedPost.author} • Published on {selectedPost.publishedAt}
              </div>
              <p className="text-xs sm:text-sm text-accf-ivory/80 leading-relaxed pt-2">
                {selectedPost.body}
              </p>
            </div>

            <div className="pt-4 border-t border-accf-line flex justify-end">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-6 py-2.5 rounded bg-accf-green text-accf-ivory font-bold text-xs uppercase tracking-wider hover:bg-accf-green-light"
              >
                Close Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

