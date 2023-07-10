import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    profilePic: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    comment: {
      text: {
        type: String,
      },
      isSpoiler: {
        type: Boolean,
        default: false,
      },
      isReported: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Comment ||
  mongoose.model("Comment", commentSchema, "Comments");
