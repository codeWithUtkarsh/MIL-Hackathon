"use client";

import { useState } from "react";

export default function CreatorDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [userStats] = useState({
    totalUploads: 24,
    viewsThisMonth: 15420,
    likesReceived: 1247,
    commentsReceived: 368,
  });

  const [myContent] = useState([
    {
      id: 1,
      title: "Understanding Digital Footprints",
      type: "Post",
      category: "Digital Literacy",
      status: "Published",
      views: 2340,
      likes: 156,
      uploadDate: "2024-01-15",
      thumbnail: "📱",
    },
    {
      id: 2,
      title: "Fact-Checking Techniques",
      type: "Video",
      category: "Critical Thinking",
      status: "Under Review",
      views: 0,
      likes: 0,
      uploadDate: "2024-01-20",
      thumbnail: "🎥",
    },
    {
      id: 3,
      title: "Social Media Awareness",
      type: "Reel",
      category: "Media Studies",
      status: "Published",
      views: 5680,
      likes: 423,
      uploadDate: "2024-01-18",
      thumbnail: "📹",
    },
    {
      id: 4,
      title: "Information Verification Guide",
      type: "Post",
      category: "Information Science",
      status: "Draft",
      views: 0,
      likes: 0,
      uploadDate: "2024-01-22",
      thumbnail: "📝",
    },
  ]);

  const [activeEvents] = useState([
    {
      id: 1,
      title: "Digital Literacy Week Challenge",
      description: "Create content highlighting the importance of digital literacy in modern education",
      category: "Challenge",
      deadline: "2024-02-15",
      reward: "500 points + Featured placement",
      participants: 156,
      status: "Active",
      color: "from-blue-600 to-purple-600",
    },
    {
      id: 2,
      title: "Misinformation Awareness Campaign",
      description: "Develop educational materials about identifying and combating misinformation",
      category: "Campaign",
      deadline: "2024-02-28",
      reward: "750 points + Ambassador consideration",
      participants: 89,
      status: "Active",
      color: "from-red-600 to-orange-600",
    },
    {
      id: 3,
      title: "Youth Media Literacy Month",
      description: "Content specifically designed for younger audiences (K-12)",
      category: "Monthly Theme",
      deadline: "2024-03-31",
      reward: "300 points + Certificate",
      participants: 203,
      status: "Coming Soon",
      color: "from-green-600 to-teal-600",
    },
  ]);

  const [contentCategories] = useState([
    { name: "Digital Literacy", count: 8, icon: "💻", color: "blue" },
    { name: "Critical Thinking", count: 6, icon: "🧠", color: "purple" },
    { name: "Media Studies", count: 4, icon: "📺", color: "indigo" },
    { name: "Information Science", count: 3, icon: "📊", color: "green" },
    { name: "Education Technology", count: 2, icon: "🎓", color: "yellow" },
    { name: "Communication", count: 1, icon: "💬", color: "pink" },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-900/50 text-green-400 border-green-500/50";
      case "Under Review":
        return "bg-yellow-900/50 text-yellow-400 border-yellow-500/50";
      case "Draft":
        return "bg-slate-700/50 text-slate-400 border-slate-500/50";
      default:
        return "bg-slate-700/50 text-slate-400 border-slate-500/50";
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="p-6 bg-gradient-to-br from-slate-800/50 to-blue-800/30 rounded-xl border border-amber-400/20 hover:border-amber-400/40 transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl">📝</div>
            <div className="text-3xl font-bold text-amber-400">{userStats.totalUploads}</div>
          </div>
          <h3 className="text-slate-300 font-semibold">Total Uploads</h3>
          <p className="text-slate-500 text-sm">Content pieces created</p>
        </div>

        <div className="p-6 bg-gradient-to-br from-slate-800/50 to-purple-800/30 rounded-xl border border-amber-400/20 hover:border-amber-400/40 transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl">👀</div>
            <div className="text-3xl font-bold text-amber-400">{userStats.viewsThisMonth.toLocaleString()}</div>
          </div>
          <h3 className="text-slate-300 font-semibold">Monthly Views</h3>
          <p className="text-slate-500 text-sm">Content engagement</p>
        </div>

        <div className="p-6 bg-gradient-to-br from-slate-800/50 to-emerald-800/30 rounded-xl border border-amber-400/20 hover:border-amber-400/40 transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl">❤️</div>
            <div className="text-3xl font-bold text-amber-400">{userStats.likesReceived}</div>
          </div>
          <h3 className="text-slate-300 font-semibold">Likes Received</h3>
          <p className="text-slate-500 text-sm">Community appreciation</p>
        </div>

        <div className="p-6 bg-gradient-to-br from-slate-800/50 to-indigo-800/30 rounded-xl border border-amber-400/20 hover:border-amber-400/40 transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl">💬</div>
            <div className="text-3xl font-bold text-amber-400">{userStats.commentsReceived}</div>
          </div>
          <h3 className="text-slate-300 font-semibold">Comments</h3>
          <p className="text-slate-500 text-sm">Community discussions</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-slate-800/50 to-amber-800/20 rounded-xl border border-amber-400/20 p-6">
        <h2 className="text-2xl font-bold text-amber-400 mb-6 flex items-center gap-3">
          <span>🚀</span>
          Quick Actions
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <button className="p-4 bg-gradient-to-r from-blue-600/20 to-blue-700/20 hover:from-blue-600/30 hover:to-blue-700/30 border border-blue-500/30 text-blue-400 rounded-lg transition-all duration-200 text-left">
            <div className="text-2xl mb-2">📝</div>
            <div className="font-semibold">Create Post</div>
            <div className="text-xs opacity-75">Write an article or blog post</div>
          </button>
          <button className="p-4 bg-gradient-to-r from-red-600/20 to-red-700/20 hover:from-red-600/30 hover:to-red-700/30 border border-red-500/30 text-red-400 rounded-lg transition-all duration-200 text-left">
            <div className="text-2xl mb-2">🎥</div>
            <div className="font-semibold">Upload Video</div>
            <div className="text-xs opacity-75">Share educational videos</div>
          </button>
          <button className="p-4 bg-gradient-to-r from-purple-600/20 to-purple-700/20 hover:from-purple-600/30 hover:to-purple-700/30 border border-purple-500/30 text-purple-400 rounded-lg transition-all duration-200 text-left">
            <div className="text-2xl mb-2">📹</div>
            <div className="font-semibold">Create Reel</div>
            <div className="text-xs opacity-75">Short-form content</div>
          </button>
        </div>
      </div>

      {/* Content Categories */}
      <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/20 rounded-xl border border-amber-400/20 p-6">
        <h2 className="text-2xl font-bold text-amber-400 mb-6 flex items-center gap-3">
          <span>📊</span>
          Your Content by Category
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {contentCategories.map((category) => (
            <div key={category.name} className="p-4 bg-slate-900/30 rounded-lg border border-slate-700/50 hover:border-amber-400/30 transition-all duration-200">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xl">{category.icon}</div>
                <div className="text-lg font-bold text-amber-400">{category.count}</div>
              </div>
              <div className="text-slate-200 font-medium text-sm">{category.name}</div>
              <div className="text-slate-500 text-xs">Content pieces</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMyContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-amber-400">My Content Library</h2>
        <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 font-semibold rounded-lg hover:from-amber-400 hover:to-yellow-400 transition-all duration-200">
          + New Content
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {["All", "Posts", "Videos", "Reels", "Published", "Under Review", "Drafts"].map((filter) => (
          <button
            key={filter}
            className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600 hover:border-amber-400/50 text-slate-300 hover:text-amber-400 rounded-lg transition-all duration-200 whitespace-nowrap text-sm"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {myContent.map((content) => (
          <div key={content.id} className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 rounded-xl border border-slate-600/50 hover:border-amber-400/30 p-6 transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{content.thumbnail}</div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-200">{content.title}</h3>
                  <p className="text-sm text-slate-400">{content.category}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(content.status)}`}>
                {content.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-amber-400">{content.views}</div>
                <div className="text-xs text-slate-500">Views</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-amber-400">{content.likes}</div>
                <div className="text-xs text-slate-500">Likes</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-amber-400">{content.type}</div>
                <div className="text-xs text-slate-500">Type</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-500">
                Uploaded: {new Date(content.uploadDate).toLocaleDateString()}
              </p>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-md hover:bg-blue-600/30 transition-colors duration-200">
                  Edit
                </button>
                <button className="px-3 py-1 bg-amber-600/20 text-amber-400 text-xs rounded-md hover:bg-amber-600/30 transition-colors duration-200">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderActiveEvents = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-amber-400">Active Events & Challenges</h2>
        <div className="text-sm text-slate-400">
          Join events to earn rewards and recognition
        </div>
      </div>

      <div className="space-y-6">
        {activeEvents.map((event) => (
          <div key={event.id} className={`bg-gradient-to-r ${event.color} bg-opacity-10 rounded-xl border border-opacity-30 p-6 hover:scale-[1.01] transition-all duration-300`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-white">{event.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    event.status === 'Active' ? 'bg-green-900/50 text-green-400' : 'bg-blue-900/50 text-blue-400'
                  }`}>
                    {event.status}
                  </span>
                </div>
                <p className="text-slate-300 mb-3">{event.description}</p>
                <div className="text-sm text-slate-400 space-y-1">
                  <div>📅 Deadline: {new Date(event.deadline).toLocaleDateString()}</div>
                  <div>🏆 Reward: {event.reward}</div>
                  <div>👥 Participants: {event.participants}</div>
                </div>
              </div>
              <div className="flex flex-col gap-2 ml-4">
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-200">
                  Join Event
                </button>
                <button className="px-4 py-2 bg-transparent border border-white/30 hover:border-white/50 text-white text-sm rounded-lg transition-all duration-200">
                  Learn More
                </button>
              </div>
            </div>

            <div className="bg-black/20 rounded-lg p-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Category: {event.category}</span>
                <span>Time remaining: {Math.ceil((new Date(event.deadline).getTime() - new Date().getTime()) / (1000 * 3600 * 24))} days</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Past Events */}
      <div className="bg-gradient-to-br from-slate-800/30 to-slate-700/20 rounded-xl border border-slate-600/30 p-6">
        <h3 className="text-lg font-semibold text-slate-300 mb-4">Past Events You Participated In</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-900/30 rounded-lg">
            <div>
              <div className="text-slate-200 font-medium">Summer Media Literacy Challenge</div>
              <div className="text-xs text-slate-500">Completed July 2023 • Earned 400 points</div>
            </div>
            <span className="px-2 py-1 bg-green-900/50 text-green-400 text-xs rounded-full">Completed</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-900/30 rounded-lg">
            <div>
              <div className="text-slate-200 font-medium">Critical Thinking Week</div>
              <div className="text-xs text-slate-500">Completed September 2023 • Earned 300 points</div>
            </div>
            <span className="px-2 py-1 bg-green-900/50 text-green-400 text-xs rounded-full">Completed</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-yellow-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-3 h-3 bg-amber-400/30 rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-40 right-32 w-2 h-2 bg-yellow-400/40 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-r from-amber-400/10 to-yellow-400/10 rounded-full blur-md animate-pulse" style={{animationDelay: '1s'}}></div>
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
            <div className="text-4xl">✍️</div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                Creator Dashboard
              </h1>
              <p className="text-slate-300 text-lg">Welcome back, Content Creator!</p>
            </div>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-transparent"></div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: "overview", label: "Overview", icon: "📊" },
              { id: "content", label: "My Content", icon: "📚" },
              { id: "events", label: "Active Events", icon: "🎯" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900"
                    : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-amber-400"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && renderOverview()}
        {activeTab === "content" && renderMyContent()}
        {activeTab === "events" && renderActiveEvents()}
      </div>
    </div>
  );
}
