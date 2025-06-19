

export const getByteNestTechSolutionsLinks = (ids: any) => {
    const byteNestTechSolutionsLinkGenerators: [string, any][] = [
        ['E-commerce Platform UI/UX Redesign', generateEcommercePlatformUiUxRedesignLinks],
        ['Internal CRM System API Integration', generateInternalCrmSystemApiIntegrationLinks],
        ['Product Launch Video & Explainer Animation', generateProductLaunchVideoExplainerAnimationLinks],
        ['Automated Data Reporting Dashboard', generateAutomatedDataReportingDashboardLinks],
        ['Website Performance Audit & Optimization', generateWebsitePerformanceAuditOptimizationLinks],
    ];

    return byteNestTechSolutionsLinkGenerators.flatMap(([projectTitle, generateFn]) => {
        const projectIds = ids[projectTitle];

        if (!projectIds) {
            console.warn(
                `Warning: IDs not found for project: "${projectTitle}" for ByteNest Tech Solutions. No links generated.`,
            );
            return [];
        }

        return generateFn(projectIds);
    });
};

export const generateEcommercePlatformUiUxRedesignLinks = (ids: any) => {
    return [
        { label: 'Project Brief', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Wireframe Prototypes', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'UI/UX Style Guide', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Motion Prototype Demos', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Competitor Analysis: ShopFlow', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Client Feedback Portal', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
    ];
};

export const generateInternalCrmSystemApiIntegrationLinks = (ids: any) => {
    return [
        { label: 'API Integration Brief', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'CRM API Documentation', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Authentication Method Proposal', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Integration Test Plan', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Security Compliance Checklist', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
    ];
};

export const generateProductLaunchVideoExplainerAnimationLinks = (ids: any) => {
    return [
        { label: 'Video Project Brief', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Script Drafts (V1-V3)', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Storyboard Concepts', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Resource Allocation Document', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Mr. Anan Contact Details', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Budget Breakdown', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
    ];
};

export const generateAutomatedDataReportingDashboardLinks = (ids: any) => {
    return [
        { label: 'Dashboard Requirements Doc', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Final Dashboard Access', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Training Session Materials', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Project Sign-off Form', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Testimonial Request Template', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Post-Mortem Review Notes', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
    ];
};

export const generateWebsitePerformanceAuditOptimizationLinks = (ids: any) => {
    return [
        { label: 'Initial Audit Report Draft', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Performance Metrics Dashboard', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Client Meeting Presentation', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Core Web Vitals Checklist', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Optimization Action Plan', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Server Log Analysis', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Competitor Benchmarking', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
    ];
};
