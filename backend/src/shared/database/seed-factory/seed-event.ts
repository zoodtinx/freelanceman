interface ProjectsData {
    [key: string]: {
        projectId: string;
        clientId: string;
        userId: string;
    };
}

export function getEvents(projectsData: ProjectsData) {
    return [
        ...seedBrandIdentityForThaiCoffeeCoData(projectsData),
        ...seedWebsiteRedesignForSiamFashionData(projectsData),
        ...seedEcommerceWebsiteForThaiArtGalleryData(projectsData),
        ...seedSocialMediaCampaignForOrganicFarmData(projectsData),
        ...seedPackagingDesignForThaiTeaBrandData(projectsData),
        ...seedAnnualReportForGreenEnergyCorpData(projectsData),
        ...seedWebsiteRedesignForHotelBookingSystemData(projectsData),
        ...seedBrandIdentityForNewLuxurySuiteData(projectsData),
        ...seedEcommerceIntegrationForRoomPackagesData(projectsData),
        ...seedSocialMediaCampaignForSeasonalPromotionsData(projectsData),
        ...seedInteriorDesignConceptForNewLobbyData(projectsData),
        ...seedAnnualReportDesignForHotelPerformanceData(projectsData),
        ...seedCorporateBrandingForNewSubsidiaryData(projectsData),
        ...seedInvestorPresentationDesignForQuarterlyReportData(projectsData),
        ...seedMarketResearchInfographicsForNewProductLaunchData(projectsData),
        ...seedPackagingDesignForConsumerElectronicsLineData(projectsData),
        ...seedCorporateEventBrandingForAnnualConferenceData(projectsData),
        ...seedAdvertisingCampaignForNewRetailProductLineData(projectsData),
        ...seedBrandIdentityRedesignForLawFirmData(projectsData),
        ...seedLegalDocumentTemplatesForCorporateClientsData(projectsData),
        ...seedClientOnboardingGuideDesignData(projectsData),
        ...seedBrochureDesignForFamilyLawServicesData(projectsData),
        ...seedAnnualLegalInsightsReportDesignData(projectsData),
        ...seedAdCampaignForPersonalInjuryLawServicesData(projectsData),
        ...seedCustomerServiceTrainingManualData(projectsData),
        ...seedMobileAppUserInterfaceImprovementsData(projectsData),
        ...seedInBranchSignageSystemData(projectsData),
        ...seedCustomerFeedbackSurveyLayoutData(projectsData),
        ...seedNewLoanProductInformationBrochureData(projectsData),
        ...seedTrainingVideoForOnlineBankingSystemData(projectsData),
        ...seedProductPackagingDesignForNewSkincareLineData(projectsData),
        ...seedSocialMediaContentCreationForProductLaunchData(projectsData),
        ...seedSkincareBlogDesignForCompanyWebsiteData(projectsData),
        ...seedEmailNewsletterTemplateDesignData(projectsData),
        ...seedRetailDisplayForInStoreProductPromotionData(projectsData),
        ...seedCustomerTestimonialsVideoForSkincareProductsData(projectsData),
    ];
}

const seedBrandIdentityForThaiCoffeeCoData = (projectData: ProjectsData) => [
    {
        ...projectData['Brand Identity for Thai Coffee Co.'],
        name: 'Initial Design Concept Meeting',
        status: 'scheduled',
        details:
            'Kickoff meeting to discuss initial design concepts for Thai Coffee Co.',
        link: 'https://example.com/meeting1',
        dueAt: new Date(new Date().getTime() + 86400000).toISOString(),
        tags: ['design', 'branding', 'meeting'],
    },
    {
        ...projectData['Brand Identity for Thai Coffee Co.'],
        name: 'Logo Refinement Review',
        status: 'completed',
        details: 'Review of logo refinement and adjustments based on feedback.',
        link: 'https://example.com/meeting2',
        dueAt: new Date(new Date().getTime() - 86400000).toISOString(),
        tags: ['design', 'logo', 'review'],
    },
    {
        ...projectData['Brand Identity for Thai Coffee Co.'],
        name: 'Brand Colors Finalization',
        status: 'scheduled',
        details: 'Finalizing the color palette for Thai Coffee Co. branding.',
        link: 'https://example.com/meeting3',
        dueAt: new Date(new Date().getTime() + 172800000).toISOString(),
        tags: ['branding', 'colors'],
    },
    {
        ...projectData['Brand Identity for Thai Coffee Co.'],
        name: 'Client Presentation for Mockups',
        status: 'scheduled',
        details: 'Presenting final mockups to the client for approval.',
        link: 'https://example.com/meeting4',
        dueAt: new Date(new Date().getTime() + 604800000).toISOString(),
        tags: ['presentation', 'mockups'],
    },
    {
        ...projectData['Brand Identity for Thai Coffee Co.'],
        name: 'Final Delivery Preparation',
        status: 'scheduled',
        details: 'Preparing files for final delivery to the client.',
        link: 'https://example.com/meeting5',
        dueAt: new Date(new Date().getTime() + 2592000000).toISOString(),
        tags: ['delivery', 'finalization'],
    },
    {
        ...projectData['Brand Identity for Thai Coffee Co.'],
        name: 'Feedback Review Session',
        status: 'completed',
        details:
            'Review session for feedback after presenting the first draft.',
        link: 'https://example.com/meeting6',
        dueAt: new Date(new Date().getTime() - 259200000).toISOString(),
        tags: ['feedback', 'review'],
    },
    {
        ...projectData['Brand Identity for Thai Coffee Co.'],
        name: 'Content Creation for Website',
        status: 'scheduled',
        details:
            'Creating content for the website based on the new brand identity.',
        link: 'https://example.com/meeting7',
        dueAt: new Date(new Date().getTime() + 864000000).toISOString(),
        tags: ['content', 'website', 'branding'],
    },
    {
        ...projectData['Brand Identity for Thai Coffee Co.'],
        name: 'Final Feedback Review',
        status: 'cancelled',
        details:
            'The final feedback review session was cancelled due to scheduling conflicts.',
        link: 'https://example.com/meeting8',
        dueAt: new Date(new Date().getTime() - 432000000).toISOString(),
        tags: ['cancelled', 'review'],
    },
    {
        ...projectData['Brand Identity for Thai Coffee Co.'],
        name: 'Brand Guidelines Review',
        status: 'scheduled',
        details: 'Reviewing the finalized brand guidelines with the team.',
        link: 'https://example.com/meeting9',
        dueAt: new Date(new Date().getTime() + 432000000).toISOString(),
        tags: ['branding', 'guidelines', 'review'],
    },
    {
        ...projectData['Brand Identity for Thai Coffee Co.'],
        name: 'Post-Launch Feedback Collection',
        status: 'completed',
        details: 'Collecting feedback after the brand identity launch.',
        link: 'https://example.com/meeting10',
        dueAt: new Date(new Date().getTime() - 604800000).toISOString(),
        tags: ['feedback', 'post-launch'],
    },
];

const seedWebsiteRedesignForSiamFashionData = (projectData: ProjectsData) => [
    {
        ...projectData['Website Redesign for Siam Fashion'],
        name: 'Initial Planning Session',
        status: 'scheduled',
        details: 'Kick-off meeting to discuss project scope and objectives.',
        link: 'https://example.com/planning',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() + 2),
        ).toISOString(),
        tags: ['meeting', 'planning', 'strategy'],
    },
    {
        ...projectData['Website Redesign for Siam Fashion'],
        name: 'Design Mockups Review',
        status: 'scheduled',
        details: 'Reviewing the initial design mockups for feedback.',
        link: 'https://example.com/design-review',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() + 5),
        ).toISOString(),
        tags: ['design', 'review', 'feedback'],
    },
    {
        ...projectData['Website Redesign for Siam Fashion'],
        name: 'Website Framework Setup',
        status: 'completed',
        details: "Setting up the website's basic framework and layout.",
        link: 'https://example.com/framework',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() - 3),
        ).toISOString(),
        tags: ['development', 'frontend', 'framework'],
    },
    {
        ...projectData['Website Redesign for Siam Fashion'],
        name: 'SEO Strategy Planning',
        status: 'scheduled',
        details: 'Finalizing SEO strategies for better search visibility.',
        link: 'https://example.com/seo-strategy',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() + 7),
        ).toISOString(),
        tags: ['seo', 'strategy', 'marketing'],
    },
    {
        ...projectData['Website Redesign for Siam Fashion'],
        name: 'Content Finalization',
        status: 'completed',
        details: "Finalizing all content for the website's product pages.",
        link: 'https://example.com/content-finalization',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() - 5),
        ).toISOString(),
        tags: ['content', 'finalization', 'writing'],
    },
    {
        ...projectData['Website Redesign for Siam Fashion'],
        name: 'Client Feedback Session',
        status: 'cancelled',
        details: 'Scheduled meeting for client feedback that was cancelled.',
        link: 'https://example.com/feedback-cancelled',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() - 7),
        ).toISOString(),
        tags: ['meeting', 'feedback', 'cancelled'],
    },
    {
        ...projectData['Website Redesign for Siam Fashion'],
        name: 'Launch Preparation',
        status: 'scheduled',
        details: 'Final preparations before launching the new website.',
        link: 'https://example.com/launch-prep',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() + 10),
        ).toISOString(),
        tags: ['launch', 'preparation', 'go-live'],
    },
    {
        ...projectData['Website Redesign for Siam Fashion'],
        name: 'Website Testing',
        status: 'completed',
        details: 'Testing the website for bugs and issues before the launch.',
        link: 'https://example.com/testing',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() - 2),
        ).toISOString(),
        tags: ['testing', 'quality assurance', 'development'],
    },
    {
        ...projectData['Website Redesign for Siam Fashion'],
        name: 'Performance Optimization',
        status: 'scheduled',
        details: 'Optimizing website performance for better load times.',
        link: 'https://example.com/performance',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() + 3),
        ).toISOString(),
        tags: ['performance', 'optimization', 'speed'],
    },
    {
        ...projectData['Website Redesign for Siam Fashion'],
        name: 'Launch Day',
        status: 'scheduled',
        details: 'Official launch of the redesigned website.',
        link: 'https://example.com/launch-day',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() + 12),
        ).toISOString(),
        tags: ['launch', 'celebration', 'website'],
    },
];
const seedEcommerceWebsiteForThaiArtGalleryData = (
    projectData: ProjectsData,
) => [
    {
        ...projectData['E-commerce Website for Thai Art Gallery'],
        name: 'Project Kickoff',
        status: 'scheduled',
        details:
            'Initial meeting to define project scope, timeline, and requirements.',
        link: 'https://example.com/kickoff',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() + 1),
        ).toISOString(),
        tags: ['meeting', 'kickoff', 'planning'],
    },
    {
        ...projectData['E-commerce Website for Thai Art Gallery'],
        name: 'Homepage Design Concept',
        status: 'scheduled',
        details:
            'Designing the homepage layout and user experience for the site.',
        link: 'https://example.com/homepage-design',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() + 3),
        ).toISOString(),
        tags: ['design', 'UI/UX', 'homepage'],
    },
    {
        ...projectData['E-commerce Website for Thai Art Gallery'],
        name: 'Product Catalog Development',
        status: 'completed',
        details:
            'Development of the product catalog including filtering and categories.',
        link: 'https://example.com/catalog-development',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() - 5),
        ).toISOString(),
        tags: ['development', 'catalog', 'products'],
    },
    {
        ...projectData['E-commerce Website for Thai Art Gallery'],
        name: 'Payment Gateway Integration',
        status: 'scheduled',
        details:
            'Integrating a secure payment gateway for online transactions.',
        link: 'https://example.com/payment-integration',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() + 7),
        ).toISOString(),
        tags: ['payment', 'integration', 'e-commerce'],
    },
    {
        ...projectData['E-commerce Website for Thai Art Gallery'],
        name: 'Mobile Responsiveness Testing',
        status: 'completed',
        details:
            'Ensuring the website is fully responsive and functional on mobile devices.',
        link: 'https://example.com/responsive-testing',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() - 3),
        ).toISOString(),
        tags: ['testing', 'responsive', 'mobile'],
    },
    {
        ...projectData['E-commerce Website for Thai Art Gallery'],
        name: 'SEO Setup for Product Pages',
        status: 'scheduled',
        details:
            'Optimizing product pages for search engines to increase visibility.',
        link: 'https://example.com/seo-setup',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() + 5),
        ).toISOString(),
        tags: ['SEO', 'e-commerce', 'optimization'],
    },
    {
        ...projectData['E-commerce Website for Thai Art Gallery'],
        name: 'Client Review - Initial Designs',
        status: 'cancelled',
        details:
            'Scheduled client review of initial design concepts, now cancelled.',
        link: 'https://example.com/design-review-cancelled',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() - 2),
        ).toISOString(),
        tags: ['review', 'client', 'cancelled'],
    },
    {
        ...projectData['E-commerce Website for Thai Art Gallery'],
        name: 'Launch Day Preparation',
        status: 'scheduled',
        details:
            'Preparing the website for launch, including final checks and updates.',
        link: 'https://example.com/launch-prep',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() + 10),
        ).toISOString(),
        tags: ['launch', 'preparation', 'checklist'],
    },
    {
        ...projectData['E-commerce Website for Thai Art Gallery'],
        name: 'User Acceptance Testing',
        status: 'completed',
        details:
            'Final round of testing with users to confirm functionality and usability.',
        link: 'https://example.com/user-acceptance-testing',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() - 1),
        ).toISOString(),
        tags: ['testing', 'acceptance', 'user'],
    },
    {
        ...projectData['E-commerce Website for Thai Art Gallery'],
        name: 'Grand Launch Event',
        status: 'scheduled',
        details:
            'Official launch of the e-commerce platform with an event to celebrate.',
        link: 'https://example.com/grand-launch',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() + 12),
        ).toISOString(),
        tags: ['launch', 'event', 'celebration'],
    },
];
const seedSocialMediaCampaignForOrganicFarmData = (
    projectData: ProjectsData,
) => [
    {
        ...projectData['Social Media Campaign for Organic Farm'],
        name: 'Campaign Kickoff',
        status: 'scheduled',
        details:
            'Initial planning session to define campaign goals and strategy.',
        link: 'https://example.com/campaign-kickoff',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() + 1),
        ).toISOString(),
        tags: ['meeting', 'kickoff', 'strategy'],
    },
    {
        ...projectData['Social Media Campaign for Organic Farm'],
        name: 'Content Creation - Phase 1',
        status: 'scheduled',
        details:
            'Creating engaging content for the first phase of the campaign.',
        link: 'https://example.com/content-creation-phase-1',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() + 3),
        ).toISOString(),
        tags: ['content', 'creation', 'social media'],
    },
    {
        ...projectData['Social Media Campaign for Organic Farm'],
        name: 'Brand Collaboration Announcement',
        status: 'completed',
        details:
            'Announcing a new collaboration with a sustainable brand on social media.',
        link: 'https://example.com/brand-collaboration',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() - 2),
        ).toISOString(),
        tags: ['announcement', 'collaboration', 'partnership'],
    },
    {
        ...projectData['Social Media Campaign for Organic Farm'],
        name: 'First Campaign Ad Launch',
        status: 'scheduled',
        details:
            'Launch of the first ad promoting the farm’s organic products.',
        link: 'https://example.com/first-ad-launch',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() + 5),
        ).toISOString(),
        tags: ['ad', 'launch', 'marketing'],
    },
    {
        ...projectData['Social Media Campaign for Organic Farm'],
        name: 'User-Generated Content Campaign',
        status: 'completed',
        details:
            'Launching a UGC campaign inviting customers to share their experiences.',
        link: 'https://example.com/ugc-campaign',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() - 3),
        ).toISOString(),
        tags: ['user-generated', 'content', 'engagement'],
    },
    {
        ...projectData['Social Media Campaign for Organic Farm'],
        name: 'Live Q&A with Farmers',
        status: 'scheduled',
        details:
            'Live social media session where customers can ask farmers questions.',
        link: 'https://example.com/live-qa',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() + 7),
        ).toISOString(),
        tags: ['live', 'q&a', 'engagement'],
    },
    {
        ...projectData['Social Media Campaign for Organic Farm'],
        name: 'Mid-Campaign Performance Review',
        status: 'cancelled',
        details: 'Midway review to assess campaign performance, now cancelled.',
        link: 'https://example.com/mid-campaign-review',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() - 4),
        ).toISOString(),
        tags: ['review', 'cancelled', 'performance'],
    },
    {
        ...projectData['Social Media Campaign for Organic Farm'],
        name: 'Behind-the-Scenes Content',
        status: 'scheduled',
        details:
            'Sharing behind-the-scenes footage from the farm to engage the audience.',
        link: 'https://example.com/behind-scenes',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() + 9),
        ).toISOString(),
        tags: ['behind-the-scenes', 'content', 'organic farm'],
    },
    {
        ...projectData['Social Media Campaign for Organic Farm'],
        name: 'Campaign Wrap-Up and Thank You',
        status: 'completed',
        details:
            'Wrapping up the campaign with a thank-you message to all participants.',
        link: 'https://example.com/campaign-wrap-up',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() - 1),
        ).toISOString(),
        tags: ['wrap-up', 'thank-you', 'campaign'],
    },
    {
        ...projectData['Social Media Campaign for Organic Farm'],
        name: 'Final Performance Analysis',
        status: 'scheduled',
        details: 'Analyzing final campaign performance and preparing a report.',
        link: 'https://example.com/final-analysis',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() + 11),
        ).toISOString(),
        tags: ['analysis', 'report', 'performance'],
    },
];

const seedPackagingDesignForThaiTeaBrandData = (projectData: ProjectsData) => [
    {
        ...projectData['Packaging Design for Thai Tea Brand'],
        name: 'Design Brief Meeting',
        status: 'scheduled',
        details:
            'Initial meeting to discuss the design direction and packaging needs.',
        link: 'https://example.com/design-brief',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() + 1),
        ).toISOString(),
        tags: ['meeting', 'brief', 'design'],
    },
    {
        ...projectData['Packaging Design for Thai Tea Brand'],
        name: 'Concept Sketches Review',
        status: 'scheduled',
        details: 'Reviewing initial concept sketches for the packaging design.',
        link: 'https://example.com/concept-sketches',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() + 3),
        ).toISOString(),
        tags: ['design', 'review', 'concept'],
    },
    {
        ...projectData['Packaging Design for Thai Tea Brand'],
        name: 'Packaging Material Sourcing',
        status: 'completed',
        details: 'Sourcing eco-friendly materials for the Thai tea packaging.',
        link: 'https://example.com/material-sourcing',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() - 2),
        ).toISOString(),
        tags: ['material', 'sourcing', 'eco-friendly'],
    },
    {
        ...projectData['Packaging Design for Thai Tea Brand'],
        name: 'Final Packaging Design Presentation',
        status: 'scheduled',
        details:
            'Presenting the final packaging design to the client for approval.',
        link: 'https://example.com/final-design-presentation',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() + 5),
        ).toISOString(),
        tags: ['presentation', 'design', 'final'],
    },
    {
        ...projectData['Packaging Design for Thai Tea Brand'],
        name: 'Prototype Printing',
        status: 'scheduled',
        details:
            'Printing the first prototype of the packaging for client review.',
        link: 'https://example.com/prototype-printing',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() + 7),
        ).toISOString(),
        tags: ['printing', 'prototype', 'review'],
    },
    {
        ...projectData['Packaging Design for Thai Tea Brand'],
        name: 'Production Approval',
        status: 'completed',
        details:
            'Getting final approval from the client for mass production of packaging.',
        link: 'https://example.com/production-approval',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() - 1),
        ).toISOString(),
        tags: ['approval', 'production', 'client'],
    },
    {
        ...projectData['Packaging Design for Thai Tea Brand'],
        name: 'Packaging Photoshoot',
        status: 'scheduled',
        details:
            'Arranging a photoshoot for the final packaging to be used in marketing.',
        link: 'https://example.com/photoshoot',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() + 10),
        ).toISOString(),
        tags: ['photoshoot', 'marketing', 'packaging'],
    },
    {
        ...projectData['Packaging Design for Thai Tea Brand'],
        name: 'Campaign Launch - Packaging Reveal',
        status: 'scheduled',
        details:
            'Launching a marketing campaign to reveal the new packaging design.',
        link: 'https://example.com/campaign-launch',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() + 12),
        ).toISOString(),
        tags: ['launch', 'campaign', 'reveal'],
    },
    {
        ...projectData['Packaging Design for Thai Tea Brand'],
        name: 'Client Feedback on Final Design',
        status: 'cancelled',
        details: 'Scheduled feedback session with the client, now cancelled.',
        link: 'https://example.com/client-feedback-cancelled',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() - 3),
        ).toISOString(),
        tags: ['feedback', 'cancelled', 'client'],
    },
    {
        ...projectData['Packaging Design for Thai Tea Brand'],
        name: 'Packaging Design for Retail Shelf',
        status: 'scheduled',
        details:
            'Designing the packaging layout for retail shelf visibility and shelf appeal.',
        link: 'https://example.com/retail-shelf-design',
        dueAt: new Date(
            new Date().setDate(new Date().getDate() + 14),
        ).toISOString(),
        tags: ['retail', 'design', 'shelf'],
    },
];

const seedAnnualReportForGreenEnergyCorpData = (projectData: ProjectsData) => [
    {
        ...projectData['Annual Report for Green Energy Corp.'],
        name: 'Kickoff Meeting',
        status: 'scheduled',
        details:
            'Initial project meeting to outline the scope and timeline of the annual report.',
        link: 'https://example.com/meeting-link',
        dueAt: new Date(Date.now() + 86400000).toISOString(), // due in 1 day
        tags: ['meeting', 'kickoff'],
    },
    {
        ...projectData['Annual Report for Green Energy Corp.'],
        name: 'Data Collection Phase',
        status: 'scheduled',
        details:
            'Collecting data from various sources and stakeholders for the report.',
        link: 'https://example.com/data-collection',
        dueAt: new Date(Date.now() + 259200000).toISOString(), // due in 3 days
        tags: ['data collection', 'research'],
    },
    {
        ...projectData['Annual Report for Green Energy Corp.'],
        name: 'First Draft Review',
        status: 'scheduled',
        details:
            'Reviewing the first draft of the annual report and making adjustments.',
        link: 'https://example.com/first-draft',
        dueAt: new Date(Date.now() + 604800000).toISOString(), // due in 7 days
        tags: ['draft', 'review'],
    },
    {
        ...projectData['Annual Report for Green Energy Corp.'],
        name: 'Graphics and Layout Design',
        status: 'scheduled',
        details: 'Designing the graphics and layout for the final report.',
        link: 'https://example.com/design',
        dueAt: new Date(Date.now() + 1209600000).toISOString(), // due in 14 days
        tags: ['design', 'layout'],
    },
    {
        ...projectData['Annual Report for Green Energy Corp.'],
        name: 'Final Review and Approval',
        status: 'scheduled',
        details:
            'Final review of the report before sending it to the client for approval.',
        link: 'https://example.com/final-review',
        dueAt: new Date(Date.now() + 1555200000).toISOString(), // due in 18 days
        tags: ['review', 'approval'],
    },
    {
        ...projectData['Annual Report for Green Energy Corp.'],
        name: 'Report Submission',
        status: 'scheduled',
        details: 'Submitting the completed annual report to the client.',
        link: 'https://example.com/report-submission',
        dueAt: new Date(Date.now() + 1814400000).toISOString(), // due in 21 days
        tags: ['submission', 'report'],
    },
    {
        ...projectData['Annual Report for Green Energy Corp.'],
        name: 'Feedback and Revisions',
        status: 'scheduled',
        details: 'Receiving feedback and making final revisions to the report.',
        link: 'https://example.com/feedback',
        dueAt: new Date(Date.now() + 2092800000).toISOString(), // due in 24 days
        tags: ['feedback', 'revisions'],
    },
    {
        ...projectData['Annual Report for Green Energy Corp.'],
        name: 'Internal Presentation',
        status: 'completed',
        details: 'Internal presentation of the final draft to stakeholders.',
        link: 'https://example.com/presentation',
        dueAt: new Date(Date.now() - 2592000000).toISOString(), // completed 30 days ago
        tags: ['presentation', 'internal'],
    },
    {
        ...projectData['Annual Report for Green Energy Corp.'],
        name: 'Post-Report Analysis',
        status: 'completed',
        details:
            'Analyzing the performance of the report and gathering client feedback.',
        link: 'https://example.com/analysis',
        dueAt: new Date(Date.now() - 3456000000).toISOString(), // completed 40 days ago
        tags: ['analysis', 'feedback'],
    },
    {
        ...projectData['Annual Report for Green Energy Corp.'],
        name: 'Project Closure',
        status: 'cancelled',
        details: 'Closing the project after final approval from the client.',
        link: 'https://example.com/closure',
        dueAt: new Date(Date.now() - 4320000000).toISOString(), // cancelled 50 days ago
        tags: ['closure', 'cancelled'],
    },
];
const seedWebsiteRedesignForHotelBookingSystemData = (
    projectData: ProjectsData,
) => [
    {
        ...projectData['Website Redesign for Hotel Booking System'],
        name: 'Kickoff Meeting',
        status: 'scheduled',
        details:
            'Initial meeting to discuss the redesign goals, branding, and key features.',
        link: 'https://example.com/meeting-link',
        dueAt: new Date(Date.now() + 86400000).toISOString(), // due in 1 day
        tags: ['meeting', 'kickoff'],
    },
    {
        ...projectData['Website Redesign for Hotel Booking System'],
        name: 'User Experience Research',
        status: 'scheduled',
        details:
            'Researching customer behavior and pain points for the new design.',
        link: 'https://example.com/ux-research',
        dueAt: new Date(Date.now() + 259200000).toISOString(), // due in 3 days
        tags: ['research', 'ux'],
    },
    {
        ...projectData['Website Redesign for Hotel Booking System'],
        name: 'Wireframe and Prototyping',
        status: 'scheduled',
        details: 'Creating wireframes and prototypes for key website pages.',
        link: 'https://example.com/wireframe-prototype',
        dueAt: new Date(Date.now() + 604800000).toISOString(), // due in 7 days
        tags: ['design', 'prototyping'],
    },
    {
        ...projectData['Website Redesign for Hotel Booking System'],
        name: 'Frontend Development Start',
        status: 'scheduled',
        details:
            'Begin frontend development based on approved wireframes and prototypes.',
        link: 'https://example.com/frontend-start',
        dueAt: new Date(Date.now() + 1209600000).toISOString(), // due in 14 days
        tags: ['development', 'frontend'],
    },
    {
        ...projectData['Website Redesign for Hotel Booking System'],
        name: 'Content Creation',
        status: 'scheduled',
        details:
            'Creating content for new pages, including descriptions, images, and videos.',
        link: 'https://example.com/content-creation',
        dueAt: new Date(Date.now() + 1555200000).toISOString(), // due in 18 days
        tags: ['content', 'creation'],
    },
    {
        ...projectData['Website Redesign for Hotel Booking System'],
        name: 'Mobile Responsiveness Testing',
        status: 'scheduled',
        details:
            'Testing the website on various mobile devices to ensure responsiveness.',
        link: 'https://example.com/mobile-testing',
        dueAt: new Date(Date.now() + 1814400000).toISOString(), // due in 21 days
        tags: ['testing', 'mobile'],
    },
    {
        ...projectData['Website Redesign for Hotel Booking System'],
        name: 'SEO Optimization',
        status: 'scheduled',
        details:
            'Optimizing website content for better search engine visibility.',
        link: 'https://example.com/seo',
        dueAt: new Date(Date.now() + 2092800000).toISOString(), // due in 24 days
        tags: ['seo', 'optimization'],
    },
    {
        ...projectData['Website Redesign for Hotel Booking System'],
        name: 'User Acceptance Testing (UAT)',
        status: 'completed',
        details:
            'Client testing the website and confirming if it meets the requirements.',
        link: 'https://example.com/uat',
        dueAt: new Date(Date.now() - 2592000000).toISOString(), // completed 30 days ago
        tags: ['testing', 'uat'],
    },
    {
        ...projectData['Website Redesign for Hotel Booking System'],
        name: 'Launch Preparation',
        status: 'completed',
        details:
            'Final preparations before the official launch, including backups and checks.',
        link: 'https://example.com/launch-prep',
        dueAt: new Date(Date.now() - 3456000000).toISOString(), // completed 40 days ago
        tags: ['launch', 'prep'],
    },
    {
        ...projectData['Website Redesign for Hotel Booking System'],
        name: 'Project Closure',
        status: 'cancelled',
        details:
            'Project was closed after client feedback indicated no further updates are needed.',
        link: 'https://example.com/closure',
        dueAt: new Date(Date.now() - 4320000000).toISOString(), // cancelled 50 days ago
        tags: ['closure', 'cancelled'],
    },
];
const seedBrandIdentityForNewLuxurySuiteData = (projectData: ProjectsData) => [
    {
        ...projectData['Brand Identity for New Luxury Suite'],
        name: 'Kickoff Meeting',
        status: 'scheduled',
        details:
            'Initial meeting to discuss the vision, target audience, and design goals for the brand identity.',
        link: 'https://example.com/meeting-link',
        dueAt: new Date(Date.now() + 86400000).toISOString(), // due in 1 day
        tags: ['meeting', 'kickoff'],
    },
    {
        ...projectData['Brand Identity for New Luxury Suite'],
        name: 'Market Research & Competitor Analysis',
        status: 'scheduled',
        details:
            'Conducting market research and analyzing competitors to understand industry trends.',
        link: 'https://example.com/research-analysis',
        dueAt: new Date(Date.now() + 259200000).toISOString(), // due in 3 days
        tags: ['research', 'analysis'],
    },
    {
        ...projectData['Brand Identity for New Luxury Suite'],
        name: 'Logo Design Concepts',
        status: 'scheduled',
        details:
            'Creating initial logo design concepts based on brand vision and market research.',
        link: 'https://example.com/logo-design',
        dueAt: new Date(Date.now() + 604800000).toISOString(), // due in 7 days
        tags: ['logo', 'design'],
    },
    {
        ...projectData['Brand Identity for New Luxury Suite'],
        name: 'Color Palette & Typography Selection',
        status: 'scheduled',
        details:
            'Choosing the color palette and typography to align with the luxury theme.',
        link: 'https://example.com/color-typography',
        dueAt: new Date(Date.now() + 1209600000).toISOString(), // due in 14 days
        tags: ['color', 'typography'],
    },
    {
        ...projectData['Brand Identity for New Luxury Suite'],
        name: 'Brand Guidelines Draft',
        status: 'scheduled',
        details:
            'Drafting the brand guidelines document, including logo usage, colors, and typography.',
        link: 'https://example.com/brand-guidelines',
        dueAt: new Date(Date.now() + 1555200000).toISOString(), // due in 18 days
        tags: ['guidelines', 'branding'],
    },
    {
        ...projectData['Brand Identity for New Luxury Suite'],
        name: 'Website Mockup & Design',
        status: 'scheduled',
        details:
            'Creating a website mockup to reflect the new brand identity and user experience.',
        link: 'https://example.com/website-design',
        dueAt: new Date(Date.now() + 1814400000).toISOString(), // due in 21 days
        tags: ['website', 'mockup'],
    },
    {
        ...projectData['Brand Identity for New Luxury Suite'],
        name: 'Social Media Brand Kit',
        status: 'scheduled',
        details:
            'Designing social media assets, including banners, icons, and templates.',
        link: 'https://example.com/social-media-kit',
        dueAt: new Date(Date.now() + 2092800000).toISOString(), // due in 24 days
        tags: ['social media', 'branding'],
    },
    {
        ...projectData['Brand Identity for New Luxury Suite'],
        name: 'Client Review & Feedback',
        status: 'completed',
        details:
            'Reviewing the brand identity with the client and incorporating feedback.',
        link: 'https://example.com/client-review',
        dueAt: new Date(Date.now() - 2592000000).toISOString(), // completed 30 days ago
        tags: ['review', 'feedback'],
    },
    {
        ...projectData['Brand Identity for New Luxury Suite'],
        name: 'Final Brand Identity Presentation',
        status: 'completed',
        details: 'Presenting the final brand identity package to the client.',
        link: 'https://example.com/final-presentation',
        dueAt: new Date(Date.now() - 3456000000).toISOString(), // completed 40 days ago
        tags: ['presentation', 'final'],
    },
    {
        ...projectData['Brand Identity for New Luxury Suite'],
        name: 'Project Closure & Handoff',
        status: 'cancelled',
        details:
            'Project was closed after final brand approval from the client and handoff of assets.',
        link: 'https://example.com/closure',
        dueAt: new Date(Date.now() - 4320000000).toISOString(), // cancelled 50 days ago
        tags: ['closure', 'handoff'],
    },
];
const seedEcommerceIntegrationForRoomPackagesData = (
    projectData: ProjectsData,
) => [
    {
        ...projectData['E-commerce Integration for Room Packages'],
        name: 'Kickoff Meeting',
        status: 'scheduled',
        details:
            'Discussing the integration requirements and setting up the project timeline.',
        link: 'https://example.com/meeting-link',
        dueAt: new Date(Date.now() + 86400000).toISOString(), // due in 1 day
        tags: ['meeting', 'kickoff'],
    },
    {
        ...projectData['E-commerce Integration for Room Packages'],
        name: 'E-commerce Platform Selection',
        status: 'scheduled',
        details:
            'Selecting the e-commerce platform that will integrate with the hotel booking system.',
        link: 'https://example.com/platform-selection',
        dueAt: new Date(Date.now() + 259200000).toISOString(), // due in 3 days
        tags: ['ecommerce', 'selection'],
    },
    {
        ...projectData['E-commerce Integration for Room Packages'],
        name: 'API Integration Setup',
        status: 'scheduled',
        details:
            'Setting up API connections between the e-commerce platform and hotel booking system.',
        link: 'https://example.com/api-setup',
        dueAt: new Date(Date.now() + 604800000).toISOString(), // due in 7 days
        tags: ['api', 'integration'],
    },
    {
        ...projectData['E-commerce Integration for Room Packages'],
        name: 'Room Package Configuration',
        status: 'scheduled',
        details:
            'Configuring room packages, rates, and availability for integration into the e-commerce platform.',
        link: 'https://example.com/package-config',
        dueAt: new Date(Date.now() + 1209600000).toISOString(), // due in 14 days
        tags: ['room', 'package'],
    },
    {
        ...projectData['E-commerce Integration for Room Packages'],
        name: 'Payment Gateway Integration',
        status: 'scheduled',
        details:
            'Integrating a secure payment gateway for booking transactions.',
        link: 'https://example.com/payment-gateway',
        dueAt: new Date(Date.now() + 1555200000).toISOString(), // due in 18 days
        tags: ['payment', 'gateway'],
    },
    {
        ...projectData['E-commerce Integration for Room Packages'],
        name: 'Testing E-commerce Checkout Flow',
        status: 'scheduled',
        details:
            'Testing the entire checkout flow from selecting a room package to completing the payment.',
        link: 'https://example.com/checkout-testing',
        dueAt: new Date(Date.now() + 1814400000).toISOString(), // due in 21 days
        tags: ['testing', 'checkout'],
    },
    {
        ...projectData['E-commerce Integration for Room Packages'],
        name: 'User Interface Design Review',
        status: 'scheduled',
        details:
            'Reviewing the UI design for the e-commerce booking flow to ensure a seamless user experience.',
        link: 'https://example.com/ui-review',
        dueAt: new Date(Date.now() + 2092800000).toISOString(), // due in 24 days
        tags: ['ui', 'review'],
    },
    {
        ...projectData['E-commerce Integration for Room Packages'],
        name: 'Client Review & Approval',
        status: 'completed',
        details:
            'Presenting the integration progress and gathering client feedback for any changes.',
        link: 'https://example.com/client-review',
        dueAt: new Date(Date.now() - 2592000000).toISOString(), // completed 30 days ago
        tags: ['review', 'approval'],
    },
    {
        ...projectData['E-commerce Integration for Room Packages'],
        name: 'Final Integration Testing',
        status: 'completed',
        details:
            'Performing final testing of the integrated e-commerce system with the hotel booking platform.',
        link: 'https://example.com/final-testing',
        dueAt: new Date(Date.now() - 3456000000).toISOString(), // completed 40 days ago
        tags: ['testing', 'final'],
    },
    {
        ...projectData['E-commerce Integration for Room Packages'],
        name: 'Project Closure & Handoff',
        status: 'cancelled',
        details:
            'Project closure due to unforeseen issues with the payment gateway integration.',
        link: 'https://example.com/closure',
        dueAt: new Date(Date.now() - 4320000000).toISOString(), // cancelled 50 days ago
        tags: ['closure', 'handoff'],
    },
];
const seedSocialMediaCampaignForSeasonalPromotionsData = (
    projectData: ProjectsData,
) => [
    {
        ...projectData['Social Media Campaign for Seasonal Promotions'],
        name: 'Campaign Kickoff Meeting',
        status: 'scheduled',
        details:
            'Initial meeting to discuss the seasonal promotion strategy and goals for the campaign.',
        link: 'https://example.com/meeting-link',
        dueAt: new Date(Date.now() + 86400000).toISOString(), // due in 1 day
        tags: ['meeting', 'kickoff'],
    },
    {
        ...projectData['Social Media Campaign for Seasonal Promotions'],
        name: 'Content Planning & Creation',
        status: 'scheduled',
        details:
            'Planning and creating content for social media posts, including graphics, copy, and videos.',
        link: 'https://example.com/content-planning',
        dueAt: new Date(Date.now() + 259200000).toISOString(), // due in 3 days
        tags: ['content', 'planning'],
    },
    {
        ...projectData['Social Media Campaign for Seasonal Promotions'],
        name: 'Social Media Ads Setup',
        status: 'scheduled',
        details:
            'Setting up targeted ads on platforms like Facebook, Instagram, and Twitter for seasonal promotions.',
        link: 'https://example.com/ads-setup',
        dueAt: new Date(Date.now() + 604800000).toISOString(), // due in 7 days
        tags: ['ads', 'setup'],
    },
    {
        ...projectData['Social Media Campaign for Seasonal Promotions'],
        name: 'Influencer Partnerships',
        status: 'scheduled',
        details:
            'Collaborating with influencers to promote the seasonal campaign through sponsored posts.',
        link: 'https://example.com/influencers',
        dueAt: new Date(Date.now() + 1209600000).toISOString(), // due in 14 days
        tags: ['influencers', 'partnership'],
    },
    {
        ...projectData['Social Media Campaign for Seasonal Promotions'],
        name: 'Email Campaign Launch',
        status: 'scheduled',
        details:
            'Launching an email marketing campaign targeting subscribers with exclusive seasonal offers.',
        link: 'https://example.com/email-campaign',
        dueAt: new Date(Date.now() + 1555200000).toISOString(), // due in 18 days
        tags: ['email', 'campaign'],
    },
    {
        ...projectData['Social Media Campaign for Seasonal Promotions'],
        name: 'Mid-Campaign Review',
        status: 'scheduled',
        details:
            'Reviewing the performance of the campaign so far, making adjustments as necessary.',
        link: 'https://example.com/mid-review',
        dueAt: new Date(Date.now() + 1814400000).toISOString(), // due in 21 days
        tags: ['review', 'mid-campaign'],
    },
    {
        ...projectData['Social Media Campaign for Seasonal Promotions'],
        name: 'Customer Engagement Analysis',
        status: 'scheduled',
        details:
            'Analyzing customer engagement and interaction with the social media posts and ads.',
        link: 'https://example.com/engagement-analysis',
        dueAt: new Date(Date.now() + 2092800000).toISOString(), // due in 24 days
        tags: ['engagement', 'analysis'],
    },
    {
        ...projectData['Social Media Campaign for Seasonal Promotions'],
        name: 'Client Feedback & Adjustments',
        status: 'completed',
        details:
            'Gathering feedback from the client and making adjustments based on their input.',
        link: 'https://example.com/client-feedback',
        dueAt: new Date(Date.now() - 2592000000).toISOString(), // completed 30 days ago
        tags: ['feedback', 'adjustments'],
    },
    {
        ...projectData['Social Media Campaign for Seasonal Promotions'],
        name: 'Final Campaign Report',
        status: 'completed',
        details:
            'Creating a final report summarizing the campaign results, including ROI and engagement metrics.',
        link: 'https://example.com/final-report',
        dueAt: new Date(Date.now() - 3456000000).toISOString(), // completed 40 days ago
        tags: ['report', 'final'],
    },
    {
        ...projectData['Social Media Campaign for Seasonal Promotions'],
        name: 'Project Wrap-Up & Handoff',
        status: 'cancelled',
        details:
            'Project was cancelled after issues arose with influencer partnerships that impacted the campaign.',
        link: 'https://example.com/project-wrapup',
        dueAt: new Date(Date.now() - 4320000000).toISOString(), // cancelled 50 days ago
        tags: ['wrap-up', 'handoff'],
    },
];
const seedInteriorDesignConceptForNewLobbyData = (
    projectData: ProjectsData,
) => [
    {
        ...projectData['Interior Design Concept for New Lobby'],
        name: 'Initial Design Brief',
        status: 'scheduled',
        details:
            'Meeting with the client to define the design style and functional requirements for the new lobby.',
        link: 'https://example.com/design-brief',
        dueAt: new Date(Date.now() + 86400000).toISOString(), // due in 1 day
        tags: ['meeting', 'design'],
    },
    {
        ...projectData['Interior Design Concept for New Lobby'],
        name: 'Moodboard & Concept Development',
        status: 'scheduled',
        details:
            'Creating moodboards and initial design concepts for the new lobby, focusing on ambiance and user experience.',
        link: 'https://example.com/moodboard-concept',
        dueAt: new Date(Date.now() + 259200000).toISOString(), // due in 3 days
        tags: ['concept', 'moodboard'],
    },
    {
        ...projectData['Interior Design Concept for New Lobby'],
        name: 'Materials & Finishes Selection',
        status: 'scheduled',
        details:
            'Selecting materials and finishes for flooring, furniture, and decor to align with the design concept.',
        link: 'https://example.com/materials-selection',
        dueAt: new Date(Date.now() + 604800000).toISOString(), // due in 7 days
        tags: ['materials', 'selection'],
    },
    {
        ...projectData['Interior Design Concept for New Lobby'],
        name: '3D Renderings Presentation',
        status: 'scheduled',
        details:
            'Presenting 3D renderings of the lobby design to the client for approval.',
        link: 'https://example.com/3d-rendering',
        dueAt: new Date(Date.now() + 1209600000).toISOString(), // due in 14 days
        tags: ['rendering', 'presentation'],
    },
    {
        ...projectData['Interior Design Concept for New Lobby'],
        name: 'Furniture Sourcing & Procurement',
        status: 'scheduled',
        details:
            'Sourcing furniture pieces and decor items for the new lobby, ensuring they align with the overall design.',
        link: 'https://example.com/furniture-sourcing',
        dueAt: new Date(Date.now() + 1555200000).toISOString(), // due in 18 days
        tags: ['furniture', 'procurement'],
    },
    {
        ...projectData['Interior Design Concept for New Lobby'],
        name: 'Lighting Design & Implementation',
        status: 'scheduled',
        details:
            'Designing and implementing the lighting plan for the new lobby to create the desired atmosphere.',
        link: 'https://example.com/lighting-design',
        dueAt: new Date(Date.now() + 1814400000).toISOString(), // due in 21 days
        tags: ['lighting', 'design'],
    },
    {
        ...projectData['Interior Design Concept for New Lobby'],
        name: 'Client Review & Feedback',
        status: 'scheduled',
        details:
            'Reviewing the design concept with the client and gathering feedback for any necessary adjustments.',
        link: 'https://example.com/client-review',
        dueAt: new Date(Date.now() + 2092800000).toISOString(), // due in 24 days
        tags: ['review', 'feedback'],
    },
    {
        ...projectData['Interior Design Concept for New Lobby'],
        name: 'Final Design Approval',
        status: 'completed',
        details:
            'Receiving final approval from the client on the interior design concept for the lobby.',
        link: 'https://example.com/final-approval',
        dueAt: new Date(Date.now() - 2592000000).toISOString(), // completed 30 days ago
        tags: ['approval', 'final'],
    },
    {
        ...projectData['Interior Design Concept for New Lobby'],
        name: 'Installation & Setup',
        status: 'completed',
        details:
            'Coordinating the installation of furniture, lighting, and decor to bring the design to life.',
        link: 'https://example.com/installation-setup',
        dueAt: new Date(Date.now() - 3456000000).toISOString(), // completed 40 days ago
        tags: ['installation', 'setup'],
    },
    {
        ...projectData['Interior Design Concept for New Lobby'],
        name: 'Project Handoff & Final Walkthrough',
        status: 'cancelled',
        details:
            'Project was cancelled due to unforeseen delays in furniture delivery.',
        link: 'https://example.com/project-handoff',
        dueAt: new Date(Date.now() - 4320000000).toISOString(), // cancelled 50 days ago
        tags: ['handoff', 'walkthrough'],
    },
];
const seedAnnualReportDesignForHotelPerformanceData = (
    projectData: ProjectsData,
) => [
    {
        ...projectData['Annual Report Design for Hotel Performance'],
        name: 'Initial Concept Meeting',
        status: 'scheduled',
        details:
            'Kickoff meeting to discuss the overall theme, data presentation style, and key elements for the annual report.',
        link: 'https://example.com/initial-concept',
        dueAt: new Date(Date.now() + 86400000).toISOString(), // due in 1 day
        tags: ['meeting', 'concept'],
    },
    {
        ...projectData['Annual Report Design for Hotel Performance'],
        name: 'Data Gathering & Analysis',
        status: 'scheduled',
        details:
            'Collecting and analyzing hotel performance data to be included in the report, such as occupancy rates, revenue, and guest satisfaction.',
        link: 'https://example.com/data-gathering',
        dueAt: new Date(Date.now() + 259200000).toISOString(), // due in 3 days
        tags: ['data', 'analysis'],
    },
    {
        ...projectData['Annual Report Design for Hotel Performance'],
        name: 'Layout & Design Draft',
        status: 'scheduled',
        details:
            'Creating the initial design layout for the report, including the structure of sections and data visualization elements.',
        link: 'https://example.com/layout-draft',
        dueAt: new Date(Date.now() + 604800000).toISOString(), // due in 7 days
        tags: ['design', 'layout'],
    },
    {
        ...projectData['Annual Report Design for Hotel Performance'],
        name: 'Graphics & Data Visualizations',
        status: 'scheduled',
        details:
            'Designing custom graphics and charts to represent key hotel performance metrics like revenue growth and guest satisfaction.',
        link: 'https://example.com/graphics-visualizations',
        dueAt: new Date(Date.now() + 1209600000).toISOString(), // due in 14 days
        tags: ['graphics', 'visualization'],
    },
    {
        ...projectData['Annual Report Design for Hotel Performance'],
        name: 'Client Review & Feedback',
        status: 'scheduled',
        details:
            'Presenting the draft of the report to the client for review and gathering feedback on the design and data.',
        link: 'https://example.com/client-review',
        dueAt: new Date(Date.now() + 1555200000).toISOString(), // due in 18 days
        tags: ['client', 'review'],
    },
    {
        ...projectData['Annual Report Design for Hotel Performance'],
        name: 'Revisions & Finalization',
        status: 'scheduled',
        details:
            'Making revisions based on client feedback and finalizing the design for print production.',
        link: 'https://example.com/revisions',
        dueAt: new Date(Date.now() + 1814400000).toISOString(), // due in 21 days
        tags: ['revisions', 'finalization'],
    },
    {
        ...projectData['Annual Report Design for Hotel Performance'],
        name: 'Final Report Approval',
        status: 'scheduled',
        details:
            'Getting final approval from the client for the completed annual report design.',
        link: 'https://example.com/final-approval',
        dueAt: new Date(Date.now() + 2092800000).toISOString(), // due in 24 days
        tags: ['approval', 'final'],
    },
    {
        ...projectData['Annual Report Design for Hotel Performance'],
        name: 'Print Preparation & Formatting',
        status: 'completed',
        details:
            'Preparing the report for printing, including setting up files in the appropriate print format.',
        link: 'https://example.com/print-prep',
        dueAt: new Date(Date.now() - 2592000000).toISOString(), // completed 30 days ago
        tags: ['print', 'formatting'],
    },
    {
        ...projectData['Annual Report Design for Hotel Performance'],
        name: 'Report Distribution & Client Handoff',
        status: 'completed',
        details:
            'Delivering the printed annual reports to the client and distributing digital copies.',
        link: 'https://example.com/distribution',
        dueAt: new Date(Date.now() - 3456000000).toISOString(), // completed 40 days ago
        tags: ['distribution', 'handoff'],
    },
    {
        ...projectData['Annual Report Design for Hotel Performance'],
        name: 'Post-Report Debrief',
        status: 'cancelled',
        details:
            'Project cancelled due to last-minute changes in the report structure that impacted delivery timelines.',
        link: 'https://example.com/post-report-debrief',
        dueAt: new Date(Date.now() - 4320000000).toISOString(), // cancelled 50 days ago
        tags: ['debrief', 'cancelled'],
    },
];
const seedCorporateBrandingForNewSubsidiaryData = (
    projectData: ProjectsData,
) => [
    {
        ...projectData['Corporate Branding for New Subsidiary'],
        name: 'Brand Strategy Kickoff',
        status: 'scheduled',
        details:
            'Kickoff meeting with the client to understand the goals, target audience, and vision for the new subsidiary branding.',
        link: 'https://example.com/brand-strategy',
        dueAt: new Date(Date.now() + 86400000).toISOString(), // due in 1 day
        tags: ['strategy', 'kickoff'],
    },
    {
        ...projectData['Corporate Branding for New Subsidiary'],
        name: 'Market Research & Competitor Analysis',
        status: 'scheduled',
        details:
            'Conducting market research and analyzing competitors to inform the branding direction and positioning for the subsidiary.',
        link: 'https://example.com/market-research',
        dueAt: new Date(Date.now() + 259200000).toISOString(), // due in 3 days
        tags: ['research', 'analysis'],
    },
    {
        ...projectData['Corporate Branding for New Subsidiary'],
        name: 'Logo Design Concepts',
        status: 'scheduled',
        details:
            'Designing initial logo concepts for the new subsidiary, focusing on modernity and alignment with the parent company’s branding.',
        link: 'https://example.com/logo-concepts',
        dueAt: new Date(Date.now() + 604800000).toISOString(), // due in 7 days
        tags: ['logo', 'design'],
    },
    {
        ...projectData['Corporate Branding for New Subsidiary'],
        name: 'Brand Color Palette & Typography',
        status: 'scheduled',
        details:
            'Selecting the brand color palette and typography that will reflect the subsidiary’s identity while maintaining consistency with the parent brand.',
        link: 'https://example.com/brand-color-typography',
        dueAt: new Date(Date.now() + 1209600000).toISOString(), // due in 14 days
        tags: ['color', 'typography'],
    },
    {
        ...projectData['Corporate Branding for New Subsidiary'],
        name: 'Brand Guidelines Document Draft',
        status: 'scheduled',
        details:
            'Creating the first draft of the brand guidelines document, covering logo usage, typography, and color palette.',
        link: 'https://example.com/brand-guidelines',
        dueAt: new Date(Date.now() + 1555200000).toISOString(), // due in 18 days
        tags: ['guidelines', 'document'],
    },
    {
        ...projectData['Corporate Branding for New Subsidiary'],
        name: 'Client Review & Feedback on Branding Concepts',
        status: 'scheduled',
        details:
            'Presenting the branding concepts to the client and gathering feedback to refine the visual identity.',
        link: 'https://example.com/client-review',
        dueAt: new Date(Date.now() + 1814400000).toISOString(), // due in 21 days
        tags: ['review', 'feedback'],
    },
    {
        ...projectData['Corporate Branding for New Subsidiary'],
        name: 'Revisions & Finalizing Logo',
        status: 'scheduled',
        details:
            'Making revisions based on client feedback and finalizing the logo design and other branding elements.',
        link: 'https://example.com/logo-revisions',
        dueAt: new Date(Date.now() + 2092800000).toISOString(), // due in 24 days
        tags: ['revisions', 'finalizing'],
    },
    {
        ...projectData['Corporate Branding for New Subsidiary'],
        name: 'Branding Collateral Design (Business Cards, Letterhead)',
        status: 'completed',
        details:
            'Designing branding collateral such as business cards, letterheads, and other stationary items.',
        link: 'https://example.com/collateral-design',
        dueAt: new Date(Date.now() - 2592000000).toISOString(), // completed 30 days ago
        tags: ['collateral', 'design'],
    },
    {
        ...projectData['Corporate Branding for New Subsidiary'],
        name: 'Brand Implementation Across Marketing Channels',
        status: 'completed',
        details:
            'Implementing the new branding across various marketing channels including website, social media, and print materials.',
        link: 'https://example.com/brand-implementation',
        dueAt: new Date(Date.now() - 3456000000).toISOString(), // completed 40 days ago
        tags: ['implementation', 'marketing'],
    },
    {
        ...projectData['Corporate Branding for New Subsidiary'],
        name: 'Post-Branding Review & Final Adjustments',
        status: 'cancelled',
        details:
            'Project cancelled due to last-minute strategic shift by the parent company.',
        link: 'https://example.com/post-branding-review',
        dueAt: new Date(Date.now() - 4320000000).toISOString(), // cancelled 50 days ago
        tags: ['review', 'cancelled'],
    },
];
const seedInvestorPresentationDesignForQuarterlyReportData = (
    projectData: ProjectsData,
) => [
    {
        ...projectData['Investor Presentation Design for Quarterly Report'],
        name: 'Kickoff Meeting with Finance Team',
        status: 'scheduled',
        details:
            'Initial meeting with the finance team to discuss key financial metrics, presentation format, and overall objectives for the investor presentation.',
        link: 'https://example.com/kickoff-meeting',
        dueAt: new Date(Date.now() + 86400000).toISOString(), // due in 1 day
        tags: ['kickoff', 'meeting'],
    },
    {
        ...projectData['Investor Presentation Design for Quarterly Report'],
        name: 'Financial Data Gathering & Review',
        status: 'scheduled',
        details:
            'Collecting the latest financial data, including revenue, profit margins, and key performance indicators (KPIs), for the quarterly report.',
        link: 'https://example.com/data-gathering',
        dueAt: new Date(Date.now() + 259200000).toISOString(), // due in 3 days
        tags: ['data', 'review'],
    },
    {
        ...projectData['Investor Presentation Design for Quarterly Report'],
        name: 'Presentation Design Concepts',
        status: 'scheduled',
        details:
            'Creating initial design concepts for the investor presentation, focusing on clear data visualization and engaging layout.',
        link: 'https://example.com/design-concepts',
        dueAt: new Date(Date.now() + 604800000).toISOString(), // due in 7 days
        tags: ['design', 'concepts'],
    },
    {
        ...projectData['Investor Presentation Design for Quarterly Report'],
        name: 'Data Visualization & Graphs',
        status: 'scheduled',
        details:
            'Designing graphs, charts, and other data visualizations to represent key financial metrics, trends, and performance data.',
        link: 'https://example.com/data-visualization',
        dueAt: new Date(Date.now() + 1209600000).toISOString(), // due in 14 days
        tags: ['visualization', 'graphs'],
    },
    {
        ...projectData['Investor Presentation Design for Quarterly Report'],
        name: 'Client Feedback on Initial Concepts',
        status: 'scheduled',
        details:
            'Presenting the initial design concepts to the client for feedback and making adjustments based on their input.',
        link: 'https://example.com/client-feedback',
        dueAt: new Date(Date.now() + 1555200000).toISOString(), // due in 18 days
        tags: ['feedback', 'client'],
    },
    {
        ...projectData['Investor Presentation Design for Quarterly Report'],
        name: 'Final Design Revisions',
        status: 'scheduled',
        details:
            'Making revisions to the design based on client feedback and ensuring alignment with the company’s branding guidelines.',
        link: 'https://example.com/final-revisions',
        dueAt: new Date(Date.now() + 1814400000).toISOString(), // due in 21 days
        tags: ['revisions', 'final'],
    },
    {
        ...projectData['Investor Presentation Design for Quarterly Report'],
        name: 'Proofreading & Content Review',
        status: 'scheduled',
        details:
            'Reviewing the content of the presentation to ensure clarity, accuracy, and consistency in messaging.',
        link: 'https://example.com/proofreading',
        dueAt: new Date(Date.now() + 2092800000).toISOString(), // due in 24 days
        tags: ['proofreading', 'review'],
    },
    {
        ...projectData['Investor Presentation Design for Quarterly Report'],
        name: 'Final Client Approval',
        status: 'completed',
        details:
            'Getting the final approval from the client on the completed investor presentation design.',
        link: 'https://example.com/final-approval',
        dueAt: new Date(Date.now() - 2592000000).toISOString(), // completed 30 days ago
        tags: ['approval', 'final'],
    },
    {
        ...projectData['Investor Presentation Design for Quarterly Report'],
        name: 'Investor Presentation Delivery',
        status: 'completed',
        details:
            'Delivering the finalized presentation to the client for the investor meeting, ensuring all materials are ready for presentation.',
        link: 'https://example.com/presentation-delivery',
        dueAt: new Date(Date.now() - 3456000000).toISOString(), // completed 40 days ago
        tags: ['delivery', 'presentation'],
    },
    {
        ...projectData['Investor Presentation Design for Quarterly Report'],
        name: 'Post-Presentation Review & Adjustments',
        status: 'cancelled',
        details:
            'Cancelled due to changes in the presentation’s timing and focus, requiring a different direction for the content.',
        link: 'https://example.com/post-presentation-review',
        dueAt: new Date(Date.now() - 4320000000).toISOString(), // cancelled 50 days ago
        tags: ['review', 'cancelled'],
    },
];
const seedMarketResearchInfographicsForNewProductLaunchData = (
    projectData: ProjectsData,
) => [
    {
        ...projectData['Market Research Infographics for New Product Launch'],
        name: 'Kickoff Meeting with Marketing Team',
        status: 'scheduled',
        details:
            'Initial meeting to discuss market research goals, target demographics, and key data points for infographics.',
        link: 'https://example.com/kickoff-meeting',
        dueAt: new Date(Date.now() + 86400000).toISOString(), // due in 1 day
        tags: ['kickoff', 'meeting'],
    },
    {
        ...projectData['Market Research Infographics for New Product Launch'],
        name: 'Competitor Analysis Research',
        status: 'scheduled',
        details:
            'Conducting in-depth research on competitor products and market positioning to gather insights for the infographic.',
        link: 'https://example.com/competitor-analysis',
        dueAt: new Date(Date.now() + 259200000).toISOString(), // due in 3 days
        tags: ['research', 'competitor'],
    },
    {
        ...projectData['Market Research Infographics for New Product Launch'],
        name: 'Survey and Data Collection',
        status: 'scheduled',
        details:
            'Running surveys to gather customer preferences, feedback, and key data points for the new product launch infographic.',
        link: 'https://example.com/survey-data',
        dueAt: new Date(Date.now() + 604800000).toISOString(), // due in 7 days
        tags: ['survey', 'data'],
    },
    {
        ...projectData['Market Research Infographics for New Product Launch'],
        name: 'Initial Infographic Concepts',
        status: 'scheduled',
        details:
            'Creating initial design concepts for the infographics that will showcase the market research findings.',
        link: 'https://example.com/infographic-concepts',
        dueAt: new Date(Date.now() + 1209600000).toISOString(), // due in 14 days
        tags: ['concepts', 'infographics'],
    },
    {
        ...projectData['Market Research Infographics for New Product Launch'],
        name: 'Client Review of Infographic Concepts',
        status: 'scheduled',
        details:
            'Presenting the first draft of infographic concepts to the client for review and feedback.',
        link: 'https://example.com/client-review',
        dueAt: new Date(Date.now() + 1555200000).toISOString(), // due in 18 days
        tags: ['review', 'client'],
    },
    {
        ...projectData['Market Research Infographics for New Product Launch'],
        name: 'Finalizing Infographic Design',
        status: 'scheduled',
        details:
            'Refining the selected infographic design based on client feedback and ensuring all data is clearly represented.',
        link: 'https://example.com/finalizing-design',
        dueAt: new Date(Date.now() + 1814400000).toISOString(), // due in 21 days
        tags: ['finalizing', 'design'],
    },
    {
        ...projectData['Market Research Infographics for New Product Launch'],
        name: 'Preparing Data Visualizations',
        status: 'scheduled',
        details:
            'Creating charts, graphs, and other visual elements that will be used in the infographic to represent key data points.',
        link: 'https://example.com/data-visualizations',
        dueAt: new Date(Date.now() + 2092800000).toISOString(), // due in 24 days
        tags: ['visualizations', 'data'],
    },
    {
        ...projectData['Market Research Infographics for New Product Launch'],
        name: 'Client Approval of Final Infographic',
        status: 'completed',
        details:
            'Client has approved the final version of the infographic, ready for distribution and use in the product launch.',
        link: 'https://example.com/final-approval',
        dueAt: new Date(Date.now() - 2592000000).toISOString(), // completed 30 days ago
        tags: ['approval', 'final'],
    },
    {
        ...projectData['Market Research Infographics for New Product Launch'],
        name: 'Infographic Distribution and Launch',
        status: 'completed',
        details:
            'Infographics are distributed across various marketing channels to promote the new product launch.',
        link: 'https://example.com/infographic-distribution',
        dueAt: new Date(Date.now() - 3456000000).toISOString(), // completed 40 days ago
        tags: ['distribution', 'launch'],
    },
    {
        ...projectData['Market Research Infographics for New Product Launch'],
        name: 'Post-Launch Analysis',
        status: 'cancelled',
        details:
            'Cancelled due to shifting focus to other marketing strategies, as post-launch metrics didn’t require infographic analysis.',
        link: 'https://example.com/post-launch-analysis',
        dueAt: new Date(Date.now() - 4320000000).toISOString(), // cancelled 50 days ago
        tags: ['post-launch', 'cancelled'],
    },
];
const seedPackagingDesignForConsumerElectronicsLineData = (
    projectData: ProjectsData,
) => [
    {
        ...projectData['Packaging Design for Consumer Electronics Line'],
        name: 'Initial Concept Development',
        status: 'scheduled',
        details:
            'Brainstorming initial packaging design concepts that align with the brand and appeal to the target audience.',
        link: 'https://example.com/initial-concept',
        dueAt: new Date(Date.now() + 86400000).toISOString(), // due in 1 day
        tags: ['concept', 'development'],
    },
    {
        ...projectData['Packaging Design for Consumer Electronics Line'],
        name: 'Client Meeting for Concept Review',
        status: 'scheduled',
        details:
            'Meeting with the client to review the initial packaging concepts and gather feedback for revisions.',
        link: 'https://example.com/client-meeting',
        dueAt: new Date(Date.now() + 259200000).toISOString(), // due in 3 days
        tags: ['meeting', 'review'],
    },
    {
        ...projectData['Packaging Design for Consumer Electronics Line'],
        name: 'Refining Packaging Design',
        status: 'scheduled',
        details:
            'Refining the chosen design concept, focusing on the aesthetics, usability, and functionality of the packaging.',
        link: 'https://example.com/refining-design',
        dueAt: new Date(Date.now() + 604800000).toISOString(), // due in 7 days
        tags: ['refining', 'design'],
    },
    {
        ...projectData['Packaging Design for Consumer Electronics Line'],
        name: 'Prototyping Packaging Design',
        status: 'scheduled',
        details:
            'Creating a prototype of the packaging to test the structural integrity and usability of the design.',
        link: 'https://example.com/prototype',
        dueAt: new Date(Date.now() + 1209600000).toISOString(), // due in 14 days
        tags: ['prototype', 'testing'],
    },
    {
        ...projectData['Packaging Design for Consumer Electronics Line'],
        name: 'Material Selection for Packaging',
        status: 'scheduled',
        details:
            'Selecting materials for the packaging, ensuring sustainability, cost-effectiveness, and durability.',
        link: 'https://example.com/material-selection',
        dueAt: new Date(Date.now() + 1555200000).toISOString(), // due in 18 days
        tags: ['material', 'selection'],
    },
    {
        ...projectData['Packaging Design for Consumer Electronics Line'],
        name: 'Client Feedback on Packaging Prototype',
        status: 'scheduled',
        details:
            'Presenting the packaging prototype to the client for feedback and adjustments before final approval.',
        link: 'https://example.com/client-feedback',
        dueAt: new Date(Date.now() + 1814400000).toISOString(), // due in 21 days
        tags: ['feedback', 'prototype'],
    },
    {
        ...projectData['Packaging Design for Consumer Electronics Line'],
        name: 'Final Packaging Design Approval',
        status: 'scheduled',
        details:
            'Getting final approval on the packaging design from the client before moving forward with production.',
        link: 'https://example.com/final-approval',
        dueAt: new Date(Date.now() + 2092800000).toISOString(), // due in 24 days
        tags: ['approval', 'final'],
    },
    {
        ...projectData['Packaging Design for Consumer Electronics Line'],
        name: 'Production of Packaging Materials',
        status: 'completed',
        details:
            'Starting the production of the packaging materials based on the finalized design and approved materials.',
        link: 'https://example.com/production',
        dueAt: new Date(Date.now() - 2592000000).toISOString(), // completed 30 days ago
        tags: ['production', 'materials'],
    },
    {
        ...projectData['Packaging Design for Consumer Electronics Line'],
        name: 'Packaging Quality Control',
        status: 'completed',
        details:
            'Conducting quality control checks to ensure that the packaging meets design specifications and durability standards.',
        link: 'https://example.com/quality-control',
        dueAt: new Date(Date.now() - 3456000000).toISOString(), // completed 40 days ago
        tags: ['quality', 'control'],
    },
    {
        ...projectData['Packaging Design for Consumer Electronics Line'],
        name: 'Packaging Distribution and Shipping',
        status: 'cancelled',
        details:
            'Cancelled due to changes in distribution timelines, requiring redesign of packaging for new shipping methods.',
        link: 'https://example.com/shipping',
        dueAt: new Date(Date.now() - 4320000000).toISOString(), // cancelled 50 days ago
        tags: ['distribution', 'cancelled'],
    },
];
const seedCorporateEventBrandingForAnnualConferenceData = (
    projectData: ProjectsData,
) => [
    {
        ...projectData['Corporate Event Branding for Annual Conference'],
        name: 'Initial Branding Concept Meeting',
        status: 'scheduled',
        details:
            'Kickoff meeting to discuss branding direction, design goals, and conference themes for the annual event.',
        link: 'https://example.com/branding-concept',
        dueAt: new Date(Date.now() + 86400000).toISOString(), // due in 1 day
        tags: ['branding', 'meeting'],
    },
    {
        ...projectData['Corporate Event Branding for Annual Conference'],
        name: 'Design Moodboard Creation',
        status: 'scheduled',
        details:
            'Creating moodboards to visualize the event’s branding direction, including color schemes, typography, and imagery.',
        link: 'https://example.com/moodboard',
        dueAt: new Date(Date.now() + 259200000).toISOString(), // due in 3 days
        tags: ['moodboard', 'design'],
    },
    {
        ...projectData['Corporate Event Branding for Annual Conference'],
        name: 'Client Review of Branding Concepts',
        status: 'scheduled',
        details:
            'Presenting the initial branding concepts to the client for feedback and refinement.',
        link: 'https://example.com/branding-review',
        dueAt: new Date(Date.now() + 604800000).toISOString(), // due in 7 days
        tags: ['review', 'client'],
    },
    {
        ...projectData['Corporate Event Branding for Annual Conference'],
        name: 'Logo and Visual Identity Refinement',
        status: 'scheduled',
        details:
            'Refining the logo and visual identity elements to match the conference theme and client feedback.',
        link: 'https://example.com/logo-refinement',
        dueAt: new Date(Date.now() + 1209600000).toISOString(), // due in 14 days
        tags: ['logo', 'refinement'],
    },
    {
        ...projectData['Corporate Event Branding for Annual Conference'],
        name: 'Designing Event Collateral',
        status: 'scheduled',
        details:
            'Designing event materials such as banners, brochures, and signage that reflect the conference’s branding.',
        link: 'https://example.com/event-collateral',
        dueAt: new Date(Date.now() + 1555200000).toISOString(), // due in 18 days
        tags: ['design', 'collateral'],
    },
    {
        ...projectData['Corporate Event Branding for Annual Conference'],
        name: 'Client Approval of Event Collateral',
        status: 'scheduled',
        details:
            'Client review and approval of event collateral designs before proceeding to production.',
        link: 'https://example.com/collateral-approval',
        dueAt: new Date(Date.now() + 1814400000).toISOString(), // due in 21 days
        tags: ['client', 'approval'],
    },
    {
        ...projectData['Corporate Event Branding for Annual Conference'],
        name: 'Printing and Production of Event Materials',
        status: 'scheduled',
        details:
            'Production of event materials, including signage, handouts, and printed agendas.',
        link: 'https://example.com/printing-production',
        dueAt: new Date(Date.now() + 2092800000).toISOString(), // due in 24 days
        tags: ['printing', 'production'],
    },
    {
        ...projectData['Corporate Event Branding for Annual Conference'],
        name: 'Final Event Branding Check',
        status: 'completed',
        details:
            'Final review and check of all event branding materials to ensure everything meets the client’s expectations.',
        link: 'https://example.com/final-check',
        dueAt: new Date(Date.now() - 2592000000).toISOString(), // completed 30 days ago
        tags: ['final', 'check'],
    },
    {
        ...projectData['Corporate Event Branding for Annual Conference'],
        name: 'Event Day Branding Setup',
        status: 'completed',
        details:
            'Setting up all event branding materials on-site, including signage, stages, and branded booths.',
        link: 'https://example.com/event-day-setup',
        dueAt: new Date(Date.now() - 3456000000).toISOString(), // completed 40 days ago
        tags: ['setup', 'event'],
    },
    {
        ...projectData['Corporate Event Branding for Annual Conference'],
        name: 'Post-Event Branding Assessment',
        status: 'cancelled',
        details:
            'Cancelled due to the client shifting focus to other post-event analysis, as branding impact assessment was not necessary.',
        link: 'https://example.com/post-event-assessment',
        dueAt: new Date(Date.now() - 4320000000).toISOString(), // cancelled 50 days ago
        tags: ['assessment', 'cancelled'],
    },
];
const seedAdvertisingCampaignForNewRetailProductLineData = (
    projectData: ProjectsData,
) => [
    {
        ...projectData['Advertising Campaign for New Retail Product Line'],
        name: 'Initial Campaign Briefing',
        status: 'scheduled',
        details:
            'Kickoff meeting to define the campaign objectives, target audience, and key messaging for the product line.',
        link: 'https://example.com/campaign-briefing',
        dueAt: new Date(Date.now() + 86400000).toISOString(), // due in 1 day
        tags: ['kickoff', 'meeting'],
    },
    {
        ...projectData['Advertising Campaign for New Retail Product Line'],
        name: 'Market Research and Consumer Insights',
        status: 'scheduled',
        details:
            'Conducting market research to identify customer preferences, behaviors, and trends relevant to the new product line.',
        link: 'https://example.com/market-research',
        dueAt: new Date(Date.now() + 259200000).toISOString(), // due in 3 days
        tags: ['research', 'consumer'],
    },
    {
        ...projectData['Advertising Campaign for New Retail Product Line'],
        name: 'Creative Concept Development',
        status: 'scheduled',
        details:
            'Brainstorming and developing creative concepts for the advertising campaign, including visuals and messaging.',
        link: 'https://example.com/creative-concepts',
        dueAt: new Date(Date.now() + 604800000).toISOString(), // due in 7 days
        tags: ['creative', 'concepts'],
    },
    {
        ...projectData['Advertising Campaign for New Retail Product Line'],
        name: 'Client Review of Creative Concepts',
        status: 'scheduled',
        details:
            'Presenting the creative concepts to the client for feedback and approval before moving forward.',
        link: 'https://example.com/client-review',
        dueAt: new Date(Date.now() + 1209600000).toISOString(), // due in 14 days
        tags: ['review', 'client'],
    },
    {
        ...projectData['Advertising Campaign for New Retail Product Line'],
        name: 'Media Plan and Advertising Strategy',
        status: 'scheduled',
        details:
            'Developing a media plan and advertising strategy, including selecting channels, platforms, and advertising formats.',
        link: 'https://example.com/media-plan',
        dueAt: new Date(Date.now() + 1555200000).toISOString(), // due in 18 days
        tags: ['media', 'strategy'],
    },
    {
        ...projectData['Advertising Campaign for New Retail Product Line'],
        name: 'Campaign Asset Production',
        status: 'scheduled',
        details:
            'Creating all necessary campaign assets, such as videos, banners, social media ads, and print materials.',
        link: 'https://example.com/campaign-assets',
        dueAt: new Date(Date.now() + 1814400000).toISOString(), // due in 21 days
        tags: ['production', 'assets'],
    },
    {
        ...projectData['Advertising Campaign for New Retail Product Line'],
        name: 'Client Approval of Campaign Assets',
        status: 'scheduled',
        details:
            'Presenting the final campaign assets to the client for approval before launching the campaign.',
        link: 'https://example.com/campaign-approval',
        dueAt: new Date(Date.now() + 2092800000).toISOString(), // due in 24 days
        tags: ['client', 'approval'],
    },
    {
        ...projectData['Advertising Campaign for New Retail Product Line'],
        name: 'Campaign Launch',
        status: 'completed',
        details:
            'Launching the advertising campaign across selected channels, including digital platforms, TV, and print media.',
        link: 'https://example.com/campaign-launch',
        dueAt: new Date(Date.now() - 2592000000).toISOString(), // completed 30 days ago
        tags: ['launch', 'campaign'],
    },
    {
        ...projectData['Advertising Campaign for New Retail Product Line'],
        name: 'Mid-Campaign Performance Review',
        status: 'completed',
        details:
            'Reviewing the campaign performance mid-way through to assess effectiveness and make adjustments if needed.',
        link: 'https://example.com/mid-campaign-review',
        dueAt: new Date(Date.now() - 3456000000).toISOString(), // completed 40 days ago
        tags: ['performance', 'review'],
    },
    {
        ...projectData['Advertising Campaign for New Retail Product Line'],
        name: 'Post-Campaign Analysis and Reporting',
        status: 'cancelled',
        details:
            'Cancelled due to the client opting for a different approach for post-campaign analysis.',
        link: 'https://example.com/post-campaign-report',
        dueAt: new Date(Date.now() - 4320000000).toISOString(), // cancelled 50 days ago
        tags: ['post-campaign', 'cancelled'],
    },
];
const seedBrandIdentityRedesignForLawFirmData = (projectData: ProjectsData) => [
    {
        ...projectData['Brand Identity Redesign for Law Firm'],
        name: 'Initial Branding Consultation',
        status: 'scheduled',
        details:
            'Kickoff meeting to understand the law firm’s brand values, goals, and vision for the redesign.',
        link: 'https://example.com/branding-consultation',
        dueAt: new Date(Date.now() + 86400000).toISOString(), // due in 1 day
        tags: ['consultation', 'meeting'],
    },
    {
        ...projectData['Brand Identity Redesign for Law Firm'],
        name: 'Brand Research and Competitor Analysis',
        status: 'scheduled',
        details:
            'Conducting research on the legal industry and analyzing competitor branding to inform the redesign.',
        link: 'https://example.com/brand-research',
        dueAt: new Date(Date.now() + 259200000).toISOString(), // due in 3 days
        tags: ['research', 'analysis'],
    },
    {
        ...projectData['Brand Identity Redesign for Law Firm'],
        name: 'Creative Direction and Concept Development',
        status: 'scheduled',
        details:
            'Developing creative direction for the new brand identity, including visual style, tone, and design elements.',
        link: 'https://example.com/creative-direction',
        dueAt: new Date(Date.now() + 604800000).toISOString(), // due in 7 days
        tags: ['creative', 'concepts'],
    },
    {
        ...projectData['Brand Identity Redesign for Law Firm'],
        name: 'Client Review of Initial Concepts',
        status: 'scheduled',
        details:
            'Presenting initial brand concepts to the client for feedback and refinement.',
        link: 'https://example.com/client-review',
        dueAt: new Date(Date.now() + 1209600000).toISOString(), // due in 14 days
        tags: ['review', 'client'],
    },
    {
        ...projectData['Brand Identity Redesign for Law Firm'],
        name: 'Logo Design Refinement',
        status: 'scheduled',
        details:
            'Refining the law firm’s logo design based on client feedback and branding guidelines.',
        link: 'https://example.com/logo-refinement',
        dueAt: new Date(Date.now() + 1555200000).toISOString(), // due in 18 days
        tags: ['logo', 'refinement'],
    },
    {
        ...projectData['Brand Identity Redesign for Law Firm'],
        name: 'Brand Style Guide Creation',
        status: 'scheduled',
        details:
            'Developing a comprehensive style guide for the new brand, including logo usage, color palette, typography, and brand tone.',
        link: 'https://example.com/style-guide',
        dueAt: new Date(Date.now() + 1814400000).toISOString(), // due in 21 days
        tags: ['style-guide', 'branding'],
    },
    {
        ...projectData['Brand Identity Redesign for Law Firm'],
        name: 'Client Approval of Style Guide',
        status: 'scheduled',
        details:
            'Reviewing and getting approval from the client for the finalized brand style guide.',
        link: 'https://example.com/style-guide-approval',
        dueAt: new Date(Date.now() + 2092800000).toISOString(), // due in 24 days
        tags: ['approval', 'client'],
    },
    {
        ...projectData['Brand Identity Redesign for Law Firm'],
        name: 'Brand Asset Production',
        status: 'scheduled',
        details:
            'Creating all necessary brand assets, including business cards, letterheads, and other marketing materials.',
        link: 'https://example.com/brand-assets',
        dueAt: new Date(Date.now() + 2592000000).toISOString(), // due in 30 days
        tags: ['assets', 'production'],
    },
    {
        ...projectData['Brand Identity Redesign for Law Firm'],
        name: 'Brand Launch Event Planning',
        status: 'completed',
        details:
            'Planning and coordinating the brand launch event, including the reveal of the new identity to stakeholders and clients.',
        link: 'https://example.com/launch-event',
        dueAt: new Date(Date.now() - 2592000000).toISOString(), // completed 30 days ago
        tags: ['launch', 'event'],
    },
    {
        ...projectData['Brand Identity Redesign for Law Firm'],
        name: 'Post-Launch Performance Review',
        status: 'cancelled',
        details:
            'Cancelled due to the client opting for a different post-launch strategy for reviewing brand effectiveness.',
        link: 'https://example.com/post-launch-review',
        dueAt: new Date(Date.now() - 3456000000).toISOString(), // cancelled 40 days ago
        tags: ['post-launch', 'cancelled'],
    },
];
const seedLegalDocumentTemplatesForCorporateClientsData = (
    projectData: ProjectsData,
) => [
    {
        ...projectData['Legal Document Templates for Corporate Clients'],
        name: 'Initial Requirements Gathering',
        status: 'scheduled',
        details:
            'Kickoff meeting to gather client requirements for the legal document templates, including preferred structure, style, and content.',
        link: 'https://example.com/requirements-gathering',
        dueAt: new Date(Date.now() + 86400000).toISOString(), // due in 1 day
        tags: ['kickoff', 'meeting'],
    },
    {
        ...projectData['Legal Document Templates for Corporate Clients'],
        name: 'Legal Template Structure Design',
        status: 'scheduled',
        details:
            'Designing the structure for the legal document templates, ensuring they meet industry standards and client needs.',
        link: 'https://example.com/template-structure',
        dueAt: new Date(Date.now() + 259200000).toISOString(), // due in 3 days
        tags: ['design', 'structure'],
    },
    {
        ...projectData['Legal Document Templates for Corporate Clients'],
        name: 'Legal Content Drafting',
        status: 'scheduled',
        details:
            'Drafting the legal content for various templates, including contracts, NDAs, and terms of service.',
        link: 'https://example.com/legal-content',
        dueAt: new Date(Date.now() + 604800000).toISOString(), // due in 7 days
        tags: ['drafting', 'legal'],
    },
    {
        ...projectData['Legal Document Templates for Corporate Clients'],
        name: 'Client Review of Initial Drafts',
        status: 'scheduled',
        details:
            'Presenting the first drafts of the legal document templates to the client for feedback and revisions.',
        link: 'https://example.com/client-review',
        dueAt: new Date(Date.now() + 1209600000).toISOString(), // due in 14 days
        tags: ['review', 'client'],
    },
    {
        ...projectData['Legal Document Templates for Corporate Clients'],
        name: 'Template Refinement and Adjustments',
        status: 'scheduled',
        details:
            'Refining the legal document templates based on client feedback, ensuring compliance and clarity.',
        link: 'https://example.com/template-refinement',
        dueAt: new Date(Date.now() + 1555200000).toISOString(), // due in 18 days
        tags: ['refinement', 'adjustments'],
    },
    {
        ...projectData['Legal Document Templates for Corporate Clients'],
        name: 'Template Formatting and Finalization',
        status: 'scheduled',
        details:
            'Finalizing the formatting of the legal templates, ensuring consistency and readability across all documents.',
        link: 'https://example.com/template-formatting',
        dueAt: new Date(Date.now() + 1814400000).toISOString(), // due in 21 days
        tags: ['formatting', 'finalization'],
    },
    {
        ...projectData['Legal Document Templates for Corporate Clients'],
        name: 'Client Approval of Final Templates',
        status: 'scheduled',
        details:
            'Reviewing and obtaining client approval for the finalized legal document templates.',
        link: 'https://example.com/client-approval',
        dueAt: new Date(Date.now() + 2092800000).toISOString(), // due in 24 days
        tags: ['approval', 'client'],
    },
    {
        ...projectData['Legal Document Templates for Corporate Clients'],
        name: 'Template Delivery and Handover',
        status: 'completed',
        details:
            'Delivering the final legal document templates to the client and providing necessary training or guidance on usage.',
        link: 'https://example.com/template-delivery',
        dueAt: new Date(Date.now() - 2592000000).toISOString(), // completed 30 days ago
        tags: ['delivery', 'handover'],
    },
    {
        ...projectData['Legal Document Templates for Corporate Clients'],
        name: 'Post-Delivery Client Support',
        status: 'completed',
        details:
            'Providing client support and adjustments following the delivery of the legal document templates.',
        link: 'https://example.com/post-delivery-support',
        dueAt: new Date(Date.now() - 3456000000).toISOString(), // completed 40 days ago
        tags: ['support', 'client'],
    },
    {
        ...projectData['Legal Document Templates for Corporate Clients'],
        name: 'Post-Delivery Template Review and Updates',
        status: 'cancelled',
        details:
            'Cancelled due to client not requiring any post-delivery updates or revisions for the templates.',
        link: 'https://example.com/post-delivery-review',
        dueAt: new Date(Date.now() - 4320000000).toISOString(), // cancelled 50 days ago
        tags: ['review', 'cancelled'],
    },
];
const seedClientOnboardingGuideDesignData = (projectData: ProjectsData) => [
    {
        ...projectData['Client Onboarding Guide Design'],
        name: 'Initial Kickoff Meeting',
        status: 'scheduled',
        details:
            'Kickoff meeting to understand client expectations and gather necessary information for the onboarding guide.',
        link: 'https://example.com/kickoff-meeting',
        dueAt: new Date(Date.now() + 86400000).toISOString(), // due in 1 day
        tags: ['kickoff', 'meeting'],
    },
    {
        ...projectData['Client Onboarding Guide Design'],
        name: 'Content Outline and Structure Planning',
        status: 'scheduled',
        details:
            'Planning the outline and structure for the onboarding guide, including sections for introduction, instructions, and best practices.',
        link: 'https://example.com/outline-structure',
        dueAt: new Date(Date.now() + 259200000).toISOString(), // due in 3 days
        tags: ['planning', 'structure'],
    },
    {
        ...projectData['Client Onboarding Guide Design'],
        name: 'Design Mockups Creation',
        status: 'scheduled',
        details:
            'Creating design mockups for the onboarding guide, including layout, typography, and visual elements.',
        link: 'https://example.com/design-mockups',
        dueAt: new Date(Date.now() + 604800000).toISOString(), // due in 7 days
        tags: ['design', 'mockups'],
    },
    {
        ...projectData['Client Onboarding Guide Design'],
        name: 'Client Review of Initial Mockups',
        status: 'scheduled',
        details:
            'Presenting the design mockups to the client for feedback and revisions.',
        link: 'https://example.com/client-review',
        dueAt: new Date(Date.now() + 1209600000).toISOString(), // due in 14 days
        tags: ['review', 'client'],
    },
    {
        ...projectData['Client Onboarding Guide Design'],
        name: 'Onboarding Guide Content Writing',
        status: 'scheduled',
        details:
            'Writing the content for each section of the onboarding guide, including step-by-step instructions and helpful tips.',
        link: 'https://example.com/content-writing',
        dueAt: new Date(Date.now() + 1555200000).toISOString(), // due in 18 days
        tags: ['content', 'writing'],
    },
    {
        ...projectData['Client Onboarding Guide Design'],
        name: 'Final Design Adjustments',
        status: 'scheduled',
        details:
            'Making final design tweaks based on client feedback, ensuring all content fits within the design and is visually appealing.',
        link: 'https://example.com/final-adjustments',
        dueAt: new Date(Date.now() + 1814400000).toISOString(), // due in 21 days
        tags: ['final', 'adjustments'],
    },
    {
        ...projectData['Client Onboarding Guide Design'],
        name: 'Client Approval of Final Design',
        status: 'scheduled',
        details:
            'Reviewing the final onboarding guide with the client and obtaining approval to move forward with production.',
        link: 'https://example.com/final-approval',
        dueAt: new Date(Date.now() + 2092800000).toISOString(), // due in 24 days
        tags: ['approval', 'client'],
    },
    {
        ...projectData['Client Onboarding Guide Design'],
        name: 'Onboarding Guide Production',
        status: 'completed',
        details:
            'Producing the final onboarding guide in PDF and online format, ready for distribution.',
        link: 'https://example.com/production',
        dueAt: new Date(Date.now() - 2592000000).toISOString(), // completed 30 days ago
        tags: ['production', 'final'],
    },
    {
        ...projectData['Client Onboarding Guide Design'],
        name: 'Onboarding Guide Distribution',
        status: 'completed',
        details:
            'Distributing the finalized onboarding guide to new clients and ensuring that it is available on the company website.',
        link: 'https://example.com/distribution',
        dueAt: new Date(Date.now() - 3456000000).toISOString(), // completed 40 days ago
        tags: ['distribution', 'website'],
    },
    {
        ...projectData['Client Onboarding Guide Design'],
        name: 'Post-Launch Client Feedback',
        status: 'cancelled',
        details:
            'Cancelled due to the client opting for another method of collecting feedback post-launch.',
        link: 'https://example.com/post-launch-feedback',
        dueAt: new Date(Date.now() - 4320000000).toISOString(), // cancelled 50 days ago
        tags: ['feedback', 'cancelled'],
    },
];
const seedBrochureDesignForFamilyLawServicesData = (
    projectData: ProjectsData,
) => [
    {
        ...projectData['Brochure Design for Family Law Services'],
        name: 'Initial Discovery Meeting',
        status: 'scheduled',
        details:
            'Kickoff meeting to discuss the vision, target audience, and key messaging for the family law brochure.',
        link: 'https://example.com/discovery-meeting',
        dueAt: new Date(Date.now() + 86400000).toISOString(), // due in 1 day
        tags: ['kickoff', 'meeting'],
    },
    {
        ...projectData['Brochure Design for Family Law Services'],
        name: 'Content Gathering and Strategy',
        status: 'scheduled',
        details:
            'Gathering necessary content, including client testimonials, legal service offerings, and family law tips.',
        link: 'https://example.com/content-gathering',
        dueAt: new Date(Date.now() + 259200000).toISOString(), // due in 3 days
        tags: ['content', 'strategy'],
    },
    {
        ...projectData['Brochure Design for Family Law Services'],
        name: 'Initial Design Mockups Creation',
        status: 'scheduled',
        details:
            'Creating the first set of design mockups, including layout, typography, and color schemes suitable for a family law audience.',
        link: 'https://example.com/design-mockups',
        dueAt: new Date(Date.now() + 604800000).toISOString(), // due in 7 days
        tags: ['design', 'mockups'],
    },
    {
        ...projectData['Brochure Design for Family Law Services'],
        name: 'Client Review of Initial Design',
        status: 'scheduled',
        details:
            'Presenting the initial brochure design mockups to the client for feedback and revisions.',
        link: 'https://example.com/client-review',
        dueAt: new Date(Date.now() + 1209600000).toISOString(), // due in 14 days
        tags: ['review', 'client'],
    },
    {
        ...projectData['Brochure Design for Family Law Services'],
        name: 'Refining Design Based on Client Feedback',
        status: 'scheduled',
        details:
            'Refining the brochure design based on client feedback to ensure alignment with brand values and target audience.',
        link: 'https://example.com/refining-design',
        dueAt: new Date(Date.now() + 1555200000).toISOString(), // due in 18 days
        tags: ['refinement', 'feedback'],
    },
    {
        ...projectData['Brochure Design for Family Law Services'],
        name: 'Final Design Adjustments and Copywriting',
        status: 'scheduled',
        details:
            'Finalizing the brochure design and writing the copy, ensuring clarity, readability, and compliance with legal regulations.',
        link: 'https://example.com/final-adjustments',
        dueAt: new Date(Date.now() + 1814400000).toISOString(), // due in 21 days
        tags: ['final', 'copywriting'],
    },
    {
        ...projectData['Brochure Design for Family Law Services'],
        name: 'Client Approval of Final Brochure Design',
        status: 'scheduled',
        details:
            'Obtaining final approval from the client on the completed brochure design before moving to production.',
        link: 'https://example.com/final-approval',
        dueAt: new Date(Date.now() + 2092800000).toISOString(), // due in 24 days
        tags: ['approval', 'client'],
    },
    {
        ...projectData['Brochure Design for Family Law Services'],
        name: 'Brochure Printing and Production',
        status: 'completed',
        details:
            'Final printing and production of the brochure, ensuring high-quality materials and consistent brand messaging.',
        link: 'https://example.com/printing-production',
        dueAt: new Date(Date.now() - 2592000000).toISOString(), // completed 30 days ago
        tags: ['printing', 'production'],
    },
    {
        ...projectData['Brochure Design for Family Law Services'],
        name: 'Brochure Distribution to Clients',
        status: 'completed',
        details:
            'Distributing the completed brochures to clients and potential clients, both digitally and in physical form.',
        link: 'https://example.com/brochure-distribution',
        dueAt: new Date(Date.now() - 3456000000).toISOString(), // completed 40 days ago
        tags: ['distribution', 'clients'],
    },
    {
        ...projectData['Brochure Design for Family Law Services'],
        name: 'Post-Distribution Client Feedback',
        status: 'cancelled',
        details:
            'Cancelled as the client decided to forego post-distribution surveys in favor of monitoring brochure engagement through digital channels.',
        link: 'https://example.com/post-distribution-feedback',
        dueAt: new Date(Date.now() - 4320000000).toISOString(), // cancelled 50 days ago
        tags: ['feedback', 'cancelled'],
    },
];
const seedAnnualLegalInsightsReportDesignData = (projectData: ProjectsData) => [
    {
        ...projectData['Annual Legal Insights Report Design'],
        name: 'Initial Kickoff Meeting',
        status: 'scheduled',
        details:
            'Kickoff meeting to outline the objectives, structure, and key insights for the annual legal insights report.',
        link: 'https://example.com/kickoff-meeting',
        dueAt: new Date(Date.now() + 86400000).toISOString(), // due in 1 day
        tags: ['kickoff', 'meeting'],
    },
    {
        ...projectData['Annual Legal Insights Report Design'],
        name: 'Research and Data Collection',
        status: 'scheduled',
        details:
            'Collecting the latest legal data, trends, and case studies to inform the insights section of the report.',
        link: 'https://example.com/research-collection',
        dueAt: new Date(Date.now() + 259200000).toISOString(), // due in 3 days
        tags: ['research', 'data-collection'],
    },
    {
        ...projectData['Annual Legal Insights Report Design'],
        name: 'Report Outline and Structure Draft',
        status: 'scheduled',
        details:
            'Creating an outline and structure draft for the report, ensuring logical flow and alignment with the client’s vision.',
        link: 'https://example.com/outline-structure',
        dueAt: new Date(Date.now() + 604800000).toISOString(), // due in 7 days
        tags: ['outline', 'structure'],
    },
    {
        ...projectData['Annual Legal Insights Report Design'],
        name: 'Design Mockups for Report Layout',
        status: 'scheduled',
        details:
            'Developing initial design mockups for the report layout, including typography, visuals, and data visualizations.',
        link: 'https://example.com/design-mockups',
        dueAt: new Date(Date.now() + 1209600000).toISOString(), // due in 14 days
        tags: ['design', 'mockups'],
    },
    {
        ...projectData['Annual Legal Insights Report Design'],
        name: 'Client Review of Report Design',
        status: 'scheduled',
        details:
            'Presenting the design mockups to the client for review and gathering feedback for refinement.',
        link: 'https://example.com/client-review',
        dueAt: new Date(Date.now() + 1555200000).toISOString(), // due in 18 days
        tags: ['review', 'client'],
    },
    {
        ...projectData['Annual Legal Insights Report Design'],
        name: 'Incorporating Client Feedback into Design',
        status: 'scheduled',
        details:
            'Refining the report design based on client feedback to improve visuals, data presentation, and overall flow.',
        link: 'https://example.com/incorporating-feedback',
        dueAt: new Date(Date.now() + 1814400000).toISOString(), // due in 21 days
        tags: ['refinement', 'feedback'],
    },
    {
        ...projectData['Annual Legal Insights Report Design'],
        name: 'Final Review and Approval of Design',
        status: 'scheduled',
        details:
            'Final client review of the report design to ensure all revisions are incorporated before moving to production.',
        link: 'https://example.com/final-review',
        dueAt: new Date(Date.now() + 2092800000).toISOString(), // due in 24 days
        tags: ['final-review', 'client'],
    },
    {
        ...projectData['Annual Legal Insights Report Design'],
        name: 'Report Production and Printing',
        status: 'completed',
        details:
            'Printing the finalized report and ensuring high-quality production standards are met for both digital and physical formats.',
        link: 'https://example.com/report-production',
        dueAt: new Date(Date.now() - 2592000000).toISOString(), // completed 30 days ago
        tags: ['production', 'printing'],
    },
    {
        ...projectData['Annual Legal Insights Report Design'],
        name: 'Report Distribution to Clients',
        status: 'completed',
        details:
            'Distributing the final report to clients via email, direct mail, and other appropriate channels.',
        link: 'https://example.com/report-distribution',
        dueAt: new Date(Date.now() - 3456000000).toISOString(), // completed 40 days ago
        tags: ['distribution', 'clients'],
    },
    {
        ...projectData['Annual Legal Insights Report Design'],
        name: 'Post-Distribution Client Feedback',
        status: 'cancelled',
        details:
            'Cancelled due to the client choosing to monitor report impact through digital engagement metrics instead of collecting direct feedback.',
        link: 'https://example.com/post-distribution-feedback',
        dueAt: new Date(Date.now() - 4320000000).toISOString(), // cancelled 50 days ago
        tags: ['feedback', 'cancelled'],
    },
];
const seedAdCampaignForPersonalInjuryLawServicesData = (
    projectData: ProjectsData,
) => [
    {
        ...projectData['Ad Campaign for Personal Injury Law Services'],
        name: 'Campaign Strategy Meeting',
        status: 'completed',
        details:
            'Defined target audience, platforms, and KPIs for personal injury campaign.',
        link: 'https://example.com/strategy-meeting',
        dueAt: new Date(Date.now() - 20 * 86400000).toISOString(), // 20 days ago
        tags: ['strategy', 'planning'],
    },
    {
        ...projectData['Ad Campaign for Personal Injury Law Services'],
        name: 'Creative Brief Finalization',
        status: 'completed',
        details: 'Outlined messaging tone, design style, and campaign goals.',
        link: 'https://example.com/creative-brief',
        dueAt: new Date(Date.now() - 17 * 86400000).toISOString(), // 17 days ago
        tags: ['brief', 'creative'],
    },
    {
        ...projectData['Ad Campaign for Personal Injury Law Services'],
        name: 'Ad Copywriting Session',
        status: 'completed',
        details:
            'Wrote headlines and CTA-focused ad texts tailored to injury claims.',
        link: 'https://example.com/copywriting',
        dueAt: new Date(Date.now() - 14 * 86400000).toISOString(),
        tags: ['copywriting', 'content'],
    },
    {
        ...projectData['Ad Campaign for Personal Injury Law Services'],
        name: 'Graphic Asset Production',
        status: 'completed',
        details: 'Designed banners, thumbnails, and social creatives for ads.',
        link: 'https://example.com/assets',
        dueAt: new Date(Date.now() - 12 * 86400000).toISOString(),
        tags: ['design', 'visuals'],
    },
    {
        ...projectData['Ad Campaign for Personal Injury Law Services'],
        name: 'Landing Page Build',
        status: 'completed',
        details:
            'Created a focused lead-gen page highlighting legal help for injury victims.',
        link: 'https://example.com/landing',
        dueAt: new Date(Date.now() - 10 * 86400000).toISOString(),
        tags: ['web', 'landing-page'],
    },
    {
        ...projectData['Ad Campaign for Personal Injury Law Services'],
        name: 'Ad Account Setup and Configuration',
        status: 'completed',
        details:
            'Configured Google and Facebook ad accounts with tracking and budgets.',
        link: 'https://example.com/setup',
        dueAt: new Date(Date.now() - 8 * 86400000).toISOString(),
        tags: ['ads', 'setup'],
    },
    {
        ...projectData['Ad Campaign for Personal Injury Law Services'],
        name: 'Launch Campaign Phase 1',
        status: 'completed',
        details:
            'Went live with first set of ads on high-performing injury law channels.',
        link: 'https://example.com/launch',
        dueAt: new Date(Date.now() - 5 * 86400000).toISOString(),
        tags: ['launch', 'ads'],
    },
    {
        ...projectData['Ad Campaign for Personal Injury Law Services'],
        name: 'Mid-Campaign Performance Review',
        status: 'scheduled',
        details:
            'Analyze engagement, CTRs, and lead forms to adjust targeting.',
        link: 'https://example.com/review',
        dueAt: new Date(Date.now() + 1 * 86400000).toISOString(), // tomorrow
        tags: ['review', 'performance'],
    },
    {
        ...projectData['Ad Campaign for Personal Injury Law Services'],
        name: 'Optimization Sprint',
        status: 'scheduled',
        details: 'Refine copy and assets based on A/B test results.',
        link: 'https://example.com/optimization',
        dueAt: new Date(Date.now() + 4 * 86400000).toISOString(),
        tags: ['optimization', 'ab-testing'],
    },
    {
        ...projectData['Ad Campaign for Personal Injury Law Services'],
        name: 'Client Wrap-up and Reporting',
        status: 'scheduled',
        details:
            'Deliver final metrics, insights, and next-step recommendations.',
        link: 'https://example.com/wrap-up',
        dueAt: new Date(Date.now() + 7 * 86400000).toISOString(),
        tags: ['reporting', 'handoff'],
    },
];

const seedCustomerServiceTrainingManualData = (projectData: ProjectsData) => [
    {
        ...projectData['Customer Service Training Manual'],
        name: 'Kickoff Meeting with Stakeholders',
        status: 'completed',
        details: 'Discussed expectations, training goals, and target audience.',
        link: 'https://example.com/kickoff',
        dueAt: new Date(Date.now() - 21 * 86400000).toISOString(),
        tags: ['meeting', 'planning'],
    },
    {
        ...projectData['Customer Service Training Manual'],
        name: 'Research Hospitality Best Practices',
        status: 'completed',
        details:
            'Compiled modern customer service methods for luxury hospitality.',
        link: 'https://example.com/research',
        dueAt: new Date(Date.now() - 18 * 86400000).toISOString(),
        tags: ['research', 'benchmark'],
    },
    {
        ...projectData['Customer Service Training Manual'],
        name: 'Content Outline Approval',
        status: 'completed',
        details:
            'Structured manual into clear modules with learning objectives.',
        link: 'https://example.com/outline',
        dueAt: new Date(Date.now() - 15 * 86400000).toISOString(),
        tags: ['content', 'structure'],
    },
    {
        ...projectData['Customer Service Training Manual'],
        name: 'Write Draft Modules',
        status: 'completed',
        details:
            'Developed initial drafts for greeting, handling complaints, and upselling.',
        link: 'https://example.com/modules',
        dueAt: new Date(Date.now() - 12 * 86400000).toISOString(),
        tags: ['writing', 'draft'],
    },
    {
        ...projectData['Customer Service Training Manual'],
        name: 'Review with Training Team',
        status: 'completed',
        details: 'Feedback session with hotel trainers and HR reps.',
        link: 'https://example.com/review',
        dueAt: new Date(Date.now() - 10 * 86400000).toISOString(),
        tags: ['review', 'feedback'],
    },
    {
        ...projectData['Customer Service Training Manual'],
        name: 'Design Visual Elements',
        status: 'completed',
        details: 'Created diagrams and flowcharts for service protocols.',
        link: 'https://example.com/design-assets',
        dueAt: new Date(Date.now() - 8 * 86400000).toISOString(),
        tags: ['visuals', 'ux'],
    },
    {
        ...projectData['Customer Service Training Manual'],
        name: 'Proofread and Final Edits',
        status: 'completed',
        details: 'Finalized tone, grammar, and clarity checks.',
        link: 'https://example.com/final-edits',
        dueAt: new Date(Date.now() - 5 * 86400000).toISOString(),
        tags: ['proofreading', 'editing'],
    },
    {
        ...projectData['Customer Service Training Manual'],
        name: 'Manual Layout and Formatting',
        status: 'scheduled',
        details: 'Apply branded layout, section styling, and page numbering.',
        link: 'https://example.com/layout',
        dueAt: new Date(Date.now() + 1 * 86400000).toISOString(),
        tags: ['layout', 'formatting'],
    },
    {
        ...projectData['Customer Service Training Manual'],
        name: 'Digital PDF Export and Print Prep',
        status: 'scheduled',
        details: 'Prepare print-ready files and interactive PDF version.',
        link: 'https://example.com/export',
        dueAt: new Date(Date.now() + 3 * 86400000).toISOString(),
        tags: ['pdf', 'print'],
    },
    {
        ...projectData['Customer Service Training Manual'],
        name: 'Training Rollout Briefing',
        status: 'scheduled',
        details: 'Present manual to hotel managers and trainers.',
        link: 'https://example.com/rollout',
        dueAt: new Date(Date.now() + 5 * 86400000).toISOString(),
        tags: ['training', 'handoff'],
    },
];
const seedMobileAppUserInterfaceImprovementsData = (
    projectData: ProjectsData,
) => [
    {
        ...projectData['Mobile App User Interface Improvements'],
        name: 'UI Audit & Heuristic Evaluation',
        status: 'completed',
        details:
            'Reviewed app using usability heuristics to identify weak spots.',
        link: 'https://example.com/ui-audit',
        dueAt: new Date(Date.now() - 20 * 86400000).toISOString(),
        tags: ['audit', 'usability'],
    },
    {
        ...projectData['Mobile App User Interface Improvements'],
        name: 'User Feedback Analysis',
        status: 'completed',
        details: 'Synthesized user reviews and support tickets to find trends.',
        link: 'https://example.com/feedback-analysis',
        dueAt: new Date(Date.now() - 17 * 86400000).toISOString(),
        tags: ['research', 'feedback'],
    },
    {
        ...projectData['Mobile App User Interface Improvements'],
        name: 'Wireframe Key Screens',
        status: 'completed',
        details:
            'Created low-fidelity wireframes for booking, home, and account screens.',
        link: 'https://example.com/wireframes',
        dueAt: new Date(Date.now() - 14 * 86400000).toISOString(),
        tags: ['wireframe', 'ux'],
    },
    {
        ...projectData['Mobile App User Interface Improvements'],
        name: 'High-Fidelity Prototypes',
        status: 'completed',
        details: 'Designed pixel-perfect mockups in line with brand style.',
        link: 'https://example.com/prototypes',
        dueAt: new Date(Date.now() - 11 * 86400000).toISOString(),
        tags: ['ui', 'design'],
    },
    {
        ...projectData['Mobile App User Interface Improvements'],
        name: 'Internal Design Review',
        status: 'completed',
        details:
            'UI walkthrough with product and engineering team for feedback.',
        link: 'https://example.com/internal-review',
        dueAt: new Date(Date.now() - 9 * 86400000).toISOString(),
        tags: ['review', 'design'],
    },
    {
        ...projectData['Mobile App User Interface Improvements'],
        name: 'Interactive Prototype Testing',
        status: 'completed',
        details: 'Ran user testing sessions using clickable Figma prototype.',
        link: 'https://example.com/testing',
        dueAt: new Date(Date.now() - 6 * 86400000).toISOString(),
        tags: ['testing', 'usability'],
    },
    {
        ...projectData['Mobile App User Interface Improvements'],
        name: 'Revise Based on Feedback',
        status: 'completed',
        details: 'Refined interactions and layouts based on test findings.',
        link: 'https://example.com/revisions',
        dueAt: new Date(Date.now() - 4 * 86400000).toISOString(),
        tags: ['refine', 'feedback'],
    },
    {
        ...projectData['Mobile App User Interface Improvements'],
        name: 'Dev Handoff',
        status: 'scheduled',
        details: 'Prepare Zeplin and Figma files with specs for development.',
        link: 'https://example.com/dev-handoff',
        dueAt: new Date(Date.now() + 1 * 86400000).toISOString(),
        tags: ['handoff', 'dev'],
    },
    {
        ...projectData['Mobile App User Interface Improvements'],
        name: 'Implement UI Updates',
        status: 'scheduled',
        details: 'Develop and test UI changes across iOS and Android.',
        link: 'https://example.com/ui-updates',
        dueAt: new Date(Date.now() + 3 * 86400000).toISOString(),
        tags: ['implementation', 'mobile'],
    },
    {
        ...projectData['Mobile App User Interface Improvements'],
        name: 'App Store Release',
        status: 'scheduled',
        details:
            'Push updated UI to app stores with changelog and screenshots.',
        link: 'https://example.com/release',
        dueAt: new Date(Date.now() + 5 * 86400000).toISOString(),
        tags: ['release', 'update'],
    },
];
const seedInBranchSignageSystemData = (projectData: ProjectsData) => [
    {
        ...projectData['In-Branch Signage System'],
        name: 'Branch Audit & Signage Survey',
        status: 'completed',
        details: 'Documented all current signage placements and branch flows.',
        link: 'https://example.com/branch-audit',
        dueAt: new Date(Date.now() - 18 * 86400000).toISOString(),
        tags: ['audit', 'research'],
    },
    {
        ...projectData['In-Branch Signage System'],
        name: 'Information Architecture Mapping',
        status: 'completed',
        details:
            'Created logical structure for signage content and navigation.',
        link: 'https://example.com/ia-mapping',
        dueAt: new Date(Date.now() - 15 * 86400000).toISOString(),
        tags: ['ia', 'ux'],
    },
    {
        ...projectData['In-Branch Signage System'],
        name: 'Signage Style Guide Development',
        status: 'completed',
        details: 'Designed consistent visual language for in-branch signs.',
        link: 'https://example.com/style-guide',
        dueAt: new Date(Date.now() - 12 * 86400000).toISOString(),
        tags: ['design', 'styleguide'],
    },
    {
        ...projectData['In-Branch Signage System'],
        name: 'Mockup Design for Primary Zones',
        status: 'completed',
        details: 'Visuals for teller area, waiting area, and entrances.',
        link: 'https://example.com/mockups',
        dueAt: new Date(Date.now() - 10 * 86400000).toISOString(),
        tags: ['mockup', 'ui'],
    },
    {
        ...projectData['In-Branch Signage System'],
        name: 'Material Selection & Prototyping',
        status: 'completed',
        details: 'Tested different materials for readability and installation.',
        link: 'https://example.com/materials',
        dueAt: new Date(Date.now() - 8 * 86400000).toISOString(),
        tags: ['prototyping', 'materials'],
    },
    {
        ...projectData['In-Branch Signage System'],
        name: 'Review & Compliance Check',
        status: 'completed',
        details:
            'Ensured designs comply with accessibility and branding rules.',
        link: 'https://example.com/compliance-review',
        dueAt: new Date(Date.now() - 6 * 86400000).toISOString(),
        tags: ['review', 'compliance'],
    },
    {
        ...projectData['In-Branch Signage System'],
        name: 'Branch Staff Signage Walkthrough',
        status: 'completed',
        details: 'Guided staff through mock signage placements and use.',
        link: 'https://example.com/staff-walkthrough',
        dueAt: new Date(Date.now() - 4 * 86400000).toISOString(),
        tags: ['training', 'walkthrough'],
    },
    {
        ...projectData['In-Branch Signage System'],
        name: 'Sign Production Coordination',
        status: 'scheduled',
        details: 'Send approved assets to printer and coordinate delivery.',
        link: 'https://example.com/production',
        dueAt: new Date(Date.now() + 1 * 86400000).toISOString(),
        tags: ['production', 'vendor'],
    },
    {
        ...projectData['In-Branch Signage System'],
        name: 'Installation at Pilot Branch',
        status: 'scheduled',
        details:
            'Install full signage set in pilot branch and document outcome.',
        link: 'https://example.com/pilot-install',
        dueAt: new Date(Date.now() + 3 * 86400000).toISOString(),
        tags: ['installation', 'pilot'],
    },
    {
        ...projectData['In-Branch Signage System'],
        name: 'Performance Feedback Report',
        status: 'scheduled',
        details: 'Collect feedback from branch staff and customers.',
        link: 'https://example.com/feedback',
        dueAt: new Date(Date.now() + 5 * 86400000).toISOString(),
        tags: ['feedback', 'report'],
    },
];
const seedCustomerFeedbackSurveyLayoutData = (projectData: ProjectsData) => [
    {
        ...projectData['Customer Feedback Survey Layout'],
        name: 'Survey Goals & Metrics Definition',
        status: 'completed',
        details:
            'Identified key questions and KPIs aligned with business objectives.',
        link: 'https://example.com/survey-goals',
        dueAt: new Date(Date.now() - 14 * 86400000).toISOString(),
        tags: ['strategy', 'uxresearch'],
    },
    {
        ...projectData['Customer Feedback Survey Layout'],
        name: 'Wireframe Sketches for Layout Options',
        status: 'completed',
        details:
            'Explored multiple UX flows for feedback survey on desktop and mobile.',
        link: 'https://example.com/wireframes',
        dueAt: new Date(Date.now() - 12 * 86400000).toISOString(),
        tags: ['wireframe', 'ux'],
    },
    {
        ...projectData['Customer Feedback Survey Layout'],
        name: 'Component Design System for Inputs',
        status: 'completed',
        details:
            'Built reusable components for sliders, stars, and text areas.',
        link: 'https://example.com/components',
        dueAt: new Date(Date.now() - 10 * 86400000).toISOString(),
        tags: ['design', 'components'],
    },
    {
        ...projectData['Customer Feedback Survey Layout'],
        name: 'Responsive Layout & Breakpoint Testing',
        status: 'completed',
        details:
            'Ensured design looks clean across phone, tablet, and desktop.',
        link: 'https://example.com/responsive-testing',
        dueAt: new Date(Date.now() - 8 * 86400000).toISOString(),
        tags: ['responsive', 'testing'],
    },
    {
        ...projectData['Customer Feedback Survey Layout'],
        name: 'Microcopy & Tone of Voice Drafting',
        status: 'completed',
        details:
            'Wrote approachable and brand-consistent messages and prompts.',
        link: 'https://example.com/microcopy',
        dueAt: new Date(Date.now() - 6 * 86400000).toISOString(),
        tags: ['copywriting', 'ux'],
    },
    {
        ...projectData['Customer Feedback Survey Layout'],
        name: 'Prototype Testing with Real Users',
        status: 'completed',
        details:
            'Tested design with 5 participants; logged key friction points.',
        link: 'https://example.com/user-testing',
        dueAt: new Date(Date.now() - 4 * 86400000).toISOString(),
        tags: ['testing', 'prototype'],
    },
    {
        ...projectData['Customer Feedback Survey Layout'],
        name: 'Revisions Based on User Feedback',
        status: 'completed',
        details:
            'Adjusted layout spacing and button placement per test results.',
        link: 'https://example.com/revision-notes',
        dueAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        tags: ['revision', 'feedback'],
    },
    {
        ...projectData['Customer Feedback Survey Layout'],
        name: 'Final Review & QA Testing',
        status: 'scheduled',
        details: 'Test with marketing and QA teams before handoff.',
        link: 'https://example.com/qa-check',
        dueAt: new Date(Date.now() + 1 * 86400000).toISOString(),
        tags: ['qa', 'review'],
    },
    {
        ...projectData['Customer Feedback Survey Layout'],
        name: 'Handoff to Development Team',
        status: 'scheduled',
        details: 'Package Figma file, assets, and documentation for devs.',
        link: 'https://example.com/dev-handoff',
        dueAt: new Date(Date.now() + 3 * 86400000).toISOString(),
        tags: ['handoff', 'dev'],
    },
    {
        ...projectData['Customer Feedback Survey Layout'],
        name: 'Launch & Feedback Monitoring',
        status: 'scheduled',
        details: 'Launch survey and monitor usage and responses live.',
        link: 'https://example.com/live-feedback',
        dueAt: new Date(Date.now() + 5 * 86400000).toISOString(),
        tags: ['launch', 'monitoring'],
    },
];
const seedNewLoanProductInformationBrochureData = (
    projectData: ProjectsData,
) => [
    {
        ...projectData['New Loan Product Information Brochure'],
        name: 'Kickoff Meeting with Product Team',
        status: 'completed',
        details:
            'Aligned on brochure goals, tone, target audience, and compliance requirements.',
        link: 'https://example.com/kickoff-loan-brochure',
        dueAt: new Date(Date.now() - 15 * 86400000).toISOString(),
        tags: ['planning', 'stakeholders'],
    },
    {
        ...projectData['New Loan Product Information Brochure'],
        name: 'Information Architecture & Content Outline',
        status: 'completed',
        details:
            'Structured content around product benefits, FAQs, and application steps.',
        link: 'https://example.com/content-outline',
        dueAt: new Date(Date.now() - 13 * 86400000).toISOString(),
        tags: ['content', 'structure'],
    },
    {
        ...projectData['New Loan Product Information Brochure'],
        name: 'Visual Concept Moodboard',
        status: 'completed',
        details:
            'Gathered inspiration focusing on trust, accessibility, and clarity.',
        link: 'https://example.com/moodboard-loan',
        dueAt: new Date(Date.now() - 12 * 86400000).toISOString(),
        tags: ['visual', 'moodboard'],
    },
    {
        ...projectData['New Loan Product Information Brochure'],
        name: 'Brochure Layout Draft',
        status: 'completed',
        details:
            'Designed trifold format, front cover teaser, and modular content blocks.',
        link: 'https://example.com/loan-layout-v1',
        dueAt: new Date(Date.now() - 9 * 86400000).toISOString(),
        tags: ['layout', 'draft'],
    },
    {
        ...projectData['New Loan Product Information Brochure'],
        name: 'Compliance & Legal Review',
        status: 'completed',
        details:
            'Submitted to legal for approval of wording, disclaimers, and rates.',
        link: 'https://example.com/legal-review',
        dueAt: new Date(Date.now() - 7 * 86400000).toISOString(),
        tags: ['legal', 'compliance'],
    },
    {
        ...projectData['New Loan Product Information Brochure'],
        name: 'Typography & Color Refinement',
        status: 'completed',
        details:
            'Adjusted typography for readability and aligned color with brand.',
        link: 'https://example.com/typography-loan',
        dueAt: new Date(Date.now() - 5 * 86400000).toISOString(),
        tags: ['typography', 'branding'],
    },
    {
        ...projectData['New Loan Product Information Brochure'],
        name: 'Team Feedback & Iteration',
        status: 'completed',
        details: 'Incorporated feedback from marketing and product teams.',
        link: 'https://example.com/iteration-feedback',
        dueAt: new Date(Date.now() - 3 * 86400000).toISOString(),
        tags: ['iteration', 'team'],
    },
    {
        ...projectData['New Loan Product Information Brochure'],
        name: 'Print File Preparation',
        status: 'scheduled',
        details: 'Prepping CMYK assets, bleeds, and folds for print house.',
        link: 'https://example.com/print-files',
        dueAt: new Date(Date.now() + 1 * 86400000).toISOString(),
        tags: ['print', 'prep'],
    },
    {
        ...projectData['New Loan Product Information Brochure'],
        name: 'Digital PDF Export & Accessibility Check',
        status: 'scheduled',
        details:
            'Final pass with screen reader and metadata tags for digital release.',
        link: 'https://example.com/accessible-pdf',
        dueAt: new Date(Date.now() + 3 * 86400000).toISOString(),
        tags: ['accessibility', 'pdf'],
    },
    {
        ...projectData['New Loan Product Information Brochure'],
        name: 'Distribution Launch',
        status: 'scheduled',
        details: 'Upload to website and distribute printed copies to branches.',
        link: 'https://example.com/brochure-launch',
        dueAt: new Date(Date.now() + 5 * 86400000).toISOString(),
        tags: ['distribution', 'launch'],
    },
];
const seedTrainingVideoForOnlineBankingSystemData = (
    projectData: ProjectsData,
) => [
    {
        ...projectData['Training Video for Online Banking System'],
        name: 'Script Planning Session',
        status: 'completed',
        details:
            'Defined key features to highlight and tone of voice for the training video.',
        link: 'https://example.com/script-session-onlinebanking',
        dueAt: new Date(Date.now() - 14 * 86400000).toISOString(),
        tags: ['planning', 'script'],
    },
    {
        ...projectData['Training Video for Online Banking System'],
        name: 'Storyboard & Visual Flow',
        status: 'completed',
        details:
            'Created scene-by-scene layout for user interactions and narration timing.',
        link: 'https://example.com/storyboard-onlinebanking',
        dueAt: new Date(Date.now() - 12 * 86400000).toISOString(),
        tags: ['storyboard', 'visual'],
    },
    {
        ...projectData['Training Video for Online Banking System'],
        name: 'UI Screen Recording Capture',
        status: 'completed',
        details:
            'Captured live flows of login, transfer, and bill payment features.',
        link: 'https://example.com/ui-capture',
        dueAt: new Date(Date.now() - 10 * 86400000).toISOString(),
        tags: ['recording', 'ui'],
    },
    {
        ...projectData['Training Video for Online Banking System'],
        name: 'Voice-over Recording',
        status: 'completed',
        details:
            'Recorded narration with a professional voice actor for clarity and trust.',
        link: 'https://example.com/voiceover',
        dueAt: new Date(Date.now() - 8 * 86400000).toISOString(),
        tags: ['audio', 'narration'],
    },
    {
        ...projectData['Training Video for Online Banking System'],
        name: 'Initial Video Assembly',
        status: 'completed',
        details: 'Assembled visuals, audio, and transitions for review.',
        link: 'https://example.com/video-draft',
        dueAt: new Date(Date.now() - 6 * 86400000).toISOString(),
        tags: ['editing', 'assembly'],
    },
    {
        ...projectData['Training Video for Online Banking System'],
        name: 'Team Review & Feedback',
        status: 'completed',
        details: 'Gathered internal feedback on pacing, clarity, and visuals.',
        link: 'https://example.com/review-feedback',
        dueAt: new Date(Date.now() - 4 * 86400000).toISOString(),
        tags: ['feedback', 'review'],
    },
    {
        ...projectData['Training Video for Online Banking System'],
        name: 'Final Edits & Revisions',
        status: 'completed',
        details: 'Implemented adjustments from compliance and branding teams.',
        link: 'https://example.com/final-edits',
        dueAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        tags: ['revision', 'final'],
    },
    {
        ...projectData['Training Video for Online Banking System'],
        name: 'Subtitles & Accessibility Checks',
        status: 'scheduled',
        details:
            'Adding subtitles and testing for screen reader and color contrast.',
        link: 'https://example.com/subtitles-accessibility',
        dueAt: new Date(Date.now() + 1 * 86400000).toISOString(),
        tags: ['accessibility', 'subtitles'],
    },
    {
        ...projectData['Training Video for Online Banking System'],
        name: 'Internal Training Launch',
        status: 'scheduled',
        details: 'Launch for internal staff with feedback collection form.',
        link: 'https://example.com/internal-launch',
        dueAt: new Date(Date.now() + 3 * 86400000).toISOString(),
        tags: ['launch', 'internal'],
    },
    {
        ...projectData['Training Video for Online Banking System'],
        name: 'Public Release on Help Center',
        status: 'scheduled',
        details:
            'Publish on help portal and email to customers with usage tips.',
        link: 'https://example.com/help-center-release',
        dueAt: new Date(Date.now() + 5 * 86400000).toISOString(),
        tags: ['public', 'release'],
    },
];
const seedProductPackagingDesignForNewSkincareLineData = (
    projectData: ProjectsData,
) => [
    {
        ...projectData['Product Packaging Design for New Skincare Line'],
        name: 'Kickoff & Brand Discovery',
        status: 'completed',
        details:
            'Explored brand tone, target audience, and competitive aesthetics.',
        link: 'https://example.com/kickoff-skincare',
        dueAt: new Date(Date.now() - 18 * 86400000).toISOString(),
        tags: ['branding', 'research'],
    },
    {
        ...projectData['Product Packaging Design for New Skincare Line'],
        name: 'Container & Label Format Exploration',
        status: 'completed',
        details:
            'Selected packaging types for moisturizer, serum, and cleanser.',
        link: 'https://example.com/container-labels',
        dueAt: new Date(Date.now() - 15 * 86400000).toISOString(),
        tags: ['packaging', 'labels'],
    },
    {
        ...projectData['Product Packaging Design for New Skincare Line'],
        name: 'Color & Typography Concepts',
        status: 'completed',
        details:
            'Developed palettes and type pairings reflecting purity and luxury.',
        link: 'https://example.com/colors-type',
        dueAt: new Date(Date.now() - 12 * 86400000).toISOString(),
        tags: ['design', 'typography'],
    },
    {
        ...projectData['Product Packaging Design for New Skincare Line'],
        name: 'Illustration & Icon Direction',
        status: 'completed',
        details:
            'Created a soft botanical illustration set for label backgrounds.',
        link: 'https://example.com/illustrations',
        dueAt: new Date(Date.now() - 9 * 86400000).toISOString(),
        tags: ['illustration', 'icons'],
    },
    {
        ...projectData['Product Packaging Design for New Skincare Line'],
        name: 'Mockup Round 1',
        status: 'completed',
        details:
            'Delivered first mockups of cleanser and serum packaging for feedback.',
        link: 'https://example.com/mockup-1',
        dueAt: new Date(Date.now() - 7 * 86400000).toISOString(),
        tags: ['mockup', 'round1'],
    },
    {
        ...projectData['Product Packaging Design for New Skincare Line'],
        name: 'Client Review Meeting',
        status: 'completed',
        details: 'Discussed preferences and feedback with Lumera team.',
        link: 'https://example.com/review-meeting',
        dueAt: new Date(Date.now() - 5 * 86400000).toISOString(),
        tags: ['meeting', 'feedback'],
    },
    {
        ...projectData['Product Packaging Design for New Skincare Line'],
        name: 'Revisions & Full Product Line Design',
        status: 'completed',
        details:
            'Applied feedback and finalized all product packaging visuals.',
        link: 'https://example.com/revision-round',
        dueAt: new Date(Date.now() - 3 * 86400000).toISOString(),
        tags: ['final', 'revision'],
    },
    {
        ...projectData['Product Packaging Design for New Skincare Line'],
        name: 'Print File Prep',
        status: 'scheduled',
        details:
            'Prepping dielines, color profiles, and material notes for printer.',
        link: 'https://example.com/print-files',
        dueAt: new Date(Date.now() + 1 * 86400000).toISOString(),
        tags: ['print', 'production'],
    },
    {
        ...projectData['Product Packaging Design for New Skincare Line'],
        name: 'Packaging Supplier Coordination',
        status: 'scheduled',
        details:
            'Sending files and final specs to packaging vendor for test prints.',
        link: 'https://example.com/supplier-coordination',
        dueAt: new Date(Date.now() + 3 * 86400000).toISOString(),
        tags: ['supplier', 'coordination'],
    },
    {
        ...projectData['Product Packaging Design for New Skincare Line'],
        name: 'Launch Prep & Social Assets',
        status: 'scheduled',
        details: 'Creating product mockups and flat lays for marketing launch.',
        link: 'https://example.com/launch-assets',
        dueAt: new Date(Date.now() + 5 * 86400000).toISOString(),
        tags: ['launch', 'marketing'],
    },
];
const seedSocialMediaContentCreationForProductLaunchData = (
    projectData: ProjectsData,
) => [
    {
        ...projectData['Social Media Content Creation for Product Launch'],
        name: 'Kickoff & Platform Strategy Session',
        status: 'completed',
        details:
            'Defined campaign goals, selected platforms (Instagram, TikTok, Pinterest).',
        link: 'https://example.com/strategy-session',
        dueAt: new Date(Date.now() - 14 * 86400000).toISOString(),
        tags: ['strategy', 'planning'],
    },
    {
        ...projectData['Social Media Content Creation for Product Launch'],
        name: 'Moodboard & Visual Direction',
        status: 'completed',
        details: 'Curated aesthetics and tone: clean, empowering, playful.',
        link: 'https://example.com/moodboard-nova',
        dueAt: new Date(Date.now() - 12 * 86400000).toISOString(),
        tags: ['moodboard', 'branding'],
    },
    {
        ...projectData['Social Media Content Creation for Product Launch'],
        name: 'Scriptwriting for Launch Teasers',
        status: 'completed',
        details: 'Wrote 3 short teaser scripts for Instagram Reels and TikTok.',
        link: 'https://example.com/teaser-scripts',
        dueAt: new Date(Date.now() - 10 * 86400000).toISOString(),
        tags: ['script', 'teasers'],
    },
    {
        ...projectData['Social Media Content Creation for Product Launch'],
        name: 'Short-form Video Editing Round 1',
        status: 'completed',
        details: 'Edited clips with transitions, brand logo, and captions.',
        link: 'https://example.com/shortform-edit1',
        dueAt: new Date(Date.now() - 8 * 86400000).toISOString(),
        tags: ['video', 'editing'],
    },
    {
        ...projectData['Social Media Content Creation for Product Launch'],
        name: 'Product Photography Session',
        status: 'completed',
        details: 'Captured hero shots and lifestyle imagery for posts and ads.',
        link: 'https://example.com/product-shoot',
        dueAt: new Date(Date.now() - 6 * 86400000).toISOString(),
        tags: ['photo', 'content'],
    },
    {
        ...projectData['Social Media Content Creation for Product Launch'],
        name: 'Carousel Post Design',
        status: 'completed',
        details:
            'Designed Instagram carousel for product benefits and ingredients.',
        link: 'https://example.com/carousel-design',
        dueAt: new Date(Date.now() - 4 * 86400000).toISOString(),
        tags: ['carousel', 'design'],
    },
    {
        ...projectData['Social Media Content Creation for Product Launch'],
        name: 'Copywriting for Captions & Hashtags',
        status: 'completed',
        details:
            'Wrote optimized captions with CTAs and researched trending tags.',
        link: 'https://example.com/caption-copy',
        dueAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        tags: ['copywriting', 'hashtags'],
    },
    {
        ...projectData['Social Media Content Creation for Product Launch'],
        name: 'Content Scheduling in Buffer',
        status: 'scheduled',
        details: 'Scheduling 10 posts across 3 platforms for next 2 weeks.',
        link: 'https://example.com/scheduling-plan',
        dueAt: new Date(Date.now() + 1 * 86400000).toISOString(),
        tags: ['scheduling', 'tools'],
    },
    {
        ...projectData['Social Media Content Creation for Product Launch'],
        name: 'Launch Day Story Content',
        status: 'scheduled',
        details: 'Real-time IG Stories and engagement posts for launch day.',
        link: 'https://example.com/launch-story',
        dueAt: new Date(Date.now() + 3 * 86400000).toISOString(),
        tags: ['stories', 'launch'],
    },
    {
        ...projectData['Social Media Content Creation for Product Launch'],
        name: 'Post-launch Engagement Monitoring',
        status: 'scheduled',
        details: 'Track responses, respond to comments, and gather insights.',
        link: 'https://example.com/engagement-tracking',
        dueAt: new Date(Date.now() + 5 * 86400000).toISOString(),
        tags: ['analytics', 'engagement'],
    },
];
const seedSkincareBlogDesignForCompanyWebsiteData = (
    projectData: ProjectsData,
) => [
    {
        ...projectData['Skincare Blog Design for Company Website'],
        name: 'Content Structure Planning',
        status: 'completed',
        details: 'Defined categories, tags, and SEO structure for blog layout.',
        link: 'https://example.com/blog-structure-plan',
        dueAt: new Date(Date.now() - 13 * 86400000).toISOString(),
        tags: ['structure', 'seo'],
    },
    {
        ...projectData['Skincare Blog Design for Company Website'],
        name: 'Wireframe Approval',
        status: 'completed',
        details:
            'Created and reviewed wireframes for blog homepage and articles.',
        link: 'https://example.com/blog-wireframes',
        dueAt: new Date(Date.now() - 11 * 86400000).toISOString(),
        tags: ['wireframe', 'ux'],
    },
    {
        ...projectData['Skincare Blog Design for Company Website'],
        name: 'Typography and Color Exploration',
        status: 'completed',
        details: 'Explored options for elegant and accessible blog design.',
        link: 'https://example.com/blog-type-color',
        dueAt: new Date(Date.now() - 9 * 86400000).toISOString(),
        tags: ['ui', 'style'],
    },
    {
        ...projectData['Skincare Blog Design for Company Website'],
        name: 'Hero Banner Design',
        status: 'completed',
        details:
            'Designed hero section for main blog page with featured article.',
        link: 'https://example.com/hero-design',
        dueAt: new Date(Date.now() - 7 * 86400000).toISOString(),
        tags: ['hero', 'visual'],
    },
    {
        ...projectData['Skincare Blog Design for Company Website'],
        name: 'Responsive Layout Implementation',
        status: 'completed',
        details: 'Implemented mobile-first responsive layout in code.',
        link: 'https://example.com/responsive-blog',
        dueAt: new Date(Date.now() - 5 * 86400000).toISOString(),
        tags: ['responsive', 'frontend'],
    },
    {
        ...projectData['Skincare Blog Design for Company Website'],
        name: 'SEO Meta Tag Integration',
        status: 'completed',
        details: 'Added title, description, and social card meta tags.',
        link: 'https://example.com/blog-seo-meta',
        dueAt: new Date(Date.now() - 3 * 86400000).toISOString(),
        tags: ['seo', 'metadata'],
    },
    {
        ...projectData['Skincare Blog Design for Company Website'],
        name: 'Content Editor Integration',
        status: 'completed',
        details: 'Integrated WYSIWYG editor for internal blog content team.',
        link: 'https://example.com/editor-demo',
        dueAt: new Date(Date.now() - 1 * 86400000).toISOString(),
        tags: ['cms', 'editor'],
    },
    {
        ...projectData['Skincare Blog Design for Company Website'],
        name: 'Author Profile Card Design',
        status: 'scheduled',
        details:
            'Create design template for article authors with photo, bio, and social.',
        link: 'https://example.com/author-card',
        dueAt: new Date(Date.now() + 1 * 86400000).toISOString(),
        tags: ['profile', 'component'],
    },
    {
        ...projectData['Skincare Blog Design for Company Website'],
        name: 'Blog Pagination & Load More Button',
        status: 'scheduled',
        details: 'Develop blog navigation controls with progressive loading.',
        link: 'https://example.com/pagination-ui',
        dueAt: new Date(Date.now() + 2 * 86400000).toISOString(),
        tags: ['pagination', 'ui'],
    },
    {
        ...projectData['Skincare Blog Design for Company Website'],
        name: 'Accessibility Testing & Fixes',
        status: 'scheduled',
        details:
            'Run accessibility audit and address any WCAG compliance issues.',
        link: 'https://example.com/blog-a11y-check',
        dueAt: new Date(Date.now() + 4 * 86400000).toISOString(),
        tags: ['a11y', 'qa'],
    },
];
const seedEmailNewsletterTemplateDesignData = (projectData: ProjectsData) => [
    {
        ...projectData['Email Newsletter Template Design'],
        name: 'Initial Design Brief & Concept Approval',
        status: 'completed',
        details:
            'Defined newsletter format, design direction, and content layout.',
        link: 'https://example.com/newsletter-brief',
        dueAt: new Date(Date.now() - 10 * 86400000).toISOString(),
        tags: ['brief', 'concept'],
    },
    {
        ...projectData['Email Newsletter Template Design'],
        name: 'Wireframe & Layout Design',
        status: 'completed',
        details:
            'Created wireframes for email structure, focusing on readability.',
        link: 'https://example.com/newsletter-wireframe',
        dueAt: new Date(Date.now() - 8 * 86400000).toISOString(),
        tags: ['wireframe', 'layout'],
    },
    {
        ...projectData['Email Newsletter Template Design'],
        name: 'Typography & Color Palette Finalization',
        status: 'completed',
        details:
            'Chose fonts and color scheme that align with brand guidelines.',
        link: 'https://example.com/newsletter-typography',
        dueAt: new Date(Date.now() - 6 * 86400000).toISOString(),
        tags: ['typography', 'branding'],
    },
    {
        ...projectData['Email Newsletter Template Design'],
        name: 'Hero Image & Banner Design',
        status: 'completed',
        details: 'Designed visually striking hero section for main message.',
        link: 'https://example.com/newsletter-hero',
        dueAt: new Date(Date.now() - 4 * 86400000).toISOString(),
        tags: ['banner', 'hero'],
    },
    {
        ...projectData['Email Newsletter Template Design'],
        name: 'HTML Template Development',
        status: 'completed',
        details: 'Developed responsive HTML email template with inline CSS.',
        link: 'https://example.com/newsletter-template',
        dueAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        tags: ['html', 'email'],
    },
    {
        ...projectData['Email Newsletter Template Design'],
        name: 'Content Integration & Copywriting',
        status: 'completed',
        details:
            'Integrated promotional content and ensured engaging copy for call-to-actions.',
        link: 'https://example.com/newsletter-copy',
        dueAt: new Date(Date.now() - 1 * 86400000).toISOString(),
        tags: ['content', 'copywriting'],
    },
    {
        ...projectData['Email Newsletter Template Design'],
        name: 'Mobile Optimization & Testing',
        status: 'completed',
        details: 'Tested template for mobile responsiveness across devices.',
        link: 'https://example.com/newsletter-mobile-test',
        dueAt: new Date(Date.now()).toISOString(),
        tags: ['testing', 'mobile'],
    },
    {
        ...projectData['Email Newsletter Template Design'],
        name: 'A/B Testing Plan for Subject Lines',
        status: 'scheduled',
        details:
            'Create variations for subject lines and preview texts for optimization.',
        link: 'https://example.com/newsletter-ab',
        dueAt: new Date(Date.now() + 1 * 86400000).toISOString(),
        tags: ['ab-testing', 'subject-line'],
    },
    {
        ...projectData['Email Newsletter Template Design'],
        name: 'Analytics & Tracking Setup',
        status: 'scheduled',
        details:
            'Set up UTM parameters and Google Analytics tracking for the email campaign.',
        link: 'https://example.com/newsletter-analytics',
        dueAt: new Date(Date.now() + 3 * 86400000).toISOString(),
        tags: ['analytics', 'tracking'],
    },
    {
        ...projectData['Email Newsletter Template Design'],
        name: 'Launch & Send Test Campaign',
        status: 'scheduled',
        details:
            'Conduct final test send and prepare the campaign for full launch.',
        link: 'https://example.com/newsletter-launch',
        dueAt: new Date(Date.now() + 5 * 86400000).toISOString(),
        tags: ['launch', 'email'],
    },
];
const seedRetailDisplayForInStoreProductPromotionData = (
    projectData: ProjectsData,
) => [
    {
        ...projectData['Retail Display for In-Store Product Promotion'],
        name: 'Initial Concept & Mood Board Creation',
        status: 'completed',
        details:
            'Developed mood boards and visual style for in-store product display.',
        link: 'https://example.com/display-concept',
        dueAt: new Date(Date.now() - 12 * 86400000).toISOString(),
        tags: ['concept', 'branding'],
    },
    {
        ...projectData['Retail Display for In-Store Product Promotion'],
        name: 'Display Mockup & Approval',
        status: 'completed',
        details:
            'Created 3D mockups of retail display for client review and approval.',
        link: 'https://example.com/display-mockup',
        dueAt: new Date(Date.now() - 10 * 86400000).toISOString(),
        tags: ['mockup', 'design'],
    },
    {
        ...projectData['Retail Display for In-Store Product Promotion'],
        name: 'Material Selection & Vendor Coordination',
        status: 'completed',
        details:
            'Coordinated with vendors to select sustainable and durable materials.',
        link: 'https://example.com/materials-selection',
        dueAt: new Date(Date.now() - 8 * 86400000).toISOString(),
        tags: ['materials', 'vendors'],
    },
    {
        ...projectData['Retail Display for In-Store Product Promotion'],
        name: 'Prototyping & Physical Model Creation',
        status: 'completed',
        details:
            'Built a prototype of the retail display for in-store testing.',
        link: 'https://example.com/display-prototype',
        dueAt: new Date(Date.now() - 6 * 86400000).toISOString(),
        tags: ['prototype', 'testing'],
    },
    {
        ...projectData['Retail Display for In-Store Product Promotion'],
        name: 'Final Design Adjustments & Client Feedback',
        status: 'completed',
        details:
            'Incorporated final adjustments based on client feedback and prototype results.',
        link: 'https://example.com/display-final-design',
        dueAt: new Date(Date.now() - 4 * 86400000).toISOString(),
        tags: ['final-design', 'feedback'],
    },
    {
        ...projectData['Retail Display for In-Store Product Promotion'],
        name: 'Print & Graphic Design for Display Elements',
        status: 'completed',
        details:
            'Designed printed elements such as product info cards and promotional posters.',
        link: 'https://example.com/display-graphics',
        dueAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        tags: ['graphics', 'print'],
    },
    {
        ...projectData['Retail Display for In-Store Product Promotion'],
        name: 'In-Store Setup & Installation',
        status: 'completed',
        details:
            'Coordinated the installation of the display at the retail store.',
        link: 'https://example.com/display-installation',
        dueAt: new Date(Date.now() - 1 * 86400000).toISOString(),
        tags: ['installation', 'setup'],
    },
    {
        ...projectData['Retail Display for In-Store Product Promotion'],
        name: 'Customer Feedback Collection & Analysis',
        status: 'scheduled',
        details:
            'Collect and analyze customer feedback on the display’s effectiveness.',
        link: 'https://example.com/display-feedback',
        dueAt: new Date(Date.now() + 1 * 86400000).toISOString(),
        tags: ['feedback', 'analysis'],
    },
    {
        ...projectData['Retail Display for In-Store Product Promotion'],
        name: 'Sales Performance Review & Report',
        status: 'scheduled',
        details:
            'Review sales data to evaluate the success of the display promotion.',
        link: 'https://example.com/sales-performance',
        dueAt: new Date(Date.now() + 3 * 86400000).toISOString(),
        tags: ['sales', 'report'],
    },
    {
        ...projectData['Retail Display for In-Store Product Promotion'],
        name: 'Display Removal & Post-Promotion Assessment',
        status: 'scheduled',
        details:
            'Remove display after promotion ends and evaluate the overall impact.',
        link: 'https://example.com/display-removal',
        dueAt: new Date(Date.now() + 5 * 86400000).toISOString(),
        tags: ['removal', 'assessment'],
    },
];
const seedCustomerTestimonialsVideoForSkincareProductsData = (
    projectData: ProjectsData,
) => [
    {
        ...projectData['Customer Testimonials Video for Skincare Products'],
        name: 'Initial Concept & Storyboarding',
        status: 'completed',
        details:
            'Developed concept and storyboard for customer testimonial video.',
        link: 'https://example.com/testimonials-concept',
        dueAt: new Date(Date.now() - 10 * 86400000).toISOString(),
        tags: ['concept', 'storyboard'],
    },
    {
        ...projectData['Customer Testimonials Video for Skincare Products'],
        name: 'Casting & Talent Coordination',
        status: 'completed',
        details:
            'Coordinated with customers for testimonials and finalized the cast.',
        link: 'https://example.com/testimonials-casting',
        dueAt: new Date(Date.now() - 8 * 86400000).toISOString(),
        tags: ['casting', 'talent'],
    },
    {
        ...projectData['Customer Testimonials Video for Skincare Products'],
        name: 'Location Scouting & Set Design',
        status: 'completed',
        details:
            'Scouted filming locations and designed set for the testimonial video.',
        link: 'https://example.com/testimonials-location',
        dueAt: new Date(Date.now() - 6 * 86400000).toISOString(),
        tags: ['location', 'set-design'],
    },
    {
        ...projectData['Customer Testimonials Video for Skincare Products'],
        name: 'Filming Day 1: Customer Interviews',
        status: 'completed',
        details:
            'Filmed interviews with the first batch of customers sharing their experiences.',
        link: 'https://example.com/testimonials-filming-day1',
        dueAt: new Date(Date.now() - 4 * 86400000).toISOString(),
        tags: ['filming', 'interviews'],
    },
    {
        ...projectData['Customer Testimonials Video for Skincare Products'],
        name: 'Filming Day 2: Additional Customer Stories & B-Roll',
        status: 'completed',
        details:
            'Filmed additional testimonials and B-roll footage for product shots.',
        link: 'https://example.com/testimonials-filming-day2',
        dueAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        tags: ['filming', 'b-roll'],
    },
    {
        ...projectData['Customer Testimonials Video for Skincare Products'],
        name: 'Video Editing & First Cut Review',
        status: 'completed',
        details: 'Edited the video and provided a first cut for client review.',
        link: 'https://example.com/testimonials-editing',
        dueAt: new Date(Date.now() - 1 * 86400000).toISOString(),
        tags: ['editing', 'video'],
    },
    {
        ...projectData['Customer Testimonials Video for Skincare Products'],
        name: 'Final Cut & Approval',
        status: 'completed',
        details: 'Incorporated feedback and finalized the video for approval.',
        link: 'https://example.com/testimonials-final-cut',
        dueAt: new Date(Date.now()).toISOString(),
        tags: ['final-cut', 'approval'],
    },
    {
        ...projectData['Customer Testimonials Video for Skincare Products'],
        name: 'Sound Design & Final Audio Mix',
        status: 'scheduled',
        details: 'Add final sound design elements and mix audio for the video.',
        link: 'https://example.com/testimonials-sound',
        dueAt: new Date(Date.now() + 1 * 86400000).toISOString(),
        tags: ['sound', 'audio'],
    },
    {
        ...projectData['Customer Testimonials Video for Skincare Products'],
        name: 'Video Upload & Social Media Promotion',
        status: 'scheduled',
        details:
            'Upload the video to YouTube and social media platforms for promotion.',
        link: 'https://example.com/testimonials-upload',
        dueAt: new Date(Date.now() + 3 * 86400000).toISOString(),
        tags: ['upload', 'promotion'],
    },
    {
        ...projectData['Customer Testimonials Video for Skincare Products'],
        name: 'Customer Feedback Collection',
        status: 'scheduled',
        details:
            'Collect feedback from customers on the video’s impact and effectiveness.',
        link: 'https://example.com/testimonials-feedback',
        dueAt: new Date(Date.now() + 5 * 86400000).toISOString(),
        tags: ['feedback', 'effectiveness'],
    },
];
