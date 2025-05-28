const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
require('dotenv').config();

const usuariosRoutes = require('./routes/usuariosRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ CORS con origen seguro en producción
const corsOptions = {
  origin: '*', // puedes cambiar esto por process.env.FRONTEND_URL para mayor seguridad
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: false,
};

app.use(cors(corsOptions));
app.use(express.json());

// ✅ Ruta general para comprobar si backend está vivo
app.get('/', (req, res) => {
  res.send('Backend corriendo en Azure 🚀');
});

// ✅ Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ✅ Rutas
app.use('/api/usuarios', usuariosRoutes);

// ✅ Escuchar en 0.0.0.0 para producción en Azure
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Documentación en http://localhost:${PORT}/api-docs`);
});