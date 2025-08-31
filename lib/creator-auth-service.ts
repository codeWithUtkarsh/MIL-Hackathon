"use client";

// Remove database imports since SQLite is disabled
// import { getDatabase } from "./database";
// import type { CreateCreatorData, CreatorWithNetwork } from "./database";

export interface CreateCreatorData {
  name: string;
  email: string;
  password: string;
  handle: string;
  campus: string;
  languages: string[];
}

export interface CreatorWithNetwork {
  id: number;
  name: string;
  email: string;
  handle: string;
  campus: string;
  languages: string[];
  points: number;
  created_at: string;
  last_login?: string;
  is_active: boolean;
  ambassador_id?: number;
  ambassador_name?: string;
}

export interface CreatorUser {
  id: number;
  name: string;
  email: string;
  handle: string;
  campus: string;
  languages: string[];
  points: number;
  created_at: string;
  last_login?: string;
  ambassador_id?: number;
  ambassador_name?: string;
}

export interface CreatorAuthResponse {
  success: boolean;
  user?: CreatorUser;
  message?: string;
}

// In-memory storage for creators (since SQLite is disabled)
const DEMO_CREATORS = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    password_hash: "Y3JlYXRvcjEyMw==", // base64 of "creator123"
    handle: "@johndoe",
    campus: "Harvard University",
    languages: ["English", "Spanish"],
    points: 150,
    created_at: "2024-01-01T00:00:00Z",
    is_active: true,
    ambassador_id: 1,
    ambassador_name: "Utkarsh Sharma",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    password_hash: "Y3JlYXRvcjEyMw==", // base64 of "creator123"
    handle: "@janesmith",
    campus: "MIT",
    languages: ["English", "French"],
    points: 200,
    created_at: "2024-01-02T00:00:00Z",
    is_active: true,
    ambassador_id: 1,
    ambassador_name: "Utkarsh Sharma",
  },
  {
    id: 3,
    name: "Alex Johnson",
    email: "alex.j@example.com",
    password_hash: "Y3JlYXRvcjEyMw==", // base64 of "creator123"
    handle: "@alexj",
    campus: "Stanford University",
    languages: ["English", "Mandarin"],
    points: 100,
    created_at: "2024-01-03T00:00:00Z",
    is_active: true,
    ambassador_id: 2,
    ambassador_name: "Farheen Imam",
  },
];

interface NetworkRelation {
  id: number;
  ambassador_id: number;
  creator_id: number;
  status: "active" | "inactive";
  notes?: string;
}

class CreatorAuthService {
  private currentCreator: CreatorUser | null = null;
  private creators: any[] = [...DEMO_CREATORS];
  private networks: NetworkRelation[] = [
    { id: 1, ambassador_id: 1, creator_id: 1, status: "active" },
    { id: 2, ambassador_id: 1, creator_id: 2, status: "active" },
    { id: 3, ambassador_id: 2, creator_id: 3, status: "active" },
  ];
  private nextCreatorId = 4;
  private nextNetworkId = 4;

  constructor() {
    // Load creator from localStorage on initialization
    this.loadCreatorFromStorage();
  }

  private loadCreatorFromStorage(): void {
    if (typeof window !== "undefined") {
      const storedCreator = localStorage.getItem("creator_user");
      if (storedCreator) {
        try {
          this.currentCreator = JSON.parse(storedCreator);
        } catch (error) {
          console.error("Error parsing stored creator:", error);
          localStorage.removeItem("creator_user");
        }
      }
    }
  }

  private saveCreatorToStorage(creator: CreatorUser): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("creator_user", JSON.stringify(creator));
      localStorage.setItem("user_type", "creator");
    }
  }

  private removeCreatorFromStorage(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("creator_user");
      localStorage.removeItem("user_type");
    }
  }

  private creatorDataToUser(creator: any): CreatorUser {
    return {
      id: creator.id,
      name: creator.name,
      email: creator.email,
      handle: creator.handle,
      campus: creator.campus,
      languages:
        typeof creator.languages === "string"
          ? JSON.parse(creator.languages)
          : creator.languages,
      points: creator.points || 0,
      created_at: creator.created_at,
      last_login: creator.last_login,
      ambassador_id: creator.ambassador_id,
      ambassador_name: creator.ambassador_name,
    };
  }

  async signin(email: string, password: string): Promise<CreatorAuthResponse> {
    try {
      // Find creator by email
      const creator = this.creators.find(
        (c) => c.email.toLowerCase() === email.toLowerCase(),
      );

      if (!creator) {
        return {
          success: false,
          message: "Invalid email or password",
        };
      }

      // Validate password
      const hashedInput = Buffer.from(password).toString("base64");
      if (hashedInput !== creator.password_hash) {
        return {
          success: false,
          message: "Invalid email or password",
        };
      }

      // Update last login
      creator.last_login = new Date().toISOString();

      // Convert to CreatorUser and store
      const creatorUser = this.creatorDataToUser(creator);

      this.currentCreator = creatorUser;
      this.saveCreatorToStorage(creatorUser);

      return {
        success: true,
        user: creatorUser,
      };
    } catch (error) {
      console.error("Creator signin error:", error);
      return {
        success: false,
        message: "An error occurred during sign in",
      };
    }
  }

  async signup(data: CreateCreatorData): Promise<CreatorAuthResponse> {
    try {
      // Check if email already exists
      const existingCreator = this.creators.find(
        (c) => c.email.toLowerCase() === data.email.toLowerCase(),
      );
      if (existingCreator) {
        return {
          success: false,
          message: "Email already registered",
        };
      }

      // Create new creator
      const hashedPassword = Buffer.from(data.password).toString("base64");
      const newCreator = {
        id: this.nextCreatorId++,
        name: data.name,
        email: data.email,
        password_hash: hashedPassword,
        handle: data.handle,
        campus: data.campus,
        languages: data.languages,
        points: 0,
        created_at: new Date().toISOString(),
        is_active: true,
        ambassador_id: undefined,
        ambassador_name: undefined,
      };

      this.creators.push(newCreator);

      // Convert to CreatorUser and store
      const creatorUser = this.creatorDataToUser(newCreator);
      this.currentCreator = creatorUser;
      this.saveCreatorToStorage(creatorUser);

      return {
        success: true,
        user: creatorUser,
      };
    } catch (error) {
      console.error("Creator signup error:", error);
      return {
        success: false,
        message: "An error occurred during sign up",
      };
    }
  }

  logout(): void {
    this.currentCreator = null;
    this.removeCreatorFromStorage();
  }

  getCurrentCreator(): CreatorUser | null {
    return this.currentCreator;
  }

  isAuthenticated(): boolean {
    return this.currentCreator !== null;
  }

  updateCreatorPoints(points: number): void {
    if (this.currentCreator) {
      this.currentCreator.points = points;
      this.saveCreatorToStorage(this.currentCreator);

      // Also update in the creators array
      const creator = this.creators.find(
        (c) => c.id === this.currentCreator!.id,
      );
      if (creator) {
        creator.points = points;
      }
    }
  }

  linkToAmbassador(ambassadorId: number, notes?: string): boolean {
    if (!this.currentCreator) {
      return false;
    }

    try {
      // Add to network relations
      const existingNetwork = this.networks.find(
        (n) =>
          n.ambassador_id === ambassadorId &&
          n.creator_id === this.currentCreator!.id,
      );

      if (!existingNetwork) {
        this.networks.push({
          id: this.nextNetworkId++,
          ambassador_id: ambassadorId,
          creator_id: this.currentCreator.id,
          status: "active",
          notes,
        });
      } else if (existingNetwork.status === "inactive") {
        existingNetwork.status = "active";
      }

      // Update current creator's ambassador info
      // For demo, we'll use hardcoded ambassador names
      const ambassadorNames: { [key: number]: string } = {
        1: "Utkarsh Sharma",
        2: "Farheen Imam",
      };

      this.currentCreator.ambassador_id = ambassadorId;
      this.currentCreator.ambassador_name =
        ambassadorNames[ambassadorId] || "Unknown Ambassador";
      this.saveCreatorToStorage(this.currentCreator);

      // Update in creators array
      const creator = this.creators.find(
        (c) => c.id === this.currentCreator!.id,
      );
      if (creator) {
        creator.ambassador_id = ambassadorId;
        creator.ambassador_name = this.currentCreator.ambassador_name;
      }

      return true;
    } catch (error) {
      console.error("Error linking creator to ambassador:", error);
      return false;
    }
  }

  unlinkFromAmbassador(): boolean {
    if (!this.currentCreator || !this.currentCreator.ambassador_id) {
      return false;
    }

    try {
      // Update network relation
      const network = this.networks.find(
        (n) =>
          n.ambassador_id === this.currentCreator!.ambassador_id &&
          n.creator_id === this.currentCreator!.id,
      );

      if (network) {
        network.status = "inactive";
      }

      // Update current creator
      const creatorId = this.currentCreator.id;
      this.currentCreator.ambassador_id = undefined;
      this.currentCreator.ambassador_name = undefined;
      this.saveCreatorToStorage(this.currentCreator);

      // Update in creators array
      const creator = this.creators.find((c) => c.id === creatorId);
      if (creator) {
        creator.ambassador_id = undefined;
        creator.ambassador_name = undefined;
      }

      return true;
    } catch (error) {
      console.error("Error unlinking creator from ambassador:", error);
      return false;
    }
  }

  getMyAmbassador(): { id: number; name: string; email: string } | null {
    if (!this.currentCreator || !this.currentCreator.ambassador_id) {
      return null;
    }

    // For demo, return hardcoded ambassador info
    const ambassadors = [
      { id: 1, name: "Utkarsh Sharma", email: "utkarshkviim@gmail.com" },
      { id: 2, name: "Farheen Imam", email: "farheenimam331@gmail.com" },
    ];

    const ambassadorId = this.currentCreator.ambassador_id;
    return ambassadors.find((a) => a.id === ambassadorId) || null;
  }

  getAllCreators(): CreatorWithNetwork[] {
    return this.creators.map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      handle: c.handle,
      campus: c.campus,
      languages: c.languages,
      points: c.points,
      created_at: c.created_at,
      last_login: c.last_login,
      is_active: c.is_active,
      ambassador_id: c.ambassador_id,
      ambassador_name: c.ambassador_name,
    }));
  }

  getCreatorsByAmbassador(ambassadorId: number): CreatorWithNetwork[] {
    const creatorIds = this.networks
      .filter((n) => n.ambassador_id === ambassadorId && n.status === "active")
      .map((n) => n.creator_id);

    return this.creators
      .filter((c) => creatorIds.includes(c.id))
      .map((c) => ({
        id: c.id,
        name: c.name,
        email: c.email,
        handle: c.handle,
        campus: c.campus,
        languages: c.languages,
        points: c.points,
        created_at: c.created_at,
        last_login: c.last_login,
        is_active: c.is_active,
        ambassador_id: c.ambassador_id,
        ambassador_name: c.ambassador_name,
      }));
  }
}

// Singleton instance
let creatorAuthServiceInstance: CreatorAuthService | null = null;

export function getCreatorAuthService(): CreatorAuthService {
  if (!creatorAuthServiceInstance) {
    creatorAuthServiceInstance = new CreatorAuthService();
  }
  return creatorAuthServiceInstance;
}

export { CreatorAuthService };
