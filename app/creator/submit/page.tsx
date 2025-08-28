'use client'

import { useState } from 'react'

export default function CreatorSubmitPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6 py-12">
        <div className="text-6xl">🎉</div>
        <h1 className="text-3xl font-bold">Thank You!</h1>
        <p className="text-lg text-muted-foreground">
          Your asset has been submitted for review.
        </p>
        <a href="/assets" className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded">
          View Assets
        </a>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Submit Educational Asset</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name *</label>
            <input type="text" required className="w-full px-3 py-2 border rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <input type="email" required className="w-full px-3 py-2 border rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Asset Type *</label>
            <select required className="w-full px-3 py-2 border rounded-md">
              <option value="">Select type</option>
              <option value="video">Video</option>
              <option value="carousel">Carousel</option>
              <option value="script">Script</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Topic *</label>
            <select required className="w-full px-3 py-2 border rounded-md">
              <option value="">Select topic</option>
              <option value="ad-transparency">Spot the #ad</option>
              <option value="before-after">Before/After traps</option>
              <option value="deepfake">Deepfake tells</option>
              <option value="verify-30s">Verify in 30s</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input type="text" required maxLength={80} className="w-full px-3 py-2 border rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Link *</label>
            <input type="url" required className="w-full px-3 py-2 border rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Caption (min 80 chars) *</label>
            <textarea required minLength={80} rows={4} className="w-full px-3 py-2 border rounded-md" />
          </div>

          <div>
            <label className="flex items-center">
              <input type="checkbox" required className="mr-2" />
              <span className="text-sm">I consent to submit this content</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-8 py-2 bg-primary text-primary-foreground rounded hover:opacity-90"
        >
          Submit Asset
        </button>
      </form>
    </div>
  )
}