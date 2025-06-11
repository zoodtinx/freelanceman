import { getRelativeDate, Ids } from '@/demo/helpers/seed-user-data/level-3';

const generateNewModelX2LaunchCampaignAssetsTasks = (ids: Ids) => {
    return [
        {
            name: 'Attend kick-off meeting for X-2 launch',
            status: 'pending',
            dueAt: getRelativeDate(1, true),
            details:
                'Participate in the virtual kick-off meeting to understand project goals, target audience, and key messages for the new Model X-2 launch campaign.',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Research competitor launch campaigns',
            status: 'pending',
            dueAt: getRelativeDate(3, false),
            details:
                'Analyze recent launch campaigns from direct and indirect competitors in the electric scooter market. Identify successful strategies and areas for differentiation.',
            isWithTime: false,
            ...ids,
        },
        {
            name: 'Develop initial mood board for client review',
            status: 'pending',
            dueAt: getRelativeDate(7, true),
            details:
                'Create a visual mood board reflecting the desired aesthetic, tone, and emotional appeal for the Model X-2 campaign. Focus on sustainability and urban commuting themes.',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Brainstorm campaign taglines & slogans',
            status: 'pending',
            dueAt: getRelativeDate(5, false),
            details:
                'Generate a list of compelling taglines and slogans that highlight the benefits of the Model X-2 (e.g., eco-friendly, efficient urban travel, sleek design).',
            isWithTime: false,
            ...ids,
        },
        {
            name: 'Outline campaign asset types (e.g., social, web)',
            status: 'pending',
            dueAt: getRelativeDate(6, true),
            details:
                'Determine the specific types of campaign assets needed (e.g., Instagram reels, website banners, print ads, email graphics) and their preliminary dimensions.',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Set up project communication channels',
            status: 'completed',
            dueAt: getRelativeDate(-1, false),
            details:
                'Established primary communication channels (e.g., Slack, email threads) and file sharing methods for efficient collaboration with the EcoGlide team.',
            isWithTime: false,
            ...ids,
        },
    ];
};

export const getEcoGlideElectricScootersTasks = (ids: Ids) => {
    const ecoGlideElectricScootersTaskGenerators: [string, any][] = [
        ['New Model X-2 Launch Campaign Assets', generateNewModelX2LaunchCampaignAssetsTasks],
    ];

    return ecoGlideElectricScootersTaskGenerators.flatMap(([projectTitle, generateFn]) => {
        const projectIds = ids[projectTitle];

        if (!projectIds) {
            console.warn(
                `Warning: IDs not found for project: "${projectTitle}" for Eco-Glide Electric Scooters. No tasks generated.`,
            );
            return [];
        }

        return generateFn(projectIds);
    });
};
