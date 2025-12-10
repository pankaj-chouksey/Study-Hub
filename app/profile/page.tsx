"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { type Session } from "next-auth";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/main-layout";
import { AuthRequired } from "@/components/auth/auth-required";
import { ContentCard } from "@/components/content/content-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Mail, 
  GraduationCap, 
  Calendar, 
  Upload, 
  Download,
  FileText,
  Video,
  FileQuestion,
  Star,
  BookOpen
} from "lucide-react";
import { Content, ContentType } from "@/lib/types";
import { toast } from "sonner";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  const [userContent, setUserContent] = useState<Content[]>([]);
  const [isLoadingContent, setIsLoadingContent] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "approved" | "pending" | "rejected">("all");

  const user = session?.user;

  // Fetch user's content
  useEffect(() => {
    const fetchUserContent = async () => {
      if (!user?.id) return;

      try {
        setIsLoadingContent(true);
        const response = await fetch(`/api/content?uploaderId=${user.id}`);
        const data = await response.json();

        if (data.success) {
          // Transform MongoDB data to match Content type
          const transformedContent = data.data.map((item: any) => ({
            ...item,
            id: item._id,
            uploader: {
              id: item.uploaderId?._id || item.uploaderId || "unknown",
              name: item.uploaderId?.name || "Unknown User",
              email: item.uploaderId?.email || "",
              avatar: item.uploaderId?.avatar,
              role: item.uploaderId?.role || "student",
              branch: item.uploaderId?.branch || "",
              year: item.uploaderId?.year || "",
              points: item.uploaderId?.points || 0,
              createdAt: new Date(item.uploaderId?.createdAt || Date.now()),
            },
            createdAt: new Date(item.createdAt),
            updatedAt: new Date(item.updatedAt),
          }));

          setUserContent(transformedContent);
        } else {
          toast.error(data.error || "Failed to fetch content");
        }
      } catch (error) {
        console.error("Error fetching user content:", error);
        toast.error("Failed to load your content");
      } finally {
        setIsLoadingContent(false);
      }
    };

    if (isAuthenticated && user?.id) {
      fetchUserContent();
    }
  }, [isAuthenticated, user?.id]);

  // Calculate statistics
  const stats = {
    totalUploads: userContent.length,
    approved: userContent.filter((c) => c.status === "approved").length,
    pending: userContent.filter((c) => c.status === "pending").length,
    rejected: userContent.filter((c) => c.status === "rejected").length,
    totalDownloads: userContent.reduce((sum, c) => sum + c.downloads, 0),
  };

  // Filter content by status
  const filteredContent = activeTab === "all" 
    ? userContent 
    : userContent.filter((c) => c.status === activeTab);

  // Group content by type
  const contentByType: Record<ContentType, number> = {
    note: userContent.filter((c) => c.type === "note").length,
    video: userContent.filter((c) => c.type === "video").length,
    pyq: userContent.filter((c) => c.type === "pyq").length,
    important: userContent.filter((c) => c.type === "important").length,
    syllabus: userContent.filter((c) => c.type === "syllabus").length,
    timetable: userContent.filter((c) => c.type === "timetable").length,
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">Loading...</div>
        </div>
      </MainLayout>
    );
  }

  if (!isAuthenticated) {
    return (
      <MainLayout>
        <AuthRequired />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="w-24 h-24 md:w-32 md:h-32 border-2 border-border">
                <AvatarImage src={user?.avatar} alt={user?.name || "User"} />
                <AvatarFallback className="text-2xl md:text-3xl">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-light mb-2">
                      {user?.name || "User"}
                    </h1>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-4 h-4" />
                        <span>{user?.email}</span>
                      </div>
                      {user?.branch && (
                        <div className="flex items-center gap-1.5">
                          <GraduationCap className="w-4 h-4" />
                          <span>{user.branch}</span>
                        </div>
                      )}
                      {user?.year && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>Year {user.year}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {user?.role === "admin" && (
                    <Badge variant="secondary" className="text-sm">
                      Admin
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950">
                  <Upload className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Uploads</p>
                  <p className="text-xl font-light">{stats.totalUploads}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-950">
                  <FileText className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Approved</p>
                  <p className="text-xl font-light">{stats.approved}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-950">
                  <Download className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Downloads</p>
                  <p className="text-xl font-light">{stats.totalDownloads.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content by Type */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-light">Content by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(contentByType).map(([type, count]) => {
                const icons: Record<ContentType, typeof FileText> = {
                  note: FileText,
                  video: Video,
                  pyq: FileQuestion,
                  important: Star,
                  syllabus: BookOpen,
                  timetable: Calendar,
                };
                const Icon = icons[type as ContentType];
                return (
                  <div
                    key={type}
                    className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted/50"
                  >
                    <Icon className="w-6 h-6 mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground capitalize">{type}</p>
                    <p className="text-xl font-light mt-1">{count}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* User's Content */}
        <Card>
          <CardHeader>
            <CardTitle className="font-light">My Content</CardTitle>
            <CardDescription>
              Manage and view all your uploaded content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">
                  All ({stats.totalUploads})
                </TabsTrigger>
                <TabsTrigger value="approved">
                  Approved ({stats.approved})
                </TabsTrigger>
                <TabsTrigger value="pending">
                  Pending ({stats.pending})
                </TabsTrigger>
                <TabsTrigger value="rejected">
                  Rejected ({stats.rejected})
                </TabsTrigger>
              </TabsList>

              {isLoadingContent ? (
                <div className="text-center py-12">
                  <div className="text-muted-foreground">Loading your content...</div>
                </div>
              ) : filteredContent.length === 0 ? (
                <div className="text-center py-12">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">
                    {activeTab === "all" 
                      ? "You haven't uploaded any content yet."
                      : `You don't have any ${activeTab} content.`}
                  </p>
                  <Button onClick={() => router.push("/upload")} variant="outline">
                    Upload Content
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredContent.map((content) => (
                    <div key={content.id} className="relative">
                      <ContentCard content={content} />
                      <Badge
                        variant={
                          content.status === "approved"
                            ? "default"
                            : content.status === "pending"
                            ? "secondary"
                            : "destructive"
                        }
                        className="absolute top-2 right-2"
                      >
                        {content.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

