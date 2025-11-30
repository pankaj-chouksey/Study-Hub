import { MainLayout } from "@/components/layout/main-layout";
import { HeroSection } from "@/components/home/hero-section";
import { DepartmentGrid } from "@/components/home/department-grid";
import { RecentUploads } from "@/components/home/recent-uploads";

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <DepartmentGrid />
      <RecentUploads limit={6} />
    </MainLayout>
  );
}
