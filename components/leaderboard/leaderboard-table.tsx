"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { RankBadge } from "./rank-badge"
import { Trophy, Upload } from "lucide-react"
import { LeaderboardEntry } from "@/lib/types"
import { motion } from "framer-motion"

interface LeaderboardTableProps {
  entries: LeaderboardEntry[]
  loading?: boolean
}

export function LeaderboardTable({ entries, loading = false }: LeaderboardTableProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(10)].map((_, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center gap-4 animate-pulse">
              <div className="w-12 h-12 bg-muted rounded-xl" />
              <div className="h-10 w-10 bg-muted rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-1/3" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
              <div className="h-4 bg-muted rounded w-20" />
              <div className="h-4 bg-muted rounded w-20" />
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (entries.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No entries found</h3>
        <p className="text-muted-foreground">
          Be the first to contribute and climb the leaderboard!
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {entries.map((entry, index) => (
        <motion.div
          key={entry.user.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Card className="group hover:shadow-lg hover:scale-[1.01] transition-all duration-200">
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Rank Badge */}
                <div className="flex-shrink-0">
                  <RankBadge rank={entry.rank} size="md" />
                </div>

                {/* User Avatar */}
                <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
                  <AvatarImage src={entry.user.avatar} alt={entry.user.name} />
                  <AvatarFallback>{entry.user.name[0]}</AvatarFallback>
                </Avatar>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base truncate group-hover:text-primary transition-colors">
                    {entry.user.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    {entry.user.branch}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
                  {/* Points */}
                  <div className="flex items-center gap-1.5">
                    <Trophy className="h-4 w-4 text-yellow-500 hidden sm:block" />
                    <div className="text-right">
                      <div className="text-sm sm:text-base font-bold">
                        {entry.points.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>
                  </div>

                  {/* Uploads */}
                  <div className="flex items-center gap-1.5">
                    <Upload className="h-4 w-4 text-blue-500 hidden sm:block" />
                    <div className="text-right">
                      <div className="text-sm sm:text-base font-bold">
                        {entry.uploads}
                      </div>
                      <div className="text-xs text-muted-foreground">uploads</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
