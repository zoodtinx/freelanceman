import { getRandomFileSize, Ids } from '@/demo/helpers/seed-user-data/level-3';

export const generateNewModelX2LaunchCampaignAssetsFiles = (ids: Ids) => {
    const projectKebabCase = 'new-model-x2-launch-campaign-assets';

    return [
        // Work Category Files (9 files)
        {
            originalName: 'launch_campaign_brief_model_x2.pdf',
            name: 'Launch Campaign Brief (Model X-2)',
            type: 'document',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/launch_campaign_brief_model_x2.pdf`,
            size: getRandomFileSize(500, 1000),
            ...ids,
        },
        {
            originalName: 'digital_ad_creatives_pack_v1.zip',
            name: 'Digital Ad Creatives (Version 1)',
            type: 'image',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/digital_ad_creatives_pack_v1.zip`,
            size: getRandomFileSize(25000, 50000),
            ...ids,
        },
        {
            originalName: 'social_media_video_ad_15s.mp4',
            name: 'Social Media Video Ad (15s)',
            type: 'video',
            category: 'work',
            link: 'https://player.vimeo.com/',
            ...ids,
        },
        {
            originalName: 'press_release_draft_model_x2.docx',
            name: 'Press Release Draft (Model X-2)',
            type: 'document',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/press_release_draft_model_x2.docx`,
            size: getRandomFileSize(100, 200),
            ...ids,
        },
        {
            originalName: 'website_landing_page_mockup.fig',
            name: 'Landing Page Mockup',
            type: 'design',
            category: 'work',
            link: 'https://www.figma.com/',
            ...ids,
        },
        {
            originalName: 'email_newsletter_campaign_templates.zip',
            name: 'Email Newsletter Templates',
            type: 'design',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/email_newsletter_campaign_templates.zip`,
            size: getRandomFileSize(5000, 10000),
            ...ids,
        },
        {
            originalName: 'influencer_marketing_outreach_plan.xlsx',
            name: 'Influencer Marketing Outreach Plan',
            type: 'spreadsheet',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/influencer_marketing_outreach_plan.xlsx`,
            size: getRandomFileSize(150, 300),
            ...ids,
        },
        {
            originalName: 'launch_event_invitation_design.pdf',
            name: 'Launch Event Invitation Design',
            type: 'design',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/launch_event_invitation_design.pdf`,
            size: getRandomFileSize(800, 1600),
            ...ids,
        },
        {
            originalName: 'campaign_performance_dashboard_setup.pptx',
            name: 'Campaign Performance Dashboard Setup',
            type: 'presentation',
            category: 'work',
            link: 'https://www.tableau.com/',
            ...ids,
        },

        // Asset Category Files (7 files)
        {
            originalName: 'model_x2_product_photos_high_res.zip',
            name: 'Model X-2 High-Res Product Photos',
            type: 'image',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/model_x2_product_photos_high_res.zip`,
            size: getRandomFileSize(80000, 150000),
            ...ids,
        },
        {
            originalName: 'company_brand_guidelines_latest.pdf',
            name: 'Company Brand Guidelines (Latest)',
            type: 'document',
            category: 'asset',
            link: 'https://www.brandnew.com/',
            ...ids,
        },
        {
            originalName: 'competitor_launch_analysis.pdf',
            name: 'Competitor Launch Analysis',
            type: 'document',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/competitor_launch_analysis.pdf`,
            size: getRandomFileSize(300, 600),
            ...ids,
        },
        {
            originalName: 'target_market_research_report.pdf',
            name: 'Target Market Research Report',
            type: 'document',
            category: 'asset',
            link: 'https://www.statista.com/',
            ...ids,
        },
        {
            originalName: 'product_specs_and_features_model_x2.xlsx',
            name: 'Model X-2 Product Specs',
            type: 'spreadsheet',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/product_specs_and_features_model_x2.xlsx`,
            size: getRandomFileSize(100, 200),
            ...ids,
        },
        {
            originalName: 'stock_footage_urban_driving.zip',
            name: 'Stock Footage (Urban Driving)',
            type: 'video',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/stock_footage_urban_driving.zip`,
            size: getRandomFileSize(40000, 80000),
            ...ids,
        },
        {
            originalName: 'media_contact_list_final.xlsx',
            name: 'Media Contact List',
            type: 'spreadsheet',
            category: 'asset',
            link: 'https://www.cision.com/',
            ...ids,
        },
    ];
};

export const getEcoGlideElectricScootersFiles = (ids: Ids) => {
    const ecoGlideElectricScootersFileGenerators: [string, any][] = [
        [
            'New Model X-2 Launch Campaign Assets',
            generateNewModelX2LaunchCampaignAssetsFiles,
        ],
    ];

    return ecoGlideElectricScootersFileGenerators.flatMap(
        ([projectTitle, generateFn]) => {
            const projectIds = ids[projectTitle];

            if (!projectIds) {
                console.warn(
                    `Warning: IDs not found for project: "${projectTitle}" for Eco-Glide Electric Scooters. No files generated.`,
                );
                return [];
            }

            return generateFn(projectIds);
        },
    );
};
