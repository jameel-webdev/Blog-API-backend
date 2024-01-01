// Importing Packages
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import { dbConnect } from "./config/dbConnect.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
// Assigning Port
const port = process.env.PORT || 6500;

// Connecting Database
dbConnect();

// Initiating Express
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/comments", commentRoutes);

app.get("/", (req, res) => {
  res.json({ message: `Welcome to Blog-API` });
});

// Error Middleware
app.use(notFound);
app.use(errorHandler);

// Server Start
app.listen(port, () => {
  console.log(`Server Running on ${port}`);
});
