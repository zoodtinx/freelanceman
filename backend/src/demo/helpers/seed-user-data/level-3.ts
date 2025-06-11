import * as tasks from '@/demo/helpers/seed-user-data/tasks';
import * as events from '@/demo/helpers/seed-user-data/events';

export const getRelativeDate = (
    daysToAdd: number,
    includeTime: boolean = false,
): string => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);

    if (includeTime) {
        const randomHour = Math.floor(Math.random() * (17 - 9 + 1)) + 9; // Random hour between 9 AM and 5 PM
        const randomMinute = Math.floor(Math.random() * 60); // Random minute
        const randomSecond = Math.floor(Math.random() * 60); // Random second for more variation
        date.setHours(randomHour, randomMinute, randomSecond, 0);
    } else {
        date.setHours(0, 0, 0, 0); // Set to start of day for non-time specific tasks
    }
    return date.toISOString();
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
        [
            'Eco-Glide Electric Scooters',
            tasks.getEcoGlideElectricScootersTasks,
        ],
        ['Zenith Apparel', tasks.getZenithApparelTasks],
    ];

     return taskGenerators.flatMap(([projectName, generateFn]) => {
        const ids = idsMap[projectName];

        if (!ids) {
            console.warn(`Warning: IDs not found for project: "${projectName}". No tasks generated for this client.`);
            return [];
        }

        return generateFn(ids);
    });
}

export const getEvents = (idsMap: IdsMap) => {
    const eventGenerators: [string, any][] = [
        ['Aura Tea Co', events.getAuraTeaCoEvents],
        ['Urban Flow Fitness', events.getUrbanFlowFitnessEvents],
        ['Byte Nest Tech Solutions', events.getByteNestTechSolutionsEvents],
        ['Golden Spoon Eatery', events.getGoldenSpoonEateryEvents],
        ['Harmony Music Academy', events.getHarmonyMusicAcademyEvents],
        ['Horizon Real Estate Group', events.getHorizonRealEstateGroupEvents],
        ['Eco-Glide Electric Scooters', events.getEcoGlideElectricScootersEvents],
        ['Zenith Apparel', events.getZenithApparelEvents],
    ];

    return eventGenerators.flatMap(([clientName, generateFn]) => {
        const ids = idsMap[clientName];

        if (!ids) {
            console.warn(`Warning: IDs not found for client: "${clientName}". No events generated for this client.`);
            return [];
        }

        return generateFn(ids);
    });
};
