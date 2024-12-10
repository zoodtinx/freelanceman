import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { editEvent, getEvent, getAllEvent, createEvent } from './mock/mockEventService';
import type { Event } from '@types';

// Hook for fetching an event
export const useEventQuery = (eventId: string) => {
   return useQuery({
      queryKey: ['event', eventId],
      queryFn: () => getEvent(eventId),
   });
};

export const useAllEventQuery = () => {
   return useQuery({
      queryKey: ['allEvent'],
      queryFn: () => getAllEvent(),
   });
};

export const useCreateEvent = () => {
   const queryClient = useQueryClient();

   return useMutation<
      Event[], // The created event type
      Error, // Error type
      Event // Input event data
   >({
      mutationFn: (newEvent) => createEvent(newEvent),
      onMutate: async (newEvent) => {
         await queryClient.cancelQueries(['allEvent']);

         const previousEvents = queryClient.getQueryData<Event[]>(['allEvent']);

         queryClient.setQueryData<Event[]>(['allEvent'], (old) => [
            ...(old || []),
            { ...newEvent, id: 'temp-id' }, // Add a temporary ID or placeholder if needed
         ]);

         return { previousEvents };
      },
      onError: (err, newEvent, context: any) => {
         if (context?.previousEvents) {
            queryClient.setQueryData(['allEvent'], context.previousEvents);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries(['allEvent']);
      },
   });
};



// Hook for editing an event
export const useEditEvent = (eventId: string) => {
   const queryClient = useQueryClient();

   return useMutation<
      Event, // The updated event type
      Error, // Error type
      { key: keyof Event; value: Event[keyof Event] } // Mutation variables
   >({
      mutationFn: ({ key, value }) => editEvent(key, value),
      onMutate: async ({ key, value }) => {
         await queryClient.cancelQueries(['event', eventId]);

         const previousEvent = queryClient.getQueryData<Event>([
            'event',
            eventId,
         ]);

         queryClient.setQueryData<Event>(['event', eventId], (old) => {
            if (!old) return null;
            return { ...old, [key]: value };
         });

         return { previousEvent };
      },
      onError: (err, variables, context: any) => {
         if (context?.previousEvent) {
            queryClient.setQueryData(['event', eventId], context.previousEvent);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries(['event', eventId]);
      },
   });
};
