import { TaskStatus, EventStatus } from "@types";
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