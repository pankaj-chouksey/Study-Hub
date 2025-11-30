"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Search, Trash2, Edit, Eye, Loader2 } from "lucide-react"
import { Content, ContentType } from "@/lib/types"
import { toast } from "sonner"
import Link from "next/link"

export default function ContentManagementPage() {
  const [content, setContent] = useState<Content[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<ContentType | "all">("all")
  const [filterStatus, setFilterStatus] = useState<"all" | "approved" | "pending" | "rejected">("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [contentToDelete, setContentToDelete] = useState<Content | null>(null)

  const fetchContent = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/content")
      const data = await response.json()

      if (data.success) {
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
        }))
        setContent(transformedContent)
      }
    } catch (error) {
      console.error("Error fetching content:", error)
      toast.error("Failed to load content")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchContent()
  }, [])

  const handleDelete = async () => {
    if (!contentToDelete) return

    try {
      const response = await fetch(`/api/content/${contentToDelete.id}`, {
        method: "DELETE",
      })
      const data = await response.json()

      if (data.success) {
        toast.success("Content deleted successfully")
        fetchContent()
        setDeleteDialogOpen(false)
        setContentToDelete(null)
      } else {
        throw new Error(data.error)
      }
    } catch (error: any) {
      console.error("Error deleting content:", error)
      toast.error("Failed to delete content")
    }
  }

  const openDeleteDialog = (item: Content) => {
    setContentToDelete(item)
    setDeleteDialogOpen(true)
  }

  // Filter content
  const filteredContent = content.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.uploader.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = filterType === "all" || item.type === filterType
    const matchesStatus = filterStatus === "all" || item.status === filterStatus

    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>
      case "pending":
        return <Badge className="bg-orange-500">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-500">Rejected</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getTypeBadge = (type: ContentType) => {
    const typeLabels: Record<ContentType, string> = {
      note: "Note",
      video: "Video",
      pyq: "PYQ",
      important: "Important",
      syllabus: "Syllabus",
      timetable: "Time Table",
    }
    return <Badge variant="outline">{typeLabels[type]}</Badge>
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light text-[#2E2E2E] dark:text-[#EEEEEE]">Content Management</h1>
        <p className="text-muted-foreground mt-2">
          View, edit, and delete all content
        </p>
      </div>

      {/* Filters */}
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
                <SelectItem value="important">Important</SelectItem>
                <SelectItem value="syllabus">Syllabus</SelectItem>
                <SelectItem value="timetable">Time Table</SelectItem>
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select
              value={filterStatus}
              onValueChange={(value) => setFilterStatus(value as typeof filterStatus)}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Content List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#2E2E2E] dark:text-[#EEEEEE]" />
        </div>
      ) : filteredContent.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              {content.length === 0
                ? "No content found"
                : "No content matches your filters"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredContent.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {getTypeBadge(item.type)}
                      {getStatusBadge(item.status)}
                    </div>
                    <h3 className="font-normal text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>By: {item.uploader.name}</span>
                      <span>•</span>
                      <span>{item.department} / {item.branch}</span>
                      <span>•</span>
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.status === "approved" && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/departments/${item.department.toLowerCase().replace(/\s+/g, "-")}/${item.branch.toLowerCase().replace(/\s+/g, "-")}/${item.year}/${item.subject.toLowerCase().replace(/\s+/g, "-")}/${item.topic.toLowerCase().replace(/\s+/g, "-")}?content=${item.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Link>
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => openDeleteDialog(item)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Content</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{contentToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

