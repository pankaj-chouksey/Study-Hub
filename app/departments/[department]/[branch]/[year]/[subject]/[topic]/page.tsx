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
  Calendar
} from "lucide-react"
import { DEPARTMENTS, MOCK_USERS } from "@/lib/constants"
import { Comment } from "@/lib/types"

export default function TopicContentPage() {
  const params = useParams()
  const department = params.department as string
  const branch = params.branch as string
  const year = params.year as string
  const subjectId = params.subject as string
  const topicId = params.topic as string

  // Get content ID from query params if provided
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
  const contentId = searchParams.get('content')

  // Find the hierarchy data
  const dept = DEPARTMENTS.find(d => d.slug === department)
  const branchData = dept?.branches.find(b => b.slug === branch)
  const yearData = branchData?.years.find(y => y.level.toString() === year)
  const subjectData = yearData?.subjects.find(s => s.id === subjectId)
  const topicData = subjectData?.topics.find(t => t.id === topicId)

  // State for content
  const [content, setContent] = React.useState<any>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  // Fetch content from MongoDB
  React.useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true)
        
        if (contentId) {
          // Fetch specific content by ID
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
            console.log("File URL:", transformedContent.fileUrl)
            console.log("Video URL:", transformedContent.videoUrl)
            console.log("Content Type:", transformedContent.type)
            setContent(transformedContent)
          } else {
            console.error("Failed to fetch content:", data.error)
          }
        } else {
          // If no content ID, try to fetch by topic slug
          console.log("No content ID, fetching by topic:", topicId)
          const topicName = topicId.replace(/-/g, " ")
          const response = await fetch(
            `/api/content?status=approved&topic=${topicName}`
          )
          const data = await response.json()
          
          console.log("Topic content API response:", data)
          
          if (data.success && data.data.length > 0) {
            const firstContent = data.data[0]
            const transformedContent = {
              ...firstContent,
              id: firstContent._id,
              uploader: {
                id: firstContent.uploaderId?._id || "unknown",
                name: firstContent.uploaderId?.name || "Unknown User",
                email: firstContent.uploaderId?.email || "",
                avatar: firstContent.uploaderId?.avatar,
                role: firstContent.uploaderId?.role || "student",
                branch: firstContent.uploaderId?.branch || "",
                year: firstContent.uploaderId?.year || "",
                points: firstContent.uploaderId?.points || 0,
                createdAt: new Date(firstContent.uploaderId?.createdAt || Date.now()),
              },
              createdAt: new Date(firstContent.createdAt),
              updatedAt: new Date(firstContent.updatedAt),
            }
            setContent(transformedContent)
          } else {
            console.log("No content found for topic")
          }
        }
      } catch (error) {
        console.error("Error fetching content:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [contentId, topicId])

  // Mock comments for this content (only create when content is loaded)
  // TODO: Replace with real comments from MongoDB
  const mockComments: Comment[] = []

  // State for related content
  const [relatedContent, setRelatedContent] = React.useState<any[]>([])

  // Fetch related content
  React.useEffect(() => {
    const fetchRelated = async () => {
      if (!content) return
      
      try {
        // Fetch content from same subject
        const response = await fetch(
          `/api/content?status=approved&subject=${content.subject}`
        )
        const data = await response.json()
        
        console.log("Related content API response:", data)
        
        if (data.success) {
          // Filter out current content and limit to 5
          const related = data.data
            .filter((c: any) => c._id !== content.id)
            .slice(0, 5)
            .map((item: any) => ({
              ...item,
              id: item._id,
              uploader: {
                id: item.uploaderId?._id || "unknown",
                name: item.uploaderId?.name || "Unknown User",
                email: item.uploaderId?.email || "",
                avatar: item.uploaderId?.avatar,
              },
              createdAt: new Date(item.createdAt),
            }))
          
          setRelatedContent(related)
        }
      } catch (error) {
        console.error("Error fetching related content:", error)
      }
    }

    fetchRelated()
  }, [content])

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

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

  // Show not found state
  if (!content) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto px-6 py-8">
          <div className="flex flex-col items-center justify-center py-12">
            <h2 className="text-2xl font-bold mb-2">Content Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The content you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/departments">
              <Button>Back to Departments</Button>
            </Link>
          </div>
        </main>
      </>
    )
  }

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
            <Link href="/departments" className="hover:text-foreground transition-colors">
              Departments
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/departments/${department}`} className="hover:text-foreground transition-colors capitalize">
              {dept?.name || department.replace("-", " ")}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/departments/${department}/${branch}`} className="hover:text-foreground transition-colors capitalize">
              {branchData?.name || branch.replace("-", " ")}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/departments/${department}/${branch}/${year}`} className="hover:text-foreground transition-colors">
              {yearData?.name || `Year ${year}`}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/departments/${department}/${branch}/${year}/${subjectId}`} className="hover:text-foreground transition-colors">
              {subjectData?.name || subjectId}
            </Link>
            <ChevronRight className="h-4 w-4" />
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
                <Badge variant="secondary">{content.type}</Badge>
                {content.tags?.map((tag: string) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Description */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-3">Description</h2>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {content.description}
                </p>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {content.fileUrl && (
                <Button 
                  size="lg" 
                  className="gap-2"
                  onClick={() => window.open(content.fileUrl, '_blank')}
                >
                  <Download className="w-4 h-4" />
                  Download
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
                <>
                  {console.log("Rendering PDF with URL:", content.fileUrl)}
                  <PDFViewer fileUrl={content.fileUrl} title={content.title} />
                </>
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
                </div>
              </div>
              <Separator className="mb-4" />
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Branch</span>
                  <span className="font-semibold">{content.uploader.branch || "—"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Year</span>
                  <span className="font-semibold">{content.uploader.year || "—"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Points</span>
                  <span className="font-semibold">{content.uploader.points.toLocaleString()}</span>
                </div>
              </div>
            </Card>

            {/* Related Topics */}
            {relatedContent.length > 0 && (
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Related Content</h3>
                <div className="space-y-3">
                  {relatedContent.map((item) => (
                    <Link
                      key={item.id}
                      href={`/departments/${department}/${branch}/${year}/${subjectId}/${item.topic.toLowerCase().replace(/\s+/g, "-")}`}
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
