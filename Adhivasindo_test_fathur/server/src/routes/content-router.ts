import { createRouter } from '../lib/factory.js'
import prisma from '../lib/prisma.js'
import { getAllContentDescribeRoute, getContentDescribeRoute } from '../validations/content-schemas.js'

export const contentRouter = createRouter()
  .basePath('/modules/:moduleId/contents')
  .get(
    '/',
    getAllContentDescribeRoute,
    async (c) => {
      const take = c.req.query('take')

      const moduleId = c.req.param('moduleId')
      const contents = await prisma.contents.findMany({
        where: {
          moduleId,
        },
        take: take ? Number.parseInt(take) : undefined,
      })

      return c.json({
        contents,
      })
    },
  )
  .get(
    '/:id',
    getContentDescribeRoute,
    async (c) => {
      const id = c.req.param('id')

      const content = await prisma.contents.findUnique({
        where: {
          id,
        },
      })

      if (!content) {
        return c.json(
          {
            message: 'Content not found',
          },
          404,
        )
      }

      return c.json({
        content,
      })
    },
  )
