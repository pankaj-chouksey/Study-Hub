"use client";

import { useState } from "react";
import { Content } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText, Video, FileQuestion, Star, Check, X } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface PendingApprovalsProps {
  content: Content[];
  limit?: number;
  onApprove?: (contentId: string) => void;
  onReject?: (contentId: string) => void;
}

const contentIcons = {
  note: FileText,
  video: Video,
  pyq: FileQuestion,
  important: Star,
};

export function PendingApprovals({
  content,
  limit,
  onApprove,
  onReject,
}: PendingApprovalsProps) {
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState<Content | null>(null);

  // Transform MongoDB data to match Content type
  const transformedContent = content.map((item: any) => ({
    ...item,
    id: item._id || item.id,
    uploader: item.uploader || {
      id: item.uploaderId?._id || "unknown",
      name: item.uploaderId?.name || "Unknown User",
      email: item.uploaderId?.email || "",
      avatar: item.uploaderId?.avatar,
      role: item.uploaderId?.role || "student",
    },
    createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
    updatedAt: item.updatedAt ? new Date(item.updatedAt) : new Date(),
  }));

  const displayContent = limit ? transformedContent.slice(0, limit) : transformedContent;

  const handleOpenDialog = (content: Content, action: "approve" | "reject") => {
    setSelectedContent(content);
    setActionType(action);
    setIsDialogOpen(true);
  };

  const handleOpenPreview = (content: Content) => {
    setPreviewContent(content);
    setIsPreviewOpen(true);
  };

  const handleConfirmAction = () => {
    if (!selectedContent || !actionType) return;

    // Use _id from MongoDB or fallback to id
    const contentId = (selectedContent as any)._id || selectedContent.id;

    if (actionType === "approve") {
      onApprove?.(contentId);
      toast.success(`"${selectedContent.title}" has been approved`);
    } else {
      onReject?.(contentId);
      toast.error(`"${selectedContent.title}" has been rejected`);
    }

    setIsDialogOpen(false);
    setSelectedContent(null);
    setActionType(null);
  };

  if (displayContent.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">No pending approvals</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {displayContent.map((item) => {
          const Icon = contentIcons[item.type as keyof typeof contentIcons] || FileText;

          return (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>

                  {/* Content Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {item.description}
                        </p>

                        {/* Metadata */}
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={item.uploader?.avatar} />
                              <AvatarFallback>
                                {item.uploader?.name?.charAt(0) || "U"}
                              </AvatarFallback>
                            </Avatar>
                            <span>{item.uploader?.name || "Unknown User"}</span>
                          </div>
                          <span>•</span>
                          <span>{formatDistanceToNow(item.createdAt, { addSuffix: true })}</span>
                          <span>•</span>
                          <Badge variant="outline" className="capitalize">
                            {item.type}
                          </Badge>
                        </div>

                        {/* Hierarchy Path */}
                        <div className="mt-2 text-xs text-muted-foreground">
                          {item.department} → {item.branch} → {item.year} → {item.subject} → {item.topic}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 flex-shrink-0">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleOpenPreview(item)}
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => handleOpenDialog(item, "approve")}
                          className="gap-2"
                        >
                          <Check className="h-4 w-4" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleOpenDialog(item, "reject")}
                          className="gap-2"
                        >
                          <X className="h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "approve" ? "Approve Content" : "Reject Content"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "approve"
                ? "Are you sure you want to approve this content? It will be visible to all users."
                : "Are you sure you want to reject this content? The uploader will be notified."}
            </DialogDescription>
          </DialogHeader>

          {selectedContent && (
            <div className="py-4">
              <p className="font-medium">{selectedContent.title}</p>
              <p className="text-sm text-muted-foreground mt-1">
                by {selectedContent.uploader?.name || "Unknown User"}
              </p>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={actionType === "approve" ? "default" : "destructive"}
              onClick={handleConfirmAction}
            >
              {actionType === "approve" ? "Approve" : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Content Preview</DialogTitle>
          </DialogHeader>

          {previewContent && (
            <div className="space-y-4">
              {/* Title and Type */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="capitalize">
                    {previewContent.type}
                  </Badge>
                  <Badge variant="secondary">{previewContent.status}</Badge>
                </div>
                <h2 className="text-2xl font-bold">{previewContent.title}</h2>
              </div>

              {/* Uploader Info */}
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={previewContent.uploader?.avatar} />
                  <AvatarFallback>
                    {previewContent.uploader?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{previewContent.uploader?.name || "Unknown User"}</p>
                  <p className="text-sm text-muted-foreground">
                    {previewContent.uploader?.email || "No email"}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{previewContent.description}</p>
              </div>

              {/* Hierarchy */}
              <div>
                <h3 className="font-semibold mb-2">Location</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Department:</span>{" "}
                    <span className="font-medium">{previewContent.department}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Branch:</span>{" "}
                    <span className="font-medium">{previewContent.branch}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Year:</span>{" "}
                    <span className="font-medium">{previewContent.year}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Subject:</span>{" "}
                    <span className="font-medium">{previewContent.subject}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Topic:</span>{" "}
                    <span className="font-medium">{previewContent.topic}</span>
                  </div>
                </div>
              </div>

              {/* File/Video URL */}
              {previewContent.fileUrl && (
                <div>
                  <h3 className="font-semibold mb-2">File</h3>
                  <a
                    href={previewContent.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {previewContent.fileUrl}
                  </a>
                </div>
              )}

              {previewContent.videoUrl && (
                <div>
                  <h3 className="font-semibold mb-2">Video</h3>
                  <a
                    href={previewContent.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {previewContent.videoUrl}
                  </a>
                  {/* Embed YouTube video if it's a YouTube URL */}
                  {previewContent.videoUrl.includes("youtube.com") ||
                  previewContent.videoUrl.includes("youtu.be") ? (
                    <div className="mt-3 aspect-video">
                      <iframe
                        src={previewContent.videoUrl.replace("watch?v=", "embed/")}
                        className="w-full h-full rounded-lg"
                        allowFullScreen
                      />
                    </div>
                  ) : null}
                </div>
              )}

              {/* Metadata */}
              <div className="grid grid-cols-3 gap-4 p-3 bg-muted rounded-lg text-sm">
                <div>
                  <p className="text-muted-foreground">Views</p>
                  <p className="font-semibold">{previewContent.views}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Downloads</p>
                  <p className="font-semibold">{previewContent.downloads}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Rating</p>
                  <p className="font-semibold">{previewContent.rating.toFixed(1)}</p>
                </div>
              </div>

              {/* Tags */}
              {previewContent.tags && previewContent.tags.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {previewContent.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Timestamps */}
              <div className="text-xs text-muted-foreground border-t pt-3">
                <p>Uploaded: {formatDistanceToNow(previewContent.createdAt, { addSuffix: true })}</p>
                <p>Last updated: {formatDistanceToNow(previewContent.updatedAt, { addSuffix: true })}</p>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
              Close
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setIsPreviewOpen(false);
                if (previewContent) {
                  handleOpenDialog(previewContent, "reject");
                }
              }}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Reject
            </Button>
            <Button
              variant="default"
              onClick={() => {
                setIsPreviewOpen(false);
                if (previewContent) {
                  handleOpenDialog(previewContent, "approve");
                }
              }}
              className="gap-2"
            >
              <Check className="h-4 w-4" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </>
  );
}
