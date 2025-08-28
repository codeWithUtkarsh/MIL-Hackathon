'use client'

import { useState } from 'react'

export default function AssetsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const assets = [
    {
      id: '1',
      title: 'How to Spot Hidden Ads',
      type: 'video',
      topic: 'ad-transparency',
      creator: '@chriscreates',
      link: 'https://example.com/video1'
    },
    {
      id: '2',
      title: 'Before/After Photo Tricks',
      type: 'carousel',
      topic: 'before-after',
      creator: '@chriscreates',
      link: 'https://example.com/carousel1'
    },
    {
      id: '3',
      title: 'Deepfake Detection Guide',
      type: 'script',
      topic: 'deepfake',
      creator: '@caseycontent',
      link: 'https://example.com/script1'
    }
  ]

  const filteredAssets = assets.filter(asset =>
    asset.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Approved Assets</h1>

      <input
        type="text"
        placeholder="Search assets..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-64 px-3 py-2 border rounded-md"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map(asset => (
          <div key={asset.id} className="rounded-lg border p-6 space-y-4">
            <h3 className="font-semibold">{asset.title}</h3>
            <div className="flex gap-2">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                {asset.type}
              </span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                {asset.topic}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">By {asset.creator}</p>
            <a
              href={asset.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90"
            >
              View Asset
            </a>
          </div>
        ))}
      </div>

      {filteredAssets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No assets found</p>
        </div>
      )}
    </div>
  )
}