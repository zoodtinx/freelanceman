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
    /*
   seed user
   */
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
            partnerCompanies: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    console.log('User created');
    console.log('Partner companies created');

    

    /*
   seed client companies
   */
    const clientsData = await prisma.client.findMany({
        select: {
            id: true,
            name: true,
        },
    });
    console.log('Clients data fetched');

    /*
   seed partner companies
   */
    const partnerCompaniesData = await prisma.partnerCompany.findMany({
        select: {
            id: true,
            name: true,
        },
    });
    console.log('Partner companies data fetched');

    /*
   prepare ids
   */
    const clientIds = clientsData.reduce((acc, client) => {
        acc[client.name] = client.id;
        return acc;
    }, {});
    console.log('Client IDs mapped');

    const partnerCompaniesIds = partnerCompaniesData.reduce(
        (acc, partnerCompany) => {
            acc[partnerCompany.name] = partnerCompany.id;
            return acc;
        },
        {},
    );
    console.log('Partner Company IDs mapped');

    /*
   seed client contacts
   */
    const seedClientContactsData = getClientContacts(user.id, clientIds);

    await prisma.clientContact.createMany({
        data: seedClientContactsData,
    });
    console.log('Client contacts created');

    /*
   seed partner contacts
   */
    const seedPartnerContactsData = getPartnerContacts(
        user.id,
        partnerCompaniesIds,
    );

    await prisma.partnerContact.createMany({
        data: seedPartnerContactsData,
    });
    console.log('Partner contacts created');

    /*
   seed projects
   */
    const seedProjectsData = getProjects(user.id, clientIds);

    await prisma.project.createMany({
        data: seedProjectsData,
    });
    console.log('Projects created');

    /*
   prepare project id
   */
    const projectData = await prisma.project.findMany({
        select: {
            id: true,
            title: true,
            clientId: true,
            userId: true,
        },
    });
    const projectIds = projectData.reduce((acc, project) => {
        acc[project.title] = {
            projectId: project.id,
            clientId: project.clientId,
            userId: project.userId,
        };
        return acc;
    }, {});

    /*
   seed events
   */
    // const seedEventsData = getEvents(projectIds);
    // seedEventsData.forEach((event) => {
    //     if (!event.projectId) {
    //         console.log('Event without projectId:', event);
    //     }
    // });
    // await prisma.event.createMany({
    //     data: seedEventsData,
    // });
    console.log('Events created');
    
    /*
   seed tasks
   */
    const seedTasksData = getTasks(projectIds);
    // seedTasksData.forEach((event) => {
    //     if (!event.projectId) {
    //         console.log('Task without projectId:', event);
    //     }
    // });
    await prisma.task.createMany({
        data: seedTasksData,
    });
    console.log('Tasks created');
}

async function cleanDatabase() {
    await prisma.event.deleteMany();
    await prisma.task.deleteMany();
    await prisma.partnerContact.deleteMany();
    await prisma.clientContact.deleteMany();
    await prisma.project.deleteMany();
    await prisma.partnerCompany.deleteMany();
    await prisma.client.deleteMany();
    await prisma.user.deleteMany();
    console.log('Database cleaned');
}

async function main() {
    await cleanDatabase();
    await seedDemoUser();
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
