"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MainLayout } from "@/components/layout/main-layout"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table"
import { useLeaderboard } from "@/hooks/use-leaderboard"
import { Trophy, TrendingUp, Users, Award } from "lucide-react"
import { LeaderboardPeriod } from "@/lib/types"

// Available branches for filtering
const BRANCHES = [
  "All Branches",
  "Computer Science Engineering",
  "Electronics and Communication",
  "Mechanical Engineering",
  "Physics",
  "Chemistry"
]

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<LeaderboardPeriod>("all-time")
  const [selectedBranch, setSelectedBranch] = useState<string>("All Branches")

  // Fetch leaderboard data based on filters
  const { entries, loading } = useLeaderboard({
    period,
    branch: selectedBranch === "All Branches" ? undefined : selectedBranch
  })

  // Calculate stats
  const totalPoints = entries.reduce((sum, entry) => sum + entry.points, 0)
  const totalUploads = entries.reduce((sum, entry) => sum + entry.uploads, 0)

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-b">
        <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 mb-6">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Leaderboard
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Recognizing our top contributors who make learning better for everyone
            </p>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Banner */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-200 dark:border-blue-800 rounded-xl">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <span className="text-2xl">🏆</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-blue-900 dark:text-blue-200 mb-2">
                Coming Soon: Live Leaderboard
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-300 mb-3">
                The leaderboard will track real contributions and award points for uploads, helpful content, and community engagement.
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-400">
                💡 Start uploading quality content now to be ready when the leaderboard goes live!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-950">
                    <Users className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Contributors</p>
                    <p className="text-2xl font-bold">{entries.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-yellow-100 dark:bg-yellow-950">
                    <Trophy className="h-6 w-6 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Points</p>
                    <p className="text-2xl font-bold">{totalPoints.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-950">
                    <TrendingUp className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Uploads</p>
                    <p className="text-2xl font-bold">{totalUploads}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Filters and Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Rankings</CardTitle>
              <CardDescription>
                Filter by time period or branch to see specific rankings
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Period Filter Tabs */}
              <Tabs
                defaultValue="all-time"
                className="mb-6"
                onValueChange={(value) => setPeriod(value as LeaderboardPeriod)}
              >
                <TabsList>
                  <TabsTrigger value="monthly">
                    <Award className="h-4 w-4" />
                    Monthly
                  </TabsTrigger>
                  <TabsTrigger value="all-time">
                    <Trophy className="h-4 w-4" />
                    All-Time
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Branch Filter Tabs */}
              <Tabs
                defaultValue="All Branches"
                className="mb-6"
                onValueChange={setSelectedBranch}
              >
                <div className="overflow-x-auto">
                  <TabsList className="w-full sm:w-auto">
                    {BRANCHES.map((branch) => (
                      <TabsTrigger key={branch} value={branch} className="text-xs sm:text-sm">
                        {branch === "All Branches" ? "All" : branch.split(" ")[0]}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </Tabs>

              {/* Leaderboard Table */}
              <LeaderboardTable entries={entries} loading={loading} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-dashed">
            <CardContent className="p-8 text-center">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Want to climb the leaderboard?
              </h3>
              <p className="text-muted-foreground mb-4">
                Start contributing by uploading notes, videos, and study materials to earn points
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="/upload"
                  className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 py-3 font-medium hover:bg-primary/90 transition-colors"
                >
                  Upload Content
                </a>
                <a
                  href="/departments"
                  className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-6 py-3 font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Browse Content
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </MainLayout>
  )
}
