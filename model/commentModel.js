import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Post is required"],
    },
    user: {
      type: Object,
      required: [true, "User is required"],
    },
    comment: {
      type: String,
      required: [true, "Comment description is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Comment", commentSchema);
