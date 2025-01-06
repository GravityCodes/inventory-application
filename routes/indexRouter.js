const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");



indexRouter.get("/", indexController.homePageGet);
indexRouter.get("/category/:name", indexController.categoryGet);
indexRouter.get("/computer/:name", indexController.computerGet);

module.exports = indexRouter;