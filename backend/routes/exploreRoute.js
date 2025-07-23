const {Router} = require("express");
const { getManyUsers, getUsers, getSingleUser } = require("../controllers/exploreController");

const exploreRouter = Router();

exploreRouter.get("/users",getManyUsers);
exploreRouter.get("/users/:username",getUsers);
exploreRouter.get("/user/:username",getSingleUser); 

module.exports = exploreRouter