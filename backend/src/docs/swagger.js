// src/docs/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'API REST per a la botiga en línia amb autenticació JWT',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolupament',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['nom', 'cognom', 'email', 'password'],
          properties: {
            _id: {
              type: 'string',
              description: 'ID generat per MongoDB',
              example: '664f1b2c3d4e5f6a7b8c9d0e',
            },
            nom: {
              type: 'string',
              example: 'Luke',
            },
            cognom: {
              type: 'string',
              example: 'Skywalker',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'luke@cedi.cat',
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Password (hash bcrypt, mai retornat en respostes)',
              example: 'theforce',
            },
            rol: {
              type: 'string',
              enum: ['client', 'admin'],
              default: 'client',
              example: 'client',
            },
          },
        },
        AuthTokens: {
          type: 'object',
          properties: {
            accessToken: {
              type: 'string',
              description: 'JWT d\'accés (curt termini)',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
            refreshToken: {
              type: 'string',
              description: 'JWT de refresc (llarg termini)',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'error' },
            message: { type: 'string', example: 'Credencials invàlides' },
          },
        },
      },
      // ─── Esquema de seguretat JWT ──────────────────────────────────────────
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Afegeix el token JWT: Bearer <token>',
        },
      },
    },
  },
  // Fitxers on swagger-jsdoc buscarà els comentaris @swagger
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
