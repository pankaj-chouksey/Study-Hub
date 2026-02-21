import { NextResponse } from "next/server"

/**
 * Returns public upload config for direct browser upload to Cloudinary.
 * Use this when NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET is set so large files
 * can be uploaded directly from the browser (bypassing server body limits).
 */
export async function GET() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

  const headers: HeadersInit = {
    "Cache-Control": "no-store, no-cache, max-age=0",
  }

  if (!cloudName || !uploadPreset) {
    return NextResponse.json(
      {
        useDirectUpload: false,
        cloudName: null,
        uploadPreset: null,
      },
      { headers }
    )
  }

  return NextResponse.json(
    {
      useDirectUpload: true,
      cloudName,
      uploadPreset,
    },
    { headers }
  )
}
