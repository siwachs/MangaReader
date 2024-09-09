import { Schema, models, model } from "mongoose";

const VotedCommentSchema = new Schema(
  {
    commentId: { type: String, required: true },
    contentId: { type: String, required: true },
    chapterId: { type: String, default: null },
    voteType: { type: String, enum: ["up", "down"] },
  },
  { _id: false },
);

const UserSchema = new Schema(
  {
    name: { type: String },
    username: {
      type: String,
      unique: true,
      sparse: true,
    },
    email: { type: String, required: true, unique: true },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    avatar: { type: String },
    subscriptions: [{ type: Schema.Types.ObjectId, ref: "Content" }],
    likedChapters: [{ type: Schema.Types.ObjectId, ref: "Chapter" }],
    votedComments: [VotedCommentSchema],
    emailVerified: { type: Boolean, default: null },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default models.User || model("User", UserSchema, "Users");
