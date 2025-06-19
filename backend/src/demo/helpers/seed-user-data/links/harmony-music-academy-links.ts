export const getHarmonyMusicAcademyLinks = (ids: any) => {
    const harmonyMusicAcademyLinkGenerators: [string, any][] = [
        ['Annual Student Concert Branding & Tickets', generateAnnualStudentConcertBrandingTicketsLinks],
        ['New Online Course Landing Page (Guitar Basics)', generateNewOnlineCourseLandingPageLinks],
        ['Music Theory Blog Content Strategy & First 5 Articles', generateMusicTheoryBlogContentStrategyArticlesLinks],
    ];

    return harmonyMusicAcademyLinkGenerators.flatMap(([projectTitle, generateFn]) => {
        const projectIds = ids[projectTitle];

        if (!projectIds) {
            console.warn(
                `Warning: IDs not found for project: "${projectTitle}" for Harmony Music Academy. No links generated.`,
            );
            return [];
        }

        return generateFn(projectIds);
    });
};

export const generateAnnualStudentConcertBrandingTicketsLinks = (ids: any) => {
    return [
        { label: 'Project Brief: Concert Branding', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Initial Branding Concepts (Google Drive)', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Client Feedback Form', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Print Quote Request Form', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Ticket Design Templates', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Concert Marketing Plan', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
    ];
};

export const generateNewOnlineCourseLandingPageLinks = (ids: any) => {
    return [
        { label: 'Landing Page Project Outline', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Initial Wireframes', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Course Content Checklist', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Video Asset Requirements', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Ms. Lily Contact Info', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Budget Allocation Sheet', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
    ];
};

export const generateMusicTheoryBlogContentStrategyArticlesLinks = (ids: any) => {
    return [
        { label: 'Content Strategy Document (Final)', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Published Articles (Blog Link)', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'SEO Keyword Research', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Performance Analytics Dashboard', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Ongoing Content Package Proposal', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Client Feedback Survey', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
        { label: 'Case Study Draft', url: 'https://c.tenor.com/BWWpulxG8rIAAAAC/tenor.gif', ...ids },
    ];
};
