export const generateAuraTeaCoContacts = (
    userId: string,
    clientId: string,
) => {
    return [
        {
            name: 'Supaporn Evans',
            role: 'Brand Manager',
            phoneNumber: '088-222-7777',
            email: 'supaporn.e@auratea.com',
            detail: 'Primary contact for marketing campaigns and new product launches. Very focused on brand consistency and storytelling. Prefers email for main communication.',
            userId: userId,
            clientId: clientId,
            avatar: `${userId}/aura-tea-co/supaporn-evans.jpg`,
        },
        {
            name: 'Thanawat Lee',
            role: 'Co-Founder',
            phoneNumber: '095-666-1234',
            email: 'thanawat.l@auratea.com',
            detail: 'Involved in strategic decisions and final product approvals. Provides insights into tea blends and sourcing. Occasionally travels, so schedule calls in advance.',
            userId: userId,
            clientId: clientId,
            avatar: `${userId}/aura-tea-co/thanawat-lee.jpg`,
        },
    ];
};
