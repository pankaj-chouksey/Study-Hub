"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, Video, FileQuestion, Star, Loader2, BookOpen, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MOCK_CONTENT } from "@/lib/constants";
import type { Content, ContentType } from "@/lib/types";
import { getContentUrl } from "@/lib/content-url";

interface SearchResult {
  id: string;
  title: string;
  type: Content["type"];
  path: string;
  description?: string;
}

const typeIcons: Record<ContentType, React.ComponentType<{ className?: string }>> = {
  note: FileText,
  video: Video,
  pyq: FileQuestion,
  important: Star,
  syllabus: BookOpen,
  timetable: Calendar,
};

export function SearchBar({ className }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Search function with debounce
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      // Search through mock content
      const searchResults = MOCK_CONTENT
        .filter((content: Content) => {
          const searchTerm = query.toLowerCase();
          return (
            content.title.toLowerCase().includes(searchTerm) ||
            content.description.toLowerCase().includes(searchTerm) ||
            content.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm)) ||
            content.subject.toLowerCase().includes(searchTerm) ||
            content.topic.toLowerCase().includes(searchTerm)
          );
        })
        .slice(0, 8)
        .map((content: Content) => ({
          id: content.id,
          title: content.title,
          type: content.type,
          path: getContentUrl(content).split('?')[0], // Remove query params for search results
          description: content.description,
        }));

      setResults(searchResults);
      setIsOpen(searchResults.length > 0);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleResultClick(results[selectedIndex]);
        } else if (query) {
          handleSearch();
        }
        break;
      case "Escape":
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleResultClick = (result: SearchResult) => {
    router.push(result.path);
    setQuery("");
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleSearch = () => {
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={searchRef} className={cn("relative w-full", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search notes, videos, PYQs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && results.length > 0 && setIsOpen(true)}
          className="pl-10 pr-10 w-full bg-muted border-border rounded-lg h-10"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-popover border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            {results.map((result, index) => {
              const Icon = typeIcons[result.type];
              return (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className={cn(
                    "w-full flex items-start gap-3 p-3 rounded-md text-left transition-colors",
                    "hover:bg-accent focus:bg-accent focus:outline-none",
                    selectedIndex === index && "bg-accent"
                  )}
                >
                  <Icon className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{result.title}</p>
                    {result.description && (
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                        {result.description}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          <div className="border-t p-2">
            <button
              onClick={handleSearch}
              className="w-full p-2 text-sm text-center text-muted-foreground hover:text-foreground transition-colors"
            >
              View all results for "{query}"
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
