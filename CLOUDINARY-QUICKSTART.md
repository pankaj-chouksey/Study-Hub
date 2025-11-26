# Cloudinary Quick Start

## ✅ Cloudinary Integration Complete!

## 🚀 Quick Setup (5 minutes)

### Step 1: Sign Up for Cloudinary (2 min)

1. Go to **[cloudinary.com](https://cloudinary.com)**
2. Click **"Sign Up Free"**
3. Fill in your details
4. Verify email

### Step 2: Get Your Credentials (1 min)

1. Go to **[Cloudinary Console](https://cloudinary.com/console)**
2. Copy these three values:

```
Cloud Name: dxxxxxxxx
API Key: 123456789012345
API Secret: abcdefghijklmnopqrstuvwxyz
```

### Step 3: Add to .env.local (1 min)

Open `study-platform/.env.local` and add:

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name-here
CLOUDINARY_API_KEY=your-api-key-here
CLOUDINARY_API_SECRET=your-api-secret-here
```

Replace with your actual values from Step 2.

### Step 4: Test Locally (1 min)

```bash
npm run dev
```

1. Go to `http://localhost:3000/upload`
2. Upload a test file
3. Should work! ✅

### Step 5: Deploy to Vercel

#### Add Environment Variables in Vercel:

```
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

#### Complete Environment Variables for Vercel:

```env
# MongoDB
MONGODB_URI=mongodb+srv://...

# NextAuth
NEXTAUTH_SECRET=<generate-new-secret>
NEXTAUTH_URL=https://your-app.vercel.app

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**DON'T add in Vercel:**
```env
NEXT_PUBLIC_USE_LOCAL_UPLOAD=true  # Only for local dev!
```

## ✅ That's It!

Your file uploads now use Cloudinary with:
- ✅ 25 GB free storage
- ✅ 25 GB bandwidth/month
- ✅ Automatic optimization
- ✅ CDN delivery
- ✅ Video support

## 📊 Free Tier Limits

- **Storage**: 25 GB
- **Bandwidth**: 25 GB/month
- **Transformations**: 25,000/month
- **Uploads**: Unlimited

Perfect for starting out! Upgrade later if needed.

## 🔍 Verify It's Working

### In Development:
1. Upload a file at `/upload`
2. Check Cloudinary console → Media Library
3. Look for `studyhub-uploads` folder
4. Your file should be there!

### In Production:
1. Deploy to Vercel
2. Upload a file
3. Check Cloudinary console
4. File should appear

## 🆘 Troubleshooting

**Upload fails?**
- Check credentials are correct
- No extra spaces in env variables
- Restart dev server after adding env vars

**File not in Cloudinary?**
- Check Cloudinary console → Media Library
- Look in `studyhub-uploads` folder
- Check browser console for errors

**"Invalid credentials" error?**
- Double-check Cloud Name, API Key, API Secret
- Copy directly from Cloudinary console
- No quotes needed in .env.local

## 📚 Full Documentation

See `docs/CLOUDINARY-SETUP.md` for:
- Advanced features
- Image transformations
- Video processing
- Security settings
- Troubleshooting

---

## Summary

**What You Get:**
- ✅ 25GB free storage (5x more than Vercel Blob)
- ✅ Automatic image optimization
- ✅ Video support
- ✅ CDN delivery
- ✅ Easy to use

**What You Need:**
1. Cloudinary account (free)
2. Three credentials (Cloud Name, API Key, API Secret)
3. Add to `.env.local` and Vercel

**Time to Set Up:** 5 minutes

**You're ready to go!** 🚀
