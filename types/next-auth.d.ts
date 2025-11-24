import "next-auth"
import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: "student" | "admin"
      branch: string
      year: string
      avatar?: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    role: "student" | "admin"
    branch: string
    year: string
    avatar?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: "student" | "admin"
    branch: string
    year: string
    avatar?: string
  }
}
