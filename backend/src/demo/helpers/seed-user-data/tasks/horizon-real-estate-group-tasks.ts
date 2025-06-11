import { getRelativeDate, Ids } from '@/demo/helpers/seed-user-data/level-3';

const generateLuxuryCondoDigitalMarketingKitTasks = (ids: Ids) => {
    return [
        {
            name: "Send initial design concepts for e-brochure",
            status: "completed",
            dueAt: getRelativeDate(0, true), // Today, with time
            details: "Submitted the first set of design concepts for the luxury condo e-brochure to Horizon Real Estate for their review and feedback.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Gather high-resolution property photos from client",
            status: "pending",
            dueAt: getRelativeDate(4, true), // June 15th, with time
            details: "Coordinate with Horizon Real Estate's marketing team to collect all necessary high-resolution interior and exterior property photos for marketing materials.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Develop content for e-brochure (text & features)",
            status: "pending",
            dueAt: getRelativeDate(7, false), // 7 days from now, no specific time
            details: "Write compelling copy for the e-brochure, highlighting key features, amenities, and unique selling points of the luxury condo development.",
            isWithTime: false,
            ...ids,
        },
        {
            name: "Design social media ad templates (initial set)",
            status: "pending",
            dueAt: getRelativeDate(10, true), // 10 days from now, with time
            details: "Create a series of engaging social media ad templates optimized for various platforms (e.g., Facebook, Instagram) to promote the condo development.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Outline email marketing campaign flow",
            status: "pending",
            dueAt: getRelativeDate(12, false), // 12 days from now, no specific time
            details: "Map out the customer journey for the email marketing campaign, including sequence of emails, content themes, and calls to action.",
            isWithTime: false,
            ...ids,
        },
        {
            name: "Research competitor digital marketing strategies",
            status: "pending",
            dueAt: getRelativeDate(5, true), // 5 days from now, with time
            details: "Analyze digital marketing approaches of competing luxury condo developments to identify best practices and areas for innovation.",
            isWithTime: true,
            ...ids,
        },
    ];
};

export const getHorizonRealEstateGroupTasks = (ids: Ids) => {
    return [
        ...generateLuxuryCondoDigitalMarketingKitTasks(ids),
        // Add other Horizon Real Estate Group project tasks here as they are created
    ];
};