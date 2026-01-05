"use client"

import { useParams, useSearchParams } from "next/navigation"
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, FileText, Video, FileQuestion, Star, BookOpen, Calendar, Loader2 } from "lucide-react";
import { DEPARTMENTS } from "@/lib/constants";
import { useApprovedContent } from "@/hooks/use-approved-content";
import { ContentList } from "@/components/content/content-list";
import { useMemo } from "react";

export default function YearPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const department = params.department as string
  const branch = params.branch as string
  const year = params.year as string
  const contentType = searchParams.get("type")
  
  // Find the year data from constants
  const dept = DEPARTMENTS.find(d => d.slug === department);
  const branchData = dept?.branches.find(b => b.slug === branch);
  const yearData = branchData?.years.find(y => y.level.toString() === year);
  
  // Fetch approved content
  const { content: allContent, isLoading } = useApprovedContent()

  // Filter syllabus content for this year if type=syllabus
  const syllabusContent = useMemo(() => {
    if (contentType !== "syllabus") return []
    return allContent.filter((item) => 
      item.type === "syllabus" &&
      item.department.toLowerCase() === dept?.name.toLowerCase() &&
      item.branch.toLowerCase() === branchData?.name.toLowerCase() &&
      item.year === year
    )
  }, [allContent, contentType, dept?.name, branchData?.name, year])

  // Filter timetable content for this year if type=timetable
  const timetableContent = useMemo(() => {
    if (contentType !== "timetable") return []
    return allContent.filter((item) => 
      item.type === "timetable" &&
      item.department.toLowerCase() === dept?.name.toLowerCase() &&
      item.branch.toLowerCase() === branchData?.name.toLowerCase() &&
      item.year === year
    )
  }, [allContent, contentType, dept?.name, branchData?.name, year])

  // Filter PYQ content for this year if type=pyq
  const pyqContent = useMemo(() => {
    if (contentType !== "pyq") return []
    return allContent.filter((item) => 
      item.type === "pyq" &&
      item.department.toLowerCase() === dept?.name.toLowerCase() &&
      item.branch.toLowerCase() === branchData?.name.toLowerCase() &&
      item.year === year
    )
  }, [allContent, contentType, dept?.name, branchData?.name, year])

  // Filter important content for this year if type=important
  const importantContent = useMemo(() => {
    if (contentType !== "important") return []
    return allContent.filter((item) => 
      item.type === "important" &&
      item.department.toLowerCase() === dept?.name.toLowerCase() &&
      item.branch.toLowerCase() === branchData?.name.toLowerCase() &&
      item.year === year
    )
  }, [allContent, contentType, dept?.name, branchData?.name, year])

  // Get subjects from constants
  const subjectsFromConstants = yearData?.subjects || [];
  
  // Count content by subject
  const contentCountMap = useMemo(() => {
    const map = new Map<string, number>();
    allContent.forEach((content) => {
      if (
        content.department.toLowerCase() === dept?.name.toLowerCase() &&
        content.branch.toLowerCase() === branchData?.name.toLowerCase() &&
        content.year === year
      ) {
        const count = map.get(content.subject) || 0;
        map.set(content.subject, count + 1);
      }
    });
    return map;
  }, [allContent, dept?.name, branchData?.name, year]);
  
  // Map subjects with their content counts
  const subjects = subjectsFromConstants.map(subject => ({
    id: subject.id,
    name: subject.name,
    code: subject.code,
    slug: subject.id,
    contentCount: contentCountMap.get(subject.name) || 0
  }));

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
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
            <span className="text-foreground">
              {contentType === "syllabus" 
                ? (yearData?.name || `Semester ${year}`)
                : (yearData?.name || `Year ${year}`)}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
            {contentType === "syllabus" 
              ? (yearData?.name || `Semester ${year}`)
              : (yearData?.name || `Year ${year}`)}
          </h1>
          <p className="text-muted-foreground mt-2">
            {contentType === "syllabus" 
              ? "Syllabus content for this semester" 
              : contentType === "timetable"
              ? "Timetable content for this year"
              : contentType === "pyq"
              ? "Past Year Questions for this semester"
              : contentType === "important"
              ? "Important questions for this semester"
              : "Select a subject to access study materials"}
          </p>
        </div>

        {/* Show syllabus content if type=syllabus */}
        {contentType === "syllabus" ? (
          isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <ContentList
              content={syllabusContent}
              emptyMessage={`No syllabus content available for ${yearData?.name || `Semester ${year}`} yet.`}
            />
          )
        ) : contentType === "timetable" ? (
          isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <ContentList
              content={timetableContent}
              emptyMessage={`No timetable content available for ${yearData?.name || `Semester ${year}`} yet.`}
            />
          )
        ) : contentType === "pyq" ? (
          isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <ContentList
              content={pyqContent}
              emptyMessage={`No PYQ content available for ${yearData?.name || `Semester ${year}`} yet.`}
            />
          )
        ) : contentType === "important" ? (
          isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <ContentList
              content={importantContent}
              emptyMessage={`No important questions available for ${yearData?.name || `Semester ${year}`} yet.`}
            />
          )
        ) : subjects.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No subjects available for this semester yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <Link
                key={subject.slug}
                href={`/departments/${department}/${branch}/${year}/${subject.slug}`}
              >
                <Card className={`h-full hover:shadow-lg transition-all hover:scale-105 cursor-pointer ${subject.contentCount === 0 ? 'opacity-75' : ''}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{subject.name}</CardTitle>
                        <CardDescription className="text-sm">{subject.code}</CardDescription>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        {subject.contentCount > 0 ? (
                          <>
                            <FileText className="h-4 w-4 text-primary" />
                            <span className="text-foreground font-medium">{subject.contentCount} materials</span>
                          </>
                        ) : (
                          <>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">No content yet</span>
                          </>
                        )}
                      </div>
                      
                      {subject.contentCount > 0 && (
                        <div className="flex flex-wrap gap-2">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <FileText className="h-3 w-3" />
                            <span>Notes</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Video className="h-3 w-3" />
                            <span>Videos</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <FileQuestion className="h-3 w-3" />
                            <span>PYQs</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Star className="h-3 w-3" />
                            <span>Important</span>
                          </div>
                        </div>
                      )}
                      
                      {subject.contentCount === 0 && (
                        <Badge variant="outline" className="text-xs">
                          Be the first to contribute!
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
