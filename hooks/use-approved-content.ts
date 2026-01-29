import { useState, useEffect, useCallback, useRef } from "react";
import { Content } from "@/lib/types";

interface ContentFilters {
  department?: string;
  branch?: string;
  year?: string;
  subject?: string;
  topic?: string;
  type?: string;
}

export function useApprovedContent(filters: ContentFilters = {}) {
  const [content, setContent] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchContent = useCallback(async () => {
    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    try {
      setIsLoading(true);
      setError(null);

      // Build query params
      const params = new URLSearchParams({
        status: "approved",
      });

      if (filters.department) params.append("department", filters.department);
      if (filters.branch) params.append("branch", filters.branch);
      if (filters.year) params.append("year", filters.year);
      if (filters.subject) params.append("subject", filters.subject);
      if (filters.topic) params.append("topic", filters.topic);
      if (filters.type) params.append("type", filters.type);

      // Add cache-busting timestamp to ensure fresh data
      params.append("_t", Date.now().toString());

      const response = await fetch(`/api/content?${params.toString()}`, {
        signal: abortControllerRef.current.signal,
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
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

        setContent(transformedContent);
      } else {
        setError(data.error || "Failed to fetch content");
      }
    } catch (err: any) {
      // Ignore abort errors
      if (err.name === 'AbortError') {
        return;
      }
      console.error("Error fetching approved content:", err);
      setError(err.message || "Failed to fetch content");
    } finally {
      setIsLoading(false);
    }
  }, [
    filters.department,
    filters.branch,
    filters.year,
    filters.subject,
    filters.topic,
    filters.type,
  ]);

  useEffect(() => {
    fetchContent();

    // Refetch when page becomes visible (user returns to tab/window)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchContent();
      }
    };

    // Refetch when window gains focus
    const handleFocus = () => {
      fetchContent();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchContent]);

  return { content, isLoading, error, refetch: fetchContent };
}
