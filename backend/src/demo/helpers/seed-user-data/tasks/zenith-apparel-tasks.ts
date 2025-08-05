import { getRelativeDate, Ids } from '@/demo/helpers/seed-user-data/helper';

const generateAutumnWinter2025LookbookPhotographyDesignTasks = (ids: Ids) => {
    return [
        {
            name: "Finalize model casting selections",
            status: "pending",
            dueAt: getRelativeDate(4, true), // June 15th, with time
            details: "Review top model candidates and make final selections based on client's preference and collection aesthetic.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Scout and confirm specific shoot locations in Hua Hin",
            status: "pending",
            dueAt: getRelativeDate(8, false), // Leading up to July 5th
            details: "Finalize precise outdoor shoot locations in Hua Hin, ensuring they align with the modern, minimalist aesthetic.",
            isWithTime: false,
            ...ids,
        },
        {
            name: "Prepare photography shot list and mood board",
            status: "pending",
            dueAt: getRelativeDate(10, true),
            details: "Create a detailed shot list for each outfit and develop a visual mood board to guide the photography team during the shoot.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Coordinate travel logistics for shoot team",
            status: "pending",
            dueAt: getRelativeDate(15, false), // Well before July 5th
            details: "Arrange travel, accommodation, and equipment transport for the photography team and models for the Hua Hin shoot.",
            isWithTime: false,
            ...ids,
        },
        {
            name: "Conduct Autumn/Winter 2025 Lookbook Photo Shoot",
            status: "pending",
            dueAt: getRelativeDate(24, true), // July 5-7
            details: "Execute the primary photography session for the Autumn/Winter 2025 collection at the confirmed outdoor locations in Hua Hin.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Begin initial image culling and selection",
            status: "pending",
            dueAt: getRelativeDate(28, true), // After shoot dates
            details: "Start the process of reviewing raw images from the shoot and selecting the best shots for post-production and lookbook inclusion.",
            isWithTime: true,
            ...ids,
        },
    ];
};

const generateEcommerceProductPageCopywritingRefreshTasks = (ids: Ids) => {
    return [
        {
            name: "Analyze existing e-commerce product page copy",
            status: "completed",
            dueAt: getRelativeDate(-15, false),
            details: "Conducted a thorough audit of current product page copywriting to identify areas for improvement in clarity, SEO, and conversion.",
            isWithTime: false,
            ...ids,
        },
        {
            name: "Research target audience and product benefits",
            status: "completed",
            dueAt: getRelativeDate(-12, true),
            details: "Researched Zenith Apparel's target demographic and the unique selling points of each product to tailor compelling copy.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Draft refreshed product page copy (all items)",
            status: "completed",
            dueAt: getRelativeDate(-8, false),
            details: "Wrote new, engaging, and SEO-friendly copy for all specified e-commerce product pages, focusing on brand voice and customer appeal.",
            isWithTime: false,
            ...ids,
        },
        {
            name: "Client review and approval of copy",
            status: "completed",
            dueAt: getRelativeDate(-6, true),
            details: "Submitted the refreshed product page copy to Zenith Apparel for their review and secured final approval.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Deliver and implement final copy on platform",
            status: "completed",
            dueAt: getRelativeDate(-10, true), // June 1st
            details: "Provided the final approved copy files and assisted Zenith Apparel in implementing them across their e-commerce product pages.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Follow up with client for testimonial",
            status: "pending",
            dueAt: getRelativeDate(4, false), // Next week
            details: "Reach out to Zenith Apparel to request a testimonial regarding the positive impact of the e-commerce product page copywriting refresh.",
            isWithTime: false,
            ...ids,
        },
    ];
};

const generateSustainableCollectionLaunchSocialMediaCampaignTasks = (ids: Ids) => {
    return [
        {
            name: "Finalize social media campaign calendar",
            status: "completed",
            dueAt: getRelativeDate(-5, true),
            details: "Approved the detailed campaign calendar outlining content themes, posting schedule, and platform distribution for the sustainable collection launch.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Develop initial batch of creative assets (stills & reels)",
            status: "pending",
            dueAt: getRelativeDate(14, true), // June 25th, with time
            details: "Design and produce the first set of visual creatives, including still images and short video reels, for the social media campaign.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Draft messaging emphasizing ethical sourcing & recycled materials",
            status: "pending",
            dueAt: getRelativeDate(10, false),
            details: "Write compelling copy for all social media posts that highlights the ethical sourcing and use of recycled materials in the new collection.",
            isWithTime: false,
            ...ids,
        },
        {
            name: "Prepare for client review of first creatives",
            status: "pending",
            dueAt: getRelativeDate(14, true), // June 25th, with time
            details: "Compile the initial batch of social media creatives and associated copy into a presentation for Zenith Apparel's review.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Research trending sustainable fashion hashtags",
            status: "pending",
            dueAt: getRelativeDate(7, false),
            details: "Identify relevant and high-performing hashtags related to sustainable fashion, eco-friendly apparel, and ethical consumerism.",
            isWithTime: false,
            ...ids,
        },
        {
            name: "Outline influencer outreach strategy",
            status: "pending",
            dueAt: getRelativeDate(20, true),
            details: "Develop a strategy for collaborating with sustainability-focused fashion influencers to promote the new collection.",
            isWithTime: true,
            ...ids,
        },
    ];
};

const generateNewPackagingDesignForPremiumLineTasks = (ids: Ids) => {
    return [
        {
            name: "Initial briefing for premium line packaging",
            status: "completed",
            dueAt: getRelativeDate(-45, true),
            details: "Conducted kick-off meeting to understand Zenith Apparel's vision for new premium line packaging, including brand aesthetics and target audience.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Develop packaging design concepts (3 options)",
            status: "completed",
            dueAt: getRelativeDate(-35, false), // Submitted last month
            details: "Created multiple design concepts for the new premium packaging, exploring various materials, finishes, and structural ideas.",
            isWithTime: false,
            ...ids,
        },
        {
            name: "Submit design concepts to client for review",
            status: "completed",
            dueAt: getRelativeDate(-30, true), // Submitted last month
            details: "Sent the initial packaging design concepts to Zenith Apparel for their feedback and selection.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Follow up with Khun Nattaya for update on material quotes",
            status: "pending",
            dueAt: getRelativeDate(19, true), // End of June
            details: "Check in with Khun Nattaya from Zenith Apparel to get an update on the material quotes from their supplier, as the project is on hold pending this information.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Research alternative sustainable packaging materials",
            status: "pending",
            dueAt: getRelativeDate(25, false),
            details: "Explore new and innovative sustainable packaging materials that could align with Zenith's premium and ethical brand image, in case current supplier quotes are unsuitable.",
            isWithTime: false,
            ...ids,
        },
        {
            name: "Prepare for design revisions upon client feedback/material confirmation",
            status: "pending",
            dueAt: getRelativeDate(30, true),
            details: "Anticipate receiving client feedback and material confirmations; prepare to make necessary design revisions to the selected packaging concept.",
            isWithTime: true,
            ...ids,
        },
    ];
};

export const getZenithApparelTasks = (ids: Ids) => {
    const zenithApparelTaskGenerators: [string, any][] = [
        ['Autumn/Winter 2025 Lookbook Photography & Design', generateAutumnWinter2025LookbookPhotographyDesignTasks],
        ['E-commerce Product Page Copywriting Refresh', generateEcommerceProductPageCopywritingRefreshTasks],
        ['Sustainable Collection Launch Social Media Campaign', generateSustainableCollectionLaunchSocialMediaCampaignTasks],
        ['New Packaging Design for Premium Line', generateNewPackagingDesignForPremiumLineTasks],
    ];

    return zenithApparelTaskGenerators.flatMap(([projectTitle, generateFn]) => {
        const projectIds = ids[projectTitle];

        if (!projectIds) {
            console.warn(
                `Warning: IDs not found for project: "${projectTitle}" for Zenith Apparel. No tasks generated.`,
            );
            return [];
        }

        return generateFn(projectIds);
    });
};