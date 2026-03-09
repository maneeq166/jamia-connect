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
const { runValidations, addBlogValidator, blogIdParam, voteValidator } = require("../middleware/validators");

blogRouter.post(
  "/add-blog",
  authMiddleware,
  // multer must run before validation so req.body is populated for multipart/form-data
  uploadMiddleware.single("image"),
  runValidations(addBlogValidator()),
  addBlog
);
blogRouter.get("/get-all-blogs", getAllBlog);
blogRouter.get("/get-blog/:id", runValidations(blogIdParam()), getBlog);
blogRouter.delete("/delete-blog/:id", authMiddleware, runValidations(blogIdParam()), deleteBlog);
blogRouter.patch("/add-vote", authMiddleware, runValidations(voteValidator()), addVote);
blogRouter.patch("/remove-vote", authMiddleware, runValidations(voteValidator()), removeVote);

module.exports = blogRouter;
