import { PrismaClient } from '@prisma/client';
import { getSeedFilesDta } from './seed-factory/seed-files';
import {
    getSeedSalesDocument,
    getSeedSalesDocumentData,
} from './seed-factory/seed-sales-document';
import { getSalesDocumentItemsData } from './seed-factory/seed-sales-document-item';

const prisma = new PrismaClient();

async function main() {
    await cleanDatabase();
    await seedUserAndClient();
}

async function cleanDatabase() {
    await prisma.file.deleteMany();
    await prisma.salesDocument.deleteMany();
    await prisma.salesDocumentItem.deleteMany();
    console.log('Database cleaned');
}

async function seedUserAndClient() {
    const user = await prisma.user.findMany({
        select: {
            id: true,
        },
    });
    const userId = user[0].id;

    const project = await prisma.project.findFirst({
        where: {
            title: 'Brand Identity Redesign for Law Firm',
        },
    });

    const projectId = project?.id;
    const client = await prisma.client.findFirst({
        where: {
            name: 'Sullivan & Phanich',
        },
    });
    const clientId = client?.id;

    const seedFileData = getSeedFilesDta(userId, projectId, clientId);
    const files = await prisma.file.createMany({
        data: seedFileData,
    });
    console.log('Seeded files:', files.count);

    const seedSalesDocumentData = getSeedSalesDocumentData(
        userId,
        projectId,
        clientId,
    );

    const salesDocument = await prisma.salesDocument.createMany({
        data: seedSalesDocumentData,
    });
    console.log('Seeded documents:', salesDocument.count);

    const salesDocuments = await prisma.salesDocument.findMany({select: {id: true}})

    const salesDocumentItemsData = getSalesDocumentItemsData(userId)
    const salesDocumentItems = await Promise.all(
        salesDocumentItemsData.map((item) =>
            prisma.salesDocumentItem.create({
                data: {
                    ...item,
                    salesDoc: {
                        connect: salesDocuments
                    }
                },


            }),
        ),
    )
    console.log('Seeded items:', salesDocumentItems.length);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
