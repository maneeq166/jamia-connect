const {
  addBlog,
  getAllBlog,
  getBlog,
  deleteBlog,
  addVote,
  removeVote,
} = require("../controllers/blog-controllers/blog.controller");
const { authMiddleware } = require("../middleware/authMiddleware");
const { Router } = require("express");
const { uploadMiddleware } = require("../middleware/uploadMiddleware");
const blogRouter = Router();

blogRouter.post(
  "/add-blog",
  authMiddleware,
  uploadMiddleware.single("image"),
  addBlog
);
blogRouter.get("/get-all-blogs", getAllBlog);
blogRouter.get("/get-blog/:id", getBlog);
blogRouter.delete("/delete-blog/:id", authMiddleware, deleteBlog);
blogRouter.patch("/add-vote", authMiddleware, addVote);
blogRouter.patch("/remove-vote", authMiddleware, removeVote);

module.exports = blogRouter;
