"use client";

import Header from "../../components/Header";

export default function KitPage() {
  const resources = [
    {
      name: "Presentation Slides",
      description: "Ready-to-use slides for your event",
    },
    {
      name: "Facilitator Guide",
      description: "Step-by-step instructions",
    },
    {
      name: "Code of Conduct",
      description: "Safety guidelines for events",
    },
    {
      name: "Activity Templates",
      description: "Interactive exercises",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-6">
        <h1 className="text-3xl font-bold text-amber-400">Event Kit</h1>
        <p className="text-lg text-slate-300">
          Download resources to run media literacy events.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="rounded-lg border border-amber-400/20 bg-slate-800/50 p-6 space-y-4 hover:border-amber-400/40 transition-all duration-300"
            >
              <h3 className="font-semibold text-amber-400">{resource.name}</h3>
              <p className="text-sm text-slate-400">{resource.description}</p>
              <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold rounded hover:from-amber-400 hover:to-orange-400 transition-all duration-200">
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
