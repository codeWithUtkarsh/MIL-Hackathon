"use client";

import { useState } from "react";
import Header from "../../../components/Header";

export default function CreatorSubmitPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center space-y-6 py-12">
            <div className="text-6xl">🎉</div>
            <h1 className="text-3xl font-bold text-amber-400">Thank You!</h1>
            <p className="text-lg text-slate-300">
              Your asset has been submitted for review.
            </p>
            <a
              href="/assets"
              className="inline-block px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold rounded hover:from-amber-400 hover:to-orange-400 transition-all duration-200"
            >
              View Assets
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-amber-400">
            Submit Educational Asset
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-slate-800/50 p-6 rounded-lg border border-amber-400/20"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-amber-400">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-amber-400/30 bg-slate-900/50 text-white placeholder-slate-400 rounded-md focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-amber-400">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-amber-400/30 bg-slate-900/50 text-white placeholder-slate-400 rounded-md focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-amber-400">
                  Asset Type *
                </label>
                <select
                  required
                  className="w-full px-3 py-2 border border-amber-400/30 bg-slate-900/50 text-white rounded-md focus:outline-none focus:border-amber-400"
                >
                  <option value="">Select type</option>
                  <option value="video">Video</option>
                  <option value="carousel">Carousel</option>
                  <option value="script">Script</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-amber-400">
                  Topic *
                </label>
                <select
                  required
                  className="w-full px-3 py-2 border border-amber-400/30 bg-slate-900/50 text-white rounded-md focus:outline-none focus:border-amber-400"
                >
                  <option value="">Select topic</option>
                  <option value="ad-transparency">Spot the #ad</option>
                  <option value="before-after">Before/After traps</option>
                  <option value="deepfake">Deepfake tells</option>
                  <option value="verify-30s">Verify in 30s</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-amber-400">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  maxLength={80}
                  className="w-full px-3 py-2 border border-amber-400/30 bg-slate-900/50 text-white placeholder-slate-400 rounded-md focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-amber-400">
                  Link *
                </label>
                <input
                  type="url"
                  required
                  className="w-full px-3 py-2 border border-amber-400/30 bg-slate-900/50 text-white placeholder-slate-400 rounded-md focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-amber-400">
                  Caption (min 80 chars) *
                </label>
                <textarea
                  required
                  minLength={80}
                  rows={4}
                  className="w-full px-3 py-2 border border-amber-400/30 bg-slate-900/50 text-white placeholder-slate-400 rounded-md focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="flex items-center text-slate-300">
                  <input type="checkbox" required className="mr-2" />
                  <span className="text-sm">
                    I consent to submit this content
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold rounded hover:from-amber-400 hover:to-orange-400 transition-all duration-200"
            >
              Submit Asset
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
