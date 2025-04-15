export const defaultEventValues = {
   name: '',
   details: '',
   status: 'scheduled',
   dueAt: '',
   project: '',
   projectId: '',
   client: '',
   clientId: '',
   link: '',
   themeColor:'',             
   id: '',
   tags: []
};

export const defaultTaskValue = {
   id: "",
   name: "",
   status: "pending",
   details: "",
   link: "",
   dueAt: "",
   project: "",
   projectId: "",
   client: "",
   clientId: "",
   themeColor: "",
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
   dateModified: ''
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

export const defaultContactValues = {
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
   title: "",
   clientId: "",
   projectStatus: "active",
   paymentStatus: "notProcessed",
   contacts: [],
   workingFiles: [],
   assetFiles: [],
 };

 export const defaultClientValue = {
   name: '',
   id: '',
   contactCount: 0,
   projectCount: 0,
   activeProjectCount: 0,
   taxId: '',
   email: '',
   phoneNumber: '',
   address: '',
   detail: '',
   themeColor: '',
};

export const defaultValues = {
   "task": defaultTaskValue,
   "event": defaultEventValues,
   "file": defaultFileValues,
   "new-file": defaultFileValues,
   "project-settings": {},
   "client-contact": defaultContact,
   "partner-contact": defaultPartnerValues,
   "sales-document-item": {},
   "user-profile": defaultUserValue,
   "new-project": defaultNewProjectValue,
   "new-client": defaultClientValue,
   "client-settings": defaultClientValue,
};



