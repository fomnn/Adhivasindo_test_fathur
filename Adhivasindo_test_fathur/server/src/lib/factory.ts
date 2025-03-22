import { createFactory } from 'hono/factory'

const factory = createFactory()

export function createRouter() {
  return factory.createApp()
}
