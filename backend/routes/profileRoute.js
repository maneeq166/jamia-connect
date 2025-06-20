const {Router} = require("express");
const { authMiddleware} =require("../middleware/authMiddleware");
const { getProfileInfo, updateProfileInfo, updateProfilePassword, otherUserProfile, getAllUsers } = require("../controllers/profile-controllers/profileController");
const { uploadImage } = require("../controllers/profile-controllers/profileImgController");
const { uploadMiddleware } = require("../middleware/uploadMiddleware");
const profileRouter = Router();

profileRouter.get("/me",authMiddleware,getProfileInfo);
profileRouter.put("/update",authMiddleware,updateProfileInfo);
profileRouter.patch("/password",authMiddleware,updateProfilePassword);
profileRouter.get("/user/:username",otherUserProfile)
profileRouter.get("/all",getAllUsers)
profileRouter.patch(
  "/avatar",
  authMiddleware,
  uploadMiddleware.single("image"),
  uploadImage
);



module.exports ={
    profileRouter
}