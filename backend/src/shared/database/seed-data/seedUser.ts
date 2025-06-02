import { v4 as uuidv4 } from 'uuid';

export const seedUser = () => {
    const emailValue = uuidv4()
    return {
        isDemo: true,
        isFirstTimeVisitor: true,
        displayName: 'Nattapong Srisuk',
        // email: uuidv4(),
        password: '$2b$10$hashedpasswordexample456xyz',
        specialization: ['Photography', 'Retouching'],
        bio: 'Freelance photographer based in Chiang Mai, specializing in portrait and editorial shoots.',
        role: 'user',
        taxId: '110-5564-89-7575',
        phoneNumber: '+66 89 456 7890',
        address: '135 Nimmanhaemin Rd, Chiang Mai 50200, Thailand',
        avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
        currency: 'THB',
        quitting: false,
    };
};
