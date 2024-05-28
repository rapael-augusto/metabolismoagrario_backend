import { PrismaClient } from '@prisma/client'
import { hash as bcryptHash } from 'bcrypt'
import { randomUUID } from 'node:crypto'

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@lmts.com'
  const password = '123456'
  const hashedPassword = await bcryptHash(password, 8)

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      id: randomUUID(),
      email,
      password: hashedPassword,
      name: 'Admin-LMTS',
      role: 'ADMIN',
    },
  })

  console.log('\n----------------------------------------------')
  console.log(`Default admin created: ${email} - ${password}`)
  console.log('----------------------------------------------')
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })