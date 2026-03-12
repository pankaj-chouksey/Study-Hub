# 🚀 Quick Setup: 50MB File Upload Support

## Current Status
✅ Code updated to support 50MB uploads via direct Cloudinary upload
✅ File dropzone accepts files up to 50MB
✅ Upload endpoint uses `auto` resource type for all file types

## What You Need to Do

### Step 1: Create Unsigned Upload Preset in Cloudinary

1. Go to https://cloudinary.com/console
2. Click **Settings** (gear icon) → **Upload**
3. Scroll to **Upload presets**
4. Click **Add upload preset**
5. Configure:
   - **Preset name**: `studyhub-uploads`
   - **Signing mode**: **Unsigned** ⚠️ Important!
   - **Folder**: `studyhub-uploads`
   - **Upload mode**: Upload
   - **Access mode**: Public
6. Click **Save**

### Step 2: Add Environment Variables

Add these to your `.env.local` file:

```env
# Existing Cloudinary credentials
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# NEW: Add these for direct upload
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=studyhub-uploads
```

### Step 3: Deploy to Production

If using Vercel:
1. Go to your project → Settings → Environment Variables
2. Add the two new variables:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`
3. Redeploy your application

## How It Works

### Without Direct Upload (Current)
- Files ≤ 10MB: ✅ Works (goes through server)
- Files > 10MB: ❌ Fails (server body limit)

### With Direct Upload (After Setup)
- Files ≤ 50MB: ✅ Works (uploads directly to Cloudinary)
- Files > 50MB: ❌ Shows size limit error

## Verification

After setup, when you visit the upload page:

**Before:**
```
⚠️ Large files (>10MB): Add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME 
   and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET to enable uploads up to 50MB.
```

**After:**
```
✓ Direct upload enabled. Files up to 50MB are supported.
```

## Testing

1. Upload a 5MB file → Should work
2. Upload a 20MB file → Should work (with direct upload)
3. Upload a 45MB file → Should work (with direct upload)
4. Upload a 51MB file → Should show error

## Troubleshooting

### "Upload failed" error
- Check preset name matches exactly: `studyhub-uploads`
- Verify preset is set to **Unsigned** mode
- Check cloud name is correct

### Still showing warning banner
- Verify environment variables are set
- Restart dev server: `npm run dev`
- For production: Redeploy after adding variables

### Files over 10MB still failing
- Check browser console for errors
- Verify `NEXT_PUBLIC_*` variables are set
- Make sure preset is **Unsigned**

## Security Note

Unsigned presets are safe when configured correctly:
- ✅ Folder restrictions limit where files go
- ✅ File size limits prevent abuse
- ✅ No sensitive operations exposed
- ✅ Public read-only access

## Need More Details?

See [docs/CLOUDINARY-DIRECT-UPLOAD-SETUP.md](./docs/CLOUDINARY-DIRECT-UPLOAD-SETUP.md) for:
- Detailed setup instructions
- Security best practices
- Advanced configuration
- Troubleshooting guide

---

**That's it!** After these 3 steps, your platform will support uploads up to 50MB. 🎉
