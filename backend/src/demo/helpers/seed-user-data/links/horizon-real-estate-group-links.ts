export const getHorizonRealEstateGroupLinks = (ids: any) => {
    const horizonRealEstateGroupLinkGenerators: [string, any][] = [
        ['Luxury Condo Development - Digital Marketing Kit', generateLuxuryCondoDigitalMarketingKitLinks],
    ];

    return horizonRealEstateGroupLinkGenerators.flatMap(([projectTitle, generateFn]) => {
        const projectIds = ids[projectTitle];

        if (!projectIds) {
            console.warn(
                `Warning: IDs not found for project: "${projectTitle}" for Horizon Real Estate Group. No links generated.`,
            );
            return [];
        }

        return generateFn(projectIds);
    });
};

export const generateLuxuryCondoDigitalMarketingKitLinks = (ids: any) => {
    return [
        { label: 'Project Briefing & Objectives', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'E-brochure Design Concepts', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'High-Res Photo Request Form', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Marketing Team Contact List', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Overall Launch Timeline', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Competitor Analysis Report', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Virtual Tour Storyboard', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
    ];
};
