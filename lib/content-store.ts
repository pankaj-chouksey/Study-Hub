/**
 * Client-side content store for managing pending uploads
 * This simulates a backend by storing content in memory
 * In a real app, this would be replaced with API calls
 */

import { Content, ContentType, HierarchySelection } from "./types";
import { MOCK_USERS } from "./constants";

// In-memory store for pending content
let pendingContent: Content[] = [];

// Listeners for content changes
type ContentChangeListener = () => void;
const listeners: Set<ContentChangeListener> = new Set();

/**
 * Subscribe to content changes
 */
export function subscribeToContentChanges(listener: ContentChangeListener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Notify all listeners of content changes
 */
function notifyListeners() {
  listeners.forEach((listener) => listener());
}

/**
 * Get all pending content
 */
export function getPendingContent(): Content[] {
  return [...pendingContent];
}

/**
 * Add new content to pending queue
 */
export function addPendingContent(data: {
  title: string;
  description: string;
  type: ContentType;
  hierarchy: HierarchySelection;
  fileUrl?: string;
  videoUrl?: string;
  uploaderId: string;
}): Content {
  const uploader = MOCK_USERS.find((u) => u.id === data.uploaderId) || MOCK_USERS[0];

  const newContent: Content = {
    id: `pending-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: data.title,
    description: data.description,
    type: data.type,
    fileUrl: data.fileUrl,
    videoUrl: data.videoUrl,
    thumbnail: data.type === "video" ? "/placeholder-video.jpg" : undefined,
    department: data.hierarchy.department,
    branch: data.hierarchy.branch,
    year: data.hierarchy.year,
    subject: data.hierarchy.subject,
    topic: data.hierarchy.topic,
    uploaderId: data.uploaderId,
    uploader,
    status: "pending",
    rating: 0,
    views: 0,
    downloads: 0,
    tags: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  pendingContent.push(newContent);
  notifyListeners();
  return newContent;
}

/**
 * Approve content
 */
export function approveContent(contentId: string): boolean {
  const index = pendingContent.findIndex((c) => c.id === contentId);
  if (index === -1) return false;

  // In a real app, this would move to approved content
  // For now, we just remove it from pending
  pendingContent.splice(index, 1);
  notifyListeners();
  return true;
}

/**
 * Reject content
 */
export function rejectContent(contentId: string): boolean {
  const index = pendingContent.findIndex((c) => c.id === contentId);
  if (index === -1) return false;

  pendingContent.splice(index, 1);
  notifyListeners();
  return true;
}

/**
 * Bulk approve content
 */
export function bulkApproveContent(contentIds: string[]): number {
  let approvedCount = 0;
  contentIds.forEach((id) => {
    if (approveContent(id)) {
      approvedCount++;
    }
  });
  return approvedCount;
}

/**
 * Bulk reject content
 */
export function bulkRejectContent(contentIds: string[]): number {
  let rejectedCount = 0;
  contentIds.forEach((id) => {
    if (rejectContent(id)) {
      rejectedCount++;
    }
  });
  return rejectedCount;
}

/**
 * Clear all pending content (for testing)
 */
export function clearPendingContent() {
  pendingContent = [];
  notifyListeners();
}

/**
 * Get pending content count
 */
export function getPendingContentCount(): number {
  return pendingContent.length;
}
