import { getRelativeDate, Ids } from '@/demo/helpers/seed-user-data/level-3';

export const generateAnnualStudentConcertBrandingTicketsEvents = (ids: Ids) => {
    return [
        // Finished Events (3)
        {
            name: "Initial Concept Briefing",
            dueAt: getRelativeDate(-20, true), // Approx. May 22
            details: "Held briefing for the annual student concert branding and ticketing project.",
            isWithTime: true,
            tags: ['brief', 'concert', 'branding'],
            ...ids,
        },
        {
            name: "Initial Branding Concepts Shared",
            dueAt: getRelativeDate(-8, true), // June 3rd (as per note)
            details: "Shared initial branding concepts with Harmony Music Academy for the concert.",
            isWithTime: true,
            tags: ['design', 'concepts', 'shared'],
            ...ids,
        },
        {
            name: "Ticket Design Brainstorm",
            dueAt: getRelativeDate(-5, false), // Approx. June 6
            details: "Internal brainstorming session for physical ticket design ideas.",
            isWithTime: false,
            tags: ['tickets', 'design', 'brainstorm'],
            ...ids,
        },
        // Upcoming Events (7)
        {
            name: "Client Feedback on Branding Concepts",
            dueAt: getRelativeDate(1, true), // June 12th (as per note)
            details: "Awaiting and reviewing client feedback on the initial branding concepts.",
            isWithTime: true,
            tags: ['client', 'feedback', 'branding'],
            ...ids,
        },
        {
            name: "Sourcing Print Quotes for Tickets",
            dueAt: getRelativeDate(3, false), // June 14 (end of week)
            details: "Gathering print quotes from various vendors for physical concert tickets.",
            isWithTime: false,
            tags: ['print', 'quotes', 'tickets'],
            ...ids,
        },
        {
            name: "Ticket Design Finalization",
            dueAt: getRelativeDate(8, true), // June 19
            details: "Finalize the design of the concert tickets based on client approval and print specifications.",
            isWithTime: true,
            tags: ['design', 'tickets', 'final'],
            ...ids,
        },
        {
            name: "Concert Program Layout Planning",
            dueAt: getRelativeDate(15, true), // June 26
            details: "Begin planning the layout and content for the annual concert program booklet.",
            isWithTime: true,
            tags: ['program', 'layout', 'planning'],
            ...ids,
        },
        {
            name: "Promotional Materials Design Brief",
            dueAt: getRelativeDate(20, false), // July 1
            details: "Develop a brief for designing additional promotional materials (posters, social graphics).",
            isWithTime: false,
            tags: ['promo', 'design', 'brief'],
            ...ids,
        },
        {
            name: "Concert Venue Coordination Check-in",
            dueAt: getRelativeDate(30, true), // July 11
            details: "Check in with the concert venue to confirm branding placements and logistical details.",
            isWithTime: true,
            tags: ['venue', 'logistics', 'coordination'],
            ...ids,
        },
        {
            name: "Pre-Concert Marketing Strategy Review",
            dueAt: getRelativeDate(40, true), // July 21
            details: "Review the overall marketing strategy leading up to the August 15th concert date.",
            isWithTime: true,
            tags: ['marketing', 'strategy', 'review'],
            ...ids,
        },
    ];
};

export const generateNewOnlineCourseLandingPageGuitarBasicsEvents = (ids: Ids) => {
    return [
        // Finished Events (3)
        {
            name: "Initial Discovery Meeting",
            dueAt: getRelativeDate(-40, true), // Approx. May 2
            details: "Held discovery meeting to understand goals for the new online course landing page.",
            isWithTime: true,
            tags: ['discovery', 'landing'],
            ...ids,
        },
        {
            name: "Content Outline Drafted",
            dueAt: getRelativeDate(-30, false), // Approx. May 12
            details: "Drafted a content outline for the 'Guitar Basics' online course landing page.",
            isWithTime: false,
            tags: ['content', 'outline'],
            ...ids,
        },
        {
            name: "Wireframe Design & Review",
            dueAt: getRelativeDate(-20, true), // Approx. May 22
            details: "Completed wireframe designs and conducted internal review for the landing page.",
            isWithTime: true,
            tags: ['wireframe', 'design', 'review'],
            ...ids,
        },
        // Upcoming Events (7) - reflecting 'on-hold' status with future check-ins
        {
            name: "Internal Course Content Check",
            dueAt: getRelativeDate(5, true), // June 16
            details: "Internal check to see if Harmony's course content and video assets are nearing finalization.",
            isWithTime: true,
            tags: ['internal', 'content', 'check'],
            ...ids,
        },
        {
            name: "Follow up with Ms. Lily",
            dueAt: getRelativeDate(20, true), // July 1 (early July as per note)
            details: "Follow up with Ms. Lily to confirm project restart timeline and readiness of assets.",
            isWithTime: true,
            tags: ['client', 'followup', 'restart'],
            ...ids,
        },
        {
            name: "Video Asset Review & Planning",
            dueAt: getRelativeDate(25, false), // July 6
            details: "Upon restart, review all provided video assets and plan their integration into the page.",
            isWithTime: false,
            tags: ['video', 'assets', 'planning'],
            ...ids,
        },
        {
            name: "UI/UX Mockup Development Kick-off",
            dueAt: getRelativeDate(30, true), // July 11
            details: "Kick-off development of high-fidelity UI/UX mockups for the landing page.",
            isWithTime: true,
            tags: ['ui', 'ux', 'mockup'],
            ...ids,
        },
        {
            name: "Copywriting for Landing Page",
            dueAt: getRelativeDate(35, true), // July 16
            details: "Draft compelling copy for the landing page, focusing on course benefits and CTAs.",
            isWithTime: true,
            tags: ['copy', 'content'],
            ...ids,
        },
        {
            name: "Client Review of Mockups & Copy",
            dueAt: getRelativeDate(45, true), // July 26
            details: "Present the completed mockups and draft copy to Harmony Music Academy for feedback.",
            link: "https://meet.google.com/harmony-course-lp",
            isWithTime: true,
            tags: ['client', 'review', 'design'],
            ...ids,
        },
        {
            name: "Performance Tracking Setup",
            dueAt: getRelativeDate(50, false), // July 31
            details: "Plan and set up analytics and conversion tracking for the new landing page.",
            isWithTime: false,
            tags: ['tracking', 'analytics'],
            ...ids,
        },
    ];
};

export const generateMusicTheoryBlogContentStrategyFirst5ArticlesEvents = (ids: Ids) => {
    return [
        // Finished Events (3)
        {
            name: "Initial Content Strategy Brief",
            dueAt: getRelativeDate(-35, true), // Approx. May 7
            details: "Held initial briefing for the music theory blog content strategy.",
            isWithTime: true,
            tags: ['strategy', 'blog', 'brief'],
            ...ids,
        },
        {
            name: "Content Strategy Document Delivered",
            dueAt: getRelativeDate(-14, true), // May 28th (as per note)
            details: "Delivered the comprehensive music theory blog content strategy document.",
            isWithTime: true,
            tags: ['delivery', 'strategy'],
            ...ids,
        },
        {
            name: "First 5 Articles Published",
            dueAt: getRelativeDate(-5, true), // June 6th (as per note)
            details: "The initial 5 music theory articles were submitted and published on the blog.",
            isWithTime: true,
            tags: ['articles', 'publish', 'content'],
            ...ids,
        },
        // Upcoming Events (7) - mostly post-completion follow-ups or internal planning
        {
            name: "Internal Performance Review: First 5 Articles",
            dueAt: getRelativeDate(4, true), // June 15
            details: "Internal review of the performance metrics for the first 5 published articles.",
            isWithTime: true,
            tags: ['internal', 'review', 'analytics'],
            ...ids,
        },
        {
            name: "Client Follow-up on Article Performance",
            dueAt: getRelativeDate(7, false), // June 18
            details: "Follow up with Harmony Music Academy to discuss initial article performance and engagement.",
            isWithTime: false,
            tags: ['client', 'feedback'],
            ...ids,
        },
        {
            name: "Next Content Package Proposal Brainstorm",
            dueAt: getRelativeDate(10, true), // June 21
            details: "Brainstorming session for an ongoing content package for the next quarter's blog content.",
            isWithTime: true,
            tags: ['proposal', 'content', 'brainstorm'],
            ...ids,
        },
        {
            name: "SEO Keyword Research for Q3 Content",
            dueAt: getRelativeDate(15, true), // June 26
            details: "Conduct in-depth SEO keyword research to inform future music theory blog topics.",
            isWithTime: true,
            tags: ['seo', 'research', 'keywords'],
            ...ids,
        },
        {
            name: "Draft Proposal for Ongoing Content",
            dueAt: getRelativeDate(20, false), // July 1
            details: "Prepare a draft proposal outlining the scope and cost for an ongoing content package.",
            isWithTime: false,
            tags: ['proposal', 'draft'],
            ...ids,
        },
        {
            name: "Internal Portfolio Update",
            dueAt: getRelativeDate(25, true), // July 6
            details: "Update the internal portfolio with the completed content strategy and published articles.",
            isWithTime: true,
            tags: ['portfolio', 'update'],
            ...ids,
        },
        {
            name: "Client Testimonial Request",
            dueAt: getRelativeDate(30, true), // July 11
            details: "Request a testimonial from Harmony Music Academy regarding the successful blog content project.",
            isWithTime: true,
            tags: ['client', 'testimonial'],
            ...ids,
        },
    ];
};

export const getHarmonyMusicAcademyEvents = (ids: Ids) => {
    const harmonyMusicAcademyEventGenerators: [string, any][] = [
        ['Annual Student Concert Branding & Tickets', generateAnnualStudentConcertBrandingTicketsEvents],
        ['New Online Course Landing Page (Guitar Basics)', generateNewOnlineCourseLandingPageGuitarBasicsEvents],
        ['Music Theory Blog Content Strategy & First 5 Articles', generateMusicTheoryBlogContentStrategyFirst5ArticlesEvents],
    ];

    return harmonyMusicAcademyEventGenerators.flatMap(([projectTitle, generateFn]) => {
        const projectIds = ids[projectTitle];

        if (!projectIds) {
            console.warn(
                `Warning: IDs not found for project: "${projectTitle}" for Harmony Music Academy. No events generated.`,
            );
            return [];
        }

        return generateFn(projectIds);
    });
};