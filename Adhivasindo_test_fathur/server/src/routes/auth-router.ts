import type { JWTPayload } from 'hono/utils/jwt/types'
import { validator as zValidator } from 'hono-openapi/zod'
import { env } from 'hono/adapter'
import { sign, verify } from 'hono/jwt'
import { createRouter } from '../lib/factory.js'
import prisma from '../lib/prisma.js'
import { loginDescribeRoute, loginSchema, signupDescribeRoute, signupSchema, verifyDescribeRoute } from '../validations/auth-schemas.js'

export const authRouter = createRouter()
  .basePath('/auth')
  .post(
    '/login',
    loginDescribeRoute,
    zValidator('json', loginSchema),
    async (c) => {
      const {
        email,
        password,
      } = c.req.valid('json')

      const user = await prisma.users.findFirst({
        where: {
          email,
        },
      })

      if (!user) {
        return c.json({
          message: 'User not found',
        }, 404)
      }

      if (user.password !== password) {
        return c.json({
          message: 'Invalid password',
        }, 401)
      }

      const payload: JWTPayload = {
        id: user.id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 5, // 1 hour,
      }
      const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c)

      const token = await sign(payload, JWT_SECRET)

      return c.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      })
    },
  )
  .post(
    '/signup',
    signupDescribeRoute,
    zValidator('json', signupSchema),
    async (c) => {
      const {
        email,
        password,
        name,
      } = c.req.valid('json')

      const emailExists = await prisma.users.findFirst({
        where: {
          email,
        },
      })

      if (emailExists) {
        return c.json({
          message: 'Email already exists',
        }, 400)
      }

      const user = await prisma.users.create({
        data: {
          email,
          password,
          name,
        },
      })

      const payload: JWTPayload = {
        id: user.id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 5, // 1 hour,
      }
      const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c)

      const token = await sign(payload, JWT_SECRET)

      return c.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      })
    },
  )
  .post(
    '/verify',
    verifyDescribeRoute,
    async (c) => {
      const token = c.req.header('Authorization')?.split('Bearer ')[1]

      if (!token) {
        return c.json({
          message: 'Token not found',
        }, 401)
      }

      const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c)

      try {
        const payload = await verify(token, JWT_SECRET)

        const user = await prisma.users.findFirst({
          where: {
            id: payload.id as string,
          },
        })

        if (!user) {
          return c.json({
            message: 'User not found',
          }, 404)
        }

        return c.json({
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
        })
      }
      catch {
        return c.json({
          message: 'Invalid token',
        }, 401)
      }
    },
  )
