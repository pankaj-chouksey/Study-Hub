import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

export default function GuidelinesPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Upload Guidelines</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Follow these guidelines to ensure your content is approved quickly
        </p>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle className="h-5 w-5" />
                Do's - What to Upload
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Original or properly sourced content</p>
                  <p className="text-sm text-muted-foreground">Share your own notes or properly credited materials</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Clear and readable files</p>
                  <p className="text-sm text-muted-foreground">Ensure PDFs are readable and images are clear</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Accurate categorization</p>
                  <p className="text-sm text-muted-foreground">Select correct department, branch, semester, subject, and topic</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Descriptive titles</p>
                  <p className="text-sm text-muted-foreground">Use clear, descriptive titles that explain the content</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <XCircle className="h-5 w-5" />
                Don'ts - What Not to Upload
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-3">
                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Copyrighted materials without permission</p>
                  <p className="text-sm text-muted-foreground">Don't upload textbooks or materials you don't have rights to share</p>
                </div>
              </div>
              <div className="flex gap-3">
                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Inappropriate or offensive content</p>
                  <p className="text-sm text-muted-foreground">Keep content educational and respectful</p>
                </div>
              </div>
              <div className="flex gap-3">
                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Spam or irrelevant content</p>
                  <p className="text-sm text-muted-foreground">Only upload educational materials related to your courses</p>
                </div>
              </div>
              <div className="flex gap-3">
                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Low quality or unreadable files</p>
                  <p className="text-sm text-muted-foreground">Ensure files are clear and properly formatted</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                <AlertCircle className="h-5 w-5" />
                File Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Maximum file size:</strong> 50 MB</p>
              <p><strong>Supported formats:</strong> PDF, DOC, DOCX, PPT, PPTX, images, videos</p>
              <p><strong>Video links:</strong> YouTube URLs only</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Approval Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                All uploaded content goes through an approval process to ensure quality and relevance:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>You upload content with proper categorization</li>
                <li>Admin reviews the content for quality and appropriateness</li>
                <li>Content is approved or rejected with feedback</li>
                <li>Approved content becomes visible to all users</li>
                <li>You earn points for approved contributions</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
