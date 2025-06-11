import { getRelativeDate, Ids } from '@/demo/helpers/seed-user-data/level-3';

export const generateNewSummerMenuDesignPhotographyEvents = (ids: Ids) => {
    return [
        // Finished Events (3)
        {
            name: "Initial Concept Meeting",
            dueAt: getRelativeDate(-30, true), // Approx. May 12
            details: "Held first meeting to discuss Golden Spoon Eatery's vision for the new summer menu.",
            isWithTime: true,
            tags: ['meeting', 'concept'],
            ...ids,
        },
        {
            name: "Menu Design Mockup Approval",
            dueAt: getRelativeDate(-10, true), // Approx. June 1
            details: "Client approved initial menu design mockups, including layout and proposed imagery.",
            isWithTime: true,
            tags: ['design', 'approval'],
            ...ids,
        },
        {
            name: "Final Menu PDF & Photos Delivered",
            dueAt: getRelativeDate(-6, true), // June 5th (as per note)
            details: "Delivered the final menu PDF and high-resolution food photos to the client.",
            isWithTime: true,
            tags: ['delivery', 'photos', 'menu'],
            ...ids,
        },
        // Upcoming Events (7) - mostly post-completion follow-ups or internal planning
        {
            name: "Internal Post-Completion Review",
            dueAt: getRelativeDate(2, true), // June 13
            details: "Internal team meeting to review the project's success and identify areas for improvement.",
            isWithTime: true,
            tags: ['internal', 'review'],
            ...ids,
        },
        {
            name: "Client Satisfaction Check-in",
            dueAt: getRelativeDate(5, false), // June 16
            details: "Follow up with Golden Spoon Eatery to ensure continued satisfaction with the new menu.",
            isWithTime: false,
            tags: ['client', 'feedback'],
            ...ids,
        },
        {
            name: "Q3 Social Media Campaign Brainstorm",
            dueAt: getRelativeDate(8, true), // June 19
            details: "Internal brainstorming session to develop concepts for a Q3 social media campaign featuring new menu items.",
            isWithTime: true,
            tags: ['social', 'campaign', 'brainstorm'],
            ...ids,
        },
        {
            name: "Case Study Development Kick-off",
            dueAt: getRelativeDate(12, true), // June 23
            details: "Begin drafting a case study showcasing the success of the Golden Spoon Eatery project.",
            isWithTime: true,
            tags: ['case', 'marketing'],
            ...ids,
        },
        {
            name: "Proposal Outline for Social Campaign",
            dueAt: getRelativeDate(15, false), // June 26
            details: "Outline key components and estimated budget for the proposed Q3 social media campaign.",
            isWithTime: false,
            tags: ['proposal', 'social'],
            ...ids,
        },
        {
            name: "Testimonial Request Follow-up",
            dueAt: getRelativeDate(20, true), // July 1
            details: "Send a formal request for a client testimonial, emphasizing their satisfaction with the vibrant colors.",
            isWithTime: true,
            tags: ['testimonial', 'client'],
            ...ids,
        },
        {
            name: "Portfolio Update for Project",
            dueAt: getRelativeDate(25, false), // July 6
            details: "Update internal portfolio with images and details of the Golden Spoon Eatery project.",
            isWithTime: false,
            tags: ['portfolio', 'update'],
            ...ids,
        },
    ];
};

export const getGoldenSpoonEateryEvents = (ids: Ids) => {
    return [
        ...generateNewSummerMenuDesignPhotographyEvents(ids),
    ];
};