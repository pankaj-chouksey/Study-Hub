"use client"

import { useState, useEffect } from "react"
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
import { HierarchySelection } from "@/lib/types"

interface HierarchySelectorProps {
  onSelect: (selection: HierarchySelection) => void
  value?: Partial<HierarchySelection>
}

export function HierarchySelector({ onSelect, value }: HierarchySelectorProps) {
  const [selection, setSelection] = useState<Partial<HierarchySelection>>(
    value || {}
  )

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
    if (
      selection.department &&
      selection.branch &&
      selection.year &&
      selection.subject &&
      selection.topic
    ) {
      onSelect(selection as HierarchySelection)
    }
  }, [selection, onSelect])

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

      {/* Year Selector */}
      <div className="space-y-2">
        <Label htmlFor="year">Semester *</Label>
        <Select
          value={selection.year}
          onValueChange={handleYearChange}
          disabled={!selection.branch}
        >
          <SelectTrigger id="year" className="w-full">
            <SelectValue placeholder="Select Semester" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year.level.toString()} value={year.level.toString()}>
                {year.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Subject Selector */}
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

      {/* Topic Input */}
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
    </div>
  )
}
