import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { redirect } from "next/navigation";

// Mock authentication check - replace with actual auth logic
function checkAdminAuth() {
  // TODO: Replace with actual authentication check
  // For now, we'll allow access for development
  const isAdmin = true; // This should check actual user role from session/auth
  return isAdmin;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = checkAdminAuth();

  if (!isAdmin) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar pendingCount={5} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
