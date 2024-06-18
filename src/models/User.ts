import { Schema, models, model } from "mongoose";

const VotedCommentSchema = new Schema(
  {
    commentId: String,
    voteType: { type: String, enum: ["up", "down"] },
  },
  { _id: false },
);

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
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
