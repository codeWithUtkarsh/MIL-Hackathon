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

The app is configured for easy deployment on Vercel:

1. Push to GitHub
2. Connect repository to Vercel
3. Deploy with default Next.js settings
4. No environment variables required

## 📝 License

MIT

---

Built with ❤️ for media literacy education