const { Router } = require("express");
const categoryRouter = Router();
const categoryController = require("../controllers/categoryController");

categoryRouter.get("/edit/:category/:id", categoryController.categoryFormGet);

categoryRouter.post("/edit/motherboards", categoryController.editMotherBoardFormPost);
categoryRouter.post("/edit/cpu", categoryController.editCPUFormPost);
categoryRouter.post("/edit/gpu", categoryController.editGPUFormPost);
categoryRouter.post("/edit/rams", categoryController.editRamsFormPost);
categoryRouter.post("/edit/storage", categoryController.editStorageFormPost);
categoryRouter.post("/edit/psu", categoryController.editPSUFormPost);
categoryRouter.post("/edit/cases", categoryController.editCaseFormPost);

categoryRouter.get("/add/:name", categoryController.addFormGet)
categoryRouter.post("/add/:section", categoryController.addItemFormPost);

categoryRouter.get("/remove/:section/:id", categoryController.removeItemGet);
categoryRouter.post("/remove/:section/:id", categoryController.removeItemPost);

module.exports = categoryRouter;
