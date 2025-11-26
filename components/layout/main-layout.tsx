import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { BottomNav } from "./bottom-nav";
import { BreadcrumbNav } from "@/components/navigation/breadcrumb-nav";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <BreadcrumbNav />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <Footer />
      <BottomNav />
    </div>
  );
}
