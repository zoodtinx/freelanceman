import { getRelativeDate, Ids } from '@/demo/helpers/seed-user-data/helper';

export const getByteNestTechSolutionsTasks = (ids: Ids) => {
    const byteNestTechSolutionsTaskGenerators: [string, any][] = [
        ['E-commerce Platform UI/UX Redesign', generateEcommercePlatformUiUxRedesignTasks],
        ['Internal CRM System API Integration', generateInternalCrmSystemApiIntegrationTasks],
        ['Product Launch Video & Explainer Animation', generateProductLaunchVideoExplainerAnimationTasks],
        ['Automated Data Reporting Dashboard', generateAutomatedDataReportingDashboardTasks],
        ['Website Performance Audit & Optimization', generateWebsitePerformanceAuditOptimizationTasks],
    ];

    return byteNestTechSolutionsTaskGenerators.flatMap(([projectTitle, generateFn]) => {
        const projectIds = ids[projectTitle];

        if (!projectIds) {
            console.warn(
                `Warning: IDs not found for project: "${projectTitle}" for ByteNest Tech Solutions. No tasks generated.`,
            );
            return [];
        }

        return generateFn(projectIds);
    });
};

 const generateEcommercePlatformUiUxRedesignTasks = (ids: Ids) => {
    return [
        {
            name: 'Review approved wireframes',
            status: 'completed',
            dueAt: getRelativeDate(-5, false), // 5 days ago, no specific time
            details:
                'Carefully review the approved wireframes to ensure a solid foundation for high-fidelity mockups.',
            isWithTime: false,
            ...ids,
        },
        {
            name: 'Develop high-fidelity mockups (Round 1)',
            status: 'pending',
            dueAt: getRelativeDate(9, true), // 9 days from now, with specific time (around June 20th)
            details:
                'Create detailed, visually rich mockups for key e-commerce pages based on the approved wireframes.',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Prototype navigation motion',
            status: 'pending',
            dueAt: getRelativeDate(12, true), // 12 days from now, with specific time
            details:
                'Develop interactive prototypes to showcase navigation animations and transitions for client review.',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Prepare for client review of mockups',
            status: 'pending',
            dueAt: getRelativeDate(12, true), // 12 days from now, with specific time
            details:
                'Prepare a presentation for the client, highlighting key design decisions and user flows in the mockups.',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Research ShopFlow UI trends',
            status: 'pending',
            dueAt: getRelativeDate(3, false), // 3 days from now, no specific time
            details:
                "Analyze the UI of competitor 'ShopFlow' for current trends and best practices in e-commerce design.",
            isWithTime: false,
            ...ids,
        },
        {
            name: 'Incorporate client feedback (Round 1)',
            status: 'pending',
            dueAt: getRelativeDate(16, true), // 16 days from now, with specific time
            details:
                "Apply feedback from the client's initial review to refine the high-fidelity mockups and navigation prototypes.",
            isWithTime: true,
            ...ids,
        },
    ];
};

 const generateInternalCrmSystemApiIntegrationTasks = (ids: Ids) => {
    return [
        {
            name: 'Review API documentation',
            status: 'completed',
            dueAt: getRelativeDate(-3, true), // 3 days ago, with specific time
            details:
                'Thoroughly review the provided API documentation to understand its functionality and integration requirements.',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Confirm authentication method with client',
            status: 'pending',
            dueAt: getRelativeDate(2, true), // 2 days from now (end of week), with specific time
            details:
                'Clarify with the client the preferred authentication method for accessing the CRM API (e.g., OAuth, API Key, Token-based).',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Develop integration plan outline',
            status: 'pending',
            dueAt: getRelativeDate(5, false), // 5 days from now, no specific time
            details:
                'Outline the high-level steps, required data points, and estimated timeline for integrating the CRM system with the new internal tool. Identify potential challenges.',
            isWithTime: false,
            ...ids,
        },
        {
            name: 'Set up secure development environment',
            status: 'pending',
            dueAt: getRelativeDate(6, true), // 6 days from now, with specific time
            details:
                'Configure the necessary development tools, secure credentials, and libraries for API integration. Ensure compliance with data security policies.',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Implement core API connection module',
            status: 'pending',
            dueAt: getRelativeDate(8, true), // 8 days from now, with specific time
            details:
                'Write the foundational code to establish a robust and authenticated connection between the new internal tool and the CRM API endpoints.',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Conduct initial API endpoint testing',
            status: 'pending',
            dueAt: getRelativeDate(10, false), // 10 days from now, no specific time
            details:
                'Perform preliminary tests on various API endpoints to ensure data is correctly retrieved, sent, and handled without errors.',
            isWithTime: false,
            ...ids,
        },
    ];
};

 const generateProductLaunchVideoExplainerAnimationTasks = (ids: Ids) => {
    return [
        {
            name: 'Initial project briefing',
            status: 'completed',
            dueAt: getRelativeDate(-40, true), // Completed 40 days ago, with specific time
            details:
                "Held an initial meeting to discuss the video's objectives, target audience, and key messaging.",
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Develop script (Version 1)',
            status: 'completed',
            dueAt: getRelativeDate(-35, false), // Completed 35 days ago, no specific time
            details:
                'Created the first draft of the script for the product launch video and explainer animation.',
            isWithTime: false,
            ...ids,
        },
        {
            name: 'Client feedback on script',
            status: 'completed',
            dueAt: getRelativeDate(-30, true), // Completed 30 days ago, with specific time
            details:
                'Received initial feedback from the client on the script. Minor revisions were requested.',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Develop storyboard (initial)',
            status: 'completed',
            dueAt: getRelativeDate(-25, false), // Completed 25 days ago, no specific time
            details:
                'Created an initial storyboard based on the approved script, outlining key visuals and transitions.',
            isWithTime: false,
            ...ids,
        },
        {
            name: 'Follow up with Mr. Anan for project timeline restart',
            status: 'pending',
            dueAt: getRelativeDate(10, true), // Pending, 10 days from now (as a reminder for future follow-up)
            details:
                'Contact Mr. Anan to get an updated timeline for the project restart. Confirm if the budget still holds and when internal resources will be reallocated.',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Document project pause details internally',
            status: 'pending',
            dueAt: getRelativeDate(1, false), // Pending, due tomorrow, no specific time
            details:
                'Create a clear internal record of the reason for the project pause, the expected restart date (Q4 2025), and any agreed-upon budget adjustments.',
            isWithTime: false,
            ...ids,
        },
    ];
};

// Tasks for "Automated Data Reporting Dashboard" (Completed Project)
 const generateAutomatedDataReportingDashboardTasks = (ids: Ids) => {
    return [
        {
            name: 'Gather stakeholder requirements for dashboard',
            status: 'completed',
            dueAt: getRelativeDate(-45, true), // Completed 45 days ago, with time
            details:
                'Conducted interviews with key stakeholders to understand their data reporting needs and desired dashboard metrics.',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Design dashboard wireframes & user flows',
            status: 'completed',
            dueAt: getRelativeDate(-40, false), // Completed 40 days ago, no specific time
            details:
                'Created initial wireframes and defined user navigation paths for the automated reporting dashboard.',
            isWithTime: false,
            ...ids,
        },
        {
            name: 'Develop data connectors for source systems',
            status: 'completed',
            dueAt: getRelativeDate(-30, true), // Completed 30 days ago, with time
            details:
                'Built robust connections to various data sources (e.g., sales CRM, marketing analytics) to pull raw data for the dashboard.',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Implement data processing and transformation logic',
            status: 'completed',
            dueAt: getRelativeDate(-20, false), // Completed 20 days ago, no specific time
            details:
                'Wrote scripts and configured pipelines to clean, transform, and aggregate raw data into meaningful metrics for the dashboard.',
            isWithTime: false,
            ...ids,
        },
        {
            name: 'Build interactive dashboard UI components',
            status: 'completed',
            dueAt: getRelativeDate(-15, true), // Completed 15 days ago, with time
            details:
                'Developed the frontend components of the dashboard, including charts, graphs, and filter mechanisms, ensuring interactivity and responsiveness.',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Conduct user acceptance testing (UAT)',
            status: 'completed',
            dueAt: getRelativeDate(-10, true), // Completed 10 days ago, with time
            details:
                'Collaborated with ByteNest team members for UAT, collecting feedback and identifying any bugs or usability issues.',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Final deployment and handover',
            status: 'completed',
            dueAt: getRelativeDate(-5, false), // Completed 5 days ago (around May 28th)
            details:
                'Deployed the completed dashboard to the production environment and provided all necessary documentation for handover.',
            isWithTime: false,
            ...ids,
        },
        {
            name: 'Conduct training session for ByteNest team',
            status: 'completed',
            dueAt: getRelativeDate(-2, true), // Completed 2 days ago (around June 5th)
            details:
                'Led a comprehensive training session for ByteNest employees on how to use, interpret, and leverage the new automated data reporting dashboard.',
            isWithTime: true,
            ...ids,
        },
    ];
};

// Tasks for "Website Performance Audit & Optimization" (Active Project)
 const generateWebsitePerformanceAuditOptimizationTasks = (ids: Ids) => {
    return [
        {
            name: 'Perform initial website speed audit',
            status: 'completed',
            dueAt: getRelativeDate(-3, true), // Completed 3 days ago, with time
            details:
                'Used tools like Google PageSpeed Insights and GTmetrix to capture baseline performance metrics and identify immediate bottlenecks.',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Analyze core web vitals data',
            status: 'pending',
            dueAt: getRelativeDate(2, false), // 2 days from now, no specific time
            details:
                'Deep dive into Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and First Input Delay (FID) data for key pages.',
            isWithTime: false,
            ...ids,
        },
        {
            name: 'Identify largest contentful paint (LCP) issues',
            status: 'pending',
            dueAt: getRelativeDate(4, true), // 4 days from now, with time
            details:
                'Pinpoint elements contributing most to LCP on critical pages and propose solutions for optimization (e.g., image compression, lazy loading).',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Assess server response times & hosting setup',
            status: 'pending',
            dueAt: getRelativeDate(5, false), // 5 days from now, no specific time
            details:
                'Evaluate the current hosting environment, server configurations, and CDN usage for potential speed improvements.',
            isWithTime: false,
            ...ids,
        },
        {
            name: 'Draft initial audit report summary',
            status: 'pending',
            dueAt: getRelativeDate(6, true), // 6 days from now, with time
            details:
                'Compile preliminary findings into a concise summary document, highlighting critical issues and potential impact.',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Prepare for client meeting (June 17th)',
            status: 'pending',
            dueAt: getRelativeDate(7, true), // June 17th, with time
            details:
                'Prepare a detailed presentation for the client meeting to discuss audit findings, recommended optimizations, and a proposed roadmap.',
            isWithTime: true,
            ...ids,
        },
        {
            name: 'Propose image optimization strategy',
            status: 'pending',
            dueAt: getRelativeDate(10, false), // 10 days from now, no specific time
            details:
                'Outline a strategy for optimizing all website images (e.g., next-gen formats, responsive images) to reduce page load times.',
            isWithTime: false,
            ...ids,
        },
    ];
};
