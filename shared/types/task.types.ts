export type TaskStatus = 'planned' | 'in-progress' | 'completed' | 'cancelled';

export interface Task {
   id: string;
   name: string;
   status: TaskStatus | 'all';
   details: string;
   link: string;
   createdAt: string;
   dueDate: string;
   withTime: boolean;
   project: string;
   projectId: string;
   client: string;
   clientId: string;
   color:string;
}

export type NewTaskPayload = Omit<Task, 'dateCreated' | 'project' | 'client' | 'dateModified'>;

export type TaskFormData = Omit<Task, 'dateCreated' | 'dateModified'>;

export type TaskSearchOptions = Partial<
   Pick<Task, "status" | "createdAt" | "dueDate" | "withTime" | 'projectId' | 'clientId'>
>;