const {Router} = require("express");
const { authMiddleware} =require("../middleware/authMiddleware");
const { getProfileInfo, updateProfileInfo, updateProfilePassword, otherUserProfile, getAllUsers } = require("../controllers/profileController");
const profileRouter = Router();

profileRouter.get("/me",authMiddleware,getProfileInfo);
profileRouter.put("/update",authMiddleware,updateProfileInfo);
profileRouter.patch("/password",authMiddleware,updateProfilePassword);
profileRouter.get("/user/:username",otherUserProfile)
profileRouter.get("/all",getAllUsers)

module.exports ={
    profileRouter
}