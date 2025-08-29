"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuthService, AuthUser, AuthResponse } from "./auth-service";

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => void;
  updateUserPoints: (points: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const authService = getAuthService();

  useEffect(() => {
    // Initialize auth state from storage only on client side
    if (typeof window !== "undefined") {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
    }
    setIsLoading(false);
  }, [authService]);

  const login = async (
    email: string,
    password: string,
  ): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const response = await authService.login(email, password);
      if (response.success && response.user) {
        setUser(response.user);
      }
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateUserPoints = (points: number) => {
    authService.updateUserPoints(points);
    if (user) {
      setUser({ ...user, points });
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: user !== null,
    login,
    logout,
    updateUserPoints,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useRequireAuth(): AuthContextType {
  const auth = useAuth();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !auth.isLoading &&
      !auth.isAuthenticated
    ) {
      // Redirect to login or show login modal
      console.warn("Authentication required");
    }
  }, [auth.isLoading, auth.isAuthenticated]);

  return auth;
}
