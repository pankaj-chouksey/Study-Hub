# Testing MongoDB Connection

## Quick Test Methods

### Method 1: Test API Endpoint (Easiest)

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser** and go to:
   ```
   http://localhost:3000/api/test-db
   ```

3. **Check the response**:
   - ✅ **Success**: You'll see a JSON response with `"success": true`
   - ❌ **Error**: You'll see error details and hints

**Expected Success Response**:
```json
{
  "success": true,
  "message": "✅ MongoDB is connected successfully!",
  "details": {
    "status": "connected",
    "database": "studyhub",
    "host": "cluster0.xxxxx.mongodb.net"
  }
}
```

**Expected Error Response** (if not connected):
```json
{
  "success": false,
  "message": "❌ Failed to connect to MongoDB",
  "error": "Error message here",
  "hint": "Check your MONGODB_URI in .env.local file"
}
```

---

### Method 2: Check Server Console

1. **Start your dev server**:
   ```bash
   npm run dev
   ```

2. **Visit the test endpoint**:
   ```
   http://localhost:3000/api/test-db
   ```

3. **Check your terminal** for MongoDB connection logs:
   - Look for Mongoose connection messages
   - Check for any error messages

---

### Method 3: Test with Actual Upload

1. **Start your server**:
   ```bash
   npm run dev
   ```

2. **Create a test user first** (using MongoDB Atlas UI or Compass):
   - Go to MongoDB Atlas → Browse Collections
   - Create database: `studyhub`
   - Create collection: `users`
   - Insert a document:
   ```json
   {
     "name": "Test User",
     "email": "test@example.com",
     "role": "student",
     "branch": "Computer Science Engineering",
     "year": "Second Year",
     "points": 0
   }
   ```
   - Copy the `_id` value (e.g., `507f1f77bcf86cd799439011`)

3. **Go to upload page**:
   ```
   http://localhost:3000/upload
   ```

4. **Fill in the form** and submit

5. **Check MongoDB Atlas**:
   - Go to Browse Collections
   - Look for `contents` collection
   - Your upload should appear there!

6. **Check admin panel**:
   ```
   http://localhost:3000/admin/approvals
   ```
   - Your upload should appear in pending list

---

### Method 4: Use MongoDB Compass (Visual Tool)

1. **Download MongoDB Compass**: https://www.mongodb.com/try/download/compass

2. **Get your connection string** from `.env.local`

3. **Open Compass** and paste your connection string

4. **Click "Connect"**

5. **You should see**:
   - Your `studyhub` database
   - Collections: `users`, `contents`, etc.
   - Ability to browse and edit data

---

### Method 5: Test API Routes with cURL or Postman

#### Test Connection:
```bash
curl http://localhost:3000/api/test-db
```

#### Create a User:
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "role": "student",
    "branch": "Computer Science Engineering",
    "year": "Second Year"
  }'
```

#### Get All Users:
```bash
curl http://localhost:3000/api/users
```

#### Get Pending Content:
```bash
curl http://localhost:3000/api/content?status=pending
```

---

## Common Issues and Solutions

### Issue 1: "MONGODB_URI is not defined"

**Solution**:
1. Make sure `.env.local` exists in `study-platform/` folder
2. Check the file contains: `MONGODB_URI=mongodb+srv://...`
3. Restart your dev server after adding the variable

### Issue 2: "Authentication failed"

**Solution**:
1. Check your username and password in the connection string
2. Make sure the user exists in MongoDB Atlas (Database Access)
3. URL-encode special characters in password:
   - `@` → `%40`
   - `:` → `%3A`
   - `/` → `%2F`

### Issue 3: "IP not whitelisted"

**Solution**:
1. Go to MongoDB Atlas → Network Access
2. Add your IP address or use `0.0.0.0/0` for development
3. Wait 1-2 minutes for changes to take effect

### Issue 4: "Connection timeout"

**Solution**:
1. Check your internet connection
2. Verify your cluster is running in MongoDB Atlas
3. Try a different network (sometimes corporate firewalls block MongoDB)

### Issue 5: "Database not found"

**Solution**:
- The database will be created automatically when you insert the first document
- Make sure your connection string includes the database name:
  ```
  mongodb+srv://user:pass@cluster.net/studyhub?...
                                        ^^^^^^^^ database name
  ```

---

## Verification Checklist

Use this checklist to verify everything is working:

- [ ] `.env.local` file exists with `MONGODB_URI`
- [ ] Dev server starts without errors
- [ ] `/api/test-db` returns success
- [ ] Can create a user via API
- [ ] Can upload content
- [ ] Content appears in MongoDB Atlas
- [ ] Content appears in admin panel
- [ ] Can approve/reject content
- [ ] Changes persist after page refresh

---

## Monitoring Your Database

### In MongoDB Atlas:

1. **Metrics Tab**: View connection count, operations, data size
2. **Real-time Performance**: See queries as they happen
3. **Alerts**: Set up notifications for issues
4. **Logs**: View connection and query logs

### In Your Application:

Check the browser console and server terminal for:
- Connection success/failure messages
- API request/response logs
- Error messages

---

## Next Steps After Successful Connection

1. **Seed initial data** (users, departments, etc.)
2. **Test all CRUD operations**
3. **Set up proper authentication**
4. **Add file upload to cloud storage**
5. **Deploy to production**

---

## Quick Debug Commands

```bash
# Check if .env.local exists
ls -la study-platform/.env.local

# View .env.local content (be careful with passwords!)
cat study-platform/.env.local

# Test connection with curl
curl http://localhost:3000/api/test-db

# Check server logs
npm run dev
```

---

## Need Help?

If you're still having issues:

1. Check the error message in `/api/test-db` response
2. Look at your server console for detailed errors
3. Verify your MongoDB Atlas cluster is running
4. Check MongoDB Atlas connection logs
5. Try connecting with MongoDB Compass to isolate the issue

**Common Error Messages**:
- `MongooseServerSelectionError` → IP not whitelisted or cluster down
- `Authentication failed` → Wrong username/password
- `MONGODB_URI is not defined` → Missing .env.local file
- `Connection timeout` → Network/firewall issue

---

**You're all set!** 🎉 Once the test endpoint returns success, your MongoDB integration is working perfectly.
