export type EventStatus = 'scheduled' | 'onGoing' | 'completed' | 'cancelled';

export interface NewEventPayload {
   id: string;
   name: string;
   status: EventStatus; 
   details: string;
   link: string;
   dueDate: string;
   projectId: string;
}

export interface EventFormData extends NewEventPayload {
   project: string;
   client: string;
   clientId: string;
}

export interface Event {
   id: string;
   name: string;
   status: EventStatus; 
   details: string;
   link: string;
   createdAt: string;
   dueDate: string;
   project: string;
   projectId: string;
   client: string;
   clientId: string;
}
