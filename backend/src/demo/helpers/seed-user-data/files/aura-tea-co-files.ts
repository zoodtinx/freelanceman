import { getRandomFileSize, Ids } from '@/demo/helpers/seed-user-data/level-3';

export const generateNewTropicalBlissBlendPackagingDesignFiles = (ids: Ids) => {
    const projectKebabCase = 'new-tropical-bliss-blend-packaging-design';

    return [
        {
            originalName: 'tropical_bliss_concept_01.pdf',
            displayName: 'Tropical Bliss Packaging Concept 1',
            type: 'design',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/tropical_bliss_concept_01.pdf`,
            size: getRandomFileSize(1500, 3000),
            ...ids,
        },
        {
            originalName: 'tropical_bliss_concept_02.pdf',
            displayName: 'Tropical Bliss Packaging Concept 2',
            type: 'design',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/tropical_bliss_concept_02.pdf`,
            size: getRandomFileSize(1600, 3100),
            ...ids,
        },
        {
            originalName: 'tropical_bliss_concept_03.pdf',
            displayName: 'Tropical Bliss Packaging Concept 3',
            type: 'design',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/tropical_bliss_concept_03.pdf`,
            size: getRandomFileSize(1700, 3200),
            ...ids,
        },
        {
            originalName: 'client_feedback_summary_v1.docx',
            displayName: 'Client Feedback Summary Document',
            type: 'document',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/client_feedback_summary_v1.docx`,
            size: getRandomFileSize(150, 300),
            ...ids,
        },
        {
            originalName: 'revised_packaging_mockup_v1.psd',
            displayName: 'Revised Packaging Mockup Draft',
            type: 'design',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/revised_packaging_mockup_v1.psd`,
            size: getRandomFileSize(5000, 10000),
            ...ids,
        },
        {
            originalName: 'print_ready_packaging_final.ai',
            displayName: 'Print-Ready Packaging (Final)',
            type: 'design',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/print_ready_packaging_final.ai`,
            size: getRandomFileSize(8000, 15000),
            ...ids,
        },
        {
            originalName: '3d_packaging_render_presentation.mp4',
            displayName: '3D Packaging Render Video',
            type: 'video',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/3d_packaging_render_presentation.mp4`,
            size: getRandomFileSize(10000, 25000),
            ...ids,
        },
        {
            originalName: 'client_presentation_concepts.pptx',
            displayName: 'Client Concepts Presentation',
            type: 'presentation',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/client_presentation_concepts.pptx`,
            size: getRandomFileSize(800, 1500),
            ...ids,
        },
        {
            originalName: 'project_closure_report_packaging.pdf',
            displayName: 'Packaging Design Project Report',
            type: 'document',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/project_closure_report_packaging.pdf`,
            size: getRandomFileSize(400, 800),
            ...ids,
        },
        {
            originalName: 'aura_tea_brand_guidelines_v2.pdf',
            displayName: 'Aura Tea Brand Guidelines',
            type: 'document',
            category: 'asset',
            link: 'https://example.com/aura-tea-brand-guidelines.pdf',
            ...ids,
        },
        {
            originalName: 'aura_tea_logo_vector.ai',
            displayName: 'Aura Tea Logo (Vector)',
            type: 'design',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/aura_tea_logo_vector.ai`,
            size: getRandomFileSize(200, 500),
            ...ids,
        },
        {
            originalName: 'tropical_fruit_premium_pack.zip',
            displayName: 'Premium Tropical Fruit Stock Photos',
            type: 'archive',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/tropical_fruit_premium_pack.zip`,
            size: getRandomFileSize(50000, 100000),
            ...ids,
        },
        {
            originalName: 'competitor_packaging_benchmarks.pdf',
            displayName: 'Competitor Packaging Benchmark Report',
            type: 'document',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/competitor_packaging_benchmarks.pdf`,
            size: getRandomFileSize(300, 600),
            ...ids,
        },
        {
            originalName: 'aura_tea_product_specs_2025.xlsx',
            displayName: 'Aura Tea Product Specifications',
            type: 'spreadsheet',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/aura_tea_product_specs_2025.xlsx`,
            size: getRandomFileSize(100, 250),
            ...ids,
        },
        {
            originalName: 'design_inspiration_board_link.miro',
            displayName: 'Design Inspiration Moodboard (Miro)',
            type: 'design',
            category: 'asset',
            link: 'https://miro.com/app/board/example_aura_tea_packaging/',
            ...ids,
        },
        {
            originalName: 'packaging_supplier_quotes_june.pdf',
            displayName: 'Packaging Supplier Quotes',
            type: 'document',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/packaging_supplier_quotes_june.pdf`,
            size: getRandomFileSize(200, 400),
            ...ids,
        },
    ];
};

export const generateQ3SocialMediaContentEngagementStrategyFiles = (
    ids: Ids,
) => {
    const projectKebabCase = 'q3-social-media-content-engagement-strategy';

    return [
        {
            originalName: 'q3_strategy_document_final.pdf',
            displayName: 'Q3 Social Media Strategy Document',
            type: 'document',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/q3_strategy_document_final.pdf`,
            size: getRandomFileSize(500, 1000),
            ...ids,
        },
        {
            originalName: 'content_calendar_july_sep_v3.xlsx',
            displayName: 'Q3 Content Calendar (July-September)',
            type: 'spreadsheet',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/content_calendar_july_sep_v3.xlsx`,
            size: getRandomFileSize(200, 400),
            ...ids,
        },
        {
            originalName: 'engagement_plan_outline.docx',
            displayName: 'Engagement Plan Outline',
            type: 'document',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/engagement_plan_outline.docx`,
            size: getRandomFileSize(100, 200),
            ...ids,
        },
        {
            originalName: 'graphic_asset_pack_q3_v1.zip',
            displayName: 'Q3 Graphic Assets (Batch 1)',
            type: 'archive',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/graphic_asset_pack_q3_v1.zip`,
            size: getRandomFileSize(20000, 40000),
            ...ids,
        },
        {
            originalName: 'healthy_lifestyle_angles_report.pdf',
            displayName: 'Healthy Lifestyle Content Angles',
            type: 'document',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/healthy_lifestyle_angles_report.pdf`,
            size: getRandomFileSize(300, 600),
            ...ids,
        },
        {
            originalName: 'ugc_guidelines_aura_tea.pdf',
            displayName: 'User-Generated Content Guidelines',
            type: 'document',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/ugc_guidelines_aura_tea.pdf`,
            size: getRandomFileSize(150, 300),
            ...ids,
        },
        {
            originalName: 'social_media_performance_template.xlsx',
            displayName: 'Social Media Performance Tracking',
            type: 'spreadsheet',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/social_media_performance_template.xlsx`,
            size: getRandomFileSize(80, 150),
            ...ids,
        },
        {
            originalName: 'q3_launch_presentation_draft.pptx',
            displayName: 'Q3 Launch Presentation Draft',
            type: 'presentation',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/q3_launch_presentation_draft.pptx`,
            size: getRandomFileSize(700, 1200),
            ...ids,
        },
        {
            originalName: 'competitor_social_media_analysis.pdf',
            displayName: 'Competitor Social Media Analysis',
            type: 'document',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/competitor_social_media_analysis.pdf`,
            size: getRandomFileSize(400, 800),
            ...ids,
        },
        {
            originalName: 'aura_tea_marketing_assets_drive.link',
            displayName: 'Aura Tea Marketing Assets (Drive)',
            type: 'other',
            category: 'asset',
            link: 'https://drive.google.com/drive/folders/aura_tea_marketing_assets_q3',
            ...ids,
        },
        {
            originalName: 'stock_video_clips_healthy_living.zip',
            displayName: 'Stock Video Clips (Healthy Living)',
            type: 'archive',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/stock_video_clips_healthy_living.zip`,
            size: getRandomFileSize(50000, 80000),
            ...ids,
        },
        {
            originalName: 'influencer_research_data.xlsx',
            displayName: 'Influencer Research Data',
            type: 'spreadsheet',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/influencer_research_data.xlsx`,
            size: getRandomFileSize(150, 300),
            ...ids,
        },
        {
            originalName: 'content_creation_brief_templates.docx',
            displayName: 'Content Creation Brief Templates',
            type: 'document',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/content_creation_brief_templates.docx`,
            size: getRandomFileSize(80, 150),
            ...ids,
        },
        {
            originalName: 'aura_tea_social_media_accounts.txt',
            displayName: 'Aura Tea Social Media Account Details',
            type: 'document',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/aura_tea_social_media_accounts.txt`,
            size: getRandomFileSize(10, 30),
            ...ids,
        },
    ];
};

export const generateBrandStoryVideoForAboutUsPageFiles = (ids: Ids) => {
    const projectKebabCase = 'brand-story-video-for-about-us-page';

    return [
        {
            originalName: 'video_project_brief_aura_tea.pdf',
            displayName: 'Video Project Brief',
            type: 'document',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/video_project_brief_aura_tea.pdf`,
            size: getRandomFileSize(300, 600),
            ...ids,
        },
        {
            originalName: 'script_draft_1_aura_tea_v3.docx',
            displayName: 'Script Draft 1 (Final)',
            type: 'document',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/script_draft_1_aura_tea_v3.docx`,
            size: getRandomFileSize(150, 300),
            ...ids,
        },
        {
            originalName: 'storyboard_concepts_v2.pdf',
            displayName: 'Storyboard Concepts',
            type: 'design',
            category: 'work',
            link: 'https://docs.google.com/presentation/d/auratea_storyboard_v2', // Changed to link
            ...ids,
        },
        {
            originalName: 'client_feedback_summary_video.xlsx',
            displayName: 'Client Feedback Log',
            type: 'spreadsheet',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/client_feedback_summary_video.xlsx`,
            size: getRandomFileSize(50, 100),
            ...ids,
        },
        {
            originalName: 'chiang_rai_location_scout_report.pdf',
            displayName: 'Chiang Rai Location Scout Report',
            type: 'document',
            category: 'work',
            link: 'https://example.com/chiang_rai_scout_report.pdf', // Changed to link
            ...ids,
        },
        {
            originalName: 'budget_confirmation_form_video.pdf',
            displayName: 'Budget Confirmation Form',
            type: 'document',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/budget_confirmation_form_video.pdf`,
            size: getRandomFileSize(80, 150),
            ...ids,
        },
        {
            originalName: 'project_status_update_june_11.pptx',
            displayName: 'Project Status Update (June 11)',
            type: 'presentation',
            category: 'work',
            link: 'https://slideshare.net/auratea_project_status_june11', // Changed to link
            ...ids,
        },
        {
            originalName: 'aura_tea_about_us_page_copy.docx',
            displayName: 'About Us Page Copy',
            type: 'document',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/aura_tea_about_us_page_copy.docx`,
            size: getRandomFileSize(50, 100),
            ...ids,
        },
        {
            originalName: 'brand_archive_photos.zip',
            displayName: 'Aura Tea Brand Photo Archive',
            type: 'archive',
            category: 'asset',
            link: 'https://photos.google.com/share/aura_tea_brand_archive', // Changed to link
            ...ids,
        },
        {
            originalName: 'interview_questions_template.docx',
            displayName: 'Interview Questions Template',
            type: 'document',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/interview_questions_template.docx`,
            size: getRandomFileSize(30, 70),
            ...ids,
        },
        {
            originalName: 'mr_sakda_contact_details.vcf',
            displayName: 'Mr. Sakda Contact Card',
            type: 'other',
            category: 'asset',
            link: 'https://contacts.google.com/auratea_sakda', // Changed to link
            ...ids,
        },
        {
            originalName: 'video_equipment_rental_list.pdf',
            displayName: 'Video Equipment Rental List',
            type: 'document',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/video_equipment_rental_list.pdf`,
            size: getRandomFileSize(100, 200),
            ...ids,
        },
        {
            originalName: 'music_licensing_options.xlsx',
            displayName: 'Music Licensing Options',
            type: 'spreadsheet',
            category: 'asset',
            link: 'https://docs.google.com/spreadsheets/d/music_licensing_options_aura', // Changed to link
            ...ids,
        },
    ];
};

export const getAuraTeaCoFiles = (ids: Ids) => {
    const auraTeaCoFileGenerators: [string, any][] = [
        [
            'New Tropical Bliss Blend Packaging Design',
            generateNewTropicalBlissBlendPackagingDesignFiles,
        ],
        [
            'Q3 Social Media Content & Engagement Strategy',
            generateQ3SocialMediaContentEngagementStrategyFiles,
        ],
        [
            "Brand Story Video for 'About Us' Page",
            generateBrandStoryVideoForAboutUsPageFiles,
        ],
    ];

    return auraTeaCoFileGenerators.flatMap(([projectTitle, generateFn]) => {
        const projectIds = ids[projectTitle];

        if (!projectIds) {
            console.warn(
                `Warning: IDs not found for project: "${projectTitle}" for Aura Tea Co. No files generated.`,
            );
            return [];
        }

        return generateFn(projectIds);
    });
};
