"use client";

import { useState } from "react";

export default function AmbassadorDashboardPage() {
  const [stats] = useState({
    totalCreators: 156,
    pendingContent: 23,
    approvedContent: 342,
    monthlyViews: 45230,
  });

  const [recentActivities] = useState([
    {
      id: 1,
      creator: "Sarah Johnson",
      action: "Submitted new article",
      time: "2 hours ago",
      status: "pending",
    },
    {
      id: 2,
      creator: "Mike Chen",
      action: "Updated video content",
      time: "4 hours ago",
      status: "approved",
    },
    {
      id: 3,
      creator: "Emma Davis",
      action: "Created infographic",
      time: "1 day ago",
      status: "reviewed",
    },
    {
      id: 4,
      creator: "Alex Rodriguez",
      action: "Joined as creator",
      time: "2 days ago",
      status: "active",
    },
  ]);

  const [pendingInvitations] = useState([
    {
      id: 1,
      email: "dr.smith@university.edu",
      role: "Senior Ambassador",
      sent: "3 days ago",
    },
    {
      id: 2,
      email: "prof.williams@college.edu",
      role: "Content Ambassador",
      sent: "1 week ago",
    },
  ]);

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
                Welcome back, Dr. Ambassador
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
                {stats.totalCreators}
              </div>
            </div>
            <h3 className="text-slate-300 font-semibold">Active Creators</h3>
            <p className="text-slate-500 text-sm">Under supervision</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-slate-800/50 to-blue-800/30 rounded-xl border border-amber-400/20 hover:border-amber-400/40 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl">⏳</div>
              <div className="text-3xl font-bold text-amber-400">
                {stats.pendingContent}
              </div>
            </div>
            <h3 className="text-slate-300 font-semibold">Pending Review</h3>
            <p className="text-slate-500 text-sm">Awaiting approval</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-slate-800/50 to-emerald-800/30 rounded-xl border border-amber-400/20 hover:border-amber-400/40 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl">✅</div>
              <div className="text-3xl font-bold text-amber-400">
                {stats.approvedContent}
              </div>
            </div>
            <h3 className="text-slate-300 font-semibold">Approved Content</h3>
            <p className="text-slate-500 text-sm">Published materials</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-slate-800/50 to-indigo-800/30 rounded-xl border border-amber-400/20 hover:border-amber-400/40 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl">📊</div>
              <div className="text-3xl font-bold text-amber-400">
                {stats.monthlyViews.toLocaleString()}
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
              {recentActivities.map((activity) => (
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
                              : activity.status === "reviewed"
                                ? "bg-blue-900/50 text-blue-400"
                                : "bg-purple-900/50 text-purple-400"
                        }`}
                      >
                        {activity.status}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm">{activity.action}</p>
                    <p className="text-slate-500 text-xs">{activity.time}</p>
                  </div>
                  <button className="px-3 py-1 bg-amber-400/20 hover:bg-amber-400/30 text-amber-400 text-sm rounded-md transition-colors duration-200">
                    Review
                  </button>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-2 text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors duration-200">
              View All Activities →
            </button>
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

              <button className="w-full mb-4 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.02]">
                + Invite New Ambassador
              </button>

              <div className="space-y-3">
                <h3 className="text-slate-300 font-semibold mb-3">
                  Pending Invitations
                </h3>
                {pendingInvitations.map((invitation) => (
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
                    <button className="px-2 py-1 text-xs text-slate-400 hover:text-slate-200 transition-colors duration-200">
                      Resend
                    </button>
                  </div>
                ))}
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
                <button className="p-3 bg-gradient-to-r from-emerald-600/20 to-emerald-700/20 hover:from-emerald-600/30 hover:to-emerald-700/30 border border-emerald-500/30 text-emerald-400 rounded-lg transition-all duration-200 text-sm font-medium">
                  📝 Review Content
                </button>
                <button className="p-3 bg-gradient-to-r from-blue-600/20 to-blue-700/20 hover:from-blue-600/30 hover:to-blue-700/30 border border-blue-500/30 text-blue-400 rounded-lg transition-all duration-200 text-sm font-medium">
                  👥 Manage Creators
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
    </div>
  );
}
