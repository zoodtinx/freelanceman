import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { editTask, getTask } from './mock/mockTaskService';
import type { Task } from './mock/mockTaskService';

// Hook for fetching a task
export const useTaskQuery = (taskId: string) => {
   return useQuery({
      queryKey: ['task', taskId],
      queryFn: () => getTask(taskId),
   });
};

// Hook for editing a task
export const useEditTask = (taskId: string) => {
   const queryClient = useQueryClient();

   return useMutation<
      Task, // The updated task type
      Error, // Error type
      { key: keyof Task; value: Task[keyof Task] } // Mutation variables
   >(
      {
         mutationFn:({ key, value }) => editTask(key, value),
         onMutate: async ({ key, value }) => {
            await queryClient.cancelQueries(['task', taskId]);

            const previousTask = queryClient.getQueryData<Task>([
               'task',
               taskId,
            ]);

            queryClient.setQueryData<Task>(['task', taskId], (old) => {
               if (!old) return null;
               return { ...old, [key]: value };
            });

            return { previousTask };
         },
         onError: (err, variables, context: any) => {
            if (context?.previousTask) {
               queryClient.setQueryData(['task', taskId], context.previousTask);
            }
         },
         onSettled: () => {
            queryClient.invalidateQueries(['task', taskId]);
         },
      }
   );
};
