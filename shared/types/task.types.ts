export type TaskStatus = 'planned' | 'inProgress' | 'completed' | 'cancelled';

export interface Task {
   id: string;
   name: string;
   status: TaskStatus;
   details: string;
   link: string;
   dueDate: string;
   withTime: boolean;
   project: string;
   projectId: string;
   client: string;
   clientId: string;
   dateCreated: string,
}

export type NewTaskPayload = Omit<Task, 'dateCreated' | 'project' | 'client' | 'dateModified'>;

export type TaskFormData = Omit<Task, 'dateCreated' | 'dateModified'>;
