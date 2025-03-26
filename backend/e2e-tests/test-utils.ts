import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function resetDatabase() {
    await prisma.$transaction([prisma.user.deleteMany()]);
}

export const accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNzY5ZDk4Zi0xZTI1LTQ5YWQtOWU0MS1jMDVkM2QyNjFlZjQiLCJyb2xlIjoidXNlciIsImlhdCI6MTc0Mjg3Mzg2NiwiZXhwIjoxNzQ1NDY1ODY2fQ.YCZR9LQ1gzAc2-sHLEvYoBgXxRoscIGw0Kx-EHUCA8g';
