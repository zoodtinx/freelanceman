export const generateEcoGlideElectricScootersContacts = (
    userId: string,
    clientId: string,
) => {
    return [
        {
            name: 'Jiraporn White',
            role: 'Marketing Lead',
            phoneNumber: '090-444-5555',
            email: 'jiraporn.w@ecoglide.com',
            detail: 'Oversees all brand communication and campaign strategies. Needs creative assets to align with their sustainability message. Responsive via Line for quick queries.',
            userId: userId,
            clientId: clientId,
            avatar: `${userId}/eco-glide-electric-scooters/jiraporn-white.jpg`,
        },
        {
            name: 'Pichai Evans',
            role: 'Product Manager',
            phoneNumber: '083-777-8888',
            email: 'pichai.e@ecoglide.com',
            detail: 'Provides technical specifications and product features for marketing content. Less involved in day-to-day creative, more for factual review. Best reached via email.',
            userId: userId,
            clientId: clientId,
            avatar: `${userId}/eco-glide-electric-scooters/pichai-evans.jpg`,
        },
    ];
};
