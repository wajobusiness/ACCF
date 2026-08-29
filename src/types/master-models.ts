// Master Data Models strictly aligned with 15-data-models-master.docx
// Expanded for full interactive demonstration and production-ready contracts

export type MembershipTierType = "Standard" | "Premium" | "Continental Ambassador";

export interface Member {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  country: string;
  city?: string;
  tier: MembershipTierType;
  chairNo: string; // Format: AKDT-000XXXX
  joinDate: string;
  pledgeText: string;
  isVerified: boolean;
  role: "member" | "ambassador" | "host" | "vendor" | "business" | "moderator" | "admin";
  bio?: string;
  foodInterests?: string[];
  culturalInterests?: string[];
  languages?: string[];
  isHost?: boolean;
  isVendor?: boolean;
  phone?: string;
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
  description: string;
  iconName: string;
  color: string;
  membersCount: number;
  postsCount: number;
}

export interface HubPost {
  id: string;
  hubId: string;
  hubSlug: string;
  hubCategory: string;
  authorMemberId: string;
  authorName: string;
  authorPhoto: string;
  authorRole: string;
  authorCountry: string;
  title: string;
  body: string;
  tags: string[];
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  imageUrl?: string;
}

export interface AccreditationRequest {
  id: string;
  name: string;
  category:
    | "Government"
    | "Traditional Institutions"
    | "Private Sector"
    | "Diplomatic Community"
    | "Youth Representatives"
    | "Women Leaders"
    | "African Diaspora";
  organization: string;
  title: string;
  country: string;
  guestCount: number;
  dietaryNotes: string;
  email: string;
  status: "Pending" | "Approved" | "Declined";
  createdAt: string;
  tableSeatZone?: string;
}

export interface FestivalEvent {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  subEventType:
    | "cuisine-expo"
    | "chefs-championship"
    | "food-security-summit"
    | "cultural-village"
    | "marketplace"
    | "youth-innovation"
    | "women-leadership"
    | "peace-dinner";
  venueLocation: string;
  hallName: string;
  capacity: number;
  registeredCount: number;
  speakers: { name: string; role: string; country: string; photoUrl: string }[];
  chefs: { name: string; specialty: string; country: string; photoUrl: string }[];
  coverImage: string;
  isFeatured?: boolean;
}

export interface BusinessOpportunity {
  id: string;
  postedByMemberId: string;
  posterName: string;
  posterCompany: string;
  category:
    | "Trade Partnerships"
    | "Agribusiness Investments"
    | "Tourism Opportunities"
    | "Food Export Networks"
    | "Food Technology"
    | "Cross-Border Partnerships";
  country: string;
  title: string;
  description: string;
  investmentRange: string;
  contactInfo: string;
  createdAt: string;
  status: "Open" | "In Negotiation" | "Closed";
}

export interface Vendor {
  id: string;
  memberId: string;
  businessName: string;
  country: string;
  category: string;
  logoUrl: string;
  description: string;
  rating: number;
  isApproved: boolean;
  totalProducts: number;
}

export interface MarketplaceListing {
  id: string;
  vendorId: string;
  vendorName: string;
  vendorCountry: string;
  category:
    | "Food Products"
    | "Agricultural Produce"
    | "Traditional Ingredients"
    | "Food Equipment"
    | "Cultural Products"
    | "Tourism Packages"
    | "Handicrafts"
    | "Fashion & Textiles"
    | "Books & Publications";
  title: string;
  description: string;
  price: number;
  currency: string;
  priceNGN: number;
  images: string[];
  stock: number;
  rating: number;
  reviewsCount: number;
  originRegion: string;
  isFeatured?: boolean;
}

export interface OrderItem {
  listingId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  buyerMemberId: string;
  buyerName: string;
  buyerEmail: string;
  items: OrderItem[];
  totalAmountNGN: number;
  status: "Pending" | "Processing" | "Shipped" | "Completed" | "Cancelled";
  shippingAddress: string;
  shippingCountry: string;
  trackingNumber?: string;
  createdAt: string;
}

export interface MediaPost {
  id: string;
  category:
    | "Latest News"
    | "Festival Updates"
    | "Video Gallery"
    | "Documentaries"
    | "Interviews"
    | "Success Stories"
    | "Country Highlights";
  title: string;
  slug: string;
  summary: string;
  body: string;
  mediaUrl: string;
  mediaType: "article" | "video" | "press";
  publishedAt: string;
  readTime: string;
  author: string;
  imageUrl: string;
  videoDuration?: string;
}

export interface Sponsor {
  id: string;
  companyName: string;
  tier: "Platinum Partner" | "Diamond Partner" | "Gold Partner" | "Silver Partner" | "Bronze Partner";
  priceNGN: number;
  priceFormatted: string;
  logoUrl: string;
  country: string;
  description: string;
  websiteUrl?: string;
  contactEmail: string;
  benefits: string[];
}

export interface PeaceWallEntry {
  id: string;
  memberId?: string | null;
  guestName?: string | null;
  authorPhoto?: string;
  country: string;
  message: string;
  isApproved: boolean;
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
  recipientMemberId: string; // or "all" or role
  title: string;
  message: string;
  timestamp: string;
  type: "booking" | "order" | "accreditation" | "tree" | "community" | "trade" | "system";
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



