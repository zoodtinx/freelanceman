

export const mockProjects = [
    [
        {
            title: 'Brand Identity for Acme Corp',
            budget: 5000,
            projectStatus: 'In Progress',
            paymentStatus: 'Partial',
            links: [
                'https://www.behance.net/gallery/Branding-Acme-Corp',
                'https://www.figma.com/file/Acme-Brand-Guidelines',
            ],
            note: 'Client requested a revision on the color scheme.',
            events: [
                {
                    name: 'Event 1',
                    status: 'Pending',
                    details: 'Event details here',
                    link: 'https://example.com/event1',
                    dueAt: new Date('2025-05-01T10:00:00Z').toISOString(),
                    tags: ['urgent', 'client-meeting'],
                    createdAt: new Date('2025-04-01T08:00:00Z').toISOString(),
                    updatedAt: new Date('2025-04-02T08:00:00Z').toISOString(),
                    project: { name: 'Project 1' },
                    client: { name: 'Client 1' },
                    user: { name: 'User 1' },
                },
                {
                    name: 'Event 2',
                    status: 'Completed',
                    details: 'Event details here',
                    link: 'https://example.com/event2',
                    dueAt: new Date('2025-05-15T10:00:00Z').toISOString(),
                    tags: ['completed', 'follow-up'],
                    createdAt: new Date('2025-03-15T08:00:00Z').toISOString(),
                    updatedAt: new Date('2025-03-16T08:00:00Z').toISOString(),
                    project: { name: 'Project 2' },
                    client: { name: 'Client 2' },
                    user: { name: 'User 2' },
                },
            ],
            files: [
                {
                    originalName: 'file1.pdf',
                    displayName: 'File 1',
                    type: 'application/pdf',
                    category: 'document',
                    link: 'https://example.com/file1.pdf',
                    s3Key: 's3/key/to/file1',
                    size: 1024,
                    createdAt: new Date('2025-04-01T08:00:00Z').toISOString(),
                    updatedAt: new Date('2025-04-02T08:00:00Z').toISOString(),
                    client: { name: 'Client 1' },
                    project: { name: 'Project 1' },
                    user: { name: 'User 1' },
                },
                {
                    originalName: 'image1.jpg',
                    displayName: 'Image 1',
                    type: 'image/jpeg',
                    category: 'image',
                    link: 'https://example.com/image1.jpg',
                    s3Key: 's3/key/to/image1',
                    size: 2048,
                    createdAt: new Date('2025-03-15T08:00:00Z').toISOString(),
                    updatedAt: new Date('2025-03-16T08:00:00Z').toISOString(),
                    client: { name: 'Client 2' },
                    project: { name: 'Project 2' },
                    user: { name: 'User 2' },
                },
            ],
            salesDocuments: [
                {
                    title: 'Invoice #001',
                    category: 'Invoice',
                    number: 'INV-001',
                    issuedAt: new Date('2025-04-01T10:00:00Z').toISOString(),
                    currency: 'USD',
                    referenceNumber: 'REF-123',
                    projectDescription: 'Web development for Client 1',
                    freelancerName: 'Freelancer A',
                    freelanceremail: 'freelancerA@example.com',
                    freelancerPhone: '+1234567890',
                    freelancerTaxId: 'TAX123456789',
                    freelancerDetail:
                        'Freelancer specialized in web design and development',
                    clientName: 'Client 1',
                    clientTaxId: 'TAX987654321',
                    clientAddress: '123 Client St, City, Country',
                    clientPhone: '+0987654321',
                    clientOffice: 'Client Office',
                    clientDetail: 'Client is a software company',
                    subtotal: 5000.0,
                    discount: 500.0,
                    tax: 450.0,
                    total: 4950.0,
                    customAdjustment: 0,
                    note: 'Payment due within 30 days',
                    createdAt: new Date('2025-04-01T10:00:00Z').toISOString(),
                    updatedAt: new Date('2025-04-02T10:00:00Z').toISOString(),
                    client: { name: 'Client 1' },
                    project: { name: 'Project 1' },
                    user: { name: 'User 1' },
                    items: [
                        {
                            description: 'Web Design',
                            quantity: 1,
                            unitPrice: 4000,
                            totalPrice: 4000,
                        },
                        {
                            description: 'Development Work',
                            quantity: 1,
                            unitPrice: 1000,
                            totalPrice: 1000,
                        },
                    ],
                },
                {
                    title: 'Invoice #002',
                    category: 'Invoice',
                    number: 'INV-002',
                    issuedAt: new Date('2025-03-15T10:00:00Z').toISOString(),
                    currency: 'USD',
                    referenceNumber: 'REF-124',
                    projectDescription: 'App development for Client 2',
                    freelancerName: 'Freelancer B',
                    freelanceremail: 'freelancerB@example.com',
                    freelancerPhone: '+1987654321',
                    freelancerTaxId: 'TAX123456788',
                    freelancerDetail:
                        'Freelancer specialized in mobile app development',
                    clientName: 'Client 2',
                    clientTaxId: 'TAX987654322',
                    clientAddress: '456 Client Ave, City, Country',
                    clientPhone: '+1987654320',
                    clientOffice: 'Client Office B',
                    clientDetail: 'Client is a mobile app company',
                    subtotal: 8000.0,
                    discount: 800.0,
                    tax: 720.0,
                    total: 7920.0,
                    customAdjustment: 0,
                    note: 'Payment due upon receipt',
                    createdAt: new Date('2025-03-15T10:00:00Z').toISOString(),
                    updatedAt: new Date('2025-03-16T10:00:00Z').toISOString(),
                    client: { name: 'Client 2' },
                    project: { name: 'Project 2' },
                    user: { name: 'User 2' },
                    items: [
                        {
                            description: 'App Design',
                            quantity: 1,
                            unitPrice: 5000,
                            totalPrice: 5000,
                        },
                        {
                            description: 'App Development',
                            quantity: 1,
                            unitPrice: 3000,
                            totalPrice: 3000,
                        },
                    ],
                },
            ],
            tasks: [
                {
                    name: 'Task 1',
                    status: 'In Progress',
                    details: 'Task details here',
                    link: 'https://example.com/task1',
                    dueAt: new Date('2025-05-10T10:00:00Z').toISOString(),
                    createdAt: new Date('2025-04-01T08:00:00Z').toISOString(),
                    updatedAt: new Date('2025-04-02T08:00:00Z').toISOString(),
                    project: { name: 'Project 1' },
                    client: { name: 'Client 1' },
                    user: { name: 'User 1' },
                },
                {
                    name: 'Task 2',
                    status: 'Completed',
                    details: 'Task details here',
                    link: 'https://example.com/task2',
                    dueAt: new Date('2025-06-01T10:00:00Z').toISOString(),
                    createdAt: new Date('2025-03-15T08:00:00Z').toISOString(),
                    updatedAt: new Date('2025-03-16T08:00:00Z').toISOString(),
                    project: { name: 'Project 2' },
                    client: { name: 'Client 2' },
                    user: { name: 'User 2' },
                },
            ],
        },
        {
            title: 'E-commerce Website for FreshMart',
            budget: 12000,
            projectStatus: 'Completed',
            paymentStatus: 'Paid',
            links: [
                'https://freshmart.com',
                'https://github.com/user/freshmart-ecommerce',
            ],
            note: 'Deployed successfully, client happy with the final product.',
        },
        {
            title: 'Social Media Ad Campaign for TechNova',
            budget: 3500,
            projectStatus: 'Completed',
            paymentStatus: 'Paid',
            links: [
                'https://technova.com',
                'https://github.com/user/technova-campaign',
            ],
            note: 'Campaign results exceeded expectations.',
        },
    ],
];

export interface SeedProjectType {
    title: string;
    budget: number;
    projectStatus: string;
    paymentStatus: string;
    links: string[];
    note: string;
    events: {
        name: string;
        status: string;
        details: string;
        link: string;
        dueAt: Date;
        tags: string[];
        createdAt: Date;
        updatedAt: Date;
        project: { name: string };
        client: { name: string };
        user: { name: string };
    }[];
    files: {
        originalName: string;
        displayName: string;
        type: string;
        category: string;
        link: string;
        s3Key: string;
        size: number;
        createdAt: Date;
        updatedAt: Date;
        client: { name: string };
        project: { name: string };
        user: { name: string };
    }[];
    salesDocuments: {
        title: string;
        category: string;
        number: string;
        issuedAt: Date;
        currency: string;
        referenceNumber: string;
        projectDescription: string;
        freelancerName: string;
        freelanceremail: string;
        freelancerPhone: string;
        freelancerTaxId: string;
        freelancerDetail: string;
        clientName: string;
        clientTaxId: string;
        clientAddress: string;
        clientPhone: string;
        clientOffice: string;
        clientDetail: string;
        subtotal: number;
        discount: number;
        tax: number;
        total: number;
        customAdjustment: number;
        note: string;
        createdAt: Date;
        updatedAt: Date;
        client: { name: string };
        project: { name: string };
        user: { name: string };
        items: {
            description: string;
            quantity: number;
            unitPrice: number;
            totalPrice: number;
        }[];
    }[];
    tasks: {
        name: string;
        status: string;
        details: string;
        link: string;
        dueAt: Date;
        createdAt: Date;
        updatedAt: Date;
        project: { name: string };
        client: { name: string };
        user: { name: string };
    }[];
}
