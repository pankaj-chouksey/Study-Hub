"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Download, Star, FileText, Video, FileQuestion, Sparkles, Filter } from "lucide-react"
import { motion } from "framer-motion"
import { Content, ContentType } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"
import { useApprovedContent } from "@/hooks/use-approved-content"
import { getContentUrl } from "@/lib/content-url"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const typeIconMap = {
  note: FileText,
  video: Video,
  pyq: FileQuestion,
  important: Sparkles
}

const typeColorMap = {
  note: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  video: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400",
  pyq: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
  important: "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-400"
}

export default function AllContentPage() {
  const { content, isLoading } = useApprovedContent()
  const [typeFilter, setTypeFilter] = useState<ContentType | "all">("all")
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "rating">("recent")

  // Filter and sort content
  let filteredContent = content
  
  if (typeFilter !== "all") {
    filteredContent = filteredContent.filter(c => c.type === typeFilter)
  }

  switch (sortBy) {
    case "recent":
      filteredContent = filteredContent.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      break
    case "popular":
      filteredContent = filteredContent.sort((a, b) => b.views - a.views)
      break
    case "rating":
      filteredContent = filteredContent.sort((a, b) => b.rating - a.rating)
      break
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 leading-tight">All Content</h1>
          <p className="text-muted-foreground">
            Browse all approved study materials
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as ContentType | "all")}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Content Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="note">Notes</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="pyq">PYQs</SelectItem>
                <SelectItem value="important">Important</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Select value={sortBy} onValueChange={(value) => setSortBy(value as "recent" | "popular" | "rating")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>

          <div className="sm:ml-auto text-sm text-muted-foreground flex items-center">
            {filteredContent.length} {filteredContent.length === 1 ? 'item' : 'items'}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2 text-muted-foreground">Loading content...</span>
          </div>
        )}

        {/* Content Grid */}
        {!isLoading && filteredContent.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No content found.</p>
            <Button asChild className="mt-4">
              <Link href="/upload">Upload Content</Link>
            </Button>
          </div>
        )}

        {!isLoading && filteredContent.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredContent.map((content, index) => (
              <ContentCard key={content.id} content={content} index={index} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  )
}

function ContentCard({ content, index }: { content: Content; index: number }) {
  const TypeIcon = typeIconMap[content.type]
  const typeColorClass = typeColorMap[content.type]

  // Generate URL that links to correct subject from constants
  const contentUrl = getContentUrl(content)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
    >
      <Link href={contentUrl}>
        <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer h-full overflow-hidden">
          {/* Thumbnail */}
          <div className="relative aspect-video bg-muted overflow-hidden">
            {content.thumbnail ? (
              <Image
                src={content.thumbnail}
                alt={content.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-200"
                loading="lazy"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gradient-to-br from-muted to-muted/50">
                <TypeIcon className="h-16 w-16 text-muted-foreground/30" />
              </div>
            )}
            <div className="absolute top-2 right-2">
              <Badge className={typeColorClass}>
                <TypeIcon className="h-3 w-3 mr-1" />
                {content.type.toUpperCase()}
              </Badge>
            </div>
          </div>

          <CardContent className="p-4 space-y-3">
            {/* Title */}
            <h3 className="font-semibold text-base line-clamp-2 group-hover:text-primary transition-colors">
              {content.title}
            </h3>

            {/* Department & Branch */}
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs">
                {content.department}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {content.branch}
              </Badge>
            </div>

            {/* Uploader */}
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={content.uploader.avatar} alt={content.uploader.name} />
                <AvatarFallback>{content.uploader.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground truncate">
                {content.uploader.name}
              </span>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{content.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{content.views >= 1000 ? `${(content.views / 1000).toFixed(1)}k` : content.views}</span>
              </div>
              {content.type !== "video" && (
                <div className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  <span>{content.downloads}</span>
                </div>
              )}
            </div>

            {/* Time */}
            <div className="text-xs text-muted-foreground">
              {formatDistanceToNow(content.createdAt, { addSuffix: true })}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
