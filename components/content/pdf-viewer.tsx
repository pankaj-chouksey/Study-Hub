"use client"

import { useState, useMemo } from "react"
import { Loader2, AlertCircle, Download } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { downloadAsPdf, getPdfFilenameFromUrl } from "@/lib/download-pdf"

interface PDFViewerProps {
  fileUrl: string
  title?: string
  className?: string
}

/**
 * Converts file URLs to embeddable formats
 * - Google Drive: Converts to viewer format
 * - Dropbox: Converts to preview format
 * - Other URLs: Uses Google Docs Viewer to prevent downloads
 */
function convertToEmbeddableUrl(url: string): string {
  // Google Drive: Convert to viewer format
  // Pattern: https://drive.google.com/file/d/FILE_ID/view
  // Or: https://drive.google.com/uc?export=download&id=FILE_ID
  const driveFileMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/)
  const driveDownloadMatch = url.match(/drive\.google\.com\/uc\?export=download&id=([a-zA-Z0-9_-]+)/)
  
  if (driveFileMatch) {
    const fileId = driveFileMatch[1]
    return `https://drive.google.com/file/d/${fileId}/preview`
  }
  
  if (driveDownloadMatch) {
    const fileId = driveDownloadMatch[1]
    return `https://drive.google.com/file/d/${fileId}/preview`
  }
  
  // Dropbox: Convert to preview format
  // Pattern: https://www.dropbox.com/s/.../file.pdf?dl=0 or dl=1
  if (url.includes('dropbox.com')) {
    // Remove dl parameter and add raw=1 for preview
    const dropboxUrl = url.split('?')[0]
    return `${dropboxUrl}?raw=1`
  }
  
  // For other URLs, use Google Docs Viewer as a proxy
  // This prevents download headers from triggering downloads
  const encodedUrl = encodeURIComponent(url)
  return `https://docs.google.com/viewer?url=${encodedUrl}&embedded=true`
}

export function PDFViewer({ fileUrl, title, className }: PDFViewerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Convert URL to embeddable format
  const embedUrl = useMemo(() => convertToEmbeddableUrl(fileUrl), [fileUrl])

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
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
          <div className="flex flex-col items-center gap-3 text-center max-w-md mb-4">
            <AlertCircle className="w-12 h-12 text-destructive" />
            <h3 className="text-lg font-semibold">Failed to Load PDF</h3>
            <p className="text-sm text-muted-foreground">
              The PDF file could not be displayed in the viewer. You can download it instead.
            </p>
          </div>
          <Button
            onClick={async () => {
              const filename = title ? `${title}.pdf` : getPdfFilenameFromUrl(fileUrl)
              await downloadAsPdf(fileUrl, filename)
            }}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>
      )}

      {/* PDF Embed */}
      {!hasError && (
        <div className="relative w-full">
          {/* Try object tag first for direct PDF URLs (works better than iframe) */}
          {!embedUrl.includes('docs.google.com/viewer') && !embedUrl.includes('drive.google.com') ? (
            <object
              data={embedUrl}
              type="application/pdf"
              className="w-full min-h-[600px] lg:min-h-[800px]"
              onLoad={handleLoad}
              onError={handleError}
            >
              <iframe
                src={embedUrl}
                title={title || "PDF Viewer"}
                className="w-full min-h-[600px] lg:min-h-[800px] border-0"
                onLoad={handleLoad}
                onError={handleError}
                allow="fullscreen"
              />
            </object>
          ) : (
            <iframe
              src={embedUrl}
              title={title || "PDF Viewer"}
              className="w-full min-h-[600px] lg:min-h-[800px] border-0"
              onLoad={handleLoad}
              onError={handleError}
              allow="fullscreen"
            />
          )}
          {/* Fallback download button overlay */}
          {!isLoading && (
            <div className="absolute top-4 right-4 z-20">
              <Button
                variant="secondary"
                size="sm"
                onClick={async () => {
                  const filename = title ? `${title}.pdf` : getPdfFilenameFromUrl(fileUrl)
                  await downloadAsPdf(fileUrl, filename)
                }}
                className="gap-2 shadow-lg"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}
