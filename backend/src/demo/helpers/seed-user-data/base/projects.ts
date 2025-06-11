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
            clientId: clientId, // Injected userId
            title: 'New Tropical Bliss Blend Packaging Design',
            budget: 55000, // THB - for packaging design of a new tea blend (box, pouch, label)
            projectStatus: 'active',
            paymentStatus: 'processing',
            note: 'Initial mood board and color palette approved.\n\nClient wants to see 3-4 distinct design concepts by June 20th.\n\nEmphasize freshness and exotic fruits in the design.',
            links: [
                { label: 'Project Brief Document', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Mood Board & Style Guide', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Competitor Analysis Report', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Design Concept 1 (Initial)', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Client Feedback Portal', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
            ],
        },
        {
            userId: userId,
            clientId: clientId, // Injected userId
            title: 'Q3 Social Media Content & Engagement Strategy',
            budget: 40000, // THB - for content calendar, graphic assets, and engagement plan for the quarter
            projectStatus: 'active',
            paymentStatus: 'pending',
            note: 'Strategy document submitted last week.\n\nNeed to schedule review call with Ms. Preeya for June 12th, 2 PM (Thai time).\n\nFocus on user-generated content and healthy lifestyle angles.',
            links: [
                { label: 'Q3 Strategy Document', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Content Calendar Draft', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Engagement Plan Outline', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'User-Generated Content Examples', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Analytics Dashboard Link', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Ms. Preeya Meeting Notes', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
            ],
        },
        {
            userId: userId,
            clientId: clientId, // Injected userId
            title: "Brand Story Video for 'About Us' Page",
            budget: 80000, // THB - for short documentary-style video production (script, shoot, edit)
            projectStatus: 'on-hold',
            paymentStatus: 'pending',
            note: 'Script draft 1 pending client feedback (sent May 29th).\n\nFilming locations need to be scouted in Chiang Rai.\n\nProject on hold until client confirms budget for travel.\n\nFollow up with Mr. Sakda on June 18th if no response.',
            links: [
                { label: 'Video Project Brief', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Script Draft 1 (Google Doc)', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Client Feedback Email Thread', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Chiang Rai Location Ideas', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Budget Confirmation Form', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Mr. Sakda Contact Card', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Storyboard Samples', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Crew Booking Sheet', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
            ],
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
            title: 'E-commerce Platform UI/UX Redesign',
            budget: 180000,
            projectStatus: 'active',
            paymentStatus: 'processing',
            note: "Initial wireframes approved.\n\nMoving to high-fidelity mockups by June 20th.\n\nClient wants to see some motion prototypes for navigation by next review.\n\nCheck competitor 'ShopFlow' for recent UI trends.",
            links: [
                { label: 'Project Brief', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Wireframe Prototypes', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'UI/UX Style Guide', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Motion Prototype Demos', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Competitor Analysis: ShopFlow', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Client Feedback Portal', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
            ],
        },
        {
            userId: userId,
            clientId: clientId,
            title: 'Internal CRM System API Integration',
            budget: 95000,
            projectStatus: 'active',
            paymentStatus: 'pending',
            note: 'API documentation received.\n\nNeed to confirm authentication method by end of week.',
            links: [
                { label: 'API Integration Brief', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'CRM API Documentation', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Authentication Method Proposal', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Integration Test Plan', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Security Compliance Checklist', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
            ],
        },
        {
            userId: userId,
            clientId: clientId,
            title: 'Product Launch Video & Explainer Animation',
            budget: 120000,
            projectStatus: 'on-hold',
            paymentStatus: 'pending',
            note: "Project paused due to internal resource reallocation on ByteNest's side.\n\nExpected restart Q4 2025.\n\nFollow up with Mr. Anan (ByteNest PM) in late September to confirm new timeline.\n\nBudget still holds for now, no changes anticipated unless scope changes significantly.",
            links: [
                { label: 'Video Project Brief', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Script Drafts (V1-V3)', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Storyboard Concepts', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Resource Allocation Document', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Mr. Anan Contact Details', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Budget Breakdown', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
            ],
        },
        {
            userId: userId,
            clientId: clientId,
            title: 'Automated Data Reporting Dashboard',
            budget: 250000,
            projectStatus: 'completed',
            paymentStatus: 'paid',
            note: 'Final dashboard delivered and accepted on May 28th.\n\nTraining session conducted for ByteNest team on June 5th.\n\nProject sign-off document filed. Request testimonial from client.',
            links: [
                { label: 'Dashboard Requirements Doc', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Final Dashboard Access', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Training Session Materials', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Project Sign-off Form', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Testimonial Request Template', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Post-Mortem Review Notes', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
            ],
        },
        {
            userId: userId,
            clientId: clientId,
            title: 'Website Performance Audit & Optimization',
            budget: 60000,
            projectStatus: 'active',
            paymentStatus: 'pending',
            note: 'Initial audit report drafted.\n\nClient meeting scheduled for June 17th to discuss findings and next steps. Focus on core web vitals and server response times.',
            links: [
                { label: 'Initial Audit Report Draft', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Performance Metrics Dashboard', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Client Meeting Presentation', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Core Web Vitals Checklist', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Optimization Action Plan', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Server Log Analysis', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Competitor Benchmarking', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
            ],
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
            title: 'New Model X-2 Launch Campaign Assets',
            budget: 70000,
            projectStatus: 'active',
            paymentStatus: 'pending',
            note: 'Kick-off meeting scheduled for June 12th, 10 AM (Thai time).\n\nFocus on sustainability and urban commuting benefits.\n\nClient wants to see initial mood board by next week.',
            links: [
                { label: 'Project Briefing Document', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Campaign Strategy Outline', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Sustainability Messaging Guidelines', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Urban Commuting Benefits Research', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Initial Mood Board Concepts', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
            ],
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
            title: 'New Summer Menu Design & Photography',
            budget: 35000,
            projectStatus: 'completed',
            paymentStatus: 'paid',
            note: 'Final menu PDF and high-res photos delivered on June 5th.\n\nClient very happy with the vibrant colors.\n\nConsider proposing a social media campaign for the new items in Q3.',
            links: [
                { label: 'Project Brief & Moodboard', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Menu Design Concepts (V1-V3)', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Food Photography Shot List', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'High-Res Final Photos (Drive Link)', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Final Menu PDF', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Client Testimonial Request', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Q3 Social Media Campaign Idea', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
            ],
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
            title: 'Annual Student Concert Branding & Tickets',
            budget: 45000,
            projectStatus: 'active',
            paymentStatus: 'processing',
            note: 'Initial branding concepts shared on June 3rd. Client feedback expected by June 12th.\n\nNeed to source print quotes for physical tickets by end of week.\n\nConcert date: August 15th, 2025.',
            links: [
                { label: 'Project Brief: Concert Branding', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Initial Branding Concepts (Google Drive)', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Client Feedback Form', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Print Quote Request Form', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Ticket Design Templates', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Concert Marketing Plan', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
            ],
        },
        {
            userId: userId,
            clientId: clientId,
            title: 'New Online Course Landing Page (Guitar Basics)',
            budget: 60000,
            projectStatus: 'on-hold',
            paymentStatus: 'pending',
            note: 'Project temporarily paused. Harmony is finalizing course content and video assets.\n\nAnticipated restart: Q3 2025. Will follow up with Ms. Lily in early July.\n\nBudget confirmed, no changes.',
            links: [
                { label: 'Landing Page Project Outline', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Initial Wireframes', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Course Content Checklist', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Video Asset Requirements', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Ms. Lily Contact Info', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Budget Allocation Sheet', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
            ],
        },
        {
            userId: userId,
            clientId: clientId,
            title: 'Music Theory Blog Content Strategy & First 5 Articles',
            budget: 38000,
            projectStatus: 'completed',
            paymentStatus: 'paid',
            note: 'Content strategy document delivered and approved on May 28th.\n\nFirst 5 articles submitted and published on June 6th.\n\nConsider proposing ongoing content package for next quarter.',
            links: [
                { label: 'Content Strategy Document (Final)', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Published Articles (Blog Link)', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'SEO Keyword Research', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Performance Analytics Dashboard', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Ongoing Content Package Proposal', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Client Feedback Survey', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Case Study Draft', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
            ],
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
            title: 'Luxury Condo Development - Digital Marketing Kit',
            budget: 95000,
            projectStatus: 'active',
            paymentStatus: 'processing',
            note: "Initial design concepts for e-brochure sent for review today.\n\nNeed to gather high-res property photos by June 15th from client's marketing team.\n\nLaunch date for development is Sept 2025, so we need to stay on track.",
            links: [
                { label: 'Project Briefing & Objectives', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'E-brochure Design Concepts', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'High-Res Photo Request Form', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Marketing Team Contact List', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Overall Launch Timeline', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Competitor Analysis Report', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Virtual Tour Storyboard', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
            ],
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
            title: 'Summer Challenge Landing Page & Ad Creatives',
            budget: 55000,
            projectStatus: 'active',
            paymentStatus: 'processing',
            note: 'Client wants strong CTA for sign-ups.\n\nConsider A/B testing headlines.\n\nAssets received via shared drive.',
            links: [
                { label: 'Project Brief: Summer Challenge', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Received Assets (Shared Drive)', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Landing Page Wireframes', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Ad Creative Concepts', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'A/B Test Plan for Headlines', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Client Feedback Form', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
            ],
        },
        {
            userId: userId,
            clientId: clientId,
            title: 'New Class Schedule Design & Print Production',
            budget: 28000,
            projectStatus: 'completed',
            paymentStatus: 'paid',
            note: 'Final approval received on June 1st.\n\nPrinter contact: Mr. Somchai, 081-XXXX-XXXX.\n\nRemember to send follow-up email.',
            links: [
                { label: 'Schedule Design Brief', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Approved Design Files (PDF)', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Print Specifications', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Mr. Somchai Contact Card', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Delivery Tracking', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
            ],
        },
        {
            userId: userId,
            clientId: clientId,
            title: 'Member Loyalty Program Branding',
            budget: 42000,
            projectStatus: 'on-hold',
            paymentStatus: 'pending',
            note: "Waiting for client's feedback on concept designs (sent May 20).\n\nNeed to chase Ms. Ploy next week.\n\nCheck out competitors' loyalty programs for inspiration.",
            links: [
                { label: 'Loyalty Program Brief', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Initial Concept Designs', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Competitor Analysis: Loyalty Programs', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Ms. Ploy Contact Details', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Feedback Follow-up Template', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
            ],
        },
        {
            userId: userId,
            clientId: clientId,
            title: 'Introductory Yoga Video Series (3 videos)',
            budget: 85000,
            projectStatus: 'active',
            paymentStatus: 'pending',
            note: 'Script approved.\n\nFilming scheduled for July 10-12 at studio.\n\nNeed to book voice-over artist by end of week.',
            links: [
                { label: 'Video Series Brief', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Approved Video Scripts', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Filming Schedule & Logistics', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Studio Booking Confirmation', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Voice-over Artist Options', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Post-Production Checklist', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Marketing Distribution Plan', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
            ],
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
            title: 'Autumn/Winter 2025 Lookbook Photography & Design',
            budget: 120000,
            projectStatus: 'active',
            paymentStatus: 'processing',
            note: 'Shoot date confirmed for July 5-7 at outdoor location (Hua Hin).\n\nModel casting selections to be finalized by June 15th.\n\nClient wants a modern, minimalist aesthetic for this collection.',
            links: [
                { label: 'Lookbook Project Brief', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Hua Hin Location Scout Photos', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Model Casting Portfolio', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Mood Board: Modern Minimalist', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Shoot Production Schedule', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Retouching Guidelines', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Lookbook Layout Draft', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
            ],
        },
        {
            userId: userId,
            clientId: clientId,
            title: 'E-commerce Product Page Copywriting Refresh',
            budget: 45000,
            projectStatus: 'completed',
            paymentStatus: 'paid',
            note: 'All copy delivered and implemented on June 1st.\n\nAnalytics show immediate positive impact on engagement.\n\nFollow up for client testimonial next week.',
            links: [
                { label: 'Copywriting Project Scope', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Delivered Copy Files', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'E-commerce Analytics Dashboard', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Client Testimonial Request Form', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Performance Report', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
            ],
        },
        {
            userId: userId,
            clientId: clientId,
            title: 'Sustainable Collection Launch Social Media Campaign',
            budget: 65000,
            projectStatus: 'active',
            paymentStatus: 'pending',
            note: 'Initial campaign calendar approved.\n\nFirst batch of creatives (stills & reels) due for client review by June 25th.\n\nEmphasize ethical sourcing and recycled materials in all messaging.',
            links: [
                { label: 'Campaign Strategy Document', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Approved Campaign Calendar', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Creative Brief: Stills & Reels', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Ethical Sourcing Messaging Guide', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Recycled Materials Content', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Client Creative Review Portal', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Influencer Collaboration Plan', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
            ],
        },
        {
            userId: userId,
            clientId: clientId,
            title: 'New Packaging Design for Premium Line',
            budget: 80000,
            projectStatus: 'on-hold',
            paymentStatus: 'pending',
            note: 'Design concepts submitted last month.\n\nClient is awaiting final material quotes from their supplier before proceeding.\n\nCheck in with Khun Nattaya (Zenith PM) end of June for update.',
            links: [
                { label: 'Packaging Design Brief', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Initial Design Concepts', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Material Sourcing Report', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Supplier Quote Request', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
                { label: 'Khun Nattaya Contact', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif' },
            ],
        },
    ];
};