import Link from "next/link"
import Image from "next/image"
import React from "react"
import { FileText, Video, FileQuestion, Star, Eye, Download, BookOpen, Calendar } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Content, ContentType } from "@/lib/types"
import { cn } from "@/lib/utils"
import { DefaultThumbnail } from "./default-thumbnail"
import { getContentUrl } from "@/lib/content-url"

interface ContentCardProps {
  content: Content
  className?: string
}

const contentTypeIcons: Record<ContentType, React.ComponentType<{ className?: string }>> = {
  note: FileText,
  video: Video,
  pyq: FileQuestion,
  important: Star,
  syllabus: BookOpen,
  timetable: Calendar,
}

const contentTypeColors: Record<ContentType, string> = {
  note: "text-blue-500",
  video: "text-purple-500",
  pyq: "text-teal-500",
  important: "text-orange-500",
  syllabus: "text-green-500",
  timetable: "text-pink-500",
}

export function ContentCard({ content, className }: ContentCardProps) {
  const Icon = contentTypeIcons[content.type]
  const iconColor = contentTypeColors[content.type]
  
  // Generate URL that links to correct subject from constants
  const contentUrl = getContentUrl(content)

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return "Today"
    if (diffInDays === 1) return "Yesterday"
    if (diffInDays < 7) return `${diffInDays}d ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)}mo ago`
    return `${Math.floor(diffInDays / 365)}y ago`
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`
    }
    return num.toString()
  }

  return (
    <Link href={contentUrl}>
      <Card className={cn(
        "overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer p-0",
        className
      )}>
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          {content.thumbnail ? (
            <Image 
              src={content.thumbnail} 
              alt={content.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
              loading="lazy"
            />
          ) : (
            <DefaultThumbnail type={content.type} />
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <h3 className="font-semibold text-base line-clamp-2 leading-tight">
            {content.title}
          </h3>

          {/* Uploader Info */}
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={content.uploader.avatar} alt={content.uploader.name} />
              <AvatarFallback>{content.uploader.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground truncate">
              {content.uploader.name}
            </span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{content.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{formatNumber(content.views)}</span>
            </div>
            {content.type !== "video" && content.downloads > 0 && (
              <div className="flex items-center gap-1">
                <Download className="w-4 h-4" />
                <span>{formatNumber(content.downloads)}</span>
              </div>
            )}
            <span className="ml-auto">{formatDate(content.createdAt)}</span>
          </div>

          {/* Tags */}
          {content.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {content.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {content.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{content.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </Card>
    </Link>
  )
}
