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
      displayName: 'John Doe',
      password: passwords[0].hashed,
      email: 'john.doe@example.com',
      specialization: ['Graphic Design', 'Illustration'],
      pinnedProjects: [],
      quitting: false,
    },
    {
      displayName: 'Alice Smith',
      password: passwords[1].hashed,
      email: 'alice.smith@example.com',
      specialization: ['Web Development', 'UI/UX'],
      pinnedProjects: ['project-123'],
      quitting: false,
    },
    {
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
