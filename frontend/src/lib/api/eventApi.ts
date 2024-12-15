import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
   editEvent,
   getEvent,
   getAllEvent,
   createEvent,
   deleteEvent,
} from './mock/mockEventService';
import type { Event, NewActionPayload } from '@types';

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

export const useDeleteEvent = () => {
   const queryClient = useQueryClient();

   return useMutation<void, Error, string>({
      mutationFn: async (eventId: string) => {
         await deleteEvent(eventId);
      },
      onMutate: async (eventId: string) => {
         await queryClient.cancelQueries(['events']);

         const previousEvents = queryClient.getQueryData<Event[]>(['events']);

         if (previousEvents) {
            queryClient.setQueryData<Event[]>(['events'], (old) =>
               old?.filter((event) => event.id !== eventId)
            );
         }

         return { previousEvents };
      },
      onError: (err, eventId, context: any) => {
         if (context?.previousEvents) {
            queryClient.setQueryData(['events'], context.previousEvents);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries(['events']);
      },
   });
};