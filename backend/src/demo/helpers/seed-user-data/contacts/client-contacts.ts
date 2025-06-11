interface ClientsByNameMap {
    [clientName: string]: string;
}

type ContactGeneratorFn = (userId: string, clientId: string) => any[];

export const getClientContacts = (
    userId: string,
    clientsByName: ClientsByNameMap,
): any[] => {
    const contactGenerators: [string, ContactGeneratorFn][] = [
        ['Aura Tea Co', generateAuraTeaCoContacts],
        ['Urban Flow Fitness', generateUrbanFlowFitnessContacts],
        ['ByteNest Tech Solutions', generateByteNestTechSolutionsContacts],
        ['Golden Spoon Eatery', generateGoldenSpoonEateryContacts],
        ['Harmony Music Academy', generateHarmonyMusicAcademyContacts],
        ['Horizon Real Estate Group', generateHorizonRealEstateGroupContacts],
        [
            'Eco-Glide Electric Scooters',
            generateEcoGlideElectricScootersContacts,
        ],
        ['Zenith Apparel', generateZenithApparelContacts],
    ];

    return contactGenerators.flatMap(([clientName, generateFn]) => {
        const clientId = clientsByName[clientName];

        if (!clientId) {
            console.warn(
                `Warning: Client ID not found for client: "${clientName}". No contacts generated for this client.`,
            );
            return [];
        }

        return generateFn(userId, clientId);
    });
};

export const generateAuraTeaCoContacts = (userId: string, clientId: string) => {
    return [
        {
            name: 'Supaporn Evans',
            role: 'Brand Manager',
            phoneNumber: '088-222-7777',
            email: 'supaporn.e@auratea.com',
            details: 'Primary contact for marketing campaigns and new product launches. Very focused on brand consistency and storytelling. Prefers email for main communication.',
            userId: userId,
            companyId: clientId,
            avatar: `${userId}/aura-tea-co/supaporn-evans.jpg`,
        },
        {
            name: 'Thanawat Lee',
            role: 'Co-Founder',
            phoneNumber: '095-666-1234',
            email: 'thanawat.l@auratea.com',
            details: 'Involved in strategic decisions and final product approvals. Provides insights into tea blends and sourcing. Occasionally travels, so schedule calls in advance.',
            userId: userId,
            companyId: clientId,
            avatar: `${userId}/aura-tea-co/thanawat-lee.jpg`,
        },
    ];
};

export const generateByteNestTechSolutionsContacts = (
    userId: string,
    clientId: string,
) => {
    return [
        {
            name: 'Supanee Davis',
            role: 'Project Manager',
            phoneNumber: '089-123-4567',
            email: 'supanee.d@bytenest.com',
            details: 'Primary point of contact for all ongoing development projects. Very responsive via email during working hours. Prefers concise updates.',
            userId: userId,
            companyId: clientId,
            avatar: `${userId}/bytenest-tech-solutions/supanee-davis.jpg`,
        },
        {
            name: 'Thanet Wilson',
            role: 'Head of Product',
            phoneNumber: '098-765-4321',
            email: 'thanet.w@bytenest.com',
            details: 'Involved in strategic decisions and high-level feature approvals. Requires detailed documentation for new features. Best to schedule calls in advance.',
            userId: userId,
            companyId: clientId,
            avatar: `${userId}/bytenest-tech-solutions/thanet-wilson.jpg`,
        },
        {
            name: 'Malee Brown',
            role: 'Marketing Director',
            phoneNumber: '061-222-3333',
            email: 'malee.b@bytenest.com',
            details: 'Oversees marketing campaigns and creative assets. Needs to review all public-facing content. Available for quick chats on Line.',
            userId: userId,
            companyId: clientId,
            avatar: `${userId}/bytenest-tech-solutions/malee-brown.jpg`,
        },
    ];
};

export const generateEcoGlideElectricScootersContacts = (
    userId: string,
    clientId: string,
) => {
    return [
        {
            name: 'Jiraporn White',
            role: 'Marketing Lead',
            phoneNumber: '090-444-5555',
            email: 'jiraporn.w@ecoglide.com',
            details: 'Oversees all brand communication and campaign strategies. Needs creative assets to align with their sustainability message. Responsive via Line for quick queries.',
            userId: userId,
            companyId: clientId,
            avatar: `${userId}/eco-glide-electric-scooters/jiraporn-white.jpg`,
        },
        {
            name: 'Pichai Evans',
            role: 'Product Manager',
            phoneNumber: '083-777-8888',
            email: 'pichai.e@ecoglide.com',
            details: 'Provides technical specifications and product features for marketing content. Less involved in day-to-day creative, more for factual review. Best reached via email.',
            userId: userId,
            companyId: clientId,
            avatar: `${userId}/eco-glide-electric-scooters/pichai-evans.jpg`,
        },
    ];
};

export const generateGoldenSpoonEateryContacts = (
    userId: string,
    clientId: string,
) => {
    return [
        {
            name: 'Somsak Taylor',
            role: 'Owner & Head Chef',
            phoneNumber: '086-555-1234',
            email: 'somsak.t@goldenspoon.com',
            details: 'Main decision-maker for all creative and marketing materials. Prefers direct calls for urgent matters. Very passionate about his food.',
            userId: userId,
            companyId: clientId,
            avatar: `${userId}/golden-spoon-eatery/somsak-taylor.jpg`,
        },
    ];
};

export const generateHarmonyMusicAcademyContacts = (
    userId: string,
    clientId: string,
) => {
    return [
        {
            name: 'Thanaporn Miller',
            role: 'Academy Director',
            phoneNumber: '087-987-6543',
            email: 'thanaporn.m@harmonymusic.ac.th',
            details: 'Oversees all academy operations and final approvals for major projects. Available for meetings usually in the late mornings.',
            userId: userId,
            companyId: clientId,
            avatar: `${userId}/harmony-music-academy/thanaporn-miller.jpg`,
        },
        {
            name: 'Natcha Clark',
            role: 'Marketing & Enrollment Coordinator',
            phoneNumber: '099-111-2222',
            email: 'natcha.c@harmonymusic.ac.th',
            details: 'Primary contact for daily marketing tasks and content gathering. Very responsive on Line. Provides student testimonials and photos for campaigns.',
            userId: userId,
            companyId: clientId,
            avatar: `${userId}/harmony-music-academy/natcha-clark.jpg`,
        },
    ];
};

export const generateHorizonRealEstateGroupContacts = (
    userId: string,
    clientId: string,
) => {
    return [
        {
            name: 'Chaiyut Green',
            role: 'Marketing Manager',
            phoneNumber: '085-111-9999',
            email: 'chaiyut.g@horizonre.com',
            details: 'Main contact for all property marketing collateral. Requires regular updates on project progress. Often on site, so email is preferred for initial contact.',
            userId: userId,
            companyId: clientId,
            avatar: `${userId}/horizon-real-estate-group/chaiyut-green.jpg`,
        },
    ];
};

export const generateUrbanFlowFitnessContacts = (
    userId: string,
    clientId: string,
) => {
    return [
        {
            name: 'Pornchai Smith',
            role: 'Studio Manager',
            phoneNumber: '081-234-5678',
            email: 'pornchai.s@urbanflow.com',
            details: 'Primary contact for daily operations and scheduling. Responds best to Line messages for quick queries. Very detail-oriented with invoices.',
            userId: userId,
            companyId: clientId,
            avatar: `${userId}/urban-flow-fitness/pornchai-smith.jpg`,
        },
        {
            name: 'Darika Johnson',
            role: 'Marketing Coordinator',
            phoneNumber: '092-876-5432',
            email: 'darika.j@urbanflow.com',
            details: 'Main contact for creative briefs and content approvals. Prefers email for formal communication. Usually available in the afternoons.',
            userId: userId,
            companyId: clientId,
            avatar: `${userId}/urban-flow-fitness/darika-johnson.jpg`,
        },
    ];
};

export const generateZenithApparelContacts = (
    userId: string,
    clientId: string,
) => {
    return [
        {
            name: 'Nattaya Hall',
            role: 'Creative Director',
            phoneNumber: '081-999-0000',
            email: 'nattaya.h@zenithapparel.com',
            details: 'Oversees all design and visual direction. Provides key insights for seasonal collections and brand identity. Prefers visual examples and concise presentations.',
            userId: userId,
            companyId: clientId,
            avatar: `${userId}/zenith-apparel/nattaya-hall.jpg`,
        },
        {
            name: 'Sukanya Lewis',
            role: 'Marketing Manager',
            phoneNumber: '092-333-4444',
            email: 'sukanya.l@zenithapparel.com',
            details: 'Primary contact for campaign execution, social media, and advertising. Needs all assets on time for scheduled launches. Very organized and detail-oriented.',
            userId: userId,
            companyId: clientId,
            avatar: `${userId}/zenith-apparel/sukanya-lewis.jpg`,
        },
        {
            name: 'Montri King',
            role: 'E-commerce Manager',
            phoneNumber: '063-777-1111',
            email: 'montri.k@zenithapparel.com',
            details: 'Manages the online store and digital sales. Provides product data and web specifications. Requires quick turnaround for website content updates.',
            userId: userId,
            companyId: clientId,
            avatar: `${userId}/zenith-apparel/montri-king.jpg`,
        },
    ];
};
