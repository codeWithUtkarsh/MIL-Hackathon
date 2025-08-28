export default function KitPage() {
  const resources = [
    { name: 'Presentation Slides', description: 'Ready-to-use slides for your event' },
    { name: 'Facilitator Guide', description: 'Step-by-step instructions' },
    { name: 'Code of Conduct', description: 'Safety guidelines for events' },
    { name: 'Activity Templates', description: 'Interactive exercises' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Event Kit</h1>
      <p className="text-lg text-muted-foreground">
        Download resources to run media literacy events.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {resources.map((resource, index) => (
          <div key={index} className="rounded-lg border p-6 space-y-4">
            <h3 className="font-semibold">{resource.name}</h3>
            <p className="text-sm text-muted-foreground">{resource.description}</p>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90">
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}