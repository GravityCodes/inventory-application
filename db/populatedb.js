#! /usr/bin/env node
const { Client } = require("pg");
require("dotenv").config();

const SQL = `
INSERT INTO motherboards(cpu_socket, model, chipset, max_memory, memory_standard, form_factor, cost)
VALUES ('LGA 1700', 'B660M PRO RS', 'intel B660', '128GB', 'DDR4', 'Micro ATX', '94');

INSERT INTO rams(capacity, ram_generation, series)
VALUES ('64GB (2 x 32GB)', 'DDR4', 'Pro');

INSERT INTO psu(series, model, form_factor, max_power_w, energy_efficient)
VALUES ('RM850e', 'CP-9020263', 'ATX', 850, '80 PLUS GOLD certified');

INSERT INTO cpu(series, cpu_socket, num_cores, operating_frequency, integrated_graphics)
VALUES ('Core i7 12th Gen', 'LGA 1700', 12, 3.6, 'Intel UHD Graphics 770');

INSERT INTO gpu(chipset_manu, name, memory_size_gb, recomm_psu)
VALUES ('AMD', 'AMD Radeon RX 7000 Series', 16, '700W');

INSERT INTO storage(series, capacity)
VALUES ('ironWolf', '8TB');

INSERT INTO "case"(color, type, series)
VALUES ('black', 'ATX, Micro-ATX, mini-ITX', 'H5 Flow - All Black');
`;


async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString:`postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();