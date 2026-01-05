# 🚨 Vercel Error Fix: Missing Resend Environment Variables

## The Problem

If you're seeing errors on Vercel related to password reset emails, it's because the **Resend environment variables are missing** from your Vercel project.

## Quick Fix (2 Minutes)

### Step 1: Go to Vercel Dashboard
1. Open [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to **Settings** → **Environment Variables**

### Step 2: Add Missing Variables

Add these **2 required variables**:

#### Variable 1: `RESEND_API_KEY`
- **Key**: `RESEND_API_KEY`
- **Value**: `re_XSAEMvCQ_6MYZUf3fxE8be83fTEQj6yZs`
- **Environment**: Select all (Production, Preview, Development)
- Click **Save**

#### Variable 2: `RESEND_FROM_EMAIL`
- **Key**: `RESEND_FROM_EMAIL`
- **Value**: `Adhyayan <onboarding@resend.dev>`
- **Environment**: Select all (Production, Preview, Development)
- Click **Save**

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Click **"..."** on the latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes

## ✅ Done!

Your password reset emails should now work on Vercel.

---

## Why This Happened

We recently added password reset email functionality using Resend. The code requires these environment variables, but they weren't added to Vercel yet.

## For Production (Later)

If you want to use a custom email address (like `noreply@adhyayan.edu`):

1. Go to [resend.com/domains](https://resend.com/domains)
2. Add and verify your domain
3. Update `RESEND_FROM_EMAIL` in Vercel to use your verified email
4. Redeploy

**Note:** You cannot use Gmail addresses (`@gmail.com`) with Resend.

---

## Complete Environment Variables Checklist

Make sure you have all these in Vercel:

✅ `MONGODB_URI`  
✅ `NEXTAUTH_SECRET`  
✅ `NEXTAUTH_URL`  
✅ `CLOUDINARY_CLOUD_NAME`  
✅ `CLOUDINARY_API_KEY`  
✅ `CLOUDINARY_API_SECRET`  
✅ `NEXT_PUBLIC_USE_LOCAL_UPLOAD`  
✅ **`RESEND_API_KEY`** ← **ADD THIS**  
✅ **`RESEND_FROM_EMAIL`** ← **ADD THIS**  

