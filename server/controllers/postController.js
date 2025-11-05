const Post = require("../models/Post");
const slugify = require("slugify");

// ---------------- CREATE POST ----------------
exports.createPost = async (req, res) => {
  try {
    const { title, content, category, author } = req.body;

    if (!title || !content || !category || !author) {
      return res.status(400).json({
        success: false,
        message: "All fields (title, content, category, author) are required.",
      });
    }

    // Generate unique slug
    const slug = slugify(title, { lower: true, strict: true });

    // Check if a post with the same slug already exists
    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
      return res.status(400).json({
        success: false,
        message: "A post with this title already exists. Try another title.",
      });
    }

    const newPost = await Post.create({
      title,
      content,
      category,
      author,
      slug,
    });

    res.status(201).json({
      success: true,
      message: "✅ Post created successfully!",
      data: newPost,
    });
  } catch (error) {
    console.error("❌ Error creating post:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating post.",
      error: error.message,
    });
  }
};

// ---------------- GET ALL POSTS ----------------
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("category author", "name");
    res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    console.error("❌ Error fetching posts:", error);
    res.status(500).json({ success: false, message: "Failed to fetch posts." });
  }
};

// ---------------- GET SINGLE POST ----------------
exports.getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .populate("category author", "name");

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found." });
    }

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    console.error("❌ Error fetching post:", error);
    res.status(500).json({ success: false, message: "Failed to fetch post." });
  }
};

// ---------------- DELETE POST ----------------
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found." });
    }

    res.status(200).json({ success: true, message: "🗑️ Post deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting post:", error);
    res.status(500).json({ success: false, message: "Failed to delete post." });
  }
};
