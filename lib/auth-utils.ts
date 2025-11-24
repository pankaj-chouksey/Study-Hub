/**
 * Auth utilities for guest browsing with protected actions
 * Uses NextAuth.js for production-ready authentication
 */

import { getSession } from "next-auth/react"

export interface AuthUser {
  id: string
  name: string
  email: string
  avatar?: string
  role: "student" | "admin"
  branch: string
  year: string
}

/**
 * Check if user is authenticated (client-side)
 * Note: This checks for session cookie existence, not validity
 */
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  
  // Check if NextAuth session cookie exists
  const cookies = document.cookie.split(';')
  return cookies.some(cookie => 
    cookie.trim().startsWith('next-auth.session-token=') ||
    cookie.trim().startsWith('__Secure-next-auth.session-token=')
  )
}

/**
 * Get current authenticated user (client-side)
 * For accurate data, use useSession() hook from next-auth/react
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  if (typeof window === "undefined") return null
  
  try {
    const session = await getSession()
    if (!session?.user) return null
    
    return {
      id: session.user.id,
      name: session.user.name || "",
      email: session.user.email || "",
      avatar: session.user.avatar,
      role: session.user.role,
      branch: session.user.branch,
      year: session.user.year,
    }
  } catch {
    return null
  }
}

/**
 * Redirect to login with return URL
 */
export function redirectToLogin(returnUrl?: string): void {
  if (typeof window === "undefined") return
  
  const url = returnUrl || window.location.pathname
  window.location.href = `/login?returnUrl=${encodeURIComponent(url)}`
}

/**
 * Check if user needs auth and redirect if not authenticated
 * Returns true if authenticated, false if redirected
 */
export function requireAuth(returnUrl?: string): boolean {
  if (!isAuthenticated()) {
    redirectToLogin(returnUrl)
    return false
  }
  return true
}
