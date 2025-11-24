import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, BookOpen } from "lucide-react";
import { DEPARTMENTS } from "@/lib/constants";
import { generateBranchMetadata } from "@/lib/metadata";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    department: string;
    branch: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { department, branch } = await params;
  const formattedDept = department
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const formattedBranch = branch
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return generateBranchMetadata(formattedDept, formattedBranch);
}

export default async function BranchPage({ params }: PageProps) {
  const { department, branch } = await params;
  
  // Find the branch data from constants
  const dept = DEPARTMENTS.find(d => d.slug === department);
  const branchData = dept?.branches.find(b => b.slug === branch);
  
  const years = branchData?.years || [];

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
            <span className="text-foreground capitalize">{branchData?.name || branch.replace("-", " ")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">{branchData?.name || branch.replace("-", " ")}</h1>
          <p className="text-muted-foreground mt-2">Select your year to view subjects and study materials</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {years.map((year) => (
            <Link
              key={year.level}
              href={`/departments/${department}/${branch}/${year.level}`}
            >
              <Card className="h-full hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {year.name}
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>{year.subjects.length} subjects</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {year.subjects.slice(0, 3).map((subject) => (
                      <Badge key={subject.id} variant="secondary">
                        {subject.code}
                      </Badge>
                    ))}
                    {year.subjects.length > 3 && (
                      <Badge variant="outline">+{year.subjects.length - 3} more</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {years.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No years available for this branch yet.</p>
          </div>
        )}
      </main>
    </>
  );
}
