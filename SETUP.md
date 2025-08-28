# MIL-CAN Setup Guide

## 🚀 Quick Setup

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation Steps

1. **Clone or create the project directory:**
```bash
mkdir mil-can && cd mil-can
```

2. **Initialize the Next.js project:**
```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir=false --import-alias "@/*"
```

When prompted:
- Would you like to use ESLint? → Yes
- Would you like to use `src/` directory? → No
- Would you like to use App Router? → Yes
- Would you like to customize the default import alias? → No

3. **Install dependencies:**
```bash
npm install @hookform/resolvers@^3.3.4 \
  @radix-ui/react-accordion@^1.1.2 \
  @radix-ui/react-checkbox@^1.0.4 \
  @radix-ui/react-dialog@^1.0.5 \
  @radix-ui/react-dropdown-menu@^2.0.6 \
  @radix-ui/react-icons@^1.3.0 \
  @radix-ui/react-label@^2.0.2 \
  @radix-ui/react-popover@^1.0.7 \
  @radix-ui/react-radio-group@^1.1.3 \
  @radix-ui/react-scroll-area@^1.0.5 \
  @radix-ui/react-select@^2.0.0 \
  @radix-ui/react-separator@^1.0.3 \
  @radix-ui/react-sheet@^1.0.0 \
  @radix-ui/react-slot@^1.0.2 \
  @radix-ui/react-switch@^1.0.3 \
  @radix-ui/react-tabs@^1.0.4 \
  @radix-ui/react-toast@^1.1.5 \
  @radix-ui/react-tooltip@^1.0.7 \
  class-variance-authority@^0.7.0 \
  clsx@^2.1.0 \
  cmdk@^0.2.1 \
  date-fns@^3.3.1 \
  lucide-react@^0.315.0 \
  next-themes@^0.2.1 \
  react-day-picker@^8.10.0 \
  react-hook-form@^7.49.3 \
  recharts@^2.11.0 \
  tailwind-merge@^2.2.1 \
  tailwindcss-animate@^1.0.7 \
  ulid@^2.3.0 \
  zod@^3.22.4 \
  zustand@^4.5.0
```

4. **Install dev dependencies:**
```bash
npm install -D @types/node@^20.11.7 \
  @types/react@^18.2.48 \
  @types/react-dom@^18.2.18 \
  vitest@^1.2.2
```

5. **Setup shadcn/ui:**
```bash
npx shadcn-ui@latest init
```

When prompted:
- Would you like to use TypeScript? → Yes
- Which style would you like to use? → Default
- Which color would you like to use as base color? → Slate
- Where is your global CSS file? → app/globals.css
- Would you like to use CSS variables for colors? → Yes
- Where is your tailwind.config.js located? → tailwind.config.ts
- Configure the import alias for components? → @/components
- Configure the import alias for utils? → @/lib/utils

6. **Add shadcn/ui components:**
```bash
npx shadcn-ui@latest add button card input textarea select \
  badge tooltip tabs table dialog toast sheet accordion \
  checkbox radio-group switch popover command dropdown-menu \
  label separator scroll-area avatar alert form
```

7. **Create the application structure:**

Create a file called `setup.js` in the project root:

```javascript
const fs = require('fs');
const path = require('path');

// Helper functions
function createDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
  console.log(`✓ Created: ${dirPath}`);
}

function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    createDir(dir);
  }
  fs.writeFileSync(filePath, content);
  console.log(`✓ Created: ${filePath}`);
}

// Create directories
const dirs = [
  'app/assets',
  'app/creator/submit',
  'app/creator/thanks/[assetId]',
  'app/review',
  'app/review/[assetId]',
  'app/events/new',
  'app/events/thanks/[eventId]',
  'app/leaderboard',
  'app/kit',
  'app/dashboard',
  'app/admin',
  'components/forms',
  'components/modals',
  'components/tables',
  'components/charts',
  'lib/store',
  'public/kit'
];

dirs.forEach(createDir);

// Create placeholder PDFs
['slides', 'ad-transparency', 'claim-check', 'tactics', 'facilitator', 'code-of-conduct', 'right-of-reply'].forEach(name => {
  writeFile(`public/kit/${name}.pdf`, 'PDF placeholder');
});

console.log('\n✅ Directory structure created!');
```

Run the setup script:
```bash
node setup.js
```

8. **Download and apply the complete source code:**

Due to the size of the complete application, you'll need to download the source files from the repository or copy them manually. The key files to create are:

### Core Library Files (`lib/`)
- `lib/types.ts` - TypeScript type definitions
- `lib/ids.ts` - ULID generator
- `lib/i18n.ts` - Internationalization strings
- `lib/validate.ts` - Zod validation schemas
- `lib/calc.ts` - Points calculation logic
- `lib/persist.ts` - LocalStorage helpers
- `lib/seed.ts` - Demo data generator
- `lib/store/index.ts` - Zustand store

### App Routes (`app/`)
- `app/layout.tsx` - Root layout with providers
- `app/page.tsx` - Landing page
- `app/assets/page.tsx` - Assets browser
- `app/creator/submit/page.tsx` - Asset submission form
- `app/creator/thanks/[assetId]/page.tsx` - Submission confirmation
- `app/review/page.tsx` - Review dashboard
- `app/review/[assetId]/page.tsx` - Asset review page
- `app/events/new/page.tsx` - Event report form
- `app/events/thanks/[eventId]/page.tsx` - Event confirmation
- `app/leaderboard/page.tsx` - Points leaderboard
- `app/kit/page.tsx` - Event kit downloads
- `app/dashboard/page.tsx` - Metrics dashboard
- `app/admin/page.tsx` - Admin panel

### Components (`components/`)
- `components/providers.tsx` - App providers wrapper
- `components/header.tsx` - Navigation header
- `components/footer.tsx` - Site footer
- `components/role-switcher.tsx` - Role selection
- `components/mode-toggle.tsx` - Dark mode toggle

9. **Update configuration files:**

**Update `tailwind.config.ts`:**
```typescript
import type { Config } from 'tailwindcss'

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  // ... rest of shadcn config
} satisfies Config

export default config
```

**Update `next.config.js`:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
}

module.exports = nextConfig
```

10. **Run the application:**
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📁 Project Structure

```
mil-can/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   ├── globals.css         # Global styles
│   ├── assets/            # Assets browser
│   ├── creator/           # Creator routes
│   ├── review/            # Review routes
│   ├── events/            # Event routes
│   ├── leaderboard/       # Leaderboard
│   ├── kit/              # Event kit
│   ├── dashboard/         # Dashboard
│   └── admin/            # Admin panel
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── forms/            # Form components
│   ├── modals/           # Modal dialogs
│   ├── tables/           # Table components
│   └── charts/           # Chart components
├── lib/
│   ├── store/            # Zustand store
│   ├── types.ts          # TypeScript types
│   ├── validate.ts       # Validation schemas
│   ├── calc.ts           # Calculations
│   ├── persist.ts        # LocalStorage
│   └── seed.ts           # Demo data
├── public/
│   └── kit/              # PDF downloads
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🧪 Testing

```bash
# Run tests
npm test

# Type checking
npm run typecheck

# Linting
npm run lint

# Build for production
npm run build
```

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy with default Next.js settings

### Deploy to other platforms

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🔧 Development Tips

### Adding new shadcn/ui components
```bash
npx shadcn-ui@latest add [component-name]
```

### Resetting demo data
The application automatically loads demo data on first run. To reset:
1. Open Developer Tools
2. Go to Application → Local Storage
3. Clear all `mil-can-*` entries
4. Refresh the page

### Customizing settings
Edit the default settings in `lib/store/index.ts` or use the Admin panel.

## 📚 Key Features

- **Multi-role system**: Creator, Ambassador, Reviewer, Admin
- **Asset management**: Submit, review, approve content
- **Event tracking**: Report events with impact metrics
- **Points system**: Automatic calculation and leaderboard
- **Data persistence**: LocalStorage with import/export
- **Dark mode**: System-aware theme switching
- **Accessibility**: WCAG 2.1 AA compliant
- **Responsive**: Mobile-first design

## 🤝 Support

For issues or questions, check:
- The README.md file
- Component documentation in the code
- Console for any error messages

## 📝 License

MIT