import { mockEvents } from "@mocks";
import type {  NewActionPayload } from "@types";

export const getEvent = (id: string) => {
   
   const event = mockEvents.find(event => event.id === id)

   return new Promise((resolve) => {
      setTimeout(() => resolve(event), 500);
   });
};

export const getAllEvent = () => {
   return new Promise((resolve) => {
      setTimeout(() => resolve(mockEvents), 500);
   });
}

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

export const deleteEvent = (eventId: string) => {
   const index = mockEvents.findIndex((event) => event.id === eventId); // Find the index of the event
   if (index !== -1) {
      mockEvents.splice(index, 1); // Remove the event at the found index
   }
   return Promise.resolve(eventId);
};