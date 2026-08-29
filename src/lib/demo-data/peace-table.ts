import { AccreditationRequest } from "@/types/master-models";

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

export const DEMO_PEACE_TABLE_ZONES: PeaceTableZone[] = [
  {
    id: "zone-1",
    name: "Zone 1: The Elders & Diplomatic Pavilions",
    lengthMeters: 350,
    capacity: 1800,
    description: "Heads of State, AU & UN delegations, Royal Traditional Monarchs, and Continental Peace Ambassadors.",
    assignedDishesRegion: "Ceremonial Royal Dishes of 54 Nations",
    color: "from-amber-600 to-accf-gold",
  },
  {
    id: "zone-2",
    name: "Zone 2: The Sahel & West African Hearth",
    lengthMeters: 450,
    capacity: 2200,
    description: "Celebrating the shared river valleys of the Niger and Senegal rivers, ancient fonio, jollof traditions, and rich peanut stews.",
    assignedDishesRegion: "West Africa (Nigeria, Ghana, Senegal, Mali, Côte d'Ivoire, Benin, etc.)",
    color: "from-emerald-700 to-accf-green",
  },
  {
    id: "zone-3",
    name: "Zone 3: The Great Rift Valley & Swahili Coast",
    lengthMeters: 400,
    capacity: 2000,
    description: "From the highlands of Ethiopia to the spice shores of Zanzibar, celebrating communal messobs and clove-infused coconut broths.",
    assignedDishesRegion: "East Africa (Kenya, Ethiopia, Tanzania, Rwanda, Uganda, Somalia)",
    color: "from-teal-700 to-teal-900",
  },
  {
    id: "zone-4",
    name: "Zone 4: The Congo Basin & Southern Savannah",
    lengthMeters: 400,
    capacity: 2000,
    description: "The emerald heart of Africa's rainforests and southern grasslands, featuring forest leaf stews, open-fire braais, and wild grains.",
    assignedDishesRegion: "Central & Southern Africa (Cameroon, DRC, South Africa, Zambia, Zimbabwe, Botswana, Namibia)",
    color: "from-orange-700 to-amber-800",
  },
  {
    id: "zone-5",
    name: "Zone 5: The Mediterranean Sands & Global African Diaspora",
    lengthMeters: 400,
    capacity: 2000,
    description: "North African trans-Saharan spice routes and returning descendants from the Caribbean, Americas, and European diaspora.",
    assignedDishesRegion: "North Africa & Global Diaspora (Morocco, Egypt, Algeria, Tunisia, Diaspora)",
    color: "from-red-800 to-accf-maroon",
  },
];

export const DEMO_PEACE_TABLE_DISHES: PeaceTableDish[] = [
  {
    id: "dish-01",
    name: "Smoked Party Jollof with Peppered Snapper & Dodo",
    country: "Nigeria",
    region: "West Africa",
    category: "Grains & Swallows",
    description: "Iconic firewood-infused long grain rice with caramelized tomato-bell pepper reduction, crisp sweet fried plantains, and flame-grilled wild ocean snapper.",
    ingredients: ["Long Grain Rice", "Scotch Bonnet", "Tatase Peppers", "Nigerian Bay Leaf", "Ripe Plantains"],
    dietary: ["Pescatarian", "Halal", "Nut-Free"],
    imageUrl: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "dish-02",
    name: "Royal Doro Wat on Teff Injera with Ayib Cheese",
    country: "Ethiopia",
    region: "East Africa",
    category: "Soups & Stews",
    description: "Slow-caramelized red onion stew with pasture-raised chicken drumsticks and farm eggs, deeply seasoned with artisanal 12-spice Berbere and herbal Niter Kibbeh.",
    ingredients: ["Organic Chicken", "Teff Flour", "Berbere", "Niter Kibbeh Spiced Butter", "Ayib Curd Cheese"],
    dietary: ["Halal", "Gluten-Free"],
    imageUrl: "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "dish-03",
    name: "UNESCO Heritage Thieboudienne Penda Mbaye",
    country: "Senegal",
    region: "West Africa",
    category: "Seafood",
    description: "Communal broken fragrant rice simmered in golden tomato-fish broth with white thiof grouper, cassava, white cabbage, sweet pumpkin, and tamarind relish.",
    ingredients: ["Broken Rice", "Thiof Grouper", "Tamarind", "Netetou", "Smoked Yeet Conch"],
    dietary: ["Pescatarian", "Gluten-Free", "Dairy-Free"],
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "dish-04",
    name: "Slow-Braised Lamb Tagine with Saffron, Prunes & Almonds",
    country: "Morocco",
    region: "North Africa",
    category: "Roasts & Braais",
    description: "Clay-pot slow-simmered tender lamb shoulder in golden Taliouine saffron, fresh ginger, cinnamon sticks, and wild mountain honey, garnished with toasted almonds.",
    ingredients: ["Lamb Shoulder", "Saffron", "Agen Prunes", "Ras el Hanout", "Argan Oil"],
    dietary: ["Halal", "Dairy-Free"],
    imageUrl: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "dish-05",
    name: "Cape Malay Spiced Bobotie with Yellow Rice & Sambal",
    country: "South Africa",
    region: "Southern Africa",
    category: "Roasts & Braais",
    description: "Golden savory baked minced beef spiced with curry, turmeric, and golden raisins under a silky savory egg custard canopy, accompanied by fragrant turmeric yellow rice.",
    ingredients: ["Prime Minced Beef", "Cape Malay Curry", "Bay Leaves", "Golden Sultanas", "Egg Custard"],
    dietary: ["Halaal", "Nut-Free"],
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "dish-06",
    name: "Zanzibari Swahili Pilau with King Prawns in Coconut Milk",
    country: "Tanzania",
    region: "East Africa",
    category: "Seafood",
    description: "Aromatic rice toasted in beef marrow and whole spices (cloves, green cardamom, cinnamon quills), crowned with jumbo Indian Ocean king prawns in coconut cream.",
    ingredients: ["Basmati Rice", "Zanzibar Cloves", "King Prawns", "Fresh Coconut Cream", "Cardamom"],
    dietary: ["Pescatarian", "Halal", "Gluten-Free"],
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "dish-07",
    name: "Royal Cameroon Ndolé with Smoked Crayfish & Bobolo",
    country: "Cameroon",
    region: "Central Africa",
    category: "Soups & Stews",
    description: "Velvety braised bitterleaf and ground raw peanut soup cooked with wild Atlantic smoked fish, beef cuts, and fresh tiger prawns, served with fermented cassava rods.",
    ingredients: ["Washed Ndolé Leaf", "Raw Peanuts", "Smoked Fish", "Penja White Pepper", "Fermented Cassava"],
    dietary: ["Gluten-Free", "Dairy-Free"],
    imageUrl: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "dish-08",
    name: "Traditional Egyptian Koshari with Crispy Onions & Dakka",
    country: "Egypt",
    region: "North Africa",
    category: "Grains & Swallows",
    description: "Communal layering of spiced brown lentils, Egyptian short-grain rice, macaroni, and tender chickpeas, topped with garlic-vinegar cumin Dakka and crispy onions.",
    ingredients: ["Brown Lentils", "Egyptian Rice", "Chickpeas", "Crispy Onions", "Garlic-Cumin Tomato Sauce"],
    dietary: ["Vegan", "Nut-Free", "Dairy-Free"],
    imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
  },
];

export const DEMO_ACCREDITATIONS: AccreditationRequest[] = [
  {
    id: "acc-01",
    name: "Ambassador Fatima Al-Zahra",
    category: "Diplomatic Community",
    organization: "African Union Commission on Food Security",
    title: "Senior Diplomatic Liaison",
    country: "Egypt",
    guestCount: 2,
    dietaryNotes: "Strict Halal, No Shellfish",
    email: "f.alzahra@au-commission.africa",
    status: "Approved",
    createdAt: "2025-07-10",
    tableSeatZone: "Zone 1 (Seat D-014)",
  },
  {
    id: "acc-02",
    name: "His Royal Majesty Oba Adeyeye Enitan",
    category: "Traditional Institutions",
    organization: "Council of Traditional Rulers of West Africa",
    title: "Traditional Monarch",
    country: "Nigeria",
    guestCount: 4,
    dietaryNotes: "Traditional West African Royal Menu",
    email: "royal.palace@heritage-council.org",
    status: "Approved",
    createdAt: "2025-07-12",
    tableSeatZone: "Zone 1 (Seat R-002)",
  },
  {
    id: "acc-03",
    name: "Hon. Minister Jean-Paul Habineza",
    category: "Government",
    organization: "Ministry of Agriculture & Natural Resources",
    title: "Cabinet Minister",
    country: "Rwanda",
    guestCount: 2,
    dietaryNotes: "Gluten-Free Preferred",
    email: "j.habineza@minagri.gov.rw",
    status: "Approved",
    createdAt: "2025-07-15",
    tableSeatZone: "Zone 1 (Seat G-028)",
  },
  {
    id: "acc-04",
    name: "Wanjiku Mwangi",
    category: "Women Leaders",
    organization: "East African Women Agri-Leadership Alliance",
    title: "President & Founder",
    country: "Kenya",
    guestCount: 1,
    dietaryNotes: "Vegetarian / Indigenous Greens",
    email: "wanjiku.mwangi@accf-demo.africa",
    status: "Approved",
    createdAt: "2025-07-20",
    tableSeatZone: "Zone 3 (Seat W-102)",
  },
  {
    id: "acc-05",
    name: "Marcus Garvey Johnson",
    category: "African Diaspora",
    organization: "Pan-African Diaspora Culinary Trust (UK)",
    title: "Executive Director",
    country: "United Kingdom",
    guestCount: 1,
    dietaryNotes: "Pescatarian",
    email: "marcus.johnson@diaspora-trust.org",
    status: "Pending",
    createdAt: "2025-08-01",
  },
];

