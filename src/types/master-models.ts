// Master Data Models strictly aligned with 15-data-models-master.docx
// Expanded for full interactive demonstration and production-ready contracts

export type MembershipTierType = "Standard" | "Premium" | "Continental Ambassador";

export interface Member {
  id: string;
  name: string;
  email: string;
  password?: string;
  photoUrl: string;
  country: string;
  city?: string;
  tier: MembershipTierType;
  chairNo: string; // Format: AKDT-000XXXX
  joinDate: string;
  pledgeText: string;
  isVerified: boolean;
  status?: "active" | "pending_activation" | "suspended" | string;
  role: "member" | "ambassador" | "host" | "vendor" | "business" | "moderator" | "admin";
  bio?: string;
  foodInterests?: string[];
  culturalInterests?: string[];
  languages?: string[];
  isHost?: boolean;
  isVendor?: boolean;
  phone?: string;
  sponsorId?: string;
  tenantId?: string;
  walletId?: string;
  onboardingCompleted?: boolean;
}

export interface MembershipTier {
  id: string;
  name: MembershipTierType;
  priceNGN: number;
  priceFormatted: string;
  period: string;
  badgeLabel: string;
  benefits: string[];
  isPopular?: boolean;
  colorScheme: string;
}

export interface Wallet {
  id: string;
  userId: string;
  tenantId: string;
  currency: string; // "NGN"
  balance: number;
  availableBalance: number;
  totalEarnings: number;
  totalDeposits: number;
  totalWithdrawals: number;
  updatedAt: string;
}

export interface LedgerTransaction {
  id: string;
  userId: string;
  tenantId: string;
  type: "deposit" | "withdrawal" | "membership_fee" | "earning" | "commission" | "order_payment" | "marketplace_payout";
  amount: number;
  fee: number;
  currency: string;
  balanceAfter: number;
  status: "completed" | "pending" | "failed";
  reference: string;
  description: string;
  paymentMethod?: string;
  createdAt: string;
}

export interface BusinessLead {
  id: string;
  userId: string;
  tenantId: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  status: "new" | "contacted" | "qualified" | "proposal" | "won" | "lost";
  value: number;
  source: string;
  notes?: string;
  createdAt: string;
}

export interface NetworkMember {
  id: string;
  sponsorId: string;
  userId: string;
  name: string;
  country: string;
  tier: MembershipTierType;
  status: "active" | "inactive";
  joinedAt: string;
  commissionEarned: number;
}

export interface ReferralStats {
  userId: string;
  referralCode: string;
  totalInvited: number;
  activeMembers: number;
  totalCommissionNGN: number;
}

export interface OnboardingProgress {
  userId: string;
  accountCreated: boolean;
  membershipActivated: boolean;
  watchedTour: boolean;
  profileCompleted: boolean;
  businessSetup: boolean;
  firstActionCompleted: boolean;
  isCompleted: boolean;
}

export interface TreeLeaf {
  id: string;
  memberId: string;
  memberName: string;
  chairNo: string;
  pledgeText: string;
  photoUrl: string;
  country: string;
  region: "West Africa" | "East Africa" | "North Africa" | "Southern Africa" | "Central Africa" | "Diaspora";
  createdAt: string;
  leafType?: "gold" | "green" | "emerald";
}

export interface MeetEatListing {
  id: string;
  hostMemberId: string;
  hostName: string;
  hostPhoto: string;
  country: string;
  city: string;
  cuisine: string;
  title: string;
  description: string;
  dietaryOptions: string[];
  maxGuests: number;
  seatsAvailable: number;
  priceNGN: number;
  date: string;
  timeSlot: string;
  images: string[];
  menuHighlights: string[];
  rating: number;
  reviewsCount: number;
  languagesSpoken: string[];
}

export interface Booking {
  id: string;
  listingId: string;
  listingTitle: string;
  hostMemberId: string;
  hostName: string;
  requesterMemberId: string;
  requesterName: string;
  requesterPhoto?: string;
  status: "Pending" | "Confirmed" | "Declined" | "Completed";
  partySize: number;
  date: string;
  dietaryNotes?: string;
  createdAt: string;
  totalAmountNGN: number;
  messages?: { senderId: string; senderName: string; text: string; sentAt: string }[];
}

export interface Hub {
  id: string;
  category: string;
  slug: string;
  name?: string;
  title?: string;
  description: string;
  iconName: string;
  color: string;
  totalPosts?: number;
  activeMembersCount?: number;
  membersCount?: number;
  postsCount?: number;
}

export interface HubPost {
  id: string;
  hubId?: string;
  hubSlug: string;
  hubCategory?: string;
  authorMemberId: string;
  authorName: string;
  authorPhoto: string;
  authorCountry: string;
  authorRole: string;
  title: string;
  content?: string;
  body?: string;
  tags?: string[];
  imageUrl?: string;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  isPinned?: boolean;
}

export interface AccreditationRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  category:
    | "Traditional Royalty & Monarchy"
    | "African Union & Diplomatic Corps"
    | "Ministerial & Government Delegation"
    | "Diaspora Cultural Leader"
    | "Global Partner / Sponsor Executive"
    | "Agribusiness & Trade Leader"
    | "Youth & Cultural Ambassador"
    | "Diplomatic Community"
    | string;
  organization: string;
  country: string;
  title?: string;
  guestCount?: number;
  dietaryNotes?: string;
  tableSeatZone?: string;
  passportOrIdNumber?: string;
  dietaryRequirements?: string;
  status: "Pending" | "Approved" | "Declined";
  createdAt: string;
}

export interface FestivalEvent {
  id: string;
  name: string;
  subEventType:
    | "cuisine-expo"
    | "chefs-championship"
    | "food-security-summit"
    | "cultural-village"
    | "marketplace"
    | "masterclasses"
    | "indigenous-showcase"
    | "peace-banquet"
    | "youth-innovation"
    | "food-art-expo"
    | string;
  description: string;
  date: string;
  time: string;
  venueLocation: string;
  hallName: string;
  capacity: number;
  registeredCount: number;
  speakers: { name: string; role: string; country: string; photoUrl: string }[];
  chefs: { name: string; specialty: string; country: string; photoUrl: string }[];
  coverImage: string;
  isFeatured: boolean;
}

export interface BusinessOpportunity {
  id: string;
  title: string;
  category:
    | "Agribusiness & Processing"
    | "Culinary Tourism"
    | "Export & Logistics"
    | "Packaging & Food Tech"
    | "Hospitality Franchise"
    | "Trade Partnerships"
    | "Agribusiness Investments"
    | "Food Export Networks"
    | "Food Technology";
  country: string;
  investmentSizeUSD?: string;
  description: string;
  posterName: string;
  posterCompany: string;
  posterCountry?: string;
  postedByMemberId: string;
  contactEmail?: string;
  contactInfo?: string;
  investmentRange?: string;
  roiTimeline?: string;
  status?: string;
  createdAt: string;
}

export interface Vendor {
  id: string;
  businessName: string;
  contactName?: string;
  country: string;
  city?: string;
  category:
    | "Spices & Seasonings"
    | "Ancient Grains & Flours"
    | "Craft Cookware & Terracotta"
    | "Indigenous Beverages"
    | "Organic Oils & Butters"
    | "Artisanal Foods"
    | "Traditional Ingredients & Spices"
    | string;
  logoUrl: string;
  coverImage?: string;
  description: string;
  rating: number;
  productsCount?: number;
  totalProducts?: number;
  isVerified?: boolean;
  isApproved?: boolean;
  memberId?: string;
}

export interface MarketplaceListing {
  id: string;
  vendorId: string;
  vendorName: string;
  vendorCountry?: string;
  title: string;
  category: string;
  description: string;
  priceNGN: number;
  price?: number;
  currency?: string;
  weightGrams?: number;
  stockQuantity?: number;
  stock?: number;
  images: string[];
  originCountry?: string;
  originRegion?: string;
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
}

export interface OrderItem {
  listingId: string;
  title: string;
  price: number;
  quantity: number;
  vendorName?: string;
  image?: string;
}

export interface Order {
  id: string;
  buyerMemberId: string;
  buyerName: string;
  buyerEmail: string;
  shippingAddress: string;
  shippingCountry?: string;
  items: OrderItem[];
  totalAmountNGN: number;
  status: "Processing" | "Packed" | "Shipped" | "Delivered" | "Cancelled" | "Completed" | string;
  trackingNumber?: string;
  createdAt: string;
  paymentMethod?: string;
}

export interface MediaPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  summary?: string;
  content?: string;
  body?: string;
  category:
    | "Press Release"
    | "Editorial Dispatch"
    | "Heritage Feature"
    | "Photo Gallery"
    | "Video Dispatch"
    | "Festival Updates"
    | "Culinary Diplomacy"
    | "Trade & Economy"
    | string;
  author: string;
  publishedAt: string;
  publishedDate?: string;
  coverImage?: string;
  imageUrl?: string;
  mediaUrl?: string;
  mediaType?: string;
  videoDuration?: string;
  readTimeMinutes?: number;
  readTime?: string;
  tags?: string[];
}

export interface Sponsor {
  id: string;
  name?: string;
  companyName?: string;
  tier: string;
  priceNGN?: number;
  priceFormatted?: string;
  logoUrl: string;
  country: string;
  description: string;
  websiteUrl?: string;
  contactEmail?: string;
  benefits?: string[];
}

export interface PeaceWallEntry {
  id: string;
  memberId?: string;
  guestName?: string;
  country: string;
  city?: string;
  message: string;
  authorPhoto?: string;
  isApproved?: boolean;
  likesCount: number;
  createdAt: string;
}

export interface CountryProfile {
  code: string; // ISO 2 or 3 letter e.g. "NG", "GH", "KE"
  name: string;
  region: "West Africa" | "East Africa" | "North Africa" | "Southern Africa" | "Central Africa";
  flagEmoji: string;
  capital: string;
  signatureDish: string;
  dishDescription: string;
  foodHeritageBrief: string;
  traditionalIngredients: string[];
  membersCount: number;
  hostsCount: number;
  productsCount: number;
  peaceSignatures: number;
  coverImage: string;
}

export interface PlatformAnalytics {
  totalMembers: number;
  peaceSignatures: number;
  participatingCountries: number;
  traditionalCuisines: number;
  expectedPhysicalGuests: number;
  activeMeetEatHosts: number;
  totalMarketplaceProducts: number;
  totalSimulatedVolumeNGN: number;
  accreditedDelegates: number;
  hubDiscussions: number;
  treeLeavesPlanted: number;
}

export interface PeaceTableZone {
  id: string;
  name: string;
  lengthMeters: number;
  capacity: number;
  description: string;
  assignedDishesRegion: string;
  color: string;
}

export interface PeaceTableDish {
  id: string;
  name: string;
  country: string;
  region: string;
  category: "Soups & Stews" | "Grains & Swallows" | "Roasts & Braais" | "Seafood" | "Breads & Pastries" | "Desserts & Beverages";
  description: string;
  ingredients: string[];
  dietary: string[];
  imageUrl: string;
}

export interface AppNotification {
  id: string;
  userId?: string;
  recipientMemberId: string; // or "all" or specific memberId
  title: string;
  message: string;
  timestamp: string;
  type: "booking" | "order" | "accreditation" | "tree" | "community" | "trade" | "system" | "financial" | "lead" | "network";
  linkUrl: string;
  isRead: boolean;
}

export interface AuditLog {
  id: string;
  actorName: string;
  actorRole: string;
  action: string;
  target: string;
  timestamp: string;
  ipAddress: string;
  status: "Success" | "Flagged" | "Pending";
}
