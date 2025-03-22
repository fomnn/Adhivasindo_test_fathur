import { env } from 'hono/adapter'
import { jwt } from 'hono/jwt'
import { createRouter } from '../lib/factory.js'
import prisma from '../lib/prisma.js'
import { getAllModulesDescribeRoute, getModuleDescribeRoute } from '../validations/module-schemas.js'

export const moduleRouter = createRouter()
  .basePath('/modules')
  .use('*', (c, next) => {
    const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c)
    const jwtMiddleware = jwt({
      secret: JWT_SECRET,
    })
    return jwtMiddleware(c, next)
  })
  .get(
    '/',
    getAllModulesDescribeRoute,
    async (c) => {
      const take = c.req.query("take")

      const modules = await prisma.modules.findMany({
        take: take ? Number.parseInt(take) : undefined
      })

      return c.json({
        modules,
      })
    },
  )
  .get(
    '/:id',
    getModuleDescribeRoute,
    async (c) => {
      const id = c.req.param('id')

      const module = await prisma.modules.findUnique({
        where: {
          id,
        },
      })

      if (!module) {
        return c.json({
          message: 'Module not found',
        }, 404)
      }

      return c.json({
        module,
      })
    },
  )
