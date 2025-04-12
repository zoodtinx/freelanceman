const quotation = {
    userId: 'user_001',
    title: 'Website Redesign Quotation',
    category: 'Quotation',
    number: 'Q-2025-001',
    issuedAt: new Date('2025-04-10').toISOString(),
    currency: 'THB',
    projectId: 'proj_123',
    referenceNumber: 'REF-Q001',
    projectDescription: 'Redesign of e-commerce website UI/UX',
    selectedProjectClientId: 'client_proj_123',
    freelancerName: 'Niran S.',
    freelancerEmail: 'niran@example.com',
    freelancerPhone: '0812345678',
    freelancerTaxId: '1234567890123',
    freelancerDetail: 'Bangkok-based freelance web designer',
    clientId: 'client_001',
    clientName: 'Acme Corp.',
    clientTaxId: '9876543210987',
    clientAddress: '123 Sukhumvit Rd, Bangkok',
    clientPhone: '022345678',
    clientOffice: 'Acme HQ',
    clientDetail: 'Contact: Jane Doe (Marketing)',
    subtotal: 50000,
    discount: 5000,
    tax: 3325,
    total: 48325,
    customAdjustment: 0,
    note: 'Quotation valid for 30 days',
};

const invoice = {
    ...quotation,
    category: 'Invoice',
    number: 'INV-2025-001',
    referenceNumber: 'REF-I001',
    issuedAt: new Date('2025-04-11').toISOString(),
    note: 'Due in 15 days',
};

const receipt = {
    ...quotation,
    category: 'Receipt',
    number: 'RCPT-2025-001',
    referenceNumber: 'REF-R001',
    issuedAt: new Date('2025-04-12').toISOString(),
    note: 'Full payment received via bank transfer',
};

export const getSeedSalesDocumentData = (
    userId: string,
    projectId: string,
    clientId: string,
) => [
    {
        ...quotation,
        userId,
        projectId,
        clientId,
    },
    {
        ...invoice,
        userId,
        projectId,
        clientId,
    },
    {
        ...receipt,
        userId,
        projectId,
        clientId,
    },
];
