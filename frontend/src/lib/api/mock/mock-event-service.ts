import { mockEvents } from "@mocks";
import type {  ActionResponsePayload, EventSearchOptions, NewActionPayload } from "@types";

export const getEvent = (id: string) => {
   
   const event = mockEvents.find(event => event.id === id)

   return new Promise((resolve) => {
      setTimeout(() => resolve(event), 500);
   });
};


const sortEventsByDate = (events: Event[], dateField: keyof Event) => {
   return events.sort((a, b) => {
      const dateA = new Date(a[dateField] as string).getTime();
      const dateB = new Date(b[dateField] as string).getTime();
      return dateA - dateB;
   });
};

export const getAllEvent = (searchOptions: EventSearchOptions = {}): Promise<Event[]> => {
   return new Promise((resolve) => {
      setTimeout(() => {
         let events = mockEvents;

         if (searchOptions && Object.keys(searchOptions).length > 0) {
            if (searchOptions.status !== 'all') {
               events = events.filter((event) => {
                  const matchesStatus =
                     searchOptions.status === undefined ||
                     searchOptions.status.trim() === "" ||
                     event.status === searchOptions.status.trim();

                  const matchesCreatedAt =
                     !searchOptions.createdAt || searchOptions.createdAt.trim() === "" ||
                     event.createdAt.startsWith(searchOptions.createdAt.trim());

                  const matchesdueAt =
                     !searchOptions.dueAt || searchOptions.dueAt.trim() === "" ||
                     event.dueAt.startsWith(searchOptions.dueAt.trim());

                  const matchesWithTime =
                     searchOptions.withTime === undefined || event.withTime === searchOptions.withTime;

                  const matchesProjectId =
                     !searchOptions.projectId || searchOptions.projectId.trim() === "" ||
                     event.projectId === searchOptions.projectId.trim();

                  const matchesClientId =
                     !searchOptions.clientId || searchOptions.clientId.trim() === "" ||
                     event.clientId === searchOptions.clientId.trim();

                  return (
                     matchesStatus &&
                     matchesCreatedAt &&
                     matchesdueAt &&
                     matchesWithTime &&
                     matchesProjectId &&
                     matchesClientId
                  );
               });
            }
         }

         events = sortEventsByDate(events, 'dueAt');
         resolve(events);
      }, 500);
   });
};


export const editEvent = (id:string, eventPayload: Partial<Event>) => {
   console.log('id', id)
   console.log('eventPayload', eventPayload)

   const event = mockEvents.find((e) => e.id === id);

   if (!event) {
      return Promise.reject(new Error(`Event with id ${eventPayload.id} not found`));
   }

   Object.keys(eventPayload).forEach((key) => {
      if (key !== "id" && key in event) {
         event[key as keyof Event] = eventPayload[key as keyof Event];
      }
   });

   return Promise.resolve(event);
};


export const createEvent = (newEvent: NewActionPayload) => {
   const createdEvent = {
      ...newEvent,
      createdAt: (new Date()).toISOString(),
      project: 'placeholder',
      client: 'placeholder',
      clientId: 'placeholder',
      id: crypto.randomUUID()
   }
   
   mockEvents.push(createdEvent)

   return Promise.resolve(mockEvents)
}

export const bulkEditEvents = (
   selectedEvents: NewActionPayload[],
   key: keyof NewActionPayload,
   value: NewActionPayload[keyof NewActionPayload]
 ) => {
   console.log('selectedEvents', selectedEvents);
   
   mockEvents.forEach((event) => {
     if (selectedEvents.some((selectedEvent) => selectedEvent.id === event.id)) {
       event[key] = value; 
     }
   });

   return mockEvents
 };
 
export const deleteEvent = (eventId: string) => {
   const index = mockEvents.findIndex((event) => event.id === eventId); // Find the index of the event
   if (index !== -1) {
      mockEvents.splice(index, 1); // Remove the event at the found index
   }
   return Promise.resolve(eventId);
};

export const bulkDeleteEvents = (eventIds: string[]) => {
   eventIds.forEach(eventId => {
      const index = mockEvents.findIndex(event => event.id === eventId);
      if (index !== -1) {
         mockEvents.splice(index, 1);
      }
   });

   return Promise.resolve(eventIds);
};