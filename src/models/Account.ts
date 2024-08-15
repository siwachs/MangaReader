import { Schema, models, model } from "mongoose";

const AccountSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    provider: { type: String, required: true },
    type: { type: String, required: true },
    providerAccountId: { type: String, required: true },
    access_token: { type: String },
    id_token: { type: String },
    expires_at: { type: Number },
    scope: { type: String },
    token_type: { type: String },
  },
  { timestamps: true },
);

export default models.Account || model("Account", AccountSchema, "Accounts");
