import mongoose from "mongoose";

const chapterSchema = mongoose.Schema(
  {
    chapterTitle: {
      type: String,
      required: true,
      lowercase: true,
    },
    noOfViews: {
      type: Number,
      default: 0,
    },
    noOfLikes: {
      type: Number,
      default: 0,
    },
    chapterImages: [
      {
        type: String,
      },
    ],
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Chapter ||
  mongoose.model("Chapter", chapterSchema, "Chapters");
