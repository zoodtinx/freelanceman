import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';
import { seedUserProfile } from '@/demo/helpers/seed-user-data/base/user';
import { seedClientsData } from '@/demo/helpers/seed-user-data/base/clients';
import { getProjects } from '@/demo/helpers/seed-user-data/base/projects';
import { getClientContacts } from '@/demo/helpers/seed-user-data/contacts/client-contacts';
import {
    getEvents,
    getFiles,
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
        // 1. Create User (outside transaction)
        console.log('Begin seeding user profile (outside transaction)...');
        let existingUser: any;
        do {
            uniqueEmail = `${uuidv4()}@freelanceman.com`;
            existingUser = await prisma.user.findUnique({
                where: { email: uniqueEmail },
            });
        } while (existingUser);

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

        // 2. Copy S3 Directory (outside transaction)
        console.log('Begin files migration from master demo to S3...');
        await copyS3Directory({
            sourcePrefix: 'master',
            destinationPrefix: user.id,
            ...s3Config,
        });
        console.log(`S3 files copied to ${user.id}/`);

        // 3. Perform remaining data seeding in a transaction
        const result = await prisma.$transaction(async (tx) => {
            console.log('Begin seeding client data within transaction...');
            await tx.user.update({
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
            await tx.partnerContact.createMany({
                data: seedPartnerContactsData,
            });
            console.log('Partner contacts seeded.');

            console.log('Preparing userId & clientId...');
            const clientsData = await tx.client.findMany({
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
            await tx.clientContact.createMany({
                data: seedClientContactsData,
            });
            console.log('Client contacts seeded.');

            console.log('Begin seeding projects...');
            const seedProjectsData = getProjects(user.id, clientsByName);
            await Promise.all(
                seedProjectsData.map(async (projectData) => {
                    const contacts = await tx.clientContact.findMany({
                        where: {
                            companyId: projectData.clientId,
                        },
                    });

                    const { links, ...restOfProjectData } = projectData;

                    await tx.project.create({
                        data: {
                            ...restOfProjectData,
                            links: {
                                createMany: {
                                    data: links,
                                },
                            },
                            clientContacts: {
                                create: contacts.map((contact) => ({
                                    clientContact: {
                                        connect: {
                                            id: contact.id,
                                        },
                                    },
                                })),
                            },
                        },
                    });
                }),
            );
            console.log('Projects seeded.');

            console.log('Preparing userId, clientId and projectId...');
            const projectsData = await tx.project.findMany({
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

            console.log('Begin seeding tasks...');
            const seedTasksData = getTasks(projectsByTitle);
            await tx.task.createMany({
                data: seedTasksData,
            });
            console.log('Tasks seeded.');

            console.log('Begin seeding events...');
            const seedEventsData = getEvents(projectsByTitle);
            await tx.event.createMany({
                data: seedEventsData,
            });
            console.log('Events seeded.');

            console.log('Begin seeding files...');
            const seedFilesData = getFiles(projectsByTitle);
            await tx.file.createMany({
                data: seedFilesData,
            });
            console.log('Files seeded.');
            
            console.log('Begin seeding sales doc...');
            const seedSalesDocData = getSalesDocs(projectsByTitle);
            await Promise.all(
                seedSalesDocData.map(async (salesDoc) => {
                    const { items, ...rest } = salesDoc;
                    console.log('items', items)
                    await tx.salesDocument.create({
                        data: {
                            items: {
                                createMany: {
                                    data: items
                                },
                            },
                            ...rest,
                        },
                    });
                }),
            );
            console.log('Sales doc seeded.');

            console.log('Finished seeding all data related to user.');
            return user;
        });
        return result;
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
        // Re-throw the error to ensure the calling function knows about the failure
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}
