"use client"

import { useState } from "react"
import { Loader2, AlertCircle, Play } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface VideoEmbedProps {
  videoUrl: string
  title?: string
  className?: string
}

export function VideoEmbed({ videoUrl, title, className }: VideoEmbedProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string): string | null => {
    try {
      const urlObj = new URL(url)
      
      // Handle youtu.be format
      if (urlObj.hostname === "youtu.be") {
        return urlObj.pathname.slice(1)
      }
      
      // Handle youtube.com format
      if (urlObj.hostname.includes("youtube.com")) {
        return urlObj.searchParams.get("v")
      }
      
      return null
    } catch {
      return null
    }
  }

  const videoId = getYouTubeId(videoUrl)
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  if (!embedUrl) {
    return (
      <Card className={cn("p-8", className)}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-3 text-center max-w-md">
            <AlertCircle className="w-12 h-12 text-destructive" />
            <h3 className="text-lg font-semibold">Invalid Video URL</h3>
            <p className="text-sm text-muted-foreground">
              The video URL format is not supported. Please provide a valid YouTube link.
            </p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading video...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="flex items-center justify-center min-h-[400px] p-8">
          <div className="flex flex-col items-center gap-3 text-center max-w-md">
            <AlertCircle className="w-12 h-12 text-destructive" />
            <h3 className="text-lg font-semibold">Failed to Load Video</h3>
            <p className="text-sm text-muted-foreground">
              The video could not be loaded. Please check your internet connection or try again later.
            </p>
          </div>
        </div>
      )}

      {/* Video Embed with Responsive Aspect Ratio */}
      {!hasError && (
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={embedUrl}
            title={title || "Video Player"}
            className="absolute top-0 left-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={handleLoad}
            onError={handleError}
          />
        </div>
      )}
    </Card>
  )
}
