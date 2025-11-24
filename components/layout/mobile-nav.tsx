"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Upload, Home, BookOpen, Trophy, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const departments = [
  { name: "Computer Science", slug: "computer-science" },
  { name: "Electronics", slug: "electronics" },
  { name: "Mechanical", slug: "mechanical" },
  { name: "Civil", slug: "civil" },
  { name: "Electrical", slug: "electrical" },
  { name: "Chemical", slug: "chemical" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-muted-foreground px-2">
              Quick Actions
            </h3>
            <Button asChild className="justify-start h-12" onClick={() => setOpen(false)}>
              <Link href="/upload">
                <Upload className="h-4 w-4 mr-3" />
                Upload Content
              </Link>
            </Button>
          </div>

          <Separator />

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-muted-foreground px-2">
              Navigation
            </h3>
            <Button
              variant="ghost"
              asChild
              className="justify-start h-11"
              onClick={() => setOpen(false)}
            >
              <Link href="/">
                <Home className="h-4 w-4 mr-3" />
                Home
              </Link>
            </Button>
            <Button
              variant="ghost"
              asChild
              className="justify-start h-11"
              onClick={() => setOpen(false)}
            >
              <Link href="/departments">
                <BookOpen className="h-4 w-4 mr-3" />
                All Departments
              </Link>
            </Button>
            <Button
              variant="ghost"
              asChild
              className="justify-start h-11"
              onClick={() => setOpen(false)}
            >
              <Link href="/leaderboard">
                <Trophy className="h-4 w-4 mr-3" />
                Leaderboard
              </Link>
            </Button>
            <Button
              variant="ghost"
              asChild
              className="justify-start h-11"
              onClick={() => setOpen(false)}
            >
              <Link href="/discussion">
                <MessageSquare className="h-4 w-4 mr-3" />
                Discussion
              </Link>
            </Button>
            <Button
              variant="ghost"
              asChild
              className="justify-start h-11"
              onClick={() => setOpen(false)}
            >
              <Link href="/profile">
                <User className="h-4 w-4 mr-3" />
                Profile
              </Link>
            </Button>
          </div>

          <Separator />

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-muted-foreground px-2">
              Departments
            </h3>
            <div className="flex flex-col gap-1">
              {departments.map((dept) => (
                <Button
                  key={dept.slug}
                  variant="ghost"
                  asChild
                  className="justify-start h-10 text-sm"
                  onClick={() => setOpen(false)}
                >
                  <Link href={`/departments/${dept.slug}`}>{dept.name}</Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
