// Importing Packages
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { dbConnect } from "./config/dbConnect.js";

// Assigning Port
const port = process.env.PORT || 6500;

// Connecting Database
dbConnect();

// Initiating Express
const app = express();

// Middlewares
// Routes
// Server Start
app.get("/", (req, res) => {
  res.json({ message: `Welcome to Blog-API` });
});
app.listen(port, () => {
  console.log(`Server Running on ${port}`);
});
