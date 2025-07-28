import { Repartidor } from "../models/repartidorModel.js";

// Buscar repartidor disponible
export async function obtenerRepartidorDisponible(db) {
  const repartidor = await Repartidor(db).findOneAndUpdate(
    { estado: "disponible" },
    { $set: { estado: "ocupado" } },
    { returnDocument: "after" }
  );

  return repartidor.value;
}

// Liberar repartidor después de entregar pedido
export async function liberarRepartidor(db, repartidorId) {
  const result = await Repartidor(db).updateOne(
    { _id: repartidorId },
    { $set: { estado: "disponible" } }
  );

  return result.modifiedCount > 0;
}

// Ver todos los repartidores
export async function listarRepartidores(db) {
  return await Repartidor(db).find().toArray();
}
