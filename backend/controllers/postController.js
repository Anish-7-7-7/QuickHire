
const Post = require("../model/Post");

exports.createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    const newPost = await Post.create({ title, description, user: userId });

    res.status(201).json({
      success: true,
      data: newPost,
      message: "Post Created",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getMyPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const posts = await Post.find({ user: userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching your posts" });
  }
};


exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    // Check if the post belongs to the user
    if (post.user.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await Post.findByIdAndDelete(postId);

    res.json({ success: true, message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

