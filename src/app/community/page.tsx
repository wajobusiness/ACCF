"use client";

import React, { useState, useEffect } from "react";
import { dataProvider } from "@/lib/data-provider";
import { Hub, HubPost } from "@/types/master-models";
import {
  Users,
  MessageSquare,
  Heart,
  Plus,
  Filter,
  CheckCircle2,
  X,
  Share2,
  Tag,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function CommunityHubsPage() {
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [posts, setPosts] = useState<HubPost[]>([]);
  const [selectedHub, setSelectedHub] = useState("all");
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);

  // New Post Form
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("Heritage, Food Sovereignty");
  const [hubCategory, setHubCategory] = useState("Food Heritage & Ancient Grains");
  const [postSuccess, setPostSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      const h = await dataProvider.getHubs();
      setHubs(h);
      const p = await dataProvider.getHubPosts(selectedHub);
      setPosts(p);
    }
    load();
  }, [selectedHub]);

  const handleLike = async (postId: string) => {
    await dataProvider.likeHubPost(postId);
    const updated = await dataProvider.getHubPosts(selectedHub);
    setPosts(updated);
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) return;

    await dataProvider.createHubPost({
      hubId: "hub-01",
      hubSlug: selectedHub === "all" ? "food-heritage" : selectedHub,
      hubCategory,
      authorMemberId: "mem-01",
      authorName: "Amina Okafor",
      authorPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      authorRole: "Peace Ambassador",
      authorCountry: "Nigeria",
      title,
      body,
      tags: tags.split(",").map((t) => t.trim()),
    });

    const updated = await dataProvider.getHubPosts(selectedHub);
    setPosts(updated);
    setPostSuccess(true);
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
            <Users className="w-4 h-4" />
            The Largest Digital Food Movement
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-semibold leading-tight">
            African Food Movement <br />
            <em className="text-accf-gold italic font-normal">Community Hubs</em>
          </h1>
          <p className="text-sm sm:text-base text-accf-ivory/80 max-w-2xl mx-auto leading-relaxed">
            Ten permanent channels connecting farmers, chefs, researchers, culinary tourists, investors, and families across 54 nations.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setIsNewPostOpen(true);
                setPostSuccess(false);
              }}
              className="px-8 py-3.5 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-widest hover:bg-accf-gold-soft transition-all shadow-xl inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Start a Community Discussion
            </button>
          </div>
        </div>
      </section>

      {/* 10 Hubs Channel Selector */}
      <section className="sticky top-20 z-30 bg-accf-ivory border-b border-accf-line-dark py-3.5 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedHub("all")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedHub === "all"
                ? "bg-accf-green text-accf-gold font-bold shadow"
                : "bg-white text-accf-charcoal border border-accf-line-dark hover:border-accf-gold"
            }`}
          >
            All Channels
          </button>
          {hubs.map((h) => (
            <button
              key={h.id}
              onClick={() => setSelectedHub(h.slug)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedHub === h.slug
                  ? "bg-accf-green text-accf-gold font-bold shadow"
                  : "bg-white text-accf-charcoal border border-accf-line-dark hover:border-accf-gold"
              }`}
            >
              {h.category}
            </button>
          ))}
        </div>
      </section>

      {/* Main Discussions Stream */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex-1 w-full space-y-8">
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="p-6 sm:p-8 bg-white rounded-2xl border border-accf-line-dark shadow-sm hover:shadow-md transition-all space-y-4"
            >
              {/* Author & Hub Tag */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorPhoto}
                    alt={post.authorName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-accf-gold"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif font-bold text-sm text-accf-charcoal">{post.authorName}</h4>
                      <span className="text-[10px] font-mono text-accf-gold px-1.5 py-0.5 rounded bg-accf-green-deep">
                        {post.authorRole}
                      </span>
                    </div>
                    <div className="text-[10px] text-accf-muted font-mono">
                      {post.authorCountry} • {post.createdAt}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-accf-maroon font-semibold px-2.5 py-1 rounded bg-accf-maroon/10">
                  {post.hubCategory}
                </span>
              </div>

              {/* Title & Body */}
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-accf-charcoal leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-accf-charcoal/80 leading-relaxed">
                  {post.body}
                </p>
              </div>

              {/* Image if available */}
              {post.imageUrl && (
                <div className="rounded-xl overflow-hidden max-h-72 border border-accf-line-dark">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                </div>
              )}

              {/* Tags & Action Bar */}
              <div className="pt-4 border-t border-accf-line-dark flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags?.map((t, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-accf-ivory text-[10px] font-mono text-accf-muted border border-accf-line-dark"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-accf-muted">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-1.5 hover:text-accf-maroon transition-colors"
                  >
                    <Heart className="w-4 h-4 fill-accf-maroon text-accf-maroon" />
                    <span>{post.likesCount}</span>
                  </button>
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-accf-green" />
                    <span>{post.commentsCount} replies</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* NEW POST MODAL */}
      {isNewPostOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-accf-charcoal text-accf-ivory border-2 border-accf-gold rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-accf-line pb-3">
              <h3 className="font-serif font-bold text-lg">Start a Community Discussion</h3>
              <button
                onClick={() => setIsNewPostOpen(false)}
                className="p-1 rounded text-accf-ivory/60 hover:text-accf-ivory"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {postSuccess ? (
              <div className="text-center space-y-3 py-4">
                <CheckCircle2 className="w-12 h-12 text-accf-gold mx-auto" />
                <h4 className="font-serif font-bold text-xl text-accf-gold-soft">
                  Discussion Published!
                </h4>
                <p className="text-xs text-accf-ivory/80 leading-relaxed">
                  Your post is now live across the African Food Movement Community Hubs network.
                </p>
                <button
                  onClick={() => setIsNewPostOpen(false)}
                  className="mt-2 px-6 py-2 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
                <div>
                  <label className="block text-accf-ivory/70 mb-1">Target Community Channel</label>
                  <select
                    value={hubCategory}
                    onChange={(e) => setHubCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-accf-charcoal-card border border-accf-line rounded text-accf-ivory focus:border-accf-gold"
                  >
                    {hubs.map((h) => (
                      <option key={h.id} value={h.category}>
                        {h.category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-accf-ivory/70 mb-1">Discussion Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Traditional preservation techniques for indigenous Sahelian grains"
                    className="w-full px-3 py-2 bg-accf-charcoal-card border border-accf-line rounded text-accf-ivory focus:border-accf-gold font-medium"
                  />
                </div>

                <div>
                  <label className="block text-accf-ivory/70 mb-1">Body Text &amp; Insights</label>
                  <textarea
                    rows={5}
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Share your agronomic research, chef techniques, farmer cooperative updates, or cultural inquiries..."
                    className="w-full px-3 py-2 bg-accf-charcoal-card border border-accf-line rounded text-accf-ivory focus:border-accf-gold font-medium"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-accf-ivory/70 mb-1">Tags (Comma-separated)</label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="e.g. Fonio, Ancient Grains, AfCFTA"
                    className="w-full px-3 py-2 bg-accf-charcoal-card border border-accf-line rounded text-accf-ivory focus:border-accf-gold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-widest hover:bg-accf-gold-soft transition-colors shadow-lg"
                >
                  Publish Discussion Thread
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

