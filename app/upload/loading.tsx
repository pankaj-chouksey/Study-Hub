import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function UploadLoading() {
  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Skeleton className="h-10 w-48 mb-2" />
        <Skeleton className="h-5 w-96 mb-8" />

        <Card className="p-8 space-y-8">
          {/* Hierarchy selector skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-10 w-full" />
            
            <Skeleton className="h-5 w-24 mb-2" />
            <Skeleton className="h-10 w-full" />
            
            <Skeleton className="h-5 w-20 mb-2" />
            <Skeleton className="h-10 w-full" />
            
            <Skeleton className="h-5 w-28 mb-2" />
            <Skeleton className="h-10 w-full" />
            
            <Skeleton className="h-5 w-24 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Tabs skeleton */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
            
            {/* Upload area skeleton */}
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>

          {/* Description skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-32 w-full" />
          </div>

          {/* Button skeleton */}
          <Skeleton className="h-10 w-full" />
        </Card>
      </div>
    </div>
  );
}
