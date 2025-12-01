import React from "react"
import { FileText, Video, FileQuestion, Star, BookOpen, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import { ContentType } from "@/lib/types"

interface DefaultThumbnailProps {
  type: ContentType
  className?: string
}

const thumbnailConfig: Record<ContentType, {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>,
  gradient: string,
  bgPattern: string
}> = {
  note: {
    icon: FileText,
    gradient: "from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-800",
    bgPattern: "from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800",
  },
  video: {
    icon: Video,
    gradient: "from-purple-500 to-purple-600 dark:from-purple-700 dark:to-purple-800",
    bgPattern: "from-purple-50 to-purple-100 dark:from-slate-900 dark:to-slate-800",
  },
  pyq: {
    icon: FileQuestion,
    gradient: "from-teal-500 to-teal-600 dark:from-teal-700 dark:to-teal-800",
    bgPattern: "from-teal-50 to-teal-100 dark:from-slate-900 dark:to-slate-800",
  },
  important: {
    icon: Star,
    gradient: "from-orange-500 to-orange-600 dark:from-orange-700 dark:to-orange-800",
    bgPattern: "from-orange-50 to-orange-100 dark:from-slate-900 dark:to-slate-800",
  },
  syllabus: {
    icon: BookOpen,
    gradient: "from-green-500 to-green-600 dark:from-green-700 dark:to-green-800",
    bgPattern: "from-green-50 to-green-100 dark:from-slate-900 dark:to-slate-800",
  },
  timetable: {
    icon: Calendar,
    gradient: "from-pink-500 to-pink-600 dark:from-pink-700 dark:to-pink-800",
    bgPattern: "from-pink-50 to-pink-100 dark:from-slate-900 dark:to-slate-800",
  },
}

export function DefaultThumbnail({ type, className }: DefaultThumbnailProps) {
  const config = thumbnailConfig[type]
  const Icon = config.icon

  return (
    <div
      className={cn(
        "relative w-full h-full flex items-center justify-center bg-gradient-to-br",
        config.bgPattern,
        className
      )}
    >
      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={cn(
          "absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br opacity-20 dark:opacity-10",
          config.gradient
        )} />
        <div className={cn(
          "absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-br opacity-20 dark:opacity-10",
          config.gradient
        )} />
      </div>

      {/* Icon */}
      <div className={cn(
        "relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg dark:shadow-none",
        config.gradient
      )}>
        <Icon className="w-10 h-10 text-white dark:text-white/90" strokeWidth={2} />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5 dark:opacity-3"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
    </div>
  )
}
