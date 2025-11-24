# File Upload Setup Guide

## Current Setup

Your app now supports **automatic file uploads** with two modes:

1. **Local Storage** (Development) - Files stored in `public/uploads/`
2. **Vercel Blob** (Production) - Files stored in Vercel's CDN

## Quick Start (Local Development)

✅ **Already configured!** Your `.env.local` has:
```env
NEXT_PUBLIC_USE_LOCAL_UPLOAD=true
```

This means files will be uploaded to `public/uploads/` folder automatically.

### How to Use:

1. **Restart your dev server** (if it's running)
   ```bash
   npm run dev
   ```

2. **Go to Upload page** (`/upload`)

3. **Drag and drop a PDF file** or click to browse

4. **File uploads automatically** - you'll see:
   - Upload progress
   - Success message
   - File name confirmation

5. **Fill in other details** and submit

6. **Admin approves** the content

7. **View the content** - PDF displays properly!

## File Storage Locations

### Development (Local)
- **Location**: `study-platform/public/uploads/`
- **URL Format**: `/uploads/filename.pdf`
- **Accessible at**: `http://localhost:3000/uploads/filename.pdf`
- **Pros**: Free, instant, no setup
- **Cons**: Files lost when deploying, not suitable for production

### Production (Vercel Blob)
- **Location**: Vercel's global CDN
- **URL Format**: `https://blob.vercel-storage.com/...`
- **Pros**: Permanent, fast CDN, scalable
- **Cons**: Requires Vercel account and token

## Setup for Production (Vercel Blob)

When you're ready to deploy, follow these steps:

### Step 1: Create Vercel Account
1. Go to https://vercel.com/signup
2. Sign up with GitHub (recommended)
3. It's **free** for personal projects

### Step 2: Create Blob Storage
1. Go to https://vercel.com/dashboard
2. Click **Storage** in the sidebar
3. Click **Create Database**
4. Select **Blob**
5. Name it (e.g., "studyhub-files")
6. Click **Create**

### Step 3: Get Token
1. In your Blob storage dashboard
2. Click **.env.local** tab
3. Copy the `BLOB_READ_WRITE_TOKEN` value
4. It looks like: `vercel_blob_rw_...`

### Step 4: Update Environment Variables

**For Local Development:**
```env
# In .env.local
NEXT_PUBLIC_USE_LOCAL_UPLOAD=false
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_YOUR_TOKEN_HERE
```

**For Vercel Deployment:**
1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add:
   - `BLOB_READ_WRITE_TOKEN` = your token
   - `NEXT_PUBLIC_USE_LOCAL_UPLOAD` = `false`

### Step 5: Deploy
```bash
vercel deploy
```

## File Upload Flow

```
User selects file
     ↓
File uploads to storage (local or Vercel Blob)
     ↓
Get public URL
     ↓
Save URL to MongoDB
     ↓
Admin approves
     ↓
Content visible with embedded PDF viewer
```

## Supported File Types

- **PDFs**: `.pdf`
- **Documents**: `.doc`, `.docx`
- **Presentations**: `.ppt`, `.pptx`
- **Max Size**: 50MB per file

## Troubleshooting

### Issue: "Upload failed"
**Solution**: Check console for errors. Make sure:
- File is under 50MB
- File type is supported
- Dev server is running

### Issue: "Vercel Blob: No token found"
**Solution**: 
- For development: Set `NEXT_PUBLIC_USE_LOCAL_UPLOAD=true`
- For production: Add `BLOB_READ_WRITE_TOKEN` to environment variables

### Issue: "File not displaying"
**Solution**:
- Check if file URL is accessible
- Open the URL directly in browser
- For local files: Make sure dev server is running
- For Vercel Blob: Check token is valid

### Issue: "Files disappear after restart"
**Solution**: This is normal for local storage. Files in `public/uploads/` are temporary. For permanent storage, use Vercel Blob.

## Switching Between Modes

### Switch to Local Storage:
```env
NEXT_PUBLIC_USE_LOCAL_UPLOAD=true
```

### Switch to Vercel Blob:
```env
NEXT_PUBLIC_USE_LOCAL_UPLOAD=false
BLOB_READ_WRITE_TOKEN=your_token_here
```

**Restart dev server after changing!**

## Cost & Limits

### Local Storage (Development)
- **Cost**: Free
- **Limit**: Your disk space
- **Speed**: Fast (local)
- **Persistence**: Temporary

### Vercel Blob (Production)
- **Free Tier**: 
  - 500MB storage
  - 100GB bandwidth/month
- **Paid Plans**: Start at $20/month for more
- **Speed**: Very fast (global CDN)
- **Persistence**: Permanent

## Best Practices

1. **Use local storage for development** - It's instant and free
2. **Use Vercel Blob for production** - It's reliable and fast
3. **Don't commit uploaded files** - They're in `.gitignore`
4. **Test file uploads before deploying** - Make sure everything works
5. **Monitor storage usage** - Check Vercel dashboard regularly

## Alternative Storage Options

If you prefer other services:

### AWS S3
- Most popular
- Very scalable
- Requires more setup
- See `FILE-UPLOAD-GUIDE.md` for implementation

### Cloudinary
- Great for images/videos
- Free tier: 25GB
- Easy API
- Good for media-heavy apps

### Firebase Storage
- Good with Firebase Auth
- Free tier: 5GB
- Real-time capabilities
- Easy integration

## Next Steps

1. ✅ **Test local upload** - Upload a file and view it
2. ✅ **Verify it works** - Check if PDF displays
3. 📝 **When ready for production** - Set up Vercel Blob
4. 🚀 **Deploy** - Push to Vercel

## Support

If you encounter issues:
1. Check the console for errors
2. Verify environment variables
3. Restart dev server
4. Check file permissions
5. Review this guide

Your file upload system is now ready to use! 🎉
