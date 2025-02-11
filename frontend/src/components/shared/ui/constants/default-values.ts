import { Task } from "@types";

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
   id: '',
   name: '',
   details: '',
   status: 'scheduled' as EventStatus,
   dueDate: '',
   withTime: false,
   project: '',
   projectId: '',
   client: '',
   clientId: '',
   link: '',
   color:'',             
   createdAt: ''
};

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

 export const defaultFile: File = {
   id: "",
   fileName: "",
   name: "",
   type: "other", 
   category: "", 
   link: "",
   size: 0, 
   dateCreated: new Date().toISOString(), 
   dateModified: undefined, 
   permissions: {
     owner: "",
     sharedWith: [] 
   },
   passwordProtected: false, 
   encryptedPasswordHash: undefined 
 };