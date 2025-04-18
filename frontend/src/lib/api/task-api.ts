import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
   editTask,
   getTasks,
   deleteTask,
   createTask,
} from '@/lib/api/services/task-service';
import useAuthStore from '@/lib/zustand/auth-store';
import {
   CreateTaskDto,
   EditTaskDto,
   TaskFilterDto,
   TaskPayload,
} from 'freelanceman-common';
import { useNavigate } from 'react-router-dom';
import { MutationCallbacks } from '@/lib/api/services/helpers/api.type';
import { useEffect } from 'react';
import { useAppMutation } from '@/lib/api/services/helpers/useAppMutation';

export const useTaskApi = () => {
   return {
      createTask: useCreateTask(),
      deleteTask: useDeleteTask(),
      editTask: useEditTask(),
   };
};

export const useTasksQuery = (filter: TaskFilterDto = {}) => {
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   const queryResult = useQuery({
      queryKey: ['tasks', filter],
      queryFn: () => getTasks(accessToken, filter),
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

   return queryResult
};

export const useTaskQuery = (taskId: string) => {
   return useQuery<TaskPayload, Error, TaskPayload>({
      queryKey: ['tasks', taskId],
      queryFn: () => getTask(taskId),
   });
};

export const useCreateTask = (callbacks?: MutationCallbacks) => {
   return useAppMutation(
      { mutationKey: 'tasks', mutationFn: createTask },
      callbacks
   );
};

// export const useCreateTask = ({
//    errorCallback,
//    successCallback,
// }: MutationCallbacks = {}) => {
//    const queryClient = useQueryClient();
//    const { accessToken } = useAuthStore();
//    const navigate = useNavigate();

//    return useMutation({
//       mutationKey: ['createTask'],
//       mutationFn: async (newTask: CreateTaskDto) =>
//          await createTask(accessToken, newTask),
//       onSuccess: () => {
//          successCallback && successCallback();
//       },
//       onError: (err) => {
//          if (err.message === 'Unauthorized') {
//             navigate('/login');
//          } else {
//             errorCallback && errorCallback(err);
//          }
//       },
//       onSettled: () => {
//          queryClient.invalidateQueries({ queryKey: ['projects'] });
//          queryClient.invalidateQueries({ queryKey: ['tasks'] });
//       },
//    });
// };

export const useEditTask = (callbacks?: MutationCallbacks) => {
   return useAppMutation(
      {
         mutationKey: 'tasks',
         invalidationKeys: ['tasks', 'projects'],
         mutationFn: createTask,
      },
      callbacks
   );
};

// export const useEditTask = ({
//    errorCallback,
//    successCallback,
// }: MutationCallbacks = {}) => {
//    const queryClient = useQueryClient();
//    const { accessToken } = useAuthStore();
//    const navigate = useNavigate();

//    return useMutation({
//       mutationKey: ['editTask'],
//       mutationFn: async (taskPayload: EditTaskDto) => {
//          await editTask(accessToken, taskPayload);
//       },
//       onSuccess: () => {
//          successCallback && successCallback();
//       },
//       onError: (err) => {
//          if (err.message === 'Unauthorized') {
//             navigate('/login');
//          } else {
//             errorCallback && errorCallback(err);
//          }
//       },
//       onSettled: () => {
//          queryClient.invalidateQueries({ queryKey: ['projects'] });
//          queryClient.invalidateQueries({ queryKey: ['tasks'] });
//       },
//    });
// };

export const useDeleteTask = ({
   errorCallback,
   successCallback,
}: MutationCallbacks = {}) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationKey: ['deleteTask'],
      mutationFn: async (taskId: string) => {
         await deleteTask(accessToken, taskId);
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
