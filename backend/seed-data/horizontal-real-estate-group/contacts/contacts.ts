export const generateHorizonRealEstateGroupContacts = (
    userId: string,
    clientId: string,
) => {
    return [
        {
            name: 'Chaiyut Green',
            role: 'Marketing Manager',
            phoneNumber: '085-111-9999',
            email: 'chaiyut.g@horizonre.com',
            detail: 'Main contact for all property marketing collateral. Requires regular updates on project progress. Often on site, so email is preferred for initial contact.',
            userId: userId,
            clientId: clientId,
            avatar: `${userId}/horizon-real-estate-group/chaiyut-green.jpg`,
        },
    ];
};
