const { uploadToCloudinary } = require("../../helpers/cloudinaryHelper");
const User = require("../../models/User");

async function uploadImage(req, res) {
  try {
  const id = req.userId;
  if (!req.file) {
    return res
      .status(400)
      .json({ message: "File is required", success: false });
  }

  const { url, public_id } = await uploadToCloudinary(req.file.path);

  if(!url || !public_id){
    return res
      .status(400)
      .json({ message: "url and public_id not present", success: false });
  }

  const newUploadedImage = await User.findByIdAndUpdate(
    id,
    {
      avatar: {
        url: url,
        public_id: public_id,
      },
    },
    { new: true } // return the updated document
  );
  if(!newUploadedImage){
    return res
      .status(400)
      .json({ message: "Db me save nhi hui", success: false });
  }

  res.status(200).json({message:"Lag gyi pfp",success:true})

  
  } catch (error) {
    console.log(error);
   return  res.status(500).json({ message: "tod diya bhai server", success: false });
  }
}


module.exports ={
    uploadImage
}