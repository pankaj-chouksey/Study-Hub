"use client"

import { useState, useEffect, useMemo } from "react"
import { LeaderboardEntry, LeaderboardPeriod } from "@/lib/types"
import { MOCK_LEADERBOARD, MOCK_USERS } from "@/lib/constants"

interface UseLeaderboardOptions {
  period?: LeaderboardPeriod
  branch?: string
  limit?: number
}

interface UseLeaderboardReturn {
  entries: LeaderboardEntry[]
  loading: boolean
  error: Error | null
  refetch: () => void
}

/**
 * Custom hook for fetching leaderboard data
 * In production, this would make API calls to the backend
 */
export function useLeaderboard(options: UseLeaderboardOptions = {}): UseLeaderboardReturn {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchLeaderboard = async () => {
    setLoading(true)
    setError(null)

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))

      let filtered = [...MOCK_LEADERBOARD]

      // Filter by period
      if (options.period) {
        filtered = filtered.filter(e => e.period === options.period)
      }

      // Filter by branch
      if (options.branch) {
        filtered = filtered.filter(e => e.user.branch === options.branch)
      }

      // Apply limit if specified
      if (options.limit) {
        filtered = filtered.slice(0, options.limit)
      }

      // Sort by rank
      filtered.sort((a, b) => a.rank - b.rank)

      setEntries(filtered)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch leaderboard"))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeaderboard()
  }, [options.period, options.branch, options.limit])

  return {
    entries,
    loading,
    error,
    refetch: fetchLeaderboard
  }
}

/**
 * Hook to get top contributors for homepage
 */
export function useTopContributors(limit: number = 5) {
  return useLeaderboard({ period: "all-time", limit })
}

/**
 * Hook to get user's leaderboard position
 */
export function useUserRank(userId: string) {
  const [rank, setRank] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRank = async () => {
      setLoading(true)

      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 200))

        const entry = MOCK_LEADERBOARD.find(e => e.user.id === userId)
        setRank(entry?.rank || null)
      } catch (err) {
        setRank(null)
      } finally {
        setLoading(false)
      }
    }

    fetchRank()
  }, [userId])

  return { rank, loading }
}

/**
 * Hook to get leaderboard statistics
 */
export function useLeaderboardStats() {
  const stats = useMemo(() => {
    const totalUsers = MOCK_USERS.filter(u => u.role === "student").length
    const totalPoints = MOCK_LEADERBOARD.reduce((sum, entry) => sum + entry.points, 0)
    const totalUploads = MOCK_LEADERBOARD.reduce((sum, entry) => sum + entry.uploads, 0)
    const avgPoints = totalPoints / MOCK_LEADERBOARD.length

    return {
      totalUsers,
      totalPoints,
      totalUploads,
      avgPoints: Math.round(avgPoints)
    }
  }, [])

  return stats
}
