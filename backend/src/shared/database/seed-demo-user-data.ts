import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';
import { seedUser } from './seed-data/seedUser';
import { seedClients } from './seed-data/seedClients';
import { seedPartnerCompaniesData } from './seed-data/seedPartnerCompanies';
import { getPartnerContacts } from './seed-factory/seed-partner-contact';
import { getClientContacts } from './seed-factory/seed-client-contact';
import { getProjects } from './seed-factory/seed-project';
import { getEvents } from './seed-factory/seed-event';
import { getTasks } from 'src/shared/database/seed-factory/seed-task';

const prisma = new PrismaClient();

export async function seedDemoUser() {
    try {
        const result = await prisma.$transaction(async (tx) => {
            console.log('Seeding user...');
            const seedUserData = seedUser();
            const uniqueEmail = `${uuidv4()}@example.com`; // Ensuring uniqueness with a new UUID for each seed
            const existingUser = await prisma.user.findUnique({
                where: { email: uniqueEmail },
            });
            console.log('existingUser ', existingUser);
            const user = await tx.user.create({
                data: {
                    ...seedUserData,
                    email: uniqueEmail,
                    clients: {
                        createMany: { data: seedClients },
                    },
                    partnerCompanies: {
                        createMany: { data: seedPartnerCompaniesData },
                    },
                },
                select: {
                    id: true,
                    partnerCompanies: {
                        select: { id: true, name: true },
                    },
                },
            });
            console.log('User created');
            console.log('Partner companies created');

            console.log('Seeding clients...');
            const clientsData = await tx.client.findMany({
                select: { id: true, name: true },
            });
            console.log('Clients data fetched');

            console.log('Seeding partner companies...');
            const partnerCompaniesData = await tx.partnerCompany.findMany({
                select: { id: true, name: true },
            });
            console.log('Partner companies data fetched');

            const clientIds = clientsData.reduce(
                (acc, c) => {
                    acc[c.name] = c.id;
                    return acc;
                },
                {} as Record<string, string>,
            );

            const partnerCompaniesIds = partnerCompaniesData.reduce(
                (acc, p) => {
                    acc[p.name] = p.id;
                    return acc;
                },
                {} as Record<string, string>,
            );

            console.log('Seeding client contacts...');
            await tx.clientContact.createMany({
                data: getClientContacts(user.id, clientIds),
            });
            console.log('Client contacts created');

            console.log('Seeding partner contacts...');
            await tx.partnerContact.createMany({
                data: getPartnerContacts(user.id, partnerCompaniesIds),
            });
            console.log('Partner contacts created');

            console.log('Seeding projects...');
            await tx.project.createMany({
                data: getProjects(user.id, clientIds),
            });
            console.log('Projects created');

            console.log('Fetching project ids...');
            const projectData = await tx.project.findMany({
                select: { id: true, title: true, clientId: true, userId: true },
            });

            const projectIds = projectData.reduce(
                (acc, p) => {
                    acc[p.title] = {
                        projectId: p.id,
                        clientId: p.clientId || '',
                        userId: p.userId,
                    };
                    return acc;
                },
                {} as Record<
                    string,
                    { projectId: string; clientId: string; userId: string }
                >,
            );

            console.log('Seeding events...');
            await tx.event.createMany({
                data: getEvents(projectIds),
            });
            console.log('Events created');

            console.log('Seeding tasks...');
            await tx.task.createMany({
                data: getTasks(projectIds),
            });
            console.log('Tasks created');

            return user;
        });

        return result;
    } catch (error) {
        console.log('error', error);
    }
}

// export async function seedDemoUser() {
//     /*
//    seed user
//    */
//     const user = await prisma.user.create({
//         data: {
//             ...seedUser,
//             clients: {
//                 createMany: {
//                     data: seedClients,
//                 },
//             },
//             partnerCompanies: {
//                 createMany: {
//                     data: seedPartnerCompaniesData,
//                 },
//             },
//         },
//         select: {
//             id: true,
//             partnerCompanies: {
//                 select: {
//                     id: true,
//                     name: true,
//                 },
//             },
//         },
//     });
//     console.log('User created');
//     console.log('Partner companies created');

//     /*
//    seed client companies
//    */
//     const clientsData = await prisma.client.findMany({
//         select: {
//             id: true,
//             name: true,
//         },
//     });
//     console.log('Clients data fetched');

//     /*
//    seed partner companies
//    */
//     const partnerCompaniesData = await prisma.partnerCompany.findMany({
//         select: {
//             id: true,
//             name: true,
//         },
//     });
//     console.log('Partner companies data fetched');

//     /*
//    prepare ids
//    */
//     const clientIds = clientsData.reduce((acc, client) => {
//         acc[client.name] = client.id;
//         return acc;
//     }, {});
//     console.log('Client IDs mapped');

//     const partnerCompaniesIds = partnerCompaniesData.reduce(
//         (acc, partnerCompany) => {
//             acc[partnerCompany.name] = partnerCompany.id;
//             return acc;
//         },
//         {},
//     );
//     console.log('Partner Company IDs mapped');

//     /*
//    seed client contacts
//    */
//     const seedClientContactsData = getClientContacts(user.id, clientIds);

//     await prisma.clientContact.createMany({
//         data: seedClientContactsData,
//     });
//     console.log('Client contacts created');

//     /*
//    seed partner contacts
//    */
//     const seedPartnerContactsData = getPartnerContacts(
//         user.id,
//         partnerCompaniesIds,
//     );

//     await prisma.partnerContact.createMany({
//         data: seedPartnerContactsData,
//     });
//     console.log('Partner contacts created');

//     /*
//    seed projects
//    */
//     const seedProjectsData = getProjects(user.id, clientIds);

//     await prisma.project.createMany({
//         data: seedProjectsData,
//     });
//     console.log('Projects created');

//     /*
//    prepare project id
//    */
//     const projectData = await prisma.project.findMany({
//         select: {
//             id: true,
//             title: true,
//             clientId: true,
//             userId: true,
//         },
//     });
//     const projectIds = projectData.reduce((acc, project) => {
//         acc[project.title] = {
//             projectId: project.id,
//             clientId: project.clientId,
//             userId: project.userId,
//         };
//         return acc;
//     }, {});

//     /*
//    seed events
//    */
//     const seedEventsData = getEvents(projectIds);
//     seedEventsData.forEach((event) => {
//         if (!event.projectId) {
//             console.log('Event without projectId:', event);
//         }
//     });
//     await prisma.event.createMany({
//         data: seedEventsData,
//     });
//     console.log('Events created');

//     /*
//    seed tasks
//    */
//     const seedTasksData = getTasks(projectIds);
//     seedTasksData.forEach((task) => {
//         if (!task.projectId) {
//             console.log('Task without projectId:', task);
//         }
//     });
//     await prisma.task.createMany({
//         data: seedTasksData,
//     });
//     console.log('Tasks created');

//     return user
// }

// async function cleanDatabase() {
//     await prisma.event.deleteMany();
//     await prisma.task.deleteMany();
//     await prisma.partnerContact.deleteMany();
//     await prisma.clientContact.deleteMany();
//     await prisma.project.deleteMany();
//     await prisma.partnerCompany.deleteMany();
//     await prisma.client.deleteMany();
//     await prisma.user.deleteMany();
//     console.log('Database cleaned');
// }

// async function main() {
//     await cleanDatabase();
//     await seedDemoUser();
// }

// main()
//     .catch((e) => {
//         console.error(e);
//         process.exit(1);
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     });
