import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import blogRoutes from "./routes/blog.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

const corsPolicy = {
  origin: ["http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "authorization"],
  exposedHeaders: ["Content-Type"],
};

// middlewares
app.use(cors(corsPolicy));
app.use(express.json());
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("DB connected");
  } catch (error) {
    console.log("DB Error", error);
  }
};

connectDB().then(() => {
  app.listen(port, () => console.log(`Server running in ${port}`));
});
