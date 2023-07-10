import mongoose from "mongoose";

const tagSchema = mongoose.Schema({
  tagId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: function (value) {
      return !/\s/.test(value);
    },
    message: "Whitespace is not allowed in tagId",
  },
  tagName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
});

export default mongoose.models.Tag || mongoose.model("Tag", tagSchema, "Tags");
