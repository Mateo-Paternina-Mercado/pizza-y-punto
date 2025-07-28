import inquirer from "inquirer";
import { realizarPedido } from "../services/pedidoService.js";
import {
  ingredientesMasUsadosUltimoMes,
  promedioPreciosPorCategoria,
  categoriaMasVendida,
} from "../services/reporteService.js";
import { db } from "../database/conexion.js";
import { Cliente } from "../models/clienteModel.js";
import { Pizza } from "../models/pizzaModel.js";
import { ObjectId } from "mongodb";

export async function mostrarMenu() {
  let salir = false;

  while (!salir) {
    const { accion } = await inquirer.prompt([
      {
        type: "list",
        name: "accion",
        message: "🍕 ¿Qué deseas hacer?",
        choices: [
          "📦 Realizar pedido",
          "📊 Ver ingredientes más usados (último mes)",
          "💰 Ver promedio de precios por categoría",
          "🏆 Ver categoría más vendida",
          "❌ Salir",
        ],
      },
    ]);

    switch (accion) {
      case "📦 Realizar pedido":
        await pedirConSeleccion();
        break;

      case "📊 Ver ingredientes más usados (último mes)":
        await ingredientesMasUsadosUltimoMes();
        break;

      case "💰 Ver promedio de precios por categoría":
        await promedioPreciosPorCategoria();
        break;

      case "🏆 Ver categoría más vendida":
        await categoriaMasVendida();
        break;

      case "❌ Salir":
        salir = true;
        console.log("👋 ¡Hasta luego!");
        break;
    }

    if (!salir) {
      console.log("\n----------------------------\n");
    }
  }
}

async function pedirConSeleccion() {
  // Obtener clientes
  const clientes = await Cliente(db).find().toArray();
  const { clienteId } = await inquirer.prompt([
    {
      type: "list",
      name: "clienteId",
      message: "👤 Selecciona un cliente:",
      choices: clientes.map((c) => ({
        name: `${c.nombre} - ${c.direccion}`,
        value: c._id.toString(),
      })),
    },
  ]);

  // Obtener pizzas
  const pizzas = await Pizza(db).find().toArray();
  const { pizzaIds } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "pizzaIds",
      message: "🍕 Selecciona pizzas para el pedido:",
      choices: pizzas.map((p) => ({
        name: `${p.nombre} ($${p.precio})`,
        value: p._id.toString(),
      })),
    },
  ]);

  // Convertir IDs a ObjectId reales
  const clienteObjectId = new ObjectId(clienteId);
  const pizzaObjectIds = pizzaIds.map((id) => new ObjectId(id));

  await realizarPedido(clienteObjectId, pizzaObjectIds);
}
