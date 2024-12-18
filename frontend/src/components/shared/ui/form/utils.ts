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