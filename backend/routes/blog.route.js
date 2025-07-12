const { addBlog, getAllBlog, getBlog, deleteBlog } = require('../controllers/blog-controllers/blog.controller');
const {authMiddleware} = require("../middleware/authMiddleware")
const {Router} = require("express");
const blogRouter = Router()


blogRouter.post("/add-blog",authMiddleware,addBlog);
blogRouter.get("/get-all-blogs",getAllBlog);
blogRouter.get("/blog/:id",getBlog);
blogRouter.delete("/delete/:id",authMiddleware,deleteBlog);


module.exports = blogRouter;