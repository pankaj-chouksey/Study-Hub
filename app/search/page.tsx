"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContentCard } from "@/components/content/content-card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Content } from "@/lib/types";
import { Search, SlidersHorizontal } from "lucide-react";
import { PageTransition } from "@/components/animations/page-transition";
import { useApprovedContent } from "@/hooks/use-approved-content";

type SortOption = "relevance" | "recent" | "popular" | "rating";
type FilterType = "all" | "note" | "video" | "pyq" | "important";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<Content[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [isSearching, setIsSearching] = useState(false);

  // Fetch all approved content
  const { content: allContent, isLoading: isLoadingContent } = useApprovedContent();

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    // Simulate search delay
    const timeoutId = setTimeout(() => {
      const searchTerm = query.toLowerCase();
      let filtered = allContent.filter((content: Content) => {
        const matchesQuery =
          content.title.toLowerCase().includes(searchTerm) ||
          content.description.toLowerCase().includes(searchTerm) ||
          content.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm)) ||
          content.subject.toLowerCase().includes(searchTerm) ||
          content.topic.toLowerCase().includes(searchTerm) ||
          content.uploader.name.toLowerCase().includes(searchTerm);

        const matchesType = filterType === "all" || content.type === filterType;

        return matchesQuery && matchesType;
      });

      // Apply sorting
      switch (sortBy) {
        case "recent":
          filtered.sort(
            (a: Content, b: Content) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case "popular":
          filtered.sort((a: Content, b: Content) => b.views - a.views);
          break;
        case "rating":
          filtered.sort((a: Content, b: Content) => b.rating - a.rating);
          break;
        case "relevance":
        default:
          // Keep original order (relevance-based)
          break;
      }

      setResults(filtered);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, sortBy, filterType, allContent]);

  const isLoading = isLoadingContent || isSearching;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <PageTransition>
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Search Results</h1>
            {query && (
              <p className="text-muted-foreground">
                {isLoading ? (
                  "Searching..."
                ) : (
                  <>
                    Found {results.length} result{results.length !== 1 ? "s" : ""}{" "}
                    for "{query}"
                  </>
                )}
              </p>
            )}
          </div>

          {!query ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Search className="h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No search query</h2>
              <p className="text-muted-foreground">
                Enter a search term to find notes, videos, and more
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filters:</span>
                </div>
                <Select
                  value={filterType}
                  onValueChange={(value) => setFilterType(value as FilterType)}
                >
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Content Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="note">Notes</SelectItem>
                    <SelectItem value="video">Videos</SelectItem>
                    <SelectItem value="pyq">PYQs</SelectItem>
                    <SelectItem value="important">Important Questions</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value as SortOption)}
                >
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="h-64 bg-muted animate-pulse rounded-lg"
                    />
                  ))}
                </div>
              ) : results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((content) => (
                    <ContentCard key={content.id} content={content} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Search className="h-16 w-16 text-muted-foreground mb-4" />
                  <h2 className="text-2xl font-semibold mb-2">No results found</h2>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search or filters
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSortBy("relevance");
                      setFilterType("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </>
          )}
        </main>
      </PageTransition>
      <Footer />
    </div>
  );
}
