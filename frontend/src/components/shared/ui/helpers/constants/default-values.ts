import { CreateProjectDto, Event, EventStatus, File, Partner, Task } from "@types";

export const formDefaultValue = (actionType: 'event' | 'task') => {
   let defaultStatus: TaskStatus | EventStatus

   if (actionType === 'event') {
      defaultStatus = 'scheduled'; 
   } else if (actionType === 'task') {
      defaultStatus = 'planned'; 
   } else {
      throw new Error("Invalid actionType");
   }

   return {
      id: '',
      name: '',
      details: '',
      status: defaultStatus,
      dueDate: '',
      project: '',
      projectId: '',
      withTime: false,
      client: '',
      clientId: '',
      link: '',
   };
};

export const eventDefaultValues: Event = {

   name: '',
   details: '',
   status: 'scheduled' as EventStatus,
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

export const defaultEventValues: Event = eventDefaultValues

export const taskDefaultValues: Task = {
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

export const defaultTaskValue: Task = {
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

export const defaultContact: Contact = {
   id: '',
   company: '',
   email: [],
   details: '',
   type: 'client',
   name: '',
   phoneNumber: [],
   role: '',
};

export const defaultProject: Project = {
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

export const defaultFileValues: File = {
   id: '',
   displayName: '',
   originalName: '',
   type: 'other', 
   category: 'project-file', 
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

export const defaultPartnerValues: Partner = {
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

export const defaultUserValue: User = {
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
   title: "",
   clientId: "",
   projectStatus: "active",
   paymentStatus: "notProcessed",
   contacts: [],
   workingFiles: [],
   assetFiles: [],
 };