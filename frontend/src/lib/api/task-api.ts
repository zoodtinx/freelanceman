import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
   editTask,
   getTask,
   getAllTasks,
   createTask,
   deleteTask,
   bulkEditTasks,
   bulkDeleteTasks,
} from './mock/mock-task-service';
import type { ActionResponsePayload, NewActionPayload, Task, TaskSearchOptions } from '@types';

export const useAllTasksQuery = (searchOptions: TaskSearchOptions = {}) => {
   return useQuery({
      queryKey: ['tasks', searchOptions],
      queryFn: () => getAllTasks(searchOptions),
   });
};

export const useTaskQuery = (taskId: string) => {
   const queryClient = useQueryClient();

   return useQuery<Task, Error, Task>({
      queryKey: ['tasks', taskId],
      queryFn: () => getTask(taskId),
   });
};

export const useCreateTask = () => {
   const queryClient = useQueryClient();

   return useMutation<Task, Error, NewActionPayload>({
      mutationKey: ['createTask'],
      mutationFn: async (newTask: NewActionPayload) => await createTask(newTask),
      onMutate: async (newTask: NewActionPayload) => {
         await queryClient.cancelQueries(['tasks']);

         const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);

         queryClient.setQueryData<Task[]>(['tasks'], (old) => [
            ...(old || []),
            { ...newTask, id: 'temp-id' },
         ]);

         return { previousTasks };
      },
      onError: (err, newTask, context: any) => {
         if (context?.previousTasks) {
            queryClient.setQueryData(['tasks'], context.previousTasks);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['tasks'] });
      },
   });
};

export const useEditTask = (taskId: string) => {
   const queryClient = useQueryClient();

   return useMutation<
      Task,
      Error,
      { key: keyof Task; value: Task[keyof Task] }
   >({
      mutationKey: ['editTask'],
      mutationFn: async (taskPayload: NewActionPayload) => {
         await editTask(taskId, taskPayload);
      },
      onMutate: async ({ key, value }) => {
         await queryClient.cancelQueries(['tasks']);

         const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);

         if (previousTasks) {
            queryClient.setQueryData(['tasks'], (old) =>
               old?.map((task) =>
                  task.id === taskId ? { ...task, [key]: value } : task
               )
            );
         }

         return { previousTasks };
      },
      onError: (err, variables, context) => {
         if (context?.previousTasks) {
            queryClient.setQueryData(['tasks'], context.previousTasks);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries(['tasks']);
      },
   });
};

export const useBulkEditTask = () => {
   const queryClient = useQueryClient();

   return useMutation<
      ActionResponsePayload[],
      Error,
      {
         selectedTasks: NewActionPayload[];
         key: keyof NewActionPayload;
         value: NewActionPayload[keyof NewActionPayload];
      }
   >({
      mutationKey: ['bulkEditTask'],
      mutationFn: async ({ selectedTasks, key, value }) => {
         console.log('selectedTasks', selectedTasks);
         return bulkEditTasks(selectedTasks, key, value);
      },
      onMutate: async ({ selectedTasks, key, value }) => {
         await queryClient.cancelQueries(['tasks']);

         const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);

         if (previousTasks) {
            queryClient.setQueryData(['tasks'], (old: Task[] | undefined) =>
               old?.map((task) =>
                  selectedTasks.some((t) => t.id === task.id)
                     ? { ...task, [key]: value }
                     : task
               )
            );
         }

         return { previousTasks };
      },
      onError: (err, variables, context) => {
         if (context?.previousTasks) {
            queryClient.setQueryData(['tasks'], context.previousTasks);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries(['tasks']);
      },
   });
};

export const useDeleteTask = () => {
   const queryClient = useQueryClient();

   return useMutation<void, Error, string | string[]>({
      mutationKey: ['deleteTask'],
      mutationFn: async (taskIds: string | string[]) => {
         if (typeof taskIds === 'string') {
            await deleteTask(taskIds);
         } else {
            await bulkDeleteTasks(taskIds);
         }
      },
      onMutate: async (taskIds: string | string[]) => {
         await queryClient.cancelQueries(['tasks']);

         const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);

         if (previousTasks) {
            queryClient.setQueryData<Task[]>(['tasks'], (old) =>
               typeof taskIds === 'string'
                  ? old?.filter((task) => task.id !== taskIds)
                  : old?.filter((task) => !taskIds.includes(task.id))
            );
         }

         return { previousTasks };
      },
      onError: (err, taskIds, context: any) => {
         if (context?.previousTasks) {
            queryClient.setQueryData(['tasks'], context.previousTasks);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries(['tasks']);
      },
   });
};
