import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { seedProjectsData } from './seed-data/seedProjects';

const prisma = new PrismaClient();

async function main() {
    await cleanDatabase();
    await seedUserAndClient();
}

async function cleanDatabase() {
    await prisma.project.deleteMany();
    console.log('Project data cleaned');
}

async function seedUserAndClient() {
    const user = await prisma.project.createMany({
        data: seedProjectsData,
    });

    const createdProjects = await prisma.project.findMany({
        select: {
            id: true,
            title: true,
            clientId: true,
            userId: true,
        },
    });

    const projectObj = createdProjects.reduce((acc, project) => {
        acc[project.title] = {
            projectId: project.id,
            clientId: project.clientId,
            userId: project.userId,
        };
        return acc;
    }, {});

    const jsFileContent = `
        export const clientId = ${JSON.stringify(projectObj)};
   
      `;

    fs.writeFileSync('./src/shared/database/projectIds.ts', jsFileContent);
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
