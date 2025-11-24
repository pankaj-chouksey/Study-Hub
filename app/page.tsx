import { MainLayout } from "@/components/layout/main-layout";
import { HeroSection } from "@/components/home/hero-section";
import { QuickAccessCards } from "@/components/home/quick-access-cards";
import { DepartmentGrid } from "@/components/home/department-grid";
import { RecentUploads } from "@/components/home/recent-uploads";

export default function Home() {
  return (
    <MainLayout>
      <div className="relative min-h-screen">
        {/* Gradient Background for entire page */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-teal-950/20" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Content */}
        <div className="relative z-10">
          <HeroSection />
          <QuickAccessCards />
          <DepartmentGrid />
          <RecentUploads limit={6} />
        </div>
      </div>
    </MainLayout>
  );
}
