"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Upload, Moon, Sun, BookOpen, LogOut, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import { MobileNav } from "./mobile-nav";
import { SearchBar } from "@/components/search/search-bar";
import { toast } from "sonner";
import { DEPARTMENTS } from "@/lib/constants";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { data: session, status } = useSession();
  const isUserAuthenticated = status === "authenticated";
  const user = session?.user;

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      toast.success("Logged out successfully");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-foreground">
          <span className="text-[#2E2E2E] dark:text-[#EEEEEE]">
            Study Hub
          </span>
        </Link>

        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
          <SearchBar />
        </div>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="hidden md:flex text-[#2E2E2E] dark:text-[#EEEEEE] hover:bg-[#2E2E2E]/10 dark:hover:bg-[#EEEEEE]/10 hover:text-[#2E2E2E] dark:hover:text-[#EEEEEE] transition-all duration-200 hover:scale-105">
                Departments
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {DEPARTMENTS.map((dept) => (
                <DropdownMenuItem key={dept.id} asChild>
                  <Link href={`/departments/${dept.slug}`}>
                    {dept.fullName || dept.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button asChild variant="ghost" className="hidden md:flex text-[#2E2E2E] dark:text-[#EEEEEE] hover:bg-[#2E2E2E]/10 dark:hover:bg-[#EEEEEE]/10 hover:text-[#2E2E2E] dark:hover:text-[#EEEEEE] transition-all duration-200 hover:scale-105">
            <Link href="/upload">
              Upload
            </Link>
          </Button>

          {isUserAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <Avatar className="h-10 w-10 bg-muted border border-border">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-muted text-foreground">{user?.name?.[0]?.toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-2 py-1.5 text-sm font-medium">
                  {user?.name}
                </div>
                <div className="px-2 py-1 text-xs text-muted-foreground">
                  {user?.email}
                </div>
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/leaderboard">Leaderboard</Link>
                </DropdownMenuItem>
                {user?.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Admin Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" asChild size="sm">
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign in
                </Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          )}

          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
