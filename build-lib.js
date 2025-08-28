#!/usr/bin/env node

/**
 * MIL-CAN Library Files Builder
 * This script generates all library files for the MIL-CAN application
 */

const fs = require('fs');
const path = require('path');

// Helper to create directories recursively
function createDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
  console.log(`✓ Created directory: ${dirPath}`);
}

// Helper to write files
function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    createDir(dir);
  }
  fs.writeFileSync(filePath, content);
  console.log(`✓ Created file: ${filePath}`);
}

console.log('🚀 Building MIL-CAN Library Files\n');

// Create lib directories
createDir('lib');
createDir('lib/store');

// ============================================
// LIBRARY FILES
// ============================================

// lib/types.ts
writeFile('lib/types.ts', `export type MemberRole = 'creator' | 'ambassador' | 'reviewer' | 'admin';
export type AssetType = 'video' | 'carousel' | 'script';
export type AssetTopic = 'ad-transparency' | 'before-after' | 'deepfake' | 'verify-30s';
export type AssetStatus = 'pending' | 'approved' | 'rejected';
export type RefType = 'asset' | 'event' | 'bonus' | 'admin';

export interface Member {
  id: string;
  role: MemberRole;
  name: string;
  email: string;
  handle: string;
  campus: string;
  languages: string[];
  points: number;
  createdAt: string;
}

export interface AssetReview {
  accuracy: number;
  context: number;
  clarity: number;
  safety: number;
  notes?: string;
  decidedBy?: string;
  decidedAt?: string;
}

export interface Asset {
  id: string;
  creatorId: string;
  type: AssetType;
  topic: AssetTopic;
  title: string;
  link: string;
  caption: string;
  citations: string[];
  accessibility: {
    captions: boolean;
  };
  status: AssetStatus;
  review?: AssetReview;
  score: number;
  createdAt: string;
}

export interface Event {
  id: string;
  ambassadorId: string;
  dateISO: string;
  location: string;
  attendees: number;
  preAvg: number;
  postAvg: number;
  deltaPct: number;
  assetsUsed: string[];
  recapLink: string;
  rightOfReply: boolean;
  safetyIssues?: string;
  createdAt: string;
}

export interface PointsLedger {
  id: string;
  memberId: string;
  role: string;
  points: number;
  reason: string;
  refType: RefType;
  refId?: string;
  timestamp: string;
}

export interface Settings {
  brand: {
    name: string;
  };
  caps: {
    maxAssetsPerMonth: number;
    maxEventsPerMonth: number;
  };
  scoring: {
    creatorApproved: number;
    creatorCitationsBonus: number;
    creatorPerEventUsed: number;
    ambassadorPerEvent: number;
    ambassadorGainBonus: number;
    ambassadorRightOfReply: number;
    gainThreshold: number;
  };
}`);

// lib/cn.ts (for classname utilities)
writeFile('lib/cn.ts', `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`);

// lib/utils.ts (alias for shadcn compatibility)
writeFile('lib/utils.ts', `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`);

// lib/ids.ts
writeFile('lib/ids.ts', `import { ulid } from 'ulid';

export function generateId(): string {
  return ulid();
}

export function isValidId(id: string): boolean {
  try {
    return /^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/.test(id);
  } catch {
    return false;
  }
}`);

// lib/validate.ts
writeFile('lib/validate.ts', `import { z } from 'zod';

// Common schemas
export const emailSchema = z.string().email('Invalid email address');
export const urlSchema = z.string().url('Invalid URL').startsWith('http', 'URL must start with http:// or https://');

// Member schemas
export const memberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: emailSchema,
  handle: z.string().min(1, 'Handle is required'),
  campus: z.string().optional(),
  languages: z.array(z.string()).min(1, 'At least one language is required'),
});

// Asset schemas
export const assetSubmitSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: emailSchema,
  handle: z.string().min(1, 'Handle is required'),
  languages: z.array(z.string()).min(1, 'At least one language is required'),
  assetType: z.enum(['video', 'carousel', 'script']),
  topic: z.enum(['ad-transparency', 'before-after', 'deepfake', 'verify-30s']),
  title: z.string().min(1, 'Title is required').max(80, 'Title must be 80 characters or less'),
  link: urlSchema,
  caption: z.string().min(80, 'Caption must be at least 80 characters'),
  citations: z.array(urlSchema).min(2, 'At least 2 citations are required'),
  captions: z.boolean(),
  consent: z.boolean().refine(val => val === true, 'You must consent to continue'),
});

export const assetReviewSchema = z.object({
  accuracy: z.number().min(0).max(4),
  context: z.number().min(0).max(2),
  clarity: z.number().min(0).max(2),
  safety: z.number().min(0).max(2),
  notes: z.string().optional(),
});

// Event schemas
export const eventSubmitSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: emailSchema,
  campus: z.string().min(1, 'Campus/City is required'),
  date: z.string().min(1, 'Date is required'),
  location: z.string().min(1, 'Location is required'),
  attendees: z.number().int().min(1, 'At least 1 attendee is required'),
  assetsUsed: z.array(z.string()).min(1, 'At least 1 asset must be selected'),
  preAvg: z.number().min(0).max(100),
  postAvg: z.number().min(0).max(100),
  recapLink: urlSchema,
  rightOfReply: z.boolean(),
  safetyIssues: z.string().optional(),
});

// Settings schemas
export const settingsSchema = z.object({
  brand: z.object({
    name: z.string().min(1),
  }),
  caps: z.object({
    maxAssetsPerMonth: z.number().int().min(1),
    maxEventsPerMonth: z.number().int().min(1),
  }),
  scoring: z.object({
    creatorApproved: z.number().int().min(0),
    creatorCitationsBonus: z.number().int().min(0),
    creatorPerEventUsed: z.number().int().min(0),
    ambassadorPerEvent: z.number().int().min(0),
    ambassadorGainBonus: z.number().int().min(0),
    ambassadorRightOfReply: z.number().int().min(0),
    gainThreshold: z.number().min(0).max(1),
  }),
});`);

// lib/calc.ts
writeFile('lib/calc.ts', `import { Settings, Event } from './types';

export function calculateDeltaPct(preAvg: number, postAvg: number): number {
  const denominator = Math.max(preAvg, 1); // Prevent division by zero
  return ((postAvg - preAvg) / denominator) * 100;
}

export function calculateEventPoints(
  event: Partial<Event>,
  settings: Settings
): number {
  let points = settings.scoring.ambassadorPerEvent;

  // Calculate delta percentage
  const deltaPct = calculateDeltaPct(event.preAvg || 0, event.postAvg || 0);

  // Add gain bonus if threshold met
  if (deltaPct >= settings.scoring.gainThreshold * 100) {
    points += settings.scoring.ambassadorGainBonus;
  }

  // Add right of reply bonus
  if (event.rightOfReply) {
    points += settings.scoring.ambassadorRightOfReply;
  }

  return points;
}

export function calculateAssetApprovalPoints(
  citationsCount: number,
  settings: Settings
): number {
  let points = settings.scoring.creatorApproved;

  if (citationsCount >= 2) {
    points += settings.scoring.creatorCitationsBonus;
  }

  return points;
}

export function calculateReviewScore(review: {
  accuracy: number;
  context: number;
  clarity: number;
  safety: number;
}): number {
  return review.accuracy + review.context + review.clarity + review.safety;
}`);

// lib/persist.ts
writeFile('lib/persist.ts', `export function safeJsonParse<T>(json: string | null, fallback: T): T {
  if (!json) return fallback;
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

export function safeJsonStringify(data: any): string {
  try {
    return JSON.stringify(data, null, 2);
  } catch {
    return '{}';
  }
}

export function loadFromLocalStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  const stored = localStorage.getItem(key);
  return safeJsonParse(stored, fallback);
}

export function saveToLocalStorage(key: string, data: any): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, safeJsonStringify(data));
}

export function clearLocalStorage(keys: string[]): void {
  if (typeof window === 'undefined') return;
  keys.forEach(key => localStorage.removeItem(key));
}

export function exportData(data: any, filename: string = 'mil-can-export.json'): void {
  const blob = new Blob([safeJsonStringify(data)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function importData(file: File): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        resolve(data);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}`);

// lib/i18n.ts
writeFile('lib/i18n.ts', `export const i18n = {
  en: {
    // Common
    'app.name': 'MIL-CAN',
    'app.tagline': 'Media & Information Literacy Creators & Ambassadors Network',
    'nav.assets': 'Assets',
    'nav.leaderboard': 'Leaderboard',
    'nav.kit': 'Event Kit',
    'nav.review': 'Review',
    'nav.dashboard': 'Dashboard',
    'nav.admin': 'Admin',

    // Roles
    'role.public': 'Public',
    'role.creator': 'Creator',
    'role.ambassador': 'Ambassador',
    'role.reviewer': 'Reviewer',
    'role.admin': 'Admin',

    // Actions
    'action.submit': 'Submit',
    'action.save': 'Save',
    'action.cancel': 'Cancel',
    'action.delete': 'Delete',
    'action.approve': 'Approve',
    'action.reject': 'Reject',
    'action.review': 'Review',
    'action.export': 'Export',
    'action.import': 'Import',
    'action.reset': 'Reset',
    'action.download': 'Download',
    'action.copy': 'Copy',
    'action.newEvent': 'New Event',
    'action.submitAsset': 'Submit Asset',

    // Topics
    'topic.ad-transparency': 'Spot the #ad',
    'topic.before-after': 'Before/After traps',
    'topic.deepfake': 'Deepfake tells',
    'topic.verify-30s': 'Verify in 30s',

    // Asset Types
    'type.video': 'Video',
    'type.carousel': 'Carousel',
    'type.script': 'Script',

    // Status
    'status.pending': 'Pending',
    'status.approved': 'Approved',
    'status.rejected': 'Rejected',

    // Success messages
    'success.assetSubmitted': 'Asset submitted successfully!',
    'success.eventSubmitted': 'Event reported successfully!',
    'success.assetApproved': 'Asset approved',
    'success.assetRejected': 'Asset rejected',
    'success.dataSaved': 'Data saved',
    'success.dataExported': 'Data exported',
    'success.dataImported': 'Data imported',
    'success.copied': 'Copied to clipboard',

    // Error messages
    'error.generic': 'Something went wrong',
    'error.notFound': 'Not found',
    'error.unauthorized': 'Unauthorized',
    'error.validation': 'Please check your input',
  }
};

export function t(key: string, lang: string = 'en', vars?: Record<string, any>): string {
  const translations = i18n[lang as keyof typeof i18n] || i18n.en;
  let text = translations[key as keyof typeof translations] || key;

  if (vars) {
    Object.entries(vars).forEach(([key, value]) => {
      text = text.replace(\`\${key}\`, String(value));
    });
  }

  return text;
}`);

// lib/seed.ts
writeFile('lib/seed.ts', `import { generateId } from './ids';
import { Member, Asset, Event, PointsLedger, Settings } from './types';

export function generateDemoData() {
  const now = new Date().toISOString();
  const dayAgo = new Date(Date.now() - 86400000).toISOString();
  const weekAgo = new Date(Date.now() - 604800000).toISOString();

  // Members
  const members: Member[] = [
    {
      id: generateId(),
      role: 'admin',
      name: 'Alex Admin',
      email: 'admin@mil-can.org',
      handle: '@admin',
      campus: 'HQ',
      languages: ['English', 'Spanish'],
      points: 0,
      createdAt: weekAgo,
    },
    {
      id: generateId(),
      role: 'reviewer',
      name: 'Riley Reviewer',
      email: 'reviewer@mil-can.org',
      handle: '@reviewer',
      campus: 'Central',
      languages: ['English'],
      points: 0,
      createdAt: weekAgo,
    },
    {
      id: generateId(),
      role: 'creator',
      name: 'Chris Creator',
      email: 'chris@example.com',
      handle: '@chriscreates',
      campus: 'North Campus',
      languages: ['English', 'French'],
      points: 23,
      createdAt: weekAgo,
    },
    {
      id: generateId(),
      role: 'creator',
      name: 'Casey Content',
      email: 'casey@example.com',
      handle: '@caseycontent',
      campus: 'South Campus',
      languages: ['English'],
      points: 10,
      createdAt: dayAgo,
    },
    {
      id: generateId(),
      role: 'ambassador',
      name: 'Amy Ambassador',
      email: 'amy@example.com',
      handle: '@amyambassador',
      campus: 'East Campus',
      languages: ['English', 'Mandarin'],
      points: 35,
      createdAt: weekAgo,
    },
    {
      id: generateId(),
      role: 'ambassador',
      name: 'Andy Advocate',
      email: 'andy@example.com',
      handle: '@andyadvocate',
      campus: 'West Campus',
      languages: ['English', 'Spanish'],
      points: 20,
      createdAt: dayAgo,
    },
  ];

  // Assets - simplified for demo
  const assets: Asset[] = [
    {
      id: generateId(),
      creatorId: members[2].id, // Chris Creator
      type: 'video',
      topic: 'ad-transparency',
      title: 'How to Spot Hidden Ads in 30 Seconds',
      link: 'https://example.com/video1',
      caption: 'Learn the telltale signs of undisclosed sponsored content in this quick guide. We break down the FTC guidelines and show real examples.',
      citations: [
        'https://www.ftc.gov/news-events/topics/truth-advertising',
        'https://www.asa.org.uk/codes-and-rulings/advertising-codes.html',
      ],
      accessibility: { captions: true },
      status: 'approved',
      review: {
        accuracy: 4,
        context: 2,
        clarity: 2,
        safety: 2,
        decidedBy: members[1].id,
        decidedAt: dayAgo,
      },
      score: 10,
      createdAt: weekAgo,
    },
  ];

  // Events
  const events: Event[] = [
    {
      id: generateId(),
      ambassadorId: members[4].id, // Amy Ambassador
      dateISO: dayAgo,
      location: 'Community Center A',
      attendees: 45,
      preAvg: 40,
      postAvg: 65,
      deltaPct: 62.5,
      assetsUsed: [assets[0].id],
      recapLink: 'https://example.com/event-recap-1',
      rightOfReply: true,
      createdAt: dayAgo,
    },
  ];

  // Points Ledger
  const pointsLedger: PointsLedger[] = [];

  // Settings
  const settings: Settings = {
    brand: {
      name: 'MIL-CAN',
    },
    caps: {
      maxAssetsPerMonth: 2,
      maxEventsPerMonth: 2,
    },
    scoring: {
      creatorApproved: 10,
      creatorCitationsBonus: 3,
      creatorPerEventUsed: 5,
      ambassadorPerEvent: 20,
      ambassadorGainBonus: 10,
      ambassadorRightOfReply: 5,
      gainThreshold: 0.2,
    },
  };

  return {
    members,
    assets,
    events,
    pointsLedger,
    settings,
  };
}

export function resetDemoData() {
  const data = generateDemoData();

  // Save to localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('mil-can-members', JSON.stringify(data.members));
    localStorage.setItem('mil-can-assets', JSON.stringify(data.assets));
    localStorage.setItem('mil-can-events', JSON.stringify(data.events));
    localStorage.setItem('mil-can-points', JSON.stringify(data.pointsLedger));
    localStorage.setItem('mil-can-settings', JSON.stringify(data.settings));
  }

  return data;
}`);

// lib/store/index.ts
writeFile('lib/store/index.ts', `import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Member, Asset, Event, PointsLedger, Settings } from '@/lib/types'
import { generateDemoData } from '@/lib/seed'

interface StoreState {
  // Current user role
  currentRole: 'public' | 'creator' | 'ambassador' | 'reviewer' | 'admin'
  setCurrentRole: (role: StoreState['currentRole']) => void

  // Data
  members: Member[]
  assets: Asset[]
  events: Event[]
  pointsLedger: PointsLedger[]
  settings: Settings

  // Actions
  addMember: (member: Member) => void
  updateMember: (id: string, updates: Partial<Member>) => void
  addAsset: (asset: Asset) => void
  updateAsset: (id: string, updates: Partial<Asset>) => void
  addEvent: (event: Event) => void
  addPointsEntry: (entry: PointsLedger) => void
  updateSettings: (settings: Partial<Settings>) => void

  // Utility
  hydrate: () => void
  reset: () => void
  importData: (data: any) => void
  exportData: () => any
}

const defaultSettings: Settings = {
  brand: { name: 'MIL-CAN' },
  caps: { maxAssetsPerMonth: 2, maxEventsPerMonth: 2 },
  scoring: {
    creatorApproved: 10,
    creatorCitationsBonus: 3,
    creatorPerEventUsed: 5,
    ambassadorPerEvent: 20,
    ambassadorGainBonus: 10,
    ambassadorRightOfReply: 5,
    gainThreshold: 0.2,
  },
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      currentRole: 'public',
      setCurrentRole: (role) => set({ currentRole: role }),

      members: [],
      assets: [],
      events: [],
      pointsLedger: [],
      settings: defaultSettings,

      addMember: (member) => set((state) => ({
        members: [...state.members, member]
      })),

      updateMember: (id, updates) => set((state) => ({
        members: state.members.map(m => m.id === id ? { ...m, ...updates } : m)
      })),

      addAsset: (asset) => set((state) => ({
        assets: [...state.assets, asset]
      })),

      updateAsset: (id, updates) => set((state) => ({
        assets: state.assets.map(a => a.id === id ? { ...a, ...updates } : a)
      })),

      addEvent: (event) => set((state) => ({
        events: [...state.events, event]
      })),

      addPointsEntry: (entry) => set((state) => ({
        pointsLedger: [...state.pointsLedger, entry]
      })),

      updateSettings: (updates) => set((state) => ({
        settings: { ...state.settings, ...updates }
      })),

      hydrate: () => {
        const state = get()
        if (state.members.length === 0) {
          const demoData = generateDemoData()
          set({
            members: demoData.members,
            assets: demoData.assets,
            events: demoData.events,
            pointsLedger: demoData.pointsLedger,
            settings: demoData.settings,
          })
        }
      },

      reset: () => {
        const demoData = generateDemoData()
        set({
          members: demoData.members,
          assets: demoData.assets,
          events: demoData.events,
          pointsLedger: demoData.pointsLedger,
          settings: demoData.settings,
        })
      },

      importData: (data) => {
        set({
          members: data.members || [],
          assets: data.assets || [],
          events: data.events || [],
          pointsLedger: data.pointsLedger || [],
          settings: data.settings || defaultSettings,
        })
      },

      exportData: () => {
        const state = get()
        return {
          members: state.members,
          assets: state.assets,
          events: state.events,
          pointsLedger: state.pointsLedger,
          settings: state.settings,
        }
      },
    }),
    {
      name: 'mil-can-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)`);

console.log('\n✅ Library files created successfully!');
console.log('\n📋 Files created:');
console.log('  - lib/types.ts');
console.log('  - lib/cn.ts');
console.log('  - lib/utils.ts');
console.log('  - lib/ids.ts');
console.log('  - lib/validate.ts');
console.log('  - lib/calc.ts');
console.log('  - lib/persist.ts');
console.log('  - lib/i18n.ts');
console.log('  - lib/seed.ts');
console.log('  - lib/store/index.ts');
console.log('\nNext: Run "npm run dev" to start the development server');
