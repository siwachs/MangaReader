import { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    subscriptions: [{ type: Schema.Types.ObjectId, ref: "Content" }],
    likedChapters: [{ type: Schema.Types.ObjectId, ref: "Chapter" }],
    votedComments: [
      { commentId: String, voteType: { type: String, enum: ["up", "down"] } },
    ],
    emailVerified: { type: Boolean, default: null },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default models.User || model("User", UserSchema, "Users");
