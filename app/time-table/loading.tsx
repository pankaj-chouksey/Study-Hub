import { MainLayout } from "@/components/layout/main-layout"
import { Loader2 } from "lucide-react"

export default function TimeTableLoading() {
  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-background to-muted/20 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-muted rounded animate-pulse" />
              <div className="w-48 h-8 bg-muted rounded animate-pulse" />
            </div>
            <div className="w-96 h-6 bg-muted rounded animate-pulse" />
          </div>

          {/* Loading State */}
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#2E2E2E] dark:text-[#EEEEEE]" />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

