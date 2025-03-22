import type { Contents, Modules } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.contents.deleteMany()
  await prisma.users.deleteMany()
  await prisma.modules.deleteMany()

  const modules: Modules[] = Array.from({ length: 10 }, () => ({
    id: faker.string.uuid(),
    name: faker.word.words(2),
    createdAt: new Date(),
    updatedAt: new Date(),
  }))
  const modules2 = await prisma.modules.createManyAndReturn({
    data: modules,
  })

  const contents: Contents[] = Array.from({ length: 68 }, () => ({
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(3),
    moduleId: faker.helpers.arrayElement(modules2.map(m => m.id)),
    createdAt: new Date(),
    updatedAt: new Date(),
    img_url: faker.image.urlLoremFlickr(),
  }))

  await prisma.contents.createMany({
    data: contents,
  })
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
