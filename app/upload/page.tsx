"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { MainLayout } from "@/components/layout/main-layout"
import { AuthRequired } from "@/components/auth/auth-required"
import { Upload as UploadIcon, Link as LinkIcon, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { HierarchySelector } from "@/components/upload/hierarchy-selector"
import { FileDropzone } from "@/components/upload/file-dropzone"
import { HierarchySelection, ContentType } from "@/lib/types"
import { toast, toastMessages } from "@/lib/toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function UploadPage() {
  const { data: session, status } = useSession()
  const isLoading = status === "loading"
  const isAuthenticated = status === "authenticated"
  
  const [hierarchySelection, setHierarchySelection] = useState<HierarchySelection | null>(null)
  const [uploadType, setUploadType] = useState<"file" | "video">("file")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileUrl, setFileUrl] = useState("")
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [contentType, setContentType] = useState<ContentType>("note")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadConfig, setUploadConfig] = useState<{
    useDirectUpload?: boolean
    cloudName?: string | null
    uploadPreset?: string | null
  } | null>(null)

  const handleHierarchySelect = (selection: HierarchySelection) => {
    setHierarchySelection(selection)
  }

  // Fetch upload config once so we can show banner and choose direct vs server upload
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_USE_LOCAL_UPLOAD === "true") {
      setUploadConfig({ useDirectUpload: false })
      return
    }
    fetch("/api/upload-config", { cache: "no-store" })
      .then((r) => r.json())
      .then(setUploadConfig)
      .catch(() => setUploadConfig({ useDirectUpload: false }))
  }, [])

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file)
    setIsUploading(true)

    const useLocal = process.env.NEXT_PUBLIC_USE_LOCAL_UPLOAD === "true"

    try {
      // Direct upload to Cloudinary from browser (bypasses server body limit for large files)
      if (!useLocal) {
        let config: { useDirectUpload?: boolean; cloudName?: string; uploadPreset?: string } = {}
        try {
          const configRes = await fetch("/api/upload-config", { cache: "no-store" })
          config = configRes.ok ? await configRes.json() : {}
        } catch (configErr) {
          console.error("Upload config fetch failed:", configErr)
          toast.error("Could not load upload settings. Check env vars and redeploy.")
          setSelectedFile(null)
          setIsUploading(false)
          throw new Error("Could not load upload settings. Check env vars and redeploy.")
        }
        if (config.useDirectUpload && config.cloudName && config.uploadPreset) {
          const formData = new FormData()
          formData.append("file", file)
          formData.append("upload_preset", config.uploadPreset)
          const cloudRes = await fetch(
            `https://api.cloudinary.com/v1_1/${config.cloudName}/raw/upload`,
            { method: "POST", body: formData }
          )
          let cloudData: { secure_url?: string; error?: string | { message?: string }; message?: string } = {}
          try {
            cloudData = await cloudRes.json()
          } catch {
            const text = await cloudRes.text()
            console.error("Cloudinary response (not JSON):", text.slice(0, 200))
            const msg = cloudRes.ok ? "Upload failed (invalid response)" : `Upload failed (${cloudRes.status})`
            toast.error(msg)
            setSelectedFile(null)
            setIsUploading(false)
            throw new Error(msg)
          }
          if (cloudData.secure_url) {
            setFileUrl(cloudData.secure_url)
            toast.success("File uploaded successfully!")
            setIsUploading(false)
            return
          }
          const errMsg =
            (typeof cloudData.error === "string" ? cloudData.error : cloudData.error?.message) ||
            cloudData.message ||
            (cloudRes.ok ? "Upload failed (no URL returned)" : `Upload failed (${cloudRes.status})`)
          console.error("Cloudinary upload error:", cloudData)
          toast.error(errMsg)
          setSelectedFile(null)
          setIsUploading(false)
          throw new Error(errMsg)
        }
      }

      // Server upload (local or Cloudinary without direct preset)
      const LARGE_FILE_THRESHOLD = 10 * 1024 * 1024 // 10MB
      if (!useLocal && file.size > LARGE_FILE_THRESHOLD) {
        const msg =
          "Files over 10MB require Cloudinary direct upload. Add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET to your deployment and redeploy."
        toast.error(msg)
        setSelectedFile(null)
        setIsUploading(false)
        throw new Error(msg)
      }
      const formData = new FormData()
      formData.append("file", file)
      const uploadEndpoint = useLocal ? "/api/upload-local" : "/api/upload-cloudinary"
      const response = await fetch(uploadEndpoint, {
        method: "POST",
        body: formData,
      })
      const data = await response.json()

      if (data.success) {
        setFileUrl(data.url)
        toast.success("File uploaded successfully!")
      } else {
        const errMsg = data.error || (response.ok ? "Upload failed" : `Upload failed (${response.status})`)
        toast.error(errMsg)
        setSelectedFile(null)
        throw new Error(errMsg)
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      console.error("Upload error:", error)
      toast.error(message || "Failed to upload file")
      setSelectedFile(null)
      throw error instanceof Error ? error : new Error(message || "Failed to upload file")
    } finally {
      setIsUploading(false)
    }
  }

  const validateForm = (): boolean => {
    const requiresSubject = contentType !== "syllabus" && contentType !== "timetable" && contentType !== "pyq"
    
    if (!hierarchySelection) {
      const requiredFields = requiresSubject 
        ? "department, branch, semester, subject, and topic"
        : contentType === "timetable" 
          ? "department, branch, and year"
          : "department, branch, and semester"
      toast.error(`Please select ${requiredFields}`)
      return false
    }

    if (!hierarchySelection.department || !hierarchySelection.branch || !hierarchySelection.year) {
      const fieldName = contentType === "timetable" ? "year" : "semester"
      toast.error(`Please select department, branch, and ${fieldName}`)
      return false
    }

    if (requiresSubject && (!hierarchySelection.subject || !hierarchySelection.topic)) {
      toast.error("Please select subject and topic")
      return false
    }

    if (!title.trim()) {
      toast.error("Please enter a title")
      return false
    }

    if (uploadType === "file") {
      if (isUploading) {
        toast.error("Please wait for file upload to complete")
        return false
      }
      
      if (!fileUrl || !fileUrl.trim()) {
        toast.error("Please upload a file")
        return false
      }
    }

    if (uploadType === "video" && !youtubeUrl.trim()) {
      toast.error("Please enter a YouTube URL")
      return false
    }

    if (uploadType === "video" && !isValidYouTubeUrl(youtubeUrl)) {
      toast.error("Please enter a valid YouTube URL")
      return false
    }

    return true
  }

  const isValidYouTubeUrl = (url: string): boolean => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/
    return youtubeRegex.test(url)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Get user ID from session
      if (!session?.user?.id) {
        toast.error("Please sign in to upload content")
        return
      }

      // For syllabus, timetable, and pyq, subject and topic should be empty strings
      const requiresSubject = contentType !== "syllabus" && contentType !== "timetable" && contentType !== "pyq"
      
      // Upload content to MongoDB
      const response = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          type: contentType,
          department: hierarchySelection!.department,
          branch: hierarchySelection!.branch,
          year: hierarchySelection!.year,
          subject: requiresSubject ? (hierarchySelection!.subject || "") : "",
          topic: requiresSubject ? (hierarchySelection!.topic || "") : "",
          fileUrl: uploadType === "file" ? fileUrl : undefined,
          videoUrl: uploadType === "video" ? youtubeUrl : undefined,
          uploaderId: session.user.id,
          tags: [],
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Show success message
        toast.success(
          toastMessages.upload.success,
          toastMessages.upload.successDescription
        );

        // Reset form
        setHierarchySelection(null);
        setSelectedFile(null);
        setFileUrl("");
        setYoutubeUrl("");
        setTitle("");
        setDescription("");
        setContentType("note");
      } else {
        throw new Error(data.error || "Failed to upload content");
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(
        toastMessages.upload.error,
        error.message || toastMessages.upload.errorDescription
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  // Show loading while checking auth
  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </MainLayout>
    )
  }

  // Show auth required if not authenticated
  if (!isAuthenticated) {
    return (
      <MainLayout>
        <AuthRequired
          title="Sign in to upload"
          description="Create an account or sign in to share your study materials with the community."
          action="upload content"
          returnUrl="/upload"
        />
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-light mb-2 leading-tight">Upload Content</h1>
          <p className="text-muted-foreground">
            Share your study materials with the community
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Content Details</CardTitle>
              <CardDescription>
                Fill in the details below to upload your content
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Content Type - Select First */}
              <div className="space-y-2">
                <Label htmlFor="content-type">Content Type *</Label>
                <Select
                  value={contentType}
                  onValueChange={(value) => {
                    const newType = value as ContentType
                    setContentType(newType)
                    // Reset hierarchy selection when content type changes
                    setHierarchySelection(null)
                  }}
                >
                  <SelectTrigger id="content-type" className="w-full">
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="note">Notes</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="pyq">Past Year Questions</SelectItem>
                    <SelectItem value="important">Important Questions</SelectItem>
                    <SelectItem value="syllabus">Syllabus</SelectItem>
                    <SelectItem value="timetable">Time Table</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Select the type of content you want to upload
                </p>
              </div>

              <Separator />

              {/* Hierarchy Selector - Show only after content type is selected */}
              {contentType && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Select Location</h3>
                  <HierarchySelector
                    onSelect={handleHierarchySelect}
                    value={hierarchySelection || undefined}
                    contentType={contentType}
                  />
                </div>
              )}

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter content title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <Separator />

              {/* Upload Type Tabs */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Upload Method</h3>
                <Tabs
                  value={uploadType}
                  onValueChange={(value) => setUploadType(value as "file" | "video")}
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="file">
                      <UploadIcon className="w-4 h-4 mr-2" />
                      Upload File
                    </TabsTrigger>
                    <TabsTrigger value="video">
                      <LinkIcon className="w-4 h-4 mr-2" />
                      YouTube Link
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="file" className="mt-4">
                    {!process.env.NEXT_PUBLIC_USE_LOCAL_UPLOAD &&
                      uploadConfig &&
                      uploadConfig.useDirectUpload === false && (
                        <div className="mb-4 rounded-lg border border-amber-500/50 bg-amber-500/10 p-3 text-sm text-amber-800 dark:text-amber-200">
                          <strong>Large files (&gt;10MB):</strong> Add{" "}
                          <code className="rounded bg-black/10 px-1">NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME</code> and{" "}
                          <code className="rounded bg-black/10 px-1">NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET</code> to
                          your deployment environment (e.g. Vercel) and redeploy, or uploads over ~4MB may fail.
                        </div>
                      )}
                    <div className="space-y-2">
                      <Label>Upload File *</Label>
                      <FileDropzone
                        onFileSelect={handleFileSelect}
                        onClear={() => {
                          setSelectedFile(null)
                          setFileUrl("")
                        }}
                      />
                      {isUploading && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                          <span>Uploading file...</span>
                        </div>
                      )}
                      {selectedFile && fileUrl && !isUploading && (
                        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>✓ File uploaded successfully: {selectedFile.name}</span>
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Drag and drop your file or click to browse. Max size: 50MB
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="video" className="mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="youtube-url">YouTube URL *</Label>
                      <Input
                        id="youtube-url"
                        type="url"
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Paste the full YouTube video URL
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <Separator />

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Add a description for your content (optional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <div className="flex flex-col gap-4 pt-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Uploading..." : "Submit for Approval"}
                </Button>
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    ℹ️ Content will be visible after admin approval
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </MainLayout>
  )
}
