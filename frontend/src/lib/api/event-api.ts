import {
   editEvent,
   getEvent,
   createEvent,
   deleteEvent,
   getEvents,
} from './services/event-service';
import { MutationCallbacks } from '@/lib/api/services/helpers/api.type';
import {
   CreateEventDto,
   EventFilterDto,
   EventFindManyResponse,
} from 'freelanceman-common';
import { useAppQuery } from '@/lib/api/services/helpers/useAppQuery';
import { useAppMutation } from '@/lib/api/services/helpers/useAppMutation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/lib/zustand/auth-store';

export const useEventsQuery = (filter: EventFilterDto = {}) => {
   return useAppQuery(['events', filter], (token) => getEvents(token, filter));
};

export const useEventQuery = (eventId: string) => {
   return useAppQuery(['events', eventId], (token) => getEvent(token, eventId));
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

interface useApiOptions {
   successCallbacks?: () => void;
   errorCallbacks?: () => void;
   enableOptimisticUpdate?: boolean;
}

export const useCreateEvent = (options: useApiOptions) => {
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

         console.log('triggered');

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
      onSuccess: () => {
         options.successCallbacks && options.successCallbacks();
      },
      onError: async () => {},
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['events'] });
      },
   });
};
