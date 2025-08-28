#!/usr/bin/env node

/**
 * MIL-CAN Quick Setup Script
 * This script creates a minimal but working Next.js application
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

console.log('🚀 Setting up MIL-CAN Application\n');

// Create all directories
const directories = [
  'app',
  'app/assets',
  'app/creator',
  'app/creator/submit',
  'app/leaderboard',
  'app/kit',
  'lib',
  'components',
  'public'
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

* {
  @apply border-border;
}
body {
  @apply bg-background text-foreground;
}`);

// Create app/layout.tsx
writeFile('app/layout.tsx', `import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MIL-CAN',
  description: 'Media & Information Literacy Network',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          <header className="border-b">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex items-center justify-between">
                <a href="/" className="text-2xl font-bold">MIL-CAN</a>
                <div className="flex gap-4">
                  <a href="/assets" className="hover:underline">Assets</a>
                  <a href="/leaderboard" className="hover:underline">Leaderboard</a>
                  <a href="/kit" className="hover:underline">Kit</a>
                </div>
              </nav>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="border-t mt-auto">
            <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
              © 2024 MIL-CAN
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}`);

// Create app/page.tsx
writeFile('app/page.tsx', `export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold mb-4">MIL-CAN</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Media & Information Literacy Creators & Ambassadors Network
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/creator/submit" className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-2 text-primary-foreground hover:bg-primary/90">
            Submit Content
          </a>
          <a href="/assets" className="inline-flex items-center justify-center rounded-md border px-8 py-2 hover:bg-accent">
            Browse Assets
          </a>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-2">What We Do</h2>
          <p className="text-muted-foreground">
            Create and curate educational content that teaches media literacy skills.
          </p>
        </div>
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-2">How to Join</h2>
          <p className="text-muted-foreground">
            Become a Creator or Ambassador and earn points for your contributions.
          </p>
        </div>
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-2">Safety First</h2>
          <p className="text-muted-foreground">
            We prioritize safety with our Code of Conduct and Right-of-Reply policy.
          </p>
        </div>
      </section>
    </div>
  )
}`);

// Create app/assets/page.tsx
writeFile('app/assets/page.tsx', `'use client'

import { useState } from 'react'

export default function AssetsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const assets = [
    {
      id: '1',
      title: 'How to Spot Hidden Ads',
      type: 'video',
      topic: 'ad-transparency',
      creator: '@chriscreates',
      link: 'https://example.com/video1'
    },
    {
      id: '2',
      title: 'Before/After Photo Tricks',
      type: 'carousel',
      topic: 'before-after',
      creator: '@chriscreates',
      link: 'https://example.com/carousel1'
    },
    {
      id: '3',
      title: 'Deepfake Detection Guide',
      type: 'script',
      topic: 'deepfake',
      creator: '@caseycontent',
      link: 'https://example.com/script1'
    }
  ]

  const filteredAssets = assets.filter(asset =>
    asset.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Approved Assets</h1>

      <input
        type="text"
        placeholder="Search assets..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-64 px-3 py-2 border rounded-md"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map(asset => (
          <div key={asset.id} className="rounded-lg border p-6 space-y-4">
            <h3 className="font-semibold">{asset.title}</h3>
            <div className="flex gap-2">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                {asset.type}
              </span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                {asset.topic}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">By {asset.creator}</p>
            <a
              href={asset.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90"
            >
              View Asset
            </a>
          </div>
        ))}
      </div>

      {filteredAssets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No assets found</p>
        </div>
      )}
    </div>
  )
}`);

// Create app/creator/submit/page.tsx
writeFile('app/creator/submit/page.tsx', `'use client'

import { useState } from 'react'

export default function CreatorSubmitPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6 py-12">
        <div className="text-6xl">🎉</div>
        <h1 className="text-3xl font-bold">Thank You!</h1>
        <p className="text-lg text-muted-foreground">
          Your asset has been submitted for review.
        </p>
        <a href="/assets" className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded">
          View Assets
        </a>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Submit Educational Asset</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name *</label>
            <input type="text" required className="w-full px-3 py-2 border rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <input type="email" required className="w-full px-3 py-2 border rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Asset Type *</label>
            <select required className="w-full px-3 py-2 border rounded-md">
              <option value="">Select type</option>
              <option value="video">Video</option>
              <option value="carousel">Carousel</option>
              <option value="script">Script</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Topic *</label>
            <select required className="w-full px-3 py-2 border rounded-md">
              <option value="">Select topic</option>
              <option value="ad-transparency">Spot the #ad</option>
              <option value="before-after">Before/After traps</option>
              <option value="deepfake">Deepfake tells</option>
              <option value="verify-30s">Verify in 30s</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input type="text" required maxLength={80} className="w-full px-3 py-2 border rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Link *</label>
            <input type="url" required className="w-full px-3 py-2 border rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Caption (min 80 chars) *</label>
            <textarea required minLength={80} rows={4} className="w-full px-3 py-2 border rounded-md" />
          </div>

          <div>
            <label className="flex items-center">
              <input type="checkbox" required className="mr-2" />
              <span className="text-sm">I consent to submit this content</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-8 py-2 bg-primary text-primary-foreground rounded hover:opacity-90"
        >
          Submit Asset
        </button>
      </form>
    </div>
  )
}`);

// Create app/leaderboard/page.tsx
writeFile('app/leaderboard/page.tsx', `export default function LeaderboardPage() {
  const leaderboard = [
    { name: 'Amy Ambassador', role: 'Ambassador', points: 35 },
    { name: 'Chris Creator', role: 'Creator', points: 23 },
    { name: 'Andy Advocate', role: 'Ambassador', points: 20 },
    { name: 'Casey Content', role: 'Creator', points: 10 },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Leaderboard</h1>

      <div className="space-y-4">
        {leaderboard.map((member, index) => (
          <div key={index} className="rounded-lg border p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-muted-foreground">#{index + 1}</div>
              <div>
                <div className="font-semibold">{member.name}</div>
                <div className="text-sm text-muted-foreground">{member.role}</div>
              </div>
            </div>
            <div className="text-2xl font-bold">{member.points} pts</div>
          </div>
        ))}
      </div>
    </div>
  )
}`);

// Create app/kit/page.tsx
writeFile('app/kit/page.tsx', `export default function KitPage() {
  const resources = [
    { name: 'Presentation Slides', description: 'Ready-to-use slides for your event' },
    { name: 'Facilitator Guide', description: 'Step-by-step instructions' },
    { name: 'Code of Conduct', description: 'Safety guidelines for events' },
    { name: 'Activity Templates', description: 'Interactive exercises' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Event Kit</h1>
      <p className="text-lg text-muted-foreground">
        Download resources to run media literacy events.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {resources.map((resource, index) => (
          <div key={index} className="rounded-lg border p-6 space-y-4">
            <h3 className="font-semibold">{resource.name}</h3>
            <p className="text-sm text-muted-foreground">{resource.description}</p>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90">
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}`);

// Create lib/utils.ts
writeFile('lib/utils.ts', `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`);

console.log('\n✅ Setup complete!');
console.log('\nYour MIL-CAN application structure has been created.');
console.log('\nNow run:');
console.log('  npm run dev');
console.log('\nThen visit http://localhost:3000');
