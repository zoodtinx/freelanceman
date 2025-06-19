export const getZenithApparelLinks = (ids: any) => {
    const zenithApparelLinkGenerators: [string, any][] = [
        ['Autumn/Winter 2025 Lookbook Photography & Design', generateAutumnWinter2025LookbookPhotographyDesignLinks],
        ['E-commerce Product Page Copywriting Refresh', generateEcommerceProductPageCopywritingRefreshLinks],
        ['Sustainable Collection Launch Social Media Campaign', generateSustainableCollectionLaunchSocialMediaCampaignLinks],
        ['New Packaging Design for Premium Line', generateNewPackagingDesignForPremiumLineLinks],
    ];

    return zenithApparelLinkGenerators.flatMap(([projectTitle, generateFn]) => {
        const projectIds = ids[projectTitle];

        if (!projectIds) {
            console.warn(
                `Warning: IDs not found for project: "${projectTitle}" for Zenith Apparel. No links generated.`,
            );
            return [];
        }

        return generateFn(projectIds);
    });
};

export const generateAutumnWinter2025LookbookPhotographyDesignLinks = (ids: any) => {
    return [
        { label: 'Lookbook Project Brief', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Hua Hin Location Scout Photos', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Model Casting Portfolio', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Mood Board: Modern Minimalist', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Shoot Production Schedule', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Retouching Guidelines', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Lookbook Layout Draft', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
    ];
};

export const generateEcommerceProductPageCopywritingRefreshLinks = (ids: any) => {
    return [
        { label: 'Copywriting Project Scope', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Delivered Copy Files', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'E-commerce Analytics Dashboard', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Client Testimonial Request Form', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Performance Report', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
    ];
};

export const generateSustainableCollectionLaunchSocialMediaCampaignLinks = (ids: any) => {
    return [
        { label: 'Campaign Strategy Document', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Approved Campaign Calendar', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Creative Brief: Stills & Reels', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Ethical Sourcing Messaging Guide', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Recycled Materials Content', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Client Creative Review Portal', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Influencer Collaboration Plan', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
    ];
};

export const generateNewPackagingDesignForPremiumLineLinks = (ids: any) => {
    return [
        { label: 'Packaging Design Brief', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Initial Design Concepts', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Material Sourcing Report', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Supplier Quote Request', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Khun Nattaya Contact', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
    ];
};
