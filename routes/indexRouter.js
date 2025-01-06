const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");



indexRouter.get("/", indexController.homePageGet);
indexRouter.get("/category/:name", indexController.categoryGet);


module.exports = indexRouter;