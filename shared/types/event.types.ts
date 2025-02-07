export type EventStatus = "scheduled" | "completed" | "cancelled";

export interface Event {
   id: string;
   name: string;
   status: EventStatus;
   details: string;
   link: string;
   dueAt: string;
   project: string;
   projectId: string;
   client: string;
   clientId: string;
   themeColor: string;
   tags: string[];
}

export type EventSearchOption = Partial<
   Pick<Event, "name" | "status" | "dueAt" | "projectId" | "clientId">
>;

export interface CreateEventDto {
   name: string;
   status: string;
   projectId: string;
   clientId: string;
   dueAt: string;
   details?: string;
   link?: string;
   tags?: string;
}

export type EditEventDto = Partial<
   Pick<Event, "dueAt" | "link" | "details" | "status" | "tags" | "name">
>;

