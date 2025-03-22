import fs from 'node:fs'
import { serve } from '@hono/node-server'
import { apiReference } from '@scalar/hono-api-reference'
import { Hono } from 'hono'
import { generateSpecs, openAPISpecs } from 'hono-openapi'
import { cors } from 'hono/cors'
import { createRouter } from './lib/factory.js'
import { authRouter } from './routes/auth-router.js'
import { contentRouter } from './routes/content-router.js'
import { moduleRouter } from './routes/module-router.js'

const app = new Hono()

app.use('*', cors())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const api = createRouter()

api.route('/', authRouter)
api.route('/', moduleRouter)
api.route('/', contentRouter)

app.route('/api', api)

app.get(
  '/openapi',
  openAPISpecs(app, {
    documentation: {
      info: {
        title: 'Tes Adhivasindo - Fathur Rahman',
        version: '1.0.0',
        description: 'API for authentication and content management',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Local server',
        },
      ],
    },
  }),
)

app.get(
  '/docs',
  apiReference({
    theme: 'saturn',
    // @ts-expect-error - This is a bug in the type definition
    spec: {
      url: '/openapi',
    },
  }),
)

generateSpecs(app)
  .then((spec) => {
    const pathToSpec = 'openapi.json'
    fs.writeFileSync(pathToSpec, JSON.stringify(spec, null, 2))
  })

serve({
  fetch: app.fetch,
  port: 3000,
}, (info) => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${info.port}`)
})
