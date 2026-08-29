import { AppNotification, AuditLog } from "@/types/master-models";

export const initialNotifications: AppNotification[] = [
  // Persona 1: Standard Member (Amina Okafor - mem-01)
  {
    id: "notif-01",
    recipientMemberId: "mem-01",
    title: "Sacred Peace Leaf Verified",
    message: "Your peace pledge has been permanently rooted in the West African canopy of the Digital Kolanut Tree.",
    timestamp: "10 mins ago",
    type: "tree",
    linkUrl: "/kolanut-tree",
    isRead: false,
  },
  {
    id: "notif-02",
    recipientMemberId: "mem-01",
    title: "Meet & Eat Booking Confirmed",
    message: "Chef Binta Diallo confirmed your reservation for the Senegalese Thieboudienne cultural dinner.",
    timestamp: "2 hours ago",
    type: "booking",
    linkUrl: "/dashboard",
    isRead: false,
  },
  {
    id: "notif-03",
    recipientMemberId: "mem-01",
    title: "Marketplace Order Shipped",
    message: "Your shipment of Ethiopian Yirgacheffe Single-Origin Beans (Ref: ORD-2026-9081) is in transit.",
    timestamp: "1 day ago",
    type: "order",
    linkUrl: "/dashboard",
    isRead: true,
  },

  // Persona 2: Premium Member (Kwame Mensah - mem-02)
  {
    id: "notif-04",
    recipientMemberId: "mem-02",
    title: "New B2B Agribusiness Match",
    message: "A commercial off-taker from Kigali matched your trade listing on the Africa Business Network.",
    timestamp: "30 mins ago",
    type: "trade",
    linkUrl: "/business",
    isRead: false,
  },
  {
    id: "notif-05",
    recipientMemberId: "mem-02",
    title: "VIP Festival Pass Ready",
    message: "Your VIP Access Badge for the Abuja 2026 Summit & Arena 3 is available in your command center.",
    timestamp: "5 hours ago",
    type: "system",
    linkUrl: "/dashboard",
    isRead: false,
  },

  // Persona 3: Continental Ambassador (Dr. Ngozi Achebe - mem-03)
  {
    id: "notif-06",
    recipientMemberId: "mem-03",
    title: "Diplomatic Peace Table Allocation",
    message: "Your seat has been reserved in Zone 1 (The Elders & Diplomatic Pavilions) for the 2km Peace Banquet.",
    timestamp: "1 hour ago",
    type: "accreditation",
    linkUrl: "/peace-table",
    isRead: false,
  },
  {
    id: "notif-07",
    recipientMemberId: "mem-03",
    title: "50 New National Leaves Planted",
    message: "50 new citizens from Nigeria and the diaspora endorsed your peace delegation pledge.",
    timestamp: "4 hours ago",
    type: "tree",
    linkUrl: "/kolanut-tree",
    isRead: false,
  },

  // Persona 4: Cultural Host (Chef Binta Diallo - mem-04)
  {
    id: "notif-08",
    recipientMemberId: "mem-04",
    title: "New Dining Experience Request",
    message: "Amina Okafor requested 2 seats for 'Sahelian Feast & Ancient Grains' on Oct 14, 2026.",
    timestamp: "15 mins ago",
    type: "booking",
    linkUrl: "/dashboard",
    isRead: false,
  },
  {
    id: "notif-09",
    recipientMemberId: "mem-04",
    title: "5-Star Review Received",
    message: "'An extraordinary culinary journey connecting centuries of Fulani heritage.' — Tariq Mansour",
    timestamp: "3 hours ago",
    type: "community",
    linkUrl: "/dashboard",
    isRead: true,
  },

  // Persona 5: Marketplace Vendor (Kofi Boateng - mem-05)
  {
    id: "notif-10",
    recipientMemberId: "mem-05",
    title: "New Customer Order Received",
    message: "Order #ORD-2026-9082 received for 2x Handcrafted Moroccan Tagine Pot (₦44,000).",
    timestamp: "20 mins ago",
    type: "order",
    linkUrl: "/dashboard",
    isRead: false,
  },
  {
    id: "notif-11",
    recipientMemberId: "mem-05",
    title: "Weekly Payout Transferred",
    message: "₦348,000 net proceeds from 14 marketplace sales transferred to your registered settlement account.",
    timestamp: "1 day ago",
    type: "system",
    linkUrl: "/dashboard",
    isRead: true,
  },

  // Persona 6: Business Member (Tariq Mansour - mem-06)
  {
    id: "notif-12",
    recipientMemberId: "mem-06",
    title: "Cold Chain Partnership Inquiry",
    message: "East African Agribusiness Consortium expressed interest in your Solar Cold Storage deal.",
    timestamp: "45 mins ago",
    type: "trade",
    linkUrl: "/business",
    isRead: false,
  },

  // Persona 7: Festival Participant (Nia Adeyemi - mem-07)
  {
    id: "notif-13",
    recipientMemberId: "mem-07",
    title: "Masterclass Registration Confirmed",
    message: "You are registered for 'Mastering Ancient African Fermentation' on Oct 16, 2026 at 2:00 PM.",
    timestamp: "1 hour ago",
    type: "system",
    linkUrl: "/festival",
    isRead: false,
  },

  // Persona 8: Moderator (Samuel Eke - mem-08)
  {
    id: "notif-14",
    recipientMemberId: "mem-08",
    title: "Moderation Queue Update",
    message: "3 new community hub discussion posts and 2 peace wall messages are awaiting moderation check.",
    timestamp: "5 mins ago",
    type: "community",
    linkUrl: "/dashboard",
    isRead: false,
  },

  // Persona 9: Administrator (Secretariat Admin - mem-09)
  {
    id: "notif-15",
    recipientMemberId: "mem-09",
    title: "Diplomatic Accreditation Surge",
    message: "45 new VIP and sovereign delegation accreditations submitted in the last 24 hours.",
    timestamp: "Just now",
    type: "accreditation",
    linkUrl: "/admin",
    isRead: false,
  },
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: "audit-01",
    actorName: "Secretariat Admin",
    actorRole: "Super Administrator",
    action: "Approved VIP Accreditation",
    target: "Ambassador Fatima Al-Zahra (Morocco)",
    timestamp: "2026-08-29 11:42 AM",
    ipAddress: "102.89.23.11",
    status: "Success",
  },
  {
    id: "audit-02",
    actorName: "Samuel Eke",
    actorRole: "Moderator",
    action: "Verified Peace Wall Entry",
    target: "Pledge #PW-1049 (Senegal)",
    timestamp: "2026-08-29 10:15 AM",
    ipAddress: "105.112.45.89",
    status: "Success",
  },
  {
    id: "audit-03",
    actorName: "System Gateway",
    actorRole: "Automated Service",
    action: "Issued Digital Chair ID",
    target: "AKDT-0002611 to Amina Okafor",
    timestamp: "2026-08-29 09:30 AM",
    ipAddress: "127.0.0.1",
    status: "Success",
  },
  {
    id: "audit-04",
    actorName: "Kofi Boateng",
    actorRole: "Vendor Merchant",
    action: "Published Product Listing",
    target: "Organic Stone-Ground Fonio Grain (5kg)",
    timestamp: "2026-08-28 04:20 PM",
    ipAddress: "154.160.22.4",
    status: "Success",
  },
  {
    id: "audit-05",
    actorName: "System Sentinel",
    actorRole: "Security Guard",
    action: "Rate Limit Inspection",
    target: "API /v1/accreditation endpoints",
    timestamp: "2026-08-28 02:00 PM",
    ipAddress: "197.210.64.12",
    status: "Success",
  },
];

