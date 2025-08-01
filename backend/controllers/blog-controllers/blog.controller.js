const { uploadToCloudinary } = require("../../helpers/cloudinaryHelper");
const { Blog } = require("../../models/Blog");
const User = require("../../models/User");

async function addBlog(req, res) {
  try {
    const userId = req.userId;

    const user = await User.findOne({ _id: userId }).select("username email");

    if (!user) {
      return res.status(404).json({ message: "Something went wrong!" });
    }

    const { username, email } = user;

    let image1= null;
    if(req.file){
      const {url,public_id} = await uploadToCloudinary(req.file.path)
      image1 = {url,public_id};
    }


    const { title, content } = req.body;

    if (!content || !title) {
      return res.status(400).json({ message: "Title or Content is Empty!" });
    }
    
    

    const blog = await Blog.create({
      title,
      username,
      email,
      content,
      ...(image1 && {image:image1})
    });
    
    if(!blog){
      return res.status(400).json({message:"Blog not created"})
    }
    

    return res.json({ message: "Blog Posted!", success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error" });
  }
}

async function getAllBlog(req, res) {
  try {
    const blogs = await Blog.find();

    if (!blogs) {
      return res.json({ message: "No Blog found!" });
    }

    return res.status(200).json({ blogs,success:true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error" });
  }
}

async function getBlog(req, res) {
  try {
    const blogId = req.params.id;

    if (!blogId) {
      return res
        .status(404)
        .json({ message: "No Blog Found!", success: false });
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res
        .status(404)
        .json({ message: "No blog Found!", success: false });
    } else {
      return res.status(200).json({ blog, success:true });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Internal Server Error!", success: false });
  }
}

async function deleteBlog(req, res) {
  try {
    const blogId = req.params.id;
    const username = req.username;

    if (!blogId) {
      return res
        .status(404)
        .json({ message: "No Blog Found!", success: false });
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res
        .status(404)
        .json({ message: "No blog Found!", success: false });
    } else {
      if (username != blog.username) {
        return res
          .status(400)
          .json({ message: "You can't make changes in this" });
      } else {
        await Blog.deleteOne({ _id: blog._id });
        return res.status(200).json({ message: "Blog deleted", success: true });
      }
    }
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Internal Server Error!", success: false });
  }
}

module.exports = {
  addBlog,
  getAllBlog,
  getBlog,
  deleteBlog,
};
