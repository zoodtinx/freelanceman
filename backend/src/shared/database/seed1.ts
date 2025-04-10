import { PrismaClient } from '@prisma/client';
import fs from 'fs';

import { seedUser } from './seed-data/seedUser';
import { seedClients } from './seed-data/seedClients';
import { seedPartnerCompaniesData } from './seed-data/seedPartnerCompanies';

const prisma = new PrismaClient();

async function main() {
    await cleanDatabase();
    await seedUserAndClient();
}

async function cleanDatabase() {
    await prisma.project.deleteMany();
    await prisma.client.deleteMany();
    await prisma.partnerCompany.deleteMany();
    await prisma.user.deleteMany();
    console.log('Database cleaned');
}

async function seedUserAndClient() {
    const user = await prisma.user.create({
        data: {
            ...seedUser,
            clients: {
                createMany: {
                    data: seedClients,
                },
            },
            partnerCompanies: {
                createMany: {
                    data: seedPartnerCompaniesData,
                },
            },
        },
        select: {
            id: true,
            clients: {
                select: {
                    id: true,
                    name: true,
                },
            },
            partnerCompanies: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });

    console.log('id in user', user.id);

    const clientObj = user.clients.reduce((acc, client) => {
        acc[client.name] = client.id;
        return acc;
    }, {});

    const partnerCompanyObj = user.partnerCompanies.reduce((acc, company) => {
        acc[company.name] = company.id;
        return acc;
    }, {});

    const jsFileContent = `
    export const userId = "${user.id}";
    export const clientId = ${JSON.stringify(clientObj)};
    export const partnerCompanyId = ${JSON.stringify(partnerCompanyObj)};
  `;

    fs.writeFileSync('./src/shared/database/ids.ts', jsFileContent);
    console.log('Database seeded and file created!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
