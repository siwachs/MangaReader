import { Schema, models, model } from "mongoose";

const SessionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sessionToken: { type: String, required: true, unique: true },
    expires: { type: Date, required: true },
  },
  { timestamps: true },
);

export default models.Session || model("Session", SessionSchema, "Sessions");
