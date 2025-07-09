const fs = require("fs");
const { pyqHelper } = require("../helpers/pyq.helper");
const { Pyq } = require("../models/Pyq");

async function sendPyq(req, res) {
  try {
    const userId = req.userId;
    const { content, department, year, subject } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ message: "File is required", success: false });
    }

    const { url, public_id } = await pyqHelper(req.file.path);

    fs.unlinkSync(req.file.path);

    if (!url || !public_id) {
      return res
        .status(404)
        .json({ message: "File not found", success: false });
    }

    const pyqUploaded = await Pyq.create({
      username: userId,
      content,
      department,
      year,
      subject,
      url: {
        url: url,
        public_id: public_id,
      },
    });

    if (!pyqUploaded) {
      return res
        .status(404)
        .json({ message: "File not found", success: false });
    } else {
      return res.status(200).json({ message: "File uploaded", success: true });
    }

    //     const {username,content,department,year,subject} = req.body;

    // if(!username || year || !department || !subject){
    //     return res.status(400).json({
    //         message:"Input fields can't be empty",
    //         success:false
    //     })
    // }

    // const userExists = await User.findOne({id:username});

    // if(userExists){
    //     const pyq = await Pyq.create({
    //         department,
    //         subject,
    //         year,
    //         username,
    //         content
    //     })

    //     if(pyq){
    //         return res.status(200).json({
    //             message:"Material posted",
    //             success:true
    //         })
    //     }else{
    //         return res.status(400).json({
    //             message:"Something went wrong",
    //             success:false
    //         })
    //     }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server error",
      success: false,
    });
    console.log(error);
  }
}

module.exports = {
  sendPyq,
};
