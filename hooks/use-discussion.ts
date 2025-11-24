"use client"

import { useState, useEffect, useMemo } from "react"
import { DiscussionPost, Comment } from "@/lib/types"
import { MOCK_DISCUSSIONS } from "@/lib/constants"

interface UseDiscussionsOptions {
  tag?: string
  authorId?: string
  sortBy?: "recent" | "popular"
  limit?: number
}

interface UseDiscussionsReturn {
  posts: DiscussionPost[]
  loading: boolean
  error: Error | null
  refetch: () => void
}

/**
 * Custom hook for fetching discussion posts
 * In production, this would make API calls to the backend
 */
export function useDiscussions(options: UseDiscussionsOptions = {}): UseDiscussionsReturn {
  const [posts, setPosts] = useState<DiscussionPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchDiscussions = async () => {
    setLoading(true)
    setError(null)

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))

      let filtered = [...MOCK_DISCUSSIONS]

      // Filter by tag
      if (options.tag) {
        filtered = filtered.filter(p => p.tags.includes(options.tag!))
      }

      // Filter by author
      if (options.authorId) {
        filtered = filtered.filter(p => p.authorId === options.authorId)
      }

      // Sort
      if (options.sortBy === "popular") {
        filtered.sort((a, b) => b.upvotes - a.upvotes)
      } else {
        // Default: sort by recent
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      }

      // Apply limit if specified
      if (options.limit) {
        filtered = filtered.slice(0, options.limit)
      }

      setPosts(filtered)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch discussions"))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDiscussions()
  }, [options.tag, options.authorId, options.sortBy, options.limit])

  return {
    posts,
    loading,
    error,
    refetch: fetchDiscussions
  }
}

/**
 * Hook to get a single discussion post by ID
 */
export function useDiscussionPost(id: string) {
  const [post, setPost] = useState<DiscussionPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true)
      setError(null)

      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 200))

        const found = MOCK_DISCUSSIONS.find(p => p.id === id)
        
        if (!found) {
          throw new Error("Discussion post not found")
        }

        setPost(found)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch discussion post"))
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  return { post, loading, error }
}

/**
 * Hook to get popular tags from discussions
 */
export function usePopularTags(limit: number = 10) {
  const tags = useMemo(() => {
    const tagCounts = new Map<string, number>()

    MOCK_DISCUSSIONS.forEach(post => {
      post.tags.forEach(tag => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
      })
    })

    return Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([tag, count]) => ({ tag, count }))
  }, [limit])

  return tags
}

/**
 * Hook to get discussion statistics
 */
export function useDiscussionStats() {
  const stats = useMemo(() => {
    const totalPosts = MOCK_DISCUSSIONS.length
    const totalUpvotes = MOCK_DISCUSSIONS.reduce((sum, post) => sum + post.upvotes, 0)
    const totalReplies = MOCK_DISCUSSIONS.reduce((sum, post) => sum + post.replies.length, 0)
    const avgUpvotes = totalUpvotes / totalPosts

    return {
      totalPosts,
      totalUpvotes,
      totalReplies,
      avgUpvotes: Math.round(avgUpvotes)
    }
  }, [])

  return stats
}

/**
 * Hook to manage comment form state
 */
export function useCommentForm() {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async (postId: string, parentId?: string) => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      // In production, this would make an API call to create the comment
      console.log("Creating comment:", { postId, parentId, content })

      // Reset form
      setContent("")
      return true
    } catch (err) {
      console.error("Failed to submit comment:", err)
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  const reset = () => {
    setContent("")
  }

  return {
    content,
    setContent,
    isSubmitting,
    submit,
    reset
  }
}
