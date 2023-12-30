import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../controllers/userControllers.js";
import { protect, adminProtect } from "../middlewares/protectMiddleware.js";

const router = express.Router();

// Register User - POST - api/v1/users/register
router.route("/register").post(registerUser);

// Login User - POST - api/v1/users/login
router.route("/login").post(loginUser);

// Logout User - POST - api/v1/users/logout
router.route("/logout").post(logoutUser);

// Get All Users Data - GET - api/v1/users/all
router.route("/all").get(adminProtect, getAllUsers);

// Get Single User Data - GET - api/v1/users/profile/:id
router.route("/profile/:id").get(protect, getUserById);

// Update User Data - PUT - api/v1/users/profile/:id
router.route("/profile/:id").put(protect, updateUserById);

// Delete User Data - DELETE - api/v1/users/profile/:id
router.route("/profile/:id").delete(protect, deleteUserById);

export default router;
