"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useMemo } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DEPARTMENTS } from "@/lib/constants"
import { useApprovedContent } from "@/hooks/use-approved-content"
import { Content } from "@/lib/types"
import { BookOpen, Loader2, ChevronRight } from "lucide-react"

export default function SyllabusBranchPage() {
  const params = useParams()
  const department = params.department as string
  const branch = params.branch as string

  const { content: allContent, isLoading } = useApprovedContent()

  // Filter syllabus content (type === "syllabus")
  const syllabusContent = useMemo(() => {
    return allContent.filter((item: Content) => item.type === "syllabus")
  }, [allContent])

  // Find the branch data from constants
  const dept = DEPARTMENTS.find(d => d.slug === department)
  const branchData = dept?.branches.find(b => b.slug === branch)
  const years = branchData?.years || []

  // Get years with syllabus content counts
  const yearsWithContent = useMemo(() => {
    return years.map((year) => {
      // Count syllabus content for this specific year
      const yearContent = syllabusContent.filter(
        (item: Content) =>
          item.department.toLowerCase() === dept?.name.toLowerCase() &&
          item.branch.toLowerCase() === branchData?.name.toLowerCase() &&
          item.year === year.level.toString()
      )

      return {
        level: year.level,
        name: year.name || `Semester ${year.level}`,
        contentCount: yearContent.length,
      }
    })
  }, [years, syllabusContent, dept?.name, branchData?.name])

  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-background to-muted/20 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link href="/syllabus" className="hover:text-foreground transition-colors">
                Syllabus
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/syllabus" className="hover:text-foreground transition-colors capitalize">
                {dept?.fullName || dept?.name || department.replace("-", " ")}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground capitalize">
                {branchData?.fullName || branchData?.name || branch.replace("-", " ")}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-[#2E2E2E] dark:text-[#EEEEEE]" />
              <h1 className="text-3xl sm:text-4xl font-light text-[#2E2E2E] dark:text-[#EEEEEE]">
                {branchData?.fullName || branchData?.name || branch.replace("-", " ")}
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Select a semester to view syllabus content
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#2E2E2E] dark:text-[#EEEEEE]" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {yearsWithContent.map((year) => (
                <Link
                  key={year.level}
                  href={`/departments/${department}/${branch}/${year.level}?type=syllabus`}
                >
                  <Card className="h-full hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-1">{year.name}</CardTitle>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          {year.contentCount > 0 ? (
                            <>
                              <BookOpen className="h-4 w-4 text-primary" />
                              <span className="text-foreground font-medium">
                                {year.contentCount} {year.contentCount === 1 ? "syllabus" : "syllabuses"}
                              </span>
                            </>
                          ) : (
                            <>
                              <BookOpen className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">No syllabus yet</span>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {yearsWithContent.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No years available for this branch yet.</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

