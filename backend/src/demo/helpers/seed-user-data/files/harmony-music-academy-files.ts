import { getRandomFileSize, Ids } from '@/demo/helpers/seed-user-data/level-3';

export const generateAnnualStudentConcertBrandingTicketsFiles = (ids: Ids) => {
    const projectKebabCase = 'annual-student-concert-branding-tickets';

    return [
        // Work Category Files (9 files)
        {
            originalName: 'concert_branding_brief_final.pdf',
            name: 'Concert Branding Brief',
            type: 'document',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/concert_branding_brief_final.pdf`,
            size: getRandomFileSize(300, 600),
            ...ids,
        },
        {
            originalName: 'poster_design_concept_v2.ai',
            name: 'Poster Design Concept',
            type: 'design',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/poster_design_concept_v2.ai`,
            size: getRandomFileSize(4000, 8000),
            ...ids,
        },
        {
            originalName: 'ticket_design_mockup_final.pdf',
            name: 'Ticket Design Mockup',
            type: 'design',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/ticket_design_mockup_final.pdf`,
            size: getRandomFileSize(1000, 2000),
            ...ids,
        },
        {
            originalName: 'social_media_ad_creatives_pack.zip',
            name: 'Social Media Ad Creatives',
            type: 'image',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/social_media_ad_creatives_pack.zip`,
            size: getRandomFileSize(15000, 30000),
            ...ids,
        },
        {
            originalName: 'program_booklet_layout_draft.pdf',
            name: 'Program Booklet Layout Draft',
            type: 'design',
            category: 'work',
            link: 'https://issuu.com/',
            ...ids,
        },
        {
            originalName: 'client_feedback_summary_branding.xlsx',
            name: 'Client Feedback Summary',
            type: 'spreadsheet',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/client_feedback_summary_branding.xlsx`,
            size: getRandomFileSize(80, 150),
            ...ids,
        },
        {
            originalName: 'print_specifications_final.pdf',
            name: 'Print Specifications (Final)',
            type: 'document',
            category: 'work',
            link: 'https://www.moo.com/',
            ...ids,
        },
        {
            originalName: 'event_day_signage_designs.zip',
            name: 'Event Day Signage Designs',
            type: 'design',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/event_day_signage_designs.zip`,
            size: getRandomFileSize(7000, 14000),
            ...ids,
        },
        {
            originalName: 'ticket_sales_report_template.xlsx',
            name: 'Ticket Sales Report Template',
            type: 'spreadsheet',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/ticket_sales_report_template.xlsx`,
            size: getRandomFileSize(50, 100),
            ...ids,
        },

        // Asset Category Files (7 files)
        {
            originalName: 'school_brand_guidelines.pdf',
            name: 'School Brand Guidelines',
            type: 'document',
            category: 'asset',
            link: 'https://www.brandnew.com/',
            ...ids,
        },
        {
            originalName: 'student_performance_photos_archive.zip',
            name: 'Student Performance Photo Archive',
            type: 'image',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/student_performance_photos_archive.zip`,
            size: getRandomFileSize(50000, 100000),
            ...ids,
        },
        {
            originalName: 'concert_venue_floor_plans.pdf',
            name: 'Concert Venue Floor Plans',
            type: 'document',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/concert_venue_floor_plans.pdf`,
            size: getRandomFileSize(300, 600),
            ...ids,
        },
        {
            originalName: 'typography_font_licenses.pdf',
            name: 'Typography Font Licenses',
            type: 'document',
            category: 'asset',
            link: 'https://fonts.google.com/',
            ...ids,
        },
        {
            originalName: 'past_concert_marketing_materials.zip',
            name: 'Past Concert Marketing Materials',
            type: 'archive',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/past_concert_marketing_materials.zip`,
            size: getRandomFileSize(10000, 20000),
            ...ids,
        },
        {
            originalName: 'sponsor_logos_collection.zip',
            name: 'Sponsor Logos Collection',
            type: 'image',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/sponsor_logos_collection.zip`,
            size: getRandomFileSize(2000, 4000),
            ...ids,
        },
        {
            originalName: 'ticket_platform_integration_docs.pdf',
            name: 'Ticket Platform Integration Docs',
            type: 'document',
            category: 'asset',
            link: 'https://www.eventbrite.com/',
            ...ids,
        },
    ];
};

export const generateNewOnlineCourseLandingPageGuitarBasicsFiles = (
    ids: Ids,
) => {
    const projectKebabCase = 'new-online-course-landing-page-guitar-basics';

    return [
        // Work Category Files (9 files)
        {
            originalName: 'course_landing_page_brief.pdf',
            name: 'Course Landing Page Brief',
            type: 'document',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/course_landing_page_brief.pdf`,
            size: getRandomFileSize(300, 600),
            ...ids,
        },
        {
            originalName: 'lp_wireframes_mockups_v3.fig',
            name: 'Landing Page Wireframes & Mockups',
            type: 'design',
            category: 'work',
            link: 'https://www.figma.com/',
            ...ids,
        },
        {
            originalName: 'hero_section_ad_creatives.zip',
            name: 'Hero Section Ad Creatives',
            type: 'image',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/hero_section_ad_creatives.zip`,
            size: getRandomFileSize(10000, 20000),
            ...ids,
        },
        {
            originalName: 'course_curriculum_outline.pdf',
            name: 'Course Curriculum Outline',
            type: 'document',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/course_curriculum_outline.pdf`,
            size: getRandomFileSize(150, 300),
            ...ids,
        },
        {
            originalName: 'instructor_introduction_video_edit.mp4',
            name: 'Instructor Intro Video Edit',
            type: 'video',
            category: 'work',
            link: 'https://www.youtube.com/',
            ...ids,
        },
        {
            originalName: 'testimonial_collection_plan.xlsx',
            name: 'Testimonial Collection Plan',
            type: 'spreadsheet',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/testimonial_collection_plan.xlsx`,
            size: getRandomFileSize(70, 140),
            ...ids,
        },
        {
            originalName: 'call_to_action_buttons_designs.ai',
            name: 'Call to Action Button Designs',
            type: 'design',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/call_to_action_buttons_designs.ai`,
            size: getRandomFileSize(500, 1000),
            ...ids,
        },
        {
            originalName: 'ab_testing_strategy_lp.pdf',
            name: 'A/B Testing Strategy (Landing Page)',
            type: 'document',
            category: 'work',
            link: 'https://vwo.com/',
            ...ids,
        },
        {
            originalName: 'course_launch_marketing_plan_draft.pptx',
            name: 'Course Launch Marketing Plan Draft',
            type: 'presentation',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/course_launch_marketing_plan_draft.pptx`,
            size: getRandomFileSize(800, 1600),
            ...ids,
        },

        // Asset Category Files (7 files)
        {
            originalName: 'guitar_basics_course_modules.zip',
            name: 'Guitar Basics Course Modules (Raw)',
            type: 'archive',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/guitar_basics_course_modules.zip`,
            size: getRandomFileSize(50000, 100000),
            ...ids,
        },
        {
            originalName: 'urbanflow_academy_brand_assets.zip',
            name: 'UrbanFlow Academy Brand Assets',
            type: 'archive',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/urbanflow_academy_brand_assets.zip`,
            size: getRandomFileSize(10000, 25000),
            ...ids,
        },
        {
            originalName: 'stock_music_for_videos.zip',
            name: 'Stock Music for Videos',
            type: 'audio',
            category: 'asset',
            link: 'https://www.bensound.com/',
            ...ids,
        },
        {
            originalName: 'competitor_course_analysis.pdf',
            name: 'Competitor Course Analysis',
            type: 'document',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/competitor_course_analysis.pdf`,
            size: getRandomFileSize(200, 400),
            ...ids,
        },
        {
            originalName: 'instructor_photoshoot_selection.zip',
            name: 'Instructor Photoshoot Selection',
            type: 'image',
            category: 'asset',
            link: 'https://www.pexels.com/',
            ...ids,
        },
        {
            originalName: 'email_list_segmentation_strategy.xlsx',
            name: 'Email List Segmentation Strategy',
            type: 'spreadsheet',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/email_list_segmentation_strategy.xlsx`,
            size: getRandomFileSize(80, 160),
            ...ids,
        },
        {
            originalName: 'video_hosting_platform_details.txt',
            name: 'Video Hosting Platform Details',
            type: 'other',
            category: 'asset',
            link: 'https://www.vimeo.com/',
            ...ids,
        },
    ];
};

export const generateMusicTheoryBlogContentStrategyFirst5ArticlesFiles = (
    ids: Ids,
) => {
    const projectKebabCase =
        'music-theory-blog-content-strategy-first-5-articles';

    return [
        // Work Category Files (9 files)
        {
            originalName: 'blog_content_strategy_brief.pdf',
            name: 'Blog Content Strategy Brief',
            type: 'document',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/blog_content_strategy_brief.pdf`,
            size: getRandomFileSize(300, 600),
            ...ids,
        },
        {
            originalName: 'keyword_research_and_seo_plan.xlsx',
            name: 'Keyword Research & SEO Plan',
            type: 'spreadsheet',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/keyword_research_and_seo_plan.xlsx`,
            size: getRandomFileSize(150, 300),
            ...ids,
        },
        {
            originalName: 'article_1_introduction_to_scales_draft.docx',
            name: 'Article 1: Intro to Scales (Draft)',
            type: 'document',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/article_1_introduction_to_scales_draft.docx`,
            size: getRandomFileSize(80, 150),
            ...ids,
        },
        {
            originalName: 'article_2_chords_and_progressions_outline.pdf',
            name: 'Article 2: Chords & Progressions (Outline)',
            type: 'document',
            category: 'work',
            link: 'https://www.thefretboard.com/',
            ...ids,
        },
        {
            originalName: 'article_3_rhythm_and_meter_concepts.docx',
            name: 'Article 3: Rhythm & Meter Concepts',
            type: 'document',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/article_3_rhythm_and_meter_concepts.docx`,
            size: getRandomFileSize(70, 140),
            ...ids,
        },
        {
            originalName: 'article_4_intervals_and_harmony_draft.docx',
            name: 'Article 4: Intervals & Harmony (Draft)',
            type: 'document',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/article_4_intervals_and_harmony_draft.docx`,
            size: getRandomFileSize(90, 180),
            ...ids,
        },
        {
            originalName: 'article_5_basic_ear_training_exercises.pdf',
            name: 'Article 5: Basic Ear Training Exercises',
            type: 'document',
            category: 'work',
            link: 'https://www.teoria.com/',
            ...ids,
        },
        {
            originalName: 'content_calendar_q3_draft.xlsx',
            name: 'Q3 Content Calendar Draft',
            type: 'spreadsheet',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/content_calendar_q3_draft.xlsx`,
            size: getRandomFileSize(100, 200),
            ...ids,
        },
        {
            originalName: 'blog_post_image_assets.zip',
            name: 'Blog Post Image Assets',
            type: 'image',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/blog_post_image_assets.zip`,
            size: getRandomFileSize(5000, 10000),
            ...ids,
        },

        // Asset Category Files (7 files)
        {
            originalName: 'urbanflow_academy_style_guide.pdf',
            name: 'UrbanFlow Academy Style Guide',
            type: 'document',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/urbanflow_academy_style_guide.pdf`,
            size: getRandomFileSize(400, 800),
            ...ids,
        },
        {
            originalName: 'music_notation_symbols_pack.zip',
            name: 'Music Notation Symbols Pack',
            type: 'archive',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/music_notation_symbols_pack.zip`,
            size: getRandomFileSize(1000, 2000),
            ...ids,
        },
        {
            originalName: 'competitor_blog_analysis.pdf',
            name: 'Competitor Blog Analysis',
            type: 'document',
            category: 'asset',
            link: 'https://www.musicradar.com/',
            ...ids,
        },
        {
            originalName: 'royalty_free_music_samples.zip',
            name: 'Royalty-Free Music Samples',
            type: 'audio',
            category: 'asset',
            link: 'https://www.zapsplat.com/',
            ...ids,
        },
        {
            originalName: 'google_analytics_access.txt',
            name: 'Google Analytics Access Details',
            type: 'other',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/google_analytics_access.txt`,
            size: getRandomFileSize(10, 30),
            ...ids,
        },
        {
            originalName: 'stock_illustration_sites_list.txt',
            name: 'Stock Illustration Sites List',
            type: 'other',
            category: 'asset',
            link: 'https://www.freepik.com/',
            ...ids,
        },
        {
            originalName: 'instructor_bio_and_photo.zip',
            name: 'Instructor Bio and Photo',
            type: 'image',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/instructor_bio_and_photo.zip`,
            size: getRandomFileSize(500, 1000),
            ...ids,
        },
    ];
};

export const getHarmonyMusicAcademyFiles = (ids: Ids) => {
    const harmonyMusicAcademyFileGenerators: [string, any][] = [
        [
            'Annual Student Concert Branding & Tickets',
            generateAnnualStudentConcertBrandingTicketsFiles,
        ],
        [
            'New Online Course Landing Page (Guitar Basics)',
            generateNewOnlineCourseLandingPageGuitarBasicsFiles,
        ],
        [
            'Music Theory Blog Content Strategy & First 5 Articles',
            generateMusicTheoryBlogContentStrategyFirst5ArticlesFiles,
        ],
    ];

    return harmonyMusicAcademyFileGenerators.flatMap(
        ([projectTitle, generateFn]) => {
            const projectIds = ids[projectTitle];

            if (!projectIds) {
                console.warn(
                    `Warning: IDs not found for project: "${projectTitle}" for Harmony Music Academy. No files generated.`,
                );
                return [];
            }

            return generateFn(projectIds);
        },
    );
};
