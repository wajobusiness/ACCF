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
  AppNotification,
  AuditLog,
  Wallet,
  LedgerTransaction,
  BusinessLead,
  NetworkMember,
  ReferralStats,
  OnboardingProgress,
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
  initialNotifications,
  initialAuditLogs,
} from "@/lib/demo-data";

export interface IDataProvider {
  // Membership & Members
  getMembershipTiers(): Promise<MembershipTier[]>;
  getMembers(): Promise<Member[]>;
  getMemberById(id: string): Promise<Member | null>;
  getMemberByEmail(email: string): Promise<Member | null>;
  createMember(data: Partial<Member>): Promise<Member>;
  updateMember(id: string, data: Partial<Member>): Promise<Member>;

  // Wallet & Ledger System (Authoritative)
  getWallet(userId: string): Promise<Wallet>;
  getLedgerTransactions(userId: string): Promise<LedgerTransaction[]>;
  depositFunds(userId: string, amount: number, method: string, reference?: string): Promise<LedgerTransaction>;
  withdrawFunds(userId: string, amount: number, bankDetails: string): Promise<LedgerTransaction>;
  processMembershipPayment(userId: string, planId: string, method: string): Promise<{ transaction: LedgerTransaction; member: Member }>;

  // CRM & Business Leads (Authoritative User-Scoped)
  getLeads(userId: string): Promise<BusinessLead[]>;
  createLead(userId: string, data: Omit<BusinessLead, "id" | "userId" | "tenantId" | "createdAt">): Promise<BusinessLead>;
  updateLeadStatus(userId: string, leadId: string, status: BusinessLead["status"]): Promise<BusinessLead>;

  // Network & Referrals (Authoritative)
  getNetworkMembers(userId: string): Promise<NetworkMember[]>;
  getReferralStats(userId: string): Promise<ReferralStats>;

  // Onboarding System
  getOnboardingProgress(userId: string): Promise<OnboardingProgress>;
  updateOnboardingProgress(userId: string, updates: Partial<OnboardingProgress>): Promise<OnboardingProgress>;

  // Kolanut Tree Leaves
  getTreeLeaves(query?: string, country?: string): Promise<TreeLeaf[]>;
  createTreeLeaf(data: Omit<TreeLeaf, "id" | "createdAt">): Promise<TreeLeaf>;

  // Meet & Eat
  getMeetEatListings(country?: string, cuisine?: string): Promise<MeetEatListing[]>;
  getMeetEatListingById(id: string): Promise<MeetEatListing | null>;
  getBookings(userId?: string): Promise<Booking[]>;
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

  // Sponsors & Partners
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

  // Notifications & Audit Logs (User-Scoped)
  getNotifications(userId?: string): Promise<AppNotification[]>;
  createNotification(data: Omit<AppNotification, "id" | "timestamp" | "isRead">): Promise<AppNotification>;
  markNotificationRead(id: string): Promise<void>;
  getAuditLogs(): Promise<AuditLog[]>;
}

export class ProductionDataProvider implements IDataProvider {
  private members: Member[] = [...DEMO_MEMBERS];
  private treeLeaves: TreeLeaf[] = [...DEMO_TREE_LEAVES];
  private meetEatListings: MeetEatListing[] = [...DEMO_MEET_EAT_LISTINGS];
  private bookings: Booking[] = [];
  private hubs: Hub[] = [...DEMO_HUBS];
  private hubPosts: HubPost[] = [...DEMO_HUB_POSTS];
  private accreditations: AccreditationRequest[] = [...DEMO_ACCREDITATIONS];
  private marketplaceListings: MarketplaceListing[] = [...DEMO_MARKETPLACE_LISTINGS];
  private orders: Order[] = [...DEMO_ORDERS];
  private businessOpportunities: BusinessOpportunity[] = [...DEMO_BUSINESS_OPPORTUNITIES];
  private peaceWallEntries: PeaceWallEntry[] = [...DEMO_PEACE_WALL_ENTRIES];
  private notifications: AppNotification[] = [...initialNotifications];
  private auditLogs: AuditLog[] = [...initialAuditLogs];

  // Isolated Multi-Tenant Tables
  private wallets: Map<string, Wallet> = new Map();
  private transactions: Map<string, LedgerTransaction[]> = new Map();
  private leads: Map<string, BusinessLead[]> = new Map();
  private networkMembers: Map<string, NetworkMember[]> = new Map();
  private onboarding: Map<string, OnboardingProgress> = new Map();

  constructor() {
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Seed initial isolated records for demo personas with realistic, non-zero starting state
    const aminaWallet: Wallet = {
      id: "wal-mem-01",
      userId: "mem-01",
      tenantId: "ten-mem-01",
      currency: "NGN",
      balance: 150000,
      availableBalance: 150000,
      totalEarnings: 85000,
      totalDeposits: 200000,
      totalWithdrawals: 50000,
      updatedAt: new Date().toISOString(),
    };
    this.wallets.set("mem-01", aminaWallet);
    this.transactions.set("mem-01", [
      {
        id: "tx-1001",
        userId: "mem-01",
        tenantId: "ten-mem-01",
        type: "deposit",
        amount: 200000,
        fee: 0,
        currency: "NGN",
        balanceAfter: 200000,
        status: "completed",
        reference: "DEP-2026-0801",
        description: "Direct Paystack NGN Deposit",
        paymentMethod: "Paystack",
        createdAt: "2026-08-01 10:30",
      },
      {
        id: "tx-1002",
        userId: "mem-01",
        tenantId: "ten-mem-01",
        type: "membership_fee",
        amount: 50000,
        fee: 0,
        currency: "NGN",
        balanceAfter: 150000,
        status: "completed",
        reference: "MEM-2026-001",
        description: "Annual Standard Membership Activation (Chair AKDT-0002611)",
        paymentMethod: "Wallet Balance",
        createdAt: "2026-08-01 10:35",
      },
    ]);
    this.leads.set("mem-01", [
      {
        id: "lead-01",
        userId: "mem-01",
        tenantId: "ten-mem-01",
        name: "Ibrahim Touré",
        company: "Sahelian Harvest Ltd",
        email: "ibrahim@sahelharvest.sn",
        phone: "+221 77 123 4567",
        country: "Senegal",
        status: "qualified",
        value: 450000,
        source: "ACCF Community Hub",
        notes: "Interested in fonio packaging and cross-border distribution.",
        createdAt: "2026-08-15",
      },
      {
        id: "lead-02",
        userId: "mem-01",
        tenantId: "ten-mem-01",
        name: "Abena Mansah",
        company: "Accra Spices Co",
        email: "abena@accraspicery.gh",
        phone: "+233 24 987 6543",
        country: "Ghana",
        status: "contacted",
        value: 280000,
        source: "Marketplace Inquiry",
        notes: "Inquired about bulk organic shito peppers.",
        createdAt: "2026-08-20",
      },
    ]);
    this.networkMembers.set("mem-01", [
      {
        id: "net-01",
        sponsorId: "mem-01",
        userId: "mem-02",
        name: "Kwame Mensah",
        country: "Ghana",
        tier: "Premium",
        status: "active",
        joinedAt: "2026-08-05",
        commissionEarned: 25000,
      },
      {
        id: "net-02",
        sponsorId: "mem-01",
        userId: "mem-04",
        name: "Chef Binta Diallo",
        country: "Senegal",
        tier: "Standard",
        status: "active",
        joinedAt: "2026-08-12",
        commissionEarned: 10000,
      },
    ]);
    this.onboarding.set("mem-01", {
      userId: "mem-01",
      accountCreated: true,
      membershipActivated: true,
      watchedTour: true,
      profileCompleted: true,
      businessSetup: true,
      firstActionCompleted: true,
      isCompleted: true,
    });
  }

  // --- MEMBERSHIP & MEMBERS ---
  async getMembershipTiers(): Promise<MembershipTier[]> {
    return [...DEMO_MEMBERSHIP_TIERS];
  }

  async getMembers(): Promise<Member[]> {
    return [...this.members];
  }

  async getMemberById(id: string): Promise<Member | null> {
    const m = this.members.find((item) => item.id === id);
    return m ? { ...m } : null;
  }

  async getMemberByEmail(email: string): Promise<Member | null> {
    const m = this.members.find((item) => item.email.toLowerCase() === email.toLowerCase());
    return m ? { ...m } : null;
  }

  async createMember(data: Partial<Member>): Promise<Member> {
    const chairSeq = Math.floor(1000 + Math.random() * 9000);
    const newMember: Member = {
      id: data.id || `mem-${Date.now()}`,
      name: data.name || "Anonymous Member",
      email: data.email || `member${Date.now()}@accf.africa`,
      password: data.password,
      photoUrl:
        data.photoUrl ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      country: data.country || "Nigeria",
      city: data.city || "Abuja",
      tier: data.tier || "Standard",
      chairNo: data.chairNo || `AKDT-000${chairSeq}`,
      joinDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      pledgeText: data.pledgeText || "Breaking the Kolanut for the Peace of Africa.",
      isVerified: true,
      status: data.status || "active",
      role: data.role || "member",
      phone: data.phone,
      sponsorId: data.sponsorId,
      tenantId: `ten-${data.id || Date.now()}`,
      walletId: `wal-${data.id || Date.now()}`,
      onboardingCompleted: false,
    };
    this.members.unshift(newMember);

    // Initialize user's private isolated wallet
    this.wallets.set(newMember.id, {
      id: newMember.walletId!,
      userId: newMember.id,
      tenantId: newMember.tenantId!,
      currency: "NGN",
      balance: 0,
      availableBalance: 0,
      totalEarnings: 0,
      totalDeposits: 0,
      totalWithdrawals: 0,
      updatedAt: new Date().toISOString(),
    });
    this.transactions.set(newMember.id, []);
    this.leads.set(newMember.id, []);
    this.networkMembers.set(newMember.id, []);
    this.onboarding.set(newMember.id, {
      userId: newMember.id,
      accountCreated: true,
      membershipActivated: false,
      watchedTour: false,
      profileCompleted: false,
      businessSetup: false,
      firstActionCompleted: false,
      isCompleted: false,
    });

    // Send welcome notification
    this.createNotification({
      recipientMemberId: newMember.id,
      userId: newMember.id,
      title: "Welcome to ACCF Continental Movement!",
      message: `Your account has been created. Select a membership plan to claim your Digital Chair.`,
      type: "system",
      linkUrl: "/membership/checkout",
    });

    return { ...newMember };
  }

  async updateMember(id: string, data: Partial<Member>): Promise<Member> {
    const idx = this.members.findIndex((m) => m.id === id);
    if (idx === -1) throw new Error(`Member ${id} not found`);
    this.members[idx] = { ...this.members[idx], ...data };
    return { ...this.members[idx] };
  }

  // --- WALLET & LEDGER SYSTEM (AUTHORITATIVE) ---
  async getWallet(userId: string): Promise<Wallet> {
    let wallet = this.wallets.get(userId);
    if (!wallet) {
      wallet = {
        id: `wal-${userId}`,
        userId,
        tenantId: `ten-${userId}`,
        currency: "NGN",
        balance: 0,
        availableBalance: 0,
        totalEarnings: 0,
        totalDeposits: 0,
        totalWithdrawals: 0,
        updatedAt: new Date().toISOString(),
      };
      this.wallets.set(userId, wallet);
    }
    return { ...wallet };
  }

  async getLedgerTransactions(userId: string): Promise<LedgerTransaction[]> {
    const list = this.transactions.get(userId);
    return list ? [...list] : [];
  }

  async depositFunds(userId: string, amount: number, method: string, reference?: string): Promise<LedgerTransaction> {
    if (amount <= 0) throw new Error("Deposit amount must be greater than zero");
    const wallet = await this.getWallet(userId);
    const newBalance = wallet.balance + amount;

    wallet.balance = newBalance;
    wallet.availableBalance = newBalance;
    wallet.totalDeposits += amount;
    wallet.updatedAt = new Date().toISOString();
    this.wallets.set(userId, wallet);

    const ref = reference || `DEP-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const tx: LedgerTransaction = {
      id: `tx-${Date.now()}`,
      userId,
      tenantId: wallet.tenantId,
      type: "deposit",
      amount,
      fee: 0,
      currency: "NGN",
      balanceAfter: newBalance,
      status: "completed",
      reference: ref,
      description: `Wallet Deposit via ${method}`,
      paymentMethod: method,
      createdAt: new Date().toLocaleString(),
    };

    const txList = this.transactions.get(userId) || [];
    txList.unshift(tx);
    this.transactions.set(userId, txList);

    await this.createNotification({
      recipientMemberId: userId,
      userId,
      title: "Deposit Successful",
      message: `Your deposit of ₦${amount.toLocaleString()} has been credited to your wallet. Ref: ${ref}`,
      type: "financial",
      linkUrl: "/dashboard",
    });

    return tx;
  }

  async withdrawFunds(userId: string, amount: number, bankDetails: string): Promise<LedgerTransaction> {
    if (amount <= 0) throw new Error("Withdrawal amount must be greater than zero");
    const wallet = await this.getWallet(userId);
    if (wallet.availableBalance < amount) {
      throw new Error(`Insufficient balance. Available: ₦${wallet.availableBalance.toLocaleString()}`);
    }

    const newBalance = wallet.balance - amount;
    wallet.balance = newBalance;
    wallet.availableBalance = newBalance;
    wallet.totalWithdrawals += amount;
    wallet.updatedAt = new Date().toISOString();
    this.wallets.set(userId, wallet);

    const ref = `WTH-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const tx: LedgerTransaction = {
      id: `tx-${Date.now()}`,
      userId,
      tenantId: wallet.tenantId,
      type: "withdrawal",
      amount,
      fee: 0,
      currency: "NGN",
      balanceAfter: newBalance,
      status: "completed",
      reference: ref,
      description: `Payout to Bank (${bankDetails})`,
      paymentMethod: "Bank Transfer",
      createdAt: new Date().toLocaleString(),
    };

    const txList = this.transactions.get(userId) || [];
    txList.unshift(tx);
    this.transactions.set(userId, txList);

    await this.createNotification({
      recipientMemberId: userId,
      userId,
      title: "Withdrawal Processed",
      message: `Payout of ₦${amount.toLocaleString()} sent to ${bankDetails}. Ref: ${ref}`,
      type: "financial",
      linkUrl: "/dashboard",
    });

    return tx;
  }

  async processMembershipPayment(userId: string, planId: string, method: string): Promise<{ transaction: LedgerTransaction; member: Member }> {
    const tier = DEMO_MEMBERSHIP_TIERS.find((t) => t.id === planId) || DEMO_MEMBERSHIP_TIERS[0];
    const member = await this.getMemberById(userId);
    if (!member) throw new Error(`Member ${userId} not found`);

    const wallet = await this.getWallet(userId);
    const ref = `MEM-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const tx: LedgerTransaction = {
      id: `tx-${Date.now()}`,
      userId,
      tenantId: wallet.tenantId,
      type: "membership_fee",
      amount: tier.priceNGN,
      fee: 0,
      currency: "NGN",
      balanceAfter: wallet.balance,
      status: "completed",
      reference: ref,
      description: `${tier.name} Membership Activation Fee`,
      paymentMethod: method,
      createdAt: new Date().toLocaleString(),
    };

    const txList = this.transactions.get(userId) || [];
    txList.unshift(tx);
    this.transactions.set(userId, txList);

    // Update member to active
    const updatedMember = await this.updateMember(userId, {
      tier: tier.name,
      status: "active",
      isVerified: true,
    });

    // Update onboarding
    await this.updateOnboardingProgress(userId, {
      membershipActivated: true,
    });

    await this.createNotification({
      recipientMemberId: userId,
      userId,
      title: "Membership Activated!",
      message: `Your ${tier.name} seat is officially active. Chair ID: ${updatedMember.chairNo}`,
      type: "system",
      linkUrl: "/dashboard",
    });

    return { transaction: tx, member: updatedMember };
  }

  // --- CRM & BUSINESS LEADS ---
  async getLeads(userId: string): Promise<BusinessLead[]> {
    const list = this.leads.get(userId);
    return list ? [...list] : [];
  }

  async createLead(userId: string, data: Omit<BusinessLead, "id" | "userId" | "tenantId" | "createdAt">): Promise<BusinessLead> {
    const wallet = await this.getWallet(userId);
    const newLead: BusinessLead = {
      id: `lead-${Date.now()}`,
      userId,
      tenantId: wallet.tenantId,
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      country: data.country,
      status: data.status || "new",
      value: data.value || 0,
      source: data.source || "Manual Entry",
      notes: data.notes,
      createdAt: new Date().toISOString().split("T")[0],
    };

    const list = this.leads.get(userId) || [];
    list.unshift(newLead);
    this.leads.set(userId, list);

    await this.createNotification({
      recipientMemberId: userId,
      userId,
      title: "New Lead Created",
      message: `Lead for ${newLead.name} (${newLead.company}) added to your pipeline.`,
      type: "lead",
      linkUrl: "/dashboard",
    });

    return newLead;
  }

  async updateLeadStatus(userId: string, leadId: string, status: BusinessLead["status"]): Promise<BusinessLead> {
    const list = this.leads.get(userId) || [];
    const idx = list.findIndex((l) => l.id === leadId);
    if (idx === -1) throw new Error("Lead not found");
    list[idx] = { ...list[idx], status };
    this.leads.set(userId, list);
    return list[idx];
  }

  // --- NETWORK & REFERRALS ---
  async getNetworkMembers(userId: string): Promise<NetworkMember[]> {
    const list = this.networkMembers.get(userId);
    return list ? [...list] : [];
  }

  async getReferralStats(userId: string): Promise<ReferralStats> {
    const members = await this.getNetworkMembers(userId);
    const totalEarnings = members.reduce((acc, m) => acc + m.commissionEarned, 0);
    const activeCount = members.filter((m) => m.status === "active").length;
    return {
      userId,
      referralCode: `ACCF-${userId.toUpperCase()}`,
      totalInvited: members.length,
      activeMembers: activeCount,
      totalCommissionNGN: totalEarnings,
    };
  }

  // --- ONBOARDING ---
  async getOnboardingProgress(userId: string): Promise<OnboardingProgress> {
    let prog = this.onboarding.get(userId);
    if (!prog) {
      prog = {
        userId,
        accountCreated: true,
        membershipActivated: false,
        watchedTour: false,
        profileCompleted: false,
        businessSetup: false,
        firstActionCompleted: false,
        isCompleted: false,
      };
      this.onboarding.set(userId, prog);
    }
    return { ...prog };
  }

  async updateOnboardingProgress(userId: string, updates: Partial<OnboardingProgress>): Promise<OnboardingProgress> {
    const current = await this.getOnboardingProgress(userId);
    const updated = { ...current, ...updates };
    // Check if fully completed
    if (
      updated.accountCreated &&
      updated.membershipActivated &&
      updated.profileCompleted &&
      updated.watchedTour
    ) {
      updated.isCompleted = true;
    }
    this.onboarding.set(userId, updated);
    return updated;
  }

  // --- KOLANUT TREE LEAVES ---
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
          l.chairNo.toLowerCase().includes(q)
      );
    }
    return list;
  }

  async createTreeLeaf(data: Omit<TreeLeaf, "id" | "createdAt">): Promise<TreeLeaf> {
    const newLeaf: TreeLeaf = {
      ...data,
      id: `leaf-${Date.now()}`,
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    this.treeLeaves.unshift(newLeaf);

    await this.createNotification({
      recipientMemberId: data.memberId,
      userId: data.memberId,
      title: "Leaf Planted on Tree of Peace",
      message: `Your leaf representing ${data.country} is now shining on the African Kolanut Tree.`,
      type: "tree",
      linkUrl: "/kolanut-tree",
    });

    return newLeaf;
  }

  // --- MEET & EAT ---
  async getMeetEatListings(country?: string, cuisine?: string): Promise<MeetEatListing[]> {
    let list = [...this.meetEatListings];
    if (country && country !== "All") {
      list = list.filter((l) => l.country.toLowerCase() === country.toLowerCase());
    }
    if (cuisine && cuisine !== "All") {
      list = list.filter((l) => l.cuisine.toLowerCase() === cuisine.toLowerCase());
    }
    return list;
  }

  async getMeetEatListingById(id: string): Promise<MeetEatListing | null> {
    const found = this.meetEatListings.find((l) => l.id === id);
    return found ? { ...found } : null;
  }

  async getBookings(userId?: string): Promise<Booking[]> {
    if (!userId) return [...this.bookings];
    return this.bookings.filter(
      (b) => b.requesterMemberId === userId || b.hostMemberId === userId
    );
  }

  async createBooking(data: Omit<Booking, "id" | "createdAt">): Promise<Booking> {
    const newBooking: Booking = {
      ...data,
      id: `bk-${Date.now()}`,
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    this.bookings.unshift(newBooking);

    await this.createNotification({
      recipientMemberId: data.hostMemberId,
      userId: data.hostMemberId,
      title: "New Dining Reservation Request",
      message: `${data.requesterName} requested a table for ${data.partySize} guests (${data.listingTitle}).`,
      type: "booking",
      linkUrl: "/dashboard",
    });

    return newBooking;
  }

  async updateBookingStatus(bookingId: string, status: Booking["status"]): Promise<Booking> {
    const idx = this.bookings.findIndex((b) => b.id === bookingId);
    if (idx === -1) throw new Error("Booking not found");
    this.bookings[idx] = { ...this.bookings[idx], status };
    return this.bookings[idx];
  }

  // --- COMMUNITY HUBS ---
  async getHubs(): Promise<Hub[]> {
    return [...this.hubs];
  }

  async getHubPosts(hubSlug?: string): Promise<HubPost[]> {
    if (!hubSlug || hubSlug === "all") return [...this.hubPosts];
    return this.hubPosts.filter((p) => p.hubSlug === hubSlug);
  }

  async createHubPost(data: Omit<HubPost, "id" | "createdAt" | "likesCount" | "commentsCount">): Promise<HubPost> {
    const newPost: HubPost = {
      ...data,
      id: `post-${Date.now()}`,
      likesCount: 0,
      commentsCount: 0,
      createdAt: "Just now",
    };
    this.hubPosts.unshift(newPost);
    return newPost;
  }

  async likeHubPost(postId: string): Promise<number> {
    const post = this.hubPosts.find((p) => p.id === postId);
    if (post) {
      post.likesCount += 1;
      return post.likesCount;
    }
    return 0;
  }

  // --- 2KM PEACE TABLE ---
  async getPeaceTableZones(): Promise<PeaceTableZone[]> {
    return [...DEMO_PEACE_TABLE_ZONES];
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
    return [...this.accreditations];
  }

  async submitAccreditation(data: Omit<AccreditationRequest, "id" | "createdAt" | "status">): Promise<AccreditationRequest> {
    const newAcc: AccreditationRequest = {
      ...data,
      id: `acc-${Date.now()}`,
      status: "Pending",
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    this.accreditations.unshift(newAcc);
    return newAcc;
  }

  async updateAccreditationStatus(id: string, status: AccreditationRequest["status"]): Promise<AccreditationRequest> {
    const idx = this.accreditations.findIndex((a) => a.id === id);
    if (idx === -1) throw new Error("Accreditation not found");
    this.accreditations[idx] = { ...this.accreditations[idx], status };
    return this.accreditations[idx];
  }

  // --- FESTIVAL 2026 ---
  async getFestivalEvents(): Promise<FestivalEvent[]> {
    return [...DEMO_FESTIVAL_EVENTS];
  }

  async getFestivalEventById(id: string): Promise<FestivalEvent | null> {
    const found = DEMO_FESTIVAL_EVENTS.find((e) => e.id === id);
    return found ? { ...found } : null;
  }

  // --- MARKETPLACE & ORDERS ---
  async getVendors(): Promise<Vendor[]> {
    return [...DEMO_VENDORS];
  }

  async getMarketplaceListings(category?: string, country?: string): Promise<MarketplaceListing[]> {
    let list = [...this.marketplaceListings];
    if (category && category !== "All") {
      list = list.filter((p) => p.category === category);
    }
    if (country && country !== "All") {
      list = list.filter((p) => (p.originCountry || p.vendorCountry || "").toLowerCase() === country.toLowerCase());
    }
    return list;
  }

  async getMarketplaceListingById(id: string): Promise<MarketplaceListing | null> {
    const found = this.marketplaceListings.find((p) => p.id === id);
    return found ? { ...found } : null;
  }

  async getOrders(buyerMemberId?: string): Promise<Order[]> {
    if (!buyerMemberId) return [...this.orders];
    return this.orders.filter((o) => o.buyerMemberId === buyerMemberId);
  }

  async createOrder(data: Omit<Order, "id" | "createdAt">): Promise<Order> {
    const newOrder: Order = {
      ...data,
      id: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    this.orders.unshift(newOrder);

    await this.createNotification({
      recipientMemberId: data.buyerMemberId,
      userId: data.buyerMemberId,
      title: "Order Placed Successfully",
      message: `Your order #${newOrder.id} (${data.items.length} items) has been received for shipping.`,
      type: "order",
      linkUrl: "/dashboard",
    });

    return newOrder;
  }

  // --- BUSINESS NETWORK ---
  async getBusinessOpportunities(category?: string, country?: string): Promise<BusinessOpportunity[]> {
    let list = [...this.businessOpportunities];
    if (category && category !== "All") {
      list = list.filter((b) => b.category === category);
    }
    if (country && country !== "All") {
      list = list.filter((b) => b.country.toLowerCase() === country.toLowerCase());
    }
    return list;
  }

  async createBusinessOpportunity(data: Omit<BusinessOpportunity, "id" | "createdAt">): Promise<BusinessOpportunity> {
    const newOpp: BusinessOpportunity = {
      ...data,
      id: `biz-${Date.now()}`,
      createdAt: "Just now",
    };
    this.businessOpportunities.unshift(newOpp);
    return newOpp;
  }

  // --- MEDIA CENTER ---
  async getMediaPosts(category?: string): Promise<MediaPost[]> {
    if (!category || category === "All") return [...DEMO_MEDIA_POSTS];
    return DEMO_MEDIA_POSTS.filter((m) => m.category === category);
  }

  async getMediaPostBySlug(slug: string): Promise<MediaPost | null> {
    const found = DEMO_MEDIA_POSTS.find((m) => m.slug === slug);
    return found ? { ...found } : null;
  }

  // --- SPONSORS ---
  async getSponsors(): Promise<Sponsor[]> {
    return [...DEMO_SPONSORS];
  }

  // --- PEACE WALL ---
  async getPeaceWallEntries(): Promise<PeaceWallEntry[]> {
    return [...this.peaceWallEntries];
  }

  async createPeaceWallEntry(data: Omit<PeaceWallEntry, "id" | "createdAt" | "likesCount">): Promise<PeaceWallEntry> {
    const newEntry: PeaceWallEntry = {
      ...data,
      id: `wall-${Date.now()}`,
      likesCount: 0,
      createdAt: "Just now",
    };
    this.peaceWallEntries.unshift(newEntry);
    return newEntry;
  }

  async likePeaceWallEntry(id: string): Promise<number> {
    const entry = this.peaceWallEntries.find((e) => e.id === id);
    if (entry) {
      entry.likesCount += 1;
      return entry.likesCount;
    }
    return 0;
  }

  // --- COUNTRIES ---
  async getCountries(): Promise<CountryProfile[]> {
    return [...DEMO_COUNTRIES];
  }

  async getCountryByCode(code: string): Promise<CountryProfile | null> {
    const found = DEMO_COUNTRIES.find(
      (c) => c.code.toLowerCase() === code.toLowerCase() || c.name.toLowerCase() === code.toLowerCase()
    );
    return found ? { ...found } : null;
  }

  // --- ANALYTICS ---
  async getAnalytics(): Promise<PlatformAnalytics> {
    return { ...DEMO_PLATFORM_ANALYTICS };
  }

  // --- NOTIFICATIONS & AUDIT ---
  async getNotifications(userId?: string): Promise<AppNotification[]> {
    if (!userId) return [...this.notifications];
    return this.notifications.filter(
      (n) => n.userId === userId || n.recipientMemberId === userId || n.recipientMemberId === "all"
    );
  }

  async createNotification(data: Omit<AppNotification, "id" | "timestamp" | "isRead">): Promise<AppNotification> {
    const notif: AppNotification = {
      ...data,
      id: `notif-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: "Just now",
      isRead: false,
    };
    this.notifications.unshift(notif);
    return notif;
  }

  async markNotificationRead(id: string): Promise<void> {
    const n = this.notifications.find((item) => item.id === id);
    if (n) {
      n.isRead = true;
    }
  }

  async getAuditLogs(): Promise<AuditLog[]> {
    return [...this.auditLogs];
  }
}

export const dataProvider: IDataProvider = new ProductionDataProvider();
