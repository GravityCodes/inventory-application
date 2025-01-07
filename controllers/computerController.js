const db = require("../db/queries");

async function computerGet (req,res) {
  const computers = await db.getComputers();
  res.render("computer", { computers});
}

async function addComputerGet(req, res) {
  const components = await db.getComponents();
  res.render("add_items/computer", {components});
}

function addComputerPost(req, res) {
  db.addComputer(req.body);
  res.redirect("/computer");
}

async function editComputerFormGet (req, res) {
  const id = req.params.id;

  const computer = await db.getComputerWithId(id);
  const components = await db.getComponents();

  console.log(computer);
  res.render("editComputer", {id, computer: computer[0], components});
}

module.exports = {
  computerGet,
  addComputerGet,
  addComputerPost,
  editComputerFormGet
}