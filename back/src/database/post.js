import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
  title: { type: String, required: true },
  userID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
  description: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String },
}, { timestamps: true });

export const PostModel = mongoose.model("post", PostSchema);

