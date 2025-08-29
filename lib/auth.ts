// import jwt from 'jsonwebtoken';
// import { User } from './database';

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "your-super-secret-jwt-key-change-this-in-production";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export interface AuthTokenPayload {
  userId: number;
  email: string;
  role: "admin" | "ambassador";
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: Omit<User, "password_hash">;
  message?: string;
}

export function generateToken(user: User): string {
  const payload: AuthTokenPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

export function verifyToken(token: string): AuthTokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
  } catch (error) {
    return null;
  }
}

export function createAuthResponse(user: User): AuthResponse {
  const token = generateToken(user);
  const { password_hash, ...userWithoutPassword } = user;

  return {
    success: true,
    token,
    user: userWithoutPassword,
  };
}

export function createErrorResponse(message: string): AuthResponse {
  return {
    success: false,
    message,
  };
}

// Middleware function to extract token from Authorization header
export function extractTokenFromHeader(
  authHeader: string | null,
): string | null {
  if (!authHeader) return null;

  if (authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }

  return authHeader;
}

// Client-side token storage utilities
export const TokenStorage = {
  set: (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
    }
  },

  get: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token");
    }
    return null;
  },

  remove: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
    }
  },

  isValid: async (token: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.ok;
    } catch {
      return false;
    }
  },
};

// Auth context utilities
export interface AuthUser {
  id: number;
  name: string;
  email: string;
  country: string;
  points: number;
  role: "admin" | "ambassador";
  created_at: string;
  last_login?: string;
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}
