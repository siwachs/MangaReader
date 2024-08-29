import { Schema, model, models, UpdateQuery, Document } from "mongoose";

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
    noOfViews: { type: Number, default: 0 },
    noOfSubscribers: { type: Number, default: 0 },
    author: { type: String, required: true },
    synonyms: [{ type: String }],
    chapters: [{ type: Schema.Types.ObjectId, ref: "Chapter" }],
    chaptersCount: { type: Number, default: 0 },
    chaptersUpdatedOn: { type: Date, default: () => new Date() },
    description: { type: String, required: true },
    imagesAndWallpapers: [{ type: String }],
    news: [{ type: Schema.Types.ObjectId, ref: "News" }],
  },
  { timestamps: true, validateBeforeSave: true },
);

// Presave and Find and Update middleware
ContentSchema.pre("save", function (next) {
  if (this.isModified("chapters")) this.chaptersCount = this.chapters.length;

  next();
});

ContentSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as UpdateQuery<Document>;

  if (update && Array.isArray(update.chapters))
    update.chaptersCount = update.chapters.length;

  next();
});

// Content Validation
ContentSchema.path("genres").validate(function (genres) {
  return genres.length > 0;
}, "Genres can't be empty.");

export default models.Content || model("Content", ContentSchema, "ContentList");
