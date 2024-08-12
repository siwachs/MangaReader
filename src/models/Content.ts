import { Schema, model, models } from "mongoose";

const ContentSchema = new Schema({
  poster: { type: String, required: true },
  thumbnail: { type: String, required: true },
  title: { type: String, requred: true, unique: true },
  status: {
    type: String,
    required: true,
    enum: ["Ongoing", "Discontinued", "Abandoned", "Unscheduled", "Completed"],
  },
  rating: { type: Number, default: 0, min: 0, max: 10 },
  author: { type: String, required: true },
  synonyms: [{ type: String }],
  chapters: [{ type: Schema.Types.ObjectId, ref: "Chapter" }],
  description: { type: String, required: true },
  imagesAndWallpapers: [{ type: String }],
  news: [{ type: Schema.Types.ObjectId, ref: "News" }],
});

export default models.Content || model("Content", ContentSchema, "ContentList");
