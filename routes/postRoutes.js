import express from "express";
import {
  createPost,
  deletePostById,
  getAllPosts,
  getPostById,
  updatePostById,
} from "../controllers/postControllers.js";
import { protect } from "../middlewares/protectMiddleware.js";

const router = express.Router();

// Create Blog-Post - POST - api/v1/posts/create
router.route("/create").post(protect, createPost);

// Read Blog-Post - GET - api/v1/posts/:id
router.route("/:id").get(protect, getPostById);

// Update or Edit Blog-Post - PUT - api/v1/posts/:id
router.route("/:id").put(protect, updatePostById);

// Delete User Data - DELETE - api/v1/posts/:id
router.route("/:id").delete(protect, deletePostById);

// Get All Posts
router.route("/").get(getAllPosts);

export default router;
