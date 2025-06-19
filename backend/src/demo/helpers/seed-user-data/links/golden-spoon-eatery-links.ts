export const getGoldenSpoonEateryLinks = (ids: any) => {
    const goldenSpoonEateryLinkGenerators: [string, any][] = [
        ['New Summer Menu Design & Photography', generateNewSummerMenuDesignPhotographyLinks],
    ];

    return goldenSpoonEateryLinkGenerators.flatMap(([projectTitle, generateFn]) => {
        const projectIds = ids[projectTitle];

        if (!projectIds) {
            console.warn(
                `Warning: IDs not found for project: "${projectTitle}" for Golden Spoon Eatery. No links generated.`,
            );
            return [];
        }

        return generateFn(projectIds);
    });
};


export const generateNewSummerMenuDesignPhotographyLinks = (ids: any) => {
    return [
        { label: 'Project Brief & Moodboard', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Menu Design Concepts (V1-V3)', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Food Photography Shot List', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'High-Res Final Photos (Drive Link)', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Final Menu PDF', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Client Testimonial Request', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Q3 Social Media Campaign Idea', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
    ];
};