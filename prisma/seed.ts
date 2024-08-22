import { PrismaClient } from '@prisma/client'
import { hash as bcryptHash } from 'bcrypt'
import { randomUUID } from 'node:crypto'
import * as fs from 'fs'
import * as path from 'path'

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

  const countriesFilePath = path.join(__dirname, 'countries.json')
  const countriesData = fs.readFileSync(countriesFilePath, 'utf-8')
  const countries = JSON.parse(countriesData)

  for(const country of countries) {
    await prisma.country.upsert({
      where: { nome_pais: country.nome_pais },
      update: {},
      create: {
        id: randomUUID(),
        gentilico: country.gentilico,
        nome_pais: country.nome_pais,
        nome_pais_int: country.nome_pais_int,
        sigla: country.sigla,
      },
    })
  }

  console.log('\n----------------------------------------------')
  console.log('Predefined countries seeded')
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