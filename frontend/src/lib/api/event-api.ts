import {
   editEvent,
   getEvent,
   createEvent,
   deleteEvent,
   getEvents,
} from './services/event-service';
import { MutationCallbacks } from '@/lib/api/services/helpers/api.type';
import { EventFilterDto } from 'freelanceman-common';
import { useAppQuery } from '@/lib/api/services/helpers/useAppQuery';
import { useAppMutation } from '@/lib/api/services/helpers/useAppMutation';

export const useEventApi = () => {
   return {
      createEvent: useCreateEvent(),
      deleteEvent: useDeleteEvent(),
      editEvent: useEditEvent(),
   };
};

export const useEventsQuery = (filter: EventFilterDto = {}) => {
   return useAppQuery(['events', filter], (token) => getEvents(token, filter));
};

export const useEventQuery = (eventId: string) => {
   return useAppQuery(['events', eventId], (token) => getEvent(token, eventId));
};

export const useCreateEvent = (callbacks?: MutationCallbacks) => {
   return useAppMutation(
      {
         mutationKey: 'createEvent',
         invalidationKeys: ['events'],
         mutationFn: createEvent,
      },
      callbacks
   );
};

export const useEditEvent = (callbacks?: MutationCallbacks) => {
   return useAppMutation(
      {
         mutationKey: 'editEvent',
         invalidationKeys: ['events', 'projects'],
         mutationFn: editEvent,
      },
      callbacks
   );
};

export const useDeleteEvent = (callbacks?: MutationCallbacks) => {
   return useAppMutation(
      {
         mutationKey: 'deleteEvent',
         invalidationKeys: ['events', 'projects'],
         mutationFn: deleteEvent,
      },
      callbacks
   );
};
