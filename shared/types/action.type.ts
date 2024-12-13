export type EventStatus = 'scheduled' | 'onGoing' | 'completed' | 'cancelled';
export type TaskStatus = 'planned' | 'inProgress' | 'completed' | 'cancelled';

export interface NewActionPayload<TStatus = string> {
   name: string;
   status: string; // Generic status type
   details: string;
   link: string;
   dueDate: string;
   projectId: string;
}

export interface ActionFormData<TStatus = string> extends NewActionPayload<TStatus> {
   project: string;
   client: string;
   clientId: string;
}