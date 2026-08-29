"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MarketplaceListing, OrderItem } from "@/types/master-models";
import { dataProvider } from "@/lib/data-provider";
import { useAuth } from "./auth-context";

interface CartContextType {
  items: OrderItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (product: MarketplaceListing, quantity?: number) => void;
  removeItem: (listingId: string) => void;
  updateQuantity: (listingId: string, quantity: number) => void;
  clearCart: () => void;
  totalAmountNGN: number;
  totalItemsCount: number;
  checkout: (shippingAddress: string, shippingCountry: string) => Promise<string>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Initial demo cart item for vibrant experience
    setItems([
      {
        listingId: "prod-01",
        title: "Single-Origin Yirgacheffe Heirloom Coffee Beans (1kg)",
        price: 24000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop&q=80",
      },
    ]);
  }, []);

  const addItem = (product: MarketplaceListing, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.listingId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.listingId === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          listingId: product.id,
          title: product.title,
          price: product.priceNGN,
          quantity,
          image: product.images[0],
        },
      ];
    });
    setIsOpen(true);
  };

  const removeItem = (listingId: string) => {
    setItems((prev) => prev.filter((item) => item.listingId !== listingId));
  };

  const updateQuantity = (listingId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(listingId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.listingId === listingId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalAmountNGN = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const checkout = async (shippingAddress: string, shippingCountry: string): Promise<string> => {
    if (items.length === 0) throw new Error("Cart is empty");
    const order = await dataProvider.createOrder({
      buyerMemberId: user?.id || "guest",
      buyerName: user?.name || "Guest Customer",
      buyerEmail: user?.email || "guest@accf-demo.africa",
      items: [...items],
      totalAmountNGN,
      status: "Processing",
      shippingAddress,
      shippingCountry,
    });
    clearCart();
    setIsOpen(false);
    return order.id;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalAmountNGN,
        totalItemsCount,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

