import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await cleanDatabase();
}

async function cleanDatabase() {
    await prisma.user.deleteMany();
    console.log('Database cleaned');
}

main()