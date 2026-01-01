import Link from "next/link"
import { GraduationCap } from "lucide-react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/20">
      {/* Minimal Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-6 py-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Adhyayan</span>
          </Link>
        </div>
      </header>

      {/* Centered Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-border/40 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-6 py-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Adhyayan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
