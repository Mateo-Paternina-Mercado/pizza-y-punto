import { conectarDB } from "./database/conexion.js";
import { mostrarMenu } from "./cli/menu.js";

async function main() {
  await conectarDB();
  await mostrarMenu();
}

main();
