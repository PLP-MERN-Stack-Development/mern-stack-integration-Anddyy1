// server/server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import postRoutes from "./routes/postRoutes.js";       // Posts routes
import categoryRoutes from "./routes/categoryRoutes.js"; // Categories routes
import userRoutes from "./routes/userRoutes.js";       // Users routes

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded images

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------- ROUTES ----------------
app.use("/api/posts", postRoutes);         // Posts routes
app.use("/api/categories", categoryRoutes); // Categories routes
app.use("/api/users", userRoutes);         // Users routes

// ---------------- MONGODB CONNECTION ----------------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ---------------- SERVER START ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌍 Server running on http://localhost:${PORT}`));
