import mongoose from "mongoose";

//postSchema
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post Title is required"],
      trim: true, // remove white spacing around title
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Post Category is required"],
    },
    noOfViews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    disLikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    photo: {
      type: String,
      required: [true, "Post Image is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", postSchema);
