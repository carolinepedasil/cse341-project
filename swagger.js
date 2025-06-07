const swaggerJSDoc = require('swagger-jsdoc');

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
        url: 'http://localhost:3000',
        description: 'Local server',
      },
    ],
    components: {
      schemas: {
        Product: {
          type: 'object',
          required: ['name', 'price', 'stock', 'sku'],
          properties: {
            name: {
              type: 'string',
              example: 'Wireless Mouse'
            },
            description: {
              type: 'string',
              example: 'A reliable wireless mouse with USB receiver'
            },
            price: {
              type: 'number',
              example: 29.99
            },
            category: {
              type: 'string',
              example: 'Electronics'
            },
            stock: {
              type: 'number',
              example: 100
            },
            imageUrl: {
              type: 'string',
              example: 'http://example.com/images/mouse.png'
            },
            sku: {
              type: 'string',
              example: 'MOUSE123'
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
