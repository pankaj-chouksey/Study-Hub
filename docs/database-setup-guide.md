# Database Setup Guide

## Current State
The application currently uses:
- **Mock data** (`lib/constants.ts`) - Static data for demonstration
- **In-memory store** (`lib/content-store.ts`) - Temporary storage (lost on refresh)

## Database Options

### Option 1: Prisma + PostgreSQL (Recommended)

**Best for**: Production applications, complex queries, relationships

#### Setup Steps:

1. **Install Prisma**:
```bash
npm install prisma @prisma/client
npm install -D prisma
```

2. **Initialize Prisma**:
```bash
npx prisma init
```

3. **Configure Database** (`.env`):
```env
DATABASE_URL="postgresql://user:password@localhost:5432/studyhub?schema=public"
```

4. **Create Schema** (`prisma/schema.prisma`):
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  avatar    String?
  role      Role     @default(STUDENT)
  branch    String
  year      String
  points    Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  uploadedContent Content[]
  discussions     Discussion[]
  comments        Comment[]
}

enum Role {
  STUDENT
  ADMIN
}

model Content {
  id          String        @id @default(cuid())
  title       String
  description String
  type        ContentType
  fileUrl     String?
  videoUrl    String?
  thumbnail   String?
  department  String
  branch      String
  year        String
  subject     String
  topic       String
  status      ContentStatus @default(PENDING)
  rating      Float         @default(0)
  views       Int           @default(0)
  downloads   Int           @default(0)
  tags        String[]
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
  
  uploaderId  String
  uploader    User          @relation(fields: [uploaderId], references: [id])
  
  @@index([status])
  @@index([department, branch, year, subject])
}

enum ContentType {
  NOTE
  VIDEO
  PYQ
  IMPORTANT
}

enum ContentStatus {
  PENDING
  APPROVED
  REJECTED
}

model Discussion {
  id          String    @id @default(cuid())
  title       String
  content     String
  tags        String[]
  upvotes     Int       @default(0)
  views       Int       @default(0)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  authorId    String
  author      User      @relation(fields: [authorId], references: [id])
  
  comments    Comment[]
}

model Comment {
  id           String     @id @default(cuid())
  content      String
  upvotes      Int        @default(0)
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
  
  authorId     String
  author       User       @relation(fields: [authorId], references: [id])
  
  discussionId String
  discussion   Discussion @relation(fields: [discussionId], references: [id])
  
  parentId     String?
  parent       Comment?   @relation("CommentReplies", fields: [parentId], references: [id])
  replies      Comment[]  @relation("CommentReplies")
}
```

5. **Run Migrations**:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

6. **Create Prisma Client** (`lib/prisma.ts`):
```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

7. **Create API Routes** (`app/api/content/route.ts`):
```typescript
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const content = await prisma.content.findMany({
    where: { status: 'PENDING' },
    include: { uploader: true },
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(content)
}

export async function POST(request: Request) {
  const data = await request.json()
  const content = await prisma.content.create({
    data: {
      ...data,
      status: 'PENDING'
    },
    include: { uploader: true }
  })
  return NextResponse.json(content)
}
```

---

### Option 2: Supabase (Easiest for Beginners)

**Best for**: Quick setup, built-in auth, real-time features

#### Setup Steps:

1. **Create Supabase Project**: https://supabase.com

2. **Install Client**:
```bash
npm install @supabase/supabase-js
```

3. **Configure** (`.env.local`):
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. **Create Client** (`lib/supabase.ts`):
```typescript
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

5. **Create Tables** (in Supabase Dashboard):
- Use the SQL editor to create tables matching your schema
- Enable Row Level Security (RLS)

6. **Use in Components**:
```typescript
// Upload content
const { data, error } = await supabase
  .from('content')
  .insert([{ title, description, status: 'pending' }])

// Get pending content
const { data, error } = await supabase
  .from('content')
  .select('*, uploader:users(*)')
  .eq('status', 'pending')
```

---

### Option 3: MongoDB + Mongoose

**Best for**: Flexible schema, document-based data

#### Setup Steps:

1. **Install Mongoose**:
```bash
npm install mongoose
```

2. **Configure** (`.env`):
```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/studyhub
```

3. **Create Connection** (`lib/mongodb.ts`):
```typescript
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
```

4. **Create Models** (`models/Content.ts`):
```typescript
import mongoose from 'mongoose'

const ContentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  type: { type: String, enum: ['note', 'video', 'pyq', 'important'] },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  uploaderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // ... other fields
}, { timestamps: true })

export default mongoose.models.Content || mongoose.model('Content', ContentSchema)
```

---

### Option 4: Firebase/Firestore

**Best for**: Real-time updates, Google ecosystem

#### Setup Steps:

1. **Install Firebase**:
```bash
npm install firebase
```

2. **Initialize** (`lib/firebase.ts`):
```typescript
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // ... other config
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
```

3. **Use Firestore**:
```typescript
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'

// Add content
await addDoc(collection(db, 'content'), {
  title,
  description,
  status: 'pending',
  createdAt: new Date()
})

// Get pending content
const q = query(collection(db, 'content'), where('status', '==', 'pending'))
const snapshot = await getDocs(q)
const content = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
```

---

## Migration Path

### Step 1: Choose Your Database
Pick one of the options above based on your needs.

### Step 2: Set Up Database
Follow the setup steps for your chosen database.

### Step 3: Create API Routes
Replace the in-memory store with actual API calls:

```typescript
// app/api/content/pending/route.ts
export async function GET() {
  const content = await db.content.findMany({ where: { status: 'pending' } })
  return NextResponse.json(content)
}

// app/api/content/[id]/approve/route.ts
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const content = await db.content.update({
    where: { id: params.id },
    data: { status: 'approved' }
  })
  return NextResponse.json(content)
}
```

### Step 4: Update Frontend
Replace content-store calls with API calls:

```typescript
// Instead of:
import { addPendingContent } from '@/lib/content-store'
addPendingContent(data)

// Use:
const response = await fetch('/api/content', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
const content = await response.json()
```

### Step 5: Add Authentication
Implement user authentication (NextAuth.js, Clerk, or Supabase Auth).

### Step 6: Add File Storage
For file uploads, use:
- **AWS S3** - Most popular, scalable
- **Cloudinary** - Image/video optimization
- **Vercel Blob** - Simple, integrated with Vercel
- **Supabase Storage** - If using Supabase

---

## Recommended Stack for StudyHub

For this project, I recommend:

**Database**: Prisma + PostgreSQL (or Supabase for easier setup)
**File Storage**: Cloudinary or AWS S3
**Authentication**: NextAuth.js or Clerk
**Hosting**: Vercel (for Next.js) + Supabase/Railway (for database)

### Why?
- ✅ Type-safe with Prisma
- ✅ Great developer experience
- ✅ Scales well
- ✅ Good documentation
- ✅ Free tier available

---

## Quick Start (Supabase - Fastest)

1. Create account at https://supabase.com
2. Create new project
3. Run SQL in Supabase SQL Editor (see schema above)
4. Install client: `npm install @supabase/supabase-js`
5. Add env variables
6. Replace content-store with Supabase calls

**Time to set up**: ~30 minutes

---

## Need Help?

Let me know which database option you'd like to implement, and I can:
1. Set up the complete database schema
2. Create all API routes
3. Update the frontend to use the database
4. Add authentication
5. Set up file storage

Would you like me to implement one of these options?
