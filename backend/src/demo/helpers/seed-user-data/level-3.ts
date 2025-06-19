import * as tasks from '@/demo/helpers/seed-user-data/tasks';
import * as events from '@/demo/helpers/seed-user-data/events';
import * as files from '@/demo/helpers/seed-user-data/files';
import * as links from '@/demo/helpers/seed-user-data/links';
import {
    generateAuraTeaCoSalesDoc,
    generateByteNestQuotation,
    getAuraTeaCoSalesDoc,
    getByteNestSalesDoc,
} from '@/demo/helpers/seed-user-data/sales-document/sales-document';

export const getRelativeDate = (
    daysToAdd: number,
    includeTime: boolean = false,
): string => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);

    if (includeTime) {
        const randomHour = Math.floor(Math.random() * (17 - 9 + 1)) + 9;
        const randomMinute = Math.floor(Math.random() * 60);
        const randomSecond = Math.floor(Math.random() * 60);
        date.setHours(randomHour, randomMinute, randomSecond, 0);
    } else {
        date.setHours(0, 0, 0, 0);
    }
    return date.toISOString();
};

export const getRandomFileSize = (minKb: number, maxKb: number): number => {
    return Math.floor(Math.random() * (maxKb - minKb + 1)) + minKb;
};

export interface IdsMap {
    [key: string]: {
        userId: string;
        clientId: string;
        projectId: string;
    };
}

export interface Ids {
    userId: string;
    clientId: string;
    projectId: string;
}

export const getTasks = (idsMap: IdsMap) => {
    const taskGenerators: [string, any][] = [
        ['Aura Tea Co', tasks.getAuraTeaCoTasks],
        ['Urban Flow Fitness', tasks.getUrbanFlowFitnessTasks],
        ['ByteNest Tech Solutions', tasks.getByteNestTechSolutionsTasks],
        ['Golden Spoon Eatery', tasks.getGoldenSpoonEateryTasks],
        ['Harmony Music Academy', tasks.getHarmonyMusicAcademyTasks],
        ['Horizon Real Estate Group', tasks.getHorizonRealEstateGroupTasks],
        ['Eco-Glide Electric Scooters', tasks.getEcoGlideElectricScootersTasks],
        ['Zenith Apparel', tasks.getZenithApparelTasks],
    ];

    return taskGenerators.flatMap(([projectName, generateFn]) => {
        const ids = idsMap[projectName];

        if (!ids) {
            console.warn(
                `Warning: IDs not found for project: "${projectName}". No tasks generated for this client.`,
            );
            return [];
        }

        return generateFn(ids);
    });
};

export const getLinks = (linksMap: any) => {
    const linkGenerators: [string, any][] = [
        ['Aura Tea Co', links.getAuraTeaCoLinks],
        ['Urban Flow Fitness', links.getUrbanFlowFitnessLinks],
        ['ByteNest Tech Solutions', links.getByteNestTechSolutionsLinks],
        ['Golden Spoon Eatery', links.getGoldenSpoonEateryLinks],
        ['Harmony Music Academy', links.getHarmonyMusicAcademyLinks],
        ['Horizon Real Estate Group', links.getHorizonRealEstateGroupLinks],
        ['Eco-Glide Electric Scooters', links.getEcoGlideElectricScootersLinks],
        ['Zenith Apparel', links.getZenithApparelLinks],
    ];

    return linkGenerators.flatMap(([projectName, generateFn]) => {
        const clientSpecificData = linksMap[projectName];

        if (!clientSpecificData) {
            console.warn(
                `Warning: Link data not found for project: "${projectName}". No links generated for this client.`,
            );
            return [];
        }

        return generateFn(clientSpecificData);
    });
};

export const getEvents = (idsMap: IdsMap) => {
    const eventGenerators: [string, any][] = [
        ['Aura Tea Co', events.getAuraTeaCoEvents],
        ['Urban Flow Fitness', events.getUrbanFlowFitnessEvents],
        ['ByteNest Tech Solutions', events.getByteNestTechSolutionsEvents],
        ['Golden Spoon Eatery', events.getGoldenSpoonEateryEvents],
        ['Harmony Music Academy', events.getHarmonyMusicAcademyEvents],
        ['Horizon Real Estate Group', events.getHorizonRealEstateGroupEvents],
        [
            'Eco-Glide Electric Scooters',
            events.getEcoGlideElectricScootersEvents,
        ],
        ['Zenith Apparel', events.getZenithApparelEvents],
    ];

    return eventGenerators.flatMap(([clientName, generateFn]) => {
        const ids = idsMap[clientName];

        if (!ids) {
            console.warn(
                `Warning: IDs not found for client: "${clientName}". No events generated for this client.`,
            );
            return [];
        }

        return generateFn(ids);
    });
};

export const getFiles = (idsMap: IdsMap) => {
    const fileGenerators: [string, any][] = [
        ['Aura Tea Co', files.getAuraTeaCoFiles],
        ['Urban Flow Fitness', files.getUrbanFlowFitnessFiles],
        ['ByteNest Tech Solutions', files.getByteNestTechSolutionsFiles],
        ['Golden Spoon Eatery', files.getGoldenSpoonEateryFiles],
        ['Harmony Music Academy', files.getHarmonyMusicAcademyFiles],
        ['Horizon Real Estate Group', files.getHorizonRealEstateGroupFiles],
        ['Eco-Glide Electric Scooters', files.getEcoGlideElectricScootersFiles],
        ['Zenith Apparel', files.getZenithApparelFiles],
    ];

    return fileGenerators.flatMap(([clientName, generateFn]) => {
        const ids = idsMap[clientName];

        if (!ids) {
            console.warn(
                `Warning: IDs not found for client: "${clientName}". No files generated for this client.`,
            );
            return [];
        }

        return generateFn(ids);
    });
};

export const getSalesDocs = (idsMap: IdsMap) => {
    const salesDocGenerators: [string, any][] = [
        ['Aura Tea Co', getAuraTeaCoSalesDoc],
        ['ByteNest Tech Solutions', getByteNestSalesDoc],
    ];

    return salesDocGenerators.flatMap(([clientName, generateFn]) => {
        const ids = idsMap[clientName];

        if (!ids) {
            console.warn(
                `Warning: IDs not found for client: "${clientName}". No sales doc generated for this client.`,
            );
            return [];
        }

        return generateFn(ids);
    });
};

export const getSalesDocItems = (idsMap: IdsMap) => {
    const salesDocGenerators: [string, any][] = [
        ['Aura Tea Co', getAuraTeaCoSalesDoc],
        ['ByteNest Tech Solutions', getByteNestSalesDoc],
    ];

    return salesDocGenerators.flatMap(([clientName, generateFn]) => {
        const ids = idsMap[clientName];

        if (!ids) {
            console.warn(
                `Warning: IDs not found for client: "${clientName}". No sales doc generated for this client.`,
            );
            return [];
        }

        return generateFn(ids);
    });
};