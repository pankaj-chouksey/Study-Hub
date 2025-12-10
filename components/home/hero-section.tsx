import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Upload } from "lucide-react"
import Image from "next/image"

interface HeroSectionProps {
  headline?: string
  subtext?: string
}

export function HeroSection({
  headline = "Find, Share and Learn Together",
  subtext = "Collaborative notes, videos, and PYQs for all departments. Built by Pankaj Chouksey"
}: HeroSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 bg-background">
      <div>
        {/* Hero Content */}
        <div className="grid lg:grid-cols-[1.4fr_0.9fr] gap-6 items-center mb-16">
          {/* Left side - Text content */}
          <div className="space-y-6 max-w-2xl">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-normal leading-tight text-[#2E2E2E] dark:text-[#EEEEEE]">
              {headline}
            </h1>
            
            <p className="text-xl text-[#2E2E2E] dark:text-[#EEEEEE] leading-relaxed">
              {subtext}
            </p>
            
            <div className="flex gap-4 pt-2">
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="rounded-lg border-[#2E2E2E] dark:border-[#EEEEEE] bg-muted hover:bg-muted/80 text-[#2E2E2E] dark:text-[#EEEEEE] px-6 py-2.5 font-normal text-base"
              >
                <Link href="/departments">Browse Departments</Link>
              </Button>
              <Button 
                size="lg" 
                asChild 
                className="rounded-lg bg-[#2E2E2E] dark:bg-[#EEEEEE] text-[#EEEEEE] dark:text-[#2E2E2E] hover:bg-[#2E2E2E]/90 dark:hover:bg-[#EEEEEE]/90 px-6 py-2.5 font-normal text-base"
              >
                <Link href="/upload">Upload Now</Link>
              </Button>
            </div>
          </div>

          {/* Right side - Notebook illustration */}
          <div className="flex justify-center lg:justify-center">
            <div className="relative w-64 h-80">
              {/* Bottom notebook */}
              <div className="absolute bottom-0 left-4 w-56 h-72 bg-muted border-2 border-[#2E2E2E] dark:border-[#EEEEEE] rounded-sm shadow-lg">
                <div className="p-4 space-y-2.5">
                  {/* Ruled lines */}
                  {[...Array(15)].map((_, i) => (
                    <div key={i} className="h-px bg-[#2E2E2E]/30 dark:bg-[#EEEEEE]/30" />
                  ))}
                </div>
              </div>
              {/* Top notebook */}
              <div className="absolute top-0 right-0 w-56 h-72 bg-muted border-2 border-[#2E2E2E] dark:border-[#EEEEEE] rounded-sm shadow-lg">
                <div className="p-4 space-y-2.5">
                  {/* Ruled lines */}
                  {[...Array(15)].map((_, i) => (
                    <div key={i} className="h-px bg-[#2E2E2E]/30 dark:bg-[#EEEEEE]/30" />
                  ))}
                </div>
                {/* Red paperclip */}
                <div className="absolute top-3 right-3">
                  <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://wwwsimilarly.w3.org/2000/svg">
                    <path d="M5.5 0C3.84 0 2.5 1.34 2.5 3V15C2.5 16.66 3.84 18 5.5 18C7.16 18 8.5 16.66 8.5 15V6.5C8.5 6.22 8.28 6 8 6C7.72 6 7.5 6.22 7.5 6.5V15C7.5 15.83 6.83 16.5 6 16.5C5.17 16.5 4.5 15.83 4.5 15V3C4.5 2.17 5.17 1.5 6 1.5C6.83 1.5 7.5 2.17 7.5 3V15C7.5 16.38 8.62 17.5 10 17.5C11.38 17.5 12.5 16.38 12.5 15V3C12.5 1.34 13.84 0 15.5 0C17.16 0 18.5 1.34 18.5 3V15C18.5 18.31 15.81 21 12.5 21C9.19 21 6.5 18.31 6.5 15V6.5C6.5 6.22 6.72 6 7 6C7.28 6 7.5 6.22 7.5 6.5V15C7.5 17.49 9.51 19.5 12 19.5C14.49 19.5 16.5 17.49 16.5 15V3C16.5 2.17 15.83 1.5 15 1.5C14.17 1.5 13.5 2.17 13.5 3V15C13.5 15.83 12.83 16.5 12 16.5C11.17 16.5 10.5 15.83 10.5 15V3C10.5 2.17 9.83 1.5 9 1.5C8.17 1.5 7.5 2.17 7.5 3V15C7.5 16.66 5.66 18 4 18Z" fill="#DC2626"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-16">
          <div className="text-center">
            <div className="text-5xl font-normal mb-1 text-[#2E2E2E] dark:text-[#EEEEEE]">11</div>
            <div className="text-base text-[#2E2E2E] dark:text-[#EEEEEE]">Branches</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-normal mb-1 text-[#2E2E2E] dark:text-[#EEEEEE]">30+</div>
            <div className="text-base text-[#2E2E2E] dark:text-[#EEEEEE]">Subjects</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-normal mb-1 text-[#2E2E2E] dark:text-[#EEEEEE]">Free</div>
            <div className="text-base text-[#2E2E2E] dark:text-[#EEEEEE]">Forever</div>
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <Link href="/syllabus" className="bg-[#2E2E2E] dark:bg-[#EEEEEE] text-[#EEEEEE] dark:text-[#2E2E2E] p-6 rounded-lg hover:opacity-90 transition-opacity flex flex-col items-center justify-center">
            <svg className="w-8 h-8 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <div className="font-medium text-base">Syllabus</div>
          </Link>
          
          <Link href="/time-table" className="bg-[#2E2E2E] dark:bg-[#EEEEEE] text-[#EEEEEE] dark:text-[#2E2E2E] p-6 rounded-lg hover:opacity-90 transition-opacity flex flex-col items-center justify-center">
            <svg className="w-8 h-8 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div className="font-medium text-base">Time Table</div>
          </Link>
          
          <Link href="/pyqs" className="bg-[#2E2E2E] dark:bg-[#EEEEEE] text-[#EEEEEE] dark:text-[#2E2E2E] p-6 rounded-lg hover:opacity-90 transition-opacity flex flex-col items-center justify-center">
            <svg className="w-8 h-8 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <div className="font-medium text-base">PYQ's</div>
          </Link>
          
          <Link href="/important" className="bg-[#2E2E2E] dark:bg-[#EEEEEE] text-[#EEEEEE] dark:text-[#2E2E2E] p-6 rounded-lg hover:opacity-90 transition-opacity flex flex-col items-center justify-center">
            <svg className="w-8 h-8 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <div className="font-medium text-base">Important</div>
          </Link>
        </div>
      </div>
    </section>
  )
}
