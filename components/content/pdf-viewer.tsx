"use client"

import { useState } from "react"
import { Loader2, AlertCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PDFViewerProps {
  fileUrl: string
  title?: string
  className?: string
}

export function PDFViewer({ fileUrl, title, className }: PDFViewerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading PDF...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="flex items-center justify-center min-h-[400px] p-8">
          <div className="flex flex-col items-center gap-3 text-center max-w-md">
            <AlertCircle className="w-12 h-12 text-destructive" />
            <h3 className="text-lg font-semibold">Failed to Load PDF</h3>
            <p className="text-sm text-muted-foreground">
              The PDF file could not be loaded. Please try downloading it instead.
            </p>
          </div>
        </div>
      )}

      {/* PDF Embed */}
      {!hasError && (
        <iframe
          src={fileUrl}
          title={title || "PDF Viewer"}
          className="w-full min-h-[600px] lg:min-h-[800px] border-0"
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </Card>
  )
}
