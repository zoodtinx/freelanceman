import { getRelativeDate, Ids } from '@/demo/helpers/seed-user-data/level-3';

const generateAnnualStudentConcertBrandingTicketsTasks = (ids: Ids) => {
    return [
        {
            name: "Develop initial branding concepts for concert",
            status: "completed",
            dueAt: getRelativeDate(-8, true), // June 3rd, with time
            details: "Created several unique branding concepts for the annual student concert, including logo variations and color palettes.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Receive client feedback on branding concepts",
            status: "pending",
            dueAt: getRelativeDate(1, true), // June 12th, with time
            details: "Await and review feedback from Harmony Music Academy on the initial branding concepts for the concert. Prepare for revisions.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Source print quotes for physical tickets",
            status: "pending",
            dueAt: getRelativeDate(3, false), // End of week, no specific time
            details: "Obtain competitive quotes from at least three different printing vendors for the physical concert tickets, specifying paper quality and security features.",
            isWithTime: false,
            ...ids,
        },
        {
            name: "Design concert ticket mockups",
            status: "pending",
            dueAt: getRelativeDate(7, true), // 7 days from now, with time
            details: "Design several mockup options for the concert tickets, integrating the approved branding and essential event information.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Outline promotional asset requirements",
            status: "pending",
            dueAt: getRelativeDate(10, false), // 10 days from now, no specific time
            details: "List all necessary promotional assets beyond tickets (e.g., posters, social media banners, program cover) for the concert campaign.",
            isWithTime: false,
            ...ids,
        },
        {
            name: "Finalize concert branding guidelines",
            status: "pending",
            dueAt: getRelativeDate(14, true), // 14 days from now, with time
            details: "Develop a comprehensive branding guideline document for the concert, ensuring consistent application across all materials leading up to August 15th.",
            isWithTime: true,
            ...ids,
        },
    ];
};

const generateNewOnlineCourseLandingPageTasks = (ids: Ids) => {
    return [
        {
            name: "Initial scope discussion for landing page",
            status: "completed",
            dueAt: getRelativeDate(-30, true), // Completed 30 days ago, with time
            details: "Conducted a meeting with Harmony Music Academy to define the objectives, target audience, and key messaging for the Guitar Basics online course landing page.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Draft landing page content (text elements)",
            status: "completed",
            dueAt: getRelativeDate(-25, false), // Completed 25 days ago, no specific time
            details: "Wrote compelling headline, body copy, calls-to-action, and feature descriptions for the landing page.",
            isWithTime: false,
            ...ids,
        },
        {
            name: "Design preliminary wireframes for layout",
            status: "completed",
            dueAt: getRelativeDate(-20, true), // Completed 20 days ago, with time
            details: "Developed basic wireframes to outline the structure and layout of the landing page, ensuring optimal user experience and conversion flow.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Follow up with Ms. Lily for project restart",
            status: "pending",
            dueAt: getRelativeDate(20, true), // Early July, with time
            details: "Reach out to Ms. Lily to confirm the completion of course content and video assets, and set a new date for project recommencement.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Review updated course content/assets upon restart",
            status: "pending",
            dueAt: getRelativeDate(25, false), // 25 days from now, no specific time
            details: "Thoroughly review the finalized Guitar Basics course content and video assets provided by Harmony to ensure they align with the landing page design needs.",
            isWithTime: false,
            ...ids,
        },
        {
            name: "Plan integration of video assets on page",
            status: "pending",
            dueAt: getRelativeDate(28, true), // 28 days from now, with time
            details: "Outline the technical and design approach for seamlessly integrating the course video assets into the landing page, considering loading times and responsiveness.",
            isWithTime: true,
            ...ids,
        },
    ];
};

const generateMusicTheoryBlogContentStrategyArticlesTasks = (ids: Ids) => {
    return [
        {
            name: "Research music theory topics & keywords",
            status: "completed",
            dueAt: getRelativeDate(-35, true), // Completed 35 days ago, with time
            details: "Conducted in-depth research on popular music theory topics and relevant keywords to inform content strategy and maximize SEO.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Develop content strategy document",
            status: "completed",
            dueAt: getRelativeDate(-14, false), // May 28th, no specific time
            details: "Created a comprehensive content strategy document outlining blog themes, target audience, tone of voice, and content pillars for music theory.",
            isWithTime: false,
            ...ids,
        },
        {
            name: "Draft first 5 music theory articles",
            status: "completed",
            dueAt: getRelativeDate(-8, true), // 8 days ago, with time
            details: "Wrote the initial five articles on fundamental music theory concepts, ensuring accuracy, clarity, and engagement.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Client review and approval of articles",
            status: "completed",
            dueAt: getRelativeDate(-6, true), // 6 days ago, with time
            details: "Submitted the first five articles to Harmony Music Academy for review and received their final approval.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Publish first 5 music theory articles",
            status: "completed",
            dueAt: getRelativeDate(-5, true), // June 6th, with time
            details: "Uploaded and published the first five approved articles on the Harmony Music Academy blog, ensuring proper formatting and image integration.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Internal meeting: Propose ongoing content package",
            status: "pending", // Forward-looking internal task based on the note
            dueAt: getRelativeDate(15, false),
            details: "Schedule and conduct an internal meeting to develop a proposal for an ongoing content package for Harmony Music Academy's blog, based on initial success.",
            isWithTime: false,
            ...ids,
        },
    ];
};

// Aggregate function for Harmony Music Academy tasks
export const getHarmonyMusicAcademyTasks = (ids: Ids) => {
    const harmonyMusicAcademyTaskGenerators: [string, any][] = [
        ['Annual Student Concert Branding & Tickets', generateAnnualStudentConcertBrandingTicketsTasks],
        ['New Online Course Landing Page (Guitar Basics)', generateNewOnlineCourseLandingPageTasks],
        ['Music Theory Blog Content Strategy & First 5 Articles', generateMusicTheoryBlogContentStrategyArticlesTasks],
    ];

    return harmonyMusicAcademyTaskGenerators.flatMap(([projectTitle, generateFn]) => {
        const projectIds = ids[projectTitle];

        if (!projectIds) {
            console.warn(
                `Warning: IDs not found for project: "${projectTitle}" for Harmony Music Academy. No tasks generated.`,
            );
            return [];
        }

        return generateFn(projectIds);
    });
};