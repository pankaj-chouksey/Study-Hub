import { useState, useEffect } from "react";
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

  useEffect(() => {
    const fetchContent = async () => {
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

        const response = await fetch(`/api/content?${params.toString()}`);
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
        console.error("Error fetching approved content:", err);
        setError(err.message || "Failed to fetch content");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [
    filters.department,
    filters.branch,
    filters.year,
    filters.subject,
    filters.topic,
    filters.type,
  ]);

  return { content, isLoading, error };
}
