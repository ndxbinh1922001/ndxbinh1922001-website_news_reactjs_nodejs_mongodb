import mongoose from "mongoose";
const uncheckPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const UncheckPost = mongoose.model("UncheckPost", uncheckPostSchema);
export default UncheckPost;
