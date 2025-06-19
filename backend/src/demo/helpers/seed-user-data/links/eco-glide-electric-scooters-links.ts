export const getEcoGlideElectricScootersLinks = (ids: any) => {
    const ecoGlideElectricScootersLinkGenerators: [string, any][] = [
        ['New E-Scooter Model Launch Campaign', generateNewEScooterModelLaunchCampaignLinks],
    ];

    return ecoGlideElectricScootersLinkGenerators.flatMap(([projectTitle, generateFn]) => {
        const projectIds = ids[projectTitle];

        if (!projectIds) {
            console.warn(
                `Warning: IDs not found for project: "${projectTitle}" for Eco-Glide Electric Scooters. No links generated.`,
            );
            return [];
        }

        return generateFn(projectIds);
    });
};

export const generateNewEScooterModelLaunchCampaignLinks = (ids: any) => {
    return [
        { label: 'Campaign Brief & Goals', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Target Audience Research', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Creative Assets (Google Drive)', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Media Plan & Schedule', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Press Release Draft', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Influencer Outreach List', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Launch Event Logistics', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
    ];
};
