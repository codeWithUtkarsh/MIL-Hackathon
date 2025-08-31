# MIL-CAN - Media & Information Literacy Network

A platform connecting educators, content creators, and literacy advocates to combat misinformation and promote critical thinking in the digital age.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Test build locally before deployment
chmod +x test-build.sh
./test-build.sh
```

## 🧹 Cleanup Project

To remove documentation and test files for a cleaner directory:

```bash
# Make the cleanup script executable
chmod +x cleanup.sh

# Run the cleanup
./cleanup.sh
```

This will remove all test files, documentation files (except README), and unnecessary build scripts, keeping only essential source code and configuration.

## 🔐 Authentication

### Ambassador/Admin Accounts
- **Email:** utkarshkviim@gmail.com | **Password:** secure123
- **Email:** farheenimam331@gmail.com | **Password:** secure123

### Creator Demo Accounts
- **Email:** john.doe@example.com | **Password:** creator123
- **Email:** jane.smith@example.com | **Password:** creator123
- **Email:** alex.j@example.com | **Password:** creator123

## 🎯 Key Features

- **Dual Authentication System**: Separate sign-in for Ambassadors and Creators
- **Role-Based Dashboards**: Customized interfaces for different user types
- **Content Management**: Submit, review, and approve educational assets
- **Network Relationships**: Track Ambassador-Creator connections
- **Points & Leaderboard**: Gamified system to encourage participation
- **Event Tracking**: Monitor educational impact through events
- **Interactive Visualizations**: Network graphs and analytics charts

## 📊 User Roles

- **Creators**: Content producers who create educational materials
- **Ambassadors**: Educators who organize events and manage creator networks
- **Reviewers**: Quality control for submitted content
- **Admins**: Full system access and configuration

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod

## 📦 Project Structure

```
mil-can/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Home page with auth
│   ├── ambassador-dashboard.tsx
│   └── creator-dashboard.tsx
├── components/            # React components
│   ├── AmbassadorSigninPopup.tsx
│   ├── CreatorSigninPopup.tsx
│   └── NetworkGraphModal.tsx
├── lib/                   # Utilities and services
│   ├── auth-service.ts
│   ├── creator-auth-service.ts
│   └── store.ts
└── public/               # Static assets
```

## 🚢 Deployment

### Netlify Deployment

The app is configured for Netlify deployment with the included `netlify.toml` file.

**Correct Netlify Build Settings:**
- **Runtime:** Next.js
- **Base directory:** `/`
- **Build command:** `npm run build`
- **Publish directory:** `.next` *(Important: NOT "build")*
- **Functions directory:** Leave empty or "Not set"

⚠️ **Important**: The publish directory must be `.next`, not `build`. Next.js outputs to `.next` directory.

**Steps to Deploy:**
1. Test build locally: `npm run build`
2. Push your code to GitHub
3. Connect your GitHub repository to Netlify
4. Ensure Publish directory is set to `.next`
5. Click "Deploy site"

**Troubleshooting Build Errors:**
- If you see JSX syntax errors, check for mismatched tags
- If you see TypeScript errors, run `npm run build` locally first
- The `netlify.toml` file includes all necessary configuration

**Alternative: Deploy to Vercel**

For Vercel deployment:
1. Push to GitHub
2. Import project in Vercel
3. Deploy with default Next.js settings

No environment variables are required for either platform.

## 📝 License

MIT

---

Built with ❤️ for media literacy education