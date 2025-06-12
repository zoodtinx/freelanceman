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
            details:
                'Primary contact for marketing campaigns and new product launches. Very focused on brand consistency and storytelling. Prefers email for main communication.',
            userId: userId,
            companyId: clientId,
            avatar: `${userId}/clients/aura-tea-co/contacts/supaporn-evans.webp`,
        },
        {
            name: 'Thanawat Lee',
            role: 'Co-Founder',
            phoneNumber: '095-666-1234',
            email: 'thanawat.l@auratea.com',
            details:
                'Involved in strategic decisions and final product approvals. Provides insights into tea blends and sourcing. Occasionally travels, so schedule calls in advance.',
            userId: userId,
            companyId: clientId,
            avatar: `${userId}/clients/aura-tea-co/contacts/thanawat-lee.webp`,
        },
    ];
};

export const generateByteNestTechSolutionsContacts = (userId, clientId) => {
    return [
        {
            name: 'Supanee Davis',
            role: 'Project Manager',
            phoneNumber: '089-123-4567',
            email: 'supanee.d@bytenest.com',
            details:
                'Primary point of contact for all ongoing development projects. Very responsive via email during working hours. Prefers concise updates.',
            userId: userId,
            companyId: clientId,
            avatar: `${userId}/clients/bytenest-tech-solutions/contacts/supanee-davis.webp`,
        },
        {
            name: 'Thanet Wilson',
            role: 'Head of Product',
            phoneNumber: '098-765-4321',
            email: 'thanet.w@bytenest.com',
            details:
                'Involved in strategic decisions and high-level feature approvals. Requires detailed documentation for new features. Best to schedule calls in advance.',
            userId: userId,
            companyId: clientId,
            avatar: `${userId}/clients/bytenest-tech-solutions/contacts/thanet-wilson.webp`,
        },
        {
            name: 'Malee Brown',
            role: 'Marketing Director',
            phoneNumber: '061-222-3333',
            email: 'malee.b@bytenest.com',
            details:
                'Oversees marketing campaigns and creative assets. Needs to review all public-facing content. Available for quick chats on Line.',
            userId: userId,
            companyId: clientId,
            avatar: `${userId}/clients/bytenest-tech-solutions/contacts/malee-brown.webp`,
        },
    ];
};

export const generateEcoGlideElectricScootersContacts = (userId, clientId) => {
    return [
        {
            name: 'Jiraporn White',
            role: 'Marketing Lead',
            phoneNumber: '090-444-5555',
            email: 'jiraporn.w@ecoglide.com',
            details:
                'Oversees all brand communication and campaign strategies. Needs creative assets to align with their sustainability message. Responsive via Line for quick queries.',
            userId: userId,
            companyId: clientId,
            avatar: `${userId}/clients/eco-glide-electric-scooters/contacts/jiraporn-white.webp`,
        },
        {
            name: 'Pichai Evans',
            role: 'Product Manager',
            phoneNumber: '083-777-8888',
            email: 'pichai.e@ecoglide.com',
            details:
                'Provides technical specifications and product features for marketing content. Less involved in day-to-day creative, more for factual review. Best reached via email.',
            userId: userId,
            companyId: clientId,
            avatar: `${userId}/clients/eco-glide-electric-scooters/contacts/pichai-evans.webp`,
        },
    ];
};

export const generateGoldenSpoonEateryContacts = (userId, clientId) => {
    return [
        {
            name: 'Somsak Taylor',
            role: 'Owner & Head Chef',
            phoneNumber: '086-555-1234',
            email: 'somsak.t@goldenspoon.com',
            details:
                'Main decision-maker for all creative and marketing materials. Prefers direct calls for urgent matters. Very passionate about his food.',
            userId: userId,
            companyId: clientId,
            avatar: `${userId}/clients/golden-spoon-eatery/contacts/somsak-taylor.webp`,
        },
    ];
};

export const generateHarmonyMusicAcademyContacts = (userId, clientId) => {
    return [
        {
            name: 'Thanaporn Miller',
            role: 'Academy Director',
            phoneNumber: '087-987-6543',
            email: 'thanaporn.m@harmonymusic.ac.th',
            details:
                'Oversees all academy operations and final approvals for major projects. Available for meetings usually in the late mornings.',
            userId: userId,
            companyId: clientId,
            avatar: `${userId}/clients/harmony-music-academy/contacts/thanaporn-miller.webp`,
        },
        {
            name: 'Natcha Clark',
            role: 'Marketing & Enrollment Coordinator',
            phoneNumber: '099-111-2222',
            email: 'natcha.c@harmonymusic.ac.th',
            details:
                'Primary contact for daily marketing tasks and content gathering. Very responsive on Line. Provides student testimonials and photos for campaigns.',
            userId: userId,
            companyId: clientId,
            avatar: `${userId}/clients/harmony-music-academy/contacts/natcha-clark.webp`,
        },
    ];
};

export const generateHorizonRealEstateGroupContacts = (userId, clientId) => {
    return [
        {
            name: 'Chaiyut Green',
            role: 'Marketing Manager',
            phoneNumber: '085-111-9999',
            email: 'chaiyut.g@horizonre.com',
            details:
                'Main contact for all property marketing collateral. Requires regular updates on project progress. Often on site, so email is preferred for initial contact.',
            userId: userId,
            companyId: clientId,
            avatar: `${userId}/clients/horizon-real-estate-group/contacts/chaiyut-green.webp`,
        },
    ];
};

export const generateUrbanFlowFitnessContacts = (userId, clientId) => {
    return [
        {
            name: 'Pornchai Smith',
            role: 'Studio Manager',
            phoneNumber: '081-234-5678',
            email: 'pornchai.s@urbanflow.com',
            details:
                'Primary contact for daily operations and scheduling. Responds best to Line messages for quick queries. Very detail-oriented with invoices.',
            userId: userId,
            companyId: clientId,
            avatar: `${userId}/clients/urban-flow-fitness/contacts/pornchai-smith.webp`,
        },
        {
            name: 'Darika Johnson',
            role: 'Marketing Coordinator',
            phoneNumber: '092-876-5432',
            email: 'darika.j@urbanflow.com',
            details:
                'Main contact for creative briefs and content approvals. Prefers email for formal communication. Usually available in the afternoons.',
            userId: userId,
            companyId: clientId,
            avatar: `${userId}/clients/urban-flow-fitness/contacts/darika-johnson.webp`,
        },
    ];
};

export const generateZenithApparelContacts = (userId, clientId) => {
    return [
        {
            name: 'Nattaya Hall',
            role: 'Creative Director',
            phoneNumber: '081-999-0000',
            email: 'nattaya.h@zenithapparel.com',
            details:
                'Oversees all design and visual direction. Provides key insights for seasonal collections and brand identity. Prefers visual examples and concise presentations.',
            userId: userId,
            companyId: clientId,
            avatar: `${userId}/clients/zenith-apparel/contacts/nattaya-hall.webp`,
        },
        {
            name: 'Sukanya Lewis',
            role: 'Marketing Manager',
            phoneNumber: '092-333-4444',
            email: 'sukanya.l@zenithapparel.com',
            details:
                'Primary contact for campaign execution, social media, and advertising. Needs all assets on time for scheduled launches. Very organized and detail-oriented.',
            userId: userId,
            companyId: clientId,
            avatar: `${userId}/clients/zenith-apparel/contacts/sukanya-lewis.webp`,
        },
        {
            name: 'Montri King',
            role: 'E-commerce Manager',
            phoneNumber: '063-777-1111',
            email: 'montri.k@zenithapparel.com',
            details:
                'Manages the online store and digital sales. Provides product data and web specifications. Requires quick turnaround for website content updates.',
            userId: userId,
            companyId: clientId,
            avatar: `${userId}/clients/zenith-apparel/contacts/montri-king.webp`,
        },
    ];
};

