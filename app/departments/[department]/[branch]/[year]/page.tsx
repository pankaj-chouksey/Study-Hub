import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, FileText, Video, FileQuestion, Star } from "lucide-react";
import { DEPARTMENTS } from "@/lib/constants";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    department: string;
    branch: string;
    year: string;
  }>;
}

export default async function YearPage({ params }: PageProps) {
  const { department, branch, year } = await params;
  
  // Find the year data from constants
  const dept = DEPARTMENTS.find(d => d.slug === department);
  const branchData = dept?.branches.find(b => b.slug === branch);
  const yearData = branchData?.years.find(y => y.level.toString() === year);
  
  // Fetch approved content from MongoDB to get unique subjects
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  let subjects: Array<{ name: string; slug: string; contentCount: number }> = [];
  
  try {
    const response = await fetch(`${baseUrl}/api/content?status=approved`, {
      cache: 'no-store'
    });
    const data = await response.json();
    
    if (data.success) {
      // Group content by subject and count
      const subjectMap = new Map<string, number>();
      data.data.forEach((content: any) => {
        const count = subjectMap.get(content.subject) || 0;
        subjectMap.set(content.subject, count + 1);
      });
      
      // Convert to array
      subjects = Array.from(subjectMap.entries()).map(([name, count]) => ({
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        contentCount: count
      }));
    }
  } catch (error) {
    console.error('Error fetching subjects:', error);
  }

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
            <span className="text-foreground">{yearData?.name || `Year ${year}`}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">{yearData?.name || `Year ${year}`}</h1>
          <p className="text-muted-foreground mt-2">Select a subject to access study materials</p>
        </div>

        {subjects.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No subjects with content yet. Upload some materials to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <Link
                key={subject.slug}
                href={`/departments/${department}/${branch}/${year}/${subject.slug}`}
              >
                <Card className="h-full hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{subject.name}</CardTitle>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        <span>{subject.contentCount} materials</span>
                      </div>
                      
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
