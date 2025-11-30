import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Content from "@/models/Content";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Check if user is authenticated and is an admin
  if (!session || session.user?.role !== "admin") {
    redirect("/");
  }

  // Fetch pending count
  let pendingCount = 0;
  try {
    await dbConnect();
    pendingCount = await Content.countDocuments({ status: "pending" });
  } catch (error) {
    console.error("Error fetching pending count:", error);
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar pendingCount={pendingCount} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
