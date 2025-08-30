import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ulid } from "ulid";
import {
  StoreState,
  Member,
  Asset,
  Event,
  PointsLedger,
  Activity,
  DashboardStats,
  Settings,
  AssetReview,
  Invitation,
  MemberRole,
} from "./types";
import { simpleDbService } from "./simple-db-service";

// Default settings
const defaultSettings: Settings = {
  brand: {
    name: "MIL-CAN",
  },
  caps: {
    maxAssetsPerMonth: 2,
    maxEventsPerMonth: 2,
  },
  scoring: {
    assetApproved: 10,
    citationsBonus: 3,
    assetUsedInEvent: 5,
    baseEventPoints: 20,
    learningGainBonus: 10,
    rightOfReply: 5,
  },
};

// Demo data for initial state
const demoMembers: Member[] = [
  {
    id: "member-1",
    role: "creator",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    handle: "@sarahj",
    campus: "University of California",
    languages: ["English", "Spanish"],
    points: 85,
    createdAt: "2024-01-15T00:00:00Z",
    lastLoginAt: "2024-01-20T10:30:00Z",
    isActive: true,
  },
  {
    id: "member-2",
    role: "creator",
    name: "Mike Chen",
    email: "mike@example.com",
    handle: "@mikechen",
    campus: "MIT",
    languages: ["English", "Chinese"],
    points: 120,
    createdAt: "2024-01-10T00:00:00Z",
    lastLoginAt: "2024-01-19T15:45:00Z",
    isActive: true,
  },
  {
    id: "member-3",
    role: "creator",
    name: "Emma Davis",
    email: "emma@example.com",
    handle: "@emmadavis",
    campus: "Stanford University",
    languages: ["English"],
    points: 95,
    createdAt: "2024-01-12T00:00:00Z",
    lastLoginAt: "2024-01-18T09:20:00Z",
    isActive: true,
  },
  {
    id: "member-4",
    role: "creator",
    name: "Alex Rodriguez",
    email: "alex@example.com",
    handle: "@alexr",
    campus: "Harvard University",
    languages: ["English", "Spanish"],
    points: 75,
    createdAt: "2024-01-18T00:00:00Z",
    lastLoginAt: "2024-01-20T14:15:00Z",
    isActive: true,
  },
];

const demoAssets: Asset[] = [
  {
    id: "asset-1",
    creatorId: "member-1",
    type: "video",
    topic: "ad-transparency",
    title: "How to Spot Hidden Ads in 30 Seconds",
    link: "https://example.com/video1",
    caption:
      "Learn the telltale signs of undisclosed sponsored content in this quick guide. We break down the FTC guidelines and show real examples from popular social media platforms.",
    citations: [
      "https://www.ftc.gov/news-events/topics/truth-advertising",
      "https://www.example.com/research-study",
    ],
    accessibility: { captions: true },
    status: "pending",
    score: 0,
    createdAt: "2024-01-20T08:00:00Z",
    updatedAt: "2024-01-20T08:00:00Z",
    monthlyViews: 0,
    totalViews: 0,
  },
  {
    id: "asset-2",
    creatorId: "member-2",
    type: "carousel",
    topic: "deepfake",
    title: "Deepfake Detection Checklist",
    link: "https://example.com/carousel1",
    caption:
      "A comprehensive visual guide to identifying deepfake content. This carousel covers technical indicators, behavioral cues, and verification tools that anyone can use.",
    citations: [
      "https://www.example.com/deepfake-research",
      "https://www.example.com/detection-tools",
      "https://www.example.com/verification-guide",
    ],
    accessibility: { captions: true },
    status: "approved",
    review: {
      accuracy: 9,
      context: 8,
      citations: 10,
      overall: 9,
      notes: "Excellent content with thorough research and clear presentation.",
      reviewerId: "admin-1",
      reviewedAt: "2024-01-19T10:30:00Z",
    },
    score: 9,
    createdAt: "2024-01-18T12:00:00Z",
    updatedAt: "2024-01-19T10:30:00Z",
    monthlyViews: 2340,
    totalViews: 2340,
    approvedAt: "2024-01-19T10:30:00Z",
    approvedBy: "admin-1",
  },
  {
    id: "asset-3",
    creatorId: "member-3",
    type: "script",
    topic: "verify-30s",
    title: "30-Second Fact Check Protocol",
    link: "https://example.com/script1",
    caption:
      "A quick verification script that helps users fact-check information in under 30 seconds. Covers source checking, cross-referencing, and red flag identification.",
    citations: [
      "https://www.example.com/fact-check-methods",
      "https://www.example.com/verification-standards",
    ],
    accessibility: { captions: false },
    status: "approved",
    review: {
      accuracy: 8,
      context: 9,
      citations: 8,
      overall: 8,
      notes:
        "Good practical approach, could benefit from more diverse examples.",
      reviewerId: "admin-1",
      reviewedAt: "2024-01-17T14:20:00Z",
    },
    score: 8,
    createdAt: "2024-01-16T15:30:00Z",
    updatedAt: "2024-01-17T14:20:00Z",
    monthlyViews: 1580,
    totalViews: 1580,
    approvedAt: "2024-01-17T14:20:00Z",
    approvedBy: "admin-1",
  },
  {
    id: "asset-4",
    creatorId: "member-4",
    type: "video",
    topic: "before-after",
    title: "Before/After: Critical Thinking Transformation",
    link: "https://example.com/video2",
    caption:
      "A compelling before-and-after comparison showing how media literacy education transforms students' critical thinking abilities over a semester.",
    citations: [
      "https://www.example.com/education-study",
      "https://www.example.com/critical-thinking-research",
    ],
    accessibility: { captions: true },
    status: "pending",
    score: 0,
    createdAt: "2024-01-19T16:45:00Z",
    updatedAt: "2024-01-19T16:45:00Z",
    monthlyViews: 0,
    totalViews: 0,
  },
];

const demoActivities: Activity[] = [
  {
    id: "activity-1",
    type: "asset_submitted",
    memberId: "member-1",
    memberName: "Sarah Johnson",
    description: "Submitted new video content",
    status: "pending",
    timestamp: "2024-01-20T08:00:00Z",
    relatedId: "asset-1",
  },
  {
    id: "activity-2",
    type: "asset_approved",
    memberId: "member-2",
    memberName: "Mike Chen",
    description: "Deepfake Detection Checklist approved",
    status: "approved",
    timestamp: "2024-01-19T10:30:00Z",
    relatedId: "asset-2",
  },
  {
    id: "activity-3",
    type: "asset_approved",
    memberId: "member-3",
    memberName: "Emma Davis",
    description: "30-Second Fact Check Protocol approved",
    status: "approved",
    timestamp: "2024-01-17T14:20:00Z",
    relatedId: "asset-3",
  },
  {
    id: "activity-4",
    type: "member_joined",
    memberId: "member-4",
    memberName: "Alex Rodriguez",
    description: "Joined as creator",
    status: "active",
    timestamp: "2024-01-18T00:00:00Z",
  },
];

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Authentication
      currentUser: null,
      isAuthenticated: false,

      // Data
      members: [],
      assets: [],
      events: [],
      pointsLedger: [],
      activities: [],
      invitations: [],
      settings: defaultSettings,

      // Dashboard stats (computed)
      dashboardStats: {
        activeCreators: 0,
        pendingReview: 0,
        approvedContent: 0,
        monthlyViews: 0,
        totalMembers: 0,
        totalEvents: 0,
        lastUpdated: new Date().toISOString(),
      },

      // Authentication actions
      setCurrentUser: (user) =>
        set({
          currentUser: user,
          isAuthenticated: !!user,
        }),

      // Member actions
      addMember: (memberData) => {
        return new Promise(async (resolve, reject) => {
          try {
            const newMember = await simpleDbService.createMember(memberData);

            // Update local state
            set((state) => ({
              members: [...state.members, newMember],
            }));

            // Refresh activities and stats
            await get().loadActivities();
            await get().refreshDashboardStats();
            resolve(newMember);
          } catch (error) {
            console.error("Error adding member:", error);
            reject(error);
          }
        });
      },

      updateMember: (id, updates) => {
        return new Promise(async (resolve, reject) => {
          try {
            await simpleDbService.updateMember(id, updates);

            // Update local state
            set((state) => ({
              members: state.members.map((member) =>
                member.id === id ? { ...member, ...updates } : member,
              ),
            }));

            await get().refreshDashboardStats();
            resolve(true);
          } catch (error) {
            console.error("Error updating member:", error);
            reject(error);
          }
        });
      },

      // Asset actions
      addAsset: (assetData) => {
        return new Promise(async (resolve, reject) => {
          try {
            const newAsset = await simpleDbService.createAsset(assetData);

            // Update local state
            set((state) => ({
              assets: [...state.assets, newAsset],
            }));

            // Refresh activities and stats
            await get().loadActivities();
            await get().refreshDashboardStats();
            resolve(newAsset);
          } catch (error) {
            console.error("Error adding asset:", error);
            reject(error);
          }
        });
      },

      updateAsset: (id, updates) => {
        return new Promise(async (resolve, reject) => {
          try {
            await simpleDbService.updateAsset(id, updates);

            // Update local state
            set((state) => ({
              assets: state.assets.map((asset) =>
                asset.id === id
                  ? {
                      ...asset,
                      ...updates,
                      updatedAt: new Date().toISOString(),
                    }
                  : asset,
              ),
            }));

            await get().refreshDashboardStats();
            resolve(true);
          } catch (error) {
            console.error("Error updating asset:", error);
            reject(error);
          }
        });
      },

      approveAsset: (id, review) => {
        return new Promise(async (resolve, reject) => {
          try {
            console.log("Store: Starting approveAsset for ID:", id);
            const currentUser = get().currentUser;
            const userId = currentUser?.id || "admin";

            console.log("Store: Current user:", userId);
            console.log("Store: Calling simpleDbService.approveAsset...");

            await simpleDbService.approveAsset(id, review, userId);

            console.log("Store: Database service completed, reloading data...");

            // Reload all data to reflect changes
            await get().loadAssets();
            await get().loadMembers();
            await get().loadActivities();
            await get().refreshDashboardStats();

            console.log("Store: All data reloaded, approveAsset complete");
            resolve(true);
          } catch (error) {
            console.error("Error approving asset:", error);
            reject(error);
          }
        });
      },

      rejectAsset: (id, review) => {
        return new Promise(async (resolve, reject) => {
          try {
            console.log("Store: Starting rejectAsset for ID:", id);
            console.log("Store: Calling simpleDbService.rejectAsset...");

            await simpleDbService.rejectAsset(id, review);

            console.log("Store: Database service completed, reloading data...");

            // Reload data to reflect changes
            await get().loadAssets();
            await get().loadActivities();
            await get().refreshDashboardStats();

            console.log("Store: All data reloaded, rejectAsset complete");
            resolve(true);
          } catch (error) {
            console.error("Error rejecting asset:", error);
            reject(error);
          }
        });
      },

      // Event actions
      addEvent: (eventData) => {
        (async () => {
          try {
            const newEvent = await simpleDbService.createEvent(eventData);

            // Update local state
            set((state) => ({
              events: [...state.events, newEvent],
            }));

            // Refresh activities and stats
            await get().loadActivities();
            await get().refreshDashboardStats();
          } catch (error) {
            console.error("Error adding event:", error);
          }
        })();
      },

      updateEvent: (id, updates) => {
        (async () => {
          try {
            await simpleDbService.updateEvent(id, updates);

            // Update local state
            set((state) => ({
              events: state.events.map((event) =>
                event.id === id
                  ? {
                      ...event,
                      ...updates,
                      updatedAt: new Date().toISOString(),
                    }
                  : event,
              ),
            }));

            await get().refreshDashboardStats();
          } catch (error) {
            console.error("Error updating event:", error);
          }
        })();
      },

      // Activity actions
      addActivity: (activityData) => {
        (async () => {
          try {
            const newActivity =
              await simpleDbService.createActivity(activityData);

            set((state) => ({
              activities: [...state.activities, newActivity],
            }));
          } catch (error) {
            console.error("Error adding activity:", error);
          }
        })();
      },

      // Invitation actions
      sendInvitation: (email: string, role: MemberRole) => {
        return new Promise(async (resolve, reject) => {
          try {
            const currentUser = get().currentUser;
            if (!currentUser) {
              reject(new Error("Not authenticated"));
              return;
            }

            // Generate unique token and expiry (30 days from now)
            const token = ulid();
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 30);

            const invitation: Invitation = {
              id: ulid(),
              email,
              role,
              invitedBy: currentUser.id,
              status: "pending",
              token,
              createdAt: new Date().toISOString(),
              expiresAt: expiresAt.toISOString(),
            };

            // Send email invitation
            const response = await fetch("/api/invitations/send", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ invitation }),
            });

            if (!response.ok) {
              throw new Error("Failed to send invitation email");
            }

            // Add to store
            set((state) => ({
              invitations: [...state.invitations, invitation],
            }));

            // Add activity
            get().addActivity({
              type: "member_joined",
              memberId: currentUser.id,
              memberName: currentUser.name,
              description: `Sent invitation to ${email} for ${role} role`,
              status: "active",
              relatedId: invitation.id,
            });

            resolve(invitation);
          } catch (error) {
            console.error("Error sending invitation:", error);
            reject(error);
          }
        });
      },

      resendInvitation: (id: string) => {
        return new Promise(async (resolve, reject) => {
          try {
            const state = get();
            const invitation = state.invitations.find((inv) => inv.id === id);

            if (!invitation) {
              reject(new Error("Invitation not found"));
              return;
            }

            // Send email invitation
            const response = await fetch("/api/invitations/send", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ invitation }),
            });

            if (!response.ok) {
              throw new Error("Failed to resend invitation email");
            }

            resolve(true);
          } catch (error) {
            console.error("Error resending invitation:", error);
            reject(error);
          }
        });
      },

      acceptInvitation: (token: string, userData: Partial<Member>) => {
        return new Promise(async (resolve, reject) => {
          try {
            const state = get();
            const invitation = state.invitations.find(
              (inv) => inv.token === token,
            );

            if (!invitation) {
              reject(new Error("Invalid invitation token"));
              return;
            }

            if (invitation.status !== "pending") {
              reject(new Error("Invitation already used or expired"));
              return;
            }

            if (new Date() > new Date(invitation.expiresAt)) {
              // Mark as expired
              set((state) => ({
                invitations: state.invitations.map((inv) =>
                  inv.id === invitation.id
                    ? { ...inv, status: "expired" as const }
                    : inv,
                ),
              }));
              reject(new Error("Invitation has expired"));
              return;
            }

            // Create new member
            const newMember = await get().addMember({
              role: invitation.role,
              name: userData.name || "",
              email: invitation.email,
              handle: userData.handle || "",
              campus: userData.campus || "",
              languages: userData.languages || ["English"],
              points: 0,
              isActive: true,
            });

            // Mark invitation as accepted
            set((state) => ({
              invitations: state.invitations.map((inv) =>
                inv.id === invitation.id
                  ? {
                      ...inv,
                      status: "accepted" as const,
                      acceptedAt: new Date().toISOString(),
                    }
                  : inv,
              ),
            }));

            resolve(newMember);
          } catch (error) {
            console.error("Error accepting invitation:", error);
            reject(error);
          }
        });
      },

      revokeInvitation: (id: string) => {
        return new Promise(async (resolve, reject) => {
          try {
            // Remove invitation from store
            set((state) => ({
              invitations: state.invitations.filter((inv) => inv.id !== id),
            }));

            resolve(true);
          } catch (error) {
            console.error("Error revoking invitation:", error);
            reject(error);
          }
        });
      },

      // Points actions
      awardPoints: (entry) => {
        const newEntry: PointsLedger = {
          ...entry,
          id: ulid(),
          timestamp: new Date().toISOString(),
        };

        set((state) => {
          const updatedMembers = state.members.map((m) =>
            m.id === entry.memberId
              ? { ...m, points: m.points + entry.points }
              : m,
          );

          return {
            members: updatedMembers,
            pointsLedger: [...state.pointsLedger, newEntry],
          };
        });
      },

      // Dashboard actions
      refreshDashboardStats: () => {
        return new Promise(async (resolve, reject) => {
          try {
            console.log("Store: Refreshing dashboard stats...");
            const stats = await simpleDbService.getDashboardStats();
            console.log("Store: New dashboard stats:", stats);
            set({ dashboardStats: stats });
            console.log("Store: Dashboard stats updated in state");
            resolve(stats);
          } catch (error) {
            console.error("Error refreshing dashboard stats:", error);
            reject(error);
          }
        });
      },

      // Data loading actions
      loadMembers: () => {
        (async () => {
          try {
            const members = await simpleDbService.getAllMembers();
            set({ members });
          } catch (error) {
            console.error("Error loading members:", error);
          }
        })();
      },

      loadAssets: () => {
        (async () => {
          try {
            console.log("Store: Loading assets from database...");
            const assets = await simpleDbService.getAllAssets();
            console.log("Store: Loaded assets:", assets.length, "assets");
            console.log("Store: Assets by status:", {
              pending: assets.filter((a) => a.status === "pending").length,
              approved: assets.filter((a) => a.status === "approved").length,
              rejected: assets.filter((a) => a.status === "rejected").length,
            });
            set({ assets });
            console.log("Store: Assets state updated");
          } catch (error) {
            console.error("Error loading assets:", error);
          }
        })();
      },

      loadEvents: () => {
        (async () => {
          try {
            const events = await simpleDbService.getAllEvents();
            set({ events });
          } catch (error) {
            console.error("Error loading events:", error);
          }
        })();
      },

      loadActivities: () => {
        (async () => {
          try {
            console.log("Store: Loading activities from database...");
            const activities = await simpleDbService.getAllActivities();
            console.log(
              "Store: Loaded activities:",
              activities.length,
              "activities",
            );
            set({ activities });
            console.log("Store: Activities state updated");
          } catch (error) {
            console.error("Error loading activities:", error);
          }
        })();
      },

      // Initialize data from database
      initializeData: () => {
        (async () => {
          try {
            // Seed sample data if database is empty
            await simpleDbService.seedSampleData();

            // Load all data
            await Promise.all([
              get().loadMembers(),
              get().loadAssets(),
              get().loadEvents(),
              get().loadActivities(),
            ]);

            // Refresh stats
            await get().refreshDashboardStats();
          } catch (error) {
            console.error("Error initializing data:", error);
          }
        })();
      },

      // Utility actions
      clearData: () => {
        set({
          members: [],
          assets: [],
          events: [],
          pointsLedger: [],
          activities: [],
          dashboardStats: {
            activeCreators: 0,
            pendingReview: 0,
            approvedContent: 0,
            monthlyViews: 0,
            totalMembers: 0,
            totalEvents: 0,
            lastUpdated: new Date().toISOString(),
          },
        });
      },

      importData: (data) => {
        set((state) => ({
          ...state,
          ...data,
        }));
        get().refreshDashboardStats();
      },

      exportData: () => {
        const state = get();
        return {
          members: state.members,
          assets: state.assets,
          events: state.events,
          pointsLedger: state.pointsLedger,
          activities: state.activities,
          settings: state.settings,
        };
      },
    }),
    {
      name: "mil-can-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        members: state.members,
        assets: state.assets,
        events: state.events,
        pointsLedger: state.pointsLedger,
        activities: state.activities,
        settings: state.settings,
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

// Initialize dashboard stats on store creation
if (typeof window !== "undefined") {
  setTimeout(() => {
    useStore.getState().refreshDashboardStats();
  }, 100);
}
