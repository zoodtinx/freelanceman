import {
   editTask,
   getTask,
   createTask,
   deleteTask,
   getTasks,
} from './services/task-service';
import { UseApiOptions } from '@/lib/api/services/helpers/api.type';
import {
   TaskFilterDto,
   TaskFindManyResponse
} from 'freelanceman-common';
import { useAppQuery } from '@/lib/api/services/helpers/useAppQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/lib/zustand/auth-store';
import { CreateTaskDtoWithOptimisticUpdate, EditTaskDto } from 'freelanceman-common/src/schemas';
import { getBaseMutationOptions } from '@/lib/api/services/helpers/base-mutation-options';
import { defaultApiOptions } from '@/lib/api/services/helpers/default-option';

export const useTasksQuery = (filter: TaskFilterDto = {}) => {
   return useAppQuery(['tasks', filter], (token) => getTasks(token, filter));
};

export const useTaskQuery = (taskId: string) => {
   return useAppQuery(['task', taskId], (token) => getTask(token, taskId));
};

export const useCreateTask = (options: UseApiOptions = defaultApiOptions) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (payload: CreateTaskDtoWithOptimisticUpdate) => createTask(accessToken, payload),
      onMutate: async (newTask: CreateTaskDtoWithOptimisticUpdate) => {
         if (!options.enableOptimisticUpdate) {
            return;
         }

         await queryClient.cancelQueries({ queryKey: ['tasks'] });

         const previousTaskQueries =
            queryClient.getQueriesData<TaskFindManyResponse>({
               queryKey: ['tasks'],
            });

         const context: Record<string, TaskFindManyResponse> = {};

         previousTaskQueries.forEach(([queryKey, previousTasks]) => {
            const [_, filter] = queryKey as [string, TaskFilterDto];

            const isFiltering = filter?.status || filter?.projectId;

            console.log('filter', filter);

            let newItems = previousTasks?.items
               ? [...previousTasks.items, newTask]
               : [newTask];

            if (isFiltering) {
               newItems = newItems.filter((task) => {
                  if (filter.status && task.status !== filter.status)
                     return false;
                  if (filter.projectId && task.projectId !== filter.projectId)
                     return false;
                  return true;
               });
            }

            const sortedItems = newItems.sort(
               (a, b) =>
                  new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime() ||
                  new Date(a.updatedAt!).getTime() -
                     new Date(b.updatedAt!).getTime() ||
                  a.name.localeCompare(b.name)
            );

            const optimisticUpdatedTasks = {
               total: previousTasks?.total ? previousTasks.total + 1 : 1,
               items: sortedItems,
            };

            queryClient.setQueryData(queryKey, optimisticUpdatedTasks);
         });

         return context;
      },
      ...getBaseMutationOptions({
         navigate,
         options,
         queryClient,
         queryKey: ['tasks'],
      }),
   });
};

export const useEditTask = (options: UseApiOptions = defaultApiOptions) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (payload: EditTaskDto) => editTask(accessToken, payload),
      onMutate: async (newTask: EditTaskDto) => {
         if (!options.enableOptimisticUpdate) {
            return;
         }

         await queryClient.cancelQueries({ queryKey: ['tasks'] });

         const previousTaskQueries =
            queryClient.getQueriesData<TaskFindManyResponse>({
               queryKey: ['tasks'],
            });

         const context: Record<string, TaskFindManyResponse> = {};

         previousTaskQueries.forEach(([queryKey, previousTasks]) => {
            if (!previousTasks) return;

            context[JSON.stringify(queryKey)] = previousTasks;

            const optimisticUpdatedTasks = {
               ...previousTasks,
               items: previousTasks.items.map((e) =>
                  e.id === newTask.id ? { ...e, ...newTask } : e
               ),
            };

            queryClient.setQueryData(queryKey, optimisticUpdatedTasks);
         });

         return context;
      },
      ...getBaseMutationOptions({
         navigate,
         options,
         queryClient,
         queryKey: ['tasks'],
      }),
   });
};

export const useDeleteTask = (options: UseApiOptions = defaultApiOptions) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (deletedTaskId: string) =>
         deleteTask(accessToken, deletedTaskId),
      onMutate: async (deletedTaskId: string) => {
         if (options && !options.enableOptimisticUpdate) {
            return;
         }

         await queryClient.cancelQueries({ queryKey: ['tasks'] });

         const previousTaskQueries =
            queryClient.getQueriesData<TaskFindManyResponse>({
               queryKey: ['tasks'],
            });

         const context: Record<string, TaskFindManyResponse> = {};

         previousTaskQueries.forEach(([key, previousTasks]) => {
            if (!previousTasks) return;

            const keyStr = JSON.stringify(key); // use actual key
            context[keyStr] = previousTasks;

            const optimisticUpdatedTasks = {
               ...previousTasks,
               items: previousTasks.items.filter((i) => i.id !== deletedTaskId),
               total: previousTasks.total - 1,
            };

            queryClient.setQueryData(key, optimisticUpdatedTasks);
         });

         return context;
      },
      ...getBaseMutationOptions({
         navigate,
         options: options,
         queryClient,
         queryKey: ['tasks'],
      }),
   });
};
