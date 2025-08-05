import { getRandomFileSize, Ids } from '@/demo/helpers/seed-user-data/helper';

export const generateLuxuryCondoDevelopmentDigitalMarketingKitFiles = (
    ids: Ids,
) => {
    const projectKebabCase = 'luxury-condo-development-digital-marketing-kit';

    return [
        // Work Category Files (9 files)
        {
            originalName: 'marketing_kit_brief_final.pdf',
            name: 'Digital Marketing Kit Brief',
            type: 'document',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/marketing_kit_brief_final.pdf`,
            size: getRandomFileSize(400, 800),
            ...ids,
        },
        {
            originalName: '3d_renderings_selection.zip',
            name: '3D Renderings Selection',
            type: 'image',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/3d_renderings_selection.zip`,
            size: getRandomFileSize(50000, 100000),
            ...ids,
        },
        {
            originalName: 'social_media_campaign_assets.zip',
            name: 'Social Media Campaign Assets',
            type: 'image',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/social_media_campaign_assets.zip`,
            size: getRandomFileSize(20000, 40000),
            ...ids,
        },
        {
            originalName: 'website_content_copy_draft.docx',
            name: 'Website Content Copy Draft',
            type: 'document',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/website_content_copy_draft.docx`,
            size: getRandomFileSize(150, 300),
            ...ids,
        },
        {
            originalName: 'email_marketing_templates.zip',
            name: 'Email Marketing Templates',
            type: 'design',
            category: 'work',
            link: 'https://mailchimp.com/',
            ...ids,
        },
        {
            originalName: 'virtual_tour_video_edit_v1.mp4',
            name: 'Virtual Tour Video (Edit 1)',
            type: 'video',
            category: 'work',
            link: 'https://player.vimeo.com/',
            ...ids,
        },
        {
            originalName: 'brochure_design_digital_format.pdf',
            name: 'Digital Brochure Design',
            type: 'design',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/brochure_design_digital_format.pdf`,
            size: getRandomFileSize(2000, 4000),
            ...ids,
        },
        {
            originalName: 'client_presentation_june_10.pptx',
            name: 'Client Presentation (June 10)',
            type: 'presentation',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/client_presentation_june_10.pptx`,
            size: getRandomFileSize(1000, 2500),
            ...ids,
        },
        {
            originalName: 'marketing_budget_tracking.xlsx',
            name: 'Marketing Budget Tracking',
            type: 'spreadsheet',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/marketing_budget_tracking.xlsx`,
            size: getRandomFileSize(80, 150),
            ...ids,
        },

        // Asset Category Files (7 files)
        {
            originalName: 'condo_floor_plans_high_res.zip',
            name: 'High-Res Floor Plans',
            type: 'image',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/condo_floor_plans_high_res.zip`,
            size: getRandomFileSize(10000, 20000),
            ...ids,
        },
        {
            originalName: 'developer_brand_guidelines.pdf',
            name: 'Developer Brand Guidelines',
            type: 'document',
            category: 'asset',
            link: 'https://www.branding.com/',
            ...ids,
        },
        {
            originalName: 'luxury_lifestyle_stock_photos.zip',
            name: 'Luxury Lifestyle Stock Photos',
            type: 'image',
            category: 'asset',
            link: 'https://www.gettyimages.com/',
            ...ids,
        },
        {
            originalName: 'competitor_marketing_analysis.pdf',
            name: 'Competitor Marketing Analysis',
            type: 'document',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/competitor_marketing_analysis.pdf`,
            size: getRandomFileSize(300, 600),
            ...ids,
        },
        {
            originalName: 'target_audience_demographics.xlsx',
            name: 'Target Audience Demographics',
            type: 'spreadsheet',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/target_audience_demographics.xlsx`,
            size: getRandomFileSize(100, 200),
            ...ids,
        },
        {
            originalName: 'social_media_platform_specs.pdf',
            name: 'Social Media Platform Specs',
            type: 'document',
            category: 'asset',
            link: 'https://www.facebook.com/',
            ...ids,
        },
        {
            originalName: 'property_drone_footage_raw.mp4',
            name: 'Raw Drone Footage (Property)',
            type: 'video',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/property_drone_footage_raw.mp4`,
            size: getRandomFileSize(30000, 60000),
            ...ids,
        },
    ];
};

export const getHorizonRealEstateGroupFiles = (ids: Ids) => {
    const horizonRealEstateGroupFileGenerators: [string, any][] = [
        [
            'Luxury Condo Development - Digital Marketing Kit',
            generateLuxuryCondoDevelopmentDigitalMarketingKitFiles,
        ],
    ];

    return horizonRealEstateGroupFileGenerators.flatMap(
        ([projectTitle, generateFn]) => {
            const projectIds = ids[projectTitle];

            if (!projectIds) {
                console.warn(
                    `Warning: IDs not found for project: "${projectTitle}" for Horizon Real Estate Group. No files generated.`,
                );
                return [];
            }

            return generateFn(projectIds);
        },
    );
};
