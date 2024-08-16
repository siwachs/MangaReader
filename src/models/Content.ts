import { Schema, model, models } from "mongoose";

const ContentSchema = new Schema(
  {
    tags: [
      {
        type: String,
        enum: [
          "BannerContent",
          "ReadWithEditor",
          "CompletedClassic",
          "WeeklyNovel",
          "FreeRead",
        ],
      },
    ],
    thumbnail: { type: String, required: true },
    poster: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    status: {
      type: String,
      required: true,
      enum: [
        "Ongoing",
        "Discontinued",
        "Abandoned",
        "Unscheduled",
        "Completed",
      ],
    },
    genres: [
      {
        type: Schema.Types.ObjectId,
        ref: "Genre",
        required: true,
      },
    ],
    rating: { type: Number, default: 0, min: 0, max: 10 },
    author: { type: String, required: true },
    synonyms: [{ type: String }],
    chapters: [{ type: Schema.Types.ObjectId, ref: "Chapter" }],
    description: { type: String, required: true },
    imagesAndWallpapers: [{ type: String }],
    news: [{ type: Schema.Types.ObjectId, ref: "News" }],
  },
  { timestamps: true, validateBeforeSave: true },
);

ContentSchema.path("genres").validate(function (genres) {
  return genres.length > 0;
}, "Genres can't be empty");

export default models.Content || model("Content", ContentSchema, "ContentList");
