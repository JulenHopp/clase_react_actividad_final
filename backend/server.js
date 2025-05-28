const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
require('dotenv').config();

const usuariosRoutes = require('./routes/usuariosRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ CORS bien configurado
const corsOptions = {
  origin: 'https://ambitious-bay-0af14c510.6.azurestaticapps.net',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Ruta de prueba
app.get('/', (req, res) => {
  res.send('Backend corriendo en Azure 🚀');
});

// ✅ Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ✅ Rutas
app.use('/api/usuarios', usuariosRoutes);

// ✅ Servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Documentación en http://localhost:${PORT}/api-docs`);
});

module.exports = app;