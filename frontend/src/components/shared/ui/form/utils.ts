import { TaskStatus, EventStatus, Project, Contact, Event, Task } from "@types";
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

export const projectStatusSelections = [
   { value: 'active', text: 'Active', color: 'bg-green-100' },
   { value: 'onHold', text: 'On Hold', color: 'bg-orange-200' },
   { value: 'completed', text: 'Completed', color: 'bg-blue-200' },
];

export const paymentStatusSelections = [
   { value: 'notProcessed', text: 'Not Processed', color: 'bg-gray-200' },
   { value: 'processing', text: 'Processing', color: 'bg-yellow-200' },
   { value: 'paid', text: 'Paid', color: 'bg-teal-100' },
];