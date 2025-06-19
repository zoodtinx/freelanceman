export const getAuraTeaCoLinks = (ids: any) => {
    const auraTeaCoLinkGenerators: [string, any][] = [
        ["Brand Story Video for 'About Us' Page", generateBrandStoryVideoForAboutUsPageLinks],
        ['New Tropical Bliss Blend Packaging Design', generateNewTropicalBlissBlendPackagingDesignLinks],
        ['Q3 Social Media Content & Engagement Strategy', generateQ3SocialMediaContentEngagementStrategyLinks],
    ];

    return auraTeaCoLinkGenerators.flatMap(([projectTitle, generateFn]) => {
        const projectIds = ids[projectTitle];

        if (!projectIds) {
            console.warn(
                `Warning: IDs not found for project: "${projectTitle}" for Aura Tea Co. No links generated.`,
            );
            return [];
        }

        return generateFn(projectIds);
    });
};

export const generateNewTropicalBlissBlendPackagingDesignLinks = (ids: any) => {
    return [
        { label: 'Project Brief Document', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Mood Board & Style Guide', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Competitor Analysis Report', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Design Concept 1 (Initial)', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Client Feedback Portal', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
    ];
};

export const generateQ3SocialMediaContentEngagementStrategyLinks = (ids: any) => {
    return [
        { label: 'Q3 Strategy Document', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Content Calendar Draft', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Engagement Plan Outline', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'User-Generated Content Examples', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Analytics Dashboard Link', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Ms. Preeya Meeting Notes', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
    ];
};

export const generateBrandStoryVideoForAboutUsPageLinks = (ids: any) => {
    return [
        { label: 'Video Project Brief', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Script Draft 1 (Google Doc)', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Client Feedback Email Thread', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Chiang Rai Location Ideas', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Budget Confirmation Form', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Mr. Sakda Contact Card', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Storyboard Samples', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Crew Booking Sheet', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
    ];
};
