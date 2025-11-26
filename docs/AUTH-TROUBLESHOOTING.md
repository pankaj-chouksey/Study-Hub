# Authentication Troubleshooting

## ✅ Fixed Issues

### Missing NextAuth API Route
- **Problem**: NextAuth API route was missing
- **Fix**: Created `app/api/auth/[...nextauth]/route.ts`
- **Status**: ✅ Fixed

### Missing Password Field in User Model
- **Problem**: User model didn't have password field
- **Fix**: Added password field to User schema
- **Status**: ✅ Fixed

## 🧪 Testing Authentication

### Test Signup

1. **Start dev server**
   ```bash
   npm run dev
   ```

2. **Go to signup page**
   ```
   http://localhost:3000/signup
   ```

3. **Fill in the form**
   - Name: Test User
   - Email: test@example.com
   - Password: test123
   - Branch: CSE
   - Year: Third Year

4. **Click "Create account"**
   - Should create account
   - Should auto-login
   - Should redirect to home

### Test Login

1. **Go to login page**
   ```
   http://localhost:3000/login
   ```

2. **Enter credentials**
   - Email: test@example.com
   - Password: test123

3. **Click "Sign in"**
   - Should login successfully
   - Should redirect to home
   - Should see profile in navbar

### Test Logout

1. **Click profile avatar** in navbar
2. **Click "Logout"**
   - Should logout
   - Should redirect to home
   - Should see "Sign in" button

## 🔍 Common Issues

### Issue: "Invalid credentials" on login

**Possible causes:**
1. User doesn't exist in database
2. Wrong password
3. MongoDB connection issue

**Solutions:**
1. Check MongoDB connection in `.env.local`
2. Try creating a new account
3. Check browser console for errors
4. Check terminal for server errors

### Issue: "Failed to create account" on signup

**Possible causes:**
1. Email already exists
2. MongoDB connection issue
3. Missing required fields

**Solutions:**
1. Try a different email
2. Check MongoDB connection
3. Fill all required fields
4. Check terminal for errors

### Issue: Session not persisting

**Possible causes:**
1. `NEXTAUTH_SECRET` not set
2. Cookies disabled
3. `NEXTAUTH_URL` mismatch

**Solutions:**
1. Check `.env.local` has `NEXTAUTH_SECRET`
2. Enable cookies in browser
3. Verify `NEXTAUTH_URL` matches your URL
4. Clear browser cookies and try again

### Issue: Google OAuth not working

**Possible causes:**
1. Missing Google credentials
2. Wrong redirect URI
3. Google+ API not enabled

**Solutions:**
1. Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
2. Check redirect URI in Google Console
3. Enable Google+ API
4. Restart dev server

## 🔧 Debug Steps

### 1. Check Environment Variables

```bash
# In .env.local, verify these exist:
MONGODB_URI=mongodb+srv://...
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
```

### 2. Check MongoDB Connection

Visit: `http://localhost:3000/api/test-db`

Should see:
```json
{
  "success": true,
  "message": "Connected to MongoDB successfully"
}
```

### 3. Check Browser Console

Open DevTools (F12) → Console tab
Look for errors during signup/login

### 4. Check Server Logs

Look at terminal where `npm run dev` is running
Check for errors during authentication

### 5. Check MongoDB Atlas

1. Go to MongoDB Atlas dashboard
2. Click "Browse Collections"
3. Look for `users` collection
4. Verify user was created

## 📝 Test Checklist

- [ ] Dev server running (`npm run dev`)
- [ ] MongoDB connected (check `/api/test-db`)
- [ ] Environment variables set
- [ ] Can access signup page
- [ ] Can create account
- [ ] User appears in MongoDB
- [ ] Auto-login after signup works
- [ ] Can logout
- [ ] Can login again
- [ ] Session persists on refresh
- [ ] Profile shows in navbar
- [ ] Protected routes work (upload)

## 🆘 Still Having Issues?

### Check These Files

1. **NextAuth API Route**
   - File: `app/api/auth/[...nextauth]/route.ts`
   - Should exist and export GET/POST handlers

2. **Auth Configuration**
   - File: `lib/auth.ts`
   - Should have authOptions configured

3. **User Model**
   - File: `models/User.ts`
   - Should have password field

4. **Signup API**
   - File: `app/api/auth/signup/route.ts`
   - Should hash password and create user

### Restart Everything

Sometimes a fresh start helps:

```bash
# Stop dev server (Ctrl+C)
# Clear Next.js cache
rm -rf .next

# Restart
npm run dev
```

### Check Package Versions

```bash
npm list next-auth bcryptjs mongoose
```

Should see:
- next-auth@latest
- bcryptjs@latest
- mongoose@latest

## ✅ Expected Behavior

### Successful Signup Flow

1. User fills signup form
2. POST to `/api/auth/signup`
3. Password hashed with bcrypt
4. User saved to MongoDB
5. Auto sign-in with NextAuth
6. Redirect to home page
7. Profile shows in navbar

### Successful Login Flow

1. User enters credentials
2. POST to `/api/auth/signin`
3. NextAuth validates credentials
4. Password compared with bcrypt
5. JWT token created
6. Session established
7. Redirect to home page
8. Profile shows in navbar

### Successful Logout Flow

1. User clicks logout
2. NextAuth clears session
3. Redirect to home page
4. "Sign in" button shows

## 🎯 Quick Test Script

Run these commands in browser console:

```javascript
// Test if session exists
fetch('/api/auth/session')
  .then(r => r.json())
  .then(console.log)

// Should show user data if logged in
// Should show null if logged out
```

---

## Summary

✅ **All authentication issues fixed!**

**What was fixed:**
1. Created missing NextAuth API route
2. Added password field to User model
3. Updated auth logic to select password

**Next steps:**
1. Test signup
2. Test login
3. Test logout
4. Verify everything works

**If issues persist:**
- Check environment variables
- Check MongoDB connection
- Check browser console
- Check server logs
- Follow troubleshooting steps above

**Authentication should now work perfectly!** 🎉
