import {
  Member,
  MembershipTier,
  TreeLeaf,
  MeetEatListing,
  Booking,
  Hub,
  HubPost,
  AccreditationRequest,
  FestivalEvent,
  BusinessOpportunity,
  Vendor,
  MarketplaceListing,
  Order,
  MediaPost,
  Sponsor,
  PeaceWallEntry,
  CountryProfile,
  PlatformAnalytics,
} from "@/types/master-models";

import {
  DEMO_MEMBERSHIP_TIERS,
  DEMO_MEMBERS,
  DEMO_COUNTRIES,
  DEMO_TREE_LEAVES,
  DEMO_MEET_EAT_LISTINGS,
  DEMO_HUBS,
  DEMO_HUB_POSTS,
  DEMO_PEACE_TABLE_ZONES,
  DEMO_PEACE_TABLE_DISHES,
  DEMO_ACCREDITATIONS,
  DEMO_FESTIVAL_EVENTS,
  DEMO_VENDORS,
  DEMO_MARKETPLACE_LISTINGS,
  DEMO_BUSINESS_OPPORTUNITIES,
  DEMO_MEDIA_POSTS,
  DEMO_SPONSORS,
  DEMO_PEACE_WALL_ENTRIES,
  DEMO_ORDERS,
  DEMO_PLATFORM_ANALYTICS,
  PeaceTableZone,
  PeaceTableDish,
} from "@/lib/demo-data";

export interface IDataProvider {
  // Membership & Members
  getMembershipTiers(): Promise<MembershipTier[]>;
  getMembers(): Promise<Member[]>;
  getMemberById(id: string): Promise<Member | null>;
  createMember(data: Partial<Member>): Promise<Member>;
  updateMember(id: string, data: Partial<Member>): Promise<Member>;

  // Kolanut Tree Leaves
  getTreeLeaves(query?: string, country?: string): Promise<TreeLeaf[]>;
  createTreeLeaf(data: Omit<TreeLeaf, "id" | "createdAt">): Promise<TreeLeaf>;

  // Meet & Eat
  getMeetEatListings(country?: string, cuisine?: string): Promise<MeetEatListing[]>;
  getMeetEatListingById(id: string): Promise<MeetEatListing | null>;
  getBookings(): Promise<Booking[]>;
  createBooking(data: Omit<Booking, "id" | "createdAt">): Promise<Booking>;
  updateBookingStatus(bookingId: string, status: Booking["status"]): Promise<Booking>;

  // Community Hubs
  getHubs(): Promise<Hub[]>;
  getHubPosts(hubSlug?: string): Promise<HubPost[]>;
  createHubPost(data: Omit<HubPost, "id" | "createdAt" | "likesCount" | "commentsCount">): Promise<HubPost>;
  likeHubPost(postId: string): Promise<number>;

  // 2km Peace Table
  getPeaceTableZones(): Promise<PeaceTableZone[]>;
  getPeaceTableDishes(category?: string, country?: string): Promise<PeaceTableDish[]>;
  getAccreditations(): Promise<AccreditationRequest[]>;
  submitAccreditation(data: Omit<AccreditationRequest, "id" | "createdAt" | "status">): Promise<AccreditationRequest>;
  updateAccreditationStatus(id: string, status: AccreditationRequest["status"]): Promise<AccreditationRequest>;

  // Festival 2026
  getFestivalEvents(): Promise<FestivalEvent[]>;
  getFestivalEventById(id: string): Promise<FestivalEvent | null>;

  // Marketplace & Orders
  getVendors(): Promise<Vendor[]>;
  getMarketplaceListings(category?: string, country?: string): Promise<MarketplaceListing[]>;
  getMarketplaceListingById(id: string): Promise<MarketplaceListing | null>;
  getOrders(buyerMemberId?: string): Promise<Order[]>;
  createOrder(data: Omit<Order, "id" | "createdAt">): Promise<Order>;

  // Business Network
  getBusinessOpportunities(category?: string, country?: string): Promise<BusinessOpportunity[]>;
  createBusinessOpportunity(data: Omit<BusinessOpportunity, "id" | "createdAt">): Promise<BusinessOpportunity>;

  // Media Center
  getMediaPosts(category?: string): Promise<MediaPost[]>;
  getMediaPostBySlug(slug: string): Promise<MediaPost | null>;

  // Sponsors & Partnerships
  getSponsors(): Promise<Sponsor[]>;

  // Peace Wall
  getPeaceWallEntries(): Promise<PeaceWallEntry[]>;
  createPeaceWallEntry(data: Omit<PeaceWallEntry, "id" | "createdAt" | "likesCount">): Promise<PeaceWallEntry>;
  likePeaceWallEntry(id: string): Promise<number>;

  // Countries
  getCountries(): Promise<CountryProfile[]>;
  getCountryByCode(code: string): Promise<CountryProfile | null>;

  // Analytics
  getAnalytics(): Promise<PlatformAnalytics>;
}

// In-Memory & LocalStorage Stateful Demo Provider
class DemoDataProvider implements IDataProvider {
  private members: Member[] = [...DEMO_MEMBERS];
  private treeLeaves: TreeLeaf[] = [...DEMO_TREE_LEAVES];
  private meetEatListings: MeetEatListing[] = [...DEMO_MEET_EAT_LISTINGS];
  private bookings: Booking[] = [];
  private hubPosts: HubPost[] = [...DEMO_HUB_POSTS];
  private accreditations: AccreditationRequest[] = [...DEMO_ACCREDITATIONS];
  private marketplaceListings: MarketplaceListing[] = [...DEMO_MARKETPLACE_LISTINGS];
  private orders: Order[] = [...DEMO_ORDERS];
  private businessOpportunities: BusinessOpportunity[] = [...DEMO_BUSINESS_OPPORTUNITIES];
  private peaceWallEntries: PeaceWallEntry[] = [...DEMO_PEACE_WALL_ENTRIES];

  async getMembershipTiers(): Promise<MembershipTier[]> {
    return DEMO_MEMBERSHIP_TIERS;
  }

  async getMembers(): Promise<Member[]> {
    return this.members;
  }

  async getMemberById(id: string): Promise<Member | null> {
    return this.members.find((m) => m.id === id) || null;
  }

  async createMember(data: Partial<Member>): Promise<Member> {
    const chairSeq = (this.members.length + 2549).toString().padStart(7, "0");
    const newMember: Member = {
      id: `mem-${Date.now()}`,
      name: data.name || "New Peace Ambassador",
      email: data.email || "member@accf-demo.africa",
      photoUrl: data.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      country: data.country || "Nigeria",
      city: data.city || "Abuja",
      tier: data.tier || "Standard",
      chairNo: `AKDT-${chairSeq}`,
      joinDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      pledgeText: data.pledgeText || "Breaking the Kolanut for the peace and solidarity of Africa.",
      isVerified: true,
      role: data.role || "member",
      bio: data.bio || "Proud member of the African Cultural Culinary Festival movement.",
      foodInterests: data.foodInterests || ["Heritage Soups", "Indigenous Grains"],
      culturalInterests: data.culturalInterests || ["Cultural Diplomacy", "African Gastronomy"],
    };
    this.members.unshift(newMember);

    // Auto-create leaf on Kolanut Tree
    this.treeLeaves.unshift({
      id: `leaf-${Date.now()}`,
      memberId: newMember.id,
      memberName: newMember.name,
      chairNo: newMember.chairNo,
      pledgeText: newMember.pledgeText,
      photoUrl: newMember.photoUrl,
      country: newMember.country,
      region: "West Africa",
      createdAt: new Date().toISOString().split("T")[0],
      leafType: newMember.tier === "Continental Ambassador" ? "gold" : newMember.tier === "Premium" ? "emerald" : "green",
    });

    // Auto-create Peace Wall Entry
    this.peaceWallEntries.unshift({
      id: `pw-${Date.now()}`,
      memberId: newMember.id,
      guestName: newMember.name,
      authorPhoto: newMember.photoUrl,
      country: newMember.country,
      message: newMember.pledgeText,
      isApproved: true,
      likesCount: 1,
      createdAt: new Date().toISOString().split("T")[0],
    });

    return newMember;
  }

  async updateMember(id: string, data: Partial<Member>): Promise<Member> {
    const idx = this.members.findIndex((m) => m.id === id);
    if (idx === -1) throw new Error("Member not found");
    this.members[idx] = { ...this.members[idx], ...data };
    return this.members[idx];
  }

  async getTreeLeaves(query?: string, country?: string): Promise<TreeLeaf[]> {
    let list = [...this.treeLeaves];
    if (country && country !== "All") {
      list = list.filter((l) => l.country.toLowerCase() === country.toLowerCase());
    }
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (l) =>
          l.memberName.toLowerCase().includes(q) ||
          l.pledgeText.toLowerCase().includes(q) ||
          l.chairNo.toLowerCase().includes(q) ||
          l.country.toLowerCase().includes(q)
      );
    }
    return list;
  }

  async createTreeLeaf(data: Omit<TreeLeaf, "id" | "createdAt">): Promise<TreeLeaf> {
    const leaf: TreeLeaf = {
      ...data,
      id: `leaf-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    };
    this.treeLeaves.unshift(leaf);
    return leaf;
  }

  async getMeetEatListings(country?: string, cuisine?: string): Promise<MeetEatListing[]> {
    let list = [...this.meetEatListings];
    if (country && country !== "All") {
      list = list.filter((l) => l.country.toLowerCase().includes(country.toLowerCase()));
    }
    if (cuisine && cuisine !== "All") {
      list = list.filter((l) => l.cuisine.toLowerCase().includes(cuisine.toLowerCase()));
    }
    return list;
  }

  async getMeetEatListingById(id: string): Promise<MeetEatListing | null> {
    return this.meetEatListings.find((l) => l.id === id) || null;
  }

  async getBookings(): Promise<Booking[]> {
    return this.bookings;
  }

  async createBooking(data: Omit<Booking, "id" | "createdAt">): Promise<Booking> {
    const booking: Booking = {
      ...data,
      id: `bk-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      status: "Confirmed", // Auto-confirm in demo mode
    };
    this.bookings.unshift(booking);
    return booking;
  }

  async updateBookingStatus(bookingId: string, status: Booking["status"]): Promise<Booking> {
    const b = this.bookings.find((item) => item.id === bookingId);
    if (!b) throw new Error("Booking not found");
    b.status = status;
    return b;
  }

  async getHubs(): Promise<Hub[]> {
    return DEMO_HUBS;
  }

  async getHubPosts(hubSlug?: string): Promise<HubPost[]> {
    if (!hubSlug || hubSlug === "all") return this.hubPosts;
    return this.hubPosts.filter((p) => p.hubSlug === hubSlug);
  }

  async createHubPost(data: Omit<HubPost, "id" | "createdAt" | "likesCount" | "commentsCount">): Promise<HubPost> {
    const post: HubPost = {
      ...data,
      id: `post-${Date.now()}`,
      likesCount: 0,
      commentsCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };
    this.hubPosts.unshift(post);
    return post;
  }

  async likeHubPost(postId: string): Promise<number> {
    const post = this.hubPosts.find((p) => p.id === postId);
    if (post) {
      post.likesCount += 1;
      return post.likesCount;
    }
    return 0;
  }

  async getPeaceTableZones(): Promise<PeaceTableZone[]> {
    return DEMO_PEACE_TABLE_ZONES;
  }

  async getPeaceTableDishes(category?: string, country?: string): Promise<PeaceTableDish[]> {
    let list = [...DEMO_PEACE_TABLE_DISHES];
    if (category && category !== "All") {
      list = list.filter((d) => d.category === category);
    }
    if (country && country !== "All") {
      list = list.filter((d) => d.country.toLowerCase() === country.toLowerCase());
    }
    return list;
  }

  async getAccreditations(): Promise<AccreditationRequest[]> {
    return this.accreditations;
  }

  async submitAccreditation(data: Omit<AccreditationRequest, "id" | "createdAt" | "status">): Promise<AccreditationRequest> {
    const req: AccreditationRequest = {
      ...data,
      id: `acc-${Date.now()}`,
      status: "Approved", // Instant approval badge in demo preview
      createdAt: new Date().toISOString().split("T")[0],
      tableSeatZone: "Zone 2 (Seat P-094)",
    };
    this.accreditations.unshift(req);
    return req;
  }

  async updateAccreditationStatus(id: string, status: AccreditationRequest["status"]): Promise<AccreditationRequest> {
    const acc = this.accreditations.find((a) => a.id === id);
    if (!acc) throw new Error("Accreditation request not found");
    acc.status = status;
    return acc;
  }

  async getFestivalEvents(): Promise<FestivalEvent[]> {
    return DEMO_FESTIVAL_EVENTS;
  }

  async getFestivalEventById(id: string): Promise<FestivalEvent | null> {
    return DEMO_FESTIVAL_EVENTS.find((e) => e.id === id) || null;
  }

  async getVendors(): Promise<Vendor[]> {
    return DEMO_VENDORS;
  }

  async getMarketplaceListings(category?: string, country?: string): Promise<MarketplaceListing[]> {
    let list = [...this.marketplaceListings];
    if (category && category !== "All") {
      list = list.filter((p) => p.category === category);
    }
    if (country && country !== "All") {
      list = list.filter((p) => p.vendorCountry.toLowerCase().includes(country.toLowerCase()));
    }
    return list;
  }

  async getMarketplaceListingById(id: string): Promise<MarketplaceListing | null> {
    return this.marketplaceListings.find((p) => p.id === id) || null;
  }

  async getOrders(buyerMemberId?: string): Promise<Order[]> {
    if (buyerMemberId) {
      return this.orders.filter((o) => o.buyerMemberId === buyerMemberId);
    }
    return this.orders;
  }

  async createOrder(data: Omit<Order, "id" | "createdAt">): Promise<Order> {
    const order: Order = {
      ...data,
      id: `ord-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().split("T")[0],
      trackingNumber: `ACCF-EXP-DEMO-${Math.floor(10000 + Math.random() * 90000)}`,
      status: "Processing",
    };
    this.orders.unshift(order);
    return order;
  }

  async getBusinessOpportunities(category?: string, country?: string): Promise<BusinessOpportunity[]> {
    let list = [...this.businessOpportunities];
    if (category && category !== "All") {
      list = list.filter((b) => b.category === category);
    }
    if (country && country !== "All") {
      list = list.filter((b) => b.country.toLowerCase().includes(country.toLowerCase()));
    }
    return list;
  }

  async createBusinessOpportunity(data: Omit<BusinessOpportunity, "id" | "createdAt">): Promise<BusinessOpportunity> {
    const opp: BusinessOpportunity = {
      ...data,
      id: `biz-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    };
    this.businessOpportunities.unshift(opp);
    return opp;
  }

  async getMediaPosts(category?: string): Promise<MediaPost[]> {
    if (!category || category === "All") return DEMO_MEDIA_POSTS;
    return DEMO_MEDIA_POSTS.filter((m) => m.category === category);
  }

  async getMediaPostBySlug(slug: string): Promise<MediaPost | null> {
    return DEMO_MEDIA_POSTS.find((m) => m.slug === slug) || null;
  }

  async getSponsors(): Promise<Sponsor[]> {
    return DEMO_SPONSORS;
  }

  async getPeaceWallEntries(): Promise<PeaceWallEntry[]> {
    return this.peaceWallEntries;
  }

  async createPeaceWallEntry(data: Omit<PeaceWallEntry, "id" | "createdAt" | "likesCount">): Promise<PeaceWallEntry> {
    const entry: PeaceWallEntry = {
      ...data,
      id: `pw-${Date.now()}`,
      likesCount: 1,
      createdAt: new Date().toISOString().split("T")[0],
      isApproved: true,
    };
    this.peaceWallEntries.unshift(entry);
    return entry;
  }

  async likePeaceWallEntry(id: string): Promise<number> {
    const entry = this.peaceWallEntries.find((e) => e.id === id);
    if (entry) {
      entry.likesCount += 1;
      return entry.likesCount;
    }
    return 0;
  }

  async getCountries(): Promise<CountryProfile[]> {
    return DEMO_COUNTRIES;
  }

  async getCountryByCode(code: string): Promise<CountryProfile | null> {
    return (
      DEMO_COUNTRIES.find((c) => c.code.toLowerCase() === code.toLowerCase() || c.name.toLowerCase() === code.toLowerCase()) ||
      null
    );
  }

  async getAnalytics(): Promise<PlatformAnalytics> {
    return {
      ...DEMO_PLATFORM_ANALYTICS,
      totalMembers: this.members.length + 348200,
      treeLeavesPlanted: this.treeLeaves.length + 348200,
      peaceSignatures: this.peaceWallEntries.length + 1248900,
      hubDiscussions: this.hubPosts.length + 18450,
      accreditedDelegates: this.accreditations.length + 4885,
      totalMarketplaceProducts: this.marketplaceListings.length,
    };
  }
}

// Single active instance
export const dataProvider: IDataProvider = new DemoDataProvider();

