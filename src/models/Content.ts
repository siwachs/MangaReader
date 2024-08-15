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
    poster: { type: String, required: true },
    thumbnail: { type: String, required: true },
    title: { type: String, requred: true, unique: true },
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
        validate: {
          validator: function (v: any[]) {
            return v.length > 0;
          },
          message: "Genres can't be empty.",
        },
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
  { timestamps: true },
);

export default models.Content || model("Content", ContentSchema, "ContentList");
