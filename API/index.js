import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';   // 👈 importamos cors

// Rutas
import productosRouter from './routes/productos.js'; 
import usuarioRouter from './routes/usuarios.js';
import pedidosRouter from './routes/pedidos.js';
import detallePedidosRouter from './routes/detallePedidos.js';
// filepath: /Users/carlosmadrid11/Dev/store/API/app.js
// ...existing code...
import usuariosRouter from './routes/usuarios.js';

const app = express();  // Moved this line up 
app.use('/api/usuarios', usuariosRouter);
// ...existing code...
dotenv.config();



// Middlewares
app.use(express.json());

// 🔹 Habilitar CORS
// Durante desarrollo, puedes permitir todos los orígenes:
app.use(cors());

// O si quieres restringir solo al frontend (Live Server por ejemplo):
// app.use(cors({ origin: "http://127.0.0.1:5500" }));

// Rutas
app.use('/api/productos', productosRouter);
//app.use('/api/usuarios', usuarioRouter); tal vez este es el problema
app.use('/api/pedidos', pedidosRouter);
app.use('/api/detallePedidos', detallePedidosRouter);

// Ruta base de prueba
app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

// filepath: /Users/carlosmadrid11/Desktop/Tienda-online/API/index.js
app.get('/ping', (req, res) => {
  res.send('pong');
});


// Servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
