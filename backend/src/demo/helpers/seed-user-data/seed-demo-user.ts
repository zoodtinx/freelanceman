import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';
import { seedUserProfile } from '@/demo/helpers/seed-user-data/base/user';
import { seedClientsData } from '@/demo/helpers/seed-user-data/base/clients';
import { getProjects } from '@/demo/helpers/seed-user-data/base/projects';
import { getClientContacts } from '@/demo/helpers/seed-user-data/contacts/client-contacts';
import { getEvents, getTasks } from '@/demo/helpers/seed-user-data/level-3';

const prisma = new PrismaClient();

export async function seedDemoUser() {
    try {
        const result = await prisma.$transaction(async (tx) => {
            console.log('Begin seeding user profile & clients...');
            let uniqueEmail: string;
            let existingUser: any;
            do {
                uniqueEmail = `${uuidv4()}@freelanceman.com`;
                existingUser = await prisma.user.findUnique({
                    where: { email: uniqueEmail },
                });
            } while (existingUser);
            const user = await tx.user.create({
                data: {
                    ...seedUserProfile,
                    email: uniqueEmail,
                    clients: {
                        createMany: { data: seedClientsData },
                    },
                    visitingStatus: {
                        create: {},
                    },
                },
            });

            console.log('Preparing userId & clientId...');
            const clientsData = await tx.client.findMany();
            const clientsByName = clientsData.reduce((acc, client) => {
                acc[client.name] = client.id;
                return acc;
            }, {});

            console.log('Begin seeding client contacts...');
            const seedClientContactsData = getClientContacts(
                user.id,
                clientsByName,
            );
            await tx.clientContact.createMany({
                data: seedClientContactsData,
            });

            console.log('Begin seeding projects...');
            const seedProjectsData = getProjects(user.id, clientsByName);
            await Promise.all(
                seedProjectsData.map(async (projectData) => {
                    const contacts = await tx.clientContact.findMany({
                        where: {
                            companyId: projectData.clientId,
                        },
                    });

                    console.log('projectData.clientId', projectData.clientId);
                    console.log('contacts', contacts);

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

            console.log('Preparing userId, clientId and projectId...');
            const projectsData = await tx.project.findMany({
                include: { client: true },
            });
            const projectsByTitle = projectsData.reduce((acc, project) => {
                const clientName = project.client!.name;
                const projectTitle = project.title;

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

            console.log('Begin seeding tasks...');
            const seedTasksData = getTasks(projectsByTitle);
            await tx.task.createMany({
                data: seedTasksData,
            });

            console.log('Begin seeding events...');
            const seedEventsData = getEvents(projectsByTitle);
            await tx.event.createMany({
                data: seedEventsData,
            });

            console.log('finished seeding');
            return user;
        });
        return result;
    } catch (error) {
        // console.log('error', error);
    }
}
