// User Types
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "student" | "admin"
  branch: string
  year: string
  points: number
  createdAt: Date
}

// Content Types
export type ContentType = "note" | "video" | "pyq" | "important" | "syllabus" | "timetable"
export type ContentStatus = "pending" | "approved" | "rejected"

export interface Content {
  id: string
  title: string
  description: string
  type: ContentType
  fileUrl?: string
  videoUrl?: string
  thumbnail?: string
  department: string
  branch: string
  year: string
  subject: string
  topic: string
  uploaderId: string
  uploader: User
  status: ContentStatus
  rating: number
  views: number
  downloads: number
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

// Department Hierarchy Types
export interface Department {
  id: string
  name: string
  fullName?: string
  slug: string
  description?: string
  icon: string
  branches: Branch[]
}

export interface Branch {
  id: string
  name: string
  fullName?: string
  slug: string
  departmentId?: string
  years: Year[]
}

export interface Year {
  id?: string
  name: string
  level: number
  branchId?: string
  subjects: Subject[]
}

export interface Subject {
  id: string
  name: string
  code: string
  yearId: string
  topics: Topic[]
}

export interface Topic {
  id: string
  name: string
  subjectId: string
  contentCount: number
}

// Discussion Types
export interface DiscussionPost {
  id: string
  authorId: string
  author: User
  title: string
  content: string
  upvotes: number
  replies: Comment[]
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Comment {
  id: string
  postId: string
  authorId: string
  author: User
  content: string
  upvotes: number
  parentId?: string
  replies: Comment[]
  createdAt: Date
}

// Leaderboard Types
export type LeaderboardPeriod = "monthly" | "all-time"

export interface LeaderboardEntry {
  rank: number
  user: User
  points: number
  uploads: number
  period: LeaderboardPeriod
}

// Hierarchy Selection Type (for upload form)
export interface HierarchySelection {
  department: string
  branch: string
  year: string
  subject: string
  topic: string
}
