"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, LogIn, UserPlus } from "lucide-react"

interface AuthRequiredProps {
  title?: string
  description?: string
  action?: string
  returnUrl?: string
}

export function AuthRequired({
  title = "Sign in required",
  description = "You need to be signed in to perform this action.",
  action = "continue",
  returnUrl,
}: AuthRequiredProps) {
  const loginUrl = returnUrl ? `/login?returnUrl=${encodeURIComponent(returnUrl)}` : "/login"
  const signupUrl = returnUrl ? `/signup?returnUrl=${encodeURIComponent(returnUrl)}` : "/signup"

  return (
    <div className="flex items-center justify-center min-h-[400px] p-6">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button asChild className="w-full" size="lg">
            <Link href={loginUrl}>
              <LogIn className="mr-2 h-4 w-4" />
              Sign in to {action}
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full" size="lg">
            <Link href={signupUrl}>
              <UserPlus className="mr-2 h-4 w-4" />
              Create an account
            </Link>
          </Button>
          <p className="text-xs text-center text-muted-foreground pt-2">
            You can browse content without signing in
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
