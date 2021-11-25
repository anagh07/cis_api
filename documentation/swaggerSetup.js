const swaggerJsDoc = require('swagger-jsdoc');

const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:5000';
const options = {
  apis: ['./routes/*.js'],
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Covid Info System (CIS) API',
      version: '1.0.0',
      desciption: 'This is a REST API for Covid Info System web application.',
      host: apiBaseUrl,
      basePath: '/',
      consumes: 'application/json',
      produces: 'application/json',
    },
  },
  server: [
    {
      url: apiBaseUrl,
    },
  ],
};

const spec = swaggerJsDoc(options);
module.exports = spec;
