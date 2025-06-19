export const getUrbanFlowFitnessLinks = (ids: any) => {
    const urbanFlowFitnessLinkGenerators: [string, any][] = [
        ['Summer Challenge Landing Page & Ad Creatives', generateSummerChallengeLandingPageAdCreativesLinks],
        ['New Class Schedule Design & Print Production', generateNewClassScheduleDesignPrintProductionLinks],
        ['Member Loyalty Program Branding', generateMemberLoyaltyProgramBrandingLinks],
        ['Introductory Yoga Video Series (3 videos)', generateIntroductoryYogaVideoSeriesLinks],
    ];

    return urbanFlowFitnessLinkGenerators.flatMap(([projectTitle, generateFn]) => {
        const projectIds = ids[projectTitle];

        if (!projectIds) {
            console.warn(
                `Warning: IDs not found for project: "${projectTitle}" for Urban Flow Fitness. No links generated.`,
            );
            return [];
        }

        return generateFn(projectIds);
    });
};

export const generateSummerChallengeLandingPageAdCreativesLinks = (ids: any) => {
    return [
        { label: 'Project Brief: Summer Challenge', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Received Assets (Shared Drive)', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Landing Page Wireframes', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Ad Creative Concepts', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'A/B Test Plan for Headlines', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Client Feedback Form', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
    ];
};

export const generateNewClassScheduleDesignPrintProductionLinks = (ids: any) => {
    return [
        { label: 'Schedule Design Brief', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Approved Design Files (PDF)', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Print Specifications', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Mr. Somchai Contact Card', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Delivery Tracking', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
    ];
};

export const generateMemberLoyaltyProgramBrandingLinks = (ids: any) => {
    return [
        { label: 'Loyalty Program Brief', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Initial Concept Designs', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Competitor Analysis: Loyalty Programs', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Ms. Ploy Contact Details', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Feedback Follow-up Template', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
    ];
};

export const generateIntroductoryYogaVideoSeriesLinks = (ids: any) => {
    return [
        { label: 'Video Series Brief', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Approved Video Scripts', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Filming Schedule & Logistics', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Studio Booking Confirmation', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Voice-over Artist Options', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Post-Production Checklist', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Marketing Distribution Plan', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
    ];
};