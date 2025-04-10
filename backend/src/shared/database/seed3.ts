import { PrismaClient } from '@prisma/client';
import { seedPartnerContactsData } from './seed-data/seedPartnerContacts';
import { seedClientContactsData } from './seed-data/seedClientContacts';

const prisma = new PrismaClient();

async function main() {
    await cleanDatabase();
    await seedUserAndClient();
}

async function cleanDatabase() {
    await prisma.clientContact.deleteMany();
    await prisma.partnerContact.deleteMany();
    console.log('Project data cleaned');
}

async function seedUserAndClient() {
    const partnerContacts = await prisma.partnerContact.createMany({
        data: seedPartnerContactsData,
    });

    const clientContacts = await prisma.clientContact.createMany({
        data: seedClientContactsData,
    });

    console.log('Client and partner contacts seeded');
    console.log('Client contacts', clientContacts);
    console.log('Partner contacts', partnerContacts);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
