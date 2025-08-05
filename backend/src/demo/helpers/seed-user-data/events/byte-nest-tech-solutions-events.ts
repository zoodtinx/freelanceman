import { getRelativeDate, Ids } from '@/demo/helpers/seed-user-data/helper';

export const generateEcommercePlatformUiUxRedesignEvents = (ids: Ids) => {
    return [
        // Finished Events (3)
        {
            name: 'Initial Client Briefing',
            dueAt: getRelativeDate(-30, true), // Approx. May 12
            details:
                'Held kick-off meeting to understand UI/UX redesign goals for the e-commerce platform.',
            isWithTime: true,
            tags: ['brief', 'ux', 'ui', 'meeting'],
            ...ids,
        },
        {
            name: 'Wireframe Approval',
            dueAt: getRelativeDate(-10, true), // Approx. June 1
            details:
                'Client approved initial wireframes, setting the structural foundation for mockups.',
            isWithTime: true,
            tags: ['wireframe', 'design', 'approval'],
            ...ids,
        },
        {
            name: 'User Research & Analysis',
            dueAt: getRelativeDate(-20, false), // Approx. May 22
            details:
                'Conducted user research and analyzed findings to inform design decisions.',
            isWithTime: false,
            tags: ['research', 'user'],
            ...ids,
        },
        // Upcoming Events (7)
        {
            name: 'High-Fidelity Mockup Internal Review',
            dueAt: getRelativeDate(3, true), // June 14
            details:
                'Internal review of high-fidelity mockups before client presentation.',
            isWithTime: true,
            tags: ['mockup', 'design', 'review'],
            ...ids,
        },
        {
            name: 'Motion Prototype Development',
            dueAt: getRelativeDate(7, true), // June 18
            details:
                'Develop interactive motion prototypes for navigation and key UI elements.',
            isWithTime: true,
            tags: ['prototype', 'motion', 'dev'],
            ...ids,
        },
        {
            name: 'Client Presentation of Mockups',
            dueAt: getRelativeDate(9, true), // June 20
            details:
                'Present high-fidelity mockups and motion prototypes to ByteNest for feedback.',
            link: 'https://meet.google.com/bytenest-ui-ux',
            isWithTime: true,
            tags: ['client', 'present', 'ux', 'ui'],
            ...ids,
        },
        {
            name: 'A/B Testing Strategy Session',
            dueAt: getRelativeDate(15, false), // June 26
            details:
                'Plan A/B testing strategies for key design elements and user flows.',
            isWithTime: false,
            tags: ['testing', 'strategy'],
            ...ids,
        },
        {
            name: 'Design System Documentation Start',
            dueAt: getRelativeDate(20, true), // July 1
            details:
                'Begin documenting the new design system components and guidelines.',
            isWithTime: true,
            tags: ['system', 'doc', 'design'],
            ...ids,
        },
        {
            name: 'Accessibility Audit Planning',
            dueAt: getRelativeDate(25, false), // July 6
            details:
                'Plan an accessibility audit to ensure the redesigned platform meets WCAG standards.',
            isWithTime: false,
            tags: ['accessibility', 'audit'],
            ...ids,
        },
        {
            name: 'Design Hand-off Prep for Development',
            dueAt: getRelativeDate(30, true), // July 11
            details:
                'Prepare all necessary design files and documentation for developer hand-off.',
            isWithTime: true,
            tags: ['handoff', 'dev'],
            ...ids,
        },
    ];
};

export const generateInternalCrmSystemApiIntegrationEvents = (ids: Ids) => {
    return [
        // Finished Events (3)
        {
            name: 'Project Kick-off Meeting',
            dueAt: getRelativeDate(-25, true), // Approx. May 17
            details:
                'Kick-off meeting for the CRM System API integration project.',
            isWithTime: true,
            tags: ['kickoff', 'crm', 'api'],
            ...ids,
        },
        {
            name: 'API Documentation Review',
            dueAt: getRelativeDate(-10, true), // Approx. June 1
            details:
                'Thoroughly reviewed the provided API documentation for the CRM system.',
            isWithTime: true,
            tags: ['api', 'docs', 'review'],
            ...ids,
        },
        {
            name: 'Initial System Audit',
            dueAt: getRelativeDate(-18, false), // Approx. May 24
            details:
                'Conducted an initial audit of the existing internal system for integration points.',
            isWithTime: false,
            tags: ['audit', 'system'],
            ...ids,
        },
        // Upcoming Events (7)
        {
            name: 'Authentication Method Confirmation',
            dueAt: getRelativeDate(2, true), // June 13
            details:
                'Confirm preferred authentication method with ByteNest for CRM API access.',
            isWithTime: true,
            tags: ['auth', 'security', 'client'],
            ...ids,
        },
        {
            name: 'Integration Plan Outline',
            dueAt: getRelativeDate(5, false), // June 16
            details:
                'Outline the high-level plan for integrating the CRM system.',
            isWithTime: false,
            tags: ['plan', 'integration'],
            ...ids,
        },
        {
            name: 'Secure Dev Environment Setup',
            dueAt: getRelativeDate(7, true), // June 18
            details:
                'Configure and set up a secure development environment for API integration.',
            isWithTime: true,
            tags: ['dev', 'setup', 'security'],
            ...ids,
        },
        {
            name: 'Core API Connection Module Dev',
            dueAt: getRelativeDate(12, true), // June 23
            details:
                'Develop the foundational module for connecting to the CRM API.',
            isWithTime: true,
            tags: ['api', 'dev', 'module'],
            ...ids,
        },
        {
            name: 'Initial API Endpoint Testing',
            dueAt: getRelativeDate(15, true), // June 26
            details: 'Perform preliminary tests on various CRM API endpoints.',
            isWithTime: true,
            tags: ['testing', 'api'],
            ...ids,
        },
        {
            name: 'Data Mapping Workshop',
            dueAt: getRelativeDate(20, false), // July 1
            details:
                'Workshop to define data mapping requirements between systems.',
            isWithTime: false,
            tags: ['data', 'mapping', 'workshop'],
            ...ids,
        },
        {
            name: 'Error Handling Logic Review',
            dueAt: getRelativeDate(25, true), // July 6
            details:
                'Review and refine error handling logic for robust API integration.',
            isWithTime: true,
            tags: ['error', 'logic', 'review'],
            ...ids,
        },
    ];
};

export const generateProductLaunchVideoExplainerAnimationEvents = (
    ids: Ids,
) => {
    return [
        // Finished Events (3)
        {
            name: 'Initial Client Briefing',
            dueAt: getRelativeDate(-45, true), // Approx. April 27
            details:
                'Held initial briefing for the product launch video and explainer animation.',
            isWithTime: true,
            tags: ['brief', 'video', 'launch'],
            ...ids,
        },
        {
            name: 'Script Draft 1 Sent',
            dueAt: getRelativeDate(-30, true), // Approx. May 12
            details:
                'Sent the first draft of the video script to ByteNest for review.',
            isWithTime: true,
            tags: ['script', 'draft', 'video'],
            ...ids,
        },
        {
            name: 'Storyboarding Session',
            dueAt: getRelativeDate(-35, false), // Approx. May 7
            details:
                'Conducted a creative session to develop initial storyboards for the videos.',
            isWithTime: false,
            tags: ['storyboard', 'creative'],
            ...ids,
        },
        // Upcoming Events (7)
        {
            name: 'Internal Resource Reallocation Check-in',
            dueAt: getRelativeDate(10, true), // June 21
            details:
                "Internal check-in to assess ByteNest's resource reallocation and project readiness.",
            isWithTime: true,
            tags: ['internal', 'resource', 'checkin'],
            ...ids,
        },
        {
            name: 'Budget Re-confirmation with Mr. Anan',
            dueAt: getRelativeDate(15, true), // June 26
            details:
                'Meeting with Mr. Anan to confirm the budget and new timeline for project restart (Q4 2025).',
            isWithTime: true,
            tags: ['budget', 'client', 'meeting'],
            ...ids,
        },
        {
            name: 'Voice-over Artist Auditions',
            dueAt: getRelativeDate(20, true), // July 1
            details:
                'Conduct auditions to select the voice-over artist for the explainer video.',
            isWithTime: true,
            tags: ['voice', 'casting'],
            ...ids,
        },
        {
            name: 'Animation Style Guide Creation',
            dueAt: getRelativeDate(25, false), // July 6
            details:
                'Develop a comprehensive style guide for the explainer animation, ensuring brand consistency.',
            isWithTime: false,
            tags: ['animation', 'style', 'guide'],
            ...ids,
        },
        {
            name: 'Asset Gathering for Production',
            dueAt: getRelativeDate(30, true), // July 11
            details:
                'Gather all necessary visual and audio assets for video production.',
            isWithTime: true,
            tags: ['assets', 'production'],
            ...ids,
        },
        {
            name: 'Background Music Selection',
            dueAt: getRelativeDate(35, false), // July 16
            details:
                'Select appropriate background music and sound effects for the video series.',
            isWithTime: false,
            tags: ['music', 'audio'],
            ...ids,
        },
        {
            name: 'Draft Video Editing Start',
            dueAt: getRelativeDate(40, true), // July 21
            details:
                'Begin the initial editing phase for the product launch video and explainer animation.',
            isWithTime: true,
            tags: ['edit', 'video'],
            ...ids,
        },
    ];
};

export const generateAutomatedDataReportingDashboardEvents = (ids: Ids) => {
    return [
        // Finished Events (3)
        {
            name: 'Requirements Gathering Workshop',
            dueAt: getRelativeDate(-50, true), // Approx. April 22
            details:
                'Conducted workshop to gather all requirements for the automated data reporting dashboard.',
            isWithTime: true,
            tags: ['workshop', 'data', 'reporting'],
            ...ids,
        },
        {
            name: 'Dashboard Prototype Development',
            dueAt: getRelativeDate(-35, false), // Approx. May 7
            details:
                "Developed initial prototypes and wireframes for the dashboard's user interface.",
            isWithTime: false,
            tags: ['prototype', 'design'],
            ...ids,
        },
        {
            name: 'Final Dashboard Delivery',
            dueAt: getRelativeDate(-14, true), // May 28
            details:
                'Delivered the final automated data reporting dashboard to ByteNest.',
            isWithTime: true,
            tags: ['delivery', 'project', 'completed'],
            ...ids,
        },
        // Upcoming Events (7) - Though project is completed, these relate to follow-ups or post-completion tasks/events
        {
            name: 'ByteNest Team Training Session',
            dueAt: getRelativeDate(-6, true), // June 5
            details:
                'Conducted a training session for the ByteNest team on how to use the new dashboard.',
            isWithTime: true,
            tags: ['training', 'support'],
            ...ids,
        },
        {
            name: 'Project Sign-off Document Filing',
            dueAt: getRelativeDate(1, false), // June 12
            details:
                'Formally file the project sign-off document for the completed dashboard.',
            isWithTime: false,
            tags: ['docs', 'admin'],
            ...ids,
        },
        {
            name: 'Internal Post-Mortem Meeting',
            dueAt: getRelativeDate(5, true), // June 16
            details:
                'Internal team meeting to discuss lessons learned from the dashboard project.',
            isWithTime: true,
            tags: ['internal', 'review'],
            ...ids,
        },
        {
            name: 'Client Testimonial Request Follow-up',
            dueAt: getRelativeDate(8, false), // June 19
            details:
                'Send follow-up email to ByteNest requesting a testimonial for the dashboard project.',
            isWithTime: false,
            tags: ['client', 'feedback'],
            ...ids,
        },
        {
            name: 'Performance Monitoring Setup',
            dueAt: getRelativeDate(12, true), // June 23
            details:
                'Set up monitoring tools to track the performance and usage of the live dashboard.',
            isWithTime: true,
            tags: ['monitor', 'analytics'],
            ...ids,
        },
        {
            name: 'Quarterly Check-in Planning (Q3)',
            dueAt: getRelativeDate(20, true), // July 1
            details:
                'Plan for a quarterly check-in with ByteNest regarding dashboard performance and potential updates.',
            isWithTime: true,
            tags: ['planning', 'support'],
            ...ids,
        },
        {
            name: 'Case Study Development Kick-off',
            dueAt: getRelativeDate(30, false), // July 11
            details:
                'Begin developing a case study based on the successful Automated Data Reporting Dashboard project.',
            isWithTime: false,
            tags: ['case', 'marketing'],
            ...ids,
        },
    ];
};

export const generateWebsitePerformanceAuditOptimizationEvents = (ids: Ids) => {
    return [
        // Finished Events (3)
        {
            name: 'Initial Project Briefing',
            dueAt: getRelativeDate(-20, true), // Approx. May 22
            details:
                'Held a kick-off meeting to define scope and objectives for the website performance audit.',
            isWithTime: true,
            tags: ['brief', 'audit', 'website'],
            ...ids,
        },
        {
            name: 'Data Collection & Analysis Start',
            dueAt: getRelativeDate(-15, false), // Approx. May 27
            details:
                'Commenced data collection and initial analysis using various performance tools.',
            isWithTime: false,
            tags: ['data', 'analysis'],
            ...ids,
        },
        {
            name: 'Initial Audit Report Drafted',
            dueAt: getRelativeDate(-5, true), // June 6
            details:
                'Completed the first draft of the website performance audit report.',
            isWithTime: true,
            tags: ['report', 'draft'],
            ...ids,
        },
        // Upcoming Events (7)
        {
            name: 'Client Meeting to Discuss Findings',
            dueAt: getRelativeDate(6, true), // June 17
            details:
                'Meeting with ByteNest to discuss initial audit findings and proposed next steps, focusing on web vitals.',
            link: 'https://meet.google.com/bytenest-audit',
            isWithTime: true,
            tags: ['client', 'meeting', 'audit'],
            ...ids,
        },
        {
            name: 'Server Response Time Optimization Plan',
            dueAt: getRelativeDate(10, false), // June 21
            details:
                'Develop a detailed plan for optimizing server response times and backend performance.',
            isWithTime: false,
            tags: ['server', 'optimize', 'plan'],
            ...ids,
        },
        {
            name: 'Core Web Vitals Improvement Strategy',
            dueAt: getRelativeDate(14, true), // June 25
            details:
                'Formulate a strategy specifically targeting improvements for LCP, FID, and CLS.',
            isWithTime: true,
            tags: ['web', 'vitals', 'strategy'],
            ...ids,
        },
        {
            name: 'Image & Media Optimization Session',
            dueAt: getRelativeDate(18, true), // June 29
            details:
                'Internal session to devise a comprehensive strategy for image and media asset optimization.',
            isWithTime: true,
            tags: ['image', 'optimize', 'media'],
            ...ids,
        },
        {
            name: 'Code Minification & Compression Review',
            dueAt: getRelativeDate(22, false), // July 3
            details:
                'Review current code minification and compression techniques, propose improvements.',
            isWithTime: false,
            tags: ['code', 'compression'],
            ...ids,
        },
        {
            name: 'CDN Implementation Strategy',
            dueAt: getRelativeDate(26, true), // July 7
            details:
                'Develop a strategy for effective CDN implementation to boost content delivery.',
            isWithTime: true,
            tags: ['cdn', 'strategy'],
            ...ids,
        },
        {
            name: 'Follow-up Optimization Progress Meeting',
            dueAt: getRelativeDate(35, true), // July 16
            details:
                'Schedule a follow-up meeting with ByteNest to review progress on implemented optimizations.',
            isWithTime: true,
            tags: ['followup', 'progress'],
            ...ids,
        },
    ];
};

export const getByteNestTechSolutionsEvents = (ids: Ids) => {
    const byteNestTechSolutionsEventGenerators: [string, any][] = [
        [
            'E-commerce Platform UI/UX Redesign',
            generateEcommercePlatformUiUxRedesignEvents,
        ],
        [
            'Internal CRM System API Integration',
            generateInternalCrmSystemApiIntegrationEvents,
        ],
        [
            'Product Launch Video & Explainer Animation',
            generateProductLaunchVideoExplainerAnimationEvents,
        ],
        [
            'Automated Data Reporting Dashboard',
            generateAutomatedDataReportingDashboardEvents,
        ],
        [
            'Website Performance Audit & Optimization',
            generateWebsitePerformanceAuditOptimizationEvents,
        ],
    ];

    return byteNestTechSolutionsEventGenerators.flatMap(
        ([projectTitle, generateFn]) => {
            const projectIds = ids[projectTitle];

            if (!projectIds) {
                console.warn(
                    `Warning: IDs not found for project: "${projectTitle}" for ByteNest Tech Solutions. No events generated.`,
                );
                return [];
            }

            return generateFn(projectIds);
        },
    );
};
