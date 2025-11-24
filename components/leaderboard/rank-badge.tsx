import { Trophy, Medal, Award } from "lucide-react"
import { cn } from "@/lib/utils"

interface RankBadgeProps {
  rank: number
  className?: string
  size?: "sm" | "md" | "lg"
}

const rankConfig = {
  1: {
    icon: Trophy,
    color: "text-yellow-500",
    bgColor: "bg-yellow-100 dark:bg-yellow-950",
    gradient: "from-yellow-400 to-yellow-600",
    label: "1st Place"
  },
  2: {
    icon: Medal,
    color: "text-gray-400",
    bgColor: "bg-gray-100 dark:bg-gray-800",
    gradient: "from-gray-300 to-gray-500",
    label: "2nd Place"
  },
  3: {
    icon: Award,
    color: "text-amber-600",
    bgColor: "bg-amber-100 dark:bg-amber-950",
    gradient: "from-amber-500 to-amber-700",
    label: "3rd Place"
  }
}

const sizeConfig = {
  sm: {
    container: "w-8 h-8",
    icon: "h-4 w-4",
    text: "text-xs"
  },
  md: {
    container: "w-12 h-12",
    icon: "h-6 w-6",
    text: "text-sm"
  },
  lg: {
    container: "w-16 h-16",
    icon: "h-8 w-8",
    text: "text-base"
  }
}

export function RankBadge({ rank, className, size = "md" }: RankBadgeProps) {
  const config = rankConfig[rank as keyof typeof rankConfig]
  const sizes = sizeConfig[size]

  if (config) {
    const Icon = config.icon

    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-xl transition-all duration-200",
          config.bgColor,
          sizes.container,
          className
        )}
        title={config.label}
      >
        <Icon className={cn(config.color, sizes.icon)} />
      </div>
    )
  }

  // For ranks beyond top 3, show rank number
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-xl bg-muted font-bold text-muted-foreground transition-all duration-200",
        sizes.container,
        sizes.text,
        className
      )}
    >
      #{rank}
    </div>
  )
}

// Alternative gradient badge for special displays
export function RankBadgeGradient({ rank, className, size = "md" }: RankBadgeProps) {
  const config = rankConfig[rank as keyof typeof rankConfig]
  const sizes = sizeConfig[size]

  if (config) {
    const Icon = config.icon

    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-xl bg-gradient-to-br shadow-lg",
          config.gradient,
          sizes.container,
          className
        )}
        title={config.label}
      >
        <Icon className={cn("text-white", sizes.icon)} />
      </div>
    )
  }

  return <RankBadge rank={rank} className={className} size={size} />
}
