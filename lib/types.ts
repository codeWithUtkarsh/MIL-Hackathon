export type MemberRole = "creator" | "ambassador" | "reviewer" | "admin";
export type AssetType = "video" | "carousel" | "script";
export type AssetTopic =
  | "ad-transparency"
  | "before-after"
  | "deepfake"
  | "verify-30s";
export type AssetStatus = "pending" | "approved" | "rejected";
export type RefType = "asset" | "event" | "bonus" | "admin";

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
  lastLoginAt?: string;
  isActive: boolean;
}

export interface AssetReview {
  accuracy: number;
  context: number;
  citations: number;
  overall: number;
  notes?: string;
  reviewerId: string;
  reviewedAt: string;
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
  updatedAt: string;
  monthlyViews: number;
  totalViews: number;
  approvedAt?: string;
  approvedBy?: string;
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
  updatedAt: string;
}

export interface PointsLedger {
  id: string;
  memberId: string;
  role: MemberRole;
  points: number;
  reason: string;
  refType: RefType;
  refId?: string;
  timestamp: string;
}

export interface DashboardStats {
  activeCreators: number;
  pendingReview: number;
  approvedContent: number;
  monthlyViews: number;
  totalMembers: number;
  totalEvents: number;
  lastUpdated: string;
}

export interface Activity {
  id: string;
  type:
    | "member_joined"
    | "asset_submitted"
    | "asset_approved"
    | "asset_rejected"
    | "event_created";
  memberId: string;
  memberName: string;
  description: string;
  status: AssetStatus | "active" | "completed";
  timestamp: string;
  relatedId?: string; // ID of asset, event, etc.
}

export interface Invitation {
  id: string;
  email: string;
  role: MemberRole;
  invitedBy: string;
  status: "pending" | "accepted" | "expired";
  token: string;
  createdAt: string;
  expiresAt: string;
  acceptedAt?: string;
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
    assetApproved: number;
    citationsBonus: number;
    assetUsedInEvent: number;
    baseEventPoints: number;
    learningGainBonus: number;
    rightOfReply: number;
  };
}

// Store state interface
export interface StoreState {
  // Authentication
  currentUser: Member | null;
  isAuthenticated: boolean;

  // Data
  members: Member[];
  assets: Asset[];
  events: Event[];
  pointsLedger: PointsLedger[];
  activities: Activity[];
  invitations: Invitation[];
  settings: Settings;

  // Dashboard stats (computed)
  dashboardStats: DashboardStats;

  // Actions
  setCurrentUser: (user: Member | null) => void;

  // Member actions
  addMember: (member: Omit<Member, "id" | "createdAt">) => Promise<Member>;
  updateMember: (id: string, updates: Partial<Member>) => Promise<boolean>;

  // Asset actions
  addAsset: (
    asset: Omit<Asset, "id" | "createdAt" | "updatedAt">,
  ) => Promise<Asset>;
  updateAsset: (id: string, updates: Partial<Asset>) => Promise<boolean>;
  approveAsset: (id: string, review: AssetReview) => Promise<boolean>;
  rejectAsset: (id: string, review: AssetReview) => Promise<boolean>;

  // Event actions
  addEvent: (event: Omit<Event, "id" | "createdAt" | "updatedAt">) => void;
  updateEvent: (id: string, updates: Partial<Event>) => void;

  // Activity actions
  addActivity: (activity: Omit<Activity, "id" | "timestamp">) => void;

  // Invitation actions
  sendInvitation: (email: string, role: MemberRole) => Promise<Invitation>;
  resendInvitation: (id: string) => Promise<boolean>;
  acceptInvitation: (
    token: string,
    userData: Partial<Member>,
  ) => Promise<Member | null>;
  revokeInvitation: (id: string) => Promise<boolean>;

  // Points actions
  awardPoints: (entry: Omit<PointsLedger, "id" | "timestamp">) => void;

  // Dashboard actions
  refreshDashboardStats: () => Promise<DashboardStats>;

  // Data loading actions
  loadMembers: () => void;
  loadAssets: () => void;
  loadEvents: () => void;
  loadActivities: () => void;
  initializeData: () => void;

  // Utility actions
  clearData: () => void;
  importData: (data: Partial<StoreState>) => void;
  exportData: () => Partial<StoreState>;
}

// Helper types for API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
