import { Order } from "@/types/master-models";

export const DEMO_ORDERS: Order[] = [
  {
    id: "ord-9041",
    buyerMemberId: "mem-01",
    buyerName: "Amina Okafor",
    buyerEmail: "amina.okafor@accf-demo.africa",
    items: [
      {
        listingId: "prod-01",
        title: "Single-Origin Yirgacheffe Heirloom Coffee Beans (1kg)",
        price: 24000,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop&q=80",
      },
      {
        listingId: "prod-02",
        title: "Ancestral 10-Spice Yaji & Suya Pepper Blend (250g Jar)",
        price: 8500,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format&fit=crop&q=80",
      },
    ],
    totalAmountNGN: 56500,
    status: "Completed",
    shippingAddress: "14 Adeola Odeku Street, Victoria Island, Lagos",
    shippingCountry: "Nigeria",
    trackingNumber: "ACCF-EXP-NG-88921",
    createdAt: "2025-07-14",
  },
  {
    id: "ord-9042",
    buyerMemberId: "mem-02",
    buyerName: "Kwame Mensah",
    buyerEmail: "kwame.mensah@accf-demo.africa",
    items: [
      {
        listingId: "prod-03",
        title: "Hand-Thrown Terracotta Cooking Tagine (12-inch)",
        price: 38000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=400&auto=format&fit=crop&q=80",
      },
      {
        listingId: "prod-06",
        title: "Taliouine Royal Red Saffron Threads (5g Certified)",
        price: 28000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=80",
      },
    ],
    totalAmountNGN: 66000,
    status: "Processing",
    shippingAddress: "Airport Residential Area, Block 4B, Accra",
    shippingCountry: "Ghana",
    trackingNumber: "ACCF-EXP-GH-41209",
    createdAt: "2025-08-19",
  },
  {
    id: "ord-9043",
    buyerMemberId: "mem-03",
    buyerName: "Wanjiku Mwangi",
    buyerEmail: "wanjiku.mwangi@accf-demo.africa",
    items: [
      {
        listingId: "prod-08",
        title: "Feast of 54: The Definitive Culinary Atlas of Africa (Hardcover)",
        price: 32000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80",
      },
    ],
    totalAmountNGN: 32000,
    status: "Shipped",
    shippingAddress: "Kilimani Ring Road, House 12, Nairobi",
    shippingCountry: "Kenya",
    trackingNumber: "ACCF-EXP-KE-77215",
    createdAt: "2025-08-21",
  },
];

