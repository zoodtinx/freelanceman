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
import type { Task, TaskSearchOption } from '@types';

export const useAllTasksQuery = (searchOptions: TaskSearchOption = {}) => {
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

export const useTaskMutation = () => {
   const queryClient = useQueryClient();

   const createMutation = useMutation<Task, Error, NewActionPayload>({
      mutationKey: ['createTask'],
      mutationFn: async (newTask) => await createTask(newTask),
      onMutate: async (newTask) => {
         await queryClient.cancelQueries(['tasks']);
         const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);

         queryClient.setQueryData<Task[]>(['tasks'], (old) => [
            ...(old || []),
            { ...newTask, id: 'temp-id' },
         ]);

         return { previousTasks };
      },
      onError: (err, newTask, context) => {
         if (context?.previousTasks) {
            queryClient.setQueryData(['tasks'], context.previousTasks);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries(['tasks']);
      },
   });

   const editMutation = useMutation<Task, Error, { taskId: string; key: keyof Task; value: Task[keyof Task] }>({
      mutationKey: ['editTask'],
      mutationFn: async ({ taskId, ...taskPayload }) => {
         await editTask(taskId, taskPayload);
      },
      onMutate: async ({ taskId, key, value }) => {
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

   const deleteMutation = useMutation<void, Error, string | string[]>({
      mutationKey: ['deleteTask'],
      mutationFn: async (taskIds) => {
         if (typeof taskIds === 'string') {
            await deleteTask(taskIds);
         } else {
            await bulkDeleteTasks(taskIds);
         }
      },
      onMutate: async (taskIds) => {
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
      onError: (err, taskIds, context) => {
         if (context?.previousTasks) {
            queryClient.setQueryData(['tasks'], context.previousTasks);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries(['tasks']);
      },
   });

   return {
      createTask: createMutation.mutate,
      editTask: editMutation.mutate,
      deleteTask: deleteMutation.mutate,
      isLoading: createMutation.isLoading || editMutation.isLoading || deleteMutation.isLoading,
      data: {
         created: createMutation.data,
         edited: editMutation.data,
         deleted: deleteMutation.data,
      },
   };
};
