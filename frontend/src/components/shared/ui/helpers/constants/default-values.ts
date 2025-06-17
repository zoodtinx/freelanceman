import {
   CreateClientDto,
   CreateEventDto,
   CreateFileDto,
   CreateProjectDto,
   CreateSalesDocumentDto,
   CreateTaskDto,
} from 'freelanceman-common';

export const defaultCreateSalesDocumentValue: CreateSalesDocumentDto = {
   category: 'invoice',
   issuedAt: '',
   projectId: '',
   projectTitle: '',
   freelancerName: '',
   clientId: '',
   clientName: '',
   items: [],

   number: '',
   currency: '',
   referenceNumber: '',
   projectDescription: '',

   freelancerEmail: '',
   freelancerPhone: '',
   freelancerTaxId: '',
   freelancerAddress: '',

   clientTaxId: '',
   clientAddress: '',
   clientPhone: '',
   clientOffice: '',
   clientDetail: '',

   tax: 0,
   discountPercent: 0,
   discountFlat: 0,
   total: 0,

   discount: 0,
   note: '',
};

export const defaultContact = {
   id: '',
   company: '',
   email: [],
   details: '',
   type: 'client',
   name: '',
   phoneNumber: [],
   role: '',
};

export const defaultSalesDocumentItemValue = {
   name: '',
   description: '',
   rate: 1,
   quantity: 1,
};

export const defaultUserValue = {
   id: '',
   name: '',
   email: '',
   passwordHash: '',
   role: 'freelancer',
   avatarUrl: '',
   createdAt: new Date(),
   updatedAt: new Date(),
   bio: '',
   contacts: [],
   projects: [],
   settings: {
      theme: 'light',
      notifications: {
         email: false,
         push: false,
      },
   },
   paymentDetails: {
      accountHolderName: '',
      accountNumber: '',
      bankName: '',
      swiftCode: '',
   },
};

export const defaultNewProjectValue: CreateProjectDto = {
   name: '',
   clientId: '',
   projectStatus: 'active' as const,
   paymentStatus: 'pending' as const,
   budget: 0,
};

export const defaultClientValue: CreateClientDto = {
   name: '',
   taxId: '',
   email: '',
   phoneNumber: '',
   address: '',
   detail: '',
   themeColor: '',
};
export const defaultProject = {
   id: '',
   name: '',
   client: defaultClientValue,
   clientId: '',
   projectStatus: 'active',
   paymentStatus: 'pending',
   createdAt: new Date().toISOString(),
};

export const defaultEventValues: CreateEventDto = {
   name: '',
   details: '',
   dueAt: new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split('T')[0],
   projectId: '',
   link: '',
   tags: [],
   isWithTime: false,
};

export const defaultFileValues: CreateFileDto = {
   name: '',
   originalName: '',
   type: 'archive',
   category: 'asset',
   link: '',
   size: 0,
   s3Key: '',
   projectId: '',
};

export const defaultContactValues = {
   id: '',
   name: '',
   companyId: '',
   role: '',
   phoneNumber: '',
   email: '',
   details: '',
   avatar: '',
   company: defaultClientValue,
   createdAt: new Date().toISOString(),
   updatedAt: new Date().toISOString(),
   userId: '',
};

export const defaultPartnerContactValues = {
   id: '',
   name: '',
   company: 'Freelancer',
   role: '',
   phoneNumber: '',
   email: '',
   detail: '',
   createdAt: new Date().toISOString(),
   updatedAt: new Date().toISOString(),
   userId: '',
   avatar: '',
};

export const defaultTaskValue: CreateTaskDto = {
   name: '',
   status: 'pending',
   details: '',
   link: '',
   dueAt: new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split('T')[0],
   projectId: '',
   clientId: '',
   isWithTime: false,
};

export const defaultValues = {
   task: defaultTaskValue,
   event: defaultEventValues,
   file: defaultFileValues,
   'new-file': defaultFileValues,
   'project-settings': {},
   'client-contact': defaultContact,
   'partner-contact': defaultPartnerContactValues,
   'sales-document-item': {},
   'user-profile': defaultUserValue,
   'new-project': defaultNewProjectValue,
   'new-client': defaultClientValue,
   'client-settings': defaultClientValue,
};
