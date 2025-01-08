export type EventStatus = 'scheduled' | 'onGoing' | 'completed' | 'cancelled';

export interface Event {
   id: string;
   name: string;
   status: EventStatus | 'all';
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

export type NewEventPayload = Omit<Event, 'createdAt' | 'project' | 'client'>;

export type EventFormData = Omit<Event, 'createdAt'>;

export type EventSearchOptions = Partial<
   Pick<Event, "status" | "createdAt" | "dueDate" | "withTime" | 'projectId' | 'clientId'>
>;