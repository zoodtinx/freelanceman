import { getRandomFileSize, Ids } from '@/demo/helpers/seed-user-data/helper';

export const generateNewSummerMenuDesignPhotographyFiles = (ids: Ids) => {
    const projectKebabCase = 'new-summer-menu-design-photography';

    return [
        // Work Category Files (9 files)
        {
            originalName: 'menu_design_brief_final.pdf',
            name: 'Summer Menu Design Brief',
            type: 'document',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/menu_design_brief_final.pdf`,
            size: getRandomFileSize(300, 600),
            ...ids,
        },
        {
            originalName: 'menu_layout_concepts_v3.ai',
            name: 'Menu Layout Concepts',
            type: 'design',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/menu_layout_concepts_v3.ai`,
            size: getRandomFileSize(4000, 8000),
            ...ids,
        },
        {
            originalName: 'food_photography_schedule.pdf',
            name: 'Food Photography Schedule',
            type: 'document',
            category: 'work',
            s3Key: `${ids.userId}/projects/new-tropical-bliss-blend-packaging-design/tropical_bliss_concept_02.pdf`,
            size: getRandomFileSize(1600, 3100),
            ...ids,
        },
        {
            originalName: 'edited_food_photos_batch1.zip',
            name: 'Edited Food Photos (Batch 1)',
            type: 'image',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/edited_food_photos_batch1.zip`,
            size: getRandomFileSize(20000, 40000),
            ...ids,
        },
        {
            originalName: 'dessert_menu_draft_v1.pdf',
            name: 'Dessert Menu Draft',
            type: 'design',
            category: 'work',
            s3Key: `${ids.userId}/projects/new-tropical-bliss-blend-packaging-design/tropical_bliss_concept_02.pdf`,
            size: getRandomFileSize(1600, 3100),
            ...ids,
        },
        {
            originalName: 'drink_menu_draft_v1.pdf',
            name: 'Drink Menu Draft',
            type: 'design',
            category: 'work',
            s3Key: `${ids.userId}/projects/new-tropical-bliss-blend-packaging-design/tropical_bliss_concept_02.pdf`,
            size: getRandomFileSize(1600, 3100),
            ...ids,
        },
        {
            originalName: 'final_menu_print_ready.pdf',
            name: 'Final Menu (Print-Ready)',
            type: 'design',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/final_menu_print_ready.pdf`,
            size: getRandomFileSize(6000, 12000),
            ...ids,
        },
        {
            originalName: 'client_feedback_summary_menu.xlsx',
            name: 'Client Feedback Summary',
            type: 'spreadsheet',
            category: 'work',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/client_feedback_summary_menu.xlsx`,
            size: getRandomFileSize(100, 200),
            ...ids,
        },
        {
            originalName: 'marketing_promo_creatives_menu.zip',
            name: 'Marketing Promo Creatives',
            type: 'image',
            category: 'work',
            s3Key: `${ids.userId}/projects/new-tropical-bliss-blend-packaging-design/tropical_bliss_concept_02.pdf`,
            size: getRandomFileSize(1600, 3100),
            ...ids,
        },

        // Asset Category Files (7 files)
        {
            originalName: 'restaurant_branding_guide.pdf',
            name: 'Restaurant Branding Guide',
            type: 'document',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/restaurant_branding_guide.pdf`,
            size: getRandomFileSize(500, 1000),
            ...ids,
        },
        {
            originalName: 'chef_recipe_notes.docx',
            name: 'Chef Recipe Notes',
            type: 'document',
            category: 'asset',
            s3Key: `${ids.userId}/projects/new-tropical-bliss-blend-packaging-design/tropical_bliss_concept_02.pdf`,
            size: getRandomFileSize(1600, 3100),
            ...ids,
        },
        {
            originalName: 'restaurant_interior_photos.zip',
            name: 'Restaurant Interior Photos',
            type: 'image',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/restaurant_interior_photos.zip`,
            size: getRandomFileSize(15000, 30000),
            ...ids,
        },
        {
            originalName: 'stock_food_photography_sites.txt',
            name: 'Stock Food Photography Sites List',
            type: 'other',
            category: 'asset',
            s3Key: `${ids.userId}/projects/new-tropical-bliss-blend-packaging-design/tropical_bliss_concept_02.pdf`,
            size: getRandomFileSize(1600, 3100),
            ...ids,
        },
        {
            originalName: 'competitor_menu_examples.pdf',
            name: 'Competitor Menu Examples',
            type: 'document',
            category: 'asset',
            s3Key: `${ids.userId}/projects/new-tropical-bliss-blend-packaging-design/tropical_bliss_concept_02.pdf`,
            size: getRandomFileSize(1600, 3100),
            ...ids,
        },
        {
            originalName: 'food_styling_inspiration.zip',
            name: 'Food Styling Inspiration',
            type: 'image',
            category: 'asset',
            s3Key: `${ids.userId}/projects/${projectKebabCase}/food_styling_inspiration.zip`,
            size: getRandomFileSize(10000, 20000),
            ...ids,
        },
        {
            originalName: 'printer_specifications_menu.pdf',
            name: 'Printer Specifications',
            type: 'document',
            category: 'asset',
            s3Key: `${ids.userId}/projects/new-tropical-bliss-blend-packaging-design/tropical_bliss_concept_02.pdf`,
            size: getRandomFileSize(1600, 3100),
            ...ids,
        },
    ];
};

export const getGoldenSpoonEateryFiles = (ids: Ids) => {
    const goldenSpoonEateryFileGenerators: [string, any][] = [
        [
            'New Summer Menu Design & Photography',
            generateNewSummerMenuDesignPhotographyFiles,
        ],
    ];

    return goldenSpoonEateryFileGenerators.flatMap(
        ([projectTitle, generateFn]) => {
            const projectIds = ids[projectTitle];

            if (!projectIds) {
                console.warn(
                    `Warning: IDs not found for project: "${projectTitle}" for Golden Spoon Eatery. No files generated.`,
                );
                return [];
            }

            return generateFn(projectIds);
        },
    );
};
