import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';

// Database interface definitions
export interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  country: string;
  points: number;
  role: 'admin' | 'ambassador';
  created_at: string;
  last_login?: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  country: string;
  points: number;
  role: 'admin' | 'ambassador';
}

class DatabaseManager {
  private db: Database.Database;

  constructor() {
    const dbPath = path.join(process.cwd(), 'data', 'users.db');
    this.db = new Database(dbPath);
    this.initializeDatabase();
    this.seedDefaultUsers();
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

    // Create index on email for faster lookups
    this.db.exec(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)
    `);
  }

  private async seedDefaultUsers() {
    const userCount = this.db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };

    if (userCount.count === 0) {
      console.log('Seeding default admin users...');

      const defaultUsers: CreateUserData[] = [
        {
          name: 'Utkarsh Sharma',
          email: 'utkarshkviim@gmail.com',
          password: 'secure123', // You should change this to a more secure password
          country: 'India',
          points: 200,
          role: 'admin'
        },
        {
          name: 'Farheen Imam',
          email: 'farheenimam331@gmail.com',
          password: 'secure123', // You should change this to a more secure password
          country: 'Pakistan',
          points: 120,
          role: 'admin'
        }
      ];

      for (const userData of defaultUsers) {
        await this.createUser(userData);
      }

      console.log('Default admin users created successfully!');
    }
  }

  async createUser(userData: CreateUserData): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const stmt = this.db.prepare(`
      INSERT INTO users (name, email, password_hash, country, points, role)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      userData.name,
      userData.email,
      hashedPassword,
      userData.country,
      userData.points,
      userData.role
    );

    return this.getUserById(result.lastInsertRowid as number)!;
  }

  getUserByEmail(email: string): User | null {
    const stmt = this.db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email) as User | null;
  }

  getUserById(id: number): User | null {
    const stmt = this.db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id) as User | null;
  }

  async validatePassword(email: string, password: string): Promise<User | null> {
    const user = this.getUserByEmail(email);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) return null;

    // Update last login
    this.updateLastLogin(user.id);

    return user;
  }

  updateLastLogin(userId: number): void {
    const stmt = this.db.prepare('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?');
    stmt.run(userId);
  }

  updateUserPoints(userId: number, points: number): void {
    const stmt = this.db.prepare('UPDATE users SET points = ? WHERE id = ?');
    stmt.run(points, userId);
  }

  getAllUsers(): User[] {
    const stmt = this.db.prepare('SELECT * FROM users ORDER BY points DESC');
    return stmt.all() as User[];
  }

  close() {
    this.db.close();
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
