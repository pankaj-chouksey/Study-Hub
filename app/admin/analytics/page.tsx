"use client";

import { MOCK_CONTENT, MOCK_USERS } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Users,
  FileText,
  Eye,
  Download,
  Star,
  Calendar,
  BarChart,
} from "lucide-react";

export default function AnalyticsPage() {
  // Calculate analytics
  const totalContent = MOCK_CONTENT.length;
  const approvedContent = MOCK_CONTENT.filter((c) => c.status === "approved");
  const totalViews = MOCK_CONTENT.reduce((sum, c) => sum + c.views, 0);
  const totalDownloads = MOCK_CONTENT.reduce((sum, c) => sum + c.downloads, 0);
  const avgRating =
    approvedContent.reduce((sum, c) => sum + c.rating, 0) / approvedContent.length || 0;

  // Content by type
  const contentByType = {
    note: MOCK_CONTENT.filter((c) => c.type === "note").length,
    video: MOCK_CONTENT.filter((c) => c.type === "video").length,
    pyq: MOCK_CONTENT.filter((c) => c.type === "pyq").length,
    important: MOCK_CONTENT.filter((c) => c.type === "important").length,
  };

  // Top content by views
  const topContent = [...approvedContent]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  // Top uploaders
  const uploaderStats = MOCK_USERS.map((user) => {
    const userContent = MOCK_CONTENT.filter((c) => c.uploaderId === user.id);
    const totalViews = userContent.reduce((sum, c) => sum + c.views, 0);
    return {
      user,
      uploads: userContent.length,
      views: totalViews,
    };
  })
    .filter((stat) => stat.uploads > 0)
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  // Recent uploads trend (last 7 days mock data)
  const uploadTrend = [
    { day: "Mon", uploads: 12 },
    { day: "Tue", uploads: 15 },
    { day: "Wed", uploads: 8 },
    { day: "Thu", uploads: 18 },
    { day: "Fri", uploads: 22 },
    { day: "Sat", uploads: 10 },
    { day: "Sun", uploads: 14 },
  ];

  const maxUploads = Math.max(...uploadTrend.map((d) => d.uploads));

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Platform insights and performance metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Content
                </p>
                <p className="text-3xl font-bold mt-2">{totalContent}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {approvedContent.length} approved
                </p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-950 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Views
                </p>
                <p className="text-3xl font-bold mt-2">
                  {totalViews.toLocaleString()}
                </p>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +12% this week
                </p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-950 p-3 rounded-lg">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Downloads
                </p>
                <p className="text-3xl font-bold mt-2">
                  {totalDownloads.toLocaleString()}
                </p>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +8% this week
                </p>
              </div>
              <div className="bg-teal-100 dark:bg-teal-950 p-3 rounded-lg">
                <Download className="h-6 w-6 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Avg Rating
                </p>
                <p className="text-3xl font-bold mt-2">
                  {avgRating.toFixed(1)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  out of 5.0
                </p>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-950 p-3 rounded-lg">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Content by Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(contentByType).map(([type, count]) => {
                const percentage = (count / totalContent) * 100;
                const colors = {
                  note: "bg-blue-600",
                  video: "bg-purple-600",
                  pyq: "bg-teal-600",
                  important: "bg-orange-600",
                };

                return (
                  <div key={type}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium capitalize">
                        {type === "pyq" ? "PYQs" : type}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {count} ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`${colors[type as keyof typeof colors]} h-2 rounded-full transition-all`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upload Trend (Last 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-2 h-48">
              {uploadTrend.map((data) => {
                const height = (data.uploads / maxUploads) * 100;
                return (
                  <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative w-full flex items-end justify-center h-40">
                      <div
                        className="w-full bg-primary rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                        style={{ height: `${height}%` }}
                        title={`${data.uploads} uploads`}
                      />
                      <span className="absolute -top-6 text-xs font-medium">
                        {data.uploads}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {data.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Content and Uploaders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Top Content by Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topContent.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No content available
              </p>
            ) : (
              <div className="space-y-4">
                {topContent.map((content, index) => (
                  <div
                    key={content.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{content.title}</p>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {content.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          {content.downloads.toLocaleString()}
                        </span>
                        <Badge variant="outline" className="capitalize">
                          {content.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Top Contributors
            </CardTitle>
          </CardHeader>
          <CardContent>
            {uploaderStats.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No contributors yet
              </p>
            ) : (
              <div className="space-y-4">
                {uploaderStats.map((stat, index) => (
                  <div
                    key={stat.user.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{stat.user.name}</p>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {stat.uploads} uploads
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {stat.views.toLocaleString()} views
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Engagement Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Engagement Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                Avg Views per Content
              </p>
              <p className="text-3xl font-bold">
                {Math.round(totalViews / totalContent)}
              </p>
            </div>
            <div className="text-center p-6 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                Avg Downloads per Content
              </p>
              <p className="text-3xl font-bold">
                {Math.round(totalDownloads / totalContent)}
              </p>
            </div>
            <div className="text-center p-6 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                Download Rate
              </p>
              <p className="text-3xl font-bold">
                {((totalDownloads / totalViews) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
