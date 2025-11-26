# StudyHub - Collaborative Study Platform

A modern, production-ready study platform built with Next.js 15, featuring secure authentication, file uploads, and content management.

## ✨ Features

- 🔐 **Secure Authentication** - NextAuth.js with email/password and Google OAuth
- 📁 **File Uploads** - Cloudinary integration with 25GB free storage
- 💾 **Database** - MongoDB Atlas for data persistence
- 👥 **User Roles** - Student and Admin roles with different permissions
- ✅ **Content Approval** - Admin workflow for content moderation
- 🎨 **Modern UI** - Responsive design with dark mode support
- 🔍 **Search** - Find content across departments and subjects
- 💬 **Comments** - Discussion on uploaded content
- 🏆 **Leaderboard** - Gamification with points system
- 📱 **Mobile Friendly** - Works great on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account
- Cloudinary account (free)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd study-platform

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev
```

Visit `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

Create `.env.local` with:

```env
# MongoDB
MONGODB_URI=mongodb+srv://...

# NextAuth
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Development only
NEXT_PUBLIC_USE_LOCAL_UPLOAD=true
```

See `CLOUDINARY-QUICKSTART.md` for detailed setup instructions.

## 📚 Documentation

- **[FINAL-DEPLOYMENT-GUIDE.md](FINAL-DEPLOYMENT-GUIDE.md)** - Complete deployment guide
- **[CLOUDINARY-QUICKSTART.md](CLOUDINARY-QUICKSTART.md)** - Quick Cloudinary setup
- **[SECURITY-SUMMARY.md](SECURITY-SUMMARY.md)** - Security overview
- **[docs/NEXTAUTH-SETUP-COMPLETE.md](docs/NEXTAUTH-SETUP-COMPLETE.md)** - Authentication docs
- **[docs/CLOUDINARY-SETUP.md](docs/CLOUDINARY-SETUP.md)** - Detailed Cloudinary guide

## 🏗️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Mongoose
- **File Storage**: Cloudinary
- **Deployment**: Vercel

## 📦 Project Structure

```
study-platform/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── api/               # API routes
│   ├── departments/       # Department pages
│   └── ...
├── components/            # React components
│   ├── auth/             # Auth components
│   ├── layout/           # Layout components
│   └── ...
├── lib/                   # Utility functions
├── models/               # MongoDB models
├── docs/                 # Documentation
└── public/               # Static files
```

## 🔐 Security

- ✅ Passwords hashed with bcrypt
- ✅ JWT tokens with secure secrets
- ✅ HTTP-only cookies
- ✅ CSRF protection
- ✅ Input validation
- ✅ Environment variables for secrets
- ✅ Production-ready authentication

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

See [FINAL-DEPLOYMENT-GUIDE.md](FINAL-DEPLOYMENT-GUIDE.md) for detailed instructions.

### Environment Variables for Production

```env
MONGODB_URI=<your-mongodb-uri>
NEXTAUTH_SECRET=<generate-new-secret>
NEXTAUTH_URL=https://your-domain.vercel.app
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
```

## 📊 Features Overview

### For Students
- Browse content by department/branch/semester
- Upload study materials
- Comment on content
- Earn points for contributions
- View leaderboard

### For Admins
- Approve/reject uploaded content
- Manage users
- View analytics
- Moderate discussions

### Content Types
- 📝 Notes
- 🎥 Videos
- 📋 Past Year Questions (PYQs)
- ⭐ Important Questions

## 🎯 Roadmap

- [ ] Email verification
- [ ] Password reset
- [ ] User profiles
- [ ] Bookmarks/favorites
- [ ] Advanced search filters
- [ ] Notifications
- [ ] Mobile app

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues or questions:
- Check the [documentation](docs/)
- Review [troubleshooting guide](FINAL-DEPLOYMENT-GUIDE.md#troubleshooting)
- Open an issue on GitHub

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- shadcn for the beautiful UI components
- Vercel for hosting
- MongoDB Atlas for database
- Cloudinary for file storage

---

**Built with ❤️ by Pankaj Chouksey**

🚀 **Ready to deploy?** See [FINAL-DEPLOYMENT-GUIDE.md](FINAL-DEPLOYMENT-GUIDE.md)
