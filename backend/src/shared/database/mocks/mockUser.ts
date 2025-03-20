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

export const mockUserRecords = [
  {
    id: '2769d98f-1e25-49ad-9e41-c05d3d261ef4',
    displayName: 'John Doe',
    password: passwords[0].hashed,
    email: 'john.doe@example.com',
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

export default mockUserRecords;
