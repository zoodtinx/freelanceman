import { PrismaClient } from '@prisma/client';
import { getSeedFilesDta } from './seed-factory/seed-files';
import {
    getSeedSalesDocumentData,
    getSeedSalesDocumentFileData,
} from './seed-factory/seed-sales-document';
import { getSalesDocumentItemsData } from './seed-factory/seed-sales-document-item';

const prisma = new PrismaClient();

async function main() {
    await cleanDatabase();
    await seedUserAndClient();
}

async function cleanDatabase() {
    await prisma.salesDocumentItem.deleteMany();
    await prisma.salesDocument.deleteMany();
    await prisma.file.deleteMany();
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
    const seedSalesDocumentFileData = getSeedSalesDocumentFileData(
        userId,
        projectId,
        clientId,
    );

    const salesDocument = await Promise.all(
        seedSalesDocumentData.map(
            async (doc) =>
                await prisma.salesDocument.create({
                    data: {
                        ...doc,
                        user: { connect: { id: userId } },
                        project: { connect: { id: projectId } },
                        client: { connect: { id: clientId } },
                        file: {
                            create: {
                                ...seedSalesDocumentFileData,
                                user: { connect: { id: userId } },
                                project: { connect: { id: projectId } },
                                client: { connect: { id: clientId } },
                            },
                        },
                    },
                }),
        ),
    );

    // const salesDocument = await prisma.salesDocument.createMany({
    //     data: seedSalesDocumentData,
    // });
    console.log('Seeded documents:', salesDocument);

    const salesDocuments = await prisma.salesDocument.findMany({
        select: { id: true },
    });

    const seedSalesDocumentDataResult = salesDocuments.forEach(async (item) => {
        await prisma.salesDocumentItem.createMany({
            data: getSalesDocumentItemsData(userId, item.id),
        });
    });

    console.log('Seeded Sales Document Items', seedSalesDocumentDataResult);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
