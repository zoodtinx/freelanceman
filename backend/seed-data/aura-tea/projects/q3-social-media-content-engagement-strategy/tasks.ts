import { getRelativeDate } from 'seed-data/helpers/getRelativeDate';

export const generateQ3SocialMediaContentEngagementStrategyTasks = (
    userId: string,
    clientId: string,
    projectId: string,
) => {
    return [
        {
            name: 'Research trending healthy lifestyle hashtags',
            status: 'pending',
            dueAt: getRelativeDate(2, true), // 2 days from now, with time
            details:
                'Identify 10-15 high-performing and relevant hashtags related to healthy living, wellness, and tea consumption to boost visibility for Aura Tea Co.',
            link: 'https://trends.google.com/trends/',
            isWithTime: true,
            userId: userId,
            clientId: clientId,
            projectId: projectId,
        },
        {
            name: 'Develop content calendar for July posts',
            status: 'pending',
            dueAt: getRelativeDate(5, false), // 5 days from now, no specific time
            details:
                "Outline themes, topics, and post types (e.g., recipes, facts, user spotlights) for the entire month of July. Align with brand's healthy lifestyle angle.",
            isWithTime: false,
            userId: userId,
            clientId: clientId,
            projectId: projectId,
        },
        {
            name: 'Design 5 Instagram carousel graphics (July Week 1)',
            status: 'pending',
            dueAt: getRelativeDate(7, true), // 7 days from now, with time
            details:
                "Create engaging visual assets for the first week of July's social media content, focusing on vibrant colors and clear messaging about tea benefits.",
            isWithTime: true,
            userId: userId,
            clientId: clientId,
            projectId: projectId,
        },
        {
            name: 'Draft captions for July Week 1 posts',
            status: 'pending',
            dueAt: getRelativeDate(7, true), // 7 days from now, with time
            details:
                'Write compelling and concise captions for the first batch of July posts, including relevant calls to action and hashtags.',
            isWithTime: true,
            userId: userId,
            clientId: clientId,
            projectId: projectId,
        },
        {
            name: 'Schedule content review call with Ms. Preeya',
            status: 'pending',
            dueAt: getRelativeDate(8, true), // 8 days from now, with time
            details:
                'Confirm a date and time for Ms. Preeya to review the July content calendar and initial assets. Propose June 20th or 21st.',
            isWithTime: true,
            userId: userId,
            clientId: clientId,
            projectId: projectId,
        },
        {
            name: 'Review competitor social media strategies',
            status: 'pending',
            dueAt: getRelativeDate(10, false), // 10 days from now, no specific time
            details:
                "Analyze key competitors' social media presence, content types, and engagement tactics to identify opportunities and gaps for Aura Tea Co.",
            isWithTime: false,
            userId: userId,
            clientId: clientId,
            projectId: projectId,
        },
        {
            name: 'Initial content strategy document submitted',
            status: 'completed',
            dueAt: getRelativeDate(-7, true), // 7 days ago, with time
            details:
                'Finalized and submitted the comprehensive Q3 social media content and engagement strategy document to Aura Tea Co. for initial approval.',
            isWithTime: true,
            userId: userId,
            clientId: clientId,
            projectId: projectId,
        },
        {
            name: 'Client brief received and analyzed',
            status: 'completed',
            dueAt: getRelativeDate(-9, true), // 9 days ago, with time
            details:
                "Thoroughly reviewed the client's brief for Q3 objectives, target audience, and key messages. Identified primary content pillars.",
            isWithTime: true,
            userId: userId,
            clientId: clientId,
            projectId: projectId,
        },
        {
            name: 'Set up project management channels',
            status: 'completed',
            dueAt: getRelativeDate(-10, false), // 10 days ago, no specific time
            details:
                'Created and configured shared folders, communication channels (e.g., Slack, Line group), and project board for efficient collaboration.',
            isWithTime: false,
            userId: userId,
            clientId: clientId,
            projectId: projectId,
        },
    ];
};
