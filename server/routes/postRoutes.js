// routes/postRoutes.js
import express from "express";
import multer from "multer";
import slugify from "slugify";
import Post from "../models/Post.js";

const router = express.Router();

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ---------------- CREATE POST ----------------
router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { title, content, author, category } = req.body;
    if (!title || !content || !author || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const slug = slugify(title, { lower: true, strict: true });

    const newPost = new Post({
      title,
      slug,
      content,
      author,
      category,
      image: req.file ? `/uploads/${req.file.filename}` : "",
    });

    await newPost.save();
    res.status(201).json({
      success: true,
      message: "✅ Post created successfully",
      data: newPost,
    });
  } catch (error) {
    console.error("❌ Error creating post:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

// ---------------- GET ALL POSTS ----------------
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author category")
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
});

// ---------------- GET SINGLE POST BY ID ----------------
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author category");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
