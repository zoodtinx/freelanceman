import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
   editEvent,
   getEvent,
   createEvent,
   deleteEvent,
   getEvents,
} from './services/event-service';
import useAuthStore from '@/lib/zustand/auth-store';
import { MutationCallbacks } from '@/lib/api/services/helpers/api.type';
import { useNavigate } from 'react-router-dom';
import {
   CreateEventDto,
   EditEventDto,
   EventFilterDto,
} from 'freelanceman-common';
import { useEffect } from 'react';

export const useEventApi = () => {
   return {
      createEvent: useCreateEvent(),
      deleteEvent: useDeleteEvent(),
      editEvent: useEditEvent(),
   };
};

export const useEventsQuery = (filter: EventFilterDto = {}) => {
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   const queryResult = useQuery({
      queryKey: ['projects', filter],
      queryFn: () => getEvents(accessToken, filter),
   });

   const { isError, error } = queryResult;

   useEffect(() => {
      if (
         isError &&
         error instanceof Error &&
         error.message === 'Unauthorized'
      ) {
         navigate('/login');
      }
   }, [isError, error, navigate]);

   return queryResult;
};

export const useEventQuery = (eventId: string) => {
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   const queryResult = useQuery({
      queryKey: ['project', eventId],
      queryFn: () => getEvent(accessToken, eventId),
   });

   const { isError, error } = queryResult;

   useEffect(() => {
      if (
         isError &&
         error instanceof Error &&
         error.message === 'Unauthorized'
      ) {
         navigate('/login');
      }
   }, [isError, error, navigate]);

   return queryResult;
};

export const useCreateEvent = ({
   errorCallback,
   successCallback,
}: MutationCallbacks = {}) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationKey: ['createEvent'],
      mutationFn: async (newEvent: CreateEventDto) =>
         await createEvent(accessToken, newEvent),
      onSuccess: () => {
         successCallback && successCallback();
      },
      onError: (err) => {
         if (err.message === 'Unauthorized') {
            navigate('/login');
         } else {
            errorCallback && errorCallback(err);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['projects'] });
         queryClient.invalidateQueries({ queryKey: ['tasks'] });
      },
   });
};

export const useEditEvent = ({
   errorCallback,
   successCallback,
}: MutationCallbacks = {}) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationKey: ['editEvent'],
      mutationFn: async (payload: EditEventDto) => {
         await editEvent(accessToken, payload);
      },
      onSuccess: () => {
         successCallback && successCallback();
      },
      onError: (err) => {
         if (err.message === 'Unauthorized') {
            navigate('/login');
         } else {
            errorCallback && errorCallback(err);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['projects'] });
         queryClient.invalidateQueries({ queryKey: ['tasks'] });
      },
   });
};

export const useDeleteEvent = ({
   errorCallback,
   successCallback,
}: MutationCallbacks = {}) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationKey: ['deleteEvent'],
      mutationFn: async (eventId: string) => {
         await deleteEvent(accessToken, eventId);
      },
      onSuccess: () => {
         successCallback && successCallback();
      },
      onError: (err) => {
         if (err.message === 'Unauthorized') {
            navigate('/login');
         } else {
            errorCallback && errorCallback(err);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['projects'] });
         queryClient.invalidateQueries({ queryKey: ['tasks'] });
      },
   });
};
