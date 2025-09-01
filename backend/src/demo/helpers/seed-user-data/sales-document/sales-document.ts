import { Ids } from '@/demo/helpers/seed-user-data/helper';

export const getAuraTeaCoSalesDoc = (ids: Ids) => {
    const auraTeaCoTaskGenerators: [string, any][] = [
        ["Brand Story Video for 'About Us' Page", generateAuraTeaCoSalesDoc],
    ];

    return auraTeaCoTaskGenerators.flatMap(([projectTitle, generateFn]) => {
        const projectIds = ids[projectTitle];

        if (!projectIds) {
            console.warn(
                `Warning: IDs not found for project: "${projectTitle}" for Aura Tea Co. No sales doc generated.`,
            );
            return [];
        }

        return generateFn(projectIds);
    });
};

export const getByteNestSalesDoc = (ids: Ids) => {
    const auraTeaCoTaskGenerators: [string, any][] = [
        ['Internal CRM System API Integration', generateByteNestQuotation],
    ];

    return auraTeaCoTaskGenerators.flatMap(([projectTitle, generateFn]) => {
        const projectIds = ids[projectTitle];

        if (!projectIds) {
            console.warn(
                `Warning: IDs not found for project: "${projectTitle}" for ByteNest Solution. No sales doc generated.`,
            );
            return [];
        }

        return generateFn(projectIds);
    });
};

export function generateAuraTeaCoSalesDoc(ids: Ids) {
    const { userId, clientId, projectId } = ids;
    const baseDocumentData = {
        userId: userId,
        clientId: clientId,
        projectId: projectId,
        freelancerName: 'Nawapol Jake',
        freelancerEmail: 'nawapol.jake@example.com',
        freelancerPhone: '+66812345678',
        freelancerTaxId: null,
        freelancerAddress:
            '123 Art Studio, Bang Phli Yai, Samut Prakan, Thailand',
        clientName: 'Aura Tea Co',
        clientTaxId: '123-456-7890',
        clientAddress: '123 Tea Leaf Lane, Serenity City, CA 90210',
        clientPhone: '+1-555-123-4567',
        clientOffice: null,
        clientDetail:
            'Premium organic tea distributor specializing in unique blends.',
        projectTitle: 'Aura Tea Co. New Packaging Design',
        projectDescription:
            'Comprehensive design services for new product lines, including concept development, illustration, and print-ready files.',
        currency: 'THB',
        tax: 7,
        discountPercent: 0,
        discountFlat: 0,
        total: 107000,
        items: [
            {
                userId: userId,
                title: 'Concept Development & Mood Board',
                description:
                    'Initial creative direction and visual mood board presentation.',
                rate: 15000,
                quantity: 1,
            },
            {
                userId: userId,
                title: 'Tea Box Design (3 SKUs)',
                description:
                    'Design for three distinct tea box variants, including front, back, and side panels.',
                rate: 20000,
                quantity: 3,
            },
            {
                userId: userId,
                title: 'Tea Pouch Design (5 SKUs)',
                description:
                    'Design for five different tea pouch variants, focusing on brand consistency.',
                rate: 10000,
                quantity: 5,
            },
            {
                userId: userId,

                title: 'Label Design for Tea Tins (2 SKUs)',
                description: 'Custom label design for two tea tin sizes.',
                rate: 8000,
                quantity: 2,
            },
            {
                userId: userId,
                title: 'Mockup Renders (Digital)',
                description:
                    'High-quality 3D digital mockups for marketing and presentation purposes.',
                rate: 5000,
                quantity: 1,
            },
            {
                userId: userId,
                title: 'Print-Ready File Preparation',
                description:
                    'Preparation and delivery of all final print-ready files in specified formats.',
                rate: 12000,
                quantity: 1,
            },
        ],
    };

    const now = new Date();
    const quotationIssuedAt = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
    const invoiceIssuedAt = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
    const receiptIssuedAt = now;

    const quotation = {
        ...baseDocumentData,
        userId: userId,
        clientId: clientId,
        projectId: projectId,
        title: `Quotation #${projectId}-QTN`,
        category: 'quotation',
        number: `${projectId}-QTN-${Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, '0')}`,
        issuedAt: quotationIssuedAt,
        referenceNumber: `${projectId}-Q`,
        s3Key: `${userId}/projects/brand-story-video-for-about-us-page/documents/quotation-aura-tea-co-new-packaging-design.pdf`,
        note: 'This quotation is valid for 30 days from the issue date. Prices are subject to change after this period. Production schedule to be confirmed upon project commencement.',
    };

    const invoice = {
        ...baseDocumentData,
        userId: userId,
        clientId: clientId,
        title: `Invoice #${projectId}-INV`,
        category: 'invoice',
        number: `${projectId}-INV-${Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, '0')}`,
        issuedAt: invoiceIssuedAt,
        referenceNumber: `${projectId}-I`,
        s3Key: `${userId}/projects/brand-story-video-for-about-us-page/documents/invoice-aura-tea-co-new-packaging-design.pdf`,
        note: 'Please remit payment within 30 days. Thank you for your business!',
    };

    const receipt = {
        ...baseDocumentData,
        userId: userId,
        clientId: clientId,
        title: `Receipt #${projectId}-RCPT`,
        category: 'receipt',
        number: `${projectId}-RCPT-${Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, '0')}`,
        issuedAt: receiptIssuedAt,
        referenceNumber: `${projectId}-R`,
        s3Key: `${userId}/projects/brand-story-video-for-about-us-page/documents/receipt-aura-tea-co-new-packaging-design.pdf`,
        note: 'Payment received in full. Thank you for your business!',
    };

    return [quotation, invoice, receipt];
}

export function generateByteNestQuotation(ids: Ids) {
    const { userId, clientId, projectId } = ids;

    const now = new Date();
    const quotationIssuedAt = now;

    const quotation = {
        userId: userId,
        clientId: clientId,
        projectId: projectId,
        title: `Quotation #${projectId}-QTN`,
        category: 'quotation',
        number: `${projectId}-QTN-${Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, '0')}`,
        issuedAt: quotationIssuedAt,
        currency: 'THB',
        referenceNumber: `${projectId}-Q`,
        projectTitle: 'Internal CRM System API Integration',
        projectDescription:
            'Integration of internal CRM system API, including data synchronization and workflow automation.',
        freelancerName: 'Nawapol Jake',
        freelancerEmail: 'nawapol.jake@example.com',
        freelancerPhone: '+66812345678',
        freelancerTaxId: null,
        freelancerAddress:
            '123 Art Studio, Bang Phli Yai, Samut Prakan, Thailand',
        clientName: 'ByteNest Tech Solutions',
        clientTaxId: '112-233-4455',
        clientAddress: '789 Silicon Valley Blvd, Tech City, CA 94043',
        clientPhone: '+1-555-222-3333',
        clientOffice: null,
        clientDetail: 'Innovative software development and IT consulting firm.',
        discount: 0,
        tax: 7,
        discountPercent: 0,
        discountFlat: 0,
        total: 101650,
        note: 'This quotation outlines the scope for CRM API integration. Final terms and conditions will be provided in the service agreement.',
        items: [
            {
                userId: userId,
                title: 'API Endpoint Analysis & Mapping',
                description:
                    'Detailed analysis of existing CRM API endpoints and data field mapping.',
                rate: 20000,
                quantity: 1,
            },
            {
                userId: userId,
                title: 'Authentication & Authorization Setup',
                description:
                    'Implementation of secure authentication and authorization mechanisms for API access.',
                rate: 15000,
                quantity: 1,
            },
            {
                userId: userId,
                title: 'Data Synchronization Module Development',
                description:
                    'Development of modules for real-time or scheduled data synchronization between systems.',
                rate: 35000,
                quantity: 1,
            },
            {
                userId: userId,
                title: 'Error Handling & Logging Implementation',
                description:
                    'Robust error handling and logging systems for monitoring integration performance.',
                rate: 10000,
                quantity: 1,
            },
            {
                userId: userId,
                title: 'Testing & Quality Assurance',
                description:
                    'Comprehensive testing to ensure data integrity and system stability.',
                rate: 15000,
                quantity: 1,
            },
        ],
    };

    return [quotation];
}
