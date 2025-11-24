# Removing Mock Data - Implementation Plan

## Current Mock Data Locations

1. **lib/constants.ts** - MOCK_CONTENT, MOCK_USERS, MOCK_DISCUSSIONS
2. **Homepage** - Recent uploads, top contributors
3. **Leaderboard** - User rankings
4. **Discussions** - Posts and comments
5. **Content pages** - Comments sections
6. **Admin dashboard** - Stats and activity

## Implementation Steps

### Phase 1: Core Data (Priority)
- [x] Content upload and approval ✅
- [x] Content viewing ✅
- [ ] User management
- [ ] Comments system
- [ ] Discussions system

### Phase 2: Features
- [ ] Leaderboard with real points
- [ ] Top contributors
- [ ] Search functionality
- [ ] User profiles

### Phase 3: Advanced
- [ ] Notifications
- [ ] User authentication
- [ ] File management
- [ ] Analytics

## What's Already Working

✅ **Content System**
- Upload content with file upload
- Admin approval workflow
- View approved content
- MongoDB storage

✅ **File Upload**
- Local storage for development
- Vercel Blob ready for production
- Automatic upload on drag & drop

## What Needs Implementation

### 1. User System
Currently using placeholder users. Need:
- User registration/login
- User profiles
- Points system
- Role management

### 2. Comments System
Currently using mock comments. Need:
- Comment API routes
- Comment model (already exists)
- Add/edit/delete comments
- Nested replies
- Upvotes

### 3. Discussions System
Currently using mock discussions. Need:
- Discussion API routes
- Discussion model (already exists)
- Create/edit/delete posts
- Comments on discussions
- Categories/tags

### 4. Leaderboard
Currently using mock data. Need:
- Calculate points from real activities
- Rank users by points
- Update points on actions

## Quick Wins (Can Implement Now)

1. **Remove console logs** from production code
2. **Hide mock data sections** until implemented
3. **Show "Coming Soon"** for unimplemented features
4. **Focus on core content flow** (already working!)

## Recommendation

Since the core content system is working, I recommend:

1. **Keep using it as-is** for content upload/approval/viewing
2. **Hide or mark as "Coming Soon"** features that need mock data:
   - Discussions
   - Comments (except viewing)
   - Leaderboard
   - Top Contributors
3. **Implement user system next** (authentication + profiles)
4. **Then add comments** (most requested feature)
5. **Then discussions** (community feature)

This way, you have a working app now, and can add features incrementally.

## Next Steps

Would you like me to:
A. Hide unimplemented features and focus on what works
B. Implement the user authentication system
C. Implement the comments system
D. Implement discussions
E. Something else

Let me know your priority!
