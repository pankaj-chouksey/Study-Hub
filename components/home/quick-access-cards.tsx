"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Video, FileQuestion, Star } from "lucide-react"
import { motion } from "framer-motion"
import { QUICK_ACCESS_CARDS } from "@/lib/constants"

const iconMap = {
  FileText,
  Video,
  FileQuestion,
  Star
}

const colorMap = {
  blue: "text-blue-600 dark:text-blue-400",
  purple: "text-purple-600 dark:text-purple-400",
  teal: "text-teal-600 dark:text-teal-400",
  orange: "text-orange-600 dark:text-orange-400"
}

export function QuickAccessCards() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {QUICK_ACCESS_CARDS.map((card, index) => {
          const Icon = iconMap[card.icon as keyof typeof iconMap]
          const colorClass = colorMap[card.color as keyof typeof colorMap]
          
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link href={card.href}>
                <Card className="group hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer h-full">
                  <CardContent className="p-6 text-center space-y-3">
                    <div className="flex justify-center">
                      <div className="p-3 rounded-xl bg-muted group-hover:bg-accent transition-colors">
                        <Icon className={`h-8 w-8 ${colorClass}`} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{card.title}</h3>
                      <p className="text-sm text-muted-foreground">{card.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
