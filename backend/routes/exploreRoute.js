const {Router} = require("express");
const { getManyUsers, getUsers, getSingleUser } = require("../controllers/exploreController");

const exploreRouter = Router();
const { runValidations, exploreUsersValidator, exploreUsernameParam } = require("../middleware/validators");

exploreRouter.get("/users", runValidations(exploreUsersValidator()), getManyUsers);
exploreRouter.get("/users/:username", runValidations(exploreUsernameParam()), getUsers);
exploreRouter.get("/user/:username", runValidations(exploreUsernameParam()), getSingleUser);

module.exports = exploreRouter
