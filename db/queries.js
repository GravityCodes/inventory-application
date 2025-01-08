const pool = require("./pool");
const format = require('pg-format');


async function getTable(table){
  const { rows } = await pool.query(`SELECT * FROM ${table};`);
  return rows;
}

async function getProduct(table, id){
  const { rows } = await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [id]);
  return rows;
}

async function getComputers(){
  const { rows } = await pool.query(`
    SELECT c.id, c.name,
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
    `);
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

async function addItem(section,columns, values) {
  const query = format(`INSERT INTO %I(%I) VALUES(%L)`, section, columns, values);
  await pool.query(query);
}

async function removeItem(section, id) {
  try{
  const query = format(`DELETE FROM %I WHERE id = (%L)`, section, id);
  await pool.query(query);
  } 
  catch (error) {
    throw error;
  }
}

async function getComponents() {
  const tables = ['gpu', 'cpu', 'cases', 'motherboards', 'psu', 'rams', 'storage'];
  let data = {};

  for(const table of tables){
   let { rows } = await pool.query(format(`SELECT id, name FROM %I`, table));
   data[table] = rows;
  }
  return data;
}

async function addComputer(params) {
  await pool.query(`INSERT INTO computers(name, cpu_id, gpu_id, motherboard_id, psu_id, ram_id, storage_id, case_id)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [params.name, params.cpu, params.gpu, params.motherboards, params.psu, params.rams, params.storage, params.cases]);
}

async function getComputerWithId(id) {
  const { rows } = await pool.query(`SELECT * FROM computers  WHERE id = $1`, [id]);
  return rows;
}

async function editComputer(params) {
  await pool.query(`UPDATE computers 
                 SET name = $1, cpu_id = $2, gpu_id = $3, motherboard_id = $4, psu_id = $5, ram_id = $6, storage_id = $7, case_id = $8
                 WHERE id = $9;
                 `, [params.name, params.cpu, params.gpu, params.motherboards, params.psu, params.rams, params.storage, params.cases, params.id]);
}

module.exports = {
  getComputers,
  getTable,
  getComputers,
  getProduct,
  editMotherBoard,
  editCPU,
  editGPU,
  editRams,
  editStorage,
  editPSU,
  editCase,
  addItem,
  removeItem,
  getComponents,
  addComputer,
  getComputerWithId,
  editComputer

}