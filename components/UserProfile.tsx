"use client";

import { useAuth } from "../lib/auth-context";

interface UserProfileProps {
  className?: string;
}

export default function UserProfile({ className = "" }: UserProfileProps) {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* User Avatar */}
      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
        {user.name.charAt(0).toUpperCase()}
      </div>

      {/* User Info */}
      <div className="flex flex-col">
        <div className="text-white font-semibold text-sm">
          {user.name}
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span className="capitalize">{user.role}</span>
          <span>•</span>
          <span>{user.country}</span>
          <span>•</span>
          <span className="text-amber-400 font-semibold">{user.points} pts</span>
        </div>
      </div>

      {/* Dropdown Menu */}
      <div className="relative group">
        <button className="p-2 text-slate-300 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Content */}
        <div className="absolute right-0 top-full mt-2 w-48 bg-slate-800 border border-slate-600 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="p-3 border-b border-slate-600">
            <div className="text-sm text-white font-medium">{user.name}</div>
            <div className="text-xs text-slate-400">{user.email}</div>
          </div>

          <div className="py-2">
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <span>👤</span>
              Profile Settings
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <span>📊</span>
              My Statistics
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <span>⚙️</span>
              Preferences
            </a>
          </div>

          <div className="py-2 border-t border-slate-600">
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-slate-700 transition-colors w-full text-left"
            >
              <span>🚪</span>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
