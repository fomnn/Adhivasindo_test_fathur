import { describeRoute } from 'hono-openapi'
import { resolver } from 'hono-openapi/zod'
import z from 'zod'

import 'zod-openapi/extend'

export const getAllContentResponseSchema = z.object({
  contents: z.array(z.object({
    id: z.string().openapi({
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    createdAt: z.date().openapi({
      example: '2023-01-01T00:00:00Z',
    }),
    updatedAt: z.date().openapi({
      example: '2023-01-02T00:00:00Z',
    }),
    title: z.string().openapi({
      example: 'Introduction to TypeScript',
    }),
    content: z.string().openapi({
      example: 'TypeScript is a strongly typed programming language...',
    }),
    moduleId: z.string().openapi({
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    img_url: z.string().nullable().openapi({
      example: 'https://example.com/images/typescript.jpg',
    }),
  })),
})
export const getContentResponseSchema = z.object({
  id: z.string().openapi({
    example: '123e4567-e89b-12d3-a456-426614174000',
  }),
  createdAt: z.date().openapi({
    example: '2023-01-01T00:00:00Z',
  }),
  updatedAt: z.date().openapi({
    example: '2023-01-02T00:00:00Z',
  }),
  title: z.string().openapi({
    example: 'Introduction to TypeScript',
  }),
  content: z.string().openapi({
    example: 'TypeScript is a strongly typed programming language...',
  }),
  moduleId: z.string().openapi({
    example: '123e4567-e89b-12d3-a456-426614174000',
  }),
  img_url: z.string().nullable().openapi({
    example: 'https://example.com/images/typescript.jpg',
  }),
})

export const getAllContentDescribeRoute = describeRoute({
  description: 'Get all contents',
  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': {
          schema: resolver(getAllContentResponseSchema),
        },
      },
    },
  },
})

export const getContentDescribeRoute = describeRoute({
  description: 'Get a content',
  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': {
          schema: resolver(getContentResponseSchema),
        },
      },
    },
    404: {
      description: 'Content not found',
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
