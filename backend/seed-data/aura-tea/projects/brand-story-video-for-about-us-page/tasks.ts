import { getRelativeDate } from 'seed-data/helpers/getRelativeDate';

export const generateBrandStoryVideoForAboutUsPageTasks = (
    userId: string,
    clientId: string,
    projectId: string,
) => {
    return [
        {
            name: 'Initial project brief and scope discussion',
            status: 'completed',
            dueAt: getRelativeDate(-25, true), // Completed 25 days ago
            details:
                'Conducted initial meeting with Aura Tea Co. to understand the vision, goals, and scope for the brand story video. Discussed key messages and target audience.',
            isWithTime: true,
            userId: userId,
            clientId: clientId,
            projectId: projectId,
        },
        {
            name: 'Draft video script (Version 1)',
            status: 'completed',
            dueAt: getRelativeDate(-15, false), // Completed 15 days ago
            details:
                'Developed the first draft of the video script, incorporating brand voice and key narrative points discussed during the briefing. Focused on a 2-minute duration.',
            isWithTime: false,
            userId: userId,
            clientId: clientId,
            projectId: projectId,
        },
        {
            name: 'Send script draft to client for feedback',
            status: 'completed', // This action itself was completed (sent)
            dueAt: getRelativeDate(-12, true), // Completed 12 days ago, with time
            details:
                "Submitted Script Draft 1 to Mr. Sakda via email for his team's review and comments. Requested feedback by June 10th.",
            isWithTime: true,
            userId: userId,
            clientId: clientId,
            projectId: projectId,
        },
        {
            name: 'Follow up for client feedback on script',
            status: 'pending',
            dueAt: getRelativeDate(2, true), // Pending, due in 2 days (as per project note)
            details:
                'Contact Mr. Sakda regarding the pending feedback on Script Draft 1. Emphasize that project is on hold pending this input.',
            isWithTime: true,
            userId: userId,
            clientId: clientId,
            projectId: projectId,
        },
        {
            name: 'Research Chiang Rai filming locations',
            status: 'pending',
            dueAt: getRelativeDate(7, false), // Pending, due in 7 days (implies ready to proceed if budget confirmed)
            details:
                'Identify potential tea plantations, local markets, and traditional Thai homes in Chiang Rai suitable for filming locations. Focus on authentic and visually appealing sites.',
            isWithTime: false,
            userId: userId,
            clientId: clientId,
            projectId: projectId,
        },
        {
            name: 'Prepare revised budget for client approval (including travel)',
            status: 'pending',
            dueAt: getRelativeDate(10, true), // Pending, due in 10 days
            details:
                'Update the project budget to include estimated travel and accommodation costs for filming in Chiang Rai. Present clear breakdown to Mr. Sakda for his final sign-off.',
            isWithTime: true,
            userId: userId,
            clientId: clientId,
            projectId: projectId,
        },
    ];
};
