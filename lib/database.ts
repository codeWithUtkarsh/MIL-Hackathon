import Database from "better-sqlite3";
import path from "path";
import { ulid } from "ulid";
import type {
  Member,
  Asset,
  Event,
  Activity,
  AssetReview,
  MemberRole,
  AssetType,
  AssetTopic,
  AssetStatus,
} from "./types";

// Database interface definitions
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

export interface DbMember {
  id: string;
  role: MemberRole;
  name: string;
  email: string;
  handle: string;
  campus: string;
  languages: string; // JSON string of array
  points: number;
  created_at: string;
  last_login_at?: string;
  is_active: number; // SQLite boolean
}

export interface DbAsset {
  id: string;
  creator_id: string;
  type: AssetType;
  topic: AssetTopic;
  title: string;
  link: string;
  caption: string;
  citations: string; // JSON string of array
  accessibility: string; // JSON string of object
  status: AssetStatus;
  review: string | null; // JSON string of AssetReview
  score: number;
  created_at: string;
  updated_at: string;
  monthly_views: number;
  total_views: number;
  approved_at?: string;
  approved_by?: string;
}

export interface DbEvent {
  id: string;
  ambassador_id: string;
  date_iso: string;
  location: string;
  attendees: number;
  pre_avg: number;
  post_avg: number;
  delta_pct: number;
  assets_used: string; // JSON string of array
  recap_link: string;
  right_of_reply: number; // SQLite boolean
  safety_issues?: string;
  created_at: string;
  updated_at: string;
}

export interface DbActivity {
  id: string;
  type: string;
  member_id: string;
  member_name: string;
  description: string;
  status: string;
  timestamp: string;
  related_id?: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  country: string;
  points: number;
  role?: "admin" | "ambassador";
}

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

class DatabaseManager {
  private db: Database.Database;

  constructor() {
    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), "data");
    if (!require("fs").existsSync(dataDir)) {
      require("fs").mkdirSync(dataDir, { recursive: true });
    }
    const dbPath = path.join(dataDir, "users.db");
    this.db = new Database(dbPath);
    this.initializeDatabase();
    this.seedDefaultUsers();
    this.seedDefaultCreators();
    console.log("DatabaseManager initialized (SQLite disabled)");
  }

  private initializeDatabase() {
    // Create users table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        country TEXT NOT NULL,
        points INTEGER DEFAULT 0,
        role TEXT CHECK(role IN ('admin', 'ambassador')) DEFAULT 'ambassador',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_login DATETIME
      )
    `);

    // Create members table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS members (
        id TEXT PRIMARY KEY,
        role TEXT CHECK(role IN ('creator', 'ambassador', 'reviewer', 'admin')) NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        handle TEXT NOT NULL,
        campus TEXT NOT NULL,
        languages TEXT NOT NULL, -- JSON array
        points INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_login_at DATETIME,
        is_active INTEGER DEFAULT 1
      )
    `);

    // Create creators table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS creators (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        handle TEXT NOT NULL,
        campus TEXT NOT NULL,
        languages TEXT NOT NULL, -- JSON array
        points INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_login DATETIME,
        is_active INTEGER DEFAULT 1
      )
    `);

    // Create ambassador_creator_network table for many-to-many relationship
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS ambassador_creator_network (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ambassador_id INTEGER NOT NULL,
        creator_id INTEGER NOT NULL,
        added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT CHECK(status IN ('active', 'inactive')) DEFAULT 'active',
        notes TEXT,
        FOREIGN KEY (ambassador_id) REFERENCES users(id),
        FOREIGN KEY (creator_id) REFERENCES creators(id),
        UNIQUE(ambassador_id, creator_id)
      )
    `);

    // Create assets table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS assets (
        id TEXT PRIMARY KEY,
        creator_id TEXT NOT NULL,
        type TEXT CHECK(type IN ('video', 'carousel', 'script')) NOT NULL,
        topic TEXT CHECK(topic IN ('ad-transparency', 'before-after', 'deepfake', 'verify-30s')) NOT NULL,
        title TEXT NOT NULL,
        link TEXT NOT NULL,
        caption TEXT NOT NULL,
        citations TEXT NOT NULL, -- JSON array
        accessibility TEXT NOT NULL, -- JSON object
        status TEXT CHECK(status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
        review TEXT, -- JSON object
        score INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        monthly_views INTEGER DEFAULT 0,
        total_views INTEGER DEFAULT 0,
        approved_at DATETIME,
        approved_by TEXT,
        FOREIGN KEY (creator_id) REFERENCES members(id)
      )
    `);

    // Create events table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        ambassador_id TEXT NOT NULL,
        date_iso DATETIME NOT NULL,
        location TEXT NOT NULL,
        attendees INTEGER NOT NULL,
        pre_avg REAL NOT NULL,
        post_avg REAL NOT NULL,
        delta_pct REAL NOT NULL,
        assets_used TEXT NOT NULL, -- JSON array
        recap_link TEXT NOT NULL,
        right_of_reply INTEGER DEFAULT 0,
        safety_issues TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ambassador_id) REFERENCES members(id)
      )
    `);

    // Create activities table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS activities (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        member_id TEXT NOT NULL,
        member_name TEXT NOT NULL,
        description TEXT NOT NULL,
        status TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        related_id TEXT,
        FOREIGN KEY (member_id) REFERENCES members(id)
      )
    `);

    // Create indexes
    this.db.exec(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);
      CREATE INDEX IF NOT EXISTS idx_members_role ON members(role);
      CREATE INDEX IF NOT EXISTS idx_creators_email ON creators(email);
      CREATE INDEX IF NOT EXISTS idx_assets_creator ON assets(creator_id);
      CREATE INDEX IF NOT EXISTS idx_assets_status ON assets(status);
      CREATE INDEX IF NOT EXISTS idx_events_ambassador ON events(ambassador_id);
      CREATE INDEX IF NOT EXISTS idx_activities_member ON activities(member_id);
      CREATE INDEX IF NOT EXISTS idx_activities_type ON activities(type);
      CREATE INDEX IF NOT EXISTS idx_network_ambassador ON ambassador_creator_network(ambassador_id);
      CREATE INDEX IF NOT EXISTS idx_network_creator ON ambassador_creator_network(creator_id);
      CREATE INDEX IF NOT EXISTS idx_network_status ON ambassador_creator_network(status);
    `);
  }

  private async seedDefaultUsers() {
    const userCount = this.db
      .prepare("SELECT COUNT(*) as count FROM users")
      .get() as { count: number };

    if (userCount.count === 0) {
      console.log("Seeding default admin users...");

      const defaultUsers: CreateUserData[] = [
        {
          name: "Utkarsh Sharma",
          email: "utkarshkviim@gmail.com",
          password: "secure123", // You should change this to a more secure password
          country: "India",
          points: 200,
          role: "admin",
        },
        {
          name: "Farheen Imam",
          email: "farheenimam331@gmail.com",
          password: "secure123", // You should change this to a more secure password
          country: "Pakistan",
          points: 120,
          role: "admin",
        },
      ];

      for (const userData of defaultUsers) {
        await this.createUser(userData);
      }

      console.log("Default admin users created successfully!");
    }
  }

  private async seedDefaultCreators() {
    // Check if creators already exist
    const existingCreator = this.getCreatorByEmail("john.doe@example.com");
    if (!existingCreator) {
      console.log("Seeding default test creators...");

      const defaultCreators = [
        {
          name: "John Doe",
          email: "john.doe@example.com",
          password: "creator123",
          handle: "@johndoe",
          campus: "Harvard University",
          languages: ["English", "Spanish"],
        },
        {
          name: "Jane Smith",
          email: "jane.smith@example.com",
          password: "creator123",
          handle: "@janesmith",
          campus: "MIT",
          languages: ["English", "French"],
        },
        {
          name: "Alex Johnson",
          email: "alex.j@example.com",
          password: "creator123",
          handle: "@alexj",
          campus: "Stanford University",
          languages: ["English", "Mandarin"],
        },
      ];

      for (const creatorData of defaultCreators) {
        try {
          const result = await this.createCreator(creatorData);
          console.log(
            `Created test creator: ${creatorData.name} (ID: ${result.id})`,
          );

          // Link first two creators to the first ambassador (if exists)
          const ambassadors = this.db
              .prepare("SELECT * FROM users WHERE role = 'ambassador' LIMIT 1")
              .all() as User[];
          if (
            ambassadors.length > 0 &&
            (creatorData.email === "john.doe@example.com" ||
              creatorData.email === "jane.smith@example.com")
          ) {
            this.addCreatorToAmbassadorNetwork(
              ambassadors[0].id,
              result.id,
              "Test network connection",
            );
            console.log(
              `Linked ${creatorData.name} to ambassador ${ambassadors[0].name}`,
            );
          }
        } catch (error) {
          console.error(
            `Error creating test creator ${creatorData.name}:`,
            error,
          );
        }
      }

      console.log("Default test creators created successfully!");
    }
  }

  async createUser(userData: CreateUserData): Promise<User> {
    // const hashedPassword = await bcrypt.hash(userData.password, 10);
    console.log("createUser called (SQLite disabled)");
    throw new Error("SQLite database not available");
  }

  getUserByEmail(email: string): User | null {
    const stmt = this.db.prepare("SELECT * FROM users WHERE email = ?");
    return stmt.get(email) as User | null;
  }

  getUserById(id: number): User | null {
    const stmt = this.db.prepare("SELECT * FROM users WHERE id = ?");
    return stmt.get(id) as User | null;
  }

  async validatePassword(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = this.getUserByEmail(email);
    if (!user) return null;

    // For demo purposes, using simple comparison (in production, use bcrypt on server)
    const hashedInput = Buffer.from(password).toString("base64");
    const isValid = hashedInput === user.password_hash;
    if (!isValid) return null;

    // Update last login
    this.updateLastLogin(user.id);

    return user;
  }

  updateLastLogin(userId: number): void {
    const stmt = this.db.prepare(
      "UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?",
    );
    stmt.run(userId);
  }

  updateUserPoints(userId: number, points: number): void {
    const stmt = this.db.prepare("UPDATE users SET points = ? WHERE id = ?");
    stmt.run(points, userId);
  }

  getAllUsers(): User[] {
    const stmt = this.db.prepare("SELECT * FROM users ORDER BY points DESC");
    return stmt.all() as User[];
  }

  close() {
    this.db.close();
  }

  // Member operations
  createMember(memberData: Omit<Member, "id" | "createdAt">): Member {
    const id = ulid();
    const stmt = this.db.prepare(`
      INSERT INTO members (id, role, name, email, handle, campus, languages, points, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id,
      memberData.role,
      memberData.name,
      memberData.email,
      memberData.handle,
      memberData.campus,
      JSON.stringify(memberData.languages),
      memberData.points,
      memberData.isActive ? 1 : 0,
    );

    return this.getMemberById(id)!;
  }

  getMemberById(id: string): Member | null {
    const stmt = this.db.prepare("SELECT * FROM members WHERE id = ?");
    const row = stmt.get(id) as DbMember | null;
    return row ? this.dbMemberToMember(row) : null;
  }

  getAllMembers(): Member[] {
    const stmt = this.db.prepare(
      "SELECT * FROM members ORDER BY created_at DESC",
    );
    const rows = stmt.all() as DbMember[];
    return rows.map((row) => this.dbMemberToMember(row));
  }

  getActiveCreators(): Member[] {
    const stmt = this.db.prepare(
      "SELECT * FROM members WHERE role = ? AND is_active = 1",
    );
    const rows = stmt.all("creator") as DbMember[];
    return rows.map((row) => this.dbMemberToMember(row));
  }

  updateMember(id: string, updates: Partial<Member>): void {
    const fields: string[] = [];
    const values: any[] = [];

    if (updates.name !== undefined) {
      fields.push("name = ?");
      values.push(updates.name);
    }
    if (updates.points !== undefined) {
      fields.push("points = ?");
      values.push(updates.points);
    }
    if (updates.isActive !== undefined) {
      fields.push("is_active = ?");
      values.push(updates.isActive ? 1 : 0);
    }
    if (updates.languages !== undefined) {
      fields.push("languages = ?");
      values.push(JSON.stringify(updates.languages));
    }

    if (fields.length > 0) {
      values.push(id);
      const stmt = this.db.prepare(
        `UPDATE members SET ${fields.join(", ")} WHERE id = ?`,
      );
      stmt.run(...values);
    }
  }

  // Asset operations
  createAsset(assetData: Omit<Asset, "id" | "createdAt" | "updatedAt">): Asset {
    const id = ulid();
    const now = new Date().toISOString();

    const stmt = this.db.prepare(`
      INSERT INTO assets (
        id, creator_id, type, topic, title, link, caption, citations,
        accessibility, status, score, created_at, updated_at,
        monthly_views, total_views
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id,
      assetData.creatorId,
      assetData.type,
      assetData.topic,
      assetData.title,
      assetData.link,
      assetData.caption,
      JSON.stringify(assetData.citations),
      JSON.stringify(assetData.accessibility),
      assetData.status,
      assetData.score,
      now,
      now,
      assetData.monthlyViews,
      assetData.totalViews,
    );

    return this.getAssetById(id)!;
  }

  getAssetById(id: string): Asset | null {
    const stmt = this.db.prepare("SELECT * FROM assets WHERE id = ?");
    const row = stmt.get(id) as DbAsset | null;
    return row ? this.dbAssetToAsset(row) : null;
  }

  getAllAssets(): Asset[] {
    const stmt = this.db.prepare(
      "SELECT * FROM assets ORDER BY created_at DESC",
    );
    const rows = stmt.all() as DbAsset[];
    return rows.map((row) => this.dbAssetToAsset(row));
  }

  getAssetsByStatus(status: AssetStatus): Asset[] {
    const stmt = this.db.prepare(
      "SELECT * FROM assets WHERE status = ? ORDER BY created_at DESC",
    );
    const rows = stmt.all(status) as DbAsset[];
    return rows.map((row) => this.dbAssetToAsset(row));
  }

  updateAsset(id: string, updates: Partial<Asset>): void {
    const fields: string[] = [];
    const values: any[] = [];

    if (updates.status !== undefined) {
      fields.push("status = ?");
      values.push(updates.status);
    }
    if (updates.review !== undefined) {
      fields.push("review = ?");
      values.push(JSON.stringify(updates.review));
    }
    if (updates.score !== undefined) {
      fields.push("score = ?");
      values.push(updates.score);
    }
    if (updates.monthlyViews !== undefined) {
      fields.push("monthly_views = ?");
      values.push(updates.monthlyViews);
    }
    if (updates.approvedAt !== undefined) {
      fields.push("approved_at = ?");
      values.push(updates.approvedAt);
    }
    if (updates.approvedBy !== undefined) {
      fields.push("approved_by = ?");
      values.push(updates.approvedBy);
    }

    if (fields.length > 0) {
      fields.push("updated_at = ?");
      values.push(new Date().toISOString());
      values.push(id);

      const stmt = this.db.prepare(
        `UPDATE assets SET ${fields.join(", ")} WHERE id = ?`,
      );
      stmt.run(...values);
    }
  }

  // Event operations
  createEvent(eventData: Omit<Event, "id" | "createdAt" | "updatedAt">): Event {
    const id = ulid();
    const now = new Date().toISOString();

    const stmt = this.db.prepare(`
      INSERT INTO events (
        id, ambassador_id, date_iso, location, attendees, pre_avg, post_avg,
        delta_pct, assets_used, recap_link, right_of_reply, safety_issues,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id,
      eventData.ambassadorId,
      eventData.dateISO,
      eventData.location,
      eventData.attendees,
      eventData.preAvg,
      eventData.postAvg,
      eventData.deltaPct,
      JSON.stringify(eventData.assetsUsed),
      eventData.recapLink,
      eventData.rightOfReply ? 1 : 0,
      eventData.safetyIssues,
      now,
      now,
    );

    return this.getEventById(id)!;
  }

  getEventById(id: string): Event | null {
    const stmt = this.db.prepare("SELECT * FROM events WHERE id = ?");
    const row = stmt.get(id) as DbEvent | null;
    return row ? this.dbEventToEvent(row) : null;
  }

  getAllEvents(): Event[] {
    const stmt = this.db.prepare("SELECT * FROM events ORDER BY date_iso DESC");
    const rows = stmt.all() as DbEvent[];
    return rows.map((row) => this.dbEventToEvent(row));
  }

  updateEvent(id: string, updates: Partial<Event>): void {
    const fields: string[] = [];
    const values: any[] = [];

    if (updates.location !== undefined) {
      fields.push("location = ?");
      values.push(updates.location);
    }
    if (updates.attendees !== undefined) {
      fields.push("attendees = ?");
      values.push(updates.attendees);
    }
    if (updates.preAvg !== undefined) {
      fields.push("pre_avg = ?");
      values.push(updates.preAvg);
    }
    if (updates.postAvg !== undefined) {
      fields.push("post_avg = ?");
      values.push(updates.postAvg);
    }
    if (updates.deltaPct !== undefined) {
      fields.push("delta_pct = ?");
      values.push(updates.deltaPct);
    }
    if (updates.assetsUsed !== undefined) {
      fields.push("assets_used = ?");
      values.push(JSON.stringify(updates.assetsUsed));
    }
    if (updates.rightOfReply !== undefined) {
      fields.push("right_of_reply = ?");
      values.push(updates.rightOfReply ? 1 : 0);
    }

    if (fields.length > 0) {
      fields.push("updated_at = ?");
      values.push(new Date().toISOString());
      values.push(id);

      const stmt = this.db.prepare(
        `UPDATE events SET ${fields.join(", ")} WHERE id = ?`,
      );
      stmt.run(...values);
    }
  }

  // Activity operations

  // Activity operations
  createActivity(activityData: Omit<Activity, "id" | "timestamp">): Activity {
    const id = ulid();
    const now = new Date().toISOString();

    const stmt = this.db.prepare(`
      INSERT INTO activities (id, type, member_id, member_name, description, status, timestamp, related_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id,
      activityData.type,
      activityData.memberId,
      activityData.memberName,
      activityData.description,
      activityData.status,
      now,
      activityData.relatedId,
    );

    return this.getActivityById(id)!;
  }

  getActivityById(id: string): Activity | null {
    const stmt = this.db.prepare("SELECT * FROM activities WHERE id = ?");
    const row = stmt.get(id) as DbActivity | null;
    return row ? this.dbActivityToActivity(row) : null;
  }

  getAllActivities(): Activity[] {
    const stmt = this.db.prepare(
      "SELECT * FROM activities ORDER BY timestamp DESC",
    );
    const rows = stmt.all() as DbActivity[];
    return rows.map((row) => this.dbActivityToActivity(row));
  }

  getRecentActivities(limit: number = 10): Activity[] {
    const stmt = this.db.prepare(
      "SELECT * FROM activities ORDER BY timestamp DESC LIMIT ?",
    );
    const rows = stmt.all(limit) as DbActivity[];
    return rows.map((row) => this.dbActivityToActivity(row));
  }

  // Dashboard stats operations
  getDashboardStats() {
    const activeCreatorsStmt = this.db.prepare(
      "SELECT COUNT(*) as count FROM members WHERE role = ? AND is_active = 1",
    );
    const pendingReviewStmt = this.db.prepare(
      "SELECT COUNT(*) as count FROM assets WHERE status = ?",
    );
    const approvedContentStmt = this.db.prepare(
      "SELECT COUNT(*) as count FROM assets WHERE status = ?",
    );
    const monthlyViewsStmt = this.db.prepare(
      "SELECT SUM(monthly_views) as total FROM assets",
    );

    const activeCreators = (
      activeCreatorsStmt.get("creator") as { count: number }
    ).count;
    const pendingReview = (
      pendingReviewStmt.get("pending") as { count: number }
    ).count;
    const approvedContent = (
      approvedContentStmt.get("approved") as { count: number }
    ).count;
    const monthlyViewsResult = monthlyViewsStmt.get() as {
      total: number | null;
    };
    const monthlyViews = monthlyViewsResult.total || 0;

    return {
      activeCreators,
      pendingReview,
      approvedContent,
      monthlyViews,
      totalMembers: this.getAllMembers().length,
      totalEvents: this.getAllEvents().length,
      lastUpdated: new Date().toISOString(),
    };
  }

  // Helper methods to convert between DB and app types
  private dbMemberToMember(dbMember: DbMember): Member {
    return {
      id: dbMember.id,
      role: dbMember.role,
      name: dbMember.name,
      email: dbMember.email,
      handle: dbMember.handle,
      campus: dbMember.campus,
      languages: JSON.parse(dbMember.languages),
      points: dbMember.points,
      createdAt: dbMember.created_at,
      lastLoginAt: dbMember.last_login_at,
      isActive: Boolean(dbMember.is_active),
    };
  }

  private dbAssetToAsset(dbAsset: DbAsset): Asset {
    return {
      id: dbAsset.id,
      creatorId: dbAsset.creator_id,
      type: dbAsset.type,
      topic: dbAsset.topic,
      title: dbAsset.title,
      link: dbAsset.link,
      caption: dbAsset.caption,
      citations: JSON.parse(dbAsset.citations),
      accessibility: JSON.parse(dbAsset.accessibility),
      status: dbAsset.status,
      review: dbAsset.review ? JSON.parse(dbAsset.review) : undefined,
      score: dbAsset.score,
      createdAt: dbAsset.created_at,
      updatedAt: dbAsset.updated_at,
      monthlyViews: dbAsset.monthly_views,
      totalViews: dbAsset.total_views,
      approvedAt: dbAsset.approved_at,
      approvedBy: dbAsset.approved_by,
    };
  }

  private dbEventToEvent(dbEvent: DbEvent): Event {
    return {
      id: dbEvent.id,
      ambassadorId: dbEvent.ambassador_id,
      dateISO: dbEvent.date_iso,
      location: dbEvent.location,
      attendees: dbEvent.attendees,
      preAvg: dbEvent.pre_avg,
      postAvg: dbEvent.post_avg,
      deltaPct: dbEvent.delta_pct,
      assetsUsed: JSON.parse(dbEvent.assets_used),
      recapLink: dbEvent.recap_link,
      rightOfReply: Boolean(dbEvent.right_of_reply),
      safetyIssues: dbEvent.safety_issues,
      createdAt: dbEvent.created_at,
      updatedAt: dbEvent.updated_at,
    };
  }

  private dbActivityToActivity(dbActivity: DbActivity): Activity {
    return {
      id: dbActivity.id,
      type: dbActivity.type as Activity["type"],
      memberId: dbActivity.member_id,
      memberName: dbActivity.member_name,
      description: dbActivity.description,
      status: dbActivity.status as Activity["status"],
      timestamp: dbActivity.timestamp,
      relatedId: dbActivity.related_id || undefined,
    };
  }

  // Creator-specific methods
  async createCreator(
    data: CreateCreatorData,
  ): Promise<{ id: number; email: string }> {
    // For demo purposes, using simple hash (in production, use bcrypt on server)
    const hashedPassword = Buffer.from(data.password).toString("base64");
    const stmt = this.db.prepare(
      `INSERT INTO creators (name, email, password_hash, handle, campus, languages)
       VALUES (?, ?, ?, ?, ?, ?)`,
    );
    const result = stmt.run(
      data.name,
      data.email,
      hashedPassword,
      data.handle,
      data.campus,
      JSON.stringify(data.languages),
    );
    return { id: result.lastInsertRowid as number, email: data.email };
  }

  getCreatorByEmail(email: string): any {
    const stmt = this.db.prepare("SELECT * FROM creators WHERE email = ?");
    return stmt.get(email);
  }

  getCreatorById(id: number): any {
    const stmt = this.db.prepare("SELECT * FROM creators WHERE id = ?");
    return stmt.get(id);
  }

  async validateCreatorPassword(
    email: string,
    password: string,
  ): Promise<boolean> {
    const creator = this.getCreatorByEmail(email);
    if (!creator) return false;

    try {
      // For demo purposes, using simple comparison (in production, use bcrypt on server)
      const hashedInput = Buffer.from(password).toString("base64");
      return hashedInput === creator.password_hash;
    } catch (error) {
      console.error("Password validation error:", error);
      return false;
    }
  }

  updateCreatorLastLogin(id: number): void {
    const stmt = this.db.prepare(
      "UPDATE creators SET last_login = CURRENT_TIMESTAMP WHERE id = ?",
    );
    stmt.run(id);
  }

  // Network relationship methods
  addCreatorToAmbassadorNetwork(
    ambassadorId: number,
    creatorId: number,
    notes?: string,
  ): void {
    const stmt = this.db.prepare(
      `INSERT OR REPLACE INTO ambassador_creator_network (ambassador_id, creator_id, notes, status)
       VALUES (?, ?, ?, 'active')`,
    );
    stmt.run(ambassadorId, creatorId, notes || null);
  }

  removeCreatorFromNetwork(ambassadorId: number, creatorId: number): void {
    const stmt = this.db.prepare(
      `UPDATE ambassador_creator_network
       SET status = 'inactive'
       WHERE ambassador_id = ? AND creator_id = ?`,
    );
    stmt.run(ambassadorId, creatorId);
  }

  getCreatorsByAmbassador(ambassadorId: number): CreatorWithNetwork[] {
    const stmt = this.db.prepare(`
      SELECT c.*, acn.ambassador_id, u.name as ambassador_name
      FROM creators c
      INNER JOIN ambassador_creator_network acn ON c.id = acn.creator_id
      LEFT JOIN users u ON acn.ambassador_id = u.id
      WHERE acn.ambassador_id = ? AND acn.status = 'active'
    `);

    const rows = stmt.all(ambassadorId) as any[];
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      handle: row.handle,
      campus: row.campus,
      languages: JSON.parse(row.languages),
      points: row.points,
      created_at: row.created_at,
      last_login: row.last_login,
      is_active: row.is_active === 1,
      ambassador_id: row.ambassador_id,
      ambassador_name: row.ambassador_name,
    }));
  }

  getAmbassadorByCreator(creatorId: number): any {
    const stmt = this.db.prepare(`
      SELECT u.*
      FROM users u
      INNER JOIN ambassador_creator_network acn ON u.id = acn.ambassador_id
      WHERE acn.creator_id = ? AND acn.status = 'active'
      LIMIT 1
    `);
    return stmt.get(creatorId);
  }

  getAllCreators(): CreatorWithNetwork[] {
    const stmt = this.db.prepare(`
      SELECT c.*, acn.ambassador_id, u.name as ambassador_name
      FROM creators c
      LEFT JOIN ambassador_creator_network acn ON c.id = acn.creator_id AND acn.status = 'active'
      LEFT JOIN users u ON acn.ambassador_id = u.id
      WHERE c.is_active = 1
    `);

    const rows = stmt.all() as any[];
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      handle: row.handle,
      campus: row.campus,
      languages: JSON.parse(row.languages),
      points: row.points,
      created_at: row.created_at,
      last_login: row.last_login,
      is_active: row.is_active === 1,
      ambassador_id: row.ambassador_id,
      ambassador_name: row.ambassador_name,
    }));
  }

  updateCreatorPoints(id: number, points: number): void {
    const stmt = this.db.prepare("UPDATE creators SET points = ? WHERE id = ?");
    stmt.run(points, id);
  }
}

// Singleton instance
let dbInstance: DatabaseManager | null = null;

export function getDatabase(): DatabaseManager {
  if (!dbInstance) {
    dbInstance = new DatabaseManager();
  }
  return dbInstance;
}

export { DatabaseManager };
