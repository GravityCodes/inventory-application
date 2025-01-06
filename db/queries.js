const pool = require("./pool");
const format = require('pg-format');

async function getComputers() {
  const { rows } = await pool.query('SELECT * FROM computers;');
  return rows;
}

async function getTable(table){
  const { rows } = await pool.query(`SELECT * FROM ${table};`);
  return rows;
}

async function getProduct(table, id){
  const { rows } = await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [id]);
  return rows;
}

async function getComputer(computer){
  const { rows } = await pool.query(`
    SELECT c.name,
     cpu.name AS cpu_name,
     gpu.name AS gpu_name,
     motherboards.name AS motherboard_name,
     cases.name AS case_name,
     storage.name AS storage_name,
     rams.name AS rams_name,
     psu.name AS psu_name
    FROM computers AS c
    LEFT JOIN cpu ON c.cpu_id = cpu.id
    LEFT JOIN gpu ON c.gpu_id = gpu.id
    LEFT JOIN motherboards ON c.motherboard_id = motherboards.id
    LEFT JOIN cases ON c.case_id = cases.id
    LEFT JOIN storage ON c.storage_id = storage.id
    LEFT JOIN rams ON c.ram_id = rams.id
    LEFT JOIN psu ON c.psu_id = psu.id
    WHERE c.name = $1;
    `, [computer]);
  return rows;
}

function editMotherBoard(params){

  pool.query(`
      UPDATE motherboards
      SET cpu_socket = $1, model = $2, chipset = $3, max_memory = $4, memory_standard = $5, form_factor = $6, cost = $7, name = $8
      WHERE id = $9;
    `, [params.cpu_socket, params.model, params.chipset, params.max_memory, params.memory_standard, params.form_factor, params.cost, params.name, params.id])
}

function editCPU(params){

  pool.query(`
      UPDATE cpu
      SET series = $1, cpu_socket = $2, num_cores = $3, operating_frequency = $4, integrated_graphics = $5, name = $6
      WHERE id = $7;
    `, [params.series, params.cpu_socket, params.num_cores, params.operating_frequency, params.integrated_graphics, params.name, params.id])
}

function editGPU(params){

  pool.query(`
      UPDATE gpu
      SET chipset_manu = $1, name = $2, memory_size_gb = $3, recomm_psu = $4
      WHERE id = $5;
    `, [params.chipset_manu, params.name, params.memory_size_gb, params.recomm_psu, params.id])
}

function editRams(params){

  pool.query(`
      UPDATE rams
      SET capacity = $1, ram_generation = $2, series = $3, name = $4
      WHERE id = $5;
    `, [params.capacity, params.ram_generation, params.series, params.name, params.id])
}

function editStorage(params){

  pool.query(`
      UPDATE storage
      SET series = $1, capacity = $2, ${params.rpm ? `rpm = ${params.rpm},` : ""} name = $3
      WHERE id = $4;
    `, [params.series, params.capacity , params.name, params.id])
}

function editPSU(params){

  pool.query(`
      UPDATE psu
      SET series = $1, name = $2, model = $3, max_power_w = $4, form_factor = $5, energy_efficient = $6
      WHERE id = $7;
    `, [params.series, params.name, params.model, params.max_power_w, params.form_factor, params.energy_efficient, params.id])
}

function editCase(params){

  pool.query(`
      UPDATE cases
      SET color = $1, name = $2, type = $3, series = $4
      WHERE id = $5;
    `, [params.color, params.name, params.type, params.series, params.id])
}

async function addMotherboard(columns, values) {
  const query = format(`INSERT INTO motherboards(%I) VALUES(%L)`, columns, values);
  console.log(query);
  await pool.query(query);
}

module.exports = {
  getComputers,
  getTable,
  getComputer,
  getProduct,
  editMotherBoard,
  editCPU,
  editGPU,
  editRams,
  editStorage,
  editPSU,
  editCase,
  addMotherboard
}