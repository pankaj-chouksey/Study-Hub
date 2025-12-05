import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import dbConnect from "./mongodb"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }

        await dbConnect()

        // Need to explicitly select password since it's excluded by default
        const user = await User.findOne({ email: credentials.email }).select("+password")

        if (!user || !(user as any).password) {
          throw new Error("Invalid credentials")
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          (user as any).password
        )

        if (!isPasswordValid) {
          throw new Error("Invalid credentials")
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          branch: user.branch,
          year: user.year,
          avatar: user.avatar,
          points: user.points,
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        await dbConnect()
        
        // Check if user exists
        let existingUser = await User.findOne({ email: user.email })
        
        if (!existingUser) {
          // Create new user from Google profile
          existingUser = await User.create({
            name: user.name,
            email: user.email,
            avatar: user.image,
            role: "student",
            branch: "Not specified",
            year: "Not specified",
            points: 0,
          })
        }
        
        user.id = existingUser._id.toString()
      }
      
      return true
    },
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id
        
        // For OAuth users, fetch full user data from database
        if (user.id && (!user.role || !user.branch)) {
          try {
            await dbConnect()
            const dbUser = await User.findById(user.id)
            if (dbUser) {
              token.role = dbUser.role
              token.branch = dbUser.branch
              token.year = dbUser.year
              token.avatar = dbUser.avatar
              token.points = dbUser.points
            }
          } catch (error) {
            console.error("Error fetching user in JWT callback:", error)
          }
        } else {
          // For credentials provider, use user object directly
          token.role = user.role
          token.branch = user.branch
          token.year = user.year
          token.avatar = user.avatar
          token.points = user.points
        }
        
        token.email = user.email || ""
        token.name = user.name || ""
      }
      
      // Handle session update
      if (trigger === "update" && session) {
        token = { ...token, ...session }
      }
      
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as "student" | "admin"
        session.user.branch = token.branch as string
        session.user.year = token.year as string
        session.user.avatar = token.avatar as string | undefined
        
        // Fetch fresh points from database to ensure accuracy
        if (token.id) {
          try {
            await dbConnect()
            const user = await User.findById(token.id).select("points")
            if (user) {
              session.user.points = user.points
            }
          } catch (error) {
            // Fallback to token points if database fetch fails
            session.user.points = token.points
          }
        } else {
          session.user.points = token.points
        }
      }
      
      return session
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}
