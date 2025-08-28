const fs = require('fs');
const path = require('path');

// Create directory recursively
function createDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
  console.log(`✓ Created directory: ${dirPath}`);
}

// Write file with content
function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    createDir(dir);
  }
  fs.writeFileSync(filePath, content);
  console.log(`✓ Created file: ${filePath}`);
}

console.log('🚀 Initializing MIL-CAN project structure...\n');

// Create all directories
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
  'public/kit',
  'styles'
];

directories.forEach(createDir);

// Create app/globals.css
writeFile('app/globals.css', `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.75rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

@layer utilities {
  .focus-ring {
    @apply focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background;
  }
}
`);

// Create lib/cn.ts
writeFile('lib/cn.ts', `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`);

// Create lib/ids.ts
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
}
`);

// Create lib/i18n.ts
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
}
`);

// Create lib/types.ts
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
}
`);

// Create placeholder PDFs
writeFile('public/kit/slides.pdf', 'PDF placeholder - Slides');
writeFile('public/kit/ad-transparency.pdf', 'PDF placeholder - Ad Transparency');
writeFile('public/kit/claim-check.pdf', 'PDF placeholder - Claim Check');
writeFile('public/kit/tactics.pdf', 'PDF placeholder - Tactics');
writeFile('public/kit/facilitator.pdf', 'PDF placeholder - Facilitator Guide');
writeFile('public/kit/code-of-conduct.pdf', 'PDF placeholder - Code of Conduct');
writeFile('public/kit/right-of-reply.pdf', 'PDF placeholder - Right of Reply');

console.log('\n✅ Project structure initialized successfully!');
console.log('\nNext steps:');
console.log('1. Run: npm install');
console.log('2. Run: npm run dev');
console.log('\nThe project will be available at http://localhost:3000');
