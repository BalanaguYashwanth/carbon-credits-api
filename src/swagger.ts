import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Carbon Credits API',
      version: '1.0.0',
      description: 'API to create companies and manage carbon credits on Sui blockchain.',
    },
    servers: [
      {
        url: 'https://carbon-credits-api-production.up.railway.app'
      },
    ],
  },
  apis: ['./src/controllers/*.ts', './src/app.ts'],
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}