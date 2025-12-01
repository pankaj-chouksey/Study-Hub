"use client"

import { ContentType } from "@/lib/types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface ContentFiltersProps {
  topics?: string[]
  selectedTopic?: string
  onTopicChange?: (topic: string) => void
  
  years?: string[]
  selectedYear?: string
  onYearChange?: (year: string) => void
  
  types?: ContentType[]
  selectedType?: ContentType | "all"
  onTypeChange?: (type: ContentType | "all") => void
  
  className?: string
}

const contentTypeLabels: Record<ContentType, string> = {
  note: "Notes",
  video: "Videos",
  pyq: "PYQs",
  important: "Important Questions",
  syllabus: "Syllabus",
  timetable: "Time Table",
}

export function ContentFilters({
  topics = [],
  selectedTopic = "all",
  onTopicChange,
  
  years = [],
  selectedYear = "all",
  onYearChange,
  
  types = ["note", "video", "pyq", "important", "syllabus", "timetable"],
  selectedType = "all",
  onTypeChange,
  
  className,
}: ContentFiltersProps) {
  return (
    <div className={className}>
      <div className="flex flex-wrap gap-4">
        {/* Topic Filter */}
        {topics.length > 0 && (
          <div className="flex flex-col gap-2 min-w-[180px]">
            <Label htmlFor="topic-filter" className="text-sm font-medium">
              Topic
            </Label>
            <Select
              value={selectedTopic}
              onValueChange={onTopicChange}
            >
              <SelectTrigger id="topic-filter" className="w-full">
                <SelectValue placeholder="All Topics" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Topics</SelectItem>
                {topics.map((topic) => (
                  <SelectItem key={topic} value={topic}>
                    {topic}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Year Filter */}
        {years.length > 0 && (
          <div className="flex flex-col gap-2 min-w-[180px]">
            <Label htmlFor="year-filter" className="text-sm font-medium">
              Year
            </Label>
            <Select
              value={selectedYear}
              onValueChange={onYearChange}
            >
              <SelectTrigger id="year-filter" className="w-full">
                <SelectValue placeholder="All Years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Type Filter */}
        <div className="flex flex-col gap-2 min-w-[180px]">
          <Label htmlFor="type-filter" className="text-sm font-medium">
            Content Type
          </Label>
          <Select
            value={selectedType}
            onValueChange={(value) => onTypeChange?.(value as ContentType | "all")}
          >
            <SelectTrigger id="type-filter" className="w-full">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {types.map((type) => (
                <SelectItem key={type} value={type}>
                  {contentTypeLabels[type]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
