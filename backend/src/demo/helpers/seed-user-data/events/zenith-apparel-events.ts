import { getRelativeDate, Ids } from '@/demo/helpers/seed-user-data/level-3';

export const generateAutumnWinter2025LookbookPhotographyDesignEvents = (
    ids: Ids,
) => {
    return [
        // Finished Events (3)
        {
            name: 'Initial Concept Meeting',
            dueAt: getRelativeDate(-30, true), // Approx. May 12
            details:
                'Held kick-off meeting to discuss the Autumn/Winter 2025 lookbook.',
            isWithTime: true,
            tags: ['meeting', 'lookbook', 'fashion'],
            ...ids,
        },
        {
            name: 'Location Scouting Trip',
            dueAt: getRelativeDate(-25, false), // Approx. May 17
            details:
                'Scouted potential outdoor locations for the lookbook photoshoot in Hua Hin.',
            isWithTime: false,
            tags: ['location', 'scout', 'travel'],
            ...ids,
        },
        {
            name: 'Model Casting Call',
            dueAt: getRelativeDate(-15, true), // Approx. May 27
            details:
                'Conducted the model casting call for the Autumn/Winter 2025 lookbook.',
            isWithTime: true,
            tags: ['casting', 'model', 'fashion'],
            ...ids,
        },
        // Upcoming Events (7)
        {
            name: 'Model Casting Selections',
            dueAt: getRelativeDate(4, true), // June 15th (as per note)
            details: 'Finalize model selections for the lookbook photoshoot.',
            isWithTime: true,
            tags: ['model', 'selection', 'fashion'],
            ...ids,
        },
        {
            name: 'Shoot Pre-Production Meeting',
            dueAt: getRelativeDate(10, false), // June 21
            details:
                'Pre-production meeting to finalize all details for the Hua Hin photoshoot.',
            isWithTime: false,
            tags: ['preprod', 'shoot', 'logistics'],
            ...ids,
        },
        {
            name: 'Hua Hin Photoshoot - Day 1',
            dueAt: getRelativeDate(24, true), // July 5th (as per note)
            details: 'First day of the lookbook photoshoot in Hua Hin.',
            isWithTime: true,
            tags: ['shoot', 'location', 'fashion'],
            ...ids,
        },
        {
            name: 'Hua Hin Photoshoot - Day 2',
            dueAt: getRelativeDate(25, true), // July 6th (as per note)
            details: 'Second day of the lookbook photoshoot in Hua Hin.',
            isWithTime: true,
            tags: ['shoot', 'location', 'fashion'],
            ...ids,
        },
        {
            name: 'Hua Hin Photoshoot - Day 3',
            dueAt: getRelativeDate(26, true), // July 7th (as per note)
            details:
                'Third and final day of the lookbook photoshoot in Hua Hin.',
            isWithTime: true,
            tags: ['shoot', 'location', 'fashion'],
            ...ids,
        },
        {
            name: 'Image Selection & Retouching',
            dueAt: getRelativeDate(30, false), // July 11
            details:
                'Select final images and begin retouching process for the lookbook.',
            isWithTime: false,
            tags: ['image', 'retouch', 'postprod'],
            ...ids,
        },
        {
            name: 'Lookbook Design & Layout',
            dueAt: getRelativeDate(35, true), // July 16
            details:
                "Design and layout the final lookbook, adhering to the client's minimalist aesthetic.",
            isWithTime: true,
            tags: ['design', 'layout', 'lookbook'],
            ...ids,
        },
    ];
};

export const generateEcommerceProductPageCopywritingRefreshEvents = (
    ids: Ids,
) => {
    return [
        // Finished Events (3)
        {
            name: 'Initial Copy Briefing',
            dueAt: getRelativeDate(-25, true), // Approx. May 17
            details:
                'Held kick-off meeting to discuss the product page copywriting refresh.',
            isWithTime: true,
            tags: ['brief', 'copywriting', 'ecommerce'],
            ...ids,
        },
        {
            name: 'Copywriting Drafts',
            dueAt: getRelativeDate(-15, false), // Approx. May 27
            details: 'Completed the initial drafts for the product page copy.',
            isWithTime: false,
            tags: ['copywriting', 'draft'],
            ...ids,
        },
        {
            name: 'Copy Delivered & Implemented',
            dueAt: getRelativeDate(-10, true), // June 1st (as per note)
            details:
                'Delivered and implemented the refreshed product page copy on the e-commerce site.',
            isWithTime: true,
            tags: ['delivery', 'copywriting', 'ecommerce'],
            ...ids,
        },
        // Upcoming Events (7) - mostly post-completion follow-ups
        {
            name: 'Analytics Review - Copy Impact',
            dueAt: getRelativeDate(3, true), // June 14
            details:
                'Review analytics data to assess the impact of the refreshed copy on user engagement.',
            isWithTime: true,
            tags: ['analytics', 'ecommerce', 'review'],
            ...ids,
        },
        {
            name: 'Client Follow-up & Feedback',
            dueAt: getRelativeDate(5, false), // June 16
            details:
                'Follow up with Zenith Apparel to gather feedback on the new copy.',
            isWithTime: false,
            tags: ['client', 'feedback'],
            ...ids,
        },
        {
            name: 'Testimonial Request Follow-up',
            dueAt: getRelativeDate(7, true), // June 18 (next week)
            details:
                'Follow up with Zenith Apparel to request a testimonial about the copywriting refresh.',
            isWithTime: true,
            tags: ['testimonial', 'client'],
            ...ids,
        },
        {
            name: 'Case Study Outline',
            dueAt: getRelativeDate(12, false), // June 23
            details:
                'Outline a potential case study highlighting the success of the copywriting refresh.',
            isWithTime: false,
            tags: ['case', 'marketing'],
            ...ids,
        },
        {
            name: 'Portfolio Update',
            dueAt: getRelativeDate(17, true), // June 28
            details:
                'Update internal portfolio with details and results of the product page copywriting project.',
            isWithTime: true,
            tags: ['portfolio', 'update'],
            ...ids,
        },
        {
            name: 'Future Copy Needs Discussion',
            dueAt: getRelativeDate(22, true), // July 3
            details:
                'Discuss potential future copywriting needs with Zenith Apparel.',
            isWithTime: true,
            tags: ['copywriting', 'client'],
            ...ids,
        },
        {
            name: 'Project File Archiving',
            dueAt: getRelativeDate(30, false), // July 11
            details:
                'Archive all project files related to the e-commerce product page copywriting refresh.',
            isWithTime: false,
            tags: ['archive', 'files'],
            ...ids,
        },
    ];
};

export const generateSustainableCollectionLaunchSocialMediaCampaignEvents = (
    ids: Ids,
) => {
    return [
        // Finished Events (3)
        {
            name: 'Project Kick-off Meeting',
            dueAt: getRelativeDate(-25, true), // Approx. May 17
            details:
                'Held kick-off meeting to align on the Sustainable Collection Social Media Campaign goals.',
            isWithTime: true,
            tags: ['kickoff', 'social', 'campaign'],
            ...ids,
        },
        {
            name: 'Initial Campaign Calendar Approved',
            dueAt: getRelativeDate(-10, true), // Approx. June 1 (as per note)
            details:
                'Received approval on the initial campaign calendar and key dates.',
            isWithTime: true,
            tags: ['calendar', 'approved', 'planning'],
            ...ids,
        },
        {
            name: 'Ethical Sourcing Messaging Workshop',
            dueAt: getRelativeDate(-5, false), // Approx. June 6
            details:
                'Internal workshop to define key messaging around ethical sourcing and recycled materials.',
            isWithTime: false,
            tags: ['messaging', 'ethical', 'sourcing'],
            ...ids,
        },
        // Upcoming Events (7)
        {
            name: 'Creative Concepts Design (Stills & Reels)',
            dueAt: getRelativeDate(8, true), // June 19
            details:
                'Design the first batch of social media creatives, including still images and short video reels.',
            isWithTime: true,
            tags: ['creative', 'design', 'reels'],
            ...ids,
        },
        {
            name: 'First Batch Creatives Internal Review',
            dueAt: getRelativeDate(10, true), // June 21
            details:
                'Internal review of the first batch of creatives before client submission.',
            isWithTime: true,
            tags: ['internal', 'review', 'creatives'],
            ...ids,
        },
        {
            name: 'Client Review: First Batch Creatives',
            dueAt: getRelativeDate(14, true), // June 25th (as per note)
            details:
                "Submit the first batch of social media creatives for Zenith Apparel's review and feedback.",
            isWithTime: true,
            tags: ['client', 'review', 'creatives'],
            ...ids,
        },
        {
            name: 'Campaign Performance Metrics Setup',
            dueAt: getRelativeDate(20, false), // July 1
            details:
                'Set up analytics and performance tracking for the sustainable collection launch campaign.',
            isWithTime: false,
            tags: ['analytics', 'tracking'],
            ...ids,
        },
        {
            name: 'Influencer Outreach Strategy',
            dueAt: getRelativeDate(25, true), // July 6
            details:
                'Develop a strategy for influencer outreach emphasizing sustainable fashion.',
            isWithTime: true,
            tags: ['influencer', 'strategy', 'outreach'],
            ...ids,
        },
        {
            name: 'Paid Ads Campaign Structure Planning',
            dueAt: getRelativeDate(30, true), // July 11
            details:
                'Plan the structure and targeting for paid social media advertisements.',
            isWithTime: true,
            tags: ['ads', 'paid', 'planning'],
            ...ids,
        },
        {
            name: 'Final Campaign Assets Production',
            dueAt: getRelativeDate(35, false), // July 16
            details:
                'Final production of all remaining social media assets for the campaign launch.',
            isWithTime: false,
            tags: ['assets', 'production'],
            ...ids,
        },
    ];
};

export const generateNewPackagingDesignForPremiumLineEvents = (ids: Ids) => {
    return [
        // Finished Events (3)
        {
            name: 'Initial Packaging Briefing',
            dueAt: getRelativeDate(-40, true), // Approx. May 2
            details:
                'Held kick-off meeting to understand requirements for premium line packaging design.',
            isWithTime: true,
            tags: ['brief', 'packaging', 'premium'],
            ...ids,
        },
        {
            name: 'Material Research & Sourcing (Initial)',
            dueAt: getRelativeDate(-30, false), // Approx. May 12
            details:
                'Conducted initial research on sustainable and luxurious packaging materials.',
            isWithTime: false,
            tags: ['materials', 'research'],
            ...ids,
        },
        {
            name: 'Design Concepts Submitted to Client',
            dueAt: getRelativeDate(-25, true), // Approx. May 17 (last month as per note)
            details:
                'Submitted initial design concepts for the new premium line packaging to Zenith Apparel.',
            isWithTime: true,
            tags: ['design', 'concepts', 'submitted'],
            ...ids,
        },
        // Upcoming Events (7) - reflecting 'on-hold' status with future check-ins
        {
            name: 'Check in with Khun Nattaya (Zenith PM)',
            dueAt: getRelativeDate(19, true), // June 30 (end of June as per note)
            details:
                'Follow up with Khun Nattaya regarding the status of material quotes from their supplier.',
            isWithTime: true,
            tags: ['client', 'followup', 'materials'],
            ...ids,
        },
        {
            name: 'Internal Concept Revision Planning',
            dueAt: getRelativeDate(25, false), // July 6
            details:
                'Internal planning session for design concept revisions once material quotes are secured.',
            isWithTime: false,
            tags: ['revisions', 'planning'],
            ...ids,
        },
        {
            name: 'Material Samples Review',
            dueAt: getRelativeDate(30, true), // July 11
            details:
                'Review physical samples of proposed packaging materials for final selection.',
            isWithTime: true,
            tags: ['materials', 'samples', 'review'],
            ...ids,
        },
        {
            name: 'Final Design Refinement',
            dueAt: getRelativeDate(40, true), // July 21
            details:
                'Refine packaging design concepts based on chosen materials and client feedback.',
            isWithTime: true,
            tags: ['design', 'refine', 'final'],
            ...ids,
        },
        {
            name: 'Mockup Production',
            dueAt: getRelativeDate(45, false), // July 26
            details:
                'Produce high-fidelity mockups of the new premium line packaging.',
            isWithTime: false,
            tags: ['mockup', 'production'],
            ...ids,
        },
        {
            name: 'Client Final Approval Meeting',
            dueAt: getRelativeDate(50, true), // July 31
            details:
                'Meeting with Zenith Apparel to get final approval on the premium line packaging design.',
            link: 'https://meet.google.com/zenith-packaging',
            isWithTime: true,
            tags: ['client', 'approval', 'packaging'],
            ...ids,
        },
        {
            name: 'Printer Hand-off & Production Start',
            dueAt: getRelativeDate(60, true), // August 10
            details:
                'Hand off final design files to printer and initiate production for premium line packaging.',
            isWithTime: true,
            tags: ['printer', 'production', 'handoff'],
            ...ids,
        },
    ];
};

export const getZenithApparelEvents = (ids: Ids) => {
    return [
        ...generateAutumnWinter2025LookbookPhotographyDesignEvents(ids),
        ...generateEcommerceProductPageCopywritingRefreshEvents(ids),
        ...generateSustainableCollectionLaunchSocialMediaCampaignEvents(ids),
        ...generateNewPackagingDesignForPremiumLineEvents(ids),
    ];
};
