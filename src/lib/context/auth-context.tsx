"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Member } from "@/types/master-models";
import { DEMO_MEMBERS } from "@/lib/demo-data/members";
import { dataProvider } from "@/lib/data-provider";

interface AuthContextType {
  user: Member | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginAsPersona: (memberId: string) => void;
  loginWithEmail: (email: string) => boolean;
  registerUser: (data: Partial<Member>) => Promise<Member>;
  logout: () => void;
  updateProfile: (data: Partial<Member>) => Promise<Member>;
  availablePersonas: Member[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Default to Standard Member Persona (Amina Okafor) for demo continuity
  const [user, setUser] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for saved session
    const savedUserId = typeof window !== "undefined" ? localStorage.getItem("accf_demo_user_id") : null;
    if (savedUserId) {
      const found = DEMO_MEMBERS.find((m) => m.id === savedUserId);
      if (found) {
        setUser(found);
      } else {
        setUser(DEMO_MEMBERS[0]); // Amina Okafor
      }
    } else {
      setUser(DEMO_MEMBERS[0]);
    }
    setIsLoading(false);
  }, []);

  const loginAsPersona = (memberId: string) => {
    const found = DEMO_MEMBERS.find((m) => m.id === memberId);
    if (found) {
      setUser(found);
      if (typeof window !== "undefined") {
        localStorage.setItem("accf_demo_user_id", found.id);
      }
    }
  };

  const loginWithEmail = (email: string) => {
    const found = DEMO_MEMBERS.find((m) => m.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setUser(found);
      if (typeof window !== "undefined") {
        localStorage.setItem("accf_demo_user_id", found.id);
      }
      return true;
    }
    // If not found, create guest member session
    const newGuest: Member = {
      id: `mem-${Date.now()}`,
      name: email.split("@")[0].replace(".", " "),
      email: email,
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      country: "Nigeria",
      tier: "Standard",
      chairNo: `AKDT-000${Math.floor(1000 + Math.random() * 9000)}`,
      joinDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      pledgeText: "Breaking the Kolanut for the Peace of Africa.",
      isVerified: true,
      role: "member",
    };
    setUser(newGuest);
    return true;
  };

  const registerUser = async (data: Partial<Member>): Promise<Member> => {
    const created = await dataProvider.createMember(data);
    setUser(created);
    if (typeof window !== "undefined") {
      localStorage.setItem("accf_demo_user_id", created.id);
    }
    return created;
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("accf_demo_user_id");
    }
  };

  const updateProfile = async (data: Partial<Member>): Promise<Member> => {
    if (!user) throw new Error("Not logged in");
    const updated = await dataProvider.updateMember(user.id, data);
    setUser(updated);
    return updated;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        loginAsPersona,
        loginWithEmail,
        registerUser,
        logout,
        updateProfile,
        availablePersonas: DEMO_MEMBERS.slice(0, 9),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

