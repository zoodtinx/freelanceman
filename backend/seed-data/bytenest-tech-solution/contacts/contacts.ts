export const generateByteNestTechSolutionsContacts = (
    userId: string,
    clientId: string,
) => {
    return [
        {
            name: 'Supanee Davis',
            role: 'Project Manager',
            phoneNumber: '089-123-4567',
            email: 'supanee.d@bytenest.com',
            detail: 'Primary point of contact for all ongoing development projects. Very responsive via email during working hours. Prefers concise updates.',
            userId: userId,
            clientId: clientId,
            avatar: `${userId}/bytenest-tech-solutions/supanee-davis.jpg`,
        },
        {
            name: 'Thanet Wilson',
            role: 'Head of Product',
            phoneNumber: '098-765-4321',
            email: 'thanet.w@bytenest.com',
            detail: 'Involved in strategic decisions and high-level feature approvals. Requires detailed documentation for new features. Best to schedule calls in advance.',
            userId: userId,
            clientId: clientId,
            avatar: `${userId}/bytenest-tech-solutions/thanet-wilson.jpg`,
        },
        {
            name: 'Malee Brown',
            role: 'Marketing Director',
            phoneNumber: '061-222-3333',
            email: 'malee.b@bytenest.com',
            detail: 'Oversees marketing campaigns and creative assets. Needs to review all public-facing content. Available for quick chats on Line.',
            userId: userId,
            clientId: clientId,
            avatar: `${userId}/bytenest-tech-solutions/malee-brown.jpg`,
        },
    ];
};
