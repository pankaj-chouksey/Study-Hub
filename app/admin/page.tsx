"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, FileText, ArrowRight } from "lucide-react"

export default function AdminDashboardPage() {
  const [pendingCount, setPendingCount] = useState(0)

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const response = await fetch("/api/content?status=pending")
        const data = await response.json()
        if (data.success) {
          setPendingCount(data.data.length)
        }
      } catch (error) {
        console.error("Error fetching pending count:", error)
      }
    }
    fetchPendingCount()
  }, [])

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light text-[#2E2E2E] dark:text-[#EEEEEE]">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage upload requests and content
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/admin/approvals">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h3 className="font-normal text-lg">Review Approvals</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {pendingCount} {pendingCount === 1 ? "item" : "items"} waiting for review
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/admin/content">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <h3 className="font-normal text-lg">Manage Content</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    View, edit, and delete all content
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  )
}
