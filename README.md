# MIL Creators & Ambassadors Network (MIL-CAN)

A production-ready MVP for managing Media & Information Literacy content creation and ambassador events.

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

# Run tests
npm test

# Type checking
npm run typecheck

# Linting
npm run lint
```

## 🔐 Authentication

### Demo Admin Users

The app includes two pre-configured admin users:

**Utkarsh Sharma**
- Email: `utkarshkviim@gmail.com`
- Password: `secure123`
- Country: India
- Points: 200

**Farheen Imam**
- Email: `farheenimam331@gmail.com`
- Password: `secure123`
- Country: Pakistan  
- Points: 120

### How to Login

1. Click "Ambassador Sign In" on the home page
2. Use one of the demo admin emails above
3. Enter password: `secure123`
4. Access the ambassador dashboard

For detailed authentication documentation, see `AUTHENTICATION.md`.

## 📋 Features

- **Multi-role System**: Creator, Ambassador, Reviewer, Admin roles with specific permissions
- **Authentication System**: Secure login for ambassadors and admins
- **Content Management**: Submit, review, and approve educational assets
- **Event Tracking**: Ambassador event reporting with learning impact metrics
- **Points System**: Automated points calculation and leaderboard
- **Network Visualization**: Interactive graph showing creator-ambassador connections
- **User Management**: Pre-configured admin users with role-based access
- **Data Persistence**: LocalStorage-based with import/export functionality
- **Dark Mode**: System-aware theme switching
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Next.js App Router                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Pages   │  │  Forms   │  │  Tables  │  │  Charts  │  │
│  │  (RSC)   │  │  (RHF)   │  │(shadcn)  │  │(recharts)│  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘  │
│       └─────────────┴──────────────┴──────────────┘       │
│                            │                               │
│                   ┌────────▼────────┐                      │
│                   │  Zustand Store  │                      │
│                   │   (Persisted)   │                      │
│                   └────────┬────────┘                      │
│                            │                               │
│                   ┌────────▼────────┐                      │
│                   │   LocalStorage  │                      │
│                   │  (Data Layer)   │                      │
│                   └─────────────────┘                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📊 Data Models

### Member
- `id`: ULID
- `role`: "creator" | "ambassador" | "reviewer" | "admin"
- `name`: string
- `email`: string
- `handle`: string
- `campus`: string
- `languages`: string[]
- `points`: number
- `createdAt`: ISO string

### Asset
- `id`: ULID
- `creatorId`: Member ID
- `type`: "video" | "carousel" | "script"
- `topic`: "ad-transparency" | "before-after" | "deepfake" | "verify-30s"
- `title`: string (max 80 chars)
- `link`: URL
- `caption`: string (min 80 chars)
- `citations`: URL[] (min 2)
- `accessibility`: { captions: boolean }
- `status`: "pending" | "approved" | "rejected"
- `review`: Review object (optional)
- `score`: number (0-10)
- `createdAt`: ISO string

### Event
- `id`: ULID
- `ambassadorId`: Member ID
- `dateISO`: ISO date string
- `location`: string
- `attendees`: number (≥1)
- `preAvg`: percentage (0-100)
- `postAvg`: percentage (0-100)
- `deltaPct`: calculated percentage change
- `assetsUsed`: Asset ID[]
- `recapLink`: URL
- `rightOfReply`: boolean
- `safetyIssues`: string (optional)
- `createdAt`: ISO string

### PointsLedger
- `id`: ULID
- `memberId`: Member ID
- `role`: Member role at time of award
- `points`: number
- `reason`: string
- `refType`: "asset" | "event" | "bonus" | "admin"
- `refId`: Reference ID (optional)
- `timestamp`: ISO string

### Settings
- `brand`: { name: "MIL-CAN" }
- `caps`: { maxAssetsPerMonth: 2, maxEventsPerMonth: 2 }
- `scoring`: Points configuration object

## 🎯 Points System

### Creator Points
- **Asset Approved**: +10 points
- **Citations Bonus**: +3 points (if ≥2 citations)
- **Asset Used in Event**: +5 points per event

### Ambassador Points
- **Base Event Points**: +20 points
- **Learning Gain Bonus**: +10 points (if delta ≥20%)
- **Right of Reply**: +5 points

## 🧪 Testing Guide

### Manual Test Checklist

#### 1. Landing Page (`/`)
- [ ] All CTAs navigate correctly
- [ ] Modals open and are keyboard accessible
- [ ] Responsive on mobile/tablet/desktop

#### 2. Assets Page (`/assets`)
- [ ] Filters work correctly
- [ ] Only approved assets show
- [ ] Grid layout responsive
- [ ] Empty state displays when no results

#### 3. Creator Submit (`/creator/submit`)
- [ ] Form validation works
- [ ] Citations require ≥2 valid URLs
- [ ] Consent checkbox required
- [ ] Success redirects to thanks page

#### 4. Review Dashboard (`/review`)
- [ ] Role-gated (reviewer/admin only)
- [ ] Tabs filter correctly
- [ ] Bulk actions work
- [ ] Table sorting works

#### 5. Asset Review (`/review/[assetId]`)
- [ ] Rubric calculates score correctly
- [ ] Approve awards points
- [ ] Reject requires notes
- [ ] Navigation returns to dashboard

#### 6. Event Report (`/events/new`)
- [ ] Form validation works
- [ ] Delta calculation correct
- [ ] Points awarded correctly
- [ ] Asset creators get points

#### 7. Leaderboard (`/leaderboard`)
- [ ] Tabs work (Creators/Ambassadors)
- [ ] Points totals correct
- [ ] Badges display appropriately
- [ ] Filters work

#### 8. Kit Page (`/kit`)
- [ ] Downloads work
- [ ] Modals open
- [ ] Copy to clipboard works
- [ ] Accordion accessible

#### 9. Dashboard (`/dashboard`)
- [ ] KPIs reflect actual data
- [ ] Charts render correctly
- [ ] Export works

#### 10. Admin (`/admin`)
- [ ] Role changes persist
- [ ] Import/Export JSON works
- [ ] Settings changes affect new calculations only
- [ ] Reset demo data works

#### 11. Network Visualization
- [ ] "View Network" button opens modal
- [ ] Canvas renders nodes and connections
- [ ] Drag and drop functionality works
- [ ] Node selection shows details
- [ ] Network statistics display correctly
- [ ] Modal closes properly

### Accessibility Checklist
- [ ] Keyboard navigation throughout
- [ ] Focus indicators visible
- [ ] ARIA labels present
- [ ] Color contrast ≥4.5:1
- [ ] Screen reader compatible
- [ ] No console errors/warnings

## 🌐 Network Visualization Feature

The Network Visualization feature provides ambassadors with an interactive graph view of their creator connections:

### Key Features
- **Interactive Graph**: Drag and drop nodes to rearrange the network layout
- **Real-time Statistics**: View total creators, connections, and network density
- **Visual Effects**: Animated nodes with hover effects and glow animations
- **Creator Details**: Click on nodes to see detailed creator information
- **Responsive Design**: Adapts to different screen sizes with scrollable lists

### How to Use
1. Navigate to the Ambassador Dashboard
2. Click the "🌐 View Network" button in the quick actions section
3. Interact with the network graph:
   - Hover over nodes to see highlighting
   - Click and drag nodes to rearrange the layout
   - Click on any node to view details in the side panel
4. Use the side panel to explore network statistics and creator information

### Technical Details
- Built with HTML5 Canvas for smooth 60fps animations
- Custom physics simulation for floating node effects
- Integrates with existing Zustand store using `getNetworkCreators()`
- Canvas-based rendering with efficient animation frame management

For detailed documentation, see `NETWORK_FEATURE.md`.

## 🚢 Deployment (Vercel)

1. Push to GitHub
2. Connect repository to Vercel
3. Deploy with default Next.js settings
4. No environment variables required (all data in localStorage)

**Note**: Current authentication is demo-only. For production:
- Implement proper password hashing
- Use secure database storage
- Add server-side validation
- Enable HTTPS and security headers

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Forms**: React Hook Form + Zod
- **State**: Zustand (persisted)
- **Charts**: Recharts
- **Network Visualization**: HTML5 Canvas with custom animations
- **Dark Mode**: next-themes
- **IDs**: ULID
- **Icons**: Lucide React

## 🔒 Security Notes

- **Demo Authentication**: Current auth system is for demonstration only
- **Production Security**: Implement proper password hashing and server-side validation for production
- No sensitive data in localStorage (except demo auth tokens)
- API keys should use environment variables (if added)
- Input validation on all forms
- URL validation for links
- XSS protection via React

## 📝 License

MIT

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Open a Pull Request

## 🤝 Support

For issues, questions, or suggestions, please open an issue on GitHub.