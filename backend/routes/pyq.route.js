const {Router} = require("express");
const { sendPyq } = require("../controllers/pyq.controller");
const pyqRouter = Router();


pyqRouter.post("/create-study-material",sendPyq);


module.exports = {
    pyqRouter
}