import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/context/auth-context";
import { CartProvider } from "@/lib/context/cart-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DemoHud } from "@/components/demo/demo-hud";
import { CartDrawer } from "@/components/cart/cart-drawer";

export const metadata: Metadata = {
  title: "African Cultural Culinary Festival (ACCF) — Abuja 2026",
  description: "Breaking the Kolanut for the Peace of Africa. One Home. One Meal. One Africa. Africa's largest food, culture and peace movement connecting 300 million Africans.",
  keywords: ["ACCF", "African Cultural Culinary Festival", "Abuja 2026", "African Peace Table", "Kolanut Tree", "Meet and Eat Africa", "African Food Movement"],
  authors: [{ name: "Afrigreen & Heritage Concepts Limited" }],
  openGraph: {
    title: "African Cultural Culinary Festival — Take A Seat For Africa",
    description: "Breaking the Kolanut for the Peace of Africa. Connecting 54 African nations through food, heritage, and peace.",
    type: "website",
    locale: "en_US",
    siteName: "ACCF Official Platform",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500&family=IBM+Plex+Mono:wght@400;500;600&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-accf-ivory text-accf-ink min-h-screen flex flex-col font-sans selection:bg-accf-gold selection:text-accf-charcoal">
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
            <DemoHud />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

