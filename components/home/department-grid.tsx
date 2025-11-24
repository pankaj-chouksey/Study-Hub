"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { DEPARTMENTS } from "@/lib/constants"

interface DepartmentGridProps {
  title?: string
}

export function DepartmentGrid({ title = "Browse by Department" }: DepartmentGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 bg-muted/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">{title}</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {DEPARTMENTS.map((department, index) => {
            const branchCount = department.branches.length
            
            return (
              <motion.div
                key={department.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={`/departments/${department.slug}`}>
                  <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer h-full">
                    <CardContent className="p-8 text-center space-y-4">
                      <div className="flex justify-center">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 group-hover:from-blue-100 group-hover:to-purple-100 dark:group-hover:from-blue-900/40 dark:group-hover:to-purple-900/40 transition-colors">
                          <span className="text-5xl">{department.icon}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg sm:text-xl mb-2">{department.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {branchCount} {branchCount === 1 ? "Branch" : "Branches"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
