import { ClientContactPayload, ClientPayload, EventPayload } from 'freelanceman-common';

export const defaultEventValues: EventPayload = {
   name: '',
   details: '',
   status: 'scheduled',
   dueAt: '',
   projectId: '',
   clientId: '',
   link: '',
   id: '',
   tags: [],
   createdAt: new Date().toISOString(),
   updatedAt: new Date().toISOString(),
   userId: '',
};

export const defaultTaskValue = {
   id: '',
   name: '',
   status: 'pending',
   details: '',
   link: '',
   dueAt: '',
   project: '',
   projectId: '',
   client: '',
   clientId: '',
   themeColor: '',
   userId: '',
   createdAt: '',
   updatedAt: '',
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

export const defaultProject = {
   id: '',
   name: '',
   client: '',
   clientId: '',
   quickTaskId: '',
   brief: '',
   projectStatus: 'active',
   paymentStatus: 'notProcessed',
   accentColor: '',
   dateCreated: '',
   dateModified: '',
};

export const defaultFileValues = {
   id: '',
   displayName: '',
   originalName: '',
   type: '',
   category: '',
   link: '',
   size: 0,
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
   createdAt: new Date().toISOString(),
   updatedAt: new Date().toISOString(),
   userId: ''
};

export const defaultPartnerValues = {
   id: '',
   name: '',
   company: '',
   companyId: '',
   role: '',
   phoneNumber: [],
   email: '',
   details: '',
   avatar: '',
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

export const defaultNewProjectValue = {
   title: '',
   clientId: '',
   projectStatus: 'active',
   paymentStatus: 'notProcessed',
   contacts: [],
   workingFiles: [],
   assetFiles: [],
};

export const defaultClientValue : ClientPayload = {
   name: '',
   id: '',
   taxId: '',
   createdAt: new Date().toISOString(),
   updatedAt: new Date().toISOString(),
   userId:'',
   email: '',
   phoneNumber: '',
   address: '',
   detail: '',
   themeColor: '',
};

export const defaultValues = {
   task: defaultTaskValue,
   event: defaultEventValues,
   file: defaultFileValues,
   'new-file': defaultFileValues,
   'project-settings': {},
   'client-contact': defaultContact,
   'partner-contact': defaultPartnerValues,
   'sales-document-item': {},
   'user-profile': defaultUserValue,
   'new-project': defaultNewProjectValue,
   'new-client': defaultClientValue,
   'client-settings': defaultClientValue,
};
