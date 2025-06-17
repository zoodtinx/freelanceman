import { getRelativeDate, Ids } from '@/demo/helpers/seed-user-data/level-3';

export const getAuraTeaCoTasks = (ids: Ids) => {
    const auraTeaCoTaskGenerators: [string, any][] = [
        ["Brand Story Video for 'About Us' Page", generateBrandStoryVideoForAboutUsPageTasks],
        ['New Tropical Bliss Blend Packaging Design', generateNewTropicalBlissBlendPackagingDesignTasks],
        ['Q3 Social Media Content & Engagement Strategy', generateQ3SocialMediaContentEngagementStrategyTasks],
    ];

    return auraTeaCoTaskGenerators.flatMap(([projectTitle, generateFn]) => {
        const projectIds = ids[projectTitle];

        if (!projectIds) {
            console.warn(
                `Warning: IDs not found for project: "${projectTitle}" for Aura Tea Co. No tasks generated.`,
            );
            return [];
        }

        return generateFn(projectIds);
    });
};

const generateNewTropicalBlissBlendPackagingDesignTasks = (ids: Ids) => {
    return [
        {
            name: 'Source high-resolution tropical fruit imagery',
            status: 'pending',
            dueAt: getRelativeDate(-3, false),
            details:
                'Identify and download high-quality, vibrant images of tropical fruits for various packaging elements. Prioritize clarity and color saturation. Check licensed stock photo sites first.',
            link: 'https://www.istockphoto.com/photos/tropical-fruit',
            isWithTime: false, // This task doesn't require a specific time
            ...ids,
        },
        {
            name: 'Develop Concept 1: Minimalist Packaging Layout',
            status: 'pending',
            dueAt: getRelativeDate(6, true), // Now includes specific time
            details:
                'Create the first packaging design concept focusing on a clean, elegant, and minimalist aesthetic. Incorporate the approved color palette and core brand elements. Ensure scalability for different package sizes.',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Develop Concept 2: Vibrant & Energetic Packaging Layout',
            status: 'pending',
            dueAt: getRelativeDate(6, true), // Now includes specific time
            details:
                "Design the second packaging concept to be bold, colorful, and energetic, reflecting the 'Tropical Bliss' name. Experiment with dynamic typography and fruit arrangements.",
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Develop Concept 3: Premium & Textured Packaging Layout',
            status: 'pending',
            dueAt: getRelativeDate(6, true), // Now includes specific time
            details:
                "Craft the third packaging concept with a focus on premium feel and subtle textures. Explore finishes and material suggestions that would elevate the product's perceived value.",
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Prepare Client Presentation Deck',
            status: 'pending',
            dueAt: getRelativeDate(7, true), // Now includes specific time
            details:
                'Compile all three packaging concepts into a clear, compelling presentation. Include mockups, rationale behind each design, and potential material suggestions for Aura Tea Co.',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Send Packaging Concepts for Client Review',
            status: 'pending',
            dueAt: getRelativeDate(7, true), // Already had specific time, kept it
            details:
                "Upload the presentation deck and all necessary files to the client's preferred platform and formally notify them for review. Confirm feedback deadline.",
            link: 'https://clientportal.auratea.com/design-review',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Incorporate Client Feedback (Round 1)',
            status: 'completed',
            dueAt: getRelativeDate(-5, true), // Now includes specific time
            details:
                'Reviewed and applied all initial feedback received from Aura Tea Co. on the chosen packaging concept. Focused on minor adjustments to color and typography.',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Prepare Final Print-Ready Packaging Files',
            status: 'completed',
            dueAt: getRelativeDate(-2, false), // Kept without specific time
            details:
                'Finalized all design elements, ensured proper bleeds, trims, and color profiles (CMYK) for print production. Packaged all fonts and linked assets.',
            isWithTime: false,
            ...ids,
        },
        {
            name: 'Deliver Final Packaging Files to Client',
            status: 'completed',
            dueAt: getRelativeDate(-1, false), // Kept without specific time
            details:
                "Uploaded the comprehensive final packaging asset package to the client's secure cloud storage and confirmed receipt.",
            isWithTime: false,
            ...ids,
        },
    ];
};

const generateQ3SocialMediaContentEngagementStrategyTasks = (ids: Ids) => {
    return [
        {
            name: 'Research trending healthy lifestyle hashtags',
            status: 'pending',
            dueAt: getRelativeDate(2, true), // 2 days from now, with time
            details:
                'Identify 10-15 high-performing and relevant hashtags related to healthy living, wellness, and tea consumption to boost visibility for Aura Tea Co.',
            link: 'https://trends.google.com/trends/',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Develop content calendar for July posts',
            status: 'pending',
            dueAt: getRelativeDate(5, false), // 5 days from now, no specific time
            details:
                "Outline themes, topics, and post types (e.g., recipes, facts, user spotlights) for the entire month of July. Align with brand's healthy lifestyle angle.",
            isWithTime: false,
            ...ids,
        },
        {
            name: 'Design 5 Instagram carousel graphics (July Week 1)',
            status: 'pending',
            dueAt: getRelativeDate(7, true), // 7 days from now, with time
            details:
                "Create engaging visual assets for the first week of July's social media content, focusing on vibrant colors and clear messaging about tea benefits.",
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Draft captions for July Week 1 posts',
            status: 'pending',
            dueAt: getRelativeDate(-7, true), // 7 days from now, with time
            details:
                'Write compelling and concise captions for the first batch of July posts, including relevant calls to action and hashtags.',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Schedule content review call with Ms. Preeya',
            status: 'pending',
            dueAt: getRelativeDate(8, true), // 8 days from now, with time
            details:
                'Confirm a date and time for Ms. Preeya to review the July content calendar and initial assets. Propose June 20th or 21st.',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Review competitor social media strategies',
            status: 'pending',
            dueAt: getRelativeDate(10, false), // 10 days from now, no specific time
            details:
                "Analyze key competitors' social media presence, content types, and engagement tactics to identify opportunities and gaps for Aura Tea Co.",
            isWithTime: false,
            ...ids,
        },
        {
            name: 'Initial content strategy document submitted',
            status: 'completed',
            dueAt: getRelativeDate(-7, true), // 7 days ago, with time
            details:
                'Finalized and submitted the comprehensive Q3 social media content and engagement strategy document to Aura Tea Co. for initial approval.',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Client brief received and analyzed',
            status: 'completed',
            dueAt: getRelativeDate(-9, true), // 9 days ago, with time
            details:
                "Thoroughly reviewed the client's brief for Q3 objectives, target audience, and key messages. Identified primary content pillars.",
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Set up project management channels',
            status: 'completed',
            dueAt: getRelativeDate(-10, false), // 10 days ago, no specific time
            details:
                'Created and configured shared folders, communication channels (e.g., Slack, Line group), and project board for efficient collaboration.',
            isWithTime: false,
            ...ids,
        },
    ];
};

const generateBrandStoryVideoForAboutUsPageTasks = (ids: Ids) => {
    return [
        {
            name: 'Initial project brief and scope discussion',
            status: 'completed',
            dueAt: getRelativeDate(-25, true), // Completed 25 days ago
            details:
                'Conducted initial meeting with Aura Tea Co. to understand the vision, goals, and scope for the brand story video. Discussed key messages and target audience.',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Draft video script (Version 1)',
            status: 'completed',
            dueAt: getRelativeDate(-15, false), // Completed 15 days ago
            details:
                'Developed the first draft of the video script, incorporating brand voice and key narrative points discussed during the briefing. Focused on a 2-minute duration.',
            isWithTime: false,
            ...ids,
        },
        {
            name: 'Send script draft to client for feedback',
            status: 'completed', // This action itself was completed (sent)
            dueAt: getRelativeDate(-12, true), // Completed 12 days ago, with time
            details:
                "Submitted Script Draft 1 to Mr. Sakda via email for his team's review and comments. Requested feedback by June 10th.",
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Follow up for client feedback on script',
            status: 'pending',
            dueAt: getRelativeDate(2, true), // Pending, due in 2 days (as per project note)
            details:
                'Contact Mr. Sakda regarding the pending feedback on Script Draft 1. Emphasize that project is on hold pending this input.',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Research Chiang Rai filming locations',
            status: 'pending',
            dueAt: getRelativeDate(7, false), // Pending, due in 7 days (implies ready to proceed if budget confirmed)
            details:
                'Identify potential tea plantations, local markets, and traditional Thai homes in Chiang Rai suitable for filming locations. Focus on authentic and visually appealing sites.',
            isWithTime: false,
            ...ids,
        },
        {
            name: 'Prepare revised budget for client approval (including travel)',
            status: 'pending',
            dueAt: getRelativeDate(10, true), // Pending, due in 10 days
            details:
                'Update the project budget to include estimated travel and accommodation costs for filming in Chiang Rai. Present clear breakdown to Mr. Sakda for his final sign-off.',
            isWithTime: true,
            ...ids,
        },
    ];
};
