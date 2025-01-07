const { Router } = require("express");
const computerRouter = Router();
const computerController = require("../controllers/computerController");


computerRouter.get("/", computerController.computerGet);

computerRouter.get("/edit/:id", computerController.editComputerFormGet);

computerRouter.get("/add", computerController.addComputerGet);
computerRouter.post("/add", computerController.addComputerPost);

module.exports = computerRouter;