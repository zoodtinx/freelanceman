import { getRelativeDate, Ids } from '@/demo/helpers/seed-user-data/level-3';

export const generateNewModelX2LaunchCampaignAssetsEvents = (ids: Ids) => {
    return [
        // Finished Events (3)
        {
            name: "Initial Client Briefing",
            dueAt: getRelativeDate(-20, true), // Approx. May 22
            details: "Held kick-off briefing to understand requirements for the Model X-2 launch campaign.",
            isWithTime: true,
            tags: ['brief', 'launch', 'scooter'],
            ...ids,
        },
        {
            name: "Competitor Campaign Research",
            dueAt: getRelativeDate(-15, false), // Approx. May 27
            details: "Conducted research on competitor launch campaigns in the electric scooter market.",
            isWithTime: false,
            tags: ['research', 'campaign'],
            ...ids,
        },
        {
            name: "Kick-off Meeting Agenda Prep",
            dueAt: getRelativeDate(-1, true), // June 10
            details: "Prepared and finalized the agenda for the upcoming Model X-2 launch kick-off meeting.",
            isWithTime: true,
            tags: ['meeting', 'prep'],
            ...ids,
        },
        // Upcoming Events (7) - including events on the same day
        {
            name: "Project Kick-off Meeting",
            dueAt: getRelativeDate(1, true), // June 12th, 10 AM (Thai time)
            details: "Attend the virtual kick-off meeting for the New Model X-2 Launch Campaign, focusing on sustainability and urban commuting.",
            link: "https://zoom.us/j/ecoglide-kickoff",
            isWithTime: true,
            tags: ['kickoff', 'meeting', 'client'],
            ...ids,
        },
        {
            name: "Initial Mood Board Internal Review",
            dueAt: getRelativeDate(4, true), // June 15
            details: "Internal team review of the initial mood board concepts before client submission.",
            isWithTime: true,
            tags: ['moodboard', 'design', 'review'],
            ...ids,
        },
        {
            name: "Client Mood Board Presentation",
            dueAt: getRelativeDate(7, true), // June 18
            details: "Present the initial mood board to EcoGlide, gathering feedback for the campaign's visual direction.",
            isWithTime: true,
            tags: ['client', 'present', 'design', 'visual'],
            ...ids,
        },
        {
            name: "Campaign Messaging Brainstorm",
            dueAt: getRelativeDate(7, false), // June 18 (same day as above)
            details: "Internal brainstorming session to develop core campaign messages and taglines.",
            isWithTime: false,
            tags: ['message', 'brainstorm'],
            ...ids,
        },
        {
            name: "Visual Asset Concepting Workshop",
            dueAt: getRelativeDate(7, true), // June 18 (same day as above)
            details: "Workshop to conceptualize key visual assets (stills, short videos) for the campaign.",
            isWithTime: true,
            tags: ['visual', 'concept', 'creative'],
            ...ids,
        },
        {
            name: "Sustainability Content Focus Workshop",
            dueAt: getRelativeDate(10, true), // June 21
            details: "Deep-dive workshop to ensure sustainability messaging is central to all campaign assets.",
            isWithTime: true,
            tags: ['sustain', 'content', 'workshop'],
            ...ids,
        },
        {
            name: "Urban Commuting Benefits Assets Outline",
            dueAt: getRelativeDate(10, false), // June 21 (same day as above)
            details: "Outline specific assets and messaging that highlight urban commuting benefits of Model X-2.",
            isWithTime: false,
            tags: ['urban', 'assets', 'outline', 'benefits'],
            ...ids,
        },
    ];
};

export const getEcoGlideElectricScootersEvents = (ids: Ids) => {
    return [
        ...generateNewModelX2LaunchCampaignAssetsEvents(ids),
    ];
};