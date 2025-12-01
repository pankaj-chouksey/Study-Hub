"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Star, FileText, Video, FileQuestion, Sparkles } from "lucide-react"
import { Content } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"
import { useApprovedContent } from "@/hooks/use-approved-content"
import { DefaultThumbnail } from "@/components/content/default-thumbnail"
import { getContentUrl } from "@/lib/content-url"

const typeIconMap = {
  note: FileText,
  video: Video,
  pyq: FileQuestion,
  important: Sparkles
}

interface RecentUploadsProps {
  limit?: number
}

export function RecentUploads({ limit = 6 }: RecentUploadsProps) {
  const { content, isLoading } = useApprovedContent();

  const recentContent = content
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit)

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center mb-8">
        <h2 className="text-3xl font-light text-[#2E2E2E] dark:text-[#EEEEEE]">Recent Uploads</h2>
        <div className="h-px flex-1 bg-border ml-8" />
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
        </div>
      )}

      {!isLoading && recentContent.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No recent uploads available.</p>
        </div>
      )}

      {!isLoading && recentContent.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentContent.map((content) => (
            <ContentCard key={content.id} content={content} />
          ))}
        </div>
      )}
    </section>
  )
}

function ContentCard({ content }: { content: Content }) {
  const TypeIcon = typeIconMap[content.type]

  // Generate URL that links to correct subject from constants
  const contentUrl = getContentUrl(content)

  return (
    <Link href={contentUrl}>
      <Card className="group hover:shadow-md transition-all duration-200 cursor-pointer h-full border border-[#2E2E2E] dark:border-[#EEEEEE] bg-[#2E2E2E] dark:bg-[#3A3A3A] rounded-lg">
        {/* Thumbnail Area - Light grey with rounded top corners, slightly inset */}
        <div className="relative aspect-video overflow-hidden bg-muted m-2 mb-0 rounded-lg">
          {content.thumbnail ? (
            <Image
              src={content.thumbnail}
              alt={content.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <TypeIcon className="h-12 w-12 text-[#2E2E2E] dark:text-[#2E2E2E] stroke-2" />
            </div>
          )}
          {/* Notes tag in top-right corner of light grey area */}
          <div className="absolute top-2 right-2 bg-[#2E2E2E] dark:bg-[#2E2E2E] text-[#EEEEEE] px-2 py-0.5 text-xs rounded font-normal">
            {content.type === 'note' ? 'Notes' : content.type.toUpperCase()}
          </div>
        </div>

        {/* Content Area - Dark grey with left and right borders */}
        <CardContent className="p-4 space-y-3 bg-[#2E2E2E] dark:bg-[#3A3A3A] border-l border-r border-[#2E2E2E] dark:border-[#EEEEEE] mx-2 rounded-b-lg">
          <h3 className="font-normal text-base line-clamp-2 text-[#EEEEEE] dark:text-[#EEEEEE]">
            {content.title}
          </h3>

          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-[#EEEEEE] dark:bg-[#EEEEEE]"></div>
            <span className="text-sm text-[#EEEEEE] dark:text-[#EEEEEE] truncate">
              {content.uploader.name}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3 w-3 text-[#EEEEEE] dark:text-[#EEEEEE] fill-none stroke-2" />
            ))}
            <Download className="h-3 w-3 ml-auto text-[#EEEEEE] dark:text-[#EEEEEE]" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
