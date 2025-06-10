export const generateHarmonyMusicAcademyContacts = (
    userId: string,
    clientId: string,
) => {
    return [
        {
            name: 'Thanaporn Miller',
            role: 'Academy Director',
            phoneNumber: '087-987-6543',
            email: 'thanaporn.m@harmonymusic.ac.th',
            detail: 'Oversees all academy operations and final approvals for major projects. Available for meetings usually in the late mornings.',
            userId: userId,
            clientId: clientId,
            avatar: `${userId}/harmony-music-academy/thanaporn-miller.jpg`,
        },
        {
            name: 'Natcha Clark',
            role: 'Marketing & Enrollment Coordinator',
            phoneNumber: '099-111-2222',
            email: 'natcha.c@harmonymusic.ac.th',
            detail: 'Primary contact for daily marketing tasks and content gathering. Very responsive on Line. Provides student testimonials and photos for campaigns.',
            userId: userId,
            clientId: clientId,
            avatar: `${userId}/harmony-music-academy/natcha-clark.jpg`,
        },
    ];
};
