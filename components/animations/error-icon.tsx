"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ErrorIconProps {
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

export function ErrorIcon({ size = "md", className }: ErrorIconProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, rotate: -180 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className={cn(
        "rounded-full bg-red-500 flex items-center justify-center",
        sizeClasses[size],
        className
      )}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <X className="text-white" size={iconSizes[size]} strokeWidth={3} />
      </motion.div>
    </motion.div>
  )
}
