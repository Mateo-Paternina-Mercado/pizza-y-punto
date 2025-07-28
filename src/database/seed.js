import { db, conectarDB } from "./conexion.js";

const ingredientes = [
  { nombre: "Mozzarella", tipo: "queso", stock: 100 },
  { nombre: "Salsa de tomate", tipo: "salsa", stock: 100 },
  { nombre: "Pepperoni", tipo: "topping", stock: 80 },
  { nombre: "Champiñones", tipo: "topping", stock: 70 },
  { nombre: "Jamón", tipo: "topping", stock: 60 },
];

const pizzas = [
  {
    nombre: "Pepperoni Clásica",
    categoria: "tradicional",
    precio: 25000,
    ingredientes: [
      { nombre: "Mozzarella", cantidad: 1 },
      { nombre: "Salsa de tomate", cantidad: 1 },
      { nombre: "Pepperoni", cantidad: 1 },
    ],
  },
  {
    nombre: "Veggie Lovers",
    categoria: "vegana",
    precio: 22000,
    ingredientes: [
      { nombre: "Mozzarella", cantidad: 1 },
      { nombre: "Salsa de tomate", cantidad: 1 },
      { nombre: "Champiñones", cantidad: 1 },
    ],
  },
];

const repartidores = [
  { nombre: "Carlos Gómez", zona: "Norte", estado: "disponible" },
  { nombre: "Ana López", zona: "Centro", estado: "disponible" },
];

const clientes = [
  { nombre: "Mateo Paternina", telefono: "3001234567", direccion: "Cra 10 #45-67" },
  { nombre: "Laura Ríos", telefono: "3019876543", direccion: "Cl 80 #25-36" },
];

async function seed() {
  await conectarDB();
  await db.collection("ingredientes").insertMany(ingredientes);
  await db.collection("pizzas").insertMany(pizzas);
  await db.collection("repartidores").insertMany(repartidores);
  await db.collection("clientes").insertMany(clientes);
  console.log("✅ Datos semilla insertados correctamente");
  process.exit();
}

seed();
