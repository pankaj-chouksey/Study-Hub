# 🚀 Vercel Deployment Checklist

## Pre-Deployment

### 1. Code Preparation
- [ ] All code committed to Git
- [ ] No console.logs or debug code
- [ ] All TypeScript errors resolved
- [ ] Build succeeds locally (`npm run build`)
- [ ] `.env.local` is in `.gitignore`

### 2. Database Setup
- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password
- [ ] IP whitelist configured (0.0.0.0/0 for Vercel)
- [ ] Connection string tested locally
- [ ] Collections created (or will auto-create)

### 3. Cloudinary Setup
- [ ] Cloudinary account created (free tier)
- [ ] Cloud name noted
- [ ] API key and secret obtained
- [ ] Upload preset configured (optional)

### 4. Authentication Setup
- [ ] NextAuth secret generated
- [ ] Google OAuth configured (optional)
  - [ ] OAuth client created
  - [ ] Redirect URIs added
  - [ ] Client ID and secret obtained

---

## Vercel Deployment

### 1. Connect Repository
- [ ] Push code to GitHub/GitLab/Bitbucket
- [ ] Go to [Vercel Dashboard](https://vercel.com/dashboard)
- [ ] Click "Add New Project"
- [ ] Import your repository
- [ ] Select framework: Next.js (auto-detected)

### 2. Configure Project
- [ ] Project name set
- [ ] Root directory: `study-platform` (if in subdirectory)
- [ ] Build command: `npm run build` (default)
- [ ] Output directory: `.next` (default)
- [ ] Install command: `npm install` (default)

### 3. Add Environment Variables

Copy from `VERCEL-QUICK-SETUP.txt`:

**Required:**
- [ ] `MONGODB_URI`
- [ ] `NEXTAUTH_SECRET`
- [ ] `NEXTAUTH_URL` (use temporary, update after first deploy)
- [ ] `CLOUDINARY_CLOUD_NAME`
- [ ] `CLOUDINARY_API_KEY`
- [ ] `CLOUDINARY_API_SECRET`
- [ ] `NEXT_PUBLIC_USE_LOCAL_UPLOAD` = `false`

**Optional:**
- [ ] `GOOGLE_CLIENT_ID`
- [ ] `GOOGLE_CLIENT_SECRET`

### 4. Deploy
- [ ] Click "Deploy"
- [ ] Wait for build to complete (2-5 minutes)
- [ ] Check deployment logs for errors
- [ ] Note your deployment URL

---

## Post-Deployment

### 1. Update Configuration
- [ ] Copy your Vercel URL (e.g., `https://your-app.vercel.app`)
- [ ] Update `NEXTAUTH_URL` in Vercel environment variables
- [ ] Update Google OAuth redirect URIs (if using)
- [ ] Redeploy (Settings → Deployments → Redeploy)

### 2. Test Core Features

**Authentication:**
- [ ] Sign up with email/password works
- [ ] Login works
- [ ] Logout works
- [ ] Google sign-in works (if configured)
- [ ] Session persists across pages

**Database:**
- [ ] Content loads from MongoDB
- [ ] New content can be created
- [ ] Content can be updated
- [ ] Content can be deleted
- [ ] User data persists

**File Upload:**
- [ ] Upload page accessible
- [ ] File upload works
- [ ] Files stored in Cloudinary
- [ ] Uploaded files viewable
- [ ] Download works

**Pages:**
- [ ] Homepage loads
- [ ] Department pages work
- [ ] Content pages display correctly
- [ ] Admin panel accessible (for admin users)
- [ ] Search works
- [ ] Discussion forum works

### 3. Performance Check
- [ ] Lighthouse score > 90
- [ ] Images loading properly
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Dark mode works

### 4. Security Check
- [ ] Environment variables not exposed
- [ ] API routes protected
- [ ] Admin routes require authentication
- [ ] File uploads validated
- [ ] XSS protection enabled

---

## Domain Setup (Optional)

### 1. Add Custom Domain
- [ ] Go to Project Settings → Domains
- [ ] Add your domain
- [ ] Configure DNS records
- [ ] Wait for SSL certificate (automatic)

### 2. Update Environment Variables
- [ ] Update `NEXTAUTH_URL` to custom domain
- [ ] Update Google OAuth redirect URIs
- [ ] Redeploy

---

## Monitoring & Maintenance

### 1. Set Up Monitoring
- [ ] Enable Vercel Analytics
- [ ] Set up error tracking (Sentry, optional)
- [ ] Configure uptime monitoring

### 2. Regular Checks
- [ ] Monitor deployment logs
- [ ] Check error rates
- [ ] Review performance metrics
- [ ] Monitor Cloudinary usage
- [ ] Check MongoDB Atlas metrics

### 3. Backup Strategy
- [ ] MongoDB Atlas automatic backups enabled
- [ ] Export important data regularly
- [ ] Document recovery procedures

---

## Troubleshooting

### Build Fails
1. Check build logs in Vercel
2. Verify all dependencies in package.json
3. Test build locally: `npm run build`
4. Check for TypeScript errors

### Environment Variables Not Working
1. Verify all variables are set
2. Check for typos in variable names
3. Ensure correct environment selected (Production)
4. Redeploy after adding variables

### Database Connection Issues
1. Check MongoDB Atlas IP whitelist
2. Verify connection string is URL-encoded
3. Test connection locally
4. Check database user permissions

### Authentication Issues
1. Verify NEXTAUTH_URL matches deployment URL
2. Check NEXTAUTH_SECRET is set
3. Verify Google OAuth redirect URIs
4. Clear browser cookies and try again

### File Upload Issues
1. Verify Cloudinary credentials
2. Check NEXT_PUBLIC_USE_LOCAL_UPLOAD is false
3. Review upload API logs
4. Test Cloudinary connection

---

## Quick Links

- [Vercel Dashboard](https://vercel.com/dashboard)
- [MongoDB Atlas](https://cloud.mongodb.com/)
- [Cloudinary Console](https://cloudinary.com/console)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review this checklist
3. Consult documentation links above
4. Check GitHub issues
5. Contact support

---

**Last Updated:** November 2024
**Version:** 1.0
