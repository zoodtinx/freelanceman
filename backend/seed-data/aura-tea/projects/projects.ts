export const generateAuraTeaCoProjects = (userId: string) => {
    return [
        {
            userId: userId, // Injected userId
            title: "New 'Tropical Bliss' Blend Packaging Design",
            budget: 55000, // THB - for packaging design of a new tea blend (box, pouch, label)
            projectStatus: 'active',
            paymentStatus: 'processing',
            note: 'Initial mood board and color palette approved.\n\nClient wants to see 3-4 distinct design concepts by June 20th.\n\nEmphasize freshness and exotic fruits in the design.',
        },
        {
            userId: userId, // Injected userId
            title: 'Q3 Social Media Content & Engagement Strategy',
            budget: 40000, // THB - for content calendar, graphic assets, and engagement plan for the quarter
            projectStatus: 'active',
            paymentStatus: 'pending',
            note: 'Strategy document submitted last week.\n\nNeed to schedule review call with Ms. Preeya for June 12th, 2 PM (Thai time).\n\nFocus on user-generated content and healthy lifestyle angles.',
        },
        {
            userId: userId, // Injected userId
            title: "Brand Story Video for 'About Us' Page",
            budget: 80000, // THB - for short documentary-style video production (script, shoot, edit)
            projectStatus: 'on-hold',
            paymentStatus: 'pending',
            note: 'Script draft 1 pending client feedback (sent May 29th).\n\nFilming locations need to be scouted in Chiang Rai.\n\nProject on hold until client confirms budget for travel.\n\nFollow up with Mr. Sakda on June 18th if no response.',
        },
    ];
};
