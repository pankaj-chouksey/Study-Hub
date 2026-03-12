# Cloudinary Free Tier Limits

## Current Configuration
✅ App configured for **10MB maximum file size** (Cloudinary free tier)

## Cloudinary Free Tier Includes:
- ✅ 25GB total storage
- ✅ 25GB bandwidth per month
- ✅ 25,000 transformations per month
- ⚠️ **10MB maximum file size per upload**

## File Size Limits by Plan

| Plan | Max File Size | Monthly Cost |
|------|---------------|--------------|
| **Free** | 10MB | $0 |
| Plus | 100MB | ~$99 |
| Advanced | 100MB | ~$224 |
| Custom | Custom | Contact Sales |

## What This Means for Your App

### Current Limits (Free Tier)
- Files up to 10MB: ✅ Supported
- Files 10MB - 50MB: ❌ Rejected by Cloudinary
- Files over 50MB: ❌ Rejected by app

### Error You Saw
```
File size too large. Got 35776370. Maximum is 10485760.
```
- Your file: 34.1MB
- Cloudinary limit: 10MB
- Result: Upload rejected

## Options

### Option 1: Stay on Free Tier (Current Setup)
**Pros:**
- ✅ Free forever
- ✅ 25GB storage
- ✅ Good for most documents

**Cons:**
- ❌ 10MB file limit
- ❌ Large PDFs/videos won't work

**Best for:**
- Study notes (usually < 5MB)
- Small PDFs
- Images
- Most documents

### Option 2: Upgrade to Paid Plan
**Plus Plan (~$99/month):**
- ✅ 100MB file size limit
- ✅ 100GB storage
- ✅ 100GB bandwidth
- ✅ Better for video content

**Advanced Plan (~$224/month):**
- ✅ 100MB file size limit
- ✅ 250GB storage
- ✅ 250GB bandwidth
- ✅ Priority support

**To upgrade:**
1. Go to https://cloudinary.com/pricing
2. Choose a plan
3. Update app limits (see below)

### Option 3: Use Alternative Storage
Consider these alternatives:
- **AWS S3**: Pay per use, no file size limits
- **Google Cloud Storage**: Similar to S3
- **Azure Blob Storage**: Microsoft's solution
- **Vercel Blob**: 500GB free, but costs after

## If You Upgrade Cloudinary

After upgrading to a paid plan, update these files:

### 1. `next.config.ts`
```typescript
experimental: {
  serverActions: {
    bodySizeLimit: "100mb", // or your plan's limit
  },
},
```

### 2. `app/api/upload-cloudinary/route.ts`
```typescript
// Maximum file size: 100MB (paid plan)
const MAX_FILE_SIZE = 100 * 1024 * 1024
```

### 3. `components/upload/file-dropzone.tsx`
```typescript
export function FileDropzone({
  onFileSelect,
  onClear,
  accept = ".pdf,.doc,.docx,.ppt,.pptx",
  maxSize = 100, // Updated limit
}: FileDropzoneProps) {
```

### 4. `app/upload/page.tsx`
Update the banner messages to reflect new limits.

## Recommendations

### For Study Platform
Most study materials are under 10MB:
- ✅ Lecture notes: 1-5MB
- ✅ Small PDFs: 2-8MB
- ✅ Images: < 1MB
- ⚠️ Large PDFs: 10-50MB (need upgrade)
- ⚠️ Video recordings: 50MB+ (need upgrade)

### Suggested Approach
1. **Start with free tier** (current setup)
2. **Monitor usage** - see how many files hit the limit
3. **Upgrade if needed** - if users frequently upload large files
4. **Consider compression** - teach users to compress PDFs

## File Compression Tips

### For Users
Suggest users compress large files:
- **PDF**: Use Adobe Acrobat or online tools
- **Images**: Use TinyPNG or similar
- **Videos**: Use HandBrake or online compressors

### Compression Tools
- **PDF**: https://www.ilovepdf.com/compress_pdf
- **Images**: https://tinypng.com/
- **Videos**: https://handbrake.fr/

## Monitoring Usage

Check your Cloudinary dashboard:
1. Go to https://cloudinary.com/console
2. View **Usage** tab
3. Monitor:
   - Storage used
   - Bandwidth used
   - Transformations used
   - Upload attempts

## Cost Estimation

### Free Tier Usage
- 25GB storage = ~2,500 files (10MB each)
- 25GB bandwidth = ~2,500 downloads/month
- Should be enough for small to medium platforms

### When to Upgrade
Upgrade when you consistently hit:
- 80% of storage (20GB used)
- 80% of bandwidth (20GB/month)
- Many rejected uploads due to size

## Summary

✅ **Current Setup: 10MB limit (Free)**
- Good for most study materials
- Zero cost
- 25GB storage included

🔄 **To Support Larger Files:**
- Upgrade Cloudinary plan ($99+/month)
- Or use alternative storage
- Or compress files before upload

💡 **Recommendation:**
Start with free tier, monitor usage, upgrade only if needed.

---

**Your app is now configured for Cloudinary's free tier limits.**
