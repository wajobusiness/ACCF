"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Member, OnboardingProgress } from "@/types/master-models";
import { DEMO_MEMBERS } from "@/lib/demo-data/members";
import { dataProvider } from "@/lib/data-provider";

interface AuthContextType {
  user: Member | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginAsPersona: (memberId: string) => Promise<Member | null>;
  loginWithEmail: (email: string, password?: string) => Promise<{ success: boolean; member?: Member; error?: string }>;
  registerUser: (data: {
    name: string;
    email: string;
    phone?: string;
    country: string;
    password?: string;
    sponsorId?: string;
    role?: Member["role"];
  }) => Promise<Member>;
  logout: () => void;
  updateProfile: (data: Partial<Member>) => Promise<Member>;
  availablePersonas: Member[];
  onboarding: OnboardingProgress | null;
  refreshOnboarding: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Member | null>(null);
  const [onboarding, setOnboarding] = useState<OnboardingProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
      // Check saved session in browser
      const savedUserId = typeof window !== "undefined" ? localStorage.getItem("accf_auth_user_id") : null;
      if (savedUserId) {
        const found = await dataProvider.getMemberById(savedUserId);
        if (found) {
          setUser(found);
          const prog = await dataProvider.getOnboardingProgress(found.id);
          setOnboarding(prog);
        } else {
          // Fallback to initial demo persona 1
          const initial = await dataProvider.getMemberById("mem-01");
          if (initial) {
            setUser(initial);
            const prog = await dataProvider.getOnboardingProgress(initial.id);
            setOnboarding(prog);
          }
        }
      } else {
        const initial = await dataProvider.getMemberById("mem-01");
        if (initial) {
          setUser(initial);
          const prog = await dataProvider.getOnboardingProgress(initial.id);
          setOnboarding(prog);
        }
      }
      setIsLoading(false);
    }
    initAuth();
  }, []);

  const refreshOnboarding = async () => {
    if (user) {
      const prog = await dataProvider.getOnboardingProgress(user.id);
      setOnboarding(prog);
    }
  };

  const loginAsPersona = async (memberId: string): Promise<Member | null> => {
    setIsLoading(true);
    const found = await dataProvider.getMemberById(memberId);
    if (found) {
      setUser(found);
      if (typeof window !== "undefined") {
        localStorage.setItem("accf_auth_user_id", found.id);
      }
      const prog = await dataProvider.getOnboardingProgress(found.id);
      setOnboarding(prog);
      setIsLoading(false);
      return found;
    }
    setIsLoading(false);
    return null;
  };

  const loginWithEmail = async (email: string, password?: string): Promise<{ success: boolean; member?: Member; error?: string }> => {
    setIsLoading(true);
    const trimmed = email.trim().toLowerCase();
    let found = await dataProvider.getMemberByEmail(trimmed);

    if (!found) {
      // If not registered yet, auto-register as new member
      found = await dataProvider.createMember({
        email: trimmed,
        name: trimmed.split("@")[0].replace(/[._]/g, " "),
        country: "Nigeria",
        status: "pending_activation",
      });
    }

    setUser(found);
    if (typeof window !== "undefined") {
      localStorage.setItem("accf_auth_user_id", found.id);
    }
    const prog = await dataProvider.getOnboardingProgress(found.id);
    setOnboarding(prog);
    setIsLoading(false);
    return { success: true, member: found };
  };

  const registerUser = async (data: {
    name: string;
    email: string;
    phone?: string;
    country: string;
    password?: string;
    sponsorId?: string;
    role?: Member["role"];
  }): Promise<Member> => {
    setIsLoading(true);
    const newMember = await dataProvider.createMember({
      name: data.name,
      email: data.email.trim().toLowerCase(),
      phone: data.phone,
      country: data.country,
      password: data.password,
      sponsorId: data.sponsorId,
      role: data.role || "member",
      status: "pending_activation",
      isVerified: true,
    });

    setUser(newMember);
    if (typeof window !== "undefined") {
      localStorage.setItem("accf_auth_user_id", newMember.id);
    }
    const prog = await dataProvider.getOnboardingProgress(newMember.id);
    setOnboarding(prog);
    setIsLoading(false);
    return newMember;
  };

  const logout = () => {
    setUser(null);
    setOnboarding(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("accf_auth_user_id");
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
        availablePersonas: DEMO_MEMBERS,
        onboarding,
        refreshOnboarding,
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
