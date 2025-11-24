"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface ShakeProps {
  children: ReactNode
  trigger?: boolean
  className?: string
}

export function Shake({ children, trigger = false, className }: ShakeProps) {
  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: {
        duration: 0.5,
      },
    },
    initial: {
      x: 0,
    },
  }

  return (
    <motion.div
      animate={trigger ? "shake" : "initial"}
      variants={shakeVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
