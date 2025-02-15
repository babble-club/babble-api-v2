import type { OpenAPIV3 } from 'openapi-types';

export const swaggerConfig: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'ICS Coupon Service API',
    version: '1.0.0',
    description: 'API for managing promotional coupons in the ICS platform',
    contact: {
      name: 'ICS Development Team',
      url: 'https://confluence.gilbarco.com/pages/viewpage.action?pageId=419994272',
    },
  },
  servers: [
    {
      url: '/api/v1',
      description: 'Current version',
    },
  ],
  tags: [
    {
      name: 'Coupons',
      description: 'Coupon management endpoints',
    },
    {
      name: 'Health',
      description: 'System health and readiness checks',
    },
  ],
  components: {
    schemas: {
      Coupon: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          code: { type: 'string' },
          description: { type: 'string' },
          validFrom: { type: 'string', format: 'date-time' },
          validTo: { type: 'string', format: 'date-time' },
          status: {
            type: 'string',
            enum: ['active', 'expired', 'used', 'cancelled'],
          },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
        required: ['code', 'validFrom', 'validTo'],
      },
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'object',
            properties: {
              message: { type: 'string' },
              code: { type: 'string' },
            },
          },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT token issued by ICS authentication service',
      },
    },
    responses: {
      UnauthorizedError: {
        description: 'Authentication information is missing or invalid',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
      ValidationError: {
        description: 'Invalid input parameters',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
    },
  },
  paths: {},
};
