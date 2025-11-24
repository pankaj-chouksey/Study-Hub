"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Plus, TrendingUp, Clock, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PostCard } from "@/components/discussion/post-card"
import { useDiscussions, usePopularTags } from "@/hooks/use-discussion"

export default function DiscussionPage() {
  const [sortBy, setSortBy] = useState<"recent" | "popular">("recent")
  const [selectedTag, setSelectedTag] = useState<string | undefined>()
  
  const { posts, loading } = useDiscussions({ sortBy, tag: selectedTag })
  const popularTags = usePopularTags(8)

  // Filter posts for "Tips from Seniors" section
  const seniorTips = posts.filter(post => 
    post.tags.includes("seniors") || post.tags.includes("tips")
  ).slice(0, 3)

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Coming Soon Banner */}
        <div className="mb-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
              <span className="text-2xl">🚧</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-yellow-900 dark:text-yellow-200 mb-2">
                Coming Soon: Discussion Forum
              </h3>
              <p className="text-sm text-yellow-800 dark:text-yellow-300 mb-3">
                The discussion forum is currently under development. Soon you'll be able to ask questions, share knowledge, and connect with fellow students.
              </p>
              <p className="text-xs text-yellow-700 dark:text-yellow-400">
                💡 For now, focus on uploading and viewing study materials in the Departments section!
              </p>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 leading-tight">Discussion Forum</h1>
            <p className="text-muted-foreground">
              Ask questions, share knowledge, and connect with peers
            </p>
          </div>
          <Button size="lg" className="gap-2" disabled>
            <Plus className="w-5 h-5" />
            New Post
          </Button>
        </div>

        {/* Tips from Seniors Section */}
        {seniorTips.length > 0 && (
          <Card className="p-6 mb-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <h2 className="text-lg sm:text-xl font-semibold">Tips from Seniors</h2>
            </div>
            <div className="space-y-3">
              {seniorTips.map((post) => (
                <div
                  key={post.id}
                  className="flex items-start gap-3 p-3 bg-background/50 rounded-lg hover:bg-background/80 transition-colors cursor-pointer"
                  onClick={() => window.location.href = `/discussion/${post.id}`}
                >
                  <Lightbulb className="w-4 h-4 text-yellow-500 mt-1 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm line-clamp-1">{post.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {post.author.name} · {post.upvotes} upvotes
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Filters */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Button
                  variant={sortBy === "recent" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy("recent")}
                  className="gap-2"
                >
                  <Clock className="w-4 h-4" />
                  Recent
                </Button>
                <Button
                  variant={sortBy === "popular" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy("popular")}
                  className="gap-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  Popular
                </Button>
              </div>

              {selectedTag && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => setSelectedTag(undefined)}
                >
                  {selectedTag} ×
                </Badge>
              )}
            </div>

            {/* Posts List */}
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="p-6 h-48 animate-pulse bg-muted" />
                ))}
              </div>
            ) : posts.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">
                  No discussions found. Be the first to start a conversation!
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Tags */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map(({ tag, count }) => (
                  <Badge
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    className="cursor-pointer hover:bg-accent"
                    onClick={() => setSelectedTag(selectedTag === tag ? undefined : tag)}
                  >
                    {tag} ({count})
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Guidelines */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Community Guidelines</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Be respectful and constructive</li>
                <li>• Search before posting</li>
                <li>• Use clear, descriptive titles</li>
                <li>• Add relevant tags</li>
                <li>• Help others when you can</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
