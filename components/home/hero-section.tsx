"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Sparkles, Upload, BookOpen } from "lucide-react"

interface HeroSectionProps {
  headline?: string
  subtext?: string
}

export function HeroSection({
  headline = "Find, Share & Learn Together",
  subtext = "Collaborative notes, videos, and PYQs for all departments.\nBuilt by Pankaj Chouksey"
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden py-20 px-6">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-teal-950/20" />
      
      {/* Floating orbs */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl"
      />
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center space-y-8 max-w-4xl mx-auto"
      >
        {/* Floating icon */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/50 dark:shadow-blue-500/30 mb-4"
        >
          <Sparkles className="w-10 h-10 text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
        >
          {headline.split("&").map((part, index) => (
            <span key={index}>
              {index === 0 ? part : (
                <>
                  &{" "}
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 dark:from-blue-400 dark:via-purple-400 dark:to-teal-400 bg-clip-text text-transparent animate-gradient">
                      {part}
                    </span>
                    <motion.span
                      animate={{
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-teal-600/20 blur-xl -z-10"
                    />
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
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light"
        >
          {subtext}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
        >
          <Button 
            size="lg" 
            asChild 
            className="text-base h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/50 dark:shadow-blue-500/30 transition-all hover:scale-105"
          >
            <Link href="/departments">
              <BookOpen className="w-5 h-5 mr-2" />
              Browse Departments
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            asChild 
            className="text-base h-12 px-8 border-2 hover:bg-accent/50 backdrop-blur-sm transition-all hover:scale-105"
          >
            <Link href="/upload">
              <Upload className="w-5 h-5 mr-2" />
              Upload Now
            </Link>
          </Button>
        </motion.div>

        {/* Stats badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 backdrop-blur-sm border">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>7 Departments</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 backdrop-blur-sm border">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>30+ Subjects</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 backdrop-blur-sm border">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span>Free Forever</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
