import { getRelativeDate, Ids } from '@/demo/helpers/seed-user-data/level-3';

export const generateNewTropicalBlissBlendPackagingDesignEvents = (ids: Ids) => {
    return [
        // Finished Events (3)
        {
            name: "Initial Project Briefing",
            dueAt: getRelativeDate(-30, true), // Approx. May 12
            details: "Held kick-off meeting to understand packaging goals for 'Tropical Bliss' blend.",
            isWithTime: true,
            tags: ['brief', 'planning', 'kickoff'],
            ...ids,
        },
        {
            name: "Mood Board & Color Palette Approved",
            dueAt: getRelativeDate(-20, true), // Approx. May 22
            details: "Client approved initial mood board and color palette, setting visual direction.",
            isWithTime: true,
            tags: ['design', 'brand', 'review'],
            ...ids,
        },
        {
            name: "Competitor Packaging Analysis",
            dueAt: getRelativeDate(-15, false), // Approx. May 27
            details: "Analyzed competitor packaging to identify trends and differentiation opportunities.",
            isWithTime: false,
            tags: ['research'],
            ...ids,
        },
        // Upcoming Events (7)
        {
            name: "Design Concepts Internal Review",
            dueAt: getRelativeDate(3, true), // June 14
            details: "Internal review session for the 3-4 distinct packaging design concepts before client presentation.",
            isWithTime: true,
            tags: ['design', 'internal', 'review'],
            ...ids,
        },
        {
            name: "Client Presentation: 3 Concepts",
            dueAt: getRelativeDate(8, true), // June 19
            details: "Present 3-4 distinct packaging design concepts to Aura Tea Co. for feedback.",
            link: "https://meet.google.com/aura-packaging-design",
            isWithTime: true,
            tags: ['client', 'presentation', 'design', 'feedback'],
            ...ids,
        },
        {
            name: "Photography Style Guide Prep",
            dueAt: getRelativeDate(12, false), // June 23
            details: "Prepare a detailed style guide for upcoming product photography, emphasizing freshness and exotic fruits.",
            isWithTime: false,
            tags: ['photo', 'guide', 'creative'],
            ...ids,
        },
        {
            name: "Material Sourcing & Quote Gathering",
            dueAt: getRelativeDate(15, true), // June 26
            details: "Source and gather quotes for various packaging materials to align with design concepts.",
            isWithTime: true,
            tags: ['material', 'budget', 'logistics'],
            ...ids,
        },
        {
            name: "Mockup Creation for Final Design",
            dueAt: getRelativeDate(20, true), // July 1
            details: "Create high-fidelity mockups of the selected packaging design, incorporating client feedback.",
            isWithTime: true,
            tags: ['mockup', 'design', 'creative'],
            ...ids,
        },
        {
            name: "Print Production Liaison Meeting",
            dueAt: getRelativeDate(25, true), // July 6
            details: "Meeting with chosen print vendor to discuss specifications and production timelines.",
            isWithTime: true,
            tags: ['print', 'production', 'meeting'],
            ...ids,
        },
        {
            name: "Launch Assets Finalization",
            dueAt: getRelativeDate(30, false), // July 11
            details: "Finalize all digital and print assets required for the 'Tropical Bliss' blend launch.",
            isWithTime: false,
            tags: ['launch', 'assets'],
            ...ids,
        },
    ];
};

export const generateQ3SocialMediaContentEngagementStrategyEvents = (ids: Ids) => {
    return [
        // Finished Events (3)
        {
            name: "Initial Client Briefing",
            dueAt: getRelativeDate(-25, true), // Approx. May 17
            details: "Gathered objectives and requirements for Q3 social media strategy.",
            isWithTime: true,
            tags: ['brief', 'client'],
            ...ids,
        },
        {
            name: "Strategy Document Submission",
            dueAt: getRelativeDate(-10, true), // Approx. June 1
            details: "Submitted comprehensive Q3 social media content and engagement strategy document.",
            isWithTime: true,
            tags: ['strategy', 'report', 'social'],
            ...ids,
        },
        {
            name: "Platform Audit & Baseline Analysis",
            dueAt: getRelativeDate(-18, false), // Approx. May 24
            details: "Conducted audit of Aura Tea Co.'s current social media platforms and established baseline metrics.",
            isWithTime: false,
            tags: ['audit', 'analytics'],
            ...ids,
        },
        // Upcoming Events (7)
        {
            name: "Strategy Review Call Ms. Preeya",
            dueAt: getRelativeDate(1, true), // June 12, 2 PM (Thai time)
            details: "Virtual meeting with Ms. Preeya to review Q3 strategy document and discuss user-generated content focus.",
            link: "https://zoom.us/j/1234567890",
            isWithTime: true,
            tags: ['client', 'review', 'call'],
            ...ids,
        },
        {
            name: "July Content Calendar Brainstorm",
            dueAt: getRelativeDate(5, true), // June 16
            details: "Internal brainstorming session to develop creative content ideas and themes for July's calendar.",
            isWithTime: true,
            tags: ['content', 'brainstorm', 'planning'],
            ...ids,
        },
        {
            name: "Graphic Assets Creation Workshop",
            dueAt: getRelativeDate(10, true), // June 21
            details: "Workshop to design engaging graphic assets for Q3 social media posts.",
            isWithTime: true,
            tags: ['creative', 'design', 'workshop'],
            ...ids,
        },
        {
            name: "Engagement Tactics Planning",
            dueAt: getRelativeDate(14, false), // June 25
            details: "Outline specific engagement tactics and community management guidelines for Q3.",
            isWithTime: false,
            tags: ['engagement', 'strategy'],
            ...ids,
        },
        {
            name: "Influencer Identification & Outreach",
            dueAt: getRelativeDate(18, true), // June 29
            details: "Identify and initiate contact with potential influencers for healthy lifestyle campaigns.",
            isWithTime: true,
            tags: ['influencer', 'marketing', 'campaign'],
            ...ids,
        },
        {
            name: "Q3 Reporting Template Design",
            dueAt: getRelativeDate(22, true), // July 3
            details: "Design and set up templates for monthly and quarterly social media performance reports.",
            isWithTime: true,
            tags: ['report', 'design', 'analytics'],
            ...ids,
        },
        {
            name: "Social Listening Setup & Training",
            dueAt: getRelativeDate(26, false), // July 7
            details: "Configure social listening tools and provide basic training to the client's team.",
            isWithTime: false,
            tags: ['listening', 'training'],
            ...ids,
        },
    ];
};

export const generateBrandStoryVideoForAboutUsPageEvents = (ids: Ids) => {
    return [
        // Finished Events (3)
        {
            name: "Project Kick-off & Vision Session",
            dueAt: getRelativeDate(-40, true), // Approx. May 2
            details: "Initial meeting to align on the vision and goals for the Brand Story Video.",
            isWithTime: true,
            tags: ['kickoff', 'meeting', 'vision'],
            ...ids,
        },
        {
            name: "Script Draft 1 Sent for Feedback",
            dueAt: getRelativeDate(-15, true), // May 29
            details: "Sent the first draft of the video script to Mr. Sakda for initial client feedback.",
            isWithTime: true,
            tags: ['script', 'feedback', 'client'],
            ...ids,
        },
        {
            name: "Initial Concept Development",
            dueAt: getRelativeDate(-35, false), // Approx. May 7
            details: "Brainstormed and developed initial creative concepts for the brand story video.",
            isWithTime: false,
            tags: ['concept', 'creative'],
            ...ids,
        },
        // Upcoming Events (7)
        {
            name: "Client Follow-up on Script Feedback",
            dueAt: getRelativeDate(3, true), // June 14
            details: "Follow up with Mr. Sakda regarding pending feedback on Script Draft 1.",
            isWithTime: true,
            tags: ['followup', 'client'],
            ...ids,
        },
        {
            name: "Budget Re-Confirmation Meeting",
            dueAt: getRelativeDate(7, true), // June 18
            details: "Crucial meeting with Mr. Sakda to confirm the budget, especially for travel, to restart the project.",
            isWithTime: true,
            tags: ['budget', 'finance', 'meeting', 'travel'],
            ...ids,
        },
        {
            name: "Chiang Rai Location Scouting Trip",
            dueAt: getRelativeDate(10, true), // June 21
            details: "Travel to Chiang Rai to scout and finalize suitable filming locations for the video.",
            isWithTime: true,
            tags: ['location', 'travel', 'filming'],
            ...ids,
        },
        {
            name: "Crew & Equipment Booking",
            dueAt: getRelativeDate(15, false), // June 26
            details: "Book necessary crew members and secure all required filming equipment for the shoot.",
            isWithTime: false,
            tags: ['crew', 'equipment', 'logistics'],
            ...ids,
        },
        {
            name: "Storyboard Finalization Session",
            dueAt: getRelativeDate(20, true), // July 1
            details: "Collaborative session to finalize the visual storyboard for the brand story video.",
            isWithTime: true,
            tags: ['storyboard', 'video', 'design'],
            ...ids,
        },
        {
            name: "Pre-Production Meeting (All Teams)",
            dueAt: getRelativeDate(25, true), // July 6
            details: "Comprehensive meeting with all involved teams (creative, production, client) to review final plan.",
            isWithTime: true,
            tags: ['preproduction', 'meeting', 'team'],
            ...ids,
        },
        {
            name: "Voice-over Artist Auditions",
            dueAt: getRelativeDate(28, false), // July 9
            details: "Conduct auditions to select the voice-over artist for the Brand Story Video.",
            isWithTime: false,
            tags: ['voice', 'casting'],
            ...ids,
        },
    ];
};

export const getAuraTeaCoEvents = (ids: Ids) => {
    return [
        ...generateNewTropicalBlissBlendPackagingDesignEvents(ids),
        ...generateQ3SocialMediaContentEngagementStrategyEvents(ids),
        ...generateBrandStoryVideoForAboutUsPageEvents(ids),
    ];
};