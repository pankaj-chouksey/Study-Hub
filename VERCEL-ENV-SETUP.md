# Vercel Environment Variables Setup

## Required Environment Variables for Production

Copy these environment variables to your Vercel project dashboard:

### 1. MongoDB Atlas
```bash
MONGODB_URI=mongodb+srv://pankajchouksey521_db_user:StudyHubDatabse%4054321@studyhub-db.omcinwl.mongodb.net/studyhub?retryWrites=true&w=majority
```

**Important Notes:**
- Special characters in password must be URL-encoded
- `@` becomes `%40`
- `<` becomes `%3C`
- `>` becomes `%3E`
- Original password: `StudyHubDatabse@54321`
- Encoded password: `StudyHubDatabse%4054321`

### 2. NextAuth Configuration
```bash
NEXTAUTH_SECRET=JOcHn4rGUgkmZ9je2Z72p97h7bskriv3DywLqzvJHQA=
NEXTAUTH_URL=https://your-domain.vercel.app
```

**Important:**
- Change `NEXTAUTH_URL` to your actual Vercel deployment URL
- Keep the same `NEXTAUTH_SECRET` for consistency
- Or generate a new one: `openssl rand -base64 32`

### 3. Cloudinary (File Storage)
```bash
CLOUDINARY_CLOUD_NAME=dfkskvj9y
CLOUDINARY_API_KEY=375117913273191
CLOUDINARY_API_SECRET=QO8bh-KyDF9LArEZekxxqerOCF8
```

### 4. File Upload Configuration
```bash
NEXT_PUBLIC_USE_LOCAL_UPLOAD=false
```

**Note:** Set to `false` for production (uses Cloudinary)

### 5. Resend (Password Reset Emails) - **REQUIRED**
```bash
RESEND_API_KEY=re_XSAEMvCQ_6MYZUf3fxE8be83fTEQj6yZs
RESEND_FROM_EMAIL=Adhyayan <onboarding@resend.dev>
```

**Important Notes:**
- Use `onboarding@resend.dev` for testing (works immediately, no domain verification needed)
- For production with custom domain, verify your domain at [resend.com/domains](https://resend.com/domains)
- **Cannot use Gmail addresses** (gmail.com domain is not allowed by Resend)

---

## Optional Environment Variables

### Google OAuth (Recommended for Production)
```bash
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
```

**Setup Steps:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new OAuth 2.0 Client ID
3. Add authorized redirect URIs:
   - `https://your-domain.vercel.app/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/google` (for testing)
4. Copy Client ID and Client Secret

---

## How to Add Environment Variables in Vercel

### Method 1: Vercel Dashboard (Recommended)

1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Add each variable:
   - **Key**: Variable name (e.g., `MONGODB_URI`)
   - **Value**: Variable value
   - **Environment**: Select all (Production, Preview, Development)
5. Click **Save**

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Add environment variables
vercel env add MONGODB_URI
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL
vercel env add CLOUDINARY_CLOUD_NAME
vercel env add CLOUDINARY_API_KEY
vercel env add CLOUDINARY_API_SECRET
vercel env add NEXT_PUBLIC_USE_LOCAL_UPLOAD
vercel env add RESEND_API_KEY
vercel env add RESEND_FROM_EMAIL

# Pull environment variables to local
vercel env pull
```

### Method 3: Import from .env file

1. Create a file with your environment variables
2. Go to Vercel Dashboard → Settings → Environment Variables
3. Click **Import .env** button
4. Upload your file

---

## Complete Environment Variables List

Copy this entire block to a text file and import to Vercel:

```bash
# MongoDB
MONGODB_URI=mongodb+srv://pankajchouksey521_db_user:StudyHubDatabse%4054321@studyhub-db.omcinwl.mongodb.net/studyhub?retryWrites=true&w=majority

# NextAuth
NEXTAUTH_SECRET=JOcHn4rGUgkmZ9je2Z72p97h7bskriv3DywLqzvJHQA=
NEXTAUTH_URL=https://your-domain.vercel.app

# Cloudinary
CLOUDINARY_CLOUD_NAME=dfkskvj9y
CLOUDINARY_API_KEY=375117913273191
CLOUDINARY_API_SECRET=QO8bh-KyDF9LArEZekxxqerOCF8

# File Upload
NEXT_PUBLIC_USE_LOCAL_UPLOAD=false

# Resend (for password reset emails)
RESEND_API_KEY=re_XSAEMvCQ_6MYZUf3fxE8be83fTEQj6yZs
RESEND_FROM_EMAIL=Adhyayan <onboarding@resend.dev>

# Google OAuth (Optional)
# GOOGLE_CLIENT_ID=your-google-client-id
# GOOGLE_CLIENT_SECRET=your-google-client-secret
```

---

## Important Security Notes

⚠️ **NEVER commit these values to Git!**

1. `.env.local` is already in `.gitignore`
2. Keep your secrets secure
3. Rotate secrets if exposed
4. Use different values for development and production

---

## After Adding Environment Variables

1. **Redeploy your application**:
   ```bash
   git push origin main
   ```
   Or click "Redeploy" in Vercel Dashboard

2. **Verify deployment**:
   - Check deployment logs for errors
   - Test authentication
   - Test file uploads
   - Test database connection

3. **Update NEXTAUTH_URL**:
   - After first deployment, update `NEXTAUTH_URL` with your actual domain
   - Redeploy again

---

## Troubleshooting

### MongoDB Connection Issues
- Verify connection string is URL-encoded
- Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for Vercel)
- Ensure database user has correct permissions

### NextAuth Issues
- Verify `NEXTAUTH_URL` matches your domain exactly
- Check `NEXTAUTH_SECRET` is set
- For Google OAuth, verify redirect URIs

### Cloudinary Issues
- Verify all three Cloudinary variables are set
- Check API key and secret are correct
- Ensure cloud name matches your account

### File Upload Issues
- Verify `NEXT_PUBLIC_USE_LOCAL_UPLOAD=false`
- Check Cloudinary credentials
- Review upload API logs in Vercel

### Resend Email Issues
- Verify `RESEND_API_KEY` is set correctly
- Check `RESEND_FROM_EMAIL` uses `onboarding@resend.dev` (for testing) or verified domain
- **Error: "gmail.com domain is not verified"** → Change to `onboarding@resend.dev` or verify your domain
- Check Resend dashboard for API key validity

---

## Quick Deployment Checklist

- [ ] MongoDB URI added and tested
- [ ] NEXTAUTH_SECRET generated and added
- [ ] NEXTAUTH_URL updated with production domain
- [ ] Cloudinary credentials added
- [ ] NEXT_PUBLIC_USE_LOCAL_UPLOAD set to false
- [ ] RESEND_API_KEY added (for password reset emails)
- [ ] RESEND_FROM_EMAIL added (use onboarding@resend.dev for testing)
- [ ] Google OAuth configured (optional)
- [ ] All variables set for Production environment
- [ ] Application redeployed
- [ ] Authentication tested
- [ ] File upload tested
- [ ] Database operations tested

---

## Need Help?

- [Vercel Environment Variables Docs](https://vercel.com/docs/concepts/projects/environment-variables)
- [NextAuth.js Deployment](https://next-auth.js.org/deployment)
- [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/getting-started/)
- [Cloudinary Setup](https://cloudinary.com/documentation)
