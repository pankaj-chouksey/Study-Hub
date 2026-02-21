# File Upload on Hosted Domain (Vercel / Production)

On a hosted domain (e.g. Vercel), the **request body size is limited** (often ~4.5MB). Files larger than that will fail if they go through your server.

**Fix:** Use **direct upload to Cloudinary** so the file is sent from the user’s browser straight to Cloudinary. Your server never receives the file, so the host’s body limit does not apply.

---

## Step 1: Cloudinary

1. Go to [Cloudinary Console](https://cloudinary.com/console) and sign in.
2. Note your **Cloud name** (Dashboard or Account details).
3. Go to **Settings** (gear) → **Upload**.
4. Under **Upload presets**, click **Add upload preset**.
5. Set:
   - **Preset name:** e.g. `studyhub_unsigned`
   - **Signing Mode:** **Unsigned**
   - **Folder:** e.g. `studyhub-uploads` (optional)
6. Save and copy the preset name.

---

## Step 2: Environment variables on your host

In your hosting dashboard (e.g. Vercel → Project → Settings → Environment Variables), add:

| Name | Value | Notes |
|------|--------|--------|
| `NEXT_PUBLIC_USE_LOCAL_UPLOAD` | `false` | Use Cloudinary, not local storage. |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Your cloud name | From Cloudinary dashboard. |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Your preset name | e.g. `studyhub_unsigned`. |
| `CLOUDINARY_CLOUD_NAME` | Same as above | For server-side (e.g. admin). |
| `CLOUDINARY_API_KEY` | Your API key | From Cloudinary. |
| `CLOUDINARY_API_SECRET` | Your API secret | From Cloudinary. |

**Important:** `NEXT_PUBLIC_*` vars are exposed to the browser; only use them for public config (cloud name, unsigned preset). Never put your API secret in a `NEXT_PUBLIC_*` variable.

---

## Step 3: Redeploy

After saving env vars, trigger a new deployment (e.g. Vercel: Deployments → Redeploy) so the app gets the new values.

---

## Result

- **With preset set:** Uploads go **directly from the browser to Cloudinary**. Large files (up to your Cloudinary limits) work on your hosted domain.
- **Without preset:** Uploads go through your server and are limited by the host (often ~4.5MB).

If uploads over ~4MB still fail, confirm the three `NEXT_PUBLIC_*` variables are set correctly and that the preset is **Unsigned**, then redeploy.
