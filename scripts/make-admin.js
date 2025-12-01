// Script to make a user admin
// Usage: node scripts/make-admin.js <email>
//
// Make sure MONGODB_URI is set in your environment:
//   Windows PowerShell: $env:MONGODB_URI="your-connection-string"
//   Windows CMD: set MONGODB_URI=your-connection-string
//   Mac/Linux: export MONGODB_URI="your-connection-string"
//   Or set it in .env.local file (Next.js will load it automatically)

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Try to load .env.local if it exists
try {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
      const match = line.match(/^([^=:#]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/^["']|["']$/g, '');
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    });
  }
} catch (error) {
  // Ignore if .env.local doesn't exist or can't be read
}

async function makeAdmin(email) {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI not found in environment variables. Make sure it\'s set in .env.local');
    }

    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Use the actual User model schema
    const UserSchema = new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      avatar: String,
      role: {
        type: String,
        enum: ['student', 'admin'],
        default: 'student'
      },
      branch: String,
      year: String,
      points: Number,
      createdAt: Date,
      updatedAt: Date
    }, { timestamps: true });

    // Check if model already exists, otherwise create it
    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      console.error(`❌ User with email ${email} not found`);
      console.error('   Make sure you have created an account first at /signup');
      await mongoose.disconnect();
      process.exit(1);
    }

    if (user.role === 'admin') {
      console.log(`ℹ️  User ${email} is already an admin`);
      await mongoose.disconnect();
      process.exit(0);
    }

    // Update role to admin
    user.role = 'admin';
    await user.save();

    console.log(`✅ Successfully made ${email} an admin!`);
    console.log(`📝 User can now access:`);
    console.log(`   - Local: http://localhost:3000/admin`);
    console.log(`   - Production: https://your-domain.vercel.app/admin`);
    console.log(`\n⚠️  Important: Logout and login again to refresh your session!`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.message.includes('MONGODB_URI')) {
      console.error('\n💡 Tip: Make sure MONGODB_URI is set in .env.local file');
    }
    process.exit(1);
  }
}

// Get email from command line
const email = process.argv[2];

if (!email) {
  console.error('❌ Usage: node scripts/make-admin.js <email>');
  console.error('   Example: node scripts/make-admin.js admin@example.com');
  process.exit(1);
}

makeAdmin(email);
