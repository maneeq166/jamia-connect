const {Router} = require("express");
const { sendPyq, getPyq } = require("../controllers/pyq.controller");
const { authMiddleware } = require("../middleware/authMiddleware");
const pyqRouter = Router();
const {uploadPyqMiddleware} = require("../middleware/pyq.middleware")


pyqRouter.post("/create-study-material",authMiddleware,uploadPyqMiddleware.single("pdf"),sendPyq);
pyqRouter.get("/get-study-material",getPyq);

module.exports = {
    pyqRouter
}