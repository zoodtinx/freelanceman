import {
   editEvent,
   getEvent,
   createEvent,
   deleteEvent,
   getEvents,
} from './services/event-service';
import { UseApiOptions } from '@/lib/api/services/helpers/api.type';
import {
   CreateEventDto,
   EventFilterDto,
   EventFindManyResponse,
} from 'freelanceman-common';
import { useAppQuery } from '@/lib/api/services/helpers/useAppQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/lib/zustand/auth-store';
import { EditEventDto } from 'freelanceman-common/src/schemas';
import { getBaseMutationOptions } from '@/lib/api/services/helpers/base-mutation-options';
import { defaultApiOptions } from '@/lib/api/services/helpers/default-option';

export const useEventsQuery = (filter: EventFilterDto = {}) => {
   return useAppQuery(['events', filter], (token) => getEvents(token, filter));
};

export const useEventQuery = (eventId: string) => {
   return useAppQuery(['events', eventId], (token) => getEvent(token, eventId));
};

export const useCreateEvent = (options: UseApiOptions = defaultApiOptions) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (payload: CreateEventDto) =>
         createEvent(accessToken, payload),
      onMutate: async (newEvent: CreateEventDto) => {
         if (!options.enableOptimisticUpdate) {
            return;
         }

         await queryClient.cancelQueries({ queryKey: ['events'] });

         const previousEventQueries =
            queryClient.getQueriesData<EventFindManyResponse>({
               queryKey: ['events'],
            });

         const context: Record<string, EventFindManyResponse> = {};

         previousEventQueries.forEach(([queryKey, previousEvents]) => {
            if (!previousEvents) return;

            context[JSON.stringify(queryKey)] = previousEvents;

            let newEventWithTemplate;
            if (newEvent.projectId) {
               const templateEvent = previousEvents.items.find(
                  (item) => item.projectId === newEvent.projectId
               );
               newEventWithTemplate = {
                  ...templateEvent,
                  ...newEvent,
               };
            } else {
               newEventWithTemplate = newEvent;
            }

            const optimisticUpdatedEvents = {
               total: previousEvents.total + 1, // Corrected total count
               items: [...previousEvents.items, newEventWithTemplate].sort(
                  (a, b) =>
                     new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime()
               ),
            };

            queryClient.setQueryData(queryKey, optimisticUpdatedEvents);
         });

         return context;
      },
      ...getBaseMutationOptions({
         navigate,
         options,
         queryClient,
         queryKey: ['events'],
      }),
   });
};

export const useEditEvent = (options: UseApiOptions = defaultApiOptions) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (payload: EditEventDto) => editEvent(accessToken, payload),
      onMutate: async (newEvent: EditEventDto) => {
         if (!options.enableOptimisticUpdate) {
            return;
         }

         await queryClient.cancelQueries({ queryKey: ['events'] });

         const previousEventQueries =
            queryClient.getQueriesData<EventFindManyResponse>({
               queryKey: ['events'],
            });

         const context: Record<string, EventFindManyResponse> = {};

         previousEventQueries.forEach(([queryKey, previousEvents]) => {
            if (!previousEvents) return;

            context[JSON.stringify(queryKey)] = previousEvents;

            const optimisticUpdatedEvents = {
               ...previousEvents,
               items: previousEvents.items.map((e) =>
                  e.id === newEvent.id ? { ...e, ...newEvent } : e
               ),
            };

            queryClient.setQueryData(queryKey, optimisticUpdatedEvents);
         });

         return context;
      },
      ...getBaseMutationOptions({
         navigate,
         options,
         queryClient,
         queryKey: ['events'],
      }),
   });
};

export const useDeleteEvent = (options: UseApiOptions = defaultApiOptions) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (deletedEventId: string) =>
         deleteEvent(accessToken, deletedEventId),
      onMutate: async (deletedEventId: string) => {
         if (!options.enableOptimisticUpdate) {
            return;
         }

         await queryClient.cancelQueries({ queryKey: ['events'] });

         const previousEventQueries =
            queryClient.getQueriesData<EventFindManyResponse>({
               queryKey: ['events'],
            });

         const context: Record<string, EventFindManyResponse> = {};

         previousEventQueries.forEach(([key, previousEvents]) => {
            if (!previousEvents) return;

            const keyStr = JSON.stringify(key); // use actual key
            context[keyStr] = previousEvents;

            const optimisticUpdatedTasks = {
               ...previousEvents,
               items: previousEvents.items.filter((i) => i.id !== deletedEventId),
               total: previousEvents.total - 1,
            };

            queryClient.setQueryData(key, optimisticUpdatedTasks);
         });

         return context;
      },
      ...getBaseMutationOptions({
         navigate,
         options,
         queryClient,
         queryKey: ['events'],
      }),
   });
};
