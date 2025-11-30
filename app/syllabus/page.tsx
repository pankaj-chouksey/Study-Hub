"use client"

import { useMemo } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ContentList } from "@/components/content/content-list"
import { DEPARTMENTS } from "@/lib/constants"
import { useApprovedContent } from "@/hooks/use-approved-content"
import { Content } from "@/lib/types"
import { BookOpen, Loader2 } from "lucide-react"

export default function SyllabusPage() {
  const { content: allContent, isLoading } = useApprovedContent()

  // Filter content where topic contains "syllabus" (case-insensitive)
  const syllabusContent = useMemo(() => {
    return allContent.filter((item: Content) => 
      item.topic.toLowerCase().includes("syllabus")
    )
  }, [allContent])

  // Group branches by department and get syllabus content for each branch
  const branchesWithContent = useMemo(() => {
    const result: Array<{
      department: string
      departmentSlug: string
      branch: {
        id: string
        name: string
        fullName?: string
        slug: string
      }
      content: Content[]
    }> = []

    DEPARTMENTS.forEach((dept) => {
      dept.branches.forEach((branch) => {
        // Filter syllabus content for this specific branch
        const branchContent = syllabusContent.filter(
          (item: Content) =>
            item.department.toLowerCase() === dept.name.toLowerCase() &&
            item.branch.toLowerCase() === branch.name.toLowerCase()
        )

        result.push({
          department: dept.fullName || dept.name,
          departmentSlug: dept.slug,
          branch: {
            id: branch.id,
            name: branch.name,
            fullName: branch.fullName,
            slug: branch.slug,
          },
          content: branchContent,
        })
      })
    })

    return result
  }, [syllabusContent])

  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-background to-muted/20 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-[#2E2E2E] dark:text-[#EEEEEE]" />
              <h1 className="text-3xl sm:text-4xl font-light text-[#2E2E2E] dark:text-[#EEEEEE]">
                Syllabus
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Browse syllabus content organized by branch
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#2E2E2E] dark:text-[#EEEEEE]" />
            </div>
          ) : (
            <div className="space-y-12">
              {branchesWithContent.map(({ department, departmentSlug, branch, content }) => (
                <div key={`${departmentSlug}-${branch.slug}`} className="space-y-4">
                  {/* Branch Header */}
                  <div className="flex items-center gap-4">
                    <div>
                      <h2 className="text-2xl font-light text-[#2E2E2E] dark:text-[#EEEEEE]">
                        {branch.fullName || branch.name}
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        {department} • {content.length} {content.length === 1 ? "syllabus" : "syllabuses"}
                      </p>
                    </div>
                  </div>

                  {/* Content for this branch */}
                  {content.length > 0 ? (
                    <ContentList
                      content={content}
                      emptyMessage={`No syllabus content available for ${branch.fullName || branch.name}.`}
                    />
                  ) : (
                    <Card className="border border-[#2E2E2E] dark:border-[#EEEEEE] bg-[#2E2E2E] dark:bg-[#3A3A3A]">
                      <CardContent className="p-8 text-center">
                        <p className="text-[#EEEEEE] dark:text-[#EEEEEE] text-base">
                          No syllabus content available for {branch.fullName || branch.name} yet.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

