import { Navbar } from "./navbar";
import { BottomNav } from "./bottom-nav";
import { BreadcrumbNav } from "@/components/navigation/breadcrumb-nav";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <BreadcrumbNav />
      <main className="pb-20 md:pb-0">{children}</main>
      <BottomNav />
    </div>
  );
}
