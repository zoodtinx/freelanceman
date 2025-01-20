import { SalesDocument } from "../types/sales-document";

export const mockSalesDocumentDraft: SalesDocument = {
  id: '123456789',
  type: 'invoice',
  
  number: 'INV-2025-001',
  issuedAt: '2025-01-17T10:00:00Z',
  currency: 'USD',

  projectId: 'project-123',
  projectTitle: 'Website Development',
  referenceNumber: 'REF-987654',
  projectDescription: 'Developing a responsive website for the client.',
  selectedProjectClientId: 'client-456',

  freelancerName: 'John Doe',
  freelancerEmail: 'john.doe@example.com',
  freelancerPhone: '+1-234-567-8901',
  freelancerTaxId: '123-45-6789',
  freelancerDetail: 'Experienced web developer specializing in React and Node.js.',

  clientId: 'client-456',
  clientName: 'Acme Corp',
  clientTaxId: 'AC-987654321',
  clientAddress: '123 Main Street, Springfield, IL, USA',
  clientPhone: '+1-987-654-3210',
  clientOffice: 'Suite 400',
  clientDetail: 'Leading manufacturing company.',

  items: [
    {
      name: 'Landing Page Design',
      description: 'Designing the landing page layout with responsiveness.',
      rate: 500,
      quantity: 1,
    },
    {
      name: 'Backend API Development',
      description: 'Developing RESTful APIs for user management.',
      rate: 1000,
      quantity: 2,
    },
  ],

  subtotal: 2500,
  discount: 200,
  tax: 230,
  total: 2530,
  customAdjustment: -50,
  note: 'Thank you for your business.',

  createdAt: '2025-01-17T10:00:00Z',
  updatedAt: '2025-01-17T10:00:00Z',
};
