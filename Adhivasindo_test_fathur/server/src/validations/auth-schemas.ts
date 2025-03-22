import { describeRoute } from 'hono-openapi'
import { resolver } from 'hono-openapi/zod'
import z from 'zod'

import 'zod-openapi/extend'

export const loginSchema = z.object({
  email: z.string().email().openapi({
    example: 'name@example.com',
    description: 'User email address for authentication'
  }),
  password: z.string().min(4).openapi({
    example: 'password123',
    description: 'User password with minimum 4 characters'
  }),
})

export const signupSchema = z.object({
  email: z.string().email().openapi({
    example: 'name@example.com',
    description: 'User email address for registration'
  }),
  password: z.string().min(4).openapi({
    example: 'password123',
    description: 'User password with minimum 4 characters'
  }),
  name: z.string().min(1).openapi({
    example: 'John Doe',
    description: 'User full name'
  }),
})

export const loginResponseSchema = z.object({
  token: z.string().openapi({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtOGhpOXFkODAwMDBjenFrZTZ2Y3pjajkiLCJleHAiOjE3NDI1MDI0ODB9.8mOQN8hPmWNuWx8qu-0EmWwHvGdkpZhyMEHw5YWPbvM',
    description: 'JWT token for user authentication'
  }),
  user: z.object({
    id: z.string().openapi({
      example: '1234567890',
      description: 'Unique identifier for the user'
    }),
    email: z.string().openapi({
      example: 'asep@example.com',
      description: 'Email address of the authenticated user'
    }),
    name: z.string().openapi({
      example: 'John Doe',
      description: 'Full name of the authenticated user'
    }),
  }),
})

export const signupResponseSchema = z.object({
  token: z.string().openapi({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtOGhpOXFkODAwMDBjenFrZTZ2Y3pjajkiLCJleHAiOjE3NDI1MDI0ODB9.8mOQN8hPmWNuWx8qu-0EmWwHvGdkpZhyMEHw5YWPbvM',
    description: 'JWT token for user authentication'
  }),
  user: z.object({
    id: z.string().openapi({
      example: '1234567890',
      description: 'Unique identifier for the registered user'
    }),
    email: z.string().openapi({
      example: 'asep@example.com',
      description: 'Email address of the registered user'
    }),
    name: z.string().openapi({
      example: 'John Doe',
      description: 'Full name of the registered user'
    }),
  }),
})

export const loginDescribeRoute = describeRoute({
  description: 'Login to the application',
  requestBody: {
    description: 'Login credentials',
    required: true,
    content: {
      'application/json': {
        schema: resolver(loginSchema),
      },
    },
  },
  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': {
          schema: resolver(loginResponseSchema),
        },
      },
    },
    404: {
      description: 'User not found',
      content: {
        'application/json': {
          schema: resolver(z.object({
            message: z.string(),
          })),
        },
      },
    },
    401: {
      description: 'Invalid password',
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

export const signupDescribeRoute = describeRoute({
  description: 'Register to the application',
  requestBody: {
    description: 'Signup Data',
    required: true,
    content: {
      'application/json': {
        schema: resolver(signupSchema),
      },
    },
  },
  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': {
          schema: resolver(signupResponseSchema),
        },
      },
    },
    400: {
      description: 'Email already exists',
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

export const verifyResponseSchema = z.object({
  user: z.object({
    id: z.string().openapi({
      example: '1234567890',
      description: 'Unique identifier for the verified user'
    }),
    email: z.string().openapi({
      example: 'asep@example.com',
      description: 'Email address of the verified user'
    }),
    name: z.string().openapi({
      example: 'John Doe',
      description: 'Full name of the verified user'
    }),
  }),
})

export const verifyDescribeRoute = describeRoute({
  description: 'Verify the token',
  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': {
          schema: resolver(verifyResponseSchema),
        },
      },
    },
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: resolver(z.object({
            message: z.string(),
          })),
        },
      },
    },
    404: {
      description: 'User not found',
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
