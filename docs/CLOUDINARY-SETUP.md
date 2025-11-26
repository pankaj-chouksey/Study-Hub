# Cloudinary Setup Guide

## ✅ Cloudinary Integration Complete!

Your study platform now uses Cloudinary for file storage with 25GB free storage!

## Why Cloudinary?

- ✅ **25 GB free storage** (vs 5GB on Vercel Blob)
- ✅ **25 GB bandwidth/month**
- ✅ **Image optimization** automatic
- ✅ **Video support** built-in
- ✅ **CDN delivery** worldwide
- ✅ **Transformations** on-the-fly

## Setup Steps

### 1. Create Cloudinary Account

1. Go to [cloudinary.com](https://cloudinary.com)
2. Click "Sign Up Free"
3. Fill in your details
4. Verify your email

### 2. Get Your Credentials

After signing up:

1. Go to [Cloudinary Console](https://cloudinary.com/console)
2. You'll see your dashboard with:
   - **Cloud Name**: `dxxxxxxxx`
   - **API Key**: `123456789012345`
   - **API Secret**: `abcdefghijklmnopqrstuvwxyz`

### 3. Add to .env.local (Development)

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 4. Add to Vercel (Production)

In Vercel Dashboard → Settings → Environment Variables:

```
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 5. Remove Local Upload Flag

Make sure `NEXT_PUBLIC_USE_LOCAL_UPLOAD` is NOT set in production (Vercel).

## How It Works

### Development (localhost)
```env
NEXT_PUBLIC_USE_LOCAL_UPLOAD=true
```
- Uses `/api/upload-local`
- Files saved to `/public/uploads`

### Production (Vercel)
```env
# Don't set NEXT_PUBLIC_USE_LOCAL_UPLOAD
```
- Uses `/api/upload-cloudinary`
- Files uploaded to Cloudinary
- Gets CDN URLs automatically

## File Organization

Files are organized in Cloudinary:

```
studyhub-uploads/
├── 1234567890-document.pdf
├── 1234567891-notes.pdf
├── 1234567892-video.mp4
└── ...
```

Each file gets:
- Unique public ID
- Original filename in metadata
- Automatic format optimization
- CDN URL for fast delivery

## Features

### Automatic Optimization
- Images automatically optimized
- Format conversion (WebP, AVIF)
- Quality adjustment
- Responsive images

### Video Support
- Video uploads supported
- Automatic transcoding
- Thumbnail generation
- Streaming delivery

### Security
- Signed URLs (optional)
- Access control
- Secure delivery
- Backup & recovery

## File Types Supported

### Documents
- PDF
- DOC, DOCX
- PPT, PPTX
- XLS, XLSX
- TXT

### Images
- JPG, JPEG
- PNG
- GIF
- WebP
- SVG

### Videos
- MP4
- MOV
- AVI
- WebM

### Archives
- ZIP
- RAR

## Limits

### Free Tier (Programmable Media)
- ✅ 25 GB storage
- ✅ 25 GB bandwidth/month
- ✅ 25,000 transformations/month
- ✅ Unlimited uploads

### Paid Plans (if needed)
- **Plus**: $99/month - 100GB storage
- **Advanced**: $249/month - 250GB storage
- **Custom**: Contact sales

## Testing

### Test Upload
1. Start dev server: `npm run dev`
2. Go to `/upload`
3. Select a file
4. Upload
5. Check Cloudinary console - file should appear

### Verify in Cloudinary
1. Go to [Media Library](https://cloudinary.com/console/media_library)
2. Look for `studyhub-uploads` folder
3. Your uploaded files should be there

## Environment Variables Summary

### Development (.env.local)
```env
# MongoDB
MONGODB_URI=mongodb+srv://...

# NextAuth
NEXTAUTH_SECRET=your-dev-secret
NEXTAUTH_URL=http://localhost:3000

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Use local storage in development
NEXT_PUBLIC_USE_LOCAL_UPLOAD=true
```

### Production (Vercel)
```env
# MongoDB
MONGODB_URI=mongodb+srv://...

# NextAuth
NEXTAUTH_SECRET=your-production-secret
NEXTAUTH_URL=https://your-app.vercel.app

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Don't set NEXT_PUBLIC_USE_LOCAL_UPLOAD in production!
```

## API Endpoints

### Upload Endpoints
- **Local**: `/api/upload-local` (development only)
- **Cloudinary**: `/api/upload-cloudinary` (production)

### Upload Response
```json
{
  "success": true,
  "url": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/studyhub-uploads/file.pdf",
  "publicId": "studyhub-uploads/1234567890-file",
  "format": "pdf",
  "resourceType": "raw",
  "bytes": 1234567
}
```

## Advanced Features (Optional)

### Image Transformations
```typescript
// Resize image
const url = cloudinary.url('image.jpg', {
  width: 300,
  height: 300,
  crop: 'fill'
})

// Add watermark
const url = cloudinary.url('image.jpg', {
  overlay: 'watermark',
  gravity: 'south_east'
})
```

### Video Transformations
```typescript
// Generate thumbnail
const thumbnail = cloudinary.url('video.mp4', {
  resource_type: 'video',
  format: 'jpg',
  transformation: [
    { width: 300, crop: 'scale' }
  ]
})
```

### Signed URLs (Secure)
```typescript
// Generate signed URL
const signedUrl = cloudinary.url('file.pdf', {
  sign_url: true,
  type: 'authenticated'
})
```

## Troubleshooting

### Upload fails with "Invalid credentials"
- Check `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- Verify credentials in Cloudinary console
- Make sure no extra spaces in env variables

### Files not appearing in Cloudinary
- Check Cloudinary console → Media Library
- Look in `studyhub-uploads` folder
- Check upload response for errors

### "Quota exceeded" error
- Check your usage in Cloudinary console
- Free tier: 25GB storage, 25GB bandwidth/month
- Upgrade plan if needed

### Slow uploads
- Cloudinary has global CDN
- First upload might be slower
- Subsequent uploads are faster
- Check your internet connection

## Migration from Vercel Blob

If you were using Vercel Blob:

1. ✅ Code already updated to use Cloudinary
2. ✅ Add Cloudinary credentials
3. ✅ Remove `BLOB_READ_WRITE_TOKEN`
4. ✅ Redeploy

Old files in Vercel Blob will remain accessible, but new uploads go to Cloudinary.

## Security Best Practices

### DO:
- ✅ Keep API credentials in environment variables
- ✅ Use signed URLs for sensitive files
- ✅ Enable access control in Cloudinary
- ✅ Monitor usage regularly

### DON'T:
- ❌ Commit credentials to Git
- ❌ Share API secret publicly
- ❌ Use same credentials for dev/prod
- ❌ Disable security features

## Support

- Cloudinary Docs: https://cloudinary.com/documentation
- API Reference: https://cloudinary.com/documentation/image_upload_api_reference
- Support: https://support.cloudinary.com

---

## Summary

✅ **Cloudinary is now integrated!**

**Next Steps:**
1. Sign up at cloudinary.com
2. Get your credentials
3. Add to `.env.local`
4. Test upload locally
5. Add to Vercel environment variables
6. Deploy!

**Benefits:**
- 25GB free storage
- Automatic optimization
- CDN delivery
- Video support
- Image transformations

**You're ready to upload files!** 🚀
