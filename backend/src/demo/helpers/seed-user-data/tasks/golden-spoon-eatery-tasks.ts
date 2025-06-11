import { getRelativeDate, Ids } from '@/demo/helpers/seed-user-data/level-3';

const generateNewSummerMenuDesignPhotographyTasks = (ids: Ids) => {
    return [
        {
            name: 'Initial consultation for summer menu concept',
            status: 'completed',
            dueAt: getRelativeDate(-20, true),
            details:
                'Met with Golden Spoon Eatery to discuss their vision for the new summer menu, including desired themes, dishes, and overall aesthetic.',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Develop menu design concepts (3 options)',
            status: 'completed',
            dueAt: getRelativeDate(-15, false),
            details:
                'Created three distinct design concepts for the summer menu, incorporating modern layouts and fresh color palettes.',
            isWithTime: false,
            ...ids,
        },
        {
            name: 'Food photography session planning',
            status: 'completed',
            dueAt: getRelativeDate(-12, true),
            details:
                'Coordinated with the chef and photographer to schedule and plan the food photography session, listing all dishes to be shot.',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Conduct food photography session',
            status: 'completed',
            dueAt: getRelativeDate(-10, true),
            details:
                'Executed the professional food photography session, capturing high-resolution, appealing images of all new summer menu items.',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Edit and retouch menu photography',
            status: 'completed',
            dueAt: getRelativeDate(-7, false),
            details:
                'Post-processed all food photos, ensuring color accuracy, sharpness, and overall visual appeal for menu integration.',
            isWithTime: false,
            ...ids,
        },
        {
            name: 'Finalize menu layout and content',
            status: 'completed',
            dueAt: getRelativeDate(-6, true),
            details:
                'Integrated all approved photography and dish descriptions into the chosen menu design, ensuring all details are accurate.',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Deliver final menu PDF and high-res photos',
            status: 'completed',
            dueAt: getRelativeDate(-4, true), // June 5th
            details:
                'Submitted the print-ready PDF of the new summer menu and a folder of high-resolution food photos to Golden Spoon Eatery.',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Internal review: Propose Q3 social media campaign',
            status: 'pending', // This is a forward-looking internal task based on the note
            dueAt: getRelativeDate(10, false),
            details:
                "Prepare a brief internal proposal for a social media campaign strategy focusing on the new summer menu items for Q3, given client's satisfaction.",
            isWithTime: false,
            ...ids,
        },
    ];
};

export const getGoldenSpoonEateryTasks = (ids: Ids) => {
    return [...generateNewSummerMenuDesignPhotographyTasks(ids)];
};
