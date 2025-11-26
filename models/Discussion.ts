import mongoose, { Schema, Model, Types } from "mongoose";

export interface IDiscussion {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  upvotes: number;
  views: number;
  authorId: Types.ObjectId | string;
  createdAt: Date;
  updatedAt: Date;
}

const DiscussionSchema = new Schema<IDiscussion>(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    content: {
      type: String,
      required: [true, "Please provide content"],
    },
    tags: {
      type: [String],
      default: [],
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Discussion: Model<IDiscussion> =
  mongoose.models.Discussion ||
  mongoose.model<IDiscussion>("Discussion", DiscussionSchema);

export default Discussion;
