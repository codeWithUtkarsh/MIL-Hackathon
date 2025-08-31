"use client";

import Header from "../../components/Header";

export default function LeaderboardPage() {
  const leaderboard = [
    { name: "Amy Ambassador", role: "Ambassador", points: 35 },
    { name: "Chris Creator", role: "Creator", points: 23 },
    { name: "Andy Advocate", role: "Ambassador", points: 20 },
    { name: "Casey Content", role: "Creator", points: 10 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-6">
        <h1 className="text-3xl font-bold text-amber-400">Leaderboard</h1>

        <div className="space-y-4">
          {leaderboard.map((member, index) => (
            <div
              key={index}
              className="rounded-lg border border-amber-400/20 bg-slate-800/50 p-6 flex items-center justify-between hover:border-amber-400/40 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-amber-400">
                  #{index + 1}
                </div>
                <div>
                  <div className="font-semibold text-white">{member.name}</div>
                  <div className="text-sm text-slate-400">{member.role}</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-amber-400">
                {member.points} pts
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
