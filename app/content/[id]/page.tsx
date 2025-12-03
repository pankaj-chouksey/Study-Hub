"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { PDFViewer } from "@/components/content/pdf-viewer"
import { VideoEmbed } from "@/components/content/video-embed"
import { CommentsSection } from "@/components/content/comments-section"
import { 
  ChevronRight, 
  Download, 
  Eye, 
  Star, 
  ThumbsUp,
  Share2,
  Calendar,
  BookOpen,
  FileText,
  Video,
  FileQuestion
} from "lucide-react"
import { Comment } from "@/lib/types"
import { DEPARTMENTS } from "@/lib/constants"

export default function ContentViewPage() {
  const params = useParams()
  const contentId = params.id as string

  // State for content
  const [content, setContent] = React.useState<any>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  // Fetch content from MongoDB
  React.useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        console.log("Fetching content by ID:", contentId)
        const response = await fetch(`/api/content/${contentId}`)
        const data = await response.json()
        
        console.log("Content API response:", data)
        
        if (data.success && data.data) {
          // Transform MongoDB data
          const transformedContent = {
            ...data.data,
            id: data.data._id,
            uploader: {
              id: data.data.uploaderId?._id || "unknown",
              name: data.data.uploaderId?.name || "Unknown User",
              email: data.data.uploaderId?.email || "",
              avatar: data.data.uploaderId?.avatar,
              role: data.data.uploaderId?.role || "student",
              branch: data.data.uploaderId?.branch || "",
              year: data.data.uploaderId?.year || "",
              points: data.data.uploaderId?.points || 0,
              createdAt: new Date(data.data.uploaderId?.createdAt || Date.now()),
            },
            createdAt: new Date(data.data.createdAt),
            updatedAt: new Date(data.data.updatedAt),
          }
          console.log("Transformed content:", transformedContent)
          setContent(transformedContent)
        } else {
          console.error("Failed to fetch content:", data.error)
          setError(data.error || "Content not found")
        }
      } catch (error) {
        console.error("Error fetching content:", error)
        setError("Failed to load content")
      } finally {
        setIsLoading(false)
      }
    }

    if (contentId) {
      fetchContent()
    }
  }, [contentId])

  // State for related content
  const [relatedContent, setRelatedContent] = React.useState<any[]>([])

  // Fetch related content
  React.useEffect(() => {
    const fetchRelated = async () => {
      if (!content) return
      
      try {
        // Fetch content from same department, branch, and year
        const response = await fetch(
          `/api/content?status=approved&department=${encodeURIComponent(content.department)}&branch=${encodeURIComponent(content.branch)}&year=${content.year}&type=${content.type}`
        )
        const data = await response.json()
        
        if (data.success && data.data) {
          // Filter out current content and limit to 5
          const related = data.data
            .filter((item: any) => item._id !== content.id)
            .slice(0, 5)
            .map((item: any) => ({
              ...item,
              id: item._id,
            }))
          setRelatedContent(related)
        }
      } catch (error) {
        console.error("Error fetching related content:", error)
      }
    }

    fetchRelated()
  }, [content])

  // Helper functions
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return "Today"
    if (diffInDays === 1) return "Yesterday"
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
    return `${Math.floor(diffInDays / 365)} years ago`
  }

  // Find department and branch data for breadcrumbs
  const dept = content ? DEPARTMENTS.find(d => 
    d.name.toLowerCase() === content.department.toLowerCase() ||
    d.fullName?.toLowerCase() === content.department.toLowerCase()
  ) : null
  const branchData = dept?.branches.find(b => 
    b.name.toLowerCase() === content?.branch.toLowerCase() ||
    b.fullName?.toLowerCase() === content?.branch.toLowerCase()
  )

  // Get content type icon
  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case "syllabus":
        return BookOpen
      case "timetable":
        return Calendar
      case "note":
        return FileText
      case "video":
        return Video
      case "pyq":
        return FileQuestion
      case "important":
        return Star
      default:
        return FileText
    }
  }

  // Mock comments for this content
  const mockComments: Comment[] = []

  // Show loading state
  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2 text-muted-foreground">Loading content...</span>
          </div>
        </main>
      </>
    )
  }

  // Show error state
  if (error || !content) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto px-6 py-8">
          <div className="flex flex-col items-center justify-center py-12">
            <h2 className="text-2xl font-bold mb-2">Content Not Found</h2>
            <p className="text-muted-foreground mb-4">
              {error || "The content you're looking for doesn't exist or has been removed."}
            </p>
            <Button asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </main>
      </>
    )
  }

  const ContentTypeIcon = getContentTypeIcon(content.type)
  const departmentSlug = content.department.toLowerCase().replace(/\s+/g, "-")
  const branchSlug = content.branch.toLowerCase().replace(/\s+/g, "-")

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 flex-wrap">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            {content.type === "syllabus" && (
              <>
                <Link href="/syllabus" className="hover:text-foreground transition-colors">
                  Syllabus
                </Link>
                <ChevronRight className="h-4 w-4" />
              </>
            )}
            {content.type === "timetable" && (
              <>
                <Link href="/time-table" className="hover:text-foreground transition-colors">
                  Time Table
                </Link>
                <ChevronRight className="h-4 w-4" />
              </>
            )}
            {content.type === "pyq" && (
              <>
                <Link href="/pyqs" className="hover:text-foreground transition-colors">
                  PYQs
                </Link>
                <ChevronRight className="h-4 w-4" />
              </>
            )}
            {content.type === "important" && (
              <>
                <Link href="/important" className="hover:text-foreground transition-colors">
                  Important
                </Link>
                <ChevronRight className="h-4 w-4" />
              </>
            )}
            {dept && (
              <>
                <Link href={`/departments/${departmentSlug}`} className="hover:text-foreground transition-colors capitalize">
                  {dept.name}
                </Link>
                <ChevronRight className="h-4 w-4" />
              </>
            )}
            {branchData && (
              <>
                <Link href={`/departments/${departmentSlug}/${branchSlug}`} className="hover:text-foreground transition-colors capitalize">
                  {branchData.name}
                </Link>
                <ChevronRight className="h-4 w-4" />
              </>
            )}
            <span className="text-foreground">{content.title}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Metadata */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-3">{content.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={content.uploader.avatar} alt={content.uploader.name} />
                        <AvatarFallback>{getInitials(content.uploader.name)}</AvatarFallback>
                      </Avatar>
                      <span>{content.uploader.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(content.createdAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {content.views.toLocaleString()} views
                    </div>
                    {content.downloads > 0 && (
                      <div className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        {content.downloads.toLocaleString()} downloads
                      </div>
                    )}
                  </div>
                </div>

                {/* Rating */}
                {content.rating > 0 && (
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-semibold">{content.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="gap-1">
                  <ContentTypeIcon className="w-3 h-3" />
                  {content.type.toUpperCase()}
                </Badge>
                {content.tags?.map((tag: string) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Description */}
              {content.description && (
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-3">Description</h2>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {content.description}
                  </p>
                </Card>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {content.fileUrl && (
                <Button 
                  size="lg" 
                  className="gap-2"
                  onClick={async () => {
                    try {
                      // Try to download the file properly
                      const link = document.createElement('a')
                      link.href = content.fileUrl
                      // Extract filename from URL or use title
                      const urlParts = content.fileUrl.split('/')
                      const urlFilename = urlParts[urlParts.length - 1].split('?')[0]
                      const filename = urlFilename.endsWith('.pdf') 
                        ? urlFilename 
                        : `${content.title || 'document'}.pdf`
                      link.download = filename
                      link.target = '_blank'
                      link.rel = 'noopener noreferrer'
                      
                      // For some browsers, we need to fetch and create a blob
                      try {
                        const response = await fetch(content.fileUrl)
                        const blob = await response.blob()
                        const blobUrl = URL.createObjectURL(blob)
                        link.href = blobUrl
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                        // Clean up the blob URL after a delay
                        setTimeout(() => URL.revokeObjectURL(blobUrl), 100)
                      } catch (fetchError) {
                        // Fallback to direct link if fetch fails (CORS issues)
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                      }
                    } catch (error) {
                      // Final fallback: open in new tab
                      window.open(content.fileUrl, '_blank')
                    }
                  }}
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
              )}
              <Button variant="outline" size="lg" className="gap-2">
                <ThumbsUp className="w-4 h-4" />
                Helpful
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="gap-2"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: content.title,
                      text: content.description,
                      url: window.location.href,
                    })
                  } else {
                    navigator.clipboard.writeText(window.location.href)
                    alert('Link copied to clipboard!')
                  }
                }}
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>

            {/* Content Preview */}
            <div>
              {content.type === "video" && content.videoUrl ? (
                <VideoEmbed videoUrl={content.videoUrl} title={content.title} />
              ) : content.type !== "video" && content.fileUrl ? (
                <PDFViewer fileUrl={content.fileUrl} title={content.title} />
              ) : (
                <Card className="p-8">
                  <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                      <Download className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No Preview Available</h3>
                    <p className="text-muted-foreground mb-4 max-w-md">
                      {content.type === "video" 
                        ? "No video URL provided for this content."
                        : "No file URL provided for this content. The uploader may need to add the file link."}
                    </p>
                    {content.fileUrl && (
                      <Button 
                        onClick={() => window.open(content.fileUrl, '_blank')}
                        className="gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Try Opening File
                      </Button>
                    )}
                  </div>
                </Card>
              )}
            </div>

            {/* Comments Section */}
            <CommentsSection contentId={content.id} comments={mockComments} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Uploader Info */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Uploaded By</h3>
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={content.uploader.avatar} alt={content.uploader.name} />
                  <AvatarFallback>{getInitials(content.uploader.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{content.uploader.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {content.uploader.branch}
                  </p>
                </div>
              </div>
              <Separator className="mb-4" />
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Points</span>
                  <span className="font-semibold">{content.uploader.points.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Year</span>
                  <span className="font-semibold">{content.uploader.year}</span>
                </div>
              </div>
            </Card>

            {/* Related Content */}
            {relatedContent.length > 0 && (
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Related Content</h3>
                <div className="space-y-3">
                  {relatedContent.map((item) => (
                    <Link
                      key={item.id}
                      href={`/content/${item.id}`}
                      className="block group"
                    >
                      <div className="flex gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                        <div className="flex-shrink-0 w-16 h-16 bg-muted rounded-md overflow-hidden relative">
                          {item.thumbnail && (
                            <Image
                              src={item.thumbnail}
                              alt={item.title}
                              fill
                              sizes="64px"
                              className="object-cover"
                              loading="lazy"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                            {item.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <Eye className="w-3 h-3" />
                            {item.views.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            )}

            {/* Content Stats */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Statistics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Views</span>
                  <span className="font-semibold">{content.views.toLocaleString()}</span>
                </div>
                {content.downloads > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Downloads</span>
                    <span className="font-semibold">{content.downloads.toLocaleString()}</span>
                  </div>
                )}
                {content.rating > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                      {content.rating.toFixed(1)}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Uploaded</span>
                  <span className="font-semibold">
                    {content.createdAt.toLocaleDateString("en-US", { 
                      month: "short", 
                      day: "numeric" 
                    })}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}

