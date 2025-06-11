import { getRelativeDate, Ids } from '@/demo/helpers/seed-user-data/level-3';

const generateSummerChallengeLandingPageAdCreativesTasks = (ids: Ids) => {
    return [
        {
            name: "Review client brief and provided assets",
            status: "completed",
            dueAt: getRelativeDate(-3, true),
            details: "Thoroughly reviewed the brief for the Summer Challenge, noting key objectives, target audience, and available assets for the landing page and ads.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Design landing page wireframes (initial draft)",
            status: "pending",
            dueAt: getRelativeDate(2, false),
            details: "Create initial wireframes for the Summer Challenge landing page, focusing on strong calls-to-action (CTAs) and an intuitive sign-up flow.",
            isWithTime: false,
            ...ids,
        },
        {
            name: "Develop ad creative concepts (3 variations)",
            status: "pending",
            dueAt: getRelativeDate(4, true),
            details: "Brainstorm and design three distinct ad creative concepts for the Summer Challenge, tailored for various digital platforms.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Draft compelling ad headlines for A/B testing",
            status: "pending",
            dueAt: getRelativeDate(5, false),
            details: "Write multiple headline options for the ad creatives, optimized for A/B testing to determine the most effective messaging.",
            isWithTime: false,
            ...ids,
        },
        {
            name: "Integrate provided assets into designs",
            status: "pending",
            dueAt: getRelativeDate(6, true),
            details: "Incorporate all client-provided images, logos, and brand guidelines into the landing page and ad creative designs.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Prepare for internal design review",
            status: "pending",
            dueAt: getRelativeDate(7, true),
            details: "Compile all current designs and concepts for an internal team review before client submission, ensuring alignment with project goals.",
            isWithTime: true,
            ...ids,
        },
    ];
};

const generateNewClassScheduleDesignPrintProductionTasks = (ids: Ids) => {
    return [
        {
            name: "Collect updated class schedule information",
            status: "completed",
            dueAt: getRelativeDate(-10, true),
            details: "Gathered all new class timings, instructor assignments, and room details from UrbanFlow Fitness for the upcoming schedule.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Design schedule layout concepts (2 options)",
            status: "completed",
            dueAt: getRelativeDate(-8, false),
            details: "Developed two distinct design concepts for the new class schedule, focusing on readability and UrbanFlow's branding.",
            isWithTime: false,
            ...ids,
        },
        {
            name: "Incorporate client feedback on design",
            status: "completed",
            dueAt: getRelativeDate(-5, true),
            details: "Applied client feedback to refine the chosen class schedule design, ensuring all details were accurately represented.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Receive final design approval",
            status: "completed",
            dueAt: getRelativeDate(-10, true), // June 1st
            details: "Secured final approval from UrbanFlow Fitness on the class schedule design, clearing it for print production.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Prepare print-ready files",
            status: "completed",
            dueAt: getRelativeDate(-8, false),
            details: "Converted the approved design into high-resolution, print-ready files, ensuring proper bleeds, trims, and color profiles.",
            isWithTime: false,
            ...ids,
        },
        {
            name: "Coordinate with Mr. Somchai for print production",
            status: "completed",
            dueAt: getRelativeDate(-6, true),
            details: "Liaised with Mr. Somchai (printer) to send final files and confirm print specifications, quantity, and delivery timeline.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Send follow-up email to client",
            status: "pending", // This is a specific post-completion task
            dueAt: getRelativeDate(1, false),
            details: "Send a follow-up email to UrbanFlow Fitness to confirm receipt of printed schedules and offer continued support.",
            isWithTime: false,
            ...ids,
        },
    ];
};

const generateMemberLoyaltyProgramBrandingTasks = (ids: Ids) => {
    return [
        {
            name: "Initial meeting for loyalty program concept",
            status: "completed",
            dueAt: getRelativeDate(-25, true),
            details: "Held an introductory meeting with UrbanFlow Fitness to understand their goals and vision for a new member loyalty program.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Develop preliminary concept designs (3 variations)",
            status: "completed",
            dueAt: getRelativeDate(-22, false), // Sent May 20th
            details: "Created three distinct branding concept designs for the member loyalty program, including potential names and visual elements.",
            isWithTime: false,
            ...ids,
        },
        {
            name: "Send concept designs to client for feedback",
            status: "completed",
            dueAt: getRelativeDate(-21, true), // Sent May 20th
            details: "Submitted the preliminary concept designs to UrbanFlow Fitness for their review and feedback.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Follow up with Ms. Ploy for feedback",
            status: "pending",
            dueAt: getRelativeDate(2, true), // Next week
            details: "Contact Ms. Ploy to chase up on the pending feedback for the member loyalty program concept designs. Project is currently on hold.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Research competitor loyalty programs",
            status: "pending",
            dueAt: getRelativeDate(5, false),
            details: "Conduct in-depth research on loyalty programs offered by competing fitness centers to gather inspiration and identify best practices.",
            isWithTime: false,
            ...ids,
        },
        {
            name: "Document client feedback received (when available)",
            status: "pending",
            dueAt: getRelativeDate(7, false),
            details: "Once received, meticulously document all client feedback on the loyalty program concept designs to prepare for revisions.",
            isWithTime: false,
            ...ids,
        },
    ];
};

const generateIntroductoryYogaVideoSeriesTasks = (ids: Ids) => {
    return [
        {
            name: "Draft video scripts for 3 yoga videos",
            status: "completed",
            dueAt: getRelativeDate(-7, true),
            details: "Wrote detailed scripts for the three introductory yoga videos, outlining poses, transitions, and instructor dialogue.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Receive script approval from client",
            status: "completed",
            dueAt: getRelativeDate(-5, false),
            details: "Secured final approval on all three video scripts from UrbanFlow Fitness, confirming content and flow.",
            isWithTime: false,
            ...ids,
        },
        {
            name: "Book voice-over artist",
            status: "pending",
            dueAt: getRelativeDate(3, true), // End of week
            details: "Identify and book a professional voice-over artist for the yoga video series. Confirm availability and recording schedule.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Finalize filming schedule and logistics",
            status: "pending",
            dueAt: getRelativeDate(10, false), // Before July 10th
            details: "Confirm all details for the July 10-12 filming dates at the studio, including equipment, lighting, and any required props.",
            isWithTime: false,
            ...ids,
        },
        {
            name: "Pre-production meeting with video team",
            status: "pending",
            dueAt: getRelativeDate(15, true),
            details: "Conduct a pre-production meeting with the entire video team (director, camera crew, talent) to review scripts and filming plan.",
            isWithTime: true,
            ...ids,
        },
        {
            name: "Filming of Introductory Yoga Videos (July 10-12)",
            status: "pending",
            dueAt: getRelativeDate(29, true), // July 10th (approx. 29 days from now)
            details: "Execute the principal photography for the three introductory yoga videos at the designated studio location.",
            isWithTime: true,
            ...ids,
        },
    ];
};

export const getUrbanFlowFitnessTasks = (ids: Ids) => {
    const urbanFlowFitnessTaskGenerators: [string, any][] = [
        ['Summer Challenge Landing Page & Ad Creatives', generateSummerChallengeLandingPageAdCreativesTasks],
        ['New Class Schedule Design & Print Production', generateNewClassScheduleDesignPrintProductionTasks],
        ['Member Loyalty Program Branding', generateMemberLoyaltyProgramBrandingTasks],
        ['Introductory Yoga Video Series (3 videos)', generateIntroductoryYogaVideoSeriesTasks],
    ];

    return urbanFlowFitnessTaskGenerators.flatMap(([projectTitle, generateFn]) => {
        const projectIds = ids[projectTitle];

        if (!projectIds) {
            console.warn(
                `Warning: IDs not found for project: "${projectTitle}" for Urban Flow Fitness. No tasks generated.`,
            );
            return [];
        }

        return generateFn(projectIds);
    });
};