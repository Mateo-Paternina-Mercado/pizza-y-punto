import { db } from "../database/conexion.js";
import { Pedido } from "../models/pedidoModel.js";
import { Pizza } from "../models/pizzaModel.js";

export async function ingredientesMasUsadosUltimoMes() {
  const ultimos30 = new Date();
  ultimos30.setDate(ultimos30.getDate() - 30);

  const resultados = await Pedido(db).aggregate([
    { $match: { fecha: { $gte: ultimos30 } } },
    {
      $lookup: {
        from: "pizzas",
        localField: "pizzas",
        foreignField: "_id",
        as: "pizzas_info",
      },
    },
    { $unwind: "$pizzas_info" },
    { $unwind: "$pizzas_info.ingredientes" },
    {
      $group: {
        _id: "$pizzas_info.ingredientes.nombre",
        totalUsado: { $sum: "$pizzas_info.ingredientes.cantidad" },
      },
    },
    { $sort: { totalUsado: -1 } },
  ]).toArray();

  console.log("📊 Ingredientes más usados en el último mes:");
  resultados.forEach((ing) =>
    console.log(`- ${ing._id}: ${ing.totalUsado} unidades`)
  );
}

export async function promedioPreciosPorCategoria() {
  const resultados = await Pizza(db).aggregate([
    {
      $group: {
        _id: "$categoria",
        promedioPrecio: { $avg: "$precio" },
      },
    },
    { $sort: { promedioPrecio: -1 } },
  ]).toArray();

  console.log("📊 Promedio de precios por categoría:");
  resultados.forEach((r) =>
    console.log(`- ${r._id}: $${r.promedioPrecio.toFixed(2)}`)
  );
}

export async function categoriaMasVendida() {
  const resultados = await Pedido(db).aggregate([
    {
      $lookup: {
        from: "pizzas",
        localField: "pizzas",
        foreignField: "_id",
        as: "pizzas_info",
      },
    },
    { $unwind: "$pizzas_info" },
    {
      $group: {
        _id: "$pizzas_info.categoria",
        cantidadVendida: { $sum: 1 },
      },
    },
    { $sort: { cantidadVendida: -1 } },
    { $limit: 1 },
  ]).toArray();

  const top = resultados[0];
  console.log(`🏆 Categoría más vendida: ${top._id} (${top.cantidadVendida} ventas)`);
}