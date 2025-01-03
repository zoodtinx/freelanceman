export type EventStatus = 'scheduled' | 'onGoing' | 'completed' | 'cancelled';

export interface Event {
   id: string;
   name: string;
   status: EventStatus;
   details: string;
   link: string;
   createdAt: string;
   dueDate: string;
   withTime: boolean;
   project: string;
   projectId: string;
   client: string;
   clientId: string;
}

export type NewEventPayload = Omit<Event, 'createdAt' | 'project' | 'client'>;

export type EventFormData = Omit<Event, 'createdAt'>;
