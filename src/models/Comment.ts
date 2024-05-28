import { Schema, models, model } from "mongoose";

const CommentSchema = new Schema(
  {
    parentId: { type: Schema.Types.ObjectId, ref: "Comment" },
    message: { type: String, required: true },
    contentId: { type: String, required: true },
    chapterId: { type: String, default: null },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    flag: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Comment = models.Comment || model("Comment", CommentSchema);
export default Comment;
