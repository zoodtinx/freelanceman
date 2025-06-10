export const generateUrbanFlowFitnessContacts = (
    userId: string,
    clientId: string,
) => {
    return [
        {
            name: 'Pornchai Smith',
            role: 'Studio Manager',
            phoneNumber: '081-234-5678',
            email: 'pornchai.s@urbanflow.com',
            detail: 'Primary contact for daily operations and scheduling. Responds best to Line messages for quick queries. Very detail-oriented with invoices.',
            userId: userId,
            clientId: clientId,
            avatar: `${userId}/urban-flow-fitness/pornchai-smith.jpg`,
        },
        {
            name: 'Darika Johnson',
            role: 'Marketing Coordinator',
            phoneNumber: '092-876-5432',
            email: 'darika.j@urbanflow.com',
            detail: 'Main contact for creative briefs and content approvals. Prefers email for formal communication. Usually available in the afternoons.',
            userId: userId,
            clientId: clientId,
            avatar: `${userId}/urban-flow-fitness/darika-johnson.jpg`,
        },
    ];
};
