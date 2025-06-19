interface ClientsByNameMap {
    [clientName: string]: string;
}

type ProjectGeneratorFn = (userId: string, clientId: string) => any[];

export const getProjects = (
    userId: string,
    clientsByName: ClientsByNameMap,
): any[] => {
    const projectGenerators: [string, ProjectGeneratorFn][] = [
        ['Aura Tea Co', generateAuraTeaCoProjects],
        ['Urban Flow Fitness', generateUrbanFlowFitnessProjects],
        ['ByteNest Tech Solutions', generateByteNestTechProjects],
        ['Golden Spoon Eatery', generateGoldenSpoonEateryProjects],
        ['Harmony Music Academy', generateHarmonyMusicAcademyProjects],
        ['Horizon Real Estate Group', generateHorizonRealEstateGroupProjects],
        [
            'Eco-Glide Electric Scooters',
            generateEcoGlideElectricScootersProjects,
        ],
        ['Zenith Apparel', generateZenithApparelProjects],
    ];

    return projectGenerators.flatMap(([clientName, generateFn]) => {
        const clientId = clientsByName[clientName];

        if (!clientId) {
            console.warn(
                `Warning: Client ID not found for client: "${clientName}". No projects generated for this client.`,
            );
            return [];
        }

        return generateFn(userId, clientId);
    });
};

export const generateAuraTeaCoProjects = (userId: string, clientId: string) => {
    return [
        {
            userId: userId,
            clientId: clientId,
            name: 'New Tropical Bliss Blend Packaging Design',
            pinned: true,
            budget: 55000,
            projectStatus: 'active',
            paymentStatus: 'processing',
            note: 'Initial mood board and color palette approved.\n\nClient wants to see 3-4 distinct design concepts by June 20th.\n\nEmphasize freshness and exotic fruits in the design.',
        },
        {
            userId: userId,
            clientId: clientId,
            name: 'Q3 Social Media Content & Engagement Strategy',
            budget: 40000,
            projectStatus: 'active',
            paymentStatus: 'pending',
            note: 'Strategy document submitted last week.\n\nNeed to schedule review call with Ms. Preeya for June 12th, 2 PM (Thai time).\n\nFocus on user-generated content and healthy lifestyle angles.',
        },
        {
            userId: userId,
            clientId: clientId,
            name: "Brand Story Video for 'About Us' Page",
            budget: 80000,
            projectStatus: 'on-hold',
            paymentStatus: 'pending',
            note: 'Script draft 1 pending client feedback (sent May 29th).\n\nFilming locations need to be scouted in Chiang Rai.\n\nProject on hold until client confirms budget for travel.\n\nFollow up with Mr. Sakda on June 18th if no response.',
        },
    ];
};

export const generateByteNestTechProjects = (
    userId: string,
    clientId: string,
) => {
    return [
        {
            userId: userId,
            clientId: clientId,
            name: 'E-commerce Platform UI/UX Redesign',
            budget: 180000,
            projectStatus: 'active',
            paymentStatus: 'processing',
            note: "Initial wireframes approved.\n\nMoving to high-fidelity mockups by June 20th.\n\nClient wants to see some motion prototypes for navigation by next review.\n\nCheck competitor 'ShopFlow' for recent UI trends.",
        },
        {
            userId: userId,
            clientId: clientId,
            name: 'Internal CRM System API Integration',
            budget: 95000,
            projectStatus: 'active',
            paymentStatus: 'pending',
            note: 'API documentation received.\n\nNeed to confirm authentication method by end of week.',
        },
        {
            userId: userId,
            clientId: clientId,
            name: 'Product Launch Video & Explainer Animation',
            budget: 120000,
            projectStatus: 'on-hold',
            paymentStatus: 'pending',
            note: "Project paused due to internal resource reallocation on ByteNest's side.\n\nExpected restart Q4 2025.\n\nFollow up with Mr. Anan (ByteNest PM) in late September to confirm new timeline.\n\nBudget still holds for now, no changes anticipated unless scope changes significantly.",
        },
        {
            userId: userId,
            clientId: clientId,
            name: 'Automated Data Reporting Dashboard',
            budget: 250000,
            projectStatus: 'completed',
            paymentStatus: 'paid',
            note: 'Final dashboard delivered and accepted on May 28th.\n\nTraining session conducted for ByteNest team on June 5th.\n\nProject sign-off document filed. Request testimonial from client.',
        },
        {
            userId: userId,
            clientId: clientId,
            name: 'Website Performance Audit & Optimization',
            budget: 60000,
            projectStatus: 'active',
            paymentStatus: 'pending',
            note: 'Initial audit report drafted.\n\nClient meeting scheduled for June 17th to discuss findings and next steps. Focus on core web vitals and server response times.',
        },
    ];
};

export const generateEcoGlideElectricScootersProjects = (
    userId: string,
    clientId: string,
) => {
    return [
        {
            userId: userId,
            clientId: clientId,
            name: 'New Model X-2 Launch Campaign Assets',
            budget: 70000,
            projectStatus: 'active',
            paymentStatus: 'pending',
            note: 'Kick-off meeting scheduled for June 12th, 10 AM (Thai time).\n\nFocus on sustainability and urban commuting benefits.\n\nClient wants to see initial mood board by next week.',
        },
    ];
};

export const generateGoldenSpoonEateryProjects = (
    userId: string,
    clientId: string,
) => {
    return [
        {
            userId: userId,
            clientId: clientId,
            name: 'New Summer Menu Design & Photography',
            budget: 35000,
            projectStatus: 'completed',
            paymentStatus: 'paid',
            note: 'Final menu PDF and high-res photos delivered on June 5th.\n\nClient very happy with the vibrant colors.\n\nConsider proposing a social media campaign for the new items in Q3.',
        },
    ];
};

export const generateHarmonyMusicAcademyProjects = (
    userId: string,
    clientId: string,
) => {
    return [
        {
            userId: userId,
            clientId: clientId,
            name: 'Annual Student Concert Branding & Tickets',
            budget: 45000,
            projectStatus: 'active',
            paymentStatus: 'processing',
            note: 'Initial branding concepts shared on June 3rd. Client feedback expected by June 12th.\n\nNeed to source print quotes for physical tickets by end of week.\n\nConcert date: August 15th, 2025.',
        },
        {
            userId: userId,
            clientId: clientId,
            name: 'New Online Course Landing Page (Guitar Basics)',
            budget: 60000,
            projectStatus: 'on-hold',
            paymentStatus: 'pending',
            note: 'Project temporarily paused. Harmony is finalizing course content and video assets.\n\nAnticipated restart: Q3 2025. Will follow up with Ms. Lily in early July.\n\nBudget confirmed, no changes.',
        },
        {
            userId: userId,
            clientId: clientId,
            name: 'Music Theory Blog Content Strategy & First 5 Articles',
            budget: 38000,
            projectStatus: 'completed',
            paymentStatus: 'paid',
            note: 'Content strategy document delivered and approved on May 28th.\n\nFirst 5 articles submitted and published on June 6th.\n\nConsider proposing ongoing content package for next quarter.',
        },
    ];
};

export const generateHorizonRealEstateGroupProjects = (
    userId: string,
    clientId: string,
) => {
    return [
        {
            userId: userId,
            clientId: clientId,
            name: 'Luxury Condo Development - Digital Marketing Kit',
            pinned: true,
            budget: 95000,
            projectStatus: 'active',
            paymentStatus: 'processing',
            note: "Initial design concepts for e-brochure sent for review today.\n\nNeed to gather high-res property photos by June 15th from client's marketing team.\n\nLaunch date for development is Sept 2025, so we need to stay on track.",
        },
    ];
};

export const generateUrbanFlowFitnessProjects = (
    userId: string,
    clientId: string,
) => {
    return [
        {
            userId: userId,
            clientId: clientId,
            name: 'Summer Challenge Landing Page & Ad Creatives',
            budget: 55000,
            projectStatus: 'active',
            paymentStatus: 'processing',
            note: 'Client wants strong CTA for sign-ups.\n\nConsider A/B testing headlines.\n\nAssets received via shared drive.',
        },
        {
            userId: userId,
            clientId: clientId,
            name: 'New Class Schedule Design & Print Production',
            budget: 28000,
            projectStatus: 'completed',
            paymentStatus: 'paid',
            note: 'Final approval received on June 1st.\n\nPrinter contact: Mr. Somchai, 081-XXXX-XXXX.\n\nRemember to send follow-up email.',
        },
        {
            userId: userId,
            clientId: clientId,
            name: 'Member Loyalty Program Branding',
            budget: 42000,
            projectStatus: 'on-hold',
            paymentStatus: 'pending',
            note: "Waiting for client's feedback on concept designs (sent May 20).\n\nNeed to chase Ms. Ploy next week.\n\nCheck out competitors' loyalty programs for inspiration.",
        },
        {
            userId: userId,
            clientId: clientId,
            name: 'Introductory Yoga Video Series (3 videos)',
            budget: 85000,
            projectStatus: 'active',
            paymentStatus: 'pending',
            note: 'Script approved.\n\nFilming scheduled for July 10-12 at studio.\n\nNeed to book voice-over artist by end of week.',
        },
    ];
};

export const generateZenithApparelProjects = (
    userId: string,
    clientId: string,
) => {
    return [
        {
            userId: userId,
            clientId: clientId,
            name: 'Autumn/Winter 2025 Lookbook Photography & Design',
            pinned: true,
            budget: 120000,
            projectStatus: 'active',
            paymentStatus: 'processing',
            note: 'Shoot date confirmed for July 5-7 at outdoor location (Hua Hin).\n\nModel casting selections to be finalized by June 15th.\n\nClient wants a modern, minimalist aesthetic for this collection.',
        },
        {
            userId: userId,
            clientId: clientId,
            name: 'E-commerce Product Page Copywriting Refresh',
            budget: 45000,
            projectStatus: 'completed',
            paymentStatus: 'paid',
            note: 'All copy delivered and implemented on June 1st.\n\nAnalytics show immediate positive impact on engagement.\n\nFollow up for client testimonial next week.',
        },
        {
            userId: userId,
            clientId: clientId,
            name: 'Sustainable Collection Launch Social Media Campaign',
            budget: 65000,
            projectStatus: 'active',
            paymentStatus: 'pending',
            note: 'Initial campaign calendar approved.\n\nFirst batch of creatives (stills & reels) due for client review by June 25th.\n\nEmphasize ethical sourcing and recycled materials in all messaging.',
        },
        {
            userId: userId,
            clientId: clientId,
            name: 'New Packaging Design for Premium Line',
            budget: 80000,
            projectStatus: 'on-hold',
            paymentStatus: 'pending',
            note: 'Design concepts submitted last month.\n\nClient is awaiting final material quotes from their supplier before proceeding.\n\nCheck in with Khun Nattaya (Zenith PM) end of June for update.',
        },
    ];
};