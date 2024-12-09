import { mockAllEventData } from "@mocks";
import type { Event } from "@types";

const event = mockAllEventData[0]

export const getEvent = (id: string) => {
   return new Promise((resolve) => {
      setTimeout(() => resolve(event), 500);
   });
};

export const getAllEvent = () => {
   return new Promise((resolve) => {
      setTimeout(() => resolve(mockAllEventData), 500);
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

export const createEvent = (newEvent: Event) => {
   mockAllEventData.push(newEvent)

   return Promise.resolve(mockAllEventData)
}