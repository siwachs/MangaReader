import mongoose from "mongoose";

const contentSchema = mongoose.Schema(
  {
    contentType: [
      {
        type: String,
      },
    ],
    displayImageThumbnail: {
      image: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
    },
    displayImagePoster: {
      image: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
    },
    title: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    status: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    noOfViews: {
      type: Number,
      default: 0,
    },
    noOfLikes: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },

    tags: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Tag",
      },
    ],

    chapters: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Chapter",
      },
    ],

    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      },
    ],

    newChaptersAddedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

contentSchema.pre("save", function (next) {
  if (this.isNew) {
    this.newChaptersAddedAt = Date.now();
  }

  next();
});

export default mongoose.models.Content ||
  mongoose.model("Content", contentSchema, "ContentList");
