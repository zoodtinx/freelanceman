export type TaskStatus = 'planned' | 'inProgress' | 'completed' | 'cancelled';

export interface NewTaskPayload {
   id: string;
   name: string;
   status: TaskStatus; 
   details: string;
   link: string;
   dueDate: string;
   projectId: string;
}

export interface TaskFormData extends NewTaskPayload {
   project: string;
   client: string;
   clientId: string;
}

export interface Task {
   id: string;
   name: string;
   status: TaskStatus;
   details: string;
   link: string;
   createdAt: string;
   dueDate: string;
   project: string;
   projectId: string;
   client: string;
   clientId: string;
}
