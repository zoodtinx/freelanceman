import { PrismaClient } from '@prisma/client';
import mockUserRecords from './mocks/mockUser';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: mockUserRecords,
  });

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
