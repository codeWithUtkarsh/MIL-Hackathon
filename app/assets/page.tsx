"use client";

import { useState } from "react";
import Header from "../../components/Header";

export default function AssetsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const assets = [
    {
      id: "1",
      title: "How to Spot Hidden Ads",
      type: "video",
      topic: "ad-transparency",
      creator: "@chriscreates",
      link: "https://example.com/video1",
    },
    {
      id: "2",
      title: "Before/After Photo Tricks",
      type: "carousel",
      topic: "before-after",
      creator: "@chriscreates",
      link: "https://example.com/carousel1",
    },
    {
      id: "3",
      title: "Deepfake Detection Guide",
      type: "script",
      topic: "deepfake",
      creator: "@caseycontent",
      link: "https://example.com/script1",
    },
  ];

  const filteredAssets = assets.filter((asset) =>
    asset.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-6">
        <h1 className="text-3xl font-bold text-amber-400">Approved Assets</h1>

        <input
          type="text"
          placeholder="Search assets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-64 px-3 py-2 border border-amber-400/30 bg-slate-800/50 text-white placeholder-slate-400 rounded-md focus:outline-none focus:border-amber-400"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="rounded-lg border border-amber-400/20 bg-slate-800/50 p-6 space-y-4 hover:border-amber-400/40 transition-all duration-300"
            >
              <h3 className="font-semibold text-amber-400">{asset.title}</h3>
              <div className="flex gap-2">
                <span className="text-xs bg-blue-900/50 text-blue-400 px-2 py-1 rounded">
                  {asset.type}
                </span>
                <span className="text-xs bg-green-900/50 text-green-400 px-2 py-1 rounded">
                  {asset.topic}
                </span>
              </div>
              <p className="text-sm text-slate-400">By {asset.creator}</p>
              <a
                href={asset.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold rounded hover:from-amber-400 hover:to-orange-400 transition-all duration-200"
              >
                View Asset
              </a>
            </div>
          ))}
        </div>

        {filteredAssets.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            No assets found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
