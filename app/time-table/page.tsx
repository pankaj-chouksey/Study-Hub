"use client"

import Link from "next/link"
import { useMemo } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DEPARTMENTS } from "@/lib/constants"
import { useApprovedContent } from "@/hooks/use-approved-content"
import { Content } from "@/lib/types"
import { Calendar, Loader2, ChevronRight } from "lucide-react"

export default function TimeTablePage() {
  const { content: allContent, isLoading } = useApprovedContent()

  // Filter timetable content (type === "timetable")
  const timeTableContent = useMemo(() => {
    return allContent.filter((item: Content) => item.type === "timetable")
  }, [allContent])

  // Group by department and branch (semesters will be shown on branch page)
  const departmentsWithBranches = useMemo(() => {
    const result: Array<{
      department: string
      departmentSlug: string
      branches: Array<{
        id: string
        name: string
        fullName?: string
        slug: string
        contentCount: number
      }>
    }> = []

    DEPARTMENTS.forEach((dept) => {
      const branches: Array<{
        id: string
        name: string
        fullName?: string
        slug: string
        contentCount: number
      }> = []

      dept.branches.forEach((branch) => {
        // Count total timetable content for this branch
        const branchContent = timeTableContent.filter(
          (item: Content) =>
            item.department.toLowerCase() === dept.name.toLowerCase() &&
            item.branch.toLowerCase() === branch.name.toLowerCase()
        )

        branches.push({
          id: branch.id,
          name: branch.name,
          fullName: branch.fullName,
          slug: branch.slug,
          contentCount: branchContent.length,
        })
      })

      result.push({
        department: dept.fullName || dept.name,
        departmentSlug: dept.slug,
        branches,
      })
    })

    return result
  }, [timeTableContent])

  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-background to-muted/20 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-8 h-8 text-[#2E2E2E] dark:text-[#EEEEEE]" />
              <h1 className="text-3xl sm:text-4xl font-light text-[#2E2E2E] dark:text-[#EEEEEE]">
                Time Table
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Select a department and branch to view timetable by semester
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#2E2E2E] dark:text-[#EEEEEE]" />
            </div>
          ) : (
            <div className="space-y-12">
              {departmentsWithBranches.map(({ department, departmentSlug, branches }) => (
                <div key={departmentSlug} className="space-y-8">
                  {/* Department Header */}
                  <div>
                    <h2 className="text-2xl font-light text-[#2E2E2E] dark:text-[#EEEEEE] mb-2">
                      {department}
                    </h2>
                  </div>

                  {/* Branches Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {branches.map((branch) => (
                      <Link
                        key={branch.id}
                        href={`/time-table/${departmentSlug}/${branch.slug}`}
                      >
                        <Card className="h-full hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="text-lg mb-1">
                                  {branch.fullName || branch.name}
                                </CardTitle>
                              </div>
                              <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                {branch.contentCount > 0 ? (
                                  <>
                                    <Calendar className="h-4 w-4 text-primary" />
                                    <span className="text-foreground font-medium">
                                      {branch.contentCount} {branch.contentCount === 1 ? "timetable" : "timetables"}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">No timetable yet</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

