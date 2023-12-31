import express from "express";
import {
  deleteComment,
  getAllComments,
  getCommentById,
  postComment,
  updateComment,
} from "../controllers/commentControllers.js";
import { protect } from "../middlewares/protectMiddleware.js";

const router = express.Router();

// Comment On a Post - POST - api/v1/comments/:id --> post Id
router.route("/:id").post(protect, postComment);

// Get All Comments On Single Post - GET - api/v1/comments/:id --> post Id
router.route("/").get(protect, getAllComments);

// Get Comment By Id - GET - api/v1/comments/:id --> Comment Id
router.route("/:id").get(protect, getCommentById);

// Update or Edit Comment - PUT - api/v1/comments/:id --> Comment Id
router.route("/:id").put(protect, updateComment);

// Delete Comment - DELETE - api/v1/comments/:id --> Comment Id
router.route("/:id").delete(protect, deleteComment);

export default router;
