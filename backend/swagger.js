// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de ejemplo',
    version: '1.0.0',
    description: 'Documentación de la API con Swagger',
  },
  servers: [
    {
      url: '/',
    },
  ],
    components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Cambia según tu estructura de carpetas
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;