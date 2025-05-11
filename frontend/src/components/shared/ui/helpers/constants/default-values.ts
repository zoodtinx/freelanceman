import {
   ClientContactPayload,
   ClientPayload,
   EventPayload,
   FilePayload,
   PartnerContactPayload,
   ProjectPayload,
   TaskPayload,
} from 'freelanceman-common';

export const defaultCreateSalesDocumentValue = {
   category: '',
   issuedAt: '',
   projectId: '',
   freelancerName: '',
   clientId: '',
   clientName: '',
   items: [],
 
   title: '',
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
   customAdjustment: 0,
 
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
   title: '',
   description: '',
   rate: 1,
   quantity: 1
}

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

export const defaultNewProjectValue = {
   title: '',
   clientId: '',
   projectStatus: 'active' as const,
   paymentStatus: 'unpaid' as const,
   contacts: [],
   workingFiles: [],
   assetFiles: [],
   budget: 0
};

export const defaultClientValue: ClientPayload = {
   name: '',
   id: '',
   taxId: '',
   createdAt: new Date().toISOString(),
   updatedAt: new Date().toISOString(),
   userId: '',
   email: '',
   phoneNumber: '',
   address: '',
   detail: '',
   themeColor: '',
};
export const defaultProject: ProjectPayload = {
   id: '',
   title: '',
   client: defaultClientValue,
   clientId: '',
   projectStatus: 'active',
   paymentStatus: 'unpaid',
   createdAt: new Date().toISOString(),
};

export const defaultEventValues: EventPayload = {
   name: '',
   details: '',
   status: 'scheduled',
   dueAt: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0],
   projectId: '',
   clientId: '',
   link: '',
   id: '',
   tags: [],
   createdAt: new Date().toISOString(),
   updatedAt: new Date().toISOString(),
   userId: '',
   isWithTime: false,
   project: defaultProject
};


export const defaultFileValues: FilePayload = {
   id: '',
   displayName: '',
   originalName: '',
   type: '',
   category: '',
   link: '',
   size: 0,
   client: defaultClientValue,
   project: defaultProject,
   s3Key: '',
   userId: '',
   clientId: '',
   projectId: '',
   createdAt: new Date().toISOString(),
};

export const defaultContactValues: ClientContactPayload = {
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

export const defaultPartnerContactValues: PartnerContactPayload = {
   id: '',
   name: '',
   company: defaultClientValue,
   companyId: '',
   role: '',
   phoneNumber: '',
   email: '',
   detail: '',
   createdAt: new Date().toISOString(),
   updatedAt: new Date().toISOString(),
   userId: '',
   avatar: '',
};

export const defaultTaskValue: TaskPayload = {
   id: '',
   name: '',
   status: 'pending',
   details: '',
   link: '',
   dueAt: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0],
   project: defaultProject,
   projectId: '',
   client: defaultClientValue,
   clientId: '',
   userId: '',
   createdAt: '',
   updatedAt: '',
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
