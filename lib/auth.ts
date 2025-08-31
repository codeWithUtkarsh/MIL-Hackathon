import { User } from "./database";

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

// Simple token generation without jwt library (for demo purposes)
export function generateToken(user: User): string {
  const payload: AuthTokenPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  // For demo purposes, create a simple base64 encoded token
  // In production, use proper JWT library
  const tokenData = {
    payload,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    secret: JWT_SECRET,
  };

  return Buffer.from(JSON.stringify(tokenData)).toString("base64");
}

export function verifyToken(token: string): AuthTokenPayload | null {
  try {
    // For demo purposes, decode the simple base64 token
    // In production, use proper JWT library
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const tokenData = JSON.parse(decoded);

    // Check if token is expired
    if (new Date(tokenData.expiresAt) < new Date()) {
      return null;
    }

    // Verify secret matches
    if (tokenData.secret !== JWT_SECRET) {
      return null;
    }

    return tokenData.payload as AuthTokenPayload;
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
