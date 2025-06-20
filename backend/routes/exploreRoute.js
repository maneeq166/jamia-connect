const {Router} = require("express");
const { getManyUsers, getUsers } = require("../controllers/exploreController");

const exploreRouter = Router();

exploreRouter.get("/users",getManyUsers);
exploreRouter.get("/user",getUsers);

module.exports = exploreRouter