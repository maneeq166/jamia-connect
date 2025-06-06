const {Router} = require("express");
const { authMiddleware} =require("../middleware/authMiddleware");
const { getProfileInfo, updateProfileInfo, updateProfilePassword } = require("../controllers/profileController");
const profileRouter = Router();

profileRouter.get("/me",authMiddleware,getProfileInfo);
profileRouter.put("/update",authMiddleware,updateProfileInfo);
profileRouter.patch("/password",authMiddleware,updateProfilePassword);

module.exports ={
    profileRouter
}