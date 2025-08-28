#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Helper to create directories recursively
function createDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

// Helper to write files
function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    createDir(dir);
  }
  fs.writeFileSync(filePath, content);
  console.log(`✓ Created: ${filePath}`);
}

console.log('🚀 Creating MIL-CAN Next.js Application...\n');

// Create directory structure
const dirs = [
  'app', 'app/assets', 'app/creator/submit', 'app/creator/thanks/[assetId]',
  'app/review', 'app/review/[assetId]', 'app/events/new', 'app/events/thanks/[eventId]',
  'app/leaderboard', 'app/kit', 'app/dashboard', 'app/admin',
  'components', 'components/ui', 'components/forms', 'components/modals',
  'components/tables', 'components/charts', 'lib', 'lib/store', 'public/kit'
];
dirs.forEach(createDir);

// ============= CORE FILES =============

// app/layout.tsx
writeFile('app/layout.tsx', `import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

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
        <Providers>
          <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}`);

// app/page.tsx
writeFile('app/page.tsx', `import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, Users, BookOpen, Award } from 'lucide-react'

export default function HomePage() {
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
          <Button asChild size="lg">
            <Link href="/creator/submit">Submit Content</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/events/new">Report Event</Link>
          </Button>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <Shield className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>What We Do</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              We create and curate educational content that teaches media literacy skills,
              helping people identify misinformation, deepfakes, and sponsored content.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Users className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>How to Join</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Become a Creator by submitting educational assets, or an Ambassador by hosting
              events. Earn points and recognition for your contributions.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <BookOpen className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Safety First</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              We prioritize participant safety with our Right-of-Reply policy and comprehensive
              Code of Conduct for all events and content.
            </CardDescription>
          </CardContent>
        </Card>
      </section>

      {/* Quick Links */}
      <section className="grid md:grid-cols-4 gap-4">
        <Button asChild variant="secondary" className="h-24">
          <Link href="/assets" className="flex flex-col items-center justify-center">
            <Award className="h-6 w-6 mb-2" />
            Browse Assets
          </Link>
        </Button>
        <Button asChild variant="secondary" className="h-24">
          <Link href="/leaderboard" className="flex flex-col items-center justify-center">
            <Award className="h-6 w-6 mb-2" />
            Leaderboard
          </Link>
        </Button>
        <Button asChild variant="secondary" className="h-24">
          <Link href="/kit" className="flex flex-col items-center justify-center">
            <BookOpen className="h-6 w-6 mb-2" />
            Event Kit
          </Link>
        </Button>
        <Button asChild variant="secondary" className="h-24">
          <Link href="/dashboard" className="flex flex-col items-center justify-center">
            <Shield className="h-6 w-6 mb-2" />
            Dashboard
          </Link>
        </Button>
      </section>
    </div>
  )
}`);

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

// Components
writeFile('components/providers.tsx', `'use client'

import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/toaster'
import { useEffect } from 'react'
import { useStore } from '@/lib/store'

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Hydrate store on mount
    useStore.getState().hydrate()
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <Toaster />
    </ThemeProvider>
  )
}`);

writeFile('components/header.tsx', `'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'
import { RoleSwitcher } from '@/components/role-switcher'
import { useStore } from '@/lib/store'
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export function Header() {
  const currentRole = useStore((state) => state.currentRole)

  const navItems = [
    { href: '/assets', label: 'Assets' },
    { href: '/leaderboard', label: 'Leaderboard' },
    { href: '/kit', label: 'Event Kit' },
  ]

  if (currentRole === 'reviewer' || currentRole === 'admin') {
    navItems.push({ href: '/review', label: 'Review' })
    navItems.push({ href: '/dashboard', label: 'Dashboard' })
  }

  if (currentRole === 'admin') {
    navItems.push({ href: '/admin', label: 'Admin' })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-xl">
            MIL-CAN
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <RoleSwitcher />
          {(currentRole === 'ambassador' || currentRole === 'admin') && (
            <Button asChild variant="outline">
              <Link href="/events/new">New Event</Link>
            </Button>
          )}
          <ModeToggle />

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}`);

writeFile('components/footer.tsx', `export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © 2024 MIL-CAN. Built for media literacy education.
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  )
}`);

writeFile('components/mode-toggle.tsx', `'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}`);

writeFile('components/role-switcher.tsx', `'use client'

import { useStore } from '@/lib/store'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function RoleSwitcher() {
  const { currentRole, setCurrentRole } = useStore()

  return (
    <Select value={currentRole} onValueChange={setCurrentRole}>
      <SelectTrigger className="w-[140px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="public">Public</SelectItem>
        <SelectItem value="creator">Creator</SelectItem>
        <SelectItem value="ambassador">Ambassador</SelectItem>
        <SelectItem value="reviewer">Reviewer</SelectItem>
        <SelectItem value="admin">Admin</SelectItem>
      </SelectContent>
    </Select>
  )
}`);

// UI Components
writeFile('components/ui/button.tsx', `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/cn"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }`);

writeFile('components/ui/card.tsx', `import * as React from "react"
import { cn } from "@/lib/cn"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }`);

// Core library files
writeFile('lib/cn.ts', `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`);

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

// Add remaining essential UI components
writeFile('components/ui/toaster.tsx', `'use client'

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}`);

writeFile('components/ui/use-toast.ts', `import * as React from "react"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if
