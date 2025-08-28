export default function LeaderboardPage() {
  const leaderboard = [
    { name: 'Amy Ambassador', role: 'Ambassador', points: 35 },
    { name: 'Chris Creator', role: 'Creator', points: 23 },
    { name: 'Andy Advocate', role: 'Ambassador', points: 20 },
    { name: 'Casey Content', role: 'Creator', points: 10 },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Leaderboard</h1>

      <div className="space-y-4">
        {leaderboard.map((member, index) => (
          <div key={index} className="rounded-lg border p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-muted-foreground">#{index + 1}</div>
              <div>
                <div className="font-semibold">{member.name}</div>
                <div className="text-sm text-muted-foreground">{member.role}</div>
              </div>
            </div>
            <div className="text-2xl font-bold">{member.points} pts</div>
          </div>
        ))}
      </div>
    </div>
  )
}