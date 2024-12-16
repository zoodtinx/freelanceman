import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
   editEvent,
   getEvent,
   getAllEvent,
   createEvent,
   deleteEvent,
   bulkEditEvents,
   bulkDeleteEvents
} from './mock/mockEventService';
import type { ActionResponsePayload, NewActionPayload } from '@types';

export const useAllEventQuery = () => {
   return useQuery({
      queryKey: ['events'],
      queryFn: getAllEvent,
   });
};

export const useEventQuery = (eventId: string) => {
   const queryClient = useQueryClient();

   return useQuery({
      queryKey: ['events', eventId],
      queryFn: () => {
         const cachedEvents = queryClient.getQueryData<Event[]>(['events']);
         const cachedEvent = cachedEvents?.find(
            (event) => event.id === eventId
         );
         return cachedEvent ?? getEvent(eventId); 
      },
   });
};

export const useCreateEvent = () => {
   const queryClient = useQueryClient();

   return useMutation<Event, Error, NewActionPayload>({
      mutationKey: ['createEvent'],
      mutationFn: async (newEvent: NewActionPayload) =>
         await createEvent(newEvent),
      onMutate: async (newEvent: NewActionPayload) => {
         await queryClient.cancelQueries(['events']);

         const previousEvents = queryClient.getQueryData<Event[]>(['events']);

         queryClient.setQueryData<Event[]>(['events'], (old) => [
            ...(old || []),
            { ...newEvent, id: 'temp-id' },
         ]);

         return { previousEvents };
      },
      onError: (err, newEvent, context: any) => {
         if (context?.previousEvents) {
            queryClient.setQueryData(['events'], context.previousEvents);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['events'] });
      },
   });
};

export const useEditEvent = (eventId: string) => {
   const queryClient = useQueryClient();

   return useMutation<
      Event,
      Error,
      { key: keyof Event; value: Event[keyof Event] }
   >({
      mutationKey: ['editEvent'],
      mutationFn: async (eventPayload: NewActionPayload) => {
         await editEvent(eventId, eventPayload);
      },
      onMutate: async ({ key, value }) => {
         await queryClient.cancelQueries(['events']);

         const previousEvents = queryClient.getQueryData<Event[]>(['events']);

         if (previousEvents) {
            queryClient.setQueryData(['events'], (old) =>
               old?.map((event) =>
                  event.id === eventId ? { ...event, [key]: value } : event
               )
            );
         }

         return { previousEvents };
      },
      onError: (err, variables, context) => {
         if (context?.previousEvents) {
            queryClient.setQueryData(['events'], context.previousEvents);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries(['events']);
      },
   });
};

export const useBulkEditEvent = () => {
   const queryClient = useQueryClient();

   return useMutation<
      ActionResponsePayload[],
      Error,
      {
         selectedEvents: NewActionPayload[];
         key: keyof NewActionPayload;
         value: NewActionPayload[keyof NewActionPayload];
      }
   >({
      mutationKey: ['bulkEditEvent'], 
      mutationFn: async ({ selectedEvents, key, value }) => {
         console.log('selectedEvents', selectedEvents);
         return bulkEditEvents(selectedEvents, key, value);
      },
      onMutate: async ({ selectedEvents, key, value }) => {
         await queryClient.cancelQueries(['events']); 

         const previousEvents = queryClient.getQueryData<Event[]>(['events']);

         if (previousEvents) {
            queryClient.setQueryData(['events'], (old: Event[] | undefined) =>
               old?.map((event) =>
                  selectedEvents.some((e) => e.id === event.id)
                     ? { ...event, [key]: value }
                     : event
               )
            );
         }

         return { previousEvents }; 
      },
      onError: (err, variables, context) => {
         if (context?.previousEvents) {
            queryClient.setQueryData(['events'], context.previousEvents);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries(['events']);
      },
   });
};

export const useDeleteEvent = () => {
   const queryClient = useQueryClient();

   return useMutation<void, Error, string | string[]>({
      mutationKey: ['deleteEvent'],
      mutationFn: async (eventIds: string | string[]) => {
         if (typeof eventIds === 'string') {
            await deleteEvent(eventIds);
         } else {
            await bulkDeleteEvents(eventIds);
         }
      },
      onMutate: async (eventIds: string | string[]) => {
         await queryClient.cancelQueries(['events']);

         const previousEvents = queryClient.getQueryData<Event[]>(['events']);

         if (previousEvents) {
            queryClient.setQueryData<Event[]>(['events'], (old) =>
               typeof eventIds === 'string'
                  ? old?.filter((event) => event.id !== eventIds)
                  : old?.filter((event) => !eventIds.includes(event.id))
            );
         }

         return { previousEvents };
      },
      onError: (err, eventIds, context: any) => {
         if (context?.previousEvents) {
            queryClient.setQueryData(['events'], context.previousEvents);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries(['events']);
      },
   });
};