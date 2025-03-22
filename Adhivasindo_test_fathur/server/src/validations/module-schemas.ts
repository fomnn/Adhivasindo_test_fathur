import { describeRoute } from 'hono-openapi'
import { resolver } from 'hono-openapi/zod'
import z from 'zod'

import 'zod-openapi/extend'

export const getAllModulesResponseSchema = z.object({
  modules: z.array(z.object({
    id: z.string().openapi({
      example: '123e4567-e89b-12d3-a456-426614174000',
      description: 'The unique identifier of the module',
    }),
    name: z.string().openapi({
      example: 'User Management',
      description: 'The name of the module',
    }),
    createdAt: z.date().openapi({
      example: '2024-01-20T08:00:00Z',
      description: 'The timestamp when the module was created',
    }),
    updatedAt: z.date().openapi({
      example: '2024-01-20T10:30:00Z',
      description: 'The timestamp when the module was last updated',
    }),
  })),
})

export const getModuleResponseSchema = z.object({
  module: z.object({
    id: z.string().openapi({
      example: '123e4567-e89b-12d3-a456-426614174000',
      description: 'The unique identifier of the module',
    }),
    name: z.string().openapi({
      example: 'User Management',
      description: 'The name of the module',
    }),
    createdAt: z.date().openapi({
      example: '2024-01-20T08:00:00Z',
      description: 'The timestamp when the module was created',
    }),
    updatedAt: z.date().openapi({
      example: '2024-01-20T10:30:00Z',
      description: 'The timestamp when the module was last updated',
    }),
  }),
})

export const getAllModulesDescribeRoute = describeRoute({
  description: 'Get all modules',
  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': {
          schema: resolver(getAllModulesResponseSchema),
        },
      },
    },
  },
})

export const getModuleDescribeRoute = describeRoute({
  description: 'Get a module',
  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': {
          schema: resolver(getModuleResponseSchema),
        },
      },
    },
    404: {
      description: 'Module not found',
      content: {
        'application/json': {
          schema: resolver(z.object({
            message: z.string(),
          })),
        },
      },
    },
  },
})
