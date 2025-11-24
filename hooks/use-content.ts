"use client"

import { useState, useEffect, useMemo } from "react"
import { Content, ContentType } from "@/lib/types"
import { MOCK_CONTENT } from "@/lib/constants"

interface UseContentOptions {
  department?: string
  branch?: string
  year?: string
  subject?: string
  topic?: string
  type?: ContentType
  status?: "pending" | "approved" | "rejected"
  limit?: number
}

interface UseContentReturn {
  content: Content[]
  loading: boolean
  error: Error | null
  refetch: () => void
}

/**
 * Custom hook for fetching and filtering content
 * In production, this would make API calls to the backend
 */
export function useContent(options: UseContentOptions = {}): UseContentReturn {
  const [content, setContent] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchContent = async () => {
    setLoading(true)
    setError(null)

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))

      // Filter mock content based on options
      let filtered = [...MOCK_CONTENT]

      if (options.department) {
        filtered = filtered.filter(c => c.department === options.department)
      }

      if (options.branch) {
        filtered = filtered.filter(c => c.branch === options.branch)
      }

      if (options.year) {
        filtered = filtered.filter(c => c.year === options.year)
      }

      if (options.subject) {
        filtered = filtered.filter(c => c.subject === options.subject)
      }

      if (options.topic) {
        filtered = filtered.filter(c => c.topic === options.topic)
      }

      if (options.type) {
        filtered = filtered.filter(c => c.type === options.type)
      }

      if (options.status) {
        filtered = filtered.filter(c => c.status === options.status)
      }

      // Apply limit if specified
      if (options.limit) {
        filtered = filtered.slice(0, options.limit)
      }

      // Sort by creation date (newest first)
      filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

      setContent(filtered)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch content"))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContent()
  }, [
    options.department,
    options.branch,
    options.year,
    options.subject,
    options.topic,
    options.type,
    options.status,
    options.limit
  ])

  return {
    content,
    loading,
    error,
    refetch: fetchContent
  }
}

/**
 * Hook to get a single content item by ID
 */
export function useContentById(id: string) {
  const [content, setContent] = useState<Content | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true)
      setError(null)

      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 200))

        const found = MOCK_CONTENT.find(c => c.id === id)
        
        if (!found) {
          throw new Error("Content not found")
        }

        setContent(found)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch content"))
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [id])

  return { content, loading, error }
}

/**
 * Hook to get recent uploads
 */
export function useRecentContent(limit: number = 6) {
  return useContent({ status: "approved", limit })
}

/**
 * Hook to get content statistics
 */
export function useContentStats() {
  const stats = useMemo(() => {
    const approved = MOCK_CONTENT.filter(c => c.status === "approved")
    const pending = MOCK_CONTENT.filter(c => c.status === "pending")

    return {
      total: MOCK_CONTENT.length,
      approved: approved.length,
      pending: pending.length,
      byType: {
        note: MOCK_CONTENT.filter(c => c.type === "note").length,
        video: MOCK_CONTENT.filter(c => c.type === "video").length,
        pyq: MOCK_CONTENT.filter(c => c.type === "pyq").length,
        important: MOCK_CONTENT.filter(c => c.type === "important").length
      }
    }
  }, [])

  return stats
}
