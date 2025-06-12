const swaggerJSDoc = require('swagger-jsdoc');

const RENDER_URL = process.env.RENDER_URL || 'http://localhost:3000';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product Inventory API',
      version: '1.0.0',
      description: 'API for managing products in an inventory system',
    },
    servers: [
      {
        url: RENDER_URL,
        description: 'Auto URL from .env or fallback to localhost',
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'connect.sid',
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
