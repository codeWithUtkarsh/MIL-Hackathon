"use client";

import { useState } from "react";
import AmbassadorSigninPopup from "../components/AmbassadorSigninPopup";
import CreatorSignupPopup from "../components/CreatorSignupPopup";
import AmbassadorDashboardPage from "./ambassador-dashboard";
import CreatorDashboardPage from "./creator-dashboard";

export default function HomePage() {
  const [showAmbassadorPopup, setShowAmbassadorPopup] = useState(false);
  const [showCreatorPopup, setShowCreatorPopup] = useState(false);
  const [showAmbassadorDashboard, setShowAmbassadorDashboard] = useState(false);
  const [showCreatorDashboard, setShowCreatorDashboard] = useState(false);

  const handleAmbassadorSignin = () => {
    setShowAmbassadorPopup(false);
    setShowAmbassadorDashboard(true);
  };

  const handleCreatorSignup = () => {
    setShowCreatorPopup(false);
    setShowCreatorDashboard(true);
  };

  if (showAmbassadorDashboard) {
    return <AmbassadorDashboardPage />;
  }

  if (showCreatorDashboard) {
    return <CreatorDashboardPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Knowledge Particles */}
        <div
          className="absolute top-20 left-10 w-3 h-3 bg-amber-400/40 rounded-full animate-float"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-32 right-20 w-2 h-2 bg-purple-400/50 rounded-full animate-sparkle"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-64 left-1/4 w-2.5 h-2.5 bg-blue-400/45 rounded-full animate-float-slow"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-80 right-1/3 w-1.5 h-1.5 bg-amber-300/35 rounded-full animate-sparkle"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-3 h-3 bg-purple-300/40 rounded-full animate-float"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute bottom-60 right-16 w-2 h-2 bg-blue-300/50 rounded-full animate-float-slow"
          style={{ animationDelay: "2.5s" }}
        ></div>
        <div
          className="absolute top-1/3 left-3/4 w-2 h-2 bg-yellow-400/40 rounded-full animate-sparkle"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/2 w-1.5 h-1.5 bg-indigo-400/35 rounded-full animate-float"
          style={{ animationDelay: "5s" }}
        ></div>

        {/* Glowing Educational Orbs */}
        <div
          className="absolute top-1/4 left-1/6 w-24 h-24 bg-gradient-to-r from-amber-400/15 to-yellow-400/15 rounded-full blur-md animate-glow"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/5 w-20 h-20 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-md animate-gentle-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/3 w-28 h-28 bg-gradient-to-r from-blue-400/12 to-purple-400/12 rounded-full blur-lg animate-glow"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-16 right-1/3 w-16 h-16 bg-gradient-to-r from-indigo-400/18 to-cyan-400/18 rounded-full blur-sm animate-gentle-pulse"
          style={{ animationDelay: "3s" }}
        ></div>

        {/* Sliding Knowledge Streams */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div
            className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent animate-slide-across"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/25 to-transparent animate-slide-across"
            style={{ animationDelay: "5s" }}
          ></div>
          <div
            className="absolute top-3/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-slide-across"
            style={{ animationDelay: "10s" }}
          ></div>
          <div
            className="absolute top-1/6 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-slide-across"
            style={{ animationDelay: "12s" }}
          ></div>
        </div>

        {/* Educational Symbol Shapes */}
        <div
          className="absolute top-16 right-1/4 w-10 h-10 border-2 border-amber-400/25 rotate-45 animate-spin"
          style={{ animationDuration: "20s" }}
        >
          <div className="w-full h-full border border-amber-400/15 rotate-45"></div>
        </div>
        <div
          className="absolute bottom-32 left-1/5 w-8 h-8 border-2 border-purple-400/30 rotate-12 animate-spin"
          style={{ animationDuration: "15s", animationDirection: "reverse" }}
        >
          <div className="w-2 h-2 bg-purple-400/20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div
          className="absolute top-1/3 left-1/2 w-6 h-6 border-2 border-blue-400/35 rotate-90 animate-spin"
          style={{ animationDuration: "25s" }}
        >
          <div className="w-1 h-1 bg-blue-400/25 rounded-full absolute top-1 left-1"></div>
          <div className="w-1 h-1 bg-blue-400/25 rounded-full absolute bottom-1 right-1"></div>
        </div>

        {/* Floating Book/Knowledge Icons */}
        <div
          className="absolute top-40 left-1/6 text-2xl text-amber-400/20 animate-float"
          style={{ animationDelay: "2s" }}
        >
          📚
        </div>
        <div
          className="absolute top-2/3 right-1/4 text-xl text-purple-400/25 animate-float-slow"
          style={{ animationDelay: "4s" }}
        >
          💡
        </div>
        <div
          className="absolute bottom-1/2 left-2/3 text-lg text-blue-400/30 animate-sparkle"
          style={{ animationDelay: "6s" }}
        >
          🎓
        </div>
        <div
          className="absolute top-1/2 left-1/12 text-xl text-cyan-400/20 animate-float"
          style={{ animationDelay: "8s" }}
        >
          🧠
        </div>
      </div>
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <div className="inline-block px-4 py-2 bg-amber-500/20 border border-amber-400/40 rounded-full mb-4">
              <span className="text-amber-400 font-semibold tracking-wider text-sm">
                ✨ EMPOWERING DIGITAL LITERACY ✨
              </span>
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
            MIL-CAN
          </h1>
          <div className="text-slate-300 text-lg md:text-xl mb-2 tracking-[0.2em]">
            MEDIA & INFORMATION LITERACY
          </div>
          <div className="text-amber-400 text-xl md:text-2xl font-bold mb-8 tracking-wider">
            CREATORS & AMBASSADORS NETWORK
          </div>
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join a community of educators, content creators, and literacy
            advocates working together to combat misinformation and promote
            critical thinking in the digital age.
          </p>

          {/* Sign In Options */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <button
              onClick={() => setShowAmbassadorPopup(true)}
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-lg overflow-hidden shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-2">
                🎓 Ambassador Sign In
              </span>
            </button>
            <button
              onClick={() => setShowCreatorPopup(true)}
              className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 font-bold rounded-lg shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center gap-2">
                ✍️ Creator Sign Up
              </span>
            </button>
          </div>

          <div className="text-sm text-slate-400">
            New Creator? Sign up above • Ambassador? Contact admin for
            invitation
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-black/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-400 mb-4">
              📚 Our Mission
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Content Creation */}
            <div className="group relative p-8 bg-gradient-to-br from-blue-900/50 to-purple-800/30 rounded-xl border border-amber-400/20 hover:border-amber-400/60 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-400/10 cursor-pointer">
              <div className="absolute top-4 right-4 text-amber-400 text-2xl group-hover:animate-bounce transition-all duration-300 group-hover:scale-110">
                ✍️
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              <div className="mb-4">
                <div className="inline-block px-3 py-1 bg-amber-400/20 text-amber-400 text-xs font-bold rounded-full mb-3">
                  CREATE
                </div>
                <h3 className="text-2xl font-bold text-amber-400 mb-3">
                  Educational Content
                </h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Create engaging, educational content that teaches critical
                thinking, fact-checking, and digital literacy skills to learners
                of all ages.
              </p>
              <div className="mt-6 flex items-center text-amber-400/70 text-sm">
                <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                Open to All Creators
              </div>
            </div>

            {/* Ambassador Network */}
            <div className="group relative p-8 bg-gradient-to-br from-purple-800/50 to-blue-900/30 rounded-xl border border-amber-400/20 hover:border-amber-400/60 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-400/10 cursor-pointer">
              <div className="absolute top-4 right-4 text-amber-400 text-2xl group-hover:animate-pulse transition-all duration-300 group-hover:scale-110">
                🎓
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              <div className="mb-4">
                <div className="inline-block px-3 py-1 bg-purple-600/30 text-amber-400 text-xs font-bold rounded-full mb-3">
                  EDUCATE
                </div>
                <h3 className="text-2xl font-bold text-amber-400 mb-3">
                  Ambassador Program
                </h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Experienced educators and literacy advocates who mentor
                creators, curate content, and lead community initiatives.
                Invitation only.
              </p>
              <div className="mt-6 flex items-center text-amber-400/70 text-sm">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Invitation Required
              </div>
            </div>

            {/* Community Impact */}
            <div className="group relative p-8 bg-gradient-to-br from-blue-900/50 to-slate-800/30 rounded-xl border border-amber-400/20 hover:border-amber-400/60 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-400/10 cursor-pointer">
              <div className="absolute top-4 right-4 text-amber-400 text-2xl group-hover:animate-spin transition-all duration-700 group-hover:scale-110">
                🌍
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              <div className="mb-4">
                <div className="inline-block px-3 py-1 bg-emerald-600/40 text-amber-400 text-xs font-bold rounded-full mb-3">
                  IMPACT
                </div>
                <h3 className="text-2xl font-bold text-amber-400 mb-3">
                  Global Community
                </h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Building a worldwide network of media literacy advocates working
                together to create a more informed and critical-thinking
                society.
              </p>
              <div className="mt-6 flex items-center text-amber-400/70 text-sm">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                Worldwide Network
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-900/30 to-purple-800/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-amber-400 mb-8">
            🏆 Platform Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-6 bg-black/30 rounded-lg border border-amber-400/30 hover:border-amber-400/60 transition-all duration-300 hover:transform hover:scale-105 hover:bg-black/40 cursor-pointer">
              <div className="text-3xl mb-4 group-hover:animate-bounce">📊</div>
              <div className="text-xl font-bold text-amber-400 mb-2 group-hover:text-amber-300 transition-colors duration-300">
                Leaderboard
              </div>
              <div className="text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
                Track contributions and achievements
              </div>
            </div>
            <div className="group p-6 bg-black/30 rounded-lg border border-amber-400/30 hover:border-amber-400/60 transition-all duration-300 hover:transform hover:scale-105 hover:bg-black/40 cursor-pointer">
              <div className="text-3xl mb-4 group-hover:animate-pulse">🎒</div>
              <div className="text-xl font-bold text-amber-400 mb-2 group-hover:text-amber-300 transition-colors duration-300">
                Creator Kit
              </div>
              <div className="text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
                Tools and resources for content creation
              </div>
            </div>
            <div className="group p-6 bg-black/30 rounded-lg border border-amber-400/30 hover:border-amber-400/60 transition-all duration-300 hover:transform hover:scale-105 hover:bg-black/40 cursor-pointer">
              <div className="text-3xl mb-4 group-hover:animate-bounce">📚</div>
              <div className="text-xl font-bold text-amber-400 mb-2 group-hover:text-amber-300 transition-colors duration-300">
                Asset Library
              </div>
              <div className="text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
                Browse and share educational resources
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-t from-black to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-amber-400 mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of educators and creators who are making a difference
            in the fight against misinformation and digital illiteracy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/leaderboard"
              className="inline-flex items-center px-6 py-3 bg-purple-700 hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              📊 View Leaderboard
            </a>
            <a
              href="/assets"
              className="inline-flex items-center px-6 py-3 bg-transparent border border-slate-400 text-slate-300 hover:bg-slate-800/50 font-semibold rounded-lg transition-colors duration-200"
            >
              📚 Browse Resources
            </a>
          </div>
        </div>
      </section>

      {/* Ambassador Signin Popup */}
      <AmbassadorSigninPopup
        isOpen={showAmbassadorPopup}
        onClose={() => setShowAmbassadorPopup(false)}
        onSuccess={handleAmbassadorSignin}
      />

      {/* Creator Signup Popup */}
      <CreatorSignupPopup
        isOpen={showCreatorPopup}
        onClose={() => setShowCreatorPopup(false)}
        onSuccess={handleCreatorSignup}
      />
    </div>
  );
}
