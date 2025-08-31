"use client";

import { useState, useEffect } from "react";
import AmbassadorSigninPopup from "../components/AmbassadorSigninPopup";
import CreatorSignupPopup from "../components/CreatorSignupPopup";
import AmbassadorDashboardPage from "./ambassador-dashboard";
import CreatorDashboardPage from "./creator-dashboard";
import Header from "../components/Header";
import { useAuth } from "../lib/auth-context";

export default function Home() {
  const [showAmbassadorPopup, setShowAmbassadorPopup] = useState(false);
  const [showCreatorPopup, setShowCreatorPopup] = useState(false);
  const [showAmbassadorDashboard, setShowAmbassadorDashboard] = useState(false);
  const [showCreatorDashboard, setShowCreatorDashboard] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const handleAmbassadorSignin = () => {
    setShowAmbassadorPopup(false);
    setShowAmbassadorDashboard(true);
  };

  // Check if user is already authenticated and redirect to dashboard
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "admin" || user.role === "ambassador") {
        setShowAmbassadorDashboard(true);
      }
    }
  }, [isAuthenticated, user]);

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
    <div className="min-h-screen relative overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Header Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen px-4 z-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-block px-4 py-2 bg-amber-500/20 border border-amber-400/40 rounded-full mb-8">
              <span className="text-amber-400 font-semibold tracking-wider text-sm">
                ✨ EMPOWERING DIGITAL LITERACY
              </span>
            </div>
          </div>

          <h1
            className="text-6xl md:text-8xl font-black mb-8 text-purple-400"
            style={{
              textShadow: `
                0 0 20px rgba(168, 85, 247, 0.8),
                0 0 40px rgba(168, 85, 247, 0.6),
                0 0 60px rgba(168, 85, 247, 0.4)
              `,
            }}
          >
            MIL-CAN
          </h1>

          <div className="text-white text-2xl md:text-3xl mb-4 font-bold tracking-wider">
            MEDIA & INFORMATION LITERACY
          </div>
          <div className="text-purple-300 text-xl md:text-2xl font-bold mb-12 tracking-wider">
            CREATORS & AMBASSADORS NETWORK
          </div>

          <p className="text-lg text-slate-300 mb-16 max-w-3xl mx-auto leading-relaxed">
            Join a community of educators, content creators, and literacy
            advocates working together to combat misinformation and promote
            critical thinking in the digital age.
          </p>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-black/30 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-3xl mb-2">👤</div>
              <div className="text-amber-400 text-3xl font-bold mb-1">
                1,247
              </div>
              <div className="text-gray-300 text-sm">Active Creators</div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-3xl mb-2">🎓</div>
              <div className="text-purple-400 text-3xl font-bold mb-1">368</div>
              <div className="text-gray-300 text-sm">Ambassadors</div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-3xl mb-2">📄</div>
              <div className="text-pink-400 text-3xl font-bold mb-1">15420</div>
              <div className="text-gray-300 text-sm">Content Pieces</div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-3xl mb-2">🎪</div>
              <div className="text-red-400 text-3xl font-bold mb-1">892</div>
              <div className="text-gray-300 text-sm">Events Hosted</div>
            </div>
          </div>
        </div>
      </section>

      {/* Ambassador and Creator Sign Up Options */}
      <section className="relative py-20 px-4 z-20 bg-black/40">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-slate-300 mb-12 text-lg">
            Choose your path and join our community today
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {isAuthenticated ? (
              <div className="text-center">
                <div className="text-amber-400 font-bold text-lg mb-2">
                  Welcome back, {user?.name}!
                </div>
                <div className="text-slate-300 text-sm mb-4">
                  {user?.role === "admin" ? "Administrator" : "Ambassador"} •{" "}
                  {user?.country} • {user?.points} points
                </div>
                <button
                  onClick={() => setShowAmbassadorDashboard(true)}
                  className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-green-500/25 min-w-[280px]"
                >
                  <span className="relative flex items-center gap-2">
                    🎓 Go to Dashboard
                  </span>
                </button>
                <button
                  onClick={logout}
                  className="ml-4 px-4 py-2 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setShowAmbassadorPopup(true)}
                  className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 min-w-[280px]"
                >
                  <div className="absolute inset-0 bg-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <span className="relative flex items-center gap-2">
                    🎓 Ambassador Sign In
                  </span>
                </button>
                <button
                  onClick={() => setShowCreatorPopup(true)}
                  className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 font-bold rounded-lg shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 transform hover:scale-105 min-w-[280px]"
                >
                  <span className="flex items-center gap-2">
                    ✍️ Creator Sign Up
                  </span>
                </button>
              </>
            )}
          </div>

          <div className="text-sm text-slate-400 mt-4">
            {isAuthenticated ? (
              <>
                Authenticated as {user?.name} • Role: {user?.role}
              </>
            ) : (
              <>New Creator? Sign up above • Ambassador? Use demo credentials</>
            )}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-black/50 relative z-20">
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

      {/* Call to Action */}
      <section className="py-20 px-4 bg-black/60 relative z-20">
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

      {/* What Our Community Says */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-800 to-purple-900 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              💬 What Our Community Says
            </h2>
            <p className="text-lg text-purple-200 max-w-3xl mx-auto">
              Real testimonials from creators and ambassadors making an impact
              in digital literacy education.
            </p>
          </div>

          <div className="overflow-hidden">
            <div className="flex gap-6 animate-scroll-left">
              {/* Carlos Martinez */}
              <div className="bg-black/30 backdrop-blur-sm border border-purple-400/30 rounded-xl p-6 hover:border-purple-400/60 transition-all duration-300 flex-shrink-0 w-80">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center text-2xl mr-3">
                    👨‍🏫
                  </div>
                  <div>
                    <div className="text-white font-bold">Carlos Martinez</div>
                    <div className="text-amber-400 text-sm">
                      High School Teacher
                    </div>
                  </div>
                </div>
                <p className="text-purple-200 text-sm leading-relaxed">
                  "My students love the interactive content and real-world
                  applications. Finally, media literacy that actually engages!"
                </p>
              </div>

              {/* Dr. Sarah Chen */}
              <div className="bg-black/30 backdrop-blur-sm border border-purple-400/30 rounded-xl p-6 hover:border-purple-400/60 transition-all duration-300 flex-shrink-0 w-80">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center text-2xl mr-3">
                    👩‍💼
                  </div>
                  <div>
                    <div className="text-white font-bold">Dr. Sarah Chen</div>
                    <div className="text-amber-400 text-sm">
                      Digital Literacy Ambassador
                    </div>
                  </div>
                </div>
                <p className="text-purple-200 text-sm leading-relaxed">
                  "MIL-CAN transformed how I teach media literacy. The creator
                  resources are incredible and my students are more engaged than
                  ever."
                </p>
              </div>

              {/* Alex Rodriguez */}
              <div className="bg-black/30 backdrop-blur-sm border border-purple-400/30 rounded-xl p-6 hover:border-purple-400/60 transition-all duration-300 flex-shrink-0 w-80">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-2xl mr-3">
                    👨‍💻
                  </div>
                  <div>
                    <div className="text-white font-bold">Alex Rodriguez</div>
                    <div className="text-amber-400 text-sm">
                      Content Creator
                    </div>
                  </div>
                </div>
                <p className="text-purple-200 text-sm leading-relaxed">
                  "The badge system keeps me motivated and the AI assistant
                  helps me create better educational content. Love this
                  community!"
                </p>
              </div>

              {/* Maria Silva */}
              <div className="bg-black/30 backdrop-blur-sm border border-purple-400/30 rounded-xl p-6 hover:border-purple-400/60 transition-all duration-300 flex-shrink-0 w-80">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center text-2xl mr-3">
                    👩‍🎓
                  </div>
                  <div>
                    <div className="text-white font-bold">Maria Silva</div>
                    <div className="text-amber-400 text-sm">
                      Campus Ambassador
                    </div>
                  </div>
                </div>
                <p className="text-purple-200 text-sm leading-relaxed">
                  "Running MIL events on campus has been amazing. The platform's
                  resources make it easy to teach students effectively."
                </p>
              </div>
            </div>
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
