const User = require("../../models/User");
const { z } = require("zod");
const bcrypt = require("bcrypt");

async function getProfileInfo(req, res) {
  const userId = req.userId;

  if (!userId) {
    res.status(404).json({ message: "User not signed up" });
  }

  const user = await User.findOne({ _id: userId }).select("-password");

  if (!user) {
    return res.status(400).json({ message: "User does not exists" });
  }

  res.json({ user });
}

async function updateProfileInfo(req, res) {
  const userId = req.userId;
  if (!userId) {
    res.status(404).json({ message: "User not signed up" });
  }

  const requiredBody = z.object({
    username: z.string().min(3).max(15).optional(),
    email: z.string().email().optional(),
    state: z.string().optional(),
    department: z.string().optional(),
    year: z.number().optional(),
    bio: z.string().optional(),
    links: z.array(z.string().url()).max(4).optional(), // checks whether the links array or not and if the inside is link or not
  });

  const parsedBody = requiredBody.safeParse(req.body);

  if (!parsedBody.success) {
    return res
      .status(400)
      .json({ message: "Invalid input", error: parsedBody.error });
  }

  console.log(parsedBody);

  try {
    const data = parsedBody.data;
    // const user = await User.findOneAndUpdate({ _id: userId },{$set: data},{new:true}).select("-password");
    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (data.username) user.username = data.username;
    if (data.email) user.email = data.email;
    if (data.state) user.state = data.state;
    if (data.department) user.department = data.department;
    if (data.year) user.year = data.year;
    if (data.bio) user.bio = data.bio;
    if (data.links) user.links = data.links;

    await user.save();

    res.json({
      message: "User updated succesfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error" });
  }
}

async function updateProfilePassword(req, res) {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword || newPassword.length < 6) {
    return res.status(400).json({ message: "Invalid password data" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Incorrect current password" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


async function otherUserProfile(req, res) {
  try {
    const username = req.params.username;

    if (!username)
      return res.status(400).json({ message: "likh de naam bhai" });

    const user = await User.findOne({ username }).select("-password");

    if (!user)
      return res.status(404).json({ message: "isne kabhi id nhi baniye" });

    console.log("Searched User:", user);

    return res.json({
      message: "Here is your result",
      user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find().select("-password");
    users.select("-links")

    return res.json({
      message: "Here are all the users",
      users,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}



module.exports = {
  getProfileInfo,
  updateProfileInfo,
  updateProfilePassword,
  otherUserProfile,
  getAllUsers
};
