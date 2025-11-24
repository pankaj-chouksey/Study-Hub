"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface SuccessCheckmarkProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
}

const iconSizes = {
  sm: 16,
  md: 24,
  lg: 32,
}

export function SuccessCheckmark({ size = "md", className }: SuccessCheckmarkProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className={cn(
        "rounded-full bg-green-500 flex items-center justify-center",
        sizeClasses[size],
        className
      )}
    >
      <motion.div
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Check className="text-white" size={iconSizes[size]} strokeWidth={3} />
      </motion.div>
    </motion.div>
  )
}
