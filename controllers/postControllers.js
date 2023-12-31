import { isValidObjectId } from "mongoose";
import Post from "../model/postModel.js";
import User from "../model/userModel.js";

// Create Blog-Post - POST - api/v1/posts/create
export const createPost = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newPost = await Post.create({
      title,
      description,
      user: req.user._id,
    });
    if (newPost) {
      const user = await User.findById(req.user._id);
      user.posts = [...user.posts, newPost];
      await user.save();
      res.status(201).json({
        newPost,
        message: "Post Created Successfully👍",
      });
    }
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

// Read Blog-Post - GET - api/v1/posts/:id
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.noOfViews = [...post.noOfViews, req.user._id];
    await post.save();
    if (post) {
      res.status(200).json({
        post,
        message: "Post Retrived👍",
      });
    }
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

// Update or Edit Blog-Post - PUT - api/v1/posts/:id
export const updatePostById = async (req, res) => {
  const user = await User.findById(req.user._id);
  const findPost = await Post.findById(req.params.id);
  try {
    if (findPost && user._id.toString() === findPost.user.toString()) {
      const updatingPost = await Post.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        { new: true }
      );
      res.status(200).json({
        updatingPost,
        message: "Post Updated Successfully👍",
      });
    } else {
      res.status(400).json({ message: "Read Only, Not Authorized" });
    }
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

// Delete User Data - DELETE - api/v1/posts/:id
export const deletePostById = async (req, res) => {
  const user = await User.findById(req.user._id);
  try {
    const findPost = await Post.findById(req.params.id);
    const userId = findPost.user;
    const userFromPost = await User.findById(userId);
    //Authentication
    if (
      findPost &&
      (userFromPost._id.toString() === req.user._id.toString() || user.isAdmin)
    ) {
      await Post.findByIdAndDelete(req.params.id);
      const findPostIndex = userFromPost.posts
        .map((postId) => postId.toString())
        .findIndex((ele) => ele === findPost._id.toString());
      userFromPost.posts.splice(findPostIndex, 1);
      await user.save();
      res.status(200).json({
        message: "Post Deleted😒",
      });
    }
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

// Get All Posts
export const getAllPosts = async (req, res) => {
  const allDatas = await Post.find({});
  try {
    res.status(200).json({
      allDatas,
      message: "All Posts Retrived👍",
    });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};
