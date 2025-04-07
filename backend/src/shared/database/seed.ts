import { PrismaClient } from '@prisma/client';
import { mockClients } from './mocks/mockClients';
import { mockProjectByClient } from './clients/mockProjectByClient';
import { mockUser } from './mocks/mockUser';

const prisma = new PrismaClient();

async function resetDatabase() {
    console.log('Resetting database...');

    await prisma.$transaction([
        prisma.file.deleteMany(),
        prisma.event.deleteMany(),
        prisma.salesDocumentItem.deleteMany(),
        prisma.salesDocument.deleteMany(),
        prisma.task.deleteMany(),
        prisma.project.deleteMany(),
        prisma.clientContact.deleteMany(),
        prisma.partnerContact.deleteMany(),
        prisma.partnerCompany.deleteMany(),
        prisma.client.deleteMany(),
        prisma.user.deleteMany(),
    ]);

    console.log('Database reset complete.');
}

async function createProject(project: any, userId: string, clientId: string) {
    const processedTasks = project.tasks.map((task) => ({
        ...task,
        userId,
        clientId,
    }));

    const processedEvents = project.events.map((event) => ({
        ...event,
        userId,
        clientId,
    }));

    const processedFiles = project.files.map((file) => ({
        ...file,
        userId,
        clientId,
    }));

    const processedSalesDocuments = project.salesDocuments.map(
        (salesDocument) => ({
            ...salesDocument,
            userId,
            clientId,
            selectedProjectClientId: clientId,
        }),
    );

    return prisma.project.create({
        data: {
            ...project,
            userId,
            clientId,
            tasks: {
                createMany: {
                    data: processedTasks,
                },
            },
            events: {
                createMany: {
                    data: processedEvents,
                },
            },
            files: {
                createMany: {
                    data: processedFiles,
                },
            },
            salesDocuments: {
                createMany: {
                    data: processedSalesDocuments,
                },
            },
        },
    });
}

async function seedDatabaseWaterfall() {
    const createUserResult = await prisma.user.create({
        data: mockUser,
    });

    const userId = createUserResult.id;

    const createClientsResult = await Promise.all(
        mockClients.map((client) =>
            prisma.client.create({
                data: {
                    ...client,
                    userId,
                },
                select: {
                    id: true,
                },
            }),
        ),
    );

    const clientIds = createClientsResult.map((client) => client.id);

    await Promise.all(
        clientIds.map(async (clientId, index) =>
            mockProjectByClient[index].map(
                async (projects) =>
                    await createProject(projects, userId, clientId),
            ),
        ),
    );

    console.log('Seeded database successfully');
}

async function main() {
    await resetDatabase();
    await seedDatabaseWaterfall();
}

main()
    .catch((e) => {
        console.error('Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
