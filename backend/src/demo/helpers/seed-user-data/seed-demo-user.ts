import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';
import { seedUserProfile } from '@/demo/helpers/seed-user-data/base/user';
import { seedClientsData } from '@/demo/helpers/seed-user-data/base/clients';
import { getProjects } from '@/demo/helpers/seed-user-data/base/projects';
import { getClientContacts } from '@/demo/helpers/seed-user-data/contacts/client-contacts';
import {
    getEvents,
    getFiles,
    getLinks,
    getSalesDocs,
    getTasks,
} from '@/demo/helpers/seed-user-data/level-3';
import { getPartnerContacts } from '@/demo/helpers/seed-user-data/contacts/partner-contacts';
import { copyS3Directory } from '@/shared/s3/helpers/copy-s3-directroy';
import { deleteS3Directory } from '@/shared/s3/helpers/delete-s3-dir';

const prisma = new PrismaClient();

interface S3Config {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    bucket: string;
}

export async function seedDemoUser(s3Config: S3Config) {
    let user: any;
    let uniqueEmail: string;

    try {
        console.log('Begin seeding user profile (outside transaction)...');
        uniqueEmail = `${uuidv4()}@freelanceman.com`;
        user = await prisma.user.create({
            data: {
                ...seedUserProfile,
                email: uniqueEmail,
                visitingStatus: {
                    create: {},
                },
            },
        });
        console.log('User created:', user.id);

        console.log('Begin files migration from master demo to S3...');
        await copyS3Directory({
            sourcePrefix: 'master',
            destinationPrefix: user.id,
            ...s3Config,
        });
        console.log(`S3 files copied to ${user.id}/`);

        console.log('Begin seeding client data...');
        await prisma.user.update({
            where: { id: user.id },
            data: {
                clients: {
                    createMany: { data: seedClientsData },
                },
                avatar: `${user.id}/user/user-avatar.webp`,
            },
        });
        console.log('Client data and avatar added.');

        console.log('Begin seeding partner contacts...');
        const seedPartnerContactsData = getPartnerContacts(user.id);
        await prisma.partnerContact.createMany({
            data: seedPartnerContactsData,
        });
        console.log('Partner contacts seeded.');

        console.log('Preparing userId & clientId...');
        const clientsData = await prisma.client.findMany({
            where: { userId: user.id },
        });
        const clientsByName = clientsData.reduce((acc, client) => {
            acc[client.name] = client.id;
            return acc;
        }, {});
        console.log('Client IDs mapped.');

        console.log('Begin seeding client contacts...');
        const seedClientContactsData = getClientContacts(
            user.id,
            clientsByName,
        );
        await prisma.clientContact.createMany({
            data: seedClientContactsData,
        });
        console.log('Client contacts seeded.');

        console.log('Begin seeding projects...');

        const seedProjectsData = getProjects(user.id, clientsByName);

        const allClientIds = [
            ...new Set(seedProjectsData.map((p) => p.clientId)),
        ];

        const allContacts = await prisma.clientContact.findMany({
            where: {
                companyId: { in: allClientIds },
            },
        });

        const contactsByCompanyId = new Map<string, typeof allContacts>();

        for (const contact of allContacts) {
            if (!contactsByCompanyId.has(contact.companyId)) {
                contactsByCompanyId.set(contact.companyId, []);
            }
            contactsByCompanyId.get(contact.companyId)!.push(contact);
        }

        await prisma.project.createMany({
            data: seedProjectsData,
        });

        const createdProjects = await prisma.project.findMany({
            where: {
                userId: user.id,
                name: { in: seedProjectsData.map((p) => p.name) },
            },
            select: {
                id: true,
                clientId: true,
            },
        });

        const clientContactOnProjectData: {
            clientContactId: string;
            projectId: string;
        }[] = [];

        for (const project of createdProjects) {
            const contacts = contactsByCompanyId.get(project.clientId!) || [];
            for (const contact of contacts) {
                clientContactOnProjectData.push({
                    clientContactId: contact.id,
                    projectId: project.id,
                });
            }
        }

        if (clientContactOnProjectData.length > 0) {
            await prisma.clientContactOnProject.createMany({
                data: clientContactOnProjectData,
            });
        }

        console.log('Projects seeded.');

        console.log('Preparing userId, clientId and projectId...');
        const projectsData = await prisma.project.findMany({
            where: { userId: user.id },
            include: { client: true },
        });
        const projectsByTitle = projectsData.reduce((acc, project) => {
            const clientName = project.client!.name;
            const projectTitle = project.name;

            if (!acc[clientName]) {
                acc[clientName] = {};
            }

            acc[clientName][projectTitle] = {
                projectId: project.id,
                clientId: project.clientId,
                userId: project.userId,
            };

            return acc;
        }, {});
        console.log('Project IDs mapped.');

        console.log('Begin seeding links...');
        const seedLinksData = getLinks(projectsByTitle);

        await prisma.link.createMany({
            data: seedLinksData,
        });
        console.log('Links seeded.');

        console.log('Begin seeding tasks...');
        const seedTasksData = getTasks(projectsByTitle);
        await prisma.task.createMany({
            data: seedTasksData,
        });
        console.log('Tasks seeded.');

        console.log('Begin seeding events...');
        const seedEventsData = getEvents(projectsByTitle);
        await prisma.event.createMany({
            data: seedEventsData,
        });
        console.log('Events seeded.');

        console.log('Begin seeding files...');
        const seedFilesData = getFiles(projectsByTitle);
        await prisma.file.createMany({
            data: seedFilesData,
        });
        console.log('Files seeded.');

        console.log('Begin seeding sales doc...');
        const seedSalesDocData = getSalesDocs(projectsByTitle);
        for (const { items, ...salesDocData } of seedSalesDocData) {
            const salesDoc = await prisma.salesDocument.create({
                data: salesDocData,
            });

            if (items.length > 0) {
                const salesDocItems = items.map((item: any) => ({
                    ...item,
                    parentDocumentId: salesDoc.id,
                }));

                await prisma.salesDocumentItem.createMany({
                    data: salesDocItems,
                });
            }
        }
        console.log('Sales doc seeded.');

        console.log('Finished seeding all data related to user.');
        return user;
    } catch (error) {
        console.error('Error during seeding operation:', error);
        if (user && user.id) {
            console.log(
                `Seeding failed. Attempting to clean up S3 data for user: ${user.id}`,
            );
            try {
                await deleteS3Directory({
                    prefix: user.id,
                    ...s3Config,
                });
                console.log(
                    `S3 data for user ${user.id} successfully deleted.`,
                );
            } catch (s3Error) {
                console.error(
                    `Failed to delete S3 data for user ${user.id}:`,
                    s3Error,
                );
            }
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}
