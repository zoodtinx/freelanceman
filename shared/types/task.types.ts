export type TaskStatus = 'planned' | 'inProgress' | 'completed' | 'cancelled';

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

export type NewTaskPayload = Omit<Task, 'createdAt' | 'project' | 'client'>;

export type TaskFormData = Omit<Task, 'createdAt'>;
