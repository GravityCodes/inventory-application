const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");



indexRouter.get("/", indexController.homePageGet);
indexRouter.get("/category/:name", indexController.categoryGet);

indexRouter.get("/remove/:section/:id", indexController.removeItemGet);
indexRouter.post("/remove/:section/:id", indexController.removeItemPost);

module.exports = indexRouter;