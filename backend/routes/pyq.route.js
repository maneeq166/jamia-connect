const {Router} = require("express");
const { sendPyq, getPyq } = require("../controllers/pyq.controller");
const { authMiddleware } = require("../middleware/authMiddleware");
const pyqRouter = Router();
const {uploadPyqMiddleware} = require("../middleware/pyq.middleware")


const { runValidations, sendPyqValidator } = require("../middleware/validators");
pyqRouter.post(
  "/create-study-material",
  authMiddleware,
  // multer must run before validation so req.body is populated for multipart/form-data
  uploadPyqMiddleware.single("pdf"),
  runValidations(sendPyqValidator()),
  sendPyq
);
pyqRouter.get("/get-study-material", getPyq);

module.exports = {
    pyqRouter
}
