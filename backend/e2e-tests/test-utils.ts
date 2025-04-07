import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function resetDatabase() {
    await prisma.$transaction([prisma.user.deleteMany()]);
}

export const accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhNjRjMmU0Zi02YWZkLTRhMjgtOTYzZi1jZTliNWRjZGQ4ZTkiLCJyb2xlIjoidXNlciIsImlhdCI6MTc0NDAwMjMwMiwiZXhwIjoxNzQ5MTg2MzAyfQ.xy_PnQjq5t2LY4PaC62i2I4H-13oM3YEDovuk69_Aw8';

export const refreshToken = '2769d98f-1e25-49ad-9e41-c05d3d261ef8';
