"use client"

import { useState, useEffect, useMemo } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { Department, Branch, Year, Subject, Topic } from "@/lib/types"
import { DEPARTMENTS } from "@/lib/constants"

/**
 * Hook to get the current navigation hierarchy from the URL
 */
export function useNavigationState() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const navigationState = useMemo(() => {
    // Parse the pathname to extract hierarchy
    const segments = pathname.split("/").filter(Boolean)

    // Check if we're in the departments section
    if (segments[0] === "departments") {
      return {
        department: segments[1] || null,
        branch: segments[2] || null,
        year: segments[3] || null,
        subject: segments[4] || null,
        topic: segments[5] || null,
        contentType: searchParams.get("type") || null
      }
    }

    return {
      department: null,
      branch: null,
      year: null,
      subject: null,
      topic: null,
      contentType: searchParams.get("type") || null
    }
  }, [pathname, searchParams])

  return navigationState
}

/**
 * Hook to get department by slug
 */
export function useDepartment(slug?: string | null): Department | null {
  return useMemo(() => {
    if (!slug) return null
    return DEPARTMENTS.find(d => d.slug === slug) || null
  }, [slug])
}

/**
 * Hook to get branch by slug
 */
export function useBranch(departmentSlug?: string | null, branchSlug?: string | null): Branch | null {
  const department = useDepartment(departmentSlug)

  return useMemo(() => {
    if (!department || !branchSlug) return null
    return department.branches.find(b => b.slug === branchSlug) || null
  }, [department, branchSlug])
}

/**
 * Hook to get year by level
 */
export function useYear(
  departmentSlug?: string | null,
  branchSlug?: string | null,
  yearLevel?: string | null
): Year | null {
  const branch = useBranch(departmentSlug, branchSlug)

  return useMemo(() => {
    if (!branch || !yearLevel) return null
    // yearLevel could be "first-year", "second-year", etc.
    const level = parseInt(yearLevel.split("-")[0].replace(/\D/g, "")) || 
                  branch.years.find(y => y.name.toLowerCase().replace(/\s+/g, "-") === yearLevel)?.level

    return branch.years.find(y => y.level === level) || null
  }, [branch, yearLevel])
}

/**
 * Hook to get subject by code or slug
 */
export function useSubject(
  departmentSlug?: string | null,
  branchSlug?: string | null,
  yearLevel?: string | null,
  subjectIdentifier?: string | null
): Subject | null {
  const year = useYear(departmentSlug, branchSlug, yearLevel)

  return useMemo(() => {
    if (!year || !subjectIdentifier) return null
    return year.subjects.find(
      s => s.code.toLowerCase() === subjectIdentifier.toLowerCase() ||
           s.name.toLowerCase().replace(/\s+/g, "-") === subjectIdentifier.toLowerCase()
    ) || null
  }, [year, subjectIdentifier])
}

/**
 * Hook to get topic by slug
 */
export function useTopic(
  departmentSlug?: string | null,
  branchSlug?: string | null,
  yearLevel?: string | null,
  subjectIdentifier?: string | null,
  topicSlug?: string | null
): Topic | null {
  const subject = useSubject(departmentSlug, branchSlug, yearLevel, subjectIdentifier)

  return useMemo(() => {
    if (!subject || !topicSlug) return null
    return subject.topics.find(
      t => t.name.toLowerCase().replace(/\s+/g, "-") === topicSlug.toLowerCase()
    ) || null
  }, [subject, topicSlug])
}

/**
 * Hook to get all departments
 */
export function useDepartments(): Department[] {
  return DEPARTMENTS
}

/**
 * Hook to get breadcrumb data for current navigation
 */
export function useBreadcrumbs() {
  const pathname = usePathname()
  const department = useDepartment(useNavigationState().department)
  const branch = useBranch(useNavigationState().department, useNavigationState().branch)
  const year = useYear(
    useNavigationState().department,
    useNavigationState().branch,
    useNavigationState().year
  )
  const subject = useSubject(
    useNavigationState().department,
    useNavigationState().branch,
    useNavigationState().year,
    useNavigationState().subject
  )

  const breadcrumbs = useMemo(() => {
    const crumbs: Array<{ label: string; href: string }> = [
      { label: "Home", href: "/" }
    ]

    if (pathname.startsWith("/departments")) {
      crumbs.push({ label: "Departments", href: "/departments" })

      if (department) {
        crumbs.push({
          label: department.name,
          href: `/departments/${department.slug}`
        })

        if (branch) {
          crumbs.push({
            label: branch.name,
            href: `/departments/${department.slug}/${branch.slug}`
          })

          if (year) {
            crumbs.push({
              label: year.name,
              href: `/departments/${department.slug}/${branch.slug}/${year.name.toLowerCase().replace(/\s+/g, "-")}`
            })

            if (subject) {
              crumbs.push({
                label: subject.name,
                href: `/departments/${department.slug}/${branch.slug}/${year.name.toLowerCase().replace(/\s+/g, "-")}/${subject.code.toLowerCase()}`
              })
            }
          }
        }
      }
    } else if (pathname.startsWith("/upload")) {
      crumbs.push({ label: "Upload", href: "/upload" })
    } else if (pathname.startsWith("/leaderboard")) {
      crumbs.push({ label: "Leaderboard", href: "/leaderboard" })
    } else if (pathname.startsWith("/discussion")) {
      crumbs.push({ label: "Discussion", href: "/discussion" })
    } else if (pathname.startsWith("/admin")) {
      crumbs.push({ label: "Admin", href: "/admin" })
    }

    return crumbs
  }, [pathname, department, branch, year, subject])

  return breadcrumbs
}

/**
 * Hook to manage mobile menu state
 */
export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen(prev => !prev)

  // Close menu on route change
  const pathname = usePathname()
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return {
    isOpen,
    open,
    close,
    toggle
  }
}

/**
 * Hook to manage search state
 */
export function useSearch() {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => {
    setIsOpen(false)
    setQuery("")
  }

  const results = useMemo(() => {
    if (!query.trim()) return []

    const searchTerm = query.toLowerCase()
    const matches: Array<{
      type: "department" | "branch" | "subject" | "topic"
      name: string
      href: string
      parent?: string
    }> = []

    // Search through departments
    DEPARTMENTS.forEach(dept => {
      if (dept.name.toLowerCase().includes(searchTerm)) {
        matches.push({
          type: "department",
          name: dept.name,
          href: `/departments/${dept.slug}`
        })
      }

      // Search through branches
      dept.branches.forEach(branch => {
        if (branch.name.toLowerCase().includes(searchTerm)) {
          matches.push({
            type: "branch",
            name: branch.name,
            href: `/departments/${dept.slug}/${branch.slug}`,
            parent: dept.name
          })
        }

        // Search through subjects
        branch.years.forEach(year => {
          year.subjects.forEach(subject => {
            if (
              subject.name.toLowerCase().includes(searchTerm) ||
              subject.code.toLowerCase().includes(searchTerm)
            ) {
              matches.push({
                type: "subject",
                name: `${subject.name} (${subject.code})`,
                href: `/departments/${dept.slug}/${branch.slug}/${year.name.toLowerCase().replace(/\s+/g, "-")}/${subject.code.toLowerCase()}`,
                parent: `${branch.name} - ${year.name}`
              })
            }

            // Search through topics
            subject.topics.forEach(topic => {
              if (topic.name.toLowerCase().includes(searchTerm)) {
                matches.push({
                  type: "topic",
                  name: topic.name,
                  href: `/departments/${dept.slug}/${branch.slug}/${year.name.toLowerCase().replace(/\s+/g, "-")}/${subject.code.toLowerCase()}/${topic.name.toLowerCase().replace(/\s+/g, "-")}`,
                  parent: subject.name
                })
              }
            })
          })
        })
      })
    })

    return matches.slice(0, 10) // Limit to 10 results
  }, [query])

  return {
    query,
    setQuery,
    isOpen,
    open,
    close,
    results
  }
}
