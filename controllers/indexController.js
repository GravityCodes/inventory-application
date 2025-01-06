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



module.exports = {
  homePageGet,
   categoryGet
}