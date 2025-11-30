"use client";

import { useState, useEffect } from "react";
import { PendingApprovals } from "@/components/admin/pending-approvals";
import { Content, ContentType } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, CheckCircle, XCircle } from "lucide-react";
import { toast, toastMessages } from "@/lib/toast";

export default function ApprovalsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<ContentType | "all">("all");
  const [filterDepartment, setFilterDepartment] = useState<string>("all");
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [pendingContent, setPendingContent] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch pending content from MongoDB
  const fetchPendingContent = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/content?status=pending");
      const data = await response.json();

      console.log("API Response:", data); // Debug log

      if (data.success && data.data) {
        // Transform MongoDB data to match Content type
        const transformedContent = data.data.map((item: any) => {
          // Handle uploader data - it might be populated or just an ID
          const uploaderData =
            typeof item.uploaderId === "object" && item.uploaderId !== null
              ? item.uploaderId
              : {
                  _id: item.uploaderId,
                  name: "Unknown User",
                  email: "",
                  role: "student",
                  branch: "",
                  year: "",
                  points: 0,
                };

          return {
            ...item,
            id: item._id,
            uploader: {
              id: uploaderData._id || uploaderData,
              name: uploaderData.name || "Unknown User",
              email: uploaderData.email || "",
              avatar: uploaderData.avatar,
              role: uploaderData.role || "student",
              branch: uploaderData.branch || "",
              year: uploaderData.year || "",
              points: uploaderData.points || 0,
              createdAt: new Date(uploaderData.createdAt || Date.now()),
            },
            createdAt: new Date(item.createdAt),
            updatedAt: new Date(item.updatedAt),
          };
        });

        console.log("Transformed Content:", transformedContent); // Debug log
        setPendingContent(transformedContent);
      } else {
        console.log("No data or unsuccessful response");
      }
    } catch (error) {
      console.error("Error fetching pending content:", error);
      toast.error("Failed to load pending content");
    } finally {
      setIsLoading(false);
    }
  };

  // Load content on mount
  useEffect(() => {
    fetchPendingContent();
  }, []);

  // Get all pending content
  const allPendingContent = pendingContent;

  // Apply filters
  const filteredContent = allPendingContent.filter((content) => {
    const matchesSearch =
      searchQuery === "" ||
      content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.uploader.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === "all" || content.type === filterType;

    const matchesDepartment =
      filterDepartment === "all" || content.department === filterDepartment;

    return matchesSearch && matchesType && matchesDepartment;
  });

  // Get unique departments
  const departments = Array.from(
    new Set(allPendingContent.map((c) => c.department))
  );

  const handleApprove = async (contentId: string) => {
    try {
      const response = await fetch(`/api/content/${contentId}/approve`, {
        method: "PUT",
      });
      const data = await response.json();

      if (data.success) {
        toast.success(toastMessages.approval.approved);
        // Refresh the list
        fetchPendingContent();
        setSelectedItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(contentId);
          return newSet;
        });
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      console.error("Error approving content:", error);
      toast.error("Failed to approve content");
    }
  };

  const handleReject = async (contentId: string) => {
    try {
      const response = await fetch(`/api/content/${contentId}/reject`, {
        method: "PUT",
      });
      const data = await response.json();

      if (data.success) {
        toast.info(toastMessages.approval.rejected);
        // Refresh the list
        fetchPendingContent();
        setSelectedItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(contentId);
          return newSet;
        });
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      console.error("Error rejecting content:", error);
      toast.error("Failed to reject content");
    }
  };

  const handleBulkApprove = async () => {
    if (selectedItems.size === 0) {
      toast.error("No items selected");
      return;
    }

    const itemIds = Array.from(selectedItems);
    let successCount = 0;

    try {
      // Approve each item
      for (const id of itemIds) {
        const response = await fetch(`/api/content/${id}/approve`, {
          method: "PUT",
        });
        const data = await response.json();
        if (data.success) successCount++;
      }

      if (successCount > 0) {
        toast.success(`Approved ${successCount} item${successCount !== 1 ? "s" : ""}`);
        fetchPendingContent();
      }
    } catch (error) {
      console.error("Error bulk approving:", error);
      toast.error("Failed to approve some items");
    }

    setSelectedItems(new Set());
  };

  const handleBulkReject = async () => {
    if (selectedItems.size === 0) {
      toast.error("No items selected");
      return;
    }

    const itemIds = Array.from(selectedItems);
    let successCount = 0;

    try {
      // Reject each item
      for (const id of itemIds) {
        const response = await fetch(`/api/content/${id}/reject`, {
          method: "PUT",
        });
        const data = await response.json();
        if (data.success) successCount++;
      }

      if (successCount > 0) {
        toast.info(`Rejected ${successCount} item${successCount !== 1 ? "s" : ""}`);
        fetchPendingContent();
      }
    } catch (error) {
      console.error("Error bulk rejecting:", error);
      toast.error("Failed to reject some items");
    }

    setSelectedItems(new Set());
  };

  const toggleSelection = (contentId: string) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(contentId)) {
        newSet.delete(contentId);
      } else {
        newSet.add(contentId);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectedItems.size === filteredContent.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(filteredContent.map((c) => c.id)));
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Content Approvals</h1>
        <p className="text-muted-foreground mt-2">
          Review and approve pending content submissions
        </p>
      </div>

      {/* Stats */}
      <div className="flex gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 dark:bg-orange-950 p-2 rounded-lg">
                <Filter className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{allPendingContent.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 dark:bg-blue-950 p-2 rounded-lg">
                <Filter className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Filtered</p>
                <p className="text-2xl font-bold">{filteredContent.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {selectedItems.size > 0 && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 dark:bg-purple-950 p-2 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Selected</p>
                  <p className="text-2xl font-bold">{selectedItems.size}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, description, or uploader..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Type Filter */}
            <Select
              value={filterType}
              onValueChange={(value) => setFilterType(value as ContentType | "all")}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Content Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="note">Notes</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="pyq">PYQs</SelectItem>
                <SelectItem value="important">Important Questions</SelectItem>
                <SelectItem value="syllabus">Syllabus</SelectItem>
                <SelectItem value="timetable">Time Table</SelectItem>
              </SelectContent>
            </Select>

            {/* Department Filter */}
            <Select
              value={filterDepartment}
              onValueChange={setFilterDepartment}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedItems.size > 0 && (
        <Card className="border-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge variant="secondary">{selectedItems.size} selected</Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleSelectAll}
                >
                  {selectedItems.size === filteredContent.length
                    ? "Deselect All"
                    : "Select All"}
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleBulkApprove}
                  className="gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  Approve Selected
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleBulkReject}
                  className="gap-2"
                >
                  <XCircle className="h-4 w-4" />
                  Reject Selected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content List */}
      {filteredContent.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              {allPendingContent.length === 0
                ? "No pending approvals"
                : "No content matches your filters"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <PendingApprovals
          content={filteredContent}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
}
