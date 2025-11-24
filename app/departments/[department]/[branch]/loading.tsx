import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function YearsLoading() {
  return (
    <div className="min-h-screen">
      {/* Breadcrumb skeleton */}
      <div className="border-b bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Skeleton className="h-4 w-64" />
        </div>
      </div>

      {/* Header skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Skeleton className="h-10 w-48 mb-4" />
        <Skeleton className="h-5 w-80 mb-8" />

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="p-6 space-y-4">
              <Skeleton className="h-12 w-12 rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
