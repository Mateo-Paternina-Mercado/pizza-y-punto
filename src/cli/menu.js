import inquirer from "inquirer";
import { realizarPedido } from "../services/pedidoService.js";

export async function mostrarMenu() {
  const { accion } = await inquirer.prompt([
    {
      type: "list",
      name: "accion",
      message: "¿Qué deseas hacer?",
      choices: [
        "📦 Realizar pedido",
        "📊 Ver reportes de ventas",
        "❌ Salir",
      ],
    },
  ]);

  if (accion === "📦 Realizar pedido") {
    const clienteId = "123"; // Simulado
    const pizzaIds = ["pizzaId1", "pizzaId2"]; // Simulado
    await realizarPedido(clienteId, pizzaIds);
  }

  // Puedes agregar otras opciones aquí
}
