import { getRelativeDate, Ids } from '@/demo/helpers/seed-user-data/helper';

export const generateSummerChallengeLandingPageAdCreativesEvents = (ids: Ids) => {
    return [
        // Finished Events (3)
        {
            name: "Initial Project Briefing",
            dueAt: getRelativeDate(-20, true), // Approx. May 22
            details: "Held kick-off meeting to understand goals for the Summer Challenge landing page and ad creatives.",
            isWithTime: true,
            tags: ['brief', 'landing', 'ads'],
            ...ids,
        },
        {
            name: "Assets Received & Reviewed",
            dueAt: getRelativeDate(-10, false), // Approx. June 1
            details: "Received and reviewed all assets provided by the client via shared drive.",
            isWithTime: false,
            tags: ['assets', 'review'],
            ...ids,
        },
        {
            name: "Wireframe Design Concepts",
            dueAt: getRelativeDate(-5, true), // Approx. June 6
            details: "Developed initial wireframe design concepts for the landing page focusing on strong CTAs.",
            isWithTime: true,
            tags: ['design', 'wireframe', 'concept'],
            ...ids,
        },
        // Upcoming Events (7)
        {
            name: "Internal Wireframe Review",
            dueAt: getRelativeDate(2, true), // June 13
            details: "Internal team review of landing page wireframes before client submission.",
            isWithTime: true,
            tags: ['internal', 'review', 'design'],
            ...ids,
        },
        {
            name: "Ad Creative Concepts Brainstorm",
            dueAt: getRelativeDate(5, false), // June 16
            details: "Brainstorming session for compelling ad creative concepts.",
            isWithTime: false,
            tags: ['ads', 'creative', 'brainstorm'],
            ...ids,
        },
        {
            name: "Client Review: Landing Page Wireframes",
            dueAt: getRelativeDate(7, true), // June 18
            details: "Present landing page wireframes to UrbanFlow Fitness for feedback and approval.",
            link: "https://meet.google.com/urbanflow-summer-lp",
            isWithTime: true,
            tags: ['client', 'review', 'landing'],
            ...ids,
        },
        {
            name: "Draft Headlines for A/B Testing",
            dueAt: getRelativeDate(10, false), // June 21
            details: "Draft multiple headline options for ad creatives, prepared for A/B testing.",
            isWithTime: false,
            tags: ['copy', 'abtest', 'headlines'],
            ...ids,
        },
        {
            name: "High-Fidelity Landing Page Mockups",
            dueAt: getRelativeDate(15, true), // June 26
            details: "Develop high-fidelity mockups for the approved landing page wireframes.",
            isWithTime: true,
            tags: ['mockup', 'design', 'landing'],
            ...ids,
        },
        {
            name: "Ad Creatives Design & Production",
            dueAt: getRelativeDate(20, true), // July 1
            details: "Design and produce final ad creatives based on concepts and headlines.",
            isWithTime: true,
            tags: ['ads', 'design', 'production'],
            ...ids,
        },
        {
            name: "Pre-Launch Marketing Sync",
            dueAt: getRelativeDate(25, true), // July 6
            details: "Synchronize marketing efforts with UrbanFlow Fitness ahead of the Summer Challenge launch.",
            isWithTime: true,
            tags: ['marketing', 'launch', 'sync'],
            ...ids,
        },
    ];
};

export const generateNewClassScheduleDesignPrintProductionEvents = (ids: Ids) => {
    return [
        // Finished Events (3)
        {
            name: "Collect Updated Class Info",
            dueAt: getRelativeDate(-25, true), // Approx. May 17
            details: "Collected all updated class schedule information, including new classes and times.",
            isWithTime: true,
            tags: ['info', 'collect', 'schedule'],
            ...ids,
        },
        {
            name: "Initial Design Concepts Drafted",
            dueAt: getRelativeDate(-15, false), // Approx. May 27
            details: "Drafted initial design concepts for the new class schedule layout.",
            isWithTime: false,
            tags: ['design', 'concept'],
            ...ids,
        },
        {
            name: "Final Design Approval",
            dueAt: getRelativeDate(-10, true), // June 1st (as per note)
            details: "Received final approval on the class schedule design from UrbanFlow Fitness.",
            isWithTime: true,
            tags: ['approval', 'design'],
            ...ids,
        },
        // Upcoming Events (7)
        {
            name: "Printer Quote Finalization",
            dueAt: getRelativeDate(2, true), // June 13
            details: "Finalize print quotes with Mr. Somchai and confirm production timeline.",
            isWithTime: true,
            tags: ['printer', 'quote', 'production'],
            ...ids,
        },
        {
            name: "Prepare Print-Ready Files",
            dueAt: getRelativeDate(4, false), // June 15
            details: "Prepare high-resolution, print-ready files for the new class schedule.",
            isWithTime: false,
            tags: ['print', 'files', 'prep'],
            ...ids,
        },
        {
            name: "Send Follow-up Email to Client",
            dueAt: getRelativeDate(6, true), // June 17
            details: "Send a follow-up email to UrbanFlow Fitness confirming print production and delivery.",
            isWithTime: true,
            tags: ['client', 'followup'],
            ...ids,
        },
        {
            name: "Quality Check on Printed Samples",
            dueAt: getRelativeDate(10, true), // June 21
            details: "Perform a quality check on initial printed samples of the new class schedule.",
            isWithTime: true,
            tags: ['quality', 'print', 'check'],
            ...ids,
        },
        {
            name: "Delivery Coordination with Printer",
            dueAt: getRelativeDate(15, false), // June 26
            details: "Coordinate final delivery logistics with Mr. Somchai for the printed schedules.",
            isWithTime: false,
            tags: ['delivery', 'logistics'],
            ...ids,
        },
        {
            name: "Internal Project Post-Mortem",
            dueAt: getRelativeDate(20, true), // July 1
            details: "Internal meeting to review the class schedule project from start to finish.",
            isWithTime: true,
            tags: ['internal', 'postmortem'],
            ...ids,
        },
        {
            name: "Archiving Project Files",
            dueAt: getRelativeDate(25, true), // July 6
            details: "Archive all project files and assets for the New Class Schedule Design & Print Production.",
            isWithTime: true,
            tags: ['archive', 'files'],
            ...ids,
        },
    ];
};

export const generateMemberLoyaltyProgramBrandingEvents = (ids: Ids) => {
    return [
        // Finished Events (3)
        {
            name: "Initial Loyalty Program Briefing",
            dueAt: getRelativeDate(-30, true), // Approx. May 12
            details: "Held kick-off meeting to understand the vision for the member loyalty program branding.",
            isWithTime: true,
            tags: ['brief', 'loyalty', 'branding'],
            ...ids,
        },
        {
            name: "Competitor Loyalty Program Research",
            dueAt: getRelativeDate(-25, false), // Approx. May 17
            details: "Researched competitors' loyalty programs for inspiration and best practices.",
            isWithTime: false,
            tags: ['research', 'competitor'],
            ...ids,
        },
        {
            name: "Concept Designs Sent to Client",
            dueAt: getRelativeDate(-22, true), // May 20 (as per note)
            details: "Sent initial concept designs for the member loyalty program branding to UrbanFlow Fitness.",
            isWithTime: true,
            tags: ['design', 'concepts', 'sent'],
            ...ids,
        },
        // Upcoming Events (7) - reflecting 'on-hold' status with future check-ins
        {
            name: "Chase Ms. Ploy for Feedback",
            dueAt: getRelativeDate(3, true), // June 14 (next week)
            details: "Follow up with Ms. Ploy from UrbanFlow Fitness to get feedback on the loyalty program concept designs.",
            isWithTime: true,
            tags: ['client', 'followup', 'feedback'],
            ...ids,
        },
        {
            name: "Internal Review of Feedback (Upon Receipt)",
            dueAt: getRelativeDate(7, false), // June 18
            details: "Internal team review of client feedback on loyalty program branding concepts.",
            isWithTime: false,
            tags: ['internal', 'review'],
            ...ids,
        },
        {
            name: "Revision Planning Session",
            dueAt: getRelativeDate(10, true), // June 21
            details: "Plan revisions for loyalty program branding based on client feedback and internal review.",
            isWithTime: true,
            tags: ['revisions', 'planning'],
            ...ids,
        },
        {
            name: "Refined Concepts Presentation",
            dueAt: getRelativeDate(18, true), // June 29
            details: "Present refined loyalty program branding concepts to UrbanFlow Fitness for final approval.",
            link: "https://meet.google.com/urbanflow-loyalty",
            isWithTime: true,
            tags: ['client', 'presentation', 'branding'],
            ...ids,
        },
        {
            name: "Loyalty Program Guidelines Drafting",
            dueAt: getRelativeDate(25, false), // July 6
            details: "Begin drafting guidelines for the new member loyalty program's visual identity and usage.",
            isWithTime: false,
            tags: ['guidelines', 'documentation'],
            ...ids,
        },
        {
            name: "Digital Asset Creation Kick-off",
            dueAt: getRelativeDate(30, true), // July 11
            details: "Kick-off the creation of digital assets (icons, banners, social media templates) for the loyalty program.",
            isWithTime: true,
            tags: ['assets', 'digital', 'creation'],
            ...ids,
        },
        {
            name: "Printed Materials Design Planning",
            dueAt: getRelativeDate(35, true), // July 16
            details: "Plan designs for any physical loyalty program materials, such as membership cards or flyers.",
            isWithTime: true,
            tags: ['print', 'materials', 'planning'],
            ...ids,
        },
    ];
};

export const generateIntroductoryYogaVideoSeries3VideosEvents = (ids: Ids) => {
    return [
        // Finished Events (3)
        {
            name: "Initial Video Series Briefing",
            dueAt: getRelativeDate(-30, true), // Approx. May 12
            details: "Held kick-off meeting for the Introductory Yoga Video Series.",
            isWithTime: true,
            tags: ['brief', 'video', 'yoga'],
            ...ids,
        },
        {
            name: "Content Outline & Pose Selection",
            dueAt: getRelativeDate(-20, false), // Approx. May 22
            details: "Outlined content for each of the 3 videos and selected introductory yoga poses.",
            isWithTime: false,
            tags: ['content', 'yoga'],
            ...ids,
        },
        {
            name: "Script Approved by Client",
            dueAt: getRelativeDate(-10, true), // Approx. June 1 (as per note)
            details: "Received client approval on the scripts for all three introductory yoga videos.",
            isWithTime: true,
            tags: ['script', 'approval', 'client'],
            ...ids,
        },
        // Upcoming Events (7)
        {
            name: "Book Voice-over Artist",
            dueAt: getRelativeDate(3, true), // June 14 (end of week)
            details: "Book the voice-over artist for the yoga video series, confirming availability and rates.",
            isWithTime: true,
            tags: ['voice', 'booking', 'audio'],
            ...ids,
        },
        {
            name: "Filming Pre-production Meeting",
            dueAt: getRelativeDate(8, false), // June 19
            details: "Final pre-production meeting to confirm all details for the studio filming.",
            isWithTime: false,
            tags: ['filming', 'prep', 'meeting'],
            ...ids,
        },
        {
            name: "Filming Day 1 (Studio)",
            dueAt: getRelativeDate(29, true), // July 10 (as per note)
            details: "First day of filming introductory yoga videos at the studio.",
            isWithTime: true,
            tags: ['filming', 'studio', 'video'],
            ...ids,
        },
        {
            name: "Filming Day 2 (Studio)",
            dueAt: getRelativeDate(30, true), // July 11 (as per note)
            details: "Second day of filming introductory yoga videos at the studio.",
            isWithTime: true,
            tags: ['filming', 'studio', 'video'],
            ...ids,
        },
        {
            name: "Filming Day 3 (Studio)",
            dueAt: getRelativeDate(31, true), // July 12 (as per note)
            details: "Third and final day of filming introductory yoga videos at the studio.",
            isWithTime: true,
            tags: ['filming', 'studio', 'video'],
            ...ids,
        },
        {
            name: "Video Editing Kick-off",
            dueAt: getRelativeDate(35, true), // July 16
            details: "Begin the editing process for the three introductory yoga videos.",
            isWithTime: true,
            tags: ['editing', 'video', 'postprod'],
            ...ids,
        },
        {
            name: "Draft Video Review (Internal)",
            dueAt: getRelativeDate(45, false), // July 26
            details: "Internal review of the first drafts of the yoga videos before client submission.",
            isWithTime: false,
            tags: ['review', 'internal'],
            ...ids,
        },
    ];
};

export const getUrbanFlowFitnessEvents = (ids: Ids) => {
    const urbanFlowFitnessEventGenerators: [string, any][] = [
        ['Summer Challenge Landing Page & Ad Creatives', generateSummerChallengeLandingPageAdCreativesEvents],
        ['New Class Schedule Design & Print Production', generateNewClassScheduleDesignPrintProductionEvents],
        ['Member Loyalty Program Branding', generateMemberLoyaltyProgramBrandingEvents],
        ['Introductory Yoga Video Series (3 videos)', generateIntroductoryYogaVideoSeries3VideosEvents],
    ];

    return urbanFlowFitnessEventGenerators.flatMap(([projectTitle, generateFn]) => {
        const projectIds = ids[projectTitle];

        if (!projectIds) {
            console.warn(
                `Warning: IDs not found for project: "${projectTitle}" for Urban Flow Fitness. No events generated.`,
            );
            return [];
        }

        return generateFn(projectIds);
    });
};