import { Schema, models, model } from "mongoose";

const ChapterSchema = new Schema(
  {
    title: { type: String, required: true },
    images: { type: [String], required: true },
    noOfViews: { type: Number, default: 0 },
    noOfLikes: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// Chapter Validation
ChapterSchema.path("images").validate(function (images) {
  return images.length > 0;
}, "Images can't be empty.");

export default models.Chapter || model("Chapter", ChapterSchema, "Chapters");
