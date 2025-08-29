"use client";

import UserProfile from "./UserProfile";

export default function HeaderClient() {
  return (
    <header className="bg-gradient-to-r from-slate-900 to-purple-900 border-b border-amber-400/30 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-3 text-2xl font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span className="text-amber-400">📚</span>
            MIL-CAN
            <span className="text-xs bg-amber-400/20 px-2 py-1 rounded-full text-amber-400">
              LITERACY
            </span>
          </a>
          <div className="flex items-center gap-6">
            <div className="flex gap-6">
              <a
                href="/assets"
                className="flex items-center gap-1 text-slate-300 hover:text-amber-400 transition-colors font-semibold"
              >
                📚 Resources
              </a>
              <a
                href="/leaderboard"
                className="flex items-center gap-1 text-slate-300 hover:text-amber-400 transition-colors font-semibold"
              >
                🏆 Leaderboard
              </a>
              <a
                href="/kit"
                className="flex items-center gap-1 text-slate-300 hover:text-amber-400 transition-colors font-semibold"
              >
                🎒 Creator Kit
              </a>
            </div>
            <UserProfile />
          </div>
        </nav>
      </div>
    </header>
  );
}
