import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

export const client = new MongoClient(process.env.MONGO_URI);
export const db = client.db(process.env.DB_NAME);

export async function conectarDB() {
  try {
    await client.connect();
    console.log("✅ Conectado a MongoDB");
  } catch (err) {
    console.error("❌ Error al conectar a MongoDB", err);
  }
}