import { db } from "../database/conexion.js";
import { Pizza } from "../models/pizzaModel.js";
import { Ingrediente } from "../models/ingredienteModel.js";
import { Pedido } from "../models/pedidoModel.js";
import { Repartidor } from "../models/repartidorModel.js";

export async function realizarPedido(clienteId, pizzaIds) {
  const session = db.client.startSession();

  try {
    await session.withTransaction(async () => {
      // 1. Obtener pizzas con ingredientes
      const pizzas = await Pizza(db).find({ _id: { $in: pizzaIds } }).toArray();

      // 2. Verificar y actualizar stock
      for (const pizza of pizzas) {
        for (const ing of pizza.ingredientes) {
          const ingrediente = await Ingrediente(db).findOne({ nombre: ing.nombre });
          if (!ingrediente || ingrediente.stock < ing.cantidad) {
            throw new Error(`❌ No hay suficiente ${ing.nombre}`);
          }
          await Ingrediente(db).updateOne(
            { nombre: ing.nombre },
            { $inc: { stock: -ing.cantidad } }
          );
        }
      }

      // 3. Asignar repartidor
      const repartidor = await Repartidor(db).findOneAndUpdate(
        { estado: "disponible" },
        { $set: { estado: "ocupado" } },
        { returnDocument: "after" }
      );
      if (!repartidor.value) throw new Error("❌ No hay repartidores disponibles");

      // 4. Calcular total
      const total = pizzas.reduce((acc, p) => acc + p.precio, 0);

      // 5. Insertar pedido
      await Pedido(db).insertOne({
        clienteId,
        pizzas: pizzaIds,
        total,
        fecha: new Date(),
        repartidorAsignado: repartidor.value._id,
      });

      console.log("✅ Pedido realizado con éxito");
    });
  } catch (err) {
    console.error(err.message);
  } finally {
    await session.endSession();
  }
}
