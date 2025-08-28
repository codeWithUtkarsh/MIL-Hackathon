#!/usr/bin/env node

/**
 * MIL-CAN Complete Application Builder
 * This script generates the entire MIL-CAN Next.js application
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

console.log('🚀 Building MIL-CAN Next.js Application\n');

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
  'components/ui',
  'components/forms',
  'components/modals',
  'components/tables',
  'components/charts',
  'lib',
  'lib/store',
  'public',
  'public/kit'
];

directories.forEach(createDir);

// ============================================
// APP FILES
// ============================================

// app/globals.css
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
}`);

// app/layout.tsx
writeFile('app/layout.tsx', `import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MIL-CAN - Media & Information Literacy Network',
  description: 'Creators & Ambassadors Network for Media Literacy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          <header className="border-b">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex items-center justify-between">
                <a href="/" className="text-2xl font-bold">MIL-CAN</a>
                <div className="flex items-center gap-6">
                  <a href="/assets" className="hover:underline">Assets</a>
                  <a href="/leaderboard" className="hover:underline">Leaderboard</a>
                  <a href="/kit" className="hover:underline">Event Kit</a>
                </div>
              </nav>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="border-t mt-auto">
            <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
              © 2024 MIL-CAN. Built for media literacy education.
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}`);

// app/page.tsx
writeFile('app/page.tsx', `export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold mb-4">MIL-CAN</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Media & Information Literacy Creators & Ambassadors Network - Building critical thinking
          skills for the digital age through community-driven education.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/creator/submit" className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-2 text-primary-foreground hover:bg-primary/90">
            Submit Content
          </a>
          <a href="/events/new" className="inline-flex items-center justify-center rounded-md border px-8 py-2 hover:bg-accent">
            Report Event
          </a>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="rounded-2xl border p-6">
          <h2 className="text-xl font-semibold mb-2">What We Do</h2>
          <p className="text-muted-foreground">
            We create and curate educational content that teaches media literacy skills,
            helping people identify misinformation, deepfakes, and sponsored content.
          </p>
        </div>

        <div className="rounded-2xl border p-6">
          <h2 className="text-xl font-semibold mb-2">How to Join</h2>
          <p className="text-muted-foreground">
            Become a Creator by submitting educational assets, or an Ambassador by hosting
            events. Earn points and recognition for your contributions.
          </p>
        </div>

        <div className="rounded-2xl border p-6">
          <h2 className="text-xl font-semibold mb-2">Safety First</h2>
          <p className="text-muted-foreground">
            We prioritize participant safety with our Right-of-Reply policy and comprehensive
            Code of Conduct for all events and content.
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="grid md:grid-cols-4 gap-4">
        <a href="/assets" className="rounded-lg border p-6 hover:bg-accent text-center">
          <div className="text-lg font-medium">Browse Assets</div>
        </a>
        <a href="/leaderboard" className="rounded-lg border p-6 hover:bg-accent text-center">
          <div className="text-lg font-medium">Leaderboard</div>
        </a>
        <a href="/kit" className="rounded-lg border p-6 hover:bg-accent text-center">
          <div className="text-lg font-medium">Event Kit</div>
        </a>
        <a href="/dashboard" className="rounded-lg border p-6 hover:bg-accent text-center">
          <div className="text-lg font-medium">Dashboard</div>
        </a>
      </section>
    </div>
  )
}`);

// app/assets/page.tsx
writeFile('app/assets/page.tsx', `'use client'

import { useState } from 'react'

export default function AssetsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('all')
  const [selectedType, setSelectedType] = useState('all')

  // Demo data
  const assets = [
    {
      id: '1',
      title: 'How to Spot Hidden Ads in 30 Seconds',
      type: 'video',
      topic: 'ad-transparency',
      creator: '@chriscreates',
      citations: 2,
      link: 'https://example.com/video1'
    },
    {
      id: '2',
      title: 'Before/After Photo Tricks Exposed',
      type: 'carousel',
      topic: 'before-after',
      creator: '@chriscreates',
      citations: 2,
      link: 'https://example.com/carousel1'
    },
    {
      id: '3',
      title: 'Deepfake Detection Script for Educators',
      type: 'script',
      topic: 'deepfake',
      creator: '@caseycontent',
      citations: 2,
      link: 'https://example.com/script1'
    },
    {
      id: '4',
      title: 'Quick Fact-Check: The 30-Second Method',
      type: 'video',
      topic: 'verify-30s',
      creator: '@caseycontent',
      citations: 2,
      link: 'https://example.com/video2'
    }
  ]

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          asset.creator.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTopic = selectedTopic === 'all' || asset.topic === selectedTopic
    const matchesType = selectedType === 'all' || asset.type === selectedType
    return matchesSearch && matchesTopic && matchesType
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Approved Assets</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search assets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex h-10 w-full md:w-64 rounded-md border border-input bg-background px-3 py-2 text-sm"
        />

        <select
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="all">All Topics</option>
          <option value="ad-transparency">Spot the #ad</option>
          <option value="before-after">Before/After traps</option>
          <option value="deepfake">Deepfake tells</option>
          <option value="verify-30s">Verify in 30s</option>
        </select>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="all">All Types</option>
          <option value="video">Video</option>
          <option value="carousel">Carousel</option>
          <option value="script">Script</option>
        </select>
      </div>

      {/* Assets Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map(asset => (
          <div key={asset.id} className="rounded-2xl border p-6 space-y-4">
            <h3 className="font-semibold">{asset.title}</h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                {asset.topic}
              </span>
              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10">
                {asset.type}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Creator: {asset.creator}</p>
              <p>Citations: {asset.citations}</p>
            </div>
            <a
              href={asset.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
            >
              View Asset
            </a>
          </div>
        ))}
      </div>

      {filteredAssets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground mb-4">📦 No assets found</p>
          <a href="/creator/submit" className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-primary-foreground hover:bg-primary/90">
            Submit First Asset
          </a>
        </div>
      )}
    </div>
  )
}`);

// app/creator/submit/page.tsx
writeFile('app/creator/submit/page.tsx', `'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreatorSubmitPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Redirect to thanks page with a mock ID
    router.push('/creator/thanks/demo-asset-id')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Submit Educational Asset</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Creator Information */}
        <div className="rounded-lg border p-6 space-y-4">
          <h2 className="text-lg font-semibold">Creator Information</h2>

          <div>
            <label className="block text-sm font-medium mb-2">Name *</label>
            <input
              type="text"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <input
              type="email"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Handle *</label>
            <input
              type="text"
              required
              placeholder="@username"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Languages *</label>
            <select
              multiple
              required
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="zh">Mandarin</option>
            </select>
            <p className="text-xs text-muted-foreground mt-1">Hold Ctrl/Cmd to select multiple</p>
          </div>
        </div>

        {/* Asset Details */}
        <div className="rounded-lg border p-6 space-y-4">
          <h2 className="text-lg font-semibold">Asset Details</h2>

          <div>
            <label className="block text-sm font-medium mb-2">Asset Type *</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="radio" name="assetType" value="video" required className="mr-2" />
                Video
              </label>
              <label className="flex items-center">
                <input type="radio" name="assetType" value="carousel" required className="mr-2" />
                Carousel
              </label>
              <label className="flex items-center">
                <input type="radio" name="assetType" value="script" required className="mr-2" />
                Script
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Topic *</label>
            <select
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Select a topic</option>
              <option value="ad-transparency">Spot the #ad</option>
              <option value="before-after">Before/After traps</option>
              <option value="deepfake">Deepfake tells</option>
              <option value="verify-30s">Verify in 30s</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Title * (max 80 chars)</label>
            <input
              type="text"
              required
              maxLength={80}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Link *</label>
            <input
              type="url"
              required
              placeholder="https://..."
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Caption * (min 80 chars)</label>
            <textarea
              required
              minLength={80}
              rows={4}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Citations * (min 2, one per line)</label>
            <textarea
              required
              rows={4}
              placeholder="https://source1.com\nhttps://source2.com"
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1">Enter at least 2 credible source URLs</p>
          </div>

          <div>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              This asset has captions/accessibility features
            </label>
          </div>
        </div>

        {/* Consent */}
        <div className="rounded-lg border p-6">
          <label className="flex items-start">
            <input type="checkbox" required className="mr-2 mt-1" />
            <span className="text-sm">
              I consent to the submission of this educational content and confirm that it follows
              the MIL-CAN guidelines and code of conduct. *
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center rounded-md bg-primary px-8 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Asset'}
        </button>
      </form>
    </div>
  )
}`);

// app/creator/thanks/[assetId]/page.tsx
writeFile('app/creator/thanks/[assetId]/page.tsx', `export default function CreatorThanksPage() {
  return (
    <div className="max-w-2xl mx-auto text-center space-y-6 py-12">
      <div className="text-6xl">🎉</div>
      <h1 className="text-3xl font-bold">Thank You for Your Submission!</h1>
      <p className="text-lg text-muted-foreground">
        Your educational asset has been successfully submitted and is now pending review.
      </p>

      <div className="rounded-lg border p-6 text-left space-y-4">
        <h2 className="text-lg font-semibold">What happens next?</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>✓ Your submission will be reviewed within 24-48 hours</li>
          <li>✓ You'll receive an email notification when the review is complete</li>
          <li>✓ If approved, you'll earn 10 points plus bonus points for citations</li>
          <li>✓ Your asset will appear on the public assets page</li>
        </ul>
      </div>

      <div className="flex gap-4 justify-center">
        <a href="/assets" className="inline-flex items-center justify-center rounded-md border px-6 py-2 hover:bg-accent">
          View Assets
        </a>
        <a href="/creator/submit" className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-primary-foreground hover:bg-primary/90">
          Submit Another
        </a>
      </div>
    </div>
  )
}`);

// app/leaderboard/page.tsx
writeFile('app/leaderboard/page.tsx', `'use client'

import { useState } from 'react'

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState('creators')

  const creators = [
    { id: 1, name: 'Chris Creator', handle: '@chriscreates', campus: 'North Campus', points: 23 },
    { id: 2, name: 'Casey Content', handle: '@caseycontent', campus: 'South Campus', points: 10 },
  ]

  const ambassadors = [
    { id: 1, name: 'Amy Ambassador', handle: '@amyambassador', campus: 'East Campus', points: 35 },
    { id: 2, name: 'Andy Advocate', handle: '@andyadvocate', campus: 'West Campus', points: 20 },
  ]

  const currentList = activeTab === 'creators' ? creators : ambassadors

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Leaderboard</h1>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab('creators')}
          className={\`px-4 py-2 -mb-px border-b-2 \${
            activeTab === 'creators' ? 'border-primary text-primary' : 'border-transparent'
          }\`}
        >
          Creators
        </button>
        <button
          onClick={() => setActiveTab('ambassadors')}
          className={\`px-4 py-2 -mb-px border-b-2 \${
            activeTab === 'ambassadors' ? 'border-primary text-primary' : 'border-transparent'
          }\`}
        >
          Ambassadors
        </button>
      </div>

      {/* Leaderboard List */}
      <div className="space-y-4">
        {currentList.map((member, index) => (
          <div key={member.id} className="rounded-lg border p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-muted-foreground">#{index + 1}</div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="font-semibold">{member.name}</div>
                <div className="text-sm text-muted-foreground">{member.handle} • {member.campus}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{member.points}</div>
              <div className="text-sm text-muted-foreground">points</div>
            </div>
          </div>
        ))}
      </div>

      {currentList.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">👥 No members found</p>
        </div>
      )}
    </div>
  )
}`);

// app/kit/page.tsx
writeFile('app/kit/page.tsx', `export default function KitPage() {
  const resources = [
    { name: 'Presentation Slides', file: 'slides.pdf', icon: '📊' },
    { name: 'Ad Transparency Guide', file: 'ad-transparency.pdf', icon: '👁️' },
    { name: 'Claim Check Guide', file: 'claim-check.pdf', icon: '✅' },
    { name: 'Tactics Overview', file: 'tactics.pdf', icon: '🎯' },
    { name: 'Facilitator Guide', file: 'facilitator.pdf', icon: '👨‍🏫' },
    { name: 'Code of Conduct', file: 'code-of-conduct.pdf', icon: '📜' },
    { name: 'Right of Reply Template', file: 'right-of-reply.pdf', icon: '💬' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Event Kit</h1>
      <p className="text-lg text-muted-foreground">
        Download resources to run successful media literacy events in your community.
      </p>

      {/* Resources Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map(resource => (
          <div key={resource.file} className="rounded-lg border p-6 space-y-4">
            <div className="text-4xl text-center">{resource.icon}</div>
            <h3 className="font-semibold text-center">{resource.name}</h3>
            <a
              href={\`/kit/\${resource.file}\`}
              download
              className="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
            >
              Download PDF
            </a>
          </div>
        ))}
      </div>

      {/* Mini Lessons */}
      <div className="rounded-lg border p-6 space-y-4">
        <h2 className="text-xl font-semibold">Quick Lessons</h2>

        <details className="border rounded-lg p-4">
          <summary className="font-medium cursor-pointer">Spot the #ad</summary>
          <div className="mt-4 text-muted-foreground space-y-2">
            <p>Learn to identify undisclosed sponsored content:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Look for product placement and brand mentions</li>
              <li>Check for disclosure hashtags like #ad, #sponsored</li>
              <li>Notice when creators suddenly promote products</li>
              <li>Be aware of affiliate link indicators</li>
            </ul>
          </div>
        </details>

        <details className="border rounded-lg p-4">
          <summary className="font-medium cursor-pointer">Before/After Traps</summary>
          <div className="mt-4 text-muted-foreground space-y-2">
            <p>Understand how before/after photos can be misleading:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Different lighting can dramatically change appearance</li>
              <li>Posture and angles affect perception</li>
              <li>Time of day impacts bloating and muscle definition</li>
              <li>Filters and editing tools can enhance differences
