# Authentication System

## Overview

The platform uses a **guest-friendly authentication** approach:
- ✅ **No login required** for browsing content
- 🔒 **Login required** for uploading and commenting

## Current Implementation

### Mock Authentication (Development)
Currently using localStorage for temporary auth. This should be replaced with a real authentication provider before production.

### Protected Features

**Requires Authentication:**
- Upload content (`/upload`)
- Post comments
- Create discussions
- Admin panel (`/admin`)

**Public Access:**
- Browse departments
- View content
- Search
- View leaderboard
- View discussions

## How It Works

### 1. Auth Utilities (`lib/auth-utils.ts`)
```typescript
isAuthenticated()      // Check if user is logged in
getCurrentUser()       // Get current user data
setAuthUser(user)      // Set logged in user
clearAuthUser()        // Logout
redirectToLogin(url)   // Redirect to login with return URL
```

### 2. Protected Pages
Pages that require auth show an `AuthRequired` component with:
- Sign in button
- Sign up button
- Return URL to redirect back after login

### 3. Protected Actions
Components like comments show a prompt to sign in when guests try to interact.

### 4. Navbar
- **Guests**: See "Sign in" and "Sign up" buttons
- **Authenticated**: See profile avatar with dropdown (Profile, Logout, etc.)

## User Flow

### Guest User
1. Browse content freely
2. Click "Upload" or try to comment
3. See "Sign in required" prompt
4. Click "Sign in" → redirected to login
5. After login → redirected back to original page

### Authenticated User
1. Sign in once
2. Upload content
3. Post comments
4. See profile in navbar
5. Logout when done

## Migration to Real Auth

To replace with real authentication (NextAuth.js, Clerk, etc.):

1. **Install auth provider**
   ```bash
   npm install next-auth
   # or
   npm install @clerk/nextjs
   ```

2. **Replace `lib/auth-utils.ts`**
   - Update `isAuthenticated()` to check real session
   - Update `getCurrentUser()` to get real user data
   - Remove localStorage logic

3. **Update protected pages**
   - Use auth provider's middleware
   - Replace `AuthRequired` component with provider's UI

4. **Update API routes**
   - Add session validation
   - Get user from session instead of mock data

## Testing

### Test as Guest
1. Browse any content page ✅
2. Try to upload → see auth prompt ✅
3. Try to comment → see auth prompt ✅

### Test as Authenticated User
1. Go to `/signup` and create account
2. Upload content ✅
3. Post comments ✅
4. See profile in navbar ✅
5. Logout ✅

## Security Notes

⚠️ **Current implementation is NOT production-ready**
- Uses localStorage (can be manipulated)
- No server-side validation
- No password hashing
- No session management

✅ **For production, implement:**
- Real authentication provider
- Server-side session validation
- Secure password storage
- CSRF protection
- Rate limiting

## Next Steps

1. Choose auth provider (NextAuth.js recommended)
2. Set up OAuth providers (Google, GitHub)
3. Add email verification
4. Implement password reset
5. Add 2FA (optional)
6. Create profile page
7. Add user settings
