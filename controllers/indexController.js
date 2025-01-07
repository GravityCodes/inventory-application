const db = require("../db/queries");

async function homePageGet (req, res)  {
  const computers = await db.getComputers();
  res.render("index", { computers });
}

async function categoryGet (req, res) {

  let tableName = req.params.name;
  const table = req.params.name;

  const validTables = ['gpu', 'cpu', 'cases', 'motherboards', 'psu', 'rams', 'storage'];

  if (!validTables.includes(table)) {
    throw new Error('Invalid table name');
  }


  const products = await db.getTable(tableName);
  let title;

  switch(table) {
    case "gpu" :
      title = "Graphic Cards";
      break;
    case "cpu" :
      title = "CPUs";
      break;
    case "psu" :
      title = "Power Supplies";
      break;
    default :
      title = table.charAt(0).toUpperCase() + table.slice(1);
  }
  res.render("category", {products, title, section: tableName});
}

function removeItemGet(req, res) {
  res.render("remove", {section: req.params.section, id: req.params.id})
}

async function removeItemPost(req, res) {
  if(req.body.password != process.env.PASSWORD){
    return res.status(400).render("remove", {section: req.params.section, id: req.params.id, errors: [{msg: "Password is incorrect"}]});
  }
  await db.removeItem(req.params.section, req.params.id);
  res.redirect(`/`);
}

module.exports = {
  homePageGet,
  categoryGet,
  removeItemGet,
  removeItemPost
}