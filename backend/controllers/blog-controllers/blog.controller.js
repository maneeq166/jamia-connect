const { Blog } = require("../../models/Blog");
const User = require("../../models/User");

async function addBlog(req, res) {
  try {
    const userId = req.userId;

    const user = await User.findOne({ _id: userId }).select("username email");

    const { username, email } = user;
    if (!user) {
      return res.status(404).json({ message: "Something went wrong!" });
    }

    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is Empty!" });
    }

    const blog = await Blog.create({
      username,
      email,
      content,
    });

    return res.json({ messasge: "Blog Posted!", success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error" });
  }
}

async function getAllBlog(req, res) {
    try {
        const blogs = await Blog.find();

    if(!blogs){
        return res.json({message:"No Blog found!"})
    }

    return res.status(200).json({blogs});
    } catch (error) {
        console.log(error);
    res.status(500).json({ message: "Internal Server error" });
    }
    

}

async function getBlog(req, res) {}

async function deleteBlog(req, res) {}

module.exports = {
  addBlog,
  getAllBlog,
  getBlog,
  deleteBlog,
};
