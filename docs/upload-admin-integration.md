# Upload to Admin Panel Integration

## Problem
Uploads from the upload page were not appearing in the admin panel because the application was using static mock data without any state management.

## Solution
Implemented a client-side content store (`lib/content-store.ts`) that manages pending uploads in memory and notifies components when content changes.

## How It Works

### 1. Content Store (`lib/content-store.ts`)
- Maintains an in-memory array of pending content
- Provides functions to add, approve, reject, and bulk manage content
- Implements a pub/sub pattern for real-time updates
- Components can subscribe to changes and re-render automatically

### 2. Upload Page (`app/upload/page.tsx`)
- When a user submits content, it calls `addPendingContent()`
- The new content is added to the store with status "pending"
- All subscribed components are notified of the change

### 3. Admin Pages
- **Admin Dashboard** (`app/admin/page.tsx`):
  - Subscribes to content changes on mount
  - Displays combined count of mock + dynamic pending content
  - Shows latest pending items

- **Approvals Page** (`app/admin/approvals/page.tsx`):
  - Subscribes to content changes
  - Displays all pending content (mock + dynamic)
  - Approve/reject actions update the store
  - Bulk actions supported

## Usage

### Uploading Content
1. Go to `/upload`
2. Fill in the form with content details
3. Submit the form
4. Content is added to pending queue

### Viewing in Admin Panel
1. Go to `/admin` or `/admin/approvals`
2. New uploads appear immediately in the pending list
3. Approve or reject content as needed

### Real-time Updates
- When content is uploaded, admin panel updates automatically
- When content is approved/rejected, it's removed from pending list
- No page refresh needed

## Future Enhancements

For a production application, replace this with:

1. **Backend API**: 
   - POST `/api/content` - Upload content
   - GET `/api/content/pending` - Get pending content
   - PUT `/api/content/:id/approve` - Approve content
   - PUT `/api/content/:id/reject` - Reject content

2. **Database**: Store content in PostgreSQL, MongoDB, etc.

3. **Real-time Updates**: Use WebSockets or Server-Sent Events

4. **Authentication**: Verify user permissions before actions

5. **File Storage**: Upload files to S3, Cloudinary, etc.

## Testing

1. **Upload a file**:
   ```
   - Navigate to /upload
   - Select department, branch, year, subject, topic
   - Enter title and description
   - Upload a file or add YouTube URL
   - Submit
   ```

2. **Check admin panel**:
   ```
   - Navigate to /admin or /admin/approvals
   - Verify the uploaded content appears in pending list
   - Approve or reject the content
   - Verify it's removed from pending list
   ```

3. **Test bulk actions**:
   ```
   - Upload multiple items
   - Go to /admin/approvals
   - Select multiple items
   - Use bulk approve/reject buttons
   ```

## Technical Details

### State Management
- Uses React's `useState` and `useEffect` hooks
- Pub/sub pattern for cross-component communication
- No external state management library needed

### Data Flow
```
Upload Page → addPendingContent() → Content Store → notifyListeners()
                                                           ↓
                                                    Admin Components
                                                           ↓
                                                    Re-render with new data
```

### Memory Management
- Content is stored in memory (lost on page refresh)
- For persistence, implement localStorage or backend API
- Cleanup functions prevent memory leaks

## Notes

- This is a client-side only solution for demonstration
- Data is lost on page refresh
- Not suitable for production without backend integration
- Perfect for prototyping and UI development
