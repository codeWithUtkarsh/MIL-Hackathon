const fs = require('fs');
const path = require('path');

// Helper function to create directory recursively
function createDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
  console.log(`✓ Created directory: ${dirPath}`);
}

// Helper function to write file with content
function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    createDir(dir);
  }
  fs.writeFileSync(filePath, content);
  console.log(`✓ Created file: ${filePath}`);
}

console.log('🚀 Generating MIL-CAN Next.js Application...\n');

// Create directory structure
const directories = [
  'app',
  'app/assets',
  'app/creator',
  'app/creator/submit',
  'app/creator/thanks/[assetId]',
  'app/review',
  'app/review/[assetId]',
  'app/events',
  'app/events/new',
  'app/events/thanks/[eventId]',
  'app/leaderboard',
  'app/kit',
  'app/dashboard',
  'app/admin',
  'components',
  'components/forms',
  'components/modals',
  'components/tables',
  'components/charts',
  'components/ui',
  'lib',
  'lib/store',
  'public',
  'public/kit'
];

directories.forEach(createDir);

// ============================================
// CORE LIBRARY FILES
// ============================================

// lib/cn.ts
writeFile('lib/cn.ts', `import { type ClassValue, clsx } from "clsx"
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

    // Forms
    'form.required': 'Required',
    'form.optional': 'Optional',
    'form.email': 'Email',
    'form.name': 'Name',
    'form.handle': 'Handle',
    'form.campus': 'Campus',
    'form.languages': 'Languages',
    'form.title': 'Title',
    'form.link': 'Link',
    'form.caption': 'Caption',
    'form.citations': 'Citations',
    'form.consent': 'I consent to the terms',
    'form.captions': 'Has captions',

    // Validation
    'validation.required': 'This field is required',
    'validation.email': 'Please enter a valid email',
    'validation.url': 'Please enter a valid URL',
    'validation.min': 'Minimum {count} characters required',
    'validation.max': 'Maximum {count} characters allowed',
    'validation.minItems': 'At least {count} items required',

    // Empty states
    'empty.assets': 'No assets found',
    'empty.events': 'No events found',
    'empty.members': 'No members found',
    'empty.default': 'No data available',

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

    // Points
    'points.total': 'Total Points',
    'points.earned': 'Points Earned',
    'points.reason': 'Reason',
    'points.creatorApproved': 'Asset approved',
    'points.citationsBonus': 'Citations bonus',
    'points.assetUsed': 'Asset used in event',
    'points.eventBase': 'Event hosted',
    'points.gainBonus': 'Learning gain bonus',
    'points.rightOfReply': 'Right of reply',

    // Tooltips
    'tooltip.citations': 'Credible sources that support your content',
    'tooltip.delta': 'Percentage change in knowledge from pre to post',
    'tooltip.rightOfReply': 'Opportunity for participants to respond or clarify',
    'tooltip.ad': 'Sponsored or promotional content',
  }
};

export function t(key: string, lang: string = 'en', vars?: Record<string, any>): string {
  const translations = i18n[lang as keyof typeof i18n] || i18n.en;
  let text = translations[key as keyof typeof translations] || key;

  if (vars) {
    Object.entries(vars).forEach(([key, value]) => {
      text = text.replace(\`{\${key}}\`, String(value));
    });
  }

  return text;
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
})`);

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

// lib/calc.test.ts
writeFile('lib/calc.test.ts', `import { describe, it, expect } from 'vitest';
import { calculateDeltaPct, calculateEventPoints, calculateAssetApprovalPoints, calculateReviewScore } from './calc';
import { Settings } from './types';

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
};

describe('calculateDeltaPct', () => {
  it('calculates positive delta correctly', () => {
    expect(calculateDeltaPct(50, 70)).toBe(40);
  });

  it('calculates negative delta correctly', () => {
    expect(calculateDeltaPct(70, 50)).toBeCloseTo(-28.57, 1);
  });

  it('handles zero pre-average', () => {
    expect(calculateDeltaPct(0, 50)).toBe(5000);
  });

  it('handles no change', () => {
    expect(calculateDeltaPct(50, 50)).toBe(0);
  });
});

describe('calculateEventPoints', () => {
  it('calculates base points correctly', () => {
    const event = { preAvg: 50, postAvg: 50, rightOfReply: false };
    expect(calculateEventPoints(event, defaultSettings)).toBe(20);
  });

  it('adds gain bonus when threshold met', () => {
    const event = { preAvg: 50, postAvg: 70, rightOfReply: false }; // 40% gain
    expect(calculateEventPoints(event, defaultSettings)).toBe(30);
  });

  it('adds right of reply bonus', () => {
    const event = { preAvg: 50, postAvg: 50, rightOfReply: true };
    expect(calculateEventPoints(event, defaultSettings)).toBe(25);
  });

  it('adds all bonuses when applicable', () => {
    const event = { preAvg: 50, postAvg: 70, rightOfReply: true };
    expect(calculateEventPoints(event, defaultSettings)).toBe(35);
  });
});

describe('calculateAssetApprovalPoints', () => {
  it('calculates base approval points', () => {
    expect(calculateAssetApprovalPoints(0, defaultSettings)).toBe(10);
  });

  it('adds citations bonus when >= 2 citations', () => {
    expect(calculateAssetApprovalPoints(2, defaultSettings)).toBe(13);
    expect(calculateAssetApprovalPoints(5, defaultSettings)).toBe(13);
  });

  it('does not add citations bonus when < 2 citations', () => {
    expect(calculateAssetApprovalPoints(1, defaultSettings)).toBe(10);
  });
});

describe('calculateReviewScore', () => {
  it('calculates total score correctly', () => {
    const review = { accuracy: 4, context: 2, clarity: 2, safety: 2 };
    expect(calculateReviewScore(review)).toBe(10);
  });

  it('handles minimum scores', () => {
    const review = { accuracy: 0, context: 0, clarity: 0, safety: 0 };
    expect(calculateReviewScore(review)).toBe(0);
  });

  it('handles partial scores', () => {
    const review = { accuracy: 2, context: 1, clarity: 1, safety: 1 };
    expect(calculateReviewScore(review)).toBe(5);
  });
})`);

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

// lib/seed.ts
writeFile('lib/seed.ts', `import { generateId } from './ids';
import { Member, Asset, Event, PointsLedger, Settings } from './types';

export function generateDemoData() {
  const now = new Date().toISOString();
  const dayAgo = new Date(Date.now() - 86400000).toISOString();
  const weekAgo = new Date(Date.now() - 604800000).toISOString();

  // Members
  const admin: Member = {
    id: generateId(),
    role: 'admin',
    name: 'Alex Admin',
    email: 'admin@mil-can.org',
    handle: '@admin',
    campus: 'HQ',
    languages: ['English', 'Spanish'],
    points: 0,
    createdAt: weekAgo,
  };

  const reviewer: Member = {
    id: generateId(),
    role: 'reviewer',
    name: 'Riley Reviewer',
    email: 'reviewer@mil-can.org',
    handle: '@reviewer',
    campus: 'Central',
    languages: ['English'],
    points: 0,
    createdAt: weekAgo,
  };

  const creator1: Member = {
    id: generateId(),
    role: 'creator',
    name: 'Chris Creator',
    email: 'chris@example.com',
    handle: '@chriscreates',
    campus: 'North Campus',
    languages: ['English', 'French'],
    points: 23,
    createdAt: weekAgo,
  };

  const creator2: Member = {
    id: generateId(),
    role: 'creator',
    name: 'Casey Content',
    email: 'casey@example.com',
    handle: '@caseycontent',
    campus: 'South Campus',
    languages: ['English'],
    points: 10,
    createdAt: dayAgo,
  };

  const ambassador1: Member = {
    id: generateId(),
    role: 'ambassador',
    name: 'Amy Ambassador',
    email: 'amy@example.com',
    handle: '@amyambassador',
    campus: 'East Campus',
    languages: ['English', 'Mandarin'],
    points: 35,
    createdAt: weekAgo,
  };

  const ambassador2: Member = {
    id: generateId(),
    role: 'ambassador',
    name: 'Andy Advocate',
    email: 'andy@example.com',
    handle: '@andyadvocate',
    campus: 'West Campus',
    languages: ['English', 'Spanish'],
    points: 20,
    createdAt: dayAgo,
  };

  const members = [admin, reviewer, creator1, creator2, ambassador1, ambassador2];

  // Assets
  const asset1: Asset = {
    id: generateId(),
    creatorId: creator1.id,
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
      decidedBy: reviewer.id,
      decidedAt: dayAgo,
    },
    score: 10,
    createdAt: weekAgo,
  };

  const asset2: Asset = {
    id: generateId(),
    creatorId: creator1.id,
    type: 'carousel',
    topic: 'before-after',
    title: 'Before/After Photo Tricks Exposed',
    link: 'https://example.com/carousel1',
    caption: 'Swipe through to see how lighting, angles, and timing can dramatically change before/after photos without any real change.',
    citations: [
      'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6724368/',
      'https://www.asanet.org/sites/default/files/attach/journals/aug18asrfeature.pdf',
    ],
    accessibility: { captions: true },
    status: 'approved',
    review: {
      accuracy: 3,
      context: 2,
      clarity: 2,
      safety: 2,
      decidedBy: reviewer.id,
      decidedAt: dayAgo,
    },
    score: 9,
    createdAt: weekAgo,
  };

  const asset3: Asset = {
    id: generateId(),
    creatorId: creator2.id,
    type: 'script',
    topic: 'deepfake',
    title: 'Deepfake Detection Script for Educators',
    link: 'https://example.com/script1',
    caption: 'A ready-to-use script for teaching students how to identify deepfake videos using simple observation techniques and free online tools.',
    citations: [
      'https://www.media.mit.edu/projects/detect-fakes/overview/',
      'https://www.microsoft.com/en-us/research/uploads/prod/2020/01/Deepfakes-Detection.pdf',
    ],
    accessibility: { captions: false },
    status: 'approved',
    review: {
      accuracy: 4,
      context: 2,
      clarity: 2,
      safety: 2,
      decidedBy: reviewer.id,
      decidedAt: dayAgo,
    },
    score: 10,
    createdAt: dayAgo,
  };

  const asset4: Asset = {
    id: generateId(),
    creatorId: creator2.id,
    type: 'video',
    topic: 'verify-30s',
    title: 'Quick Fact-Check: The 30-Second Method',
    link: 'https://example.com/video2',
    caption: 'Master the art of quick fact-checking with this simple three-step process that takes less than 30 seconds to verify most claims.',
    citations: [
      'https://www.snopes.com/fact-check/',
      'https://www.factcheck.org/our-process/',
    ],
    accessibility: { captions: true },
    status: 'approved',
    review: {
      accuracy: 3,
      context: 2,
      clarity: 1,
      safety: 2,
      decidedBy: reviewer.id,
      decidedAt: now,
    },
    score: 8,
    createdAt: now,
  };

  const asset5: Asset = {
    id: generateId(),
    creatorId: creator1.id,
    type: 'video',
    topic: 'ad-transparency',
    title: 'Influencer Marketing Disclosure Rules',
    link: 'https://example.com/video3',
    caption: 'Understanding FTC guidelines for influencer marketing and why proper disclosure matters for content creators and consumers alike.',
    citations: [
      'https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers',
    ],
    accessibility: { captions: true },
    status: 'pending',
    score: 0,
    createdAt: now,
  };

  const asset6: Asset = {
    id: generateId(),
    creatorId: creator2.id,
    type: 'carousel',
    topic: 'deepfake',
    title: 'Audio Deepfakes: What to Listen For',
    link: 'https://example.com/carousel2',
    caption: 'Learn to identify synthetic audio by listening for these subtle but telltale signs that reveal AI-generated voice content.',
    citations: [
      'https://arxiv.org/abs/2104.03617',
    ],
    accessibility: { captions: false },
    status: 'pending',
    score: 0,
    createdAt: now,
  };

  const asset7: Asset = {
    id: generateId(),
    creatorId: creator1.id,
    type: 'script',
    topic: 'verify-30s',
    title: 'Reverse Image Search Workshop',
    link: 'https://example.com/script2',
    caption: 'A hands-on workshop script teaching participants how to use reverse image search to verify the authenticity and source of images.',
    citations: [],
    accessibility: { captions: false },
    status: 'rejected',
    review: {
      accuracy: 2,
      context: 1,
      clarity: 1,
      safety: 1,
      notes: 'Needs at least 2 citations to credible sources',
      decidedBy: reviewer.id,
      decidedAt: dayAgo,
    },
    score: 5,
    createdAt: weekAgo,
  };

  const assets = [asset1, asset2, asset3, asset4, asset5, asset6, asset7];

  // Events
  const event1: Event = {
    id: generateId(),
    ambassadorId: ambassador1.id,
    dateISO: dayAgo,
    location: 'Community Center A',
    attendees: 45,
    preAvg: 40,
    postAvg: 65,
    deltaPct: 62.5,
    assetsUsed: [asset1.id, asset2.id],
    recapLink: 'https://example.com/event-recap-1',
    rightOfReply: true,
    createdAt: dayAgo,
  };

  const events = [event1];

  // Points Ledger
  const ledger: PointsLedger[] = [
    // Creator1 points
    {
      id: generateId(),
      memberId: creator1.id,
      role: 'creator',
      points: 10,
      reason: 'Asset approved: How to Spot Hidden Ads',
      refType: 'asset',
