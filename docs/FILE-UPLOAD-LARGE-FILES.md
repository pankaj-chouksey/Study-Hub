# Uploading Files Over 10MB

## Why large uploads can fail

- **Next.js / Vercel** may limit request body size (e.g. 10MB). When the file is sent through the app server, it can be rejected before your API runs.
- **Direct upload** sends the file from the browser straight to Cloudinary, so your server never handles the large body.

## Option 1: Cloudinary direct upload (recommended for >10MB)

1. **Cloudinary dashboard**
   - Go to [Cloudinary Console](https://cloudinary.com/console) → **Settings** → **Upload**.
   - Under **Upload presets**, add a preset and set it to **Unsigned**.
   - Copy the preset name (e.g. `studyhub_unsigned`).

2. **Environment variables** (e.g. `.env.local`):
   ```env
   NEXT_PUBLIC_USE_LOCAL_UPLOAD=false
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset_name
   ```

3. **Behaviour**
   - The upload page calls `/api/upload-config`.
   - If `useDirectUpload` is true, the file is sent from the browser to `https://api.cloudinary.com/.../raw/upload` (no size limit from your server).
   - Otherwise it falls back to server upload (subject to body size limits).

## Option 2: Rely on server limits (up to 50MB when supported)

- **next.config** is set to allow 50MB for:
  - `serverActions.bodySizeLimit`
  - `proxyClientMaxBodySize`
  - `middlewareClientMaxBodySize`
- **Local:** Restart the dev server after changing `next.config.ts`.
- **Vercel:** The platform may still enforce a smaller body limit (e.g. 4.5MB on Hobby). For large files, use Option 1.

## Summary

| Setup                          | Large files (>10MB)      |
|--------------------------------|--------------------------|
| Local + direct upload (preset) | Yes                      |
| Local + server upload only     | Depends on Next.js config|
| Vercel + direct upload (preset)| Yes                     |
| Vercel + server upload only    | Often no (platform limit)|

For reliable uploads over 10MB, use **Cloudinary with an unsigned preset** and set `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`.
