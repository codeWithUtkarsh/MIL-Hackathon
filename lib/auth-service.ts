"use client";

// User interface
export interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  country: string;
  points: number;
  role: "admin" | "ambassador";
  created_at: string;
  last_login?: string;
}

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

export interface AuthResponse {
  success: boolean;
  user?: AuthUser;
  message?: string;
}

// Embedded user data (in a real app, this would be in a database)
const USERS: User[] = [
  {
    id: 1,
    name: "Utkarsh Sharma",
    email: "utkarshkviim@gmail.com",
    password_hash: "secure123", // In production, this would be properly hashed
    country: "India",
    points: 200,
    role: "admin",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    name: "Farheen Imam",
    email: "farheenimam331@gmail.com",
    password_hash: "secure123", // In production, this would be properly hashed
    country: "Pakistan",
    points: 120,
    role: "admin",
    created_at: "2024-01-01T00:00:00Z",
  },
];

class AuthService {
  private users: User[] = USERS;
  private currentUser: AuthUser | null = null;

  constructor() {
    // Load user from localStorage on initialization
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("auth_user");
      if (storedUser) {
        try {
          this.currentUser = JSON.parse(storedUser);
        } catch (error) {
          console.error("Error parsing stored user:", error);
          localStorage.removeItem("auth_user");
        }
      }
    }
  }

  private saveUserToStorage(user: AuthUser): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_user", JSON.stringify(user));
    }
  }

  private removeUserFromStorage(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_user");
    }
  }

  private userToAuthUser(user: User): AuthUser {
    const { password_hash, ...authUser } = user;
    return authUser;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      // Find user by email
      const user = this.users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase(),
      );

      if (!user) {
        return {
          success: false,
          message: "Invalid email or password",
        };
      }

      // For demo purposes, we'll use a simple password check
      // In production, you would use proper password hashing and comparison
      const isValidPassword = password === user.password_hash;

      if (!isValidPassword) {
        return {
          success: false,
          message: "Invalid email or password",
        };
      }

      // Update last login
      user.last_login = new Date().toISOString();

      // Convert to AuthUser and store
      const authUser = this.userToAuthUser(user);
      this.currentUser = authUser;
      this.saveUserToStorage(authUser);

      return {
        success: true,
        user: authUser,
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: "An error occurred during login",
      };
    }
  }

  private comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): boolean {
    // For demo purposes, we'll just compare with the plain password
    // In production, use proper password hashing and comparison
    return plainPassword === hashedPassword;
  }

  logout(): void {
    this.currentUser = null;
    this.removeUserFromStorage();
  }

  getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === "admin";
  }

  updateUserPoints(points: number): void {
    if (this.currentUser) {
      this.currentUser.points = points;
      this.saveUserToStorage(this.currentUser);

      // Also update in the users array
      const userIndex = this.users.findIndex(
        (u) => u.id === this.currentUser!.id,
      );
      if (userIndex !== -1) {
        this.users[userIndex].points = points;
      }
    }
  }

  getAllUsers(): AuthUser[] {
    return this.users
      .map((user) => this.userToAuthUser(user))
      .sort((a, b) => b.points - a.points);
  }

  // Method to hash passwords (for production use)
  hashPassword(password: string): string {
    // For demo purposes, we'll just return the password
    // In production, use proper password hashing like bcrypt
    return password;
  }
}

// Singleton instance
let authServiceInstance: AuthService | null = null;

export function getAuthService(): AuthService {
  if (!authServiceInstance) {
    authServiceInstance = new AuthService();
  }
  return authServiceInstance;
}

export { AuthService };
