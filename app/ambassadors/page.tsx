"use client";

import { useState } from "react";
import Header from "../../components/Header";

export default function AmbassadorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");

  const ambassadors = [
    {
      id: 1,
      name: "Amy Ambassador",
      title: "Senior Media Literacy Educator",
      region: "North America",
      location: "Toronto, Canada",
      bio: "Passionate about empowering communities with critical thinking skills. 5+ years experience in media literacy education.",
      expertise: ["Fact-checking", "Digital Citizenship", "Youth Education"],
      events: 35,
      rating: 4.9,
      image: "AA",
      contact: {
        email: "amy.ambassador@milcan.org",
        phone: "+1 (555) 123-4567",
      },
      socials: {
        linkedin: "https://linkedin.com/in/amy-ambassador",
        twitter: "https://twitter.com/amyambassador",
        instagram: "https://instagram.com/amy.teaches",
      },
      availability: "Available for events",
    },
    {
      id: 2,
      name: "Andy Advocate",
      title: "Community Outreach Specialist",
      region: "Europe",
      location: "London, UK",
      bio: "Dedicated to making media literacy accessible to all. Specializing in workshops for underserved communities.",
      expertise: [
        "Community Engagement",
        "Workshop Facilitation",
        "Public Speaking",
      ],
      events: 28,
      rating: 4.8,
      image: "AA",
      contact: {
        email: "andy.advocate@milcan.org",
        phone: "+44 20 7123 4567",
      },
      socials: {
        linkedin: "https://linkedin.com/in/andy-advocate",
        twitter: "https://twitter.com/andyadvocate",
      },
      availability: "Available for events",
    },
    {
      id: 3,
      name: "Sarah Solver",
      title: "Digital Literacy Expert",
      region: "Asia Pacific",
      location: "Sydney, Australia",
      bio: "Helping people navigate the digital world safely. Expert in online safety and privacy education.",
      expertise: ["Online Safety", "Privacy", "Cybersecurity Awareness"],
      events: 42,
      rating: 5.0,
      image: "SS",
      contact: {
        email: "sarah.solver@milcan.org",
        phone: "+61 2 9123 4567",
      },
      socials: {
        linkedin: "https://linkedin.com/in/sarah-solver",
        twitter: "https://twitter.com/sarahsolver",
        youtube: "https://youtube.com/@sarahsolves",
      },
      availability: "Available for events",
    },
    {
      id: 4,
      name: "Marcus Media",
      title: "Youth Engagement Coordinator",
      region: "North America",
      location: "Los Angeles, USA",
      bio: "Connecting with Gen Z through innovative media literacy programs. Former journalist turned educator.",
      expertise: [
        "Youth Programs",
        "Social Media Literacy",
        "Content Creation",
      ],
      events: 31,
      rating: 4.7,
      image: "MM",
      contact: {
        email: "marcus.media@milcan.org",
        phone: "+1 (323) 555-8901",
      },
      socials: {
        linkedin: "https://linkedin.com/in/marcus-media",
        instagram: "https://instagram.com/marcusmedia",
        tiktok: "https://tiktok.com/@marcusmedia",
      },
      availability: "Available for events",
    },
    {
      id: 5,
      name: "Elena Educator",
      title: "Academic Program Director",
      region: "Europe",
      location: "Berlin, Germany",
      bio: "Bridging the gap between academic research and practical media literacy. PhD in Digital Communications.",
      expertise: ["Curriculum Development", "Teacher Training", "Research"],
      events: 25,
      rating: 4.9,
      image: "EE",
      contact: {
        email: "elena.educator@milcan.org",
        phone: "+49 30 12345678",
      },
      socials: {
        linkedin: "https://linkedin.com/in/elena-educator",
        twitter: "https://twitter.com/elenaeducator",
      },
      availability: "Limited availability",
    },
    {
      id: 6,
      name: "David Digital",
      title: "Technology & Innovation Lead",
      region: "Asia Pacific",
      location: "Singapore",
      bio: "Exploring the intersection of technology and media literacy. Specialist in AI and misinformation.",
      expertise: ["AI & Misinformation", "Tech Literacy", "Innovation"],
      events: 38,
      rating: 4.8,
      image: "DD",
      contact: {
        email: "david.digital@milcan.org",
        phone: "+65 6123 4567",
      },
      socials: {
        linkedin: "https://linkedin.com/in/david-digital",
        twitter: "https://twitter.com/daviddigital",
        github: "https://github.com/daviddigital",
      },
      availability: "Available for virtual events",
    },
  ];

  const regions = [
    "all",
    "North America",
    "Europe",
    "Asia Pacific",
    "Africa",
    "South America",
  ];

  const filteredAmbassadors = ambassadors.filter((ambassador) => {
    const matchesSearch =
      ambassador.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ambassador.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ambassador.expertise.some((exp) =>
        exp.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesRegion =
      selectedRegion === "all" || ambassador.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "linkedin":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        );
      case "twitter":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
        );
      case "instagram":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
          </svg>
        );
      case "youtube":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        );
      case "tiktok":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
          </svg>
        );
      case "github":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Dark section for header */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700">
        <Header />
        {/* Gradient transition */}
        <div className="h-32 bg-gradient-to-b from-slate-700 to-transparent"></div>
      </div>

      {/* Light background continues */}
      <div className="bg-gradient-to-b from-slate-50 to-slate-100 -mt-32">
        <div className="container mx-auto px-4 pt-32 pb-16">
          {/* Page Header */}
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-5xl font-light text-slate-900 tracking-tight">
              Meet Our{" "}
              <span className="font-semibold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                Ambassadors
              </span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
              Connect with distinguished media literacy educators and thought
              leaders from around the world
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-12 space-y-6">
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, expertise, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all shadow-sm"
                />
                <svg
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Region Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                    selectedRegion === region
                      ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                      : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                  }`}
                >
                  {region === "all" ? "All Regions" : region}
                </button>
              ))}
            </div>
          </div>

          {/* Ambassadors Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAmbassadors.map((ambassador) => (
              <div
                key={ambassador.id}
                className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {/* Card Header with gradient */}
                <div className="h-2 bg-gradient-to-r from-amber-500 to-orange-500"></div>

                {/* Profile Section */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-lg font-semibold text-white shadow-md">
                        {ambassador.image}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {ambassador.name}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {ambassador.title}
                        </p>
                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {ambassador.location}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${
                        ambassador.availability === "Available for events"
                          ? "bg-emerald-100 text-emerald-700"
                          : ambassador.availability === "Limited availability"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-sky-100 text-sky-700"
                      }`}
                    >
                      {ambassador.availability === "Available for events"
                        ? "Available"
                        : ambassador.availability === "Limited availability"
                          ? "Limited"
                          : "Virtual"}
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {ambassador.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {ambassador.expertise.map((exp, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs bg-slate-100 text-slate-700 rounded-full font-medium"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-100">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-slate-900">
                        {ambassador.events}
                      </div>
                      <div className="text-xs text-slate-500">Events</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-slate-900">
                        {ambassador.rating}
                      </div>
                      <div className="text-xs text-slate-500">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-slate-900">
                        {ambassador.region.split(" ")[0]}
                      </div>
                      <div className="text-xs text-slate-500">Region</div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 my-4">
                    <a
                      href={`mailto:${ambassador.contact.email}`}
                      className="flex items-center gap-2 text-sm text-slate-600 hover:text-amber-600 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="truncate">
                        {ambassador.contact.email}
                      </span>
                    </a>
                    <a
                      href={`tel:${ambassador.contact.phone}`}
                      className="flex items-center gap-2 text-sm text-slate-600 hover:text-amber-600 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      {ambassador.contact.phone}
                    </a>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-2 mb-4">
                    {Object.entries(ambassador.socials).map(
                      ([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-slate-50 rounded-lg text-slate-600 hover:text-amber-600 hover:bg-amber-50 transition-all"
                          title={platform}
                        >
                          {getSocialIcon(platform)}
                        </a>
                      ),
                    )}
                  </div>

                  {/* Contact Button */}
                  <button className="w-full py-3 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-medium rounded-xl hover:from-slate-800 hover:to-slate-700 transition-all shadow-md hover:shadow-lg group-hover:shadow-slate-900/20">
                    Schedule a Coffee Chat
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredAmbassadors.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <p className="text-slate-600 text-lg">
                No ambassadors found matching your criteria.
              </p>
              <p className="text-slate-500 text-sm mt-2">
                Try adjusting your search or filter settings
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
