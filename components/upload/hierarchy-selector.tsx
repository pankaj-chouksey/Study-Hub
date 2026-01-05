"use client"

import { useState, useEffect, useRef } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DEPARTMENTS } from "@/lib/constants"
import { HierarchySelection, ContentType } from "@/lib/types"

interface HierarchySelectorProps {
  onSelect: (selection: HierarchySelection) => void
  value?: Partial<HierarchySelection>
  contentType?: ContentType
}

export function HierarchySelector({ onSelect, value, contentType }: HierarchySelectorProps) {
  const [selection, setSelection] = useState<Partial<HierarchySelection>>(
    value || {}
  )
  const skipCallbackRef = useRef(false)
  const onSelectRef = useRef(onSelect)

  // Keep onSelect ref up to date
  useEffect(() => {
    onSelectRef.current = onSelect
  }, [onSelect])

  // For syllabus and timetable, subject and topic are optional
  const requiresSubject = contentType !== "syllabus" && contentType !== "timetable"

  // Sync with value prop only when it's explicitly reset (null/undefined)
  useEffect(() => {
    if (value === undefined || value === null) {
      // Only reset if we have something selected
      const hasSelection = selection.department || selection.branch || selection.year || selection.subject || selection.topic
      if (hasSelection) {
        skipCallbackRef.current = true
        setSelection({})
      }
    }
  }, [value])

  // Get available options based on current selection
  const departments = DEPARTMENTS
  const branches = selection.department
    ? DEPARTMENTS.find((d) => d.slug === selection.department)?.branches || []
    : []
  const selectedBranch = selection.branch
    ? branches.find((b) => b.slug === selection.branch)
    : null
  const years = selectedBranch?.years || []
  // Get subjects based on selected branch and year
  const selectedYear = selection.year
    ? years.find((y) => y.level.toString() === selection.year)
    : null
  const subjects = selectedYear?.subjects || []

  // Update parent component when selection changes
  useEffect(() => {
    // Skip callback if this is an internal reset from prop sync
    if (skipCallbackRef.current) {
      skipCallbackRef.current = false
      return
    }

    // Don't call onSelect if selection is empty or incomplete
    if (!selection.department || !selection.branch || !selection.year) {
      return
    }

    const hasRequiredFields = 
      selection.department &&
      selection.branch &&
      selection.year &&
      (!requiresSubject || (selection.subject && selection.topic))
    
    if (hasRequiredFields) {
      // For syllabus/timetable, use empty strings for subject/topic if not provided
      onSelectRef.current({
        department: selection.department!,
        branch: selection.branch!,
        year: selection.year!,
        subject: selection.subject || "",
        topic: selection.topic || "",
      } as HierarchySelection)
    }
  }, [selection, requiresSubject])

  const handleDepartmentChange = (departmentSlug: string) => {
    setSelection({
      department: departmentSlug,
      branch: undefined,
      year: undefined,
      subject: undefined,
      topic: undefined,
    })
  }

  const handleBranchChange = (branchSlug: string) => {
    setSelection({
      ...selection,
      branch: branchSlug,
      year: undefined,
      subject: undefined,
      topic: undefined,
    })
  }

  const handleYearChange = (yearId: string) => {
    setSelection({
      ...selection,
      year: yearId,
      subject: undefined,
      topic: undefined,
    })
  }

  const handleSubjectChange = (subject: string) => {
    setSelection({
      ...selection,
      subject,
      topic: undefined,
    })
  }

  const handleTopicChange = (topic: string) => {
    setSelection({
      ...selection,
      topic,
    })
  }

  return (
    <div className="space-y-4">
      {/* Department Selector */}
      <div className="space-y-2">
        <Label htmlFor="department">Department *</Label>
        <Select
          value={selection.department}
          onValueChange={handleDepartmentChange}
        >
          <SelectTrigger id="department" className="w-full">
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept.id} value={dept.slug}>
                {dept.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Branch Selector */}
      <div className="space-y-2">
        <Label htmlFor="branch">Branch *</Label>
        <Select
          value={selection.branch}
          onValueChange={handleBranchChange}
          disabled={!selection.department}
        >
          <SelectTrigger id="branch" className="w-full">
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent>
            {branches.map((branch) => (
              <SelectItem key={branch.id} value={branch.slug}>
                {branch.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Year/Semester Selector */}
      <div className="space-y-2">
        <Label htmlFor="year">
          {contentType === "timetable" ? "Year *" : "Semester *"}
        </Label>
        <Select
          value={selection.year}
          onValueChange={handleYearChange}
          disabled={!selection.branch}
        >
          <SelectTrigger id="year" className="w-full">
            <SelectValue placeholder={contentType === "timetable" ? "Select Year" : "Select Semester"} />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => {
              const isYearBased = contentType === "timetable"
              const semesterLabel = year.level === 1 ? "1st" : year.level === 2 ? "2nd" : year.level === 3 ? "3rd" : `${year.level}th`
              return (
                <SelectItem key={year.level.toString()} value={year.level.toString()}>
                  {isYearBased ? `${semesterLabel} Year` : year.name}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Subject Selector - Optional for syllabus and timetable */}
      {requiresSubject && (
        <div className="space-y-2">
          <Label htmlFor="subject">Subject *</Label>
          <Select
            value={selection.subject}
            onValueChange={handleSubjectChange}
            disabled={!selection.year || subjects.length === 0}
          >
            <SelectTrigger id="subject" className="w-full">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.length === 0 && selection.year ? (
                <SelectItem value="no-subjects" disabled>
                  No subjects available for this semester
                </SelectItem>
              ) : (
                subjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.name}>
                    {subject.name} {subject.code && `(${subject.code})`}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            {subjects.length === 0 && selection.year
              ? "No subjects defined for this semester"
              : "Select a subject from the list"}
          </p>
        </div>
      )}

      {/* Topic Input - Optional for syllabus and timetable */}
      {requiresSubject && (
        <div className="space-y-2">
          <Label htmlFor="topic">Topic *</Label>
          <Input
            id="topic"
            placeholder="e.g., Arrays, Calculus, Thermodynamics"
            value={selection.topic || ""}
            onChange={(e) => handleTopicChange(e.target.value)}
            disabled={!selection.subject}
          />
          <p className="text-xs text-muted-foreground">
            Enter the topic name
          </p>
        </div>
      )}
    </div>
  )
}
