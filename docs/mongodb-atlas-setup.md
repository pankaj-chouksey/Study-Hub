# MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" or "Sign In"
3. Create an account or log in

## Step 2: Create a New Cluster

1. After logging in, click "Build a Database"
2. Choose **FREE** tier (M0 Sandbox)
3. Select your preferred cloud provider and region (choose closest to you)
4. Click "Create Cluster" (takes 1-3 minutes)

## Step 3: Create Database User

1. In the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter:
   - **Username**: `studyhub_user` (or your choice)
   - **Password**: Generate a secure password (save it!)
5. Set privileges to "Read and write to any database"
6. Click "Add User"

## Step 4: Whitelist Your IP Address

1. In the left sidebar, click "Network Access"
2. Click "Add IP Address"
3. For development, click "Allow Access from Anywhere" (0.0.0.0/0)
   - ⚠️ For production, use specific IP addresses
4. Click "Confirm"

## Step 5: Get Your Connection String

1. Go back to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select:
   - **Driver**: Node.js
   - **Version**: 5.5 or later
5. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 6: Configure Your Application

1. Open `study-platform/.env.local` file
2. Replace the placeholder with your actual connection string:

```env
MONGODB_URI=mongodb+srv://studyhub_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/studyhub?retryWrites=true&w=majority
```

**Important replacements:**
- Replace `<username>` with your database username (e.g., `studyhub_user`)
- Replace `<password>` with your database password
- Replace `<cluster>` with your cluster name (e.g., `cluster0.abc123`)
- Add database name after `.net/` (e.g., `studyhub`)

### Example:
```env
MONGODB_URI=mongodb+srv://studyhub_user:MySecurePass123@cluster0.abc123.mongodb.net/studyhub?retryWrites=true&w=majority
```

## Step 7: Test the Connection

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. The application will automatically connect to MongoDB when you:
   - Upload content
   - Visit admin panel
   - Make any API call

## Step 8: Seed Initial Data (Optional)

Create a test user to get started. You can use MongoDB Compass or the Atlas UI:

1. In Atlas, click "Browse Collections"
2. Click "Add My Own Data"
3. Database name: `studyhub`
4. Collection name: `users`
5. Click "Create"
6. Click "Insert Document" and add:

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "role": "student",
  "branch": "Computer Science Engineering",
  "year": "Second Year",
  "points": 0,
  "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Test"
}
```

7. Create an admin user:

```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "role": "admin",
  "branch": "Computer Science Engineering",
  "year": "Faculty",
  "points": 0,
  "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
}
```

## Troubleshooting

### Error: "MongooseServerSelectionError"
- Check your IP is whitelisted in Network Access
- Verify your username and password are correct
- Ensure your cluster is running

### Error: "Authentication failed"
- Double-check your username and password
- Make sure there are no special characters that need URL encoding
- Password special characters should be URL encoded:
  - `@` → `%40`
  - `:` → `%3A`
  - `/` → `%2F`
  - `?` → `%3F`
  - `#` → `%23`

### Error: "MONGODB_URI is not defined"
- Make sure `.env.local` file exists in `study-platform/` directory
- Restart your development server after adding the env variable
- Check the file is named exactly `.env.local` (not `.env` or `.env.txt`)

## Security Best Practices

1. **Never commit `.env.local`** to Git (it's in `.gitignore`)
2. **Use strong passwords** for database users
3. **Restrict IP access** in production
4. **Rotate credentials** regularly
5. **Use different databases** for development and production

## MongoDB Atlas Free Tier Limits

- **Storage**: 512 MB
- **RAM**: Shared
- **Connections**: 500 concurrent
- **Backups**: Not included

This is perfect for development and small projects!

## Next Steps

Once connected, your application will:
- ✅ Store uploads in MongoDB
- ✅ Persist data across page refreshes
- ✅ Show real-time updates in admin panel
- ✅ Support all CRUD operations

## Useful MongoDB Atlas Features

1. **Collections**: View and edit your data
2. **Metrics**: Monitor database performance
3. **Alerts**: Set up notifications
4. **Backup**: Schedule backups (paid tiers)
5. **Charts**: Visualize your data

## Connection String Format Explained

```
mongodb+srv://username:password@cluster.mongodb.net/database?options
```

- `mongodb+srv://` - Protocol (SRV record for automatic failover)
- `username:password` - Database credentials
- `@cluster.mongodb.net` - Your cluster hostname
- `/database` - Database name (e.g., `studyhub`)
- `?options` - Connection options (retryWrites, w=majority, etc.)

## Need Help?

- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- MongoDB University: https://university.mongodb.com/ (Free courses)
- Community Forums: https://www.mongodb.com/community/forums/

---

**You're all set!** 🎉 Your application is now connected to MongoDB Atlas.
