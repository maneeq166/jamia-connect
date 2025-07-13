const { addBlog, getAllBlog, getBlog, deleteBlog } = require('../controllers/blog-controllers/blog.controller');
const {authMiddleware} = require("../middleware/authMiddleware")
const {Router} = require("express");
const { uploadMiddleware } = require('../middleware/uploadMiddleware');
const blogRouter = Router()


blogRouter.post("/add-blog",authMiddleware,uploadMiddleware.single("image"),addBlog);
blogRouter.get("/get-all-blogs",getAllBlog);
blogRouter.get("/get-blog/:id",getBlog);
blogRouter.delete("/delete-blog/:id",authMiddleware,deleteBlog);


module.exports = blogRouter;