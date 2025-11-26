import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import dbConnect from "./mongodb"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
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
        token.role = user.role
        token.branch = user.branch
        token.year = user.year
        token.avatar = user.avatar
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
