const db = require("../db/queries");

async function categoryFormGet (req, res) {
  const table = req.params.category;
  const id = req.params.id;

  const product = await db.getProduct(table,id);

  res.render("edit", {product: product[0], table})
}

function editMotherBoardFormPost(req, res) {
  db.editMotherBoard(req.body);
  res.redirect("/category/motherboards");
}

function editCPUFormPost(req, res) {
  db.editCPU(req.body);
  res.redirect("/category/cpu");
}

function editGPUFormPost(req, res) {
  db.editGPU(req.body);
  res.redirect("/category/gpu");
}

function editRamsFormPost(req, res) {
  db.editRams(req.body);
  res.redirect("/category/rams");
}


function editStorageFormPost(req, res) {
  db.editStorage(req.body);
  res.redirect("/category/storage");
}

function editPSUFormPost(req, res) {
  db.editPSU(req.body);
  res.redirect("/category/psu");
}

function editCaseFormPost(req, res) {
  db.editCase(req.body);
  res.redirect('/category/cases');
}

function addFormGet(req, res) {
  res.render(`add_items/${req.params.name}`);
}

function addItemFormPost(req, res) {
  const columns = Object.keys(req.body).filter(key => req.body[key] != '');
  const values = Object.values(req.body).filter(value => value != '');


  db.addItem(req.params.section, columns,values);
  
  res.redirect(`/category/${req.params.section}`);
}






module.exports = {
  categoryFormGet,
  editMotherBoardFormPost,
  editCPUFormPost,
  editGPUFormPost,
  editRamsFormPost,
  editStorageFormPost,
  editPSUFormPost,
  editCaseFormPost,
  addItemFormPost,
  addFormGet
}