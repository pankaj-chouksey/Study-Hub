# 🔐 Admin Panel Access Guide

## Quick Access

**Admin Panel URL:** `http://localhost:3000/admin` (local) or `https://your-domain.vercel.app/admin` (production)

---

## How to Become an Admin

### Method 1: Using the Make-Admin Script (Recommended)

**Step 1: Create an account**
1. Go to `/signup` and create a regular account
2. Use your email address (you'll need this)

**Step 2: Make yourself admin**

**For Local Development:**
```bash
cd study-platform
node scripts/make-admin.js your-email@example.com
```

**For Production (Vercel):**
```bash
# Set your MongoDB URI
$env:MONGODB_URI="your-mongodb-connection-string"

# Run the script
node scripts/make-admin.js your-email@example.com
```

**Step 3: Access admin panel**
- Local: http://localhost:3000/admin
- Production: https://your-domain.vercel.app/admin

---

### Method 2: Direct Database Update (MongoDB Atlas)

**Step 1: Go to MongoDB Atlas**
1. Visit https://cloud.mongodb.com/
2. Login to your account
3. Select your cluster
4. Click "Browse Collections"

**Step 2: Find your user**
1. Select database: `studyhub`
2. Select collection: `users`
3. Find your user by email

**Step 3: Update role**
1. Click "Edit" on your user document
2. Find the `role` field
3. Change value from `"user"` to `"admin"`
4. Click "Update"

**Step 4: Logout and login again**
- Your session needs to refresh to get admin permissions

---

## Admin Panel Features

Once you have admin access, you can:

### 📋 Dashboard (`/admin`)
- View pending approvals count
- See recent activity
- Quick stats overview

### ✅ Approvals (`/admin/approvals`)
- Review pending content
- Approve or reject uploads
- Preview content before approval
- Bulk actions

### 👥 Users (`/admin/users`)
- View all registered users
- See user statistics
- Manage user roles
- Search and filter users

### 📊 Analytics (`/admin/analytics`)
- Upload trends
- Popular content
- User engagement metrics
- Department statistics

### ⚙️ Manage (`/admin/manage`)
- Manage subjects
- Manage branches
- Content organization
- System settings

---

## Troubleshooting

### "Access Denied" or Redirected to Home

**Cause:** Your account doesn't have admin role

**Solution:**
1. Run the make-admin script with your email
2. Or update your role in MongoDB Atlas
3. Logout and login again

### Script Error: "MONGODB_URI not found"

**Solution:**
```bash
# Windows PowerShell
$env:MONGODB_URI="your-mongodb-connection-string"

# Windows CMD
set MONGODB_URI=your-mongodb-connection-string

# Mac/Linux
export MONGODB_URI="your-mongodb-connection-string"
```

### Script Error: "User not found"

**Cause:** Email doesn't match any user in database

**Solution:**
1. Check spelling of email
2. Make sure you've created an account first
3. Check MongoDB Atlas to verify user exists

### Can't Access Admin Panel After Making Admin

**Solution:**
1. Clear browser cookies
2. Logout completely
3. Login again
4. Try accessing `/admin` again

---

## Security Best Practices

### 🔒 Production Security

1. **Limit Admin Accounts**
   - Only give admin access to trusted users
   - Use personal emails, not shared accounts

2. **Monitor Admin Activity**
   - Check admin actions regularly
   - Review approval/rejection patterns

3. **Rotate Credentials**
   - Change MongoDB password periodically
   - Update NEXTAUTH_SECRET if compromised

4. **Use Strong Passwords**
   - Admin accounts should have strong passwords
   - Enable 2FA on MongoDB Atlas

### 🚫 Never Do This

- ❌ Don't share admin credentials
- ❌ Don't commit admin emails to Git
- ❌ Don't use weak passwords for admin accounts
- ❌ Don't give admin access to untrusted users

---

## Quick Reference

### Make Admin Command
```bash
node scripts/make-admin.js email@example.com
```

### Admin URLs
- Dashboard: `/admin`
- Approvals: `/admin/approvals`
- Users: `/admin/users`
- Analytics: `/admin/analytics`
- Manage: `/admin/manage`

### Check if User is Admin (MongoDB)
```javascript
db.users.findOne({ email: "your-email@example.com" })
// Look for: role: "admin"
```

### Remove Admin Access
```bash
# Update in MongoDB Atlas
role: "admin" → role: "user"
```

---

## Example: Complete Setup

```bash
# 1. Create account on website
# Go to /signup and register

# 2. Set MongoDB URI (if not in .env.local)
$env:MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/studyhub"

# 3. Make yourself admin
cd study-platform
node scripts/make-admin.js admin@example.com

# 4. Output should show:
# ✅ Successfully made admin@example.com an admin!
# User can now access: https://your-domain.vercel.app/admin

# 5. Logout and login again

# 6. Visit /admin
```

---

## Need Help?

If you're still having issues:

1. **Check the logs** - Look for error messages
2. **Verify MongoDB connection** - Test with `/api/test-db`
3. **Check user document** - Verify role is "admin" in MongoDB
4. **Clear session** - Logout, clear cookies, login again
5. **Check environment variables** - Ensure MONGODB_URI is set

---

**Last Updated:** November 2024
