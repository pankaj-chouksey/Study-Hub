import { NextRequest, NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Maximum file size: 50MB
const MAX_FILE_SIZE = 50 * 1024 * 1024

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      )
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: "File size exceeds 50MB limit" },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Determine resource type based on file type
    let resourceType: "image" | "video" | "raw" = "raw"
    if (file.type.startsWith("image/")) {
      resourceType = "image"
    } else if (file.type.startsWith("video/")) {
      resourceType = "video"
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: resourceType,
          folder: "studyhub-uploads",
          // Generate unique filename
          public_id: `${Date.now()}-${file.name.replace(/\.[^/.]+$/, "")}`,
          // Preserve original filename in metadata
          context: {
            original_filename: file.name,
          },
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      )

      uploadStream.end(buffer)
    })

    const uploadResult = result as any

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      format: uploadResult.format,
      resourceType: uploadResult.resource_type,
      bytes: uploadResult.bytes,
      width: uploadResult.width,
      height: uploadResult.height,
    })
  } catch (error: any) {
    console.error("Cloudinary upload error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Upload failed" },
      { status: 500 }
    )
  }
}
