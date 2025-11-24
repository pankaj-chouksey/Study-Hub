"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PendingApprovals } from "@/components/admin/pending-approvals";
import { MOCK_CONTENT, MOCK_USERS } from "@/lib/constants";
import {
  Users,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [pendingContent, setPendingContent] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch pending content from MongoDB
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/content?status=pending");
        const data = await response.json();
        
        if (data.success) {
          setPendingContent(data.data);
        }
      } catch (error) {
        console.error("Error fetching pending content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate stats
  const totalUsers = MOCK_USERS.length;
  const totalContent = MOCK_CONTENT.length + pendingContent.length;
  const totalViews = MOCK_CONTENT.reduce((sum, c) => sum + c.views, 0);
  const pendingCount = pendingContent.length;
  const approvedContent = MOCK_CONTENT.filter((c) => c.status === "approved");

  // Recent activity (last 5 approved content)
  const recentActivity = approvedContent
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 5);

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-950",
    },
    {
      title: "Total Content",
      value: totalContent,
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-950",
    },
    {
      title: "Total Views",
      value: totalViews.toLocaleString(),
      icon: TrendingUp,
      color: "text-teal-600",
      bgColor: "bg-teal-100 dark:bg-teal-950",
    },
    {
      title: "Pending Approvals",
      value: pendingCount,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-950",
    },
  ];

  const quickActions = [
    {
      title: "Review Approvals",
      description: `${pendingCount} items waiting for review`,
      href: "/admin/approvals",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Manage Users",
      description: `${totalUsers} registered users`,
      href: "/admin/users",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "View Analytics",
      description: "Platform insights and trends",
      href: "/admin/analytics",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ];

  const handleApprove = async (contentId: string) => {
    try {
      const response = await fetch(`/api/content/${contentId}/approve`, {
        method: "PUT",
      });
      const data = await response.json();

      if (data.success) {
        // Remove from pending list
        setPendingContent((prev) => prev.filter((c) => c._id !== contentId));
      } else {
        console.error("Failed to approve:", data.error);
      }
    } catch (error) {
      console.error("Error approving content:", error);
    }
  };

  const handleReject = async (contentId: string) => {
    try {
      const response = await fetch(`/api/content/${contentId}/reject`, {
        method: "PUT",
      });
      const data = await response.json();

      if (data.success) {
        // Remove from pending list
        setPendingContent((prev) => prev.filter((c) => c._id !== contentId));
      } else {
        console.error("Failed to reject:", data.error);
      }
    } catch (error) {
      console.error("Error rejecting content:", error);
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's what's happening with your platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card
                key={action.title}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <Link href={action.href}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Icon className={`h-5 w-5 ${action.color}`} />
                          <h3 className="font-semibold">{action.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {action.description}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Pending Approvals Preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Pending Approvals</h2>
          {pendingCount > 3 && (
            <Button variant="outline" asChild>
              <Link href="/admin/approvals">
                View All ({pendingCount})
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
        <PendingApprovals
          content={pendingContent}
          limit={3}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <Card>
          <CardContent className="p-6">
            {recentActivity.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No recent activity
              </p>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-3 border-b last:border-0"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Uploaded by {item.uploader.name} •{" "}
                        {item.updatedAt.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-muted-foreground">
                        Approved
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
