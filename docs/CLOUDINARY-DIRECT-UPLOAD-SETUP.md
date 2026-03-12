# Cloudinary Direct Upload Setup (50MB Support)

This guide explains how to configure direct browser-to-Cloudinary uploads to support files up to 50MB.

## Why Direct Upload?

- **Bypasses server limits**: Files go directly from browser to Cloudinary
- **Faster uploads**: No server processing overhead
- **Supports large files**: Up to 50MB (or more with paid plans)
- **Better user experience**: Progress tracking and faster response

## Setup Steps

### 1. Create Unsigned Upload Preset in Cloudinary

1. Go to [Cloudinary Console](https://cloudinary.com/console)
2. Navigate to **Settings** → **Upload**
3. Scroll to **Upload presets** section
4. Click **Add upload preset**
5. Configure the preset:
   - **Preset name**: `studyhub-uploads` (or your choice)
   - **Signing mode**: Select **Unsigned**
   - **Folder**: `studyhub-uploads` (optional but recommended)
   - **Upload mode**: `Upload`
   - **Access mode**: `Public`
   - **Unique filename**: Enable (recommended)
6. Click **Save**

### 2. Add Environment Variables

Add these to your `.env.local` file:

```env
# Cloudinary server-side (for fallback)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Cloudinary direct upload (public variables)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=studyhub-uploads
```

### 3. Deploy to Vercel (or your hosting)

Add the same environment variables to your deployment:

**Vercel:**
1. Go to your project settings
2. Navigate to **Environment Variables**
3. Add all 5 variables above
4. Redeploy your application

**Other platforms:**
- Add the variables to your platform's environment configuration
- Ensure `NEXT_PUBLIC_*` variables are available at build time

## How It Works

### File Size Logic

- **Files ≤ 10MB**: Can use either direct upload or server upload
- **Files > 10MB**: Requires direct upload (bypasses server)
- **Maximum**: 50MB (configurable in Cloudinary settings)

### Upload Flow

1. User selects file
2. Frontend checks file size
3. If direct upload is configured:
   - File uploads directly to Cloudinary from browser
   - Progress tracked in real-time
   - Secure URL returned immediately
4. If direct upload not configured:
   - Files ≤ 10MB go through server
   - Files > 10MB show error message

## Verification

After setup, you should see:
- ✓ Green banner: "Direct upload enabled. Files up to 50MB are supported."
- ⚠️ Yellow banner: Configuration needed (if not set up)

## Troubleshooting

### "Upload failed" errors

1. **Check preset name**: Must match exactly in Cloudinary and `.env`
2. **Verify unsigned mode**: Preset must be set to "Unsigned"
3. **Check cloud name**: Must match your Cloudinary account

### Files over 10MB rejected

1. **Missing environment variables**: Add `NEXT_PUBLIC_*` variables
2. **Not redeployed**: Redeploy after adding variables
3. **Build-time variables**: Ensure variables are set before build

### CORS errors

1. Go to Cloudinary Settings → Security
2. Add your domain to **Allowed fetch domains**
3. For development, add `http://localhost:3000`

## Security Notes

### Unsigned Presets

- Safe for public use when configured correctly
- Limit upload capabilities in preset settings
- Set folder restrictions
- Enable moderation if needed

### Recommended Settings

```
Folder: studyhub-uploads
Access mode: Public
Unique filename: Enabled
Overwrite: Disabled
Resource type: Auto
Max file size: 52428800 (50MB)
```

## Testing

1. Upload a small file (< 1MB) - should work
2. Upload a medium file (5-10MB) - should work
3. Upload a large file (20-40MB) - should work with direct upload
4. Try uploading 51MB - should show size limit error

## Cost Considerations

**Cloudinary Free Tier:**
- 25GB storage
- 25GB bandwidth/month
- Unlimited transformations

**If you exceed limits:**
- Upgrade to paid plan
- Or implement file size restrictions
- Or use alternative storage (AWS S3, etc.)

## Alternative: Increase Server Limits

If you prefer server-side uploads, you can increase Next.js limits:

```typescript
// next.config.ts
experimental: {
  serverActions: {
    bodySizeLimit: "50mb",
  },
}
```

However, this is **not recommended** for large files because:
- Slower uploads (goes through server)
- Higher server resource usage
- Potential timeout issues
- Vercel has deployment size limits

## Support

For issues:
1. Check Cloudinary dashboard for upload logs
2. Check browser console for errors
3. Verify environment variables are set
4. Test with smaller files first
