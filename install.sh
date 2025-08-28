#!/bin/bash

# MIL-CAN Installation Script
# This script sets up the complete MIL-CAN Next.js application

echo "🚀 Setting up MIL-CAN Application..."
echo "===================================="

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js and npm first."
    exit 1
fi

echo "📦 Installing core dependencies..."

# Core Next.js and React
npm install next@14.1.0 react@^18.2.0 react-dom@^18.2.0

# Form handling and validation
npm install react-hook-form@^7.49.3 @hookform/resolvers@^3.3.4 zod@^3.22.4

# State management
npm install zustand@^4.5.0

# UI Libraries
npm install class-variance-authority@^0.7.0 clsx@^2.1.0 tailwind-merge@^2.2.1 tailwindcss-animate@^1.0.7

# Radix UI Components (corrected package names)
npm install @radix-ui/react-accordion@^1.1.2 \
  @radix-ui/react-avatar@^1.0.4 \
  @radix-ui/react-checkbox@^1.0.4 \
  @radix-ui/react-dialog@^1.0.5 \
  @radix-ui/react-dropdown-menu@^2.0.6 \
  @radix-ui/react-label@^2.0.2 \
  @radix-ui/react-popover@^1.0.7 \
  @radix-ui/react-radio-group@^1.1.3 \
  @radix-ui/react-scroll-area@^1.0.5 \
  @radix-ui/react-select@^2.0.0 \
  @radix-ui/react-separator@^1.0.3 \
  @radix-ui/react-slot@^1.0.2 \
  @radix-ui/react-switch@^1.0.3 \
  @radix-ui/react-tabs@^1.0.4 \
  @radix-ui/react-toast@^1.1.5 \
  @radix-ui/react-tooltip@^1.0.7

# Icons and utilities
npm install lucide-react@^0.315.0 @radix-ui/react-icons@^1.3.0

# Additional utilities
npm install cmdk@^0.2.1 date-fns@^3.3.1 ulid@^2.3.0

# Theme support
npm install next-themes@^0.2.1

# Charts
npm install recharts@^2.11.0

# Date picker
npm install react-day-picker@^8.10.0

echo ""
echo "📦 Installing dev dependencies..."

# Dev dependencies
npm install --save-dev \
  @types/node@^20.11.7 \
  @types/react@^18.2.48 \
  @types/react-dom@^18.2.18 \
  @typescript-eslint/eslint-plugin@^6.19.1 \
  @typescript-eslint/parser@^6.19.1 \
  autoprefixer@^10.4.17 \
  eslint@^8.56.0 \
  eslint-config-next@14.1.0 \
  postcss@^8.4.33 \
  tailwindcss@^3.4.1 \
  typescript@^5.3.3 \
  vitest@^1.2.2

echo ""
echo "🎨 Setting up shadcn/ui..."

# Create components.json for shadcn/ui
cat > components.json << 'EOF'
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
EOF

echo "✓ components.json created"

echo ""
echo "📂 Creating directory structure..."

# Create all necessary directories
mkdir -p app/assets
mkdir -p app/creator/submit
mkdir -p "app/creator/thanks/[assetId]"
mkdir -p app/review
mkdir -p "app/review/[assetId]"
mkdir -p app/events/new
mkdir -p "app/events/thanks/[eventId]"
mkdir -p app/leaderboard
mkdir -p app/kit
mkdir -p app/dashboard
mkdir -p app/admin
mkdir -p components/ui
mkdir -p components/forms
mkdir -p components/modals
mkdir -p components/tables
mkdir -p components/charts
mkdir -p lib/store
mkdir -p public/kit

echo "✓ Directory structure created"

echo ""
echo "🎨 Installing shadcn/ui components..."

# Initialize shadcn/ui (skip if already initialized)
npx shadcn-ui@latest init --defaults

# Add all required shadcn/ui components
# Note: Using individual commands to avoid failures if some components don't exist
npx shadcn-ui@latest add button --yes
npx shadcn-ui@latest add card --yes
npx shadcn-ui@latest add input --yes
npx shadcn-ui@latest add textarea --yes
npx shadcn-ui@latest add select --yes
npx shadcn-ui@latest add badge --yes
npx shadcn-ui@latest add tooltip --yes
npx shadcn-ui@latest add tabs --yes
npx shadcn-ui@latest add table --yes
npx shadcn-ui@latest add dialog --yes
npx shadcn-ui@latest add toast --yes
npx shadcn-ui@latest add accordion --yes
npx shadcn-ui@latest add checkbox --yes
npx shadcn-ui@latest add radio-group --yes
npx shadcn-ui@latest add switch --yes
npx shadcn-ui@latest add popover --yes
npx shadcn-ui@latest add command --yes
npx shadcn-ui@latest add dropdown-menu --yes
npx shadcn-ui@latest add label --yes
npx shadcn-ui@latest add separator --yes
npx shadcn-ui@latest add scroll-area --yes
npx shadcn-ui@latest add avatar --yes
npx shadcn-ui@latest add alert --yes
npx shadcn-ui@latest add form --yes

# For sheet component (which doesn't exist in Radix), we'll use dialog instead
echo ""
echo "ℹ️  Note: Sheet component will be created using Dialog as base"

echo ""
echo "✅ Installation complete!"
echo ""
echo "Next steps:"
echo "1. Run the application generator scripts to create all source files"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Visit http://localhost:3000"
echo ""
echo "If you encounter any issues with shadcn/ui components:"
echo "- Some components might not exist yet in shadcn/ui"
echo "- You can skip failed components and create them manually"
echo "- The app will still work with the core components"
