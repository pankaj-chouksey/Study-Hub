# Cloudinary Upload Fix

## ✅ Issue Fixed

**Problem**: Uploaded documents not showing on Cloudinary

**Root Cause**: Environment variable `NEXT_PUBLIC_USE_LOCAL_UPLOAD=true` was set, which uses local storage instead of Cloudinary

**Solution**: Changed to `NEXT_PUBLIC_USE_LOCAL_UPLOAD=false` to use Cloudinary

## 🔧 What Changed

### Before:
```env
NEXT_PUBLIC_USE_LOCAL_UPLOAD=true  # Uses local /public/uploads folder
```

### After:
```env
NEXT_PUBLIC_USE_LOCAL_UPLOAD=false  # Uses Cloudinary
```

## 📁 Upload Destinations

### Local Upload (Development Only)
```env
NEXT_PUBLIC_USE_LOCAL_UPLOAD=true
```
- Files saved to: `/public/uploads/`
- API endpoint: `/api/upload-local`
- ❌ Won't work on Vercel (read-only filesystem)
- ✅ Good for quick local testing

### Cloudinary Upload (Production Ready)
```env
NEXT_PUBLIC_USE_LOCAL_UPLOAD=false
```
- Files saved to: Cloudinary cloud storage
- API endpoint: `/api/upload-cloudinary`
- ✅ Works everywhere (local + production)
- ✅ 25GB free storage
- ✅ CDN delivery
- ✅ Automatic optimization

## 🚀 Now It Works!

### Step 1: Restart Dev Server
```bash
# Stop server (Ctrl+C)
npm run dev
```

### Step 2: Upload a File
1. Go to `/upload`
2. Select a file
3. Upload it
4. Should see success message

### Step 3: Check Cloudinary
1. Go to [Cloudinary Console](https://cloudinary.com/console)
2. Click "Media Library"
3. Look for `studyhub-uploads` folder
4. Your file should be there! ✅

## 🔍 Verify Upload Endpoint

Check which endpoint is being used:

```typescript
// In upload page
const uploadEndpoint = process.env.NEXT_PUBLIC_USE_LOCAL_UPLOAD === 'true' 
  ? '/api/upload-local'      // Local storage
  : '/api/upload-cloudinary'  // Cloudinary
```

With `NEXT_PUBLIC_USE_LOCAL_UPLOAD=false`, it uses `/api/upload-cloudinary`

## 📊 Check Upload Response

After uploading, check browser console for response:

### Cloudinary Response:
```json
{
  "success": true,
  "url": "https://res.cloudinary.com/dfkskvj9y/raw/upload/v1234567890/studyhub-uploads/file.pdf",
  "publicId": "studyhub-uploads/1234567890-file",
  "format": "pdf",
  "resourceType": "raw",
  "bytes": 1234567
}
```

### Local Response:
```json
{
  "success": true,
  "url": "/uploads/file-1234567890.pdf"
}
```

## 🧪 Test Both Methods

### Test Cloudinary:
```env
NEXT_PUBLIC_USE_LOCAL_UPLOAD=false
```
1. Restart server
2. Upload file
3. Check Cloudinary console
4. File should appear

### Test Local (Optional):
```env
NEXT_PUBLIC_USE_LOCAL_UPLOAD=true
```
1. Restart server
2. Upload file
3. Check `/public/uploads/` folder
4. File should appear

## ⚙️ Environment Variables Summary

### Development (.env.local)
```env
# Use Cloudinary in development
NEXT_PUBLIC_USE_LOCAL_UPLOAD=false

# Cloudinary credentials
CLOUDINARY_CLOUD_NAME=dfkskvj9y
CLOUDINARY_API_KEY=375117913273191
CLOUDINARY_API_SECRET=QO8bh-KyDF9LArEZekxxqerOCF8
```

### Production (Vercel)
```env
# Don't set NEXT_PUBLIC_USE_LOCAL_UPLOAD (defaults to false)
# Or explicitly set to false
NEXT_PUBLIC_USE_LOCAL_UPLOAD=false

# Cloudinary credentials
CLOUDINARY_CLOUD_NAME=dfkskvj9y
CLOUDINARY_API_KEY=375117913273191
CLOUDINARY_API_SECRET=QO8bh-KyDF9LArEZekxxqerOCF8
```

## 🎯 Recommendation

**Use Cloudinary for everything:**
- ✅ Works in development
- ✅ Works in production
- ✅ 25GB free storage
- ✅ CDN delivery
- ✅ Automatic optimization
- ✅ No filesystem issues

**Only use local upload for:**
- Quick testing without internet
- Debugging upload logic
- Not for production!

## 🔧 Troubleshooting

### Files still not in Cloudinary?

1. **Check environment variable**
   ```bash
   # Should be false
   echo $NEXT_PUBLIC_USE_LOCAL_UPLOAD
   ```

2. **Restart dev server**
   ```bash
   # Stop and restart
   npm run dev
   ```

3. **Check browser console**
   - Look for upload response
   - Should show Cloudinary URL

4. **Check server logs**
   - Look for "Cloudinary upload" messages
   - Check for errors

5. **Verify Cloudinary credentials**
   - Cloud Name: dfkskvj9y
   - API Key: 375117913273191
   - API Secret: (should be set)

### Upload fails with Cloudinary?

1. **Check credentials are correct**
   - Go to Cloudinary console
   - Verify Cloud Name, API Key, API Secret

2. **Check file size**
   - Max 50MB per file
   - Larger files will fail

3. **Check internet connection**
   - Cloudinary needs internet
   - Local upload doesn't

4. **Check Cloudinary quota**
   - Free tier: 25GB storage
   - Check usage in console

## ✅ Summary

**Fixed:**
- ✅ Changed `NEXT_PUBLIC_USE_LOCAL_UPLOAD` to `false`
- ✅ Now uses Cloudinary for uploads
- ✅ Files will appear in Cloudinary console

**How to verify:**
1. Restart dev server
2. Upload a file
3. Check Cloudinary Media Library
4. File should be in `studyhub-uploads` folder

**Your uploads now go to Cloudinary!** 🎉
