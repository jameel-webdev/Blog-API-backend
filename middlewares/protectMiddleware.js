import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const protect = async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  try {
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select("-password");
        next();
      } catch (err) {
        res.status(401).json({ message: "Not Authorized, Invalid Token" });
      }
    } else {
      res.status(401).json({ message: "Not Authorized, No Token" });
    }
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

export const adminProtect = async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  try {
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select("-password");
        if (req.user.isAdmin) {
          next();
        } else {
          res.status(401).json({ message: "Not Authorized" });
        }
      } catch (err) {
        res.status(401).json({ message: "Not Authorized , Admin Access Only" });
      }
    } else {
      res.status(401).json({ message: "Not Authorized, Only Admin" });
    }
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};
