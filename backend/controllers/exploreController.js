const User = require("../models/User");

async function getManyUsers(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 30;

    const skip = (page - 1) * limit;

    const users = await User.find().skip(skip).limit(limit);

    const totalUsers = await User.countDocuments();

    res.json({
      users,
      page,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
    console.log("Error:",error);
    
  }
}
// app.use("/api/v1/explore", exploreRouter);
async function getUsers(req,res){
    try {
        const username = req.params.username;

        const user = await User.findOne({username}).select("-password");

        if(!user){
           return res.status(404).json({message:"Not found",success:false});
        }

        console.log(user);

        res.json({user,success:true});


        

    } catch (error) {
        console.error(error);
    res.status(500).json({ message: "Server error", success: false });
    }
}

module.exports = {
    getManyUsers,getUsers
}