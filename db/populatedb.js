#! /usr/bin/env node
const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS cases (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  series VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  color VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS cpu (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  series TEXT NOT NULL,
  number_of_cores INTEGER NOT NULL,
  cpu_socket TEXT NOT NULL,
  operating_frequency DECIMAL(4,1) NOT NULL,
  integrated_graphics TEXT NOT NULL,
  price INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS gpu (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  chipset_manufacturer VARCHAR(255) NOT NULL,
  memory_size_gb INTEGER NOT NULL,
  recommended_psu VARCHAR(4) NOT NULL,
  price INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS motherboards (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  cpu_socket VARCHAR(255) NOT NULL,
  model TEXT NOT NULL,
  chipset VARCHAR(40) NOT NULL,
  max_memory VARCHAR(40) NOT NULL,
  memory_standard VARCHAR(40) NOT NULL,
  form_factor VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS psu (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  series VARCHAR(255) NOT NULL,
  model VARCHAR(255) NOT NULL,
  max_power_w INTEGER NOT NULL,
  energy_efficient VARCHAR(255) NOT NULL,
  form_factor VARCHAR(20) NOT NULL,
  price INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS rams (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  series TEXT NOT NULL,
  ram_generation VARCHAR(40) NOT NULL,
  capacity VARCHAR(40) NOT NULL,
  price INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS storage (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  series VARCHAR(255) NOT NULL,
  rpm INTEGER,
  capacity VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS computers (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  cpu_id INTEGER NOT NULL,
  gpu_id INTEGER NOT NULL,
  motherboard_id INTEGER NOT NULL,
  psu_id INTEGER NOT NULL,
  ram_id INTEGER NOT NULL,
  storage_id INTEGER NOT NULL,
  case_id INTEGER NOT NULL,
  FOREIGN KEY (cpu_id) REFERENCES cpu(id),
  FOREIGN KEY (gpu_id) REFERENCES gpu(id),
  FOREIGN KEY (motherboard_id) REFERENCES motherboards(id),
  FOREIGN KEY (psu_id ) REFERENCES psu(id),
  FOREIGN KEY (ram_id) REFERENCES rams(id),
  FOREIGN KEY (storage_id) REFERENCES storage(id),
  FOREIGN KEY (case_id) REFERENCES cases(id)
);

INSERT INTO motherboards(name, cpu_socket, model, chipset, max_memory, memory_standard, form_factor, price)
VALUES ('ASRock B660M PRO RS','LGA 1700', 'B660M PRO RS', 'intel B660', '128GB', 'DDR4', 'Micro ATX', '94');

INSERT INTO rams(name, capacity, ram_generation, series , price)
VALUES ('Corsair Vengeance LPX', '64GB (2 x 32GB)', 'DDR4', 'Pro', '50');

INSERT INTO psu(name, series, model, form_factor, max_power_w, energy_efficient , price)
VALUES ('Corsair RM850e', 'RM850e', 'CP-9020263', 'ATX', 850, '80 PLUS GOLD certified', '100');

INSERT INTO cpu(name, series, cpu_socket, number_of_cores, operating_frequency, integrated_graphics , price)
VALUES ('Intel Core i7-12700', 'Core i7 12th Gen', 'LGA 1700', 12, 3.6, 'Intel UHD Graphics 770', '120');

INSERT INTO gpu(name, chipset_manufacturer, memory_size_gb, recommended_psu , price)
VALUES ('AMD Radeon RX 7900 XT', 'AMD', 16, '700W', '320');

INSERT INTO storage(name, series, capacity , price)
VALUES ('Seagate IronWolf', 'ironWolf', '8TB', '70');

INSERT INTO cases(name, color, type, series , price)
VALUES ('NZXT H5 Flow', 'black', 'ATX, Micro-ATX, mini-ITX', 'H5 Flow - All Black', '105');

INSERT INTO computers(name, cpu_id, gpu_id, motherboard_id, psu_id, ram_id, storage_id, case_id  )
VALUES ('Gravity Desktop','1', '1', '1', '1', '1', '1', '1');
`;


async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString:`postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}?sslmode=require'`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();