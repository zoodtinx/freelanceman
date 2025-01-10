import { TaskStatus, EventStatus, Project, Contact, Event, Task, File } from "@types";

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
   id: '',
   name: '',
   details: '',
   status: 'planned' as TaskStatus,
   dueDate: '',
   withTime: false,
   project: '',
   projectId: '',
   client: '',
   clientId: '',
   link: '',
   dateCreated: '',
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
 

 export const taskStatusSelections = [
   { value: 'planned', label: 'Planned', color: 'bg-yellow-100' },
   { value: 'inProgress', label: 'In Progress', color: 'bg-emerald-200' },
   { value: 'completed', label: 'Completed', color: 'bg-blue-100' },
   { value: 'cancelled', label: 'Cancelled', color: 'bg-red-200' },
];

export const eventStatusSelections = [
   { value: 'scheduled', label: 'Scheduled', color: 'bg-yellow-100' },
   { value: 'inProgress', label: 'In Progress', color: 'bg-emerald-200' },
   { value: 'completed', label: 'Completed', color: 'bg-blue-100' },
   { value: 'cancelled', label: 'Cancelled', color: 'bg-red-200' },
];

export const projectStatusSelections = [
   { value: 'active', label: 'Active', color: 'bg-green-100' },
   { value: 'onHold', label: 'On Hold', color: 'bg-orange-200' },
   { value: 'completed', label: 'Completed', color: 'bg-blue-200' },
];

export const paymentStatusSelections = [
   { value: 'notProcessed', label: 'Not Processed', color: 'bg-gray-200' },
   { value: 'processing', label: 'Processing', color: 'bg-yellow-200' },
   { value: 'paid', label: 'Paid', color: 'bg-teal-100' },
];