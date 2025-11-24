"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Award, Upload } from "lucide-react"
import { motion } from "framer-motion"
import { MOCK_LEADERBOARD } from "@/lib/constants"

const rankIcons = {
  1: { icon: Trophy, color: "text-yellow-500", bgColor: "bg-yellow-100 dark:bg-yellow-950" },
  2: { icon: Medal, color: "text-gray-400", bgColor: "bg-gray-100 dark:bg-gray-800" },
  3: { icon: Award, color: "text-amber-600", bgColor: "bg-amber-100 dark:bg-amber-950" }
}

interface TopContributorsProps {
  limit?: number
}

export function TopContributors({ limit = 5 }: TopContributorsProps) {
  const topContributors = MOCK_LEADERBOARD.slice(0, limit)

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 bg-muted/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Top Contributors</h2>
            <p className="text-muted-foreground">
              Recognizing our most active community members
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/leaderboard">
              View Full Leaderboard →
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topContributors.map((entry, index) => {
            const rankConfig = rankIcons[entry.rank as keyof typeof rankIcons]
            const RankIcon = rankConfig?.icon

            return (
              <motion.div
                key={entry.user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Rank Badge */}
                      <div className="flex-shrink-0">
                        {RankIcon ? (
                          <div className={`p-3 rounded-xl ${rankConfig.bgColor}`}>
                            <RankIcon className={`h-6 w-6 ${rankConfig.color}`} />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-muted text-lg font-bold text-muted-foreground">
                            #{entry.rank}
                          </div>
                        )}
                      </div>

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={entry.user.avatar} alt={entry.user.name} />
                            <AvatarFallback>{entry.user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                              {entry.user.name}
                            </h3>
                            <p className="text-xs text-muted-foreground truncate">
                              {entry.user.branch}
                            </p>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-1">
                            <Trophy className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-semibold">
                              {entry.points.toLocaleString()}
                            </span>
                            <span className="text-xs text-muted-foreground">pts</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Upload className="h-4 w-4 text-blue-500" />
                            <span className="text-sm font-semibold">
                              {entry.uploads}
                            </span>
                            <span className="text-xs text-muted-foreground">uploads</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-dashed">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-2">
                Want to see your name here?
              </h3>
              <p className="text-muted-foreground mb-4">
                Start contributing by uploading notes, videos, and study materials
              </p>
              <Button asChild>
                <Link href="/upload">
                  Upload Content
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  )
}
