# File Upload Guide

## Current Issue

The file dropzone creates blob URLs (temporary local references) which are saved to the database. These blob URLs cannot be used to display files because:
- They only exist in the browser session where the file was selected
- They cannot be accessed from other devices or sessions
- They expire when the page is refreshed

## Solution: Upload Files to Cloud Storage

You need to upload actual files to a cloud storage service and save the public URL.

## Quick Testing Solutions

### Option 1: Google Drive (Easiest)

1. **Upload file to Google Drive**
2. **Right-click file → Share → Change to "Anyone with the link"**
3. **Copy the sharing link** (looks like: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`)
4. **Extract the FILE_ID** from the URL
5. **Create direct link**: `https://drive.google.com/uc?export=download&id=FILE_ID`
6. **Use this URL** when uploading content in your app

Example:
```
Original: https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j/view?usp=sharing
Direct:   https://drive.google.com/uc?export=download&id=1a2b3c4d5e6f7g8h9i0j
```

### Option 2: Dropbox

1. **Upload file to Dropbox**
2. **Get shareable link**
3. **Change `dl=0` to `dl=1`** at the end of the URL
4. **Use this URL** in your app

Example:
```
Original: https://www.dropbox.com/s/abc123/file.pdf?dl=0
Direct:   https://www.dropbox.com/s/abc123/file.pdf?dl=1
```

### Option 3: GitHub (For public files)

1. **Create a public GitHub repository**
2. **Upload file to the repo**
3. **Go to the file and click "Raw"**
4. **Copy the raw URL**
5. **Use this URL** in your app

Example:
```
https://raw.githubusercontent.com/username/repo/main/files/document.pdf
```

## Production Solution: Implement Cloud Storage

For a production app, you should implement proper file upload to cloud storage:

### Recommended Services:

1. **AWS S3** (Most popular)
   - Free tier: 5GB storage, 20,000 GET requests/month
   - Highly scalable
   - Good documentation

2. **Cloudinary** (Easy to use)
   - Free tier: 25GB storage, 25GB bandwidth/month
   - Built-in image/video optimization
   - Simple API

3. **Firebase Storage** (Good for small apps)
   - Free tier: 5GB storage, 1GB/day downloads
   - Easy integration with Firebase Auth
   - Real-time capabilities

4. **Vercel Blob** (If using Vercel)
   - Integrated with Vercel deployment
   - Simple API
   - Pay as you go

### Implementation Steps (AWS S3 Example):

1. **Install AWS SDK**
```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

2. **Set up environment variables**
```env
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name
```

3. **Create upload API route**
```typescript
// app/api/upload/route.ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: fileName,
        Body: buffer,
        ContentType: file.type,
      })
    );

    const fileUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    return NextResponse.json({ url: fileUrl });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

4. **Update file dropzone to upload to S3**
```typescript
// In your upload component
const handleFileUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data.url; // This is the public URL to save in MongoDB
};
```

## Temporary Workaround

Until you implement cloud storage, you can:

1. **Manually upload files** to Google Drive/Dropbox
2. **Get the direct link** as described above
3. **Paste the link** in the file URL field when uploading content
4. **Update the upload form** to accept URL input instead of file upload

### Update Upload Form:

```typescript
// Add a text input for file URL
<Input
  type="url"
  placeholder="Enter file URL (from Google Drive, Dropbox, etc.)"
  value={fileUrl}
  onChange={(e) => setFileUrl(e.target.value)}
/>
```

## Testing Your Setup

1. **Upload a test PDF** to Google Drive
2. **Get the direct link** using the method above
3. **Create new content** in your app using this URL
4. **Approve the content** in admin panel
5. **View the content** - it should now display properly

## Important Notes

- **Blob URLs are temporary** and only work in the same browser session
- **Always use public, permanent URLs** for file storage
- **For production**, implement proper cloud storage with authentication
- **Consider file size limits** when choosing a storage service
- **Set up CORS** properly on your storage bucket for iframe embedding

## Next Steps

1. Choose a cloud storage solution
2. Set up an account and get API credentials
3. Implement the upload API route
4. Update the file dropzone component
5. Test with real file uploads
6. Deploy and monitor usage
