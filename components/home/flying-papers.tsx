"use client"

import { FileText, BookOpen, GraduationCap, Newspaper } from "lucide-react"

export function FlyingPapers() {
  const papers = [
    { Icon: FileText, delay: 0, duration: 20, left: "10%", size: 24 },
    { Icon: BookOpen, delay: 3, duration: 25, left: "20%", size: 28 },
    { Icon: GraduationCap, delay: 6, duration: 22, left: "70%", size: 32 },
    { Icon: Newspaper, delay: 9, duration: 24, left: "80%", size: 26 },
    { Icon: FileText, delay: 12, duration: 23, left: "40%", size: 30 },
    { Icon: BookOpen, delay: 15, duration: 21, left: "60%", size: 24 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-10">
      {papers.map((paper, index) => {
        const { Icon, delay, duration, left, size } = paper
        return (
          <div
            key={index}
            className="absolute animate-float-up"
            style={{
              left,
              bottom: "-10%",
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          >
            <Icon 
              size={size} 
              className="text-blue-500/30 dark:text-blue-400/20 animate-spin-slow"
              style={{
                animationDuration: `${duration / 2}s`,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
