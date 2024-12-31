import prisma from '../lib/prisma'
import { hashSaltPassword, generateRandomPassword } from '../lib/utils'

async function main() {
  const response = await Promise.all([
    prisma.users.upsert({
      where: { email: 'admin@ogpctf.com' },
      update: {},
      create: {
        name: 'Admin User',
        email: 'administratoruser@ogpctf.com',
        password: await hashSaltPassword(generateRandomPassword(36)),
      },
    }),
  ])
  console.log(response)
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
