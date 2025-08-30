"use client";

import { useEffect, useState } from "react";
import { useStore } from "../lib/store";
import { useAuth } from "../lib/auth-context";
import ContentReviewPopup from "../components/ContentReviewPopup";
import InviteAmbassadorModal from "../components/InviteAmbassadorModal";
import {
  resendInvitationAction,
  revokeInvitationAction,
} from "../lib/invitation-actions";
import type { Asset } from "../lib/types";

export default function AmbassadorDashboardPage() {
  const { user } = useAuth();
  const {
    dashboardStats,
    activities,
    refreshDashboardStats,
    members,
    assets,
    invitations,
    initializeData,
    addMember,
    approveAsset,
    currentUser,
    setCurrentUser,
  } = useStore();

  // State for review popup
  const [reviewAsset, setReviewAsset] = useState<Asset | null>(null);
  const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false);

  // State for invitation modal
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  // Get pending assets for UI state
  const pendingAssets = assets.filter((asset) => asset.status === "pending");

  // Initialize data from database and refresh dashboard stats when component mounts
  useEffect(() => {
    initializeData();
    const interval = setInterval(refreshDashboardStats, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [initializeData, refreshDashboardStats]);

  // Get recent activities (last 10)
  const recentActivities = activities
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )
    .slice(0, 4)
    .map((activity) => ({
      id: activity.id,
      creator: activity.memberName,
      action: activity.description,
      time: getRelativeTime(activity.timestamp),
      status: activity.status,
      relatedId: activity.relatedId,
    }));

  // Get pending invitations from store
  const pendingInvitations = (invitations || [])
    .filter((inv) => inv.status === "pending")
    .map((inv) => ({
      id: inv.id,
      email: inv.email,
      role: inv.role.charAt(0).toUpperCase() + inv.role.slice(1),
      sent: getRelativeTime(inv.createdAt),
      invitation: inv,
    }));

  // Helper function to get relative time
  function getRelativeTime(timestamp: string): string {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
  }

  // Demo functions to test database functionality
  const handleAddNewCreator = () => {
    const newCreatorData = {
      role: "creator" as const,
      name: `Test Creator ${Math.floor(Math.random() * 1000)}`,
      email: `creator${Math.floor(Math.random() * 1000)}@test.edu`,
      handle: `@creator${Math.floor(Math.random() * 1000)}`,
      campus: "Test University",
      languages: ["English"],
      points: Math.floor(Math.random() * 100),
      isActive: true,
    };

    addMember(newCreatorData);
  };

  const handleInviteSuccess = () => {
    // Refresh data to show new invitation
    refreshDashboardStats();
  };

  const handleResendInvitation = async (invitation: any) => {
    try {
      await resendInvitationAction(invitation.id, invitation.invitation);
      console.log("Invitation resent successfully");
    } catch (error) {
      console.error("Failed to resend invitation:", error);
    }
  };

  const handleRevokeInvitation = async (invitationId: string) => {
    try {
      await revokeInvitationAction(invitationId);
      // Refresh data to remove revoked invitation
      refreshDashboardStats();
    } catch (error) {
      console.error("Failed to revoke invitation:", error);
    }
  };

  const handleApproveFirstPendingAsset = () => {
    const pendingAsset = assets.find((asset) => asset.status === "pending");
    if (pendingAsset) {
      const review = {
        accuracy: 4,
        context: 2,
        citations: 4,
        overall: 4,
        notes: "Great content!",
        reviewerId: String(user?.id) || "admin",
        reviewedAt: new Date().toISOString(),
      };

      approveAsset(pendingAsset.id, review);
    }
  };

  const handleOpenReview = (assetId: string) => {
    const asset = assets.find((a) => a.id === assetId);
    if (asset) {
      setReviewAsset(asset);
      setIsReviewPopupOpen(true);
    }
  };

  const handleCloseReview = () => {
    setIsReviewPopupOpen(false);
    setReviewAsset(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 left-20 w-3 h-3 bg-amber-400/30 rounded-full animate-pulse"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-40 right-32 w-2 h-2 bg-purple-400/40 rounded-full animate-bounce"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-r from-amber-400/10 to-yellow-400/10 rounded-full blur-md animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Navigation Header */}
        <div className="mb-6">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-amber-400/30 hover:border-amber-400/50 rounded-lg text-slate-300 hover:text-amber-400 transition-all duration-200"
          >
            <span>←</span>
            <span>Back to Home</span>
          </button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">🎓</div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                Ambassador Dashboard
              </h1>
              <p className="text-slate-300 text-lg">
                Welcome back, {user?.name || "Ambassador"}
              </p>
            </div>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-transparent"></div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-gradient-to-br from-slate-800/50 to-purple-800/30 rounded-xl border border-amber-400/20 hover:border-amber-400/40 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl">👥</div>
              <div className="text-3xl font-bold text-amber-400">
                {dashboardStats.activeCreators}
              </div>
            </div>
            <h3 className="text-slate-300 font-semibold">Active Creators</h3>
            <p className="text-slate-500 text-sm">Under supervision</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-slate-800/50 to-blue-800/30 rounded-xl border border-amber-400/20 hover:border-amber-400/40 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl">⏳</div>
              <div className="text-3xl font-bold text-amber-400">
                {dashboardStats.pendingReview}
              </div>
            </div>
            <h3 className="text-slate-300 font-semibold">Pending Review</h3>
            <p className="text-slate-500 text-sm">Awaiting approval</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-slate-800/50 to-emerald-800/30 rounded-xl border border-amber-400/20 hover:border-amber-400/40 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl">✅</div>
              <div className="text-3xl font-bold text-amber-400">
                {dashboardStats.approvedContent}
              </div>
            </div>
            <h3 className="text-slate-300 font-semibold">Approved Content</h3>
            <p className="text-slate-500 text-sm">Published materials</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-slate-800/50 to-indigo-800/30 rounded-xl border border-amber-400/20 hover:border-amber-400/40 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl">📊</div>
              <div className="text-3xl font-bold text-amber-400">
                {dashboardStats.monthlyViews.toLocaleString()}
              </div>
            </div>
            <h3 className="text-slate-300 font-semibold">Monthly Views</h3>
            <p className="text-slate-500 text-sm">Content engagement</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/20 rounded-xl border border-amber-400/20 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-2xl">📋</div>
              <h2 className="text-2xl font-bold text-amber-400">
                Recent Activities
              </h2>
            </div>

            <div className="space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 bg-slate-900/30 rounded-lg border border-slate-700/50 hover:border-amber-400/30 transition-all duration-200"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-slate-200">
                          {activity.creator}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            activity.status === "pending"
                              ? "bg-yellow-900/50 text-yellow-400"
                              : activity.status === "approved"
                                ? "bg-green-900/50 text-green-400"
                                : activity.status === "rejected"
                                  ? "bg-red-900/50 text-red-400"
                                  : activity.status === "active"
                                    ? "bg-purple-900/50 text-purple-400"
                                    : "bg-blue-900/50 text-blue-400"
                          }`}
                        >
                          {activity.status}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm">
                        {activity.action}
                      </p>
                      <p className="text-slate-500 text-xs">{activity.time}</p>
                    </div>
                    {activity.status === "pending" && (
                      <button
                        onClick={() =>
                          activity.relatedId &&
                          handleOpenReview(activity.relatedId)
                        }
                        className="px-3 py-1 bg-amber-400/20 hover:bg-amber-400/30 text-amber-400 text-sm rounded-md transition-colors duration-200 hover:shadow-lg"
                      >
                        Review
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-400 text-sm">No recent activities</p>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button className="py-2 text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors duration-200">
                View All Activities →
              </button>
              <p className="text-xs text-slate-500">
                Last updated:{" "}
                {new Date(dashboardStats.lastUpdated).toLocaleTimeString()}
              </p>
            </div>
          </div>

          {/* Ambassador Actions */}
          <div className="space-y-6">
            {/* Invite New Ambassadors */}
            <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/20 rounded-xl border border-amber-400/20 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-2xl">🤝</div>
                <h2 className="text-2xl font-bold text-amber-400">
                  Ambassador Invitations
                </h2>
              </div>

              <button
                onClick={() => setIsInviteModalOpen(true)}
                className="w-full mb-4 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
              >
                + Invite New Ambassador
              </button>

              <div className="space-y-3">
                <h3 className="text-slate-300 font-semibold mb-3">
                  Pending Invitations
                </h3>
                {pendingInvitations.length === 0 ? (
                  <div className="text-center py-6 text-slate-400">
                    <div className="text-2xl mb-2">📮</div>
                    <p className="text-sm">No pending invitations</p>
                  </div>
                ) : (
                  pendingInvitations.map((invitation) => (
                    <div
                      key={invitation.id}
                      className="flex items-center justify-between p-3 bg-slate-900/30 rounded-lg border border-slate-700/50"
                    >
                      <div>
                        <p className="text-slate-200 text-sm font-medium">
                          {invitation.email}
                        </p>
                        <p className="text-slate-400 text-xs">
                          {invitation.role} • Sent {invitation.sent}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleResendInvitation(invitation)}
                          className="px-2 py-1 text-xs text-blue-400 hover:text-blue-300 transition-colors duration-200"
                          title="Resend invitation"
                        >
                          Resend
                        </button>
                        <button
                          onClick={() => handleRevokeInvitation(invitation.id)}
                          className="px-2 py-1 text-xs text-red-400 hover:text-red-300 transition-colors duration-200"
                          title="Revoke invitation"
                        >
                          Revoke
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-slate-800/50 to-blue-800/20 rounded-xl border border-amber-400/20 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-2xl">⚡</div>
                <h2 className="text-2xl font-bold text-amber-400">
                  Quick Actions
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    const pendingAsset = pendingAssets[0];
                    if (pendingAsset) {
                      handleOpenReview(pendingAsset.id);
                    }
                  }}
                  disabled={pendingAssets.length === 0}
                  className={`p-3 rounded-lg transition-all duration-200 text-sm font-medium ${
                    pendingAssets.length > 0
                      ? "bg-gradient-to-r from-emerald-600/20 to-emerald-700/20 hover:from-emerald-600/30 hover:to-emerald-700/30 border border-emerald-500/30 text-emerald-400"
                      : "bg-slate-700/30 border border-slate-600/30 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  📝 Review Content{" "}
                  {pendingAssets.length > 0 && `(${pendingAssets.length})`}
                </button>
                <button
                  onClick={handleAddNewCreator}
                  className="p-3 bg-gradient-to-r from-blue-600/20 to-blue-700/20 hover:from-blue-600/30 hover:to-blue-700/30 border border-blue-500/30 text-blue-400 rounded-lg transition-all duration-200 text-sm font-medium"
                >
                  👥 Add Creator
                </button>
                <button className="p-3 bg-gradient-to-r from-indigo-600/20 to-indigo-700/20 hover:from-indigo-600/30 hover:to-indigo-700/30 border border-indigo-500/30 text-indigo-400 rounded-lg transition-all duration-200 text-sm font-medium">
                  📊 View Reports
                </button>
                <button className="p-3 bg-gradient-to-r from-purple-600/20 to-purple-700/20 hover:from-purple-600/30 hover:to-purple-700/30 border border-purple-500/30 text-purple-400 rounded-lg transition-all duration-200 text-sm font-medium">
                  ⚙️ Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Review Popup */}
      {reviewAsset && (
        <ContentReviewPopup
          asset={reviewAsset}
          isOpen={isReviewPopupOpen}
          onClose={handleCloseReview}
        />
      )}

      {/* Invite Ambassador Modal */}
      <InviteAmbassadorModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onSuccess={handleInviteSuccess}
      />
    </div>
  );
}
