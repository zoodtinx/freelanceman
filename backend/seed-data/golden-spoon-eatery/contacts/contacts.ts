export const generateGoldenSpoonEateryContacts = (
    userId: string,
    clientId: string,
) => {
    return [
        {
            name: 'Somsak Taylor',
            role: 'Owner & Head Chef',
            phoneNumber: '086-555-1234',
            email: 'somsak.t@goldenspoon.com',
            detail: 'Main decision-maker for all creative and marketing materials. Prefers direct calls for urgent matters. Very passionate about his food.',
            userId: userId,
            clientId: clientId,
            avatar: `${userId}/golden-spoon-eatery/somsak-taylor.jpg`,
        },
    ];
};
