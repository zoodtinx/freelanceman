import { TaskStatus, EventStatus, Project } from "@types";
import { id } from "date-fns/locale";

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
      client: '',
      clientId: '',
      link: '',
   };
};

export const eventDefaultValues = {
   id: '',
   name: '',
   details: '',
   status: 'scheduled' as EventStatus,
   dueDate: '',
   project: '',
   projectId: '',
   client: '',
   clientId: '',
   link: '',
};

export const taskDefaultValues = {
   id: '',
   name: '',
   details: '',
   status: 'planned' as TaskStatus,
   dueDate: '',
   project: '',
   projectId: '',
   client: '',
   clientId: '',
   link: '',
};


export const defaultProject: Project = {
   id: '',
   name: '',
   client: '',
   clientId: '',
   quickTaskId: '',
   brief: '',
   projectStatus: 'active', // Default to 'active' as per ProjectStatus
   paymentStatus: 'notProcessed', // Default to 'notProcessed' as per PaymentStatus
   accentColor: '',
   dateCreated: '',
   dateModified: ''
 };

 export const taskStatusSelections = [
   { value: 'planned', text: 'Planned', color: 'bg-yellow-100' },
   { value: 'inProgress', text: 'In Progress', color: 'bg-emerald-200' },
   { value: 'completed', text: 'Completed', color: 'bg-blue-100' },
   { value: 'cancelled', text: 'Cancelled', color: 'bg-red-200' },
];

export const eventStatusSelections = [
   { value: 'scheduled', text: 'Scheduled', color: 'bg-yellow-100' },
   { value: 'inProgress', text: 'In Progress', color: 'bg-emerald-200' },
   { value: 'completed', text: 'Completed', color: 'bg-blue-100' },
   { value: 'cancelled', text: 'Cancelled', color: 'bg-red-200' },
];
