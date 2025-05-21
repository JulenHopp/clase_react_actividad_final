const express = require('express');
require('dotenv').config();
const usuariosRoutes = require('./routes/usuariosRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/usuarios', usuariosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});