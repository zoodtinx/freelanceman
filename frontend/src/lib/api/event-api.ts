import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
   editEvent,
   getEvent,
   createEvent,
   deleteEvent,
} from './mock/mock-event-service';
import type { CreateEventDto, EditEventDto, Event, EventFields, EventFilter, EventSearchOption } from '@types';


export const useEventApi = () => {
   return {
      createEvent: useCreateEvent(),
      deleteEvent: useDeleteEvent(),
      editEvent: useEditEvent()
   }
}

export const useEventsQuery = (
   searchOptions: EventFilter = {},
   fields: EventFields
) => {
   return useQuery({
      queryKey: ['events', searchOptions, fields],
      queryFn: () => getAllEvents(searchOptions, fields),
   });
};

export const useActiveEventCountQuery = () => {
   return useQuery({
      queryKey: ['events', 'counts'],
      queryFn: () => new Promise<number>((resolve) => {
         setTimeout(() => {
            resolve(6);
         }, 2000);
      })
   });
}

export const useEventQuery = (eventId: string) => {
   return useQuery<Event, Error, Event>({
      queryKey: ['events', eventId],
      queryFn: () => getEvent(eventId),
   });
};


export const useCreateEvent = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['createEvent'],
      mutationFn: async (newEvent: CreateEventDto) => await createEvent(newEvent),
      onMutate: async (newEvent: CreateEventDto) => {
         await queryClient.cancelQueries({ queryKey: ['events'] });
         const previousEvents = queryClient.getQueryData(['events']);

         queryClient.setQueryData(['events'], (old: Event[]) => [
            ...(old || []),
            { ...newEvent, id: 'temp-id' },
         ]);

         return { previousEvents };
      },
      onError: (err, newEvent, context) => {
         console.log('New event ', newEvent);
         console.log(err);
         if (context?.previousEvents) {
            queryClient.setQueryData(['events'], context.previousEvents);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['events'] });
      },
   });
};


interface EditEventMutationPayload {
   eventId: string;
   eventPayload: EditEventDto;
}

export const useEditEvent = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['editEvent'],
      mutationFn: async ({ eventId, eventPayload }: EditEventMutationPayload) => {
         await editEvent(eventId, eventPayload);
      },
      onMutate: async ({ eventId, eventPayload }) => {
         await queryClient.cancelQueries({ queryKey: ['events'] });
         const previousEvents = queryClient.getQueryData(['events']);

         if (previousEvents) {
            queryClient.setQueryData(['events'], (old: Event[]) =>
               old?.map((event) => (event.id === eventId ? eventPayload : event))
            );
         }

         return { previousEvents };
      },
      onError: (err, newEventPayload, context) => {
         console.log('New event ', newEventPayload);
         console.log(err);
         if (context?.previousEvents) {
            queryClient.setQueryData(['events'], context.previousEvents);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['events'] });
      },
   });
};


export const useDeleteEvent = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['deleteEvent'],
      mutationFn: async (eventId: string) => {
         await deleteEvent(eventId);
      },
      onMutate: async (eventId: string) => {
         await queryClient.cancelQueries({ queryKey: ['events'] });
         const previousEvents = queryClient.getQueryData(['events']);

         if (previousEvents) {
            queryClient.setQueryData(['events'], (old: Event[]) =>
               old?.filter((event) => event.id !== eventId)
            );
         }

         return { previousEvents };
      },
      onError: (err, eventIds, context) => {
         console.log('Event deleting ', eventIds);
         console.log(err);
         if (context?.previousEvents) {
            queryClient.setQueryData(['events'], context.previousEvents);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['events'] });
      },
   });
};
