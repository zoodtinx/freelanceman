import { PrismaClient } from '@prisma/client';
import mockUserRecords from './mocks/mockUser';
import { mockClients } from './mocks/mockClients';
import { mockClientContacts } from './mocks/mockClientContacts';
import { mockEvents } from './mocks/mockEvents';
import { mockFiles } from './mocks/mockFiles';
import { mockPartnerCompany } from './mocks/mockPartnerCompany';
import { mockPartnerContacts } from './mocks/mockPartnerContacts';
import { mockProjects } from './mocks/mockProjects';
import { mockSalesDocuments } from './mocks/mockSalesDocument';
import { mockSalesDocumentItems } from './mocks/mockSalesDocumentItem';
import { mockTasks } from './mocks/mockTasks';

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

async function seedDatabase() {
    console.log('Seeding database...');

    await prisma.user.createMany({
        data: mockUserRecords,
    });
    await prisma.client.createMany({
        data: mockClients,
    });
    await prisma.project.createMany({
        data: mockProjects,
    });
    await prisma.clientContact.createMany({
        data: mockClientContacts,
    });
    await prisma.event.createMany({
        data: mockEvents,
    });
    await prisma.file.createMany({
        data: mockFiles,
    });
    await prisma.partnerCompany.createMany({
        data: mockPartnerCompany,
    });
    await prisma.partnerContact.createMany({
        data: mockPartnerContacts,
    });
    await prisma.salesDocument.createMany({
        data: mockSalesDocuments,
    });
    await prisma.salesDocumentItem.createMany({
        data: mockSalesDocumentItems,
    });
    await prisma.task.createMany({
        data: mockTasks,
    });

    console.log('Database seeded successfully.');
}

async function main() {
    await resetDatabase();
    await seedDatabase();
}

main()
    .catch((e) => {
        console.error('Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
