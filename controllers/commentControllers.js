import User from "../model/userModel.js";
import Post from "../model/postModel.js";
import Comment from "../model/commentModel.js";

// Comment On a Post - POST - api/v1/comments/:id --> post Id
export const postComment = async (req, res) => {
  const { comment } = req.body;
  const post = await Post.findById(req.params.id);
  const user = await User.findById(req.user._id);
  const neededDetails = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    followers: user.followers,
    following: user.following,
    isActive: user.isActive,
  };
  try {
    if (post) {
      const newComment = await Comment.create({
        post,
        user: neededDetails,
        comment,
      });
      res.status(201).json({
        newComment,
        message: "Comments Posted👍",
      });
    }
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

// Get All Comments On Single Post - GET - api/v1/comments/:id --> post Id
export const getAllComments = async (req, res) => {
  const allDatas = await Comment.find({});
  try {
    res.status(201).json({
      allDatas,
      message: "Comments Posted👍",
    });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

// Get Comment By Id - GET - api/v1/comments/:id --> Comment Id
export const getCommentById = async (req, res) => {
  const getComment = await Comment.findById(req.params.id);
  try {
    if (getComment) {
      res.status(201).json({
        getComment,
        message: "Comment Retrived👍",
      });
    }
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

// Update or Edit Comment - PUT - api/v1/comments/:id --> Comment Id
export const updateComment = async (req, res) => {
  const getComment = await Comment.findById(req.params.id);
  try {
    if (getComment) {
      const updateComment = await Comment.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        { new: true }
      );
      res.status(201).json({
        updateComment,
        message: "Comment Updated👍",
      });
    }
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

// Delete Comment - DELETE - api/v1/comments/:id --> Comment Id
export const deleteComment = async (req, res) => {
  const getComment = await Comment.findById(req.params.id);
  try {
    if (getComment) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(201).json({
        message: "Comment Deleted👍",
      });
    }
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};
