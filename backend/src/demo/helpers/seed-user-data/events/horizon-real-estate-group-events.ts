import { getRelativeDate, Ids } from '@/demo/helpers/seed-user-data/level-3';

export const generateLuxuryCondoDevelopmentDigitalMarketingKitEvents = (ids: Ids) => {
    return [
        // Finished Events (3)
        {
            name: "Initial Project Briefing",
            dueAt: getRelativeDate(-20, true), // Approx. May 22
            details: "Held kick-off meeting to discuss the digital marketing kit for the luxury condo development.",
            isWithTime: true,
            tags: ['brief', 'marketing', 'condo'],
            ...ids,
        },
        {
            name: "Competitor Analysis",
            dueAt: getRelativeDate(-15, false), // Approx. May 27
            details: "Analyzed digital marketing strategies of competing luxury condo developments.",
            isWithTime: false,
            tags: ['research', 'competitor'],
            ...ids,
        },
        {
            name: "E-brochure Design Concepts Sent",
            dueAt: getRelativeDate(0, true), // Today (as per note)
            details: "Sent initial design concepts for the e-brochure to Horizon Real Estate Group for review.",
            isWithTime: true,
            tags: ['design', 'ebrochure', 'review'],
            ...ids,
        },
        // Upcoming Events (7)
        {
            name: "Client Feedback on E-brochure",
            dueAt: getRelativeDate(3, true), // June 14
            details: "Awaiting and reviewing feedback on the e-brochure design concepts.",
            isWithTime: true,
            tags: ['client', 'feedback', 'design'],
            ...ids,
        },
        {
            name: "High-Res Property Photo Gathering",
            dueAt: getRelativeDate(4, true), // June 15th (as per note)
            details: "Gathering high-resolution property photos from the client's marketing team.",
            isWithTime: true,
            tags: ['photos', 'assets', 'client'],
            ...ids,
        },
        {
            name: "Social Media Campaign Planning",
            dueAt: getRelativeDate(7, false), // June 18
            details: "Planning the social media campaign to support the luxury condo development launch.",
            isWithTime: false,
            tags: ['social', 'campaign', 'planning'],
            ...ids,
        },
        {
            name: "Website Landing Page Wireframes",
            dueAt: getRelativeDate(12, true), // June 23
            details: "Developing wireframes for the dedicated website landing page.",
            isWithTime: true,
            tags: ['website', 'landing', 'wireframe'],
            ...ids,
        },
        {
            name: "Virtual Tour Scripting",
            dueAt: getRelativeDate(17, false), // June 28
            details: "Scripting for a virtual tour of the luxury condo development.",
            isWithTime: false,
            tags: ['virtual', 'tour', 'script'],
            ...ids,
        },
        {
            name: "SEO Strategy for Launch",
            dueAt: getRelativeDate(22, true), // July 3
            details: "Developing an SEO strategy to maximize visibility for the September launch.",
            isWithTime: true,
            tags: ['seo', 'launch', 'strategy'],
            ...ids,
        },
        {
            name: "Launch Campaign Timeline Review",
            dueAt: getRelativeDate(30, true), // July 11
            details: "Reviewing the overall timeline for the digital marketing kit launch, ensuring alignment with the September 2025 launch date.",
            isWithTime: true,
            tags: ['launch', 'timeline', 'review'],
            ...ids,
        },
    ];
};

export const getHorizonRealEstateGroupEvents = (ids: Ids) => {
    return [
        ...generateLuxuryCondoDevelopmentDigitalMarketingKitEvents(ids),
    ];
};