"use client";

import { useState } from "react";
import Header from "../../components/Header";

export default function AssetsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tools & Tutorials");

  const categories = [
    "Tools & Tutorials",
    "Educational Materials",
    "Research & Studies",
  ];

  const factCheckingTools = [
    {
      title: "Snopes",
      description: "Comprehensive fact-checking database",
      link: "https://www.snopes.com",
    },
    {
      title: "PolitiFact",
      description: "Political fact-checking platform",
      link: "https://www.politifact.com",
    },
    {
      title: "FactCheck.org",
      description: "Independent fact-checking organization",
      link: "https://www.factcheck.org",
    },
  ];

  const digitalLiteracyResources = [
    {
      title: "Common Sense Media",
      description: "Digital citizenship education",
      link: "https://www.commonsensemedia.org",
    },
    {
      title: "Mozilla Foundation",
      description: "Web literacy resources",
      link: "https://foundation.mozilla.org",
    },
    {
      title: "Digital Wellness Institute",
      description: "Healthy technology use",
      link: "https://www.digitalwellnessinstitute.com",
    },
  ];

  const onlineSafetyResources = [
    {
      title: "Stop, Think, Connect",
      description: "Cybersecurity awareness",
      link: "https://www.stopthinkconnect.org",
    },
    {
      title: "ConnectSafely",
      description: "Safe social networking tips",
      link: "https://www.connectsafely.org",
    },
    {
      title: "Digital Citizenship Institute",
      description: "Ethics in digital spaces",
      link: "https://www.digitalcitizenship.net",
    },
  ];

  const allResources = [
    ...factCheckingTools.map((r) => ({
      ...r,
      category: "Fact-Checking Toolkit",
    })),
    ...digitalLiteracyResources.map((r) => ({
      ...r,
      category: "Digital Literacy Resources",
    })),
    ...onlineSafetyResources.map((r) => ({
      ...r,
      category: "Online Safety & Ethics",
    })),
  ];

  const filteredResources = allResources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <Header />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-5xl font-bold text-yellow-400">
            Resource Library
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Comprehensive collection of media literacy tools, resources, and
            educational materials
          </p>
        </div>

        {/* What You'll Find Here Section */}
        <div className="bg-gradient-to-r from-blue-800/50 to-purple-800/50 rounded-xl p-8 mb-12 backdrop-blur-sm border border-blue-400/20">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">📚</span>
            <h2 className="text-2xl font-bold text-yellow-400">
              What You'll Find Here
            </h2>
          </div>
          <p className="text-gray-200 mb-6 leading-relaxed">
            Our resource library is designed to empower educators, students, and
            digital citizens with the tools and knowledge needed to navigate
            today's complex media landscape. From fact-checking toolkits to
            educational activities, these resources help build critical thinking
            skills and combat misinformation in communities worldwide.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-lg">🔍</span>
              <span className="text-gray-300">Fact-checking tools</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">📖</span>
              <span className="text-gray-300">Educational materials</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">💡</span>
              <span className="text-gray-300">Digital safety guides</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">📊</span>
              <span className="text-gray-300">Research insights</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-2xl mx-auto block px-6 py-3 rounded-full bg-purple-800/30 border border-purple-400/30 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 focus:bg-purple-800/40 transition-all"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-purple-800/30 text-gray-300 hover:bg-purple-700/40 border border-purple-400/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Resource Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Fact-Checking Toolkit */}
          <div className="bg-gradient-to-br from-purple-800/40 to-blue-800/40 rounded-xl p-6 backdrop-blur-sm border border-purple-400/20">
            <h3 className="text-xl font-bold text-white mb-2">
              Fact-Checking Toolkit
            </h3>
            <p className="text-gray-300 text-sm mb-6">
              Essential tools for verifying information online
            </p>

            <div className="space-y-4">
              {factCheckingTools.map((tool, index) => (
                <a
                  key={index}
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-purple-900/30 rounded-lg p-4 hover:bg-purple-900/40 transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-yellow-400 mb-1 group-hover:underline">
                        {tool.title}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {tool.description}
                      </p>
                    </div>
                    <svg
                      className="w-4 h-4 text-gray-400 ml-2 mt-1 group-hover:text-yellow-400 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Digital Literacy Resources */}
          <div className="bg-gradient-to-br from-purple-800/40 to-blue-800/40 rounded-xl p-6 backdrop-blur-sm border border-purple-400/20">
            <h3 className="text-xl font-bold text-white mb-2">
              Digital Literacy Resources
            </h3>
            <p className="text-gray-300 text-sm mb-6">
              Building skills for the digital age
            </p>

            <div className="space-y-4">
              {digitalLiteracyResources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-purple-900/30 rounded-lg p-4 hover:bg-purple-900/40 transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-yellow-400 mb-1 group-hover:underline">
                        {resource.title}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {resource.description}
                      </p>
                    </div>
                    <svg
                      className="w-4 h-4 text-gray-400 ml-2 mt-1 group-hover:text-yellow-400 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Online Safety & Ethics */}
          <div className="bg-gradient-to-br from-purple-800/40 to-blue-800/40 rounded-xl p-6 backdrop-blur-sm border border-purple-400/20">
            <h3 className="text-xl font-bold text-white mb-2">
              Online Safety & Ethics
            </h3>
            <p className="text-gray-300 text-sm mb-6">
              Staying safe and ethical online
            </p>

            <div className="space-y-4">
              {onlineSafetyResources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-purple-900/30 rounded-lg p-4 hover:bg-purple-900/40 transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-yellow-400 mb-1 group-hover:underline">
                        {resource.title}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {resource.description}
                      </p>
                    </div>
                    <svg
                      className="w-4 h-4 text-gray-400 ml-2 mt-1 group-hover:text-yellow-400 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Search Results (if searching) */}
        {searchQuery && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-yellow-400 mb-6">
              Search Results{" "}
              {filteredResources.length > 0 && `(${filteredResources.length})`}
            </h3>
            {filteredResources.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-gradient-to-br from-purple-800/40 to-blue-800/40 rounded-xl p-6 backdrop-blur-sm border border-purple-400/20 hover:border-yellow-400/30 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-xs text-blue-300">
                        {resource.category}
                      </div>
                      <svg
                        className="w-4 h-4 text-gray-400 group-hover:text-yellow-400 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-yellow-400 mb-2 group-hover:underline">
                      {resource.title}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {resource.description}
                    </p>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">
                No resources found matching your search.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
