"use client";

import { useState } from "react";
import Header from "../../components/Header";

export default function LeaderboardPage() {
  const [timeFilter, setTimeFilter] = useState("current");

  const leaderboard = [
    {
      name: "Amy Ambassador",
      role: "Ambassador",
      points: 35,
      trend: "up",
      change: 5,
    },
    {
      name: "Chris Creator",
      role: "Creator",
      points: 23,
      trend: "up",
      change: 3,
    },
    {
      name: "Andy Advocate",
      role: "Ambassador",
      points: 20,
      trend: "down",
      change: -2,
    },
    {
      name: "Casey Content",
      role: "Creator",
      points: 10,
      trend: "same",
      change: 0,
    },
  ];

  const lastWeekWinners = [
    { name: "Sarah Solver", role: "Ambassador", points: 42, badge: "🏆" },
    { name: "Mike Media", role: "Creator", points: 38, badge: "🥈" },
    { name: "Lisa Literacy", role: "Ambassador", points: 31, badge: "🥉" },
  ];

  const allTimeChampions = [
    {
      name: "David Digital",
      role: "Creator",
      totalPoints: 520,
      events: 45,
      avgScore: 11.5,
    },
    {
      name: "Emma Educator",
      role: "Ambassador",
      totalPoints: 485,
      events: 38,
      avgScore: 12.8,
    },
    {
      name: "Frank Facts",
      role: "Ambassador",
      totalPoints: 412,
      events: 35,
      avgScore: 11.8,
    },
  ];

  const achievements = [
    {
      title: "Most Events Hosted",
      name: "Alex Advocate",
      value: "23 events",
      icon: "🎯",
    },
    {
      title: "Highest Single Event Score",
      name: "Rachel Reporter",
      value: "48 pts",
      icon: "⭐",
    },
    {
      title: "Best Newcomer",
      name: "Tom Teacher",
      value: "15 pts",
      icon: "🌟",
    },
    {
      title: "Community Favorite",
      name: "Nina News",
      value: "89 votes",
      icon: "❤️",
    },
  ];

  const statsCards = [
    {
      label: "Total Participants",
      value: "156",
      icon: "👥",
      color: "from-blue-500 to-purple-500",
    },
    {
      label: "Events This Month",
      value: "42",
      icon: "📅",
      color: "from-green-500 to-teal-500",
    },
    {
      label: "Points Awarded",
      value: "1,234",
      icon: "🏅",
      color: "from-orange-500 to-red-500",
    },
    {
      label: "Active Regions",
      value: "8",
      icon: "🌍",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-amber-400">Leaderboard</h1>
          <p className="text-gray-300">
            Celebrating our top media literacy champions
          </p>
        </div>

        {/* Time Filter Tabs */}
        <div className="flex gap-2 justify-center">
          {["current", "weekly", "monthly", "all-time"].map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                timeFilter === filter
                  ? "bg-amber-500 text-black"
                  : "bg-purple-800/30 text-gray-300 hover:bg-purple-700/40 border border-purple-400/20"
              }`}
            >
              {filter.charAt(0).toUpperCase() +
                filter.slice(1).replace("-", " ")}
            </button>
          ))}
        </div>

        {/* Current Leaderboard */}
        <div className="bg-gradient-to-br from-purple-800/20 to-blue-800/20 rounded-xl p-6 backdrop-blur-sm border border-purple-400/20">
          <h2 className="text-2xl font-bold text-amber-400 mb-4 flex items-center gap-2">
            <span>🏆</span> Current Rankings
          </h2>
          <div className="space-y-3">
            {leaderboard.map((member, index) => (
              <div
                key={index}
                className={`rounded-lg border ${
                  index === 0
                    ? "border-yellow-400/40 bg-yellow-900/10"
                    : index === 1
                      ? "border-gray-400/40 bg-gray-800/10"
                      : index === 2
                        ? "border-orange-400/40 bg-orange-900/10"
                        : "border-amber-400/20 bg-slate-800/50"
                } p-4 flex items-center justify-between hover:border-amber-400/40 transition-all duration-300`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`text-2xl font-bold ${
                      index === 0
                        ? "text-yellow-400"
                        : index === 1
                          ? "text-gray-300"
                          : index === 2
                            ? "text-orange-400"
                            : "text-amber-400"
                    }`}
                  >
                    {index === 0
                      ? "🥇"
                      : index === 1
                        ? "🥈"
                        : index === 2
                          ? "🥉"
                          : `#${index + 1}`}
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {member.name}
                    </div>
                    <div className="text-sm text-slate-400">{member.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {member.trend === "up" && (
                    <span className="text-green-400 text-sm flex items-center gap-1">
                      ↑ {Math.abs(member.change)}
                    </span>
                  )}
                  {member.trend === "down" && (
                    <span className="text-red-400 text-sm flex items-center gap-1">
                      ↓ {Math.abs(member.change)}
                    </span>
                  )}
                  {member.trend === "same" && (
                    <span className="text-gray-400 text-sm">—</span>
                  )}
                  <div className="text-2xl font-bold text-amber-400">
                    {member.points} pts
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Last Week Winners */}
          <div className="bg-gradient-to-br from-purple-800/40 to-blue-800/40 rounded-xl p-6 backdrop-blur-sm border border-purple-400/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">📅</span> Last Week Winners
            </h3>
            <div className="space-y-3">
              {lastWeekWinners.map((winner, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-purple-900/30 rounded-lg p-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{winner.badge}</span>
                    <div>
                      <div className="font-medium text-yellow-400">
                        {winner.name}
                      </div>
                      <div className="text-xs text-gray-400">{winner.role}</div>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-white">
                    {winner.points} pts
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All-Time Champions */}
          <div className="bg-gradient-to-br from-purple-800/40 to-blue-800/40 rounded-xl p-6 backdrop-blur-sm border border-purple-400/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">👑</span> All-Time Champions
            </h3>
            <div className="space-y-3">
              {allTimeChampions.map((champion, index) => (
                <div key={index} className="bg-purple-900/30 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-yellow-400">
                      {champion.name}
                    </div>
                    <div className="text-lg font-bold text-white">
                      {champion.totalPoints}
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{champion.events} events</span>
                    <span>Avg: {champion.avgScore} pts</span>
                  </div>
                  <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                      style={{
                        width: `${(champion.totalPoints / 520) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievement Highlights */}
          <div className="bg-gradient-to-br from-purple-800/40 to-blue-800/40 rounded-xl p-6 backdrop-blur-sm border border-purple-400/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">🎖️</span> Achievement Highlights
            </h3>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-purple-900/30 rounded-lg p-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <div className="text-xs text-gray-400 mb-1">
                        {achievement.title}
                      </div>
                      <div className="font-medium text-yellow-400">
                        {achievement.name}
                      </div>
                      <div className="text-sm text-white font-bold">
                        {achievement.value}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Streak & Milestones Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Active Streaks */}
          <div className="bg-gradient-to-br from-purple-800/40 to-blue-800/40 rounded-xl p-6 backdrop-blur-sm border border-purple-400/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">🔥</span> Active Streaks
            </h3>
            <div className="space-y-2">
              {[
                { name: "Amy Ambassador", streak: 12, unit: "weeks" },
                { name: "Chris Creator", streak: 8, unit: "weeks" },
                { name: "Andy Advocate", streak: 5, unit: "weeks" },
              ].map((person, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-purple-900/30 rounded-lg p-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🔥</span>
                    <span className="text-white font-medium">
                      {person.name}
                    </span>
                  </div>
                  <div className="text-amber-400 font-bold">
                    {person.streak} {person.unit}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Milestones */}
          <div className="bg-gradient-to-br from-purple-800/40 to-blue-800/40 rounded-xl p-6 backdrop-blur-sm border border-purple-400/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">🎉</span> Recent Milestones
            </h3>
            <div className="space-y-2">
              {[
                {
                  text: "Sarah Solver reached 100 points!",
                  time: "2 hours ago",
                  icon: "💯",
                },
                {
                  text: "Mike Media hosted 10th event",
                  time: "Yesterday",
                  icon: "🎯",
                },
                {
                  text: "New record: 50 participants in one event",
                  time: "3 days ago",
                  icon: "📈",
                },
              ].map((milestone, index) => (
                <div key={index} className="bg-purple-900/30 rounded-lg p-3">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">{milestone.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm text-white">{milestone.text}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {milestone.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
