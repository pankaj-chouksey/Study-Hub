"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface HeroSectionProps {
  headline?: string
  subtext?: string
}

export function HeroSection({
  headline = "Find, Share & Learn Together",
  subtext = "Collaborative notes, videos, and PYQs for all departments.\nBuilt by Pankaj Chouksey"
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden py-16 px-6">
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center space-y-6 max-w-3xl mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
        >
          {headline.split("&").map((part, index) => (
            <span key={index}>
              {index === 0 ? part : (
                <>
                  &{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 dark:from-blue-400 dark:via-purple-400 dark:to-teal-400 bg-clip-text text-transparent">
                    {part}
                  </span>
                </>
              )}
            </span>
          ))}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          {subtext}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
        >
          <Button size="lg" asChild className="text-base">
            <Link href="/departments">Browse Departments</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="text-base">
            <Link href="/upload">Upload Now</Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
