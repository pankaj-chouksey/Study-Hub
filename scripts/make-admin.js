// Script to make a user admin
// Usage: node scripts/make-admin.js <email>

const mongoose = require('mongoose');

async function makeAdmin(email) {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI not found in environment variables');
    }

    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find user by email
    const User = mongoose.model('User', new mongoose.Schema({
      email: String,
      role: String,
    }));

    const user = await User.findOne({ email });
    
    if (!user) {
      console.error(`User with email ${email} not found`);
      process.exit(1);
    }

    // Update role to admin
    user.role = 'admin';
    await user.save();

    console.log(`✅ Successfully made ${email} an admin!`);
    console.log(`User can now access: https://your-domain.vercel.app/admin`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Get email from command line
const email = process.argv[2];

if (!email) {
  console.error('Usage: node scripts/make-admin.js <email>');
  process.exit(1);
}

makeAdmin(email);
