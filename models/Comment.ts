import mongoose, { Schema, Model, Types } from "mongoose";

export interface IComment {
  _id: string;
  content: string;
  upvotes: number;
  authorId: Types.ObjectId;
  discussionId: Types.ObjectId;
  parentId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    content: {
      type: String,
      required: [true, "Please provide content"],
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    discussionId: {
      type: Schema.Types.ObjectId,
      ref: "Discussion",
      required: true,
      index: true,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  {
    timestamps: true,
  }
);

const Comment: Model<IComment> =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
