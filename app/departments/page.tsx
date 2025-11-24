import Link from "next/link";
import type { Metadata } from "next";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { generateMetadata as generateSiteMetadata } from "@/lib/metadata";
import { DEPARTMENTS } from "@/lib/constants";

export const metadata: Metadata = generateSiteMetadata({
  title: "All Departments",
  description: "Browse study materials by department. Access notes, videos, PYQs, and important questions for UIT and SOIT departments.",
  keywords: ["departments", "engineering branches", "study materials by department", "UIT", "SOIT"],
});

interface PageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function DepartmentsPage({ searchParams }: PageProps) {
  const { type } = await searchParams;
  const contentTypeLabel = type 
    ? type === 'pyq' 
      ? 'PYQs' 
      : type.charAt(0).toUpperCase() + type.slice(1) + 's'
    : null;
  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 leading-tight">
              {contentTypeLabel ? `Browse ${contentTypeLabel}` : 'All Departments'}
            </h1>
            <p className="text-muted-foreground">
              {contentTypeLabel 
                ? `Select your department to browse ${contentTypeLabel.toLowerCase()}`
                : 'Select your department to browse study materials'
              }
            </p>
            {type && (
              <div className="mt-4">
                <Link href="/departments">
                  <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                    ← View All Content Types
                  </Badge>
                </Link>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {DEPARTMENTS.map((dept) => {
              const href = type 
                ? `/departments/${dept.slug}?type=${type}`
                : `/departments/${dept.slug}`;
              
              return (
                <Link key={dept.id} href={href}>
                  <Card className="h-full hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span>{dept.icon}</span>
                          <span>{dept.fullName || dept.name}</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </CardTitle>
                      <CardDescription>
                        {dept.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {dept.branches.slice(0, 5).map((branch) => (
                          <Badge key={branch.id} variant="secondary">
                            {branch.name}
                          </Badge>
                        ))}
                        {dept.branches.length > 5 && (
                          <Badge variant="outline">+{dept.branches.length - 5} more</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
