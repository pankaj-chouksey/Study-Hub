import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { generateDepartmentMetadata } from "@/lib/metadata";
import { DEPARTMENTS } from "@/lib/constants";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    department: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { department } = await params;
  const formattedDept = department
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return generateDepartmentMetadata(formattedDept);
}

export default async function DepartmentPage({ params }: PageProps) {
  const { department } = await params;
  
  // Get department data from constants
  const dept = DEPARTMENTS.find(d => d.slug === department);
  const branches = dept?.branches || [];

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
            <span className="text-foreground capitalize">{department.replace("-", " ")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-light leading-tight">{dept?.fullName || dept?.name || department.replace("-", " ")}</h1>
          <p className="text-muted-foreground mt-2">{dept?.description || "Select a branch to view study materials"}</p>
        </div>

        {branches.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No branches found for this department.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches.map((branch) => (
              <Link
                key={branch.id}
                href={`/departments/${department}/${branch.slug}`}
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle>{branch.fullName || branch.name}</CardTitle>
                    <CardDescription>
                      <Badge variant="secondary">{branch.name}</Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {branch.years.length} semesters available
                    </p>
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
