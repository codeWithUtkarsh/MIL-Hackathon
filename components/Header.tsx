"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

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
        <button
          onClick={() => (window.location.href = "/")}
          className="font-medium transition-colors text-white hover:text-amber-400"
        >
          Ambassadors
        </button>
        <Link
          href="/kit"
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-semibold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          Creator Kit
        </Link>
      </div>
    </nav>
  );
}
