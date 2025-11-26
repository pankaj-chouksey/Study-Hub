import mongoose, { Schema, Model } from "mongoose";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string; // Optional for OAuth users
  avatar?: string;
  role: "student" | "admin";
  branch: string;
  year: string;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      // Not required because OAuth users won't have a password
      select: false, // Don't return password by default in queries
    },
    avatar: String,
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    branch: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
