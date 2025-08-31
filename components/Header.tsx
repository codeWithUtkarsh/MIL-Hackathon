"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../lib/auth-context";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navigateToHomeSection = (section: string) => {
    // Force a full page reload to reset any React state and navigate to the section
    window.location.href = `/?section=${section}#${section}`;
  };

  const navigateToHome = () => {
    // Force a full page reload to reset any React state and navigate to home
    window.location.href = "/?view=home";
  };

  return (
    <nav className="relative z-30 flex justify-between items-center p-6 border-b border-amber-400/20">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-amber-400 rounded-full mr-3"></div>
        <button
          onClick={navigateToHome}
          className="text-white font-bold text-xl hover:text-amber-400 transition-colors"
        >
          MIL-CAN <span className="text-amber-400 font-normal">LITERACY</span>
        </button>
      </div>
      <div className="flex items-center space-x-8">
        <button
          onClick={navigateToHome}
          className={`font-medium transition-colors ${
            isActive("/") ? "text-amber-400" : "text-white hover:text-amber-400"
          }`}
        >
          Home
        </button>
        <button
          onClick={() => navigateToHomeSection("mission")}
          className="text-white hover:text-amber-400 transition-colors font-medium"
        >
          Mission
        </button>
        <button
          onClick={() => navigateToHomeSection("reviews")}
          className="text-white hover:text-amber-400 transition-colors font-medium"
        >
          Reviews
        </button>
        <Link
          href="/assets"
          className={`font-medium transition-colors ${
            isActive("/assets")
              ? "text-amber-400"
              : "text-white hover:text-amber-400"
          }`}
        >
          Resources
        </Link>
        <Link
          href="/leaderboard"
          className={`font-medium transition-colors ${
            isActive("/leaderboard")
              ? "text-amber-400"
              : "text-white hover:text-amber-400"
          }`}
        >
          Leaderboard
        </Link>
        <Link
          href="/ambassadors"
          className={`font-medium transition-colors ${
            isActive("/ambassadors")
              ? "text-amber-400"
              : "text-white hover:text-amber-400"
          }`}
        >
          Ambassadors
        </Link>
        {/* Option 1: Subtle ribbon badge */}
        <Link
          href="/kit"
          className="relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-semibold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          Creator Kit
          <span className="absolute -top-2 -right-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm">
            SOON
          </span>
        </Link>

        {/* Option 2: Lock icon with tooltip effect */}
        {/* <div className="relative group">
          <Link
            href="/kit"
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500/50 to-orange-500/50 text-black/60 font-semibold px-6 py-2 rounded-full cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
            </svg>
            Creator Kit
          </Link>
          <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Launching January 2024
          </span>
        </div> */}

        {/* Option 3: Countdown style */}
        {/* <Link
          href="/kit"
          className="relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-semibold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          <span className="flex items-center gap-2">
            Creator Kit
            <span className="bg-black/20 text-white text-xs px-2 py-0.5 rounded">
              15 days
            </span>
          </span>
        </Link> */}

        {/* Option 4: Beta badge style */}
        {/* <Link
          href="/kit"
          className="relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-semibold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          Creator Kit
          <sup className="ml-1 text-xs font-bold text-purple-600">BETA</sup>
        </Link> */}

        {/* Option 5: Notification dot */}
        {/* <Link
          href="/kit"
          className="relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-semibold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          Creator Kit
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-purple-500 rounded-full animate-ping"></span>
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-purple-500 rounded-full"></span>
        </Link> */}
        {isAuthenticated && (
          <>
            <div className="w-4"></div>
            <button
              onClick={() => {
                logout();
                window.location.href = "/?view=home";
              }}
              className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <span className="text-sm">🚪</span>
              Sign Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
