import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

async function seed() {
  const prisma = new PrismaClient()

  await prisma.user.upsert({
    where: { email: 'admin@agendeae.com' },
    create: {
      email: 'admin@agendeae.com',
      password: bcrypt.hashSync('Abc!123123', 10),
      name: 'Admin',
      role: 'ADMIN',
      avatar: 'https://github.com/felipe-ds-lima.png',
      isActive: true,
      isVerified: true,
    },
    update: {},
  })
}

seed()
