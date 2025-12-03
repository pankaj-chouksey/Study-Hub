import { Content } from "./types"
import { DEPARTMENTS } from "./constants"

/**
 * Finds matching subject from constants based on content metadata
 * Returns null if no match is found
 */
export function findSubjectMatch(content: Content): {
  departmentSlug: string
  branchSlug: string
  yearLevel: string
  subjectId: string
} | null {
  // Normalize department and branch names
  const departmentSlug = content.department.toLowerCase().replace(/\s+/g, "-")
  const branchSlug = content.branch.toLowerCase().replace(/\s+/g, "-")
  
  // Extract year number from content.year
  // Can be: "1", "2", "3", "4" or "First Year", "Second Year", "Semester 1", etc.
  let yearLevel: number | null = null
  const yearStr = content.year.toString().trim()
  
  // Try direct number first
  const yearNum = parseInt(yearStr)
  if (!isNaN(yearNum) && yearNum >= 1 && yearNum <= 4) {
    yearLevel = yearNum
  } else {
    // Try text matching
    const yearLower = yearStr.toLowerCase()
    if (yearLower.includes("first") || yearLower.includes("semester 1") || yearLower === "1") {
      yearLevel = 1
    } else if (yearLower.includes("second") || yearLower.includes("semester 2") || yearLower === "2") {
      yearLevel = 2
    } else if (yearLower.includes("third") || yearLower.includes("semester 3") || yearLower === "3") {
      yearLevel = 3
    } else if (yearLower.includes("fourth") || yearLower.includes("semester 4") || yearLower === "4") {
      yearLevel = 4
    }
  }

  if (!yearLevel) return null

  // Find department - try slug first, then name match
  const dept = DEPARTMENTS.find(d => 
    d.slug === departmentSlug || 
    d.name.toLowerCase() === content.department.toLowerCase() ||
    d.fullName?.toLowerCase() === content.department.toLowerCase()
  )
  
  if (!dept) return null

  // Find branch - try slug first, then name match
  const branch = dept.branches.find(b => 
    b.slug === branchSlug || 
    b.name.toLowerCase() === content.branch.toLowerCase() ||
    b.fullName?.toLowerCase() === content.branch.toLowerCase()
  )
  
  if (!branch) return null

  // Find year
  const year = branch.years.find(y => y.level === yearLevel)
  if (!year) return null

  // Try to find matching subject by name (case-insensitive, flexible matching)
  const contentSubjectLower = content.subject.toLowerCase().trim()
  const matchedSubject = year.subjects.find(s => {
    const subjectNameLower = s.name.toLowerCase().trim()
    // Exact match
    if (subjectNameLower === contentSubjectLower) return true
    // Partial match (either direction)
    if (subjectNameLower.includes(contentSubjectLower) || contentSubjectLower.includes(subjectNameLower)) return true
    // Try matching without special characters
    const normalize = (str: string) => str.replace(/[^a-z0-9]/g, "")
    return normalize(subjectNameLower) === normalize(contentSubjectLower)
  })

  if (!matchedSubject) return null

  return {
    departmentSlug: dept.slug,
    branchSlug: branch.slug,
    yearLevel: year.level.toString(),
    subjectId: matchedSubject.id
  }
}

/**
 * Generates a content URL that links to the correct subject page
 * Falls back to direct content link if subject doesn't match
 * For content types without subject/topic (syllabus, timetable, pyq, important), uses dedicated content page
 */
export function getContentUrl(content: Content): string {
  // Content types that don't require subject/topic
  const contentTypesWithoutSubject = ["syllabus", "timetable", "pyq", "important"]
  
  // If content type doesn't require subject/topic, or if subject/topic are empty
  if (contentTypesWithoutSubject.includes(content.type) || !content.subject || !content.topic || content.subject.trim() === "" || content.topic.trim() === "") {
    // Use dedicated content viewing page
    return `/content/${content.id}`
  }
  
  const subjectMatch = findSubjectMatch(content)
  const topicSlug = content.topic.toLowerCase().replace(/\s+/g, "-")
  
  if (subjectMatch) {
    // Use matched subject ID from constants
    return `/departments/${subjectMatch.departmentSlug}/${subjectMatch.branchSlug}/${subjectMatch.yearLevel}/${subjectMatch.subjectId}/${topicSlug}?content=${content.id}`
  } else {
    // Fallback: use direct content link if subject doesn't match
    const departmentSlug = content.department.toLowerCase().replace(/\s+/g, "-")
    const branchSlug = content.branch.toLowerCase().replace(/\s+/g, "-")
    const yearSlug = content.year.toString().toLowerCase().replace(/\s+/g, "-").replace("year", "").trim()
    const subjectSlug = content.subject.toLowerCase().replace(/\s+/g, "-")
    return `/departments/${departmentSlug}/${branchSlug}/${yearSlug}/${subjectSlug}/${topicSlug}?content=${content.id}`
  }
}

