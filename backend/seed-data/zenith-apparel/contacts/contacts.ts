export const generateZenithApparelContacts = (
    userId: string,
    clientId: string,
) => {
    return [
        {
            name: 'Nattaya Hall',
            role: 'Creative Director',
            phoneNumber: '081-999-0000',
            email: 'nattaya.h@zenithapparel.com',
            detail: 'Oversees all design and visual direction. Provides key insights for seasonal collections and brand identity. Prefers visual examples and concise presentations.',
            userId: userId,
            clientId: clientId,
            avatar: `${userId}/zenith-apparel/nattaya-hall.jpg`,
        },
        {
            name: 'Sukanya Lewis',
            role: 'Marketing Manager',
            phoneNumber: '092-333-4444',
            email: 'sukanya.l@zenithapparel.com',
            detail: 'Primary contact for campaign execution, social media, and advertising. Needs all assets on time for scheduled launches. Very organized and detail-oriented.',
            userId: userId,
            clientId: clientId,
            avatar: `${userId}/zenith-apparel/sukanya-lewis.jpg`,
        },
        {
            name: 'Montri King',
            role: 'E-commerce Manager',
            phoneNumber: '063-777-1111',
            email: 'montri.k@zenithapparel.com',
            detail: 'Manages the online store and digital sales. Provides product data and web specifications. Requires quick turnaround for website content updates.',
            userId: userId,
            clientId: clientId,
            avatar: `${userId}/zenith-apparel/montri-king.jpg`,
        },
    ];
};
