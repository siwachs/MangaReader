import { Schema, models, model } from "mongoose";

const CommentSchema = new Schema(
  {
    parentId: { type: String, default: "root" },
    message: { type: String, required: true },
    contentId: { type: String, required: true },
    chapterId: { type: String, default: null },
    user: { type: Schema.Types.ObjectId, ref: "User", reqired: true },
    upVotes: { type: Number, default: 0 },
    downVotes: { type: Number, default: 0 },
    isEdited: { type: Boolean, default: false },
    isReported: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default models.Comment || model("Comment", CommentSchema, "Comments");
