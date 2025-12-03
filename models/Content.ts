import mongoose, { Schema, Model, Types } from "mongoose";
import { IUser } from "./User";

export interface IContent {
  _id: string;
  title: string;
  description: string;
  type: "note" | "video" | "pyq" | "important" | "syllabus" | "timetable";
  fileUrl?: string;
  videoUrl?: string;
  thumbnail?: string;
  department: string;
  branch: string;
  year: string;
  subject: string;
  topic: string;
  uploaderId: Types.ObjectId | IUser;
  status: "pending" | "approved" | "rejected";
  rating: number;
  views: number;
  downloads: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ContentSchema = new Schema<IContent>(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
    type: {
      type: String,
      enum: ["note", "video", "pyq", "important", "syllabus", "timetable"],
      required: true,
    },
    fileUrl: String,
    videoUrl: String,
    thumbnail: String,
    department: {
      type: String,
      required: true,
      index: true,
    },
    branch: {
      type: String,
      required: true,
      index: true,
    },
    year: {
      type: String,
      required: true,
      index: true,
    },
    subject: {
      type: String,
      required: false,
      default: "",
      index: true,
    },
    topic: {
      type: String,
      required: false,
      default: "",
    },
    uploaderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    downloads: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to ensure optional fields have defaults
ContentSchema.pre("save", function (next) {
  // Ensure description, subject, and topic have default values if not provided
  if (!this.description) {
    this.description = "";
  }
  if (!this.subject) {
    this.subject = "";
  }
  if (!this.topic) {
    this.topic = "";
  }
  next();
});

// Compound index for efficient queries
ContentSchema.index({ department: 1, branch: 1, year: 1, subject: 1 });
ContentSchema.index({ status: 1, createdAt: -1 });

// Delete existing model if it exists to force recompilation with new schema
if (mongoose.models.Content) {
  delete mongoose.models.Content;
}

const Content: Model<IContent> = mongoose.model<IContent>("Content", ContentSchema);

export default Content;
