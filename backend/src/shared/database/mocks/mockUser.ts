import { v4 as uuidv4 } from 'uuid';

const passwords = [
    {
        original: 'password123',
        hashed: '$2b$12$jnqIkR/ThiiYLnRTkbQBUONM4omdrSqqM9GChC0WhKepI1DDVnUGO',
    },
    {
        original: 'mysecurepass',
        hashed: '$2b$12$/Smebfjd2Lg6fE1jyn6mLOyXZtnQjgbhyfGlSbrg4zWsiGkHUOpNK',
    },
    {
        original: 'freelance2025',
        hashed: '$2b$12$LFfScrVMr60u7L4120H7GuwAcpbwe5QkDjsFFKUptUIwdIVl1iMEW',
    },
    {
        original: 'nestjsrocks',
        hashed: '$2b$12$cqx5385L8W3I4LT6JykFjui4NTKRLKpOBwbvZkovRFLISngohAbaK',
    },
];

// function generateRandomUniqueEmail(): string {
//     const uniqueId = Math.random().toString(36).substring(2, 10);
//     return `user-${uniqueId}@example.com`;
// }

// export const getUserWithUniqueEmail = () => {
//     return {
//         displayName: 'John Doe',
//         password: '$2b$12$jnqIkR/ThiiYLnRTkbQBUONM4omdrSqqM9GChC0WhKepI1DDVnUGO',
//         email: generateRandomUniqueEmail(),
//         specialization: ['Graphic Design', 'Illustration'],
//         pinnedProjects: [],
//         quitting: false,
//     }
// }

export const mockUserRecords = [
    {
        displayName: 'John Doe',
        password: passwords[0].hashed,
        email: 'alice.sssmidfdfth@example.com',
        specialization: ['Graphic Design', 'Illustration'],
        pinnedProjects: [],
        quitting: false,
    },
    {
        id: 'e1e71ab4-1506-49f4-8760-eeada600ac70',
        displayName: 'Alice Smith',
        password: passwords[1].hashed,
        email: 'alice.smith@example.com',
        specialization: ['Web Development', 'UI/UX'],
        pinnedProjects: ['project-123'],
        quitting: false,
    },
    {
        id: '8b9d34f0-e9ad-4f0e-b766-d9d6b4244db1',
        displayName: 'Bob Johnson',
        password: passwords[2].hashed,
        email: 'bob.johnson@example.com',
        specialization: ['Photography'],
        bio: 'Freelance photographer capturing stunning visuals.',
        avatar: 'https://example.com/avatar.jpg',
        pinnedProjects: ['photo-456'],
        quitting: false,
    },
    {
        id: 'ba18c8ee-c2a0-4272-8216-8dc25322fc77',
        displayName: 'Charlie Adams',
        password: passwords[3].hashed,
        email: 'charlie.adams@example.com',
        specialization: ['Video Editing'],
        bio: 'Passionate about storytelling through video.',
        phoneNumber: '+123456789',
        quitting: false,
    },
];

export const mockUser = {
    displayName: 'Jane Doe',
    email: 'jane.doe@example.com',
    password: passwords[0].hashed,
    specialization: ['Graphic Design', 'Branding'],
    bio: 'Creative freelancer with 5+ years experience.',
    role: 'user',
    phoneNumber: '+66999999999',
    address: '123 Sukhumvit, Bangkok, Thailand',
    avatar: 'https://example.com/avatar.jpg',
    pinnedProjects: [],
    currency: 'THB',
    isDemo: false,
    quitting: false,
};

export default mockUserRecords;

