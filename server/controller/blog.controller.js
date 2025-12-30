import mongoose from "mongoose";
import Blog from "../models/BlogSchema.js";

// Create Blog
export const createBlog = async (req, res, next) => {
  const { title, topic, content } = req.body;

  const userId = req.userId;
  const userName = req.name;
  try {
    let blog = await new Blog({
      title,
      topic,
      content,
      author: {
        id: userId,
        name: userName,
      },
    });

    await blog.save();

    res
      .status(200)
      .json({ success: true, message: "Blog saved successfully...!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Get all blogs
export const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();

    res
      .status(200)
      .json({ success: true, messgae: "All blogs found", data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get single blog by ID
export const getSingleBlogById = async (req, res, next) => {
  const blogId = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res
        .status(400)
        .json({ success: false, message: "Blog Not Fund...!" });
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      res
        .status(404)
        .json({ success: false, message: "Blog not found with this ID" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Blog found", data: blog });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Edit blog
export const editBlog = async (req, res, next) => {
  const blogId = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Blog ID" });
    }

    const blog = await Blog.findById(blogId);

    await Blog.findByIdAndUpdate(blogId, { $set: req.body }, { new: true });

    return res.status(200).json({ success: true, message: "Blog Updated...!" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error...!" });
  }
};

// Delete blog
export const deleteBlog = async (req, res, next) => {
  const blogId = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Blog ID" });
    }

    await Blog.findByIdAndDelete(blogId);

    return res
      .status(200)
      .json({ success: true, message: "Blog Deleted successfully...!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get Blogs by Topic name
export const getBlogsByTopic = async (req, res, next) => {
  const reqTopic = req.params.topic;
  try {
    const blogs = await Blog.find({ topic: new RegExp(reqTopic, "i") });

    if (!blogs || blogs.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Blogs not found with topic" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Blogs found", data: blogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// get Blog by topic with query
export const getBlogsByTopicWithQuery = async (req, res, next) => {
  const reqTopic = req.query.topic;
  try {
    const blogs = await Blog.find({ topic: new RegExp(reqTopic, "i") });

    if (!blogs || blogs.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No blogs found with this topic" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Blogs found", data: blogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// get Blog by topic with multiple query
export const getBlogswithMultiQuery = async (req, res, next) => {
  const { topic } = req.query;
  console.log(topic);
  try {
    let query = {};

    query.topic = {
      $in: topic.map((curelm) => new RegExp(curelm, "i")),
    };

    const blogs = await Blog.find(query);

    if (!blogs || blogs.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No blogs found with these topics" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Blogs found", data: blogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
