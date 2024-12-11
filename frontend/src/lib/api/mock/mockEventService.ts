import { mockEvents } from "@mocks";
import type { Event, NewEventPayload } from "@types";

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

export const editEvent = <K extends keyof Event>(
   key: K,
   value: Event[K]
) => {
   console.log('service key', key)
   console.log('service value', value)
   event[key] = value
   return Promise.resolve(event)
};

export const createEvent = (newEvent: NewEventPayload) => {
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