"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Eye, Download, Star, FileText, Video, FileQuestion, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { Content } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"
import { useApprovedContent } from "@/hooks/use-approved-content"

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

interface RecentUploadsProps {
  limit?: number
}

export function RecentUploads({ limit = 6 }: RecentUploadsProps) {
  // Fetch approved content from MongoDB
  const { content, isLoading } = useApprovedContent();

  // Filter approved content and sort by date, then limit
  const recentContent = content
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit)

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold">Recent Uploads</h2>
        <Link 
          href="/content" 
          className="text-sm text-primary hover:underline"
        >
          View all →
        </Link>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2 text-muted-foreground">Loading recent uploads...</span>
        </div>
      )}

      {/* Desktop: Grid layout */}
      {!isLoading && (
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentContent.map((content, index) => (
          <ContentCard key={content.id} content={content} index={index} />
        ))}
      </div>
      )}

      {/* Mobile: Horizontal scroll */}
      {!isLoading && (
      <div className="md:hidden overflow-x-auto -mx-6 px-6">
        <div className="flex gap-4 pb-4">
          {recentContent.map((content, index) => (
            <div key={content.id} className="flex-shrink-0 w-[280px]">
              <ContentCard content={content} index={index} />
            </div>
          ))}
        </div>
      </div>
      )}
    </section>
  )
}

function ContentCard({ content, index }: { content: Content; index: number }) {
  const TypeIcon = typeIconMap[content.type]
  const typeColorClass = typeColorMap[content.type]

  // Convert content properties to URL-friendly slugs
  const departmentSlug = content.department.toLowerCase().replace(/\s+/g, "-")
  const branchSlug = content.branch.toLowerCase().replace(/\s+/g, "-")
  const yearSlug = content.year.toLowerCase().replace(/\s+/g, "-").replace("year", "").trim()
  const subjectSlug = content.subject.toLowerCase().replace(/\s+/g, "-")
  const topicSlug = content.topic.toLowerCase().replace(/\s+/g, "-")
  
  const contentUrl = `/departments/${departmentSlug}/${branchSlug}/${yearSlug}/${subjectSlug}/${topicSlug}?content=${content.id}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
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
                sizes="(max-width: 768px) 280px, (max-width: 1024px) 50vw, 33vw"
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
              <span className="ml-auto">
                {formatDistanceToNow(content.createdAt, { addSuffix: true })}
              </span>
            </div>

            {/* Tags */}
            {content.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {content.tags.slice(0, 2).map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {content.tags.length > 2 && (
                  <Badge variant="secondary" className="text-xs">
                    +{content.tags.length - 2}
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
