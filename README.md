# 🍕 Pizza y Punto - Sistema de Pedidos con Node.js y MongoDB

## Descripción

**Pizza y Punto** es una aplicación de consola interactiva (CLI) desarrollada en Node.js que gestiona pedidos de pizzas, clientes, inventario de ingredientes y repartidores, todo conectado a una base de datos MongoDB en la nube (MongoDB Atlas).

### Funcionalidades clave:

- Registro de pedidos con selección de pizzas e ingredientes.
- Control de inventario antes de confirmar el pedido.
- Asignación automática de repartidores disponibles.
- Uso de transacciones para asegurar consistencia.
- Consultas de agregación para análisis de ventas.
- Validación de datos en modelos (`pizzas`, `clientes`, `repartidores`, etc.).

---

## 📦 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/Mateo-Paternina-Mercado/pizza-y-punto
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` con tu conexión:

```env
MONGO_URI=mongodb+srv://Mattpame:<password>@mateodb.vytieeg.mongodb.net/  "aqui puedes poner tu base de datos"

DB_NAME=pizzadb
```

4. Ejecuta el sistema:

```bash
npm start
```

---

## 🗂️ Estructura del Proyecto

```
pizza-y-punto/
├── src/
│   ├── app.js                # Punto de entrada principal
│   ├── database/
│   │   └── conexion.js       # Conexión a MongoDB
│   ├── models/
│   │   ├── pizzaModel.js
│   │   ├── ingredienteModel.js
│   │   ├── pedidoModel.js
│   │   ├── clienteModel.js
│   │   └── repartidorModel.js
│   ├── services/
│   │   ├── pedidoService.js      # Registro y validación de pedidos
│   │   └── repartidorService.js  # Gestión de repartidores
│   ├── menus/
│   │   └── menuPrincipal.js      # Interfaz CLI con Inquirer
│   └── seed/
│       └── datosIniciales.js     # Datos de prueba (clientes, pizzas, etc.)
├── .env
├── package.json
└── README.md
```

---

## ⚠️ Errores y Pendientes

Actualmente el sistema funciona, pero presenta algunos puntos pendientes o mejorables:

### ❗ Errores/Pendientes

- ⚠️ **Falta feedback visual tras ejecutar `npm start`**: El sistema se conecta a MongoDB, pero no muestra inmediatamente el menú si `menuPrincipal.js` no se está llamando correctamente desde `app.js`.

- ⚠️ **No hay validación de existencia de pizzas o clientes desde consola**: En el menú, si el usuario escribe un ID inexistente, el sistema podría fallar o comportarse de forma inesperada.

- ⚠️ **No hay script de inicialización (`initDB.js`)**: Aunque `datosIniciales.js` tiene datos semilla, no hay un comando que lo ejecute automáticamente. Se recomienda uno para facilitar las pruebas.

- ⚠️ **No hay control de errores global**: Si la conexión a MongoDB falla o se interrumpe una transacción, no se informa al usuario final con claridad.

---

## 🧪 Datos Semilla

El archivo `src/seed/datosIniciales.js` contiene datos predefinidos como:

- Pizzas con ingredientes
- Repartidores disponibles
- Clientes con identificaciones

Puedes cargar estos datos de prueba de forma manual llamando la función desde `app.js` o creando un comando específico.

---

## 💻 Uso Esperado

Al iniciar la app, el usuario debería:

1. Seleccionar un cliente desde el CLI (`menuPrincipal.js`)
2. Escoger una o varias pizzas del menú
3. El sistema valida inventario, descuenta ingredientes y crea el pedido
4. Se asigna un repartidor disponible automáticamente
5. El pedido se guarda en la base de datos usando una **transacción MongoDB**

---

## 👨‍💻 Autor

Mateo Paternina – Proyecto Full Stack para **Campuslands**  
Colombia 🇨🇴 – 2025