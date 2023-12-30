import User from "../model/userModel.js";
import {
  compareHashPassword,
  generateHashedPassword,
} from "../utils/generateHashedPassword.js";
import { generateToken } from "../utils/genarateToken.js";

// Register User - POST - api/v1/users/register
export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, profilePhoto } = req.body;
  try {
    // Check if User Exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(200).json({
        message: "User already exists😒",
      });
    }
    // Register New User
    const hashedPassword = await generateHashedPassword(password);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      generateToken(res, newUser._id);
      res.status(201).json({
        newUser,
        message: "Registration Successfull👍",
      });
    }
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

// Login User - POST - api/v1/users/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Email & password Check
    const validUser = await User.findOne({ email });
    const validPassword = await compareHashPassword(
      password,
      validUser.password
    );
    if (validUser && validPassword) {
      generateToken(res, validUser._id);
      res.status(200).json({
        validUser,
        message: "User Logged In👍",
      });
    }
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

// Logout User - POST - api/v1/users/logout
export const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({
      message: "User Logged Out👎",
    });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};
// Get All Users Data - GET - api/v1/users/all
export const getAllUsers = async (req, res) => {
  try {
    res.status(200).json({
      message: "All Users Data Retrived👍",
    });
  } catch (error) {
    res.status(500).json({
      Error: error.message,
    });
  }
};

// Get Single User Data - GET - api/v1/users/profile/:id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json({
        user,
        message: "User Data Retrived👍",
      });
    } else {
      res.status(400).json({ message: "User Data Not Available👎" });
    }
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

// Update User Data - PUT - api/v1/users/profile/:id
export const updateUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = await generateHashedPassword(req.body.password);
      }
      const updatingUser = await user.save();
      res.status(200).json({
        updatingUser,
        message: "User Data Updated👍",
      });
    }
  } catch (error) {
    res.status(500).json({
      Error: error.message,
    });
  }
};

// Delete User Data - DELETE - api/v1/users/profile/:id
export const deleteUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: "User Data Deleted☹️",
      });
    }
  } catch (error) {
    res.status(500).json({
      Error: error.message,
    });
  }
};
