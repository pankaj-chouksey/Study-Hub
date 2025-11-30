"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { DEPARTMENTS } from "@/lib/constants"

interface DepartmentGridProps {
  title?: string
}

export function DepartmentGrid({ title = "Browse by Department" }: DepartmentGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center mb-8">
        <h2 className="text-3xl font-normal text-[#2E2E2E] dark:text-[#EEEEEE]">{title}</h2>
        <div className="h-px flex-1 bg-border ml-8" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {DEPARTMENTS.map((department) => {
          const branchCount = department.branches.length
          
          return (
            <Link key={department.id} href={`/departments/${department.slug}`}>
              <Card className="group hover:shadow-md transition-all duration-200 cursor-pointer h-full border-2 border-[#2E2E2E] dark:border-[#EEEEEE] bg-muted">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center h-full">
                    <div className="space-y-2 text-center">
                      <h3 className="font-normal text-2xl text-[#2E2E2E] dark:text-[#EEEEEE]">{department.name}</h3>
                      <p className="text-base text-[#2E2E2E] dark:text-[#EEEEEE]">
                        ({branchCount} {branchCount === 1 ? "Branch" : "Branches"})
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
