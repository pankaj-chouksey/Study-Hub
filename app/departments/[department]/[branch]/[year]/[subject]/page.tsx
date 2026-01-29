"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContentList } from "@/components/content/content-list"
import { ContentFilters } from "@/components/content/content-filters"
import { ChevronRight, FileText, Video, FileQuestion, Star, MessageSquare, Loader2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DEPARTMENTS } from "@/lib/constants"
import { ContentType } from "@/lib/types"
import { useApprovedContent } from "@/hooks/use-approved-content"

export default function SubjectPage() {
  const params = useParams()
  const router = useRouter()
  const department = params.department as string
  const branch = params.branch as string
  const year = params.year as string
  const subjectId = params.subject as string

  // Find the subject data from constants
  const dept = DEPARTMENTS.find(d => d.slug === department)
  const branchData = dept?.branches.find(b => b.slug === branch)
  const yearData = branchData?.years.find(y => y.level.toString() === year)
  const subjectData = yearData?.subjects.find(s => s.id === subjectId)

  // Extract topics for filters
  const topics = subjectData?.topics.map(t => t.name) || []

  // Filter state
  const [selectedTopic, setSelectedTopic] = useState<string>("all")
  const [selectedYear, setSelectedYear] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<ContentType | "all">("all")
  const [activeTab, setActiveTab] = useState<string>("notes")

  // Fetch approved content from MongoDB
  // Don't filter by subject in the hook, we'll do it here for more flexibility
  const { content: dbContent, isLoading, refetch } = useApprovedContent({})

  // Refetch when navigating to this page or when params change
  useEffect(() => {
    if (subjectData?.name) {
      // Small delay to ensure the page is fully mounted
      const timeoutId = setTimeout(() => {
        refetch();
        // Also refresh the router to clear any Next.js cache
        router.refresh();
      }, 100);
      return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectData?.name, department, branch, year])

  // Also refetch when page becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && subjectData?.name) {
        refetch();
        router.refresh();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [subjectData?.name, refetch, router])

  // Debug: Log what we're looking for and what we have
  useEffect(() => {
    console.log('Subject Page Debug:', {
      lookingFor: subjectData?.name,
      totalContent: dbContent.length,
      subjects: [...new Set(dbContent.map(c => c.subject))],
      department: department,
      branch: branch,
      year: year
    })
  }, [dbContent, subjectData?.name, department, branch, year])

  // Filter content based on subject and filters
  const filteredContent = useMemo(() => {
    // First, filter by subject - be flexible with matching
    let content = dbContent.filter(c => {
      if (!subjectData?.name) return false
      // Case-insensitive match and handle variations
      const dbSubject = (c.subject || "").toLowerCase().trim()
      const targetSubject = subjectData.name.toLowerCase().trim()
      const matches = dbSubject === targetSubject || dbSubject.includes(targetSubject) || targetSubject.includes(dbSubject)
      
      // Debug logging for mismatches
      if (!matches && dbSubject && targetSubject) {
        console.log('Subject mismatch:', {
          dbSubject,
          targetSubject,
          contentTitle: c.title,
          contentId: c.id
        })
      }
      
      return matches
    })

    console.log('Filtered by subject:', {
      totalDbContent: dbContent.length,
      filteredCount: content.length,
      lookingFor: subjectData?.name,
      allDbSubjects: [...new Set(dbContent.map(c => c.subject).filter(Boolean))]
    })

    // Filter by topic
    if (selectedTopic !== "all") {
      content = content.filter(c => c.topic === selectedTopic)
    }

    // Filter by year (for PYQs)
    if (selectedYear !== "all") {
      content = content.filter(c => c.tags.includes(selectedYear))
    }

    // Filter by type based on active tab
    const tabTypeMap: Record<string, ContentType> = {
      notes: "note",
      videos: "video",
      pyqs: "pyq",
      important: "important",
    }

    if (activeTab !== "discussion") {
      const tabType = tabTypeMap[activeTab]
      content = content.filter(c => c.type === tabType)
    }

    // Additional type filter
    if (selectedType !== "all") {
      content = content.filter(c => c.type === selectedType)
    }

    return content
  }, [dbContent, subjectData, selectedTopic, selectedYear, selectedType, activeTab])

  // Available years for PYQ filter (extract from content tags)
  const availableYears = useMemo(() => {
    const years = new Set<string>()
    dbContent.forEach(c => {
      c.tags?.forEach((tag: string) => {
        if (/^\d{4}$/.test(tag)) {
          years.add(tag)
        }
      })
    })
    return Array.from(years).sort().reverse()
  }, [dbContent])

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
            <span className="text-foreground">{subjectData?.name || subjectId}</span>
          </div>
          
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight">{subjectData?.name || subjectId}</h1>
              <p className="text-muted-foreground mt-2">
                {subjectData?.code && (
                  <span className="font-mono text-sm">{subjectData.code}</span>
                )}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={isLoading}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading content...</span>
          </div>
        )}

        {/* Tabs */}
        {!isLoading && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Sticky Tab Navigation */}
          <div className="sticky top-16 z-40 bg-background/95 backdrop-blur -mx-6 px-6 py-4 border-b">
            <TabsList className="w-full justify-start overflow-x-auto flex-nowrap">
              <TabsTrigger value="notes" className="gap-2">
                <FileText className="h-4 w-4" />
                Notes
              </TabsTrigger>
              <TabsTrigger value="videos" className="gap-2">
                <Video className="h-4 w-4" />
                Videos
              </TabsTrigger>
              <TabsTrigger value="pyqs" className="gap-2">
                <FileQuestion className="h-4 w-4" />
                PYQs
              </TabsTrigger>
              <TabsTrigger value="important" className="gap-2">
                <Star className="h-4 w-4" />
                Important Questions
              </TabsTrigger>
              <TabsTrigger value="discussion" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Discussion
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Filters */}
          {activeTab !== "discussion" && (
            <ContentFilters
              topics={topics}
              selectedTopic={selectedTopic}
              onTopicChange={setSelectedTopic}
              years={activeTab === "pyqs" ? availableYears : []}
              selectedYear={selectedYear}
              onYearChange={setSelectedYear}
              types={[]}
              className="mb-6"
            />
          )}

          {/* Notes Tab */}
          <TabsContent value="notes" className="mt-0">
            <ContentList
              content={filteredContent}
              emptyMessage="No notes available yet. Be the first to upload!"
            />
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos" className="mt-0">
            <ContentList
              content={filteredContent}
              emptyMessage="No videos available yet. Share your favorite tutorials!"
            />
          </TabsContent>

          {/* PYQs Tab */}
          <TabsContent value="pyqs" className="mt-0">
            <ContentList
              content={filteredContent}
              emptyMessage="No previous year questions available yet. Upload past papers to help others!"
            />
          </TabsContent>

          {/* Important Questions Tab */}
          <TabsContent value="important" className="mt-0">
            <ContentList
              content={filteredContent}
              emptyMessage="No important questions available yet. Share your curated question lists!"
            />
          </TabsContent>

          {/* Discussion Tab */}
          <TabsContent value="discussion" className="mt-0">
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <MessageSquare className="w-16 h-16 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Discussion Coming Soon</h3>
              <p className="text-muted-foreground max-w-md">
                Subject-specific discussions will be available in a future update. For now, check out the main discussion forum!
              </p>
              <Link 
                href="/discussion" 
                className="mt-4 text-primary hover:underline"
              >
                Go to Discussion Forum →
              </Link>
            </div>
          </TabsContent>
        </Tabs>
        )}
      </main>
    </>
  )
}
