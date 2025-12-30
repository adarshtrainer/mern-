import express from "express";
import {
  createBlog,
  deleteBlog,
  editBlog,
  getAllBlogs,
  getBlogsByTopic,
  getBlogsByTopicWithQuery,
  getBlogswithMultiQuery,
  getSingleBlogById,
} from "../controller/blog.controller.js";
import { authorize } from "../auth/verification.js";

const router = express.Router();

// http://localhost:3000/api/v1/blog/createblog
router.post("/createblog", authorize, createBlog);
// http://localhost:3000/api/v1/blog/getallblogs
router.get("/getallblogs", getAllBlogs);
// http://localhost:3000/api/v1/blog/getsingleblog/123456789
router.get("/getsingleblog/:id", getSingleBlogById);
// http://localhost:3000/api/v1/blog/editblog/1235456
router.put("/editblog/:id", authorize, editBlog);
// http://localhost:3000/api/v1/blog/deleteblog/12586485
router.delete("/deleteblog/:id", authorize, deleteBlog);
// http://localhost:3000/api/v1/blog/getblogsbytopic/javascript
router.get("/getblogsbytopic/:topic", getBlogsByTopic);
//  http://localhost:3000/api/v1/blog/getblogsbytopicwithquery/?topic=js
router.get("/getblogsbytopicwithquery", getBlogsByTopicWithQuery);
// http://localhost:3000/api/v1/blog/getblogswithmultiquery/?topic=js&topic=html
router.get("/getblogswithmultiquery", getBlogswithMultiQuery);

export default router;
