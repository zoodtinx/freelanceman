import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
   editTask,
   getTask,
   getAllTasks,
   createTask,
   deleteTask,
} from './mock/mock-task-service';
import type { CreateTaskDto, EditTaskDto, Task, TaskSearchOption } from '@types';

export const useAllTasksQuery = (searchOptions: TaskSearchOption = {}) => {
   return useQuery({
      queryKey: ['tasks', searchOptions],
      queryFn: () => getAllTasks(searchOptions),
   });
};

export const useTasksQuery = (searchOptions: TaskSearchOption = {}) => {
   return useQuery({
      queryKey: ['tasks', JSON.stringify(searchOptions)],
      queryFn: () => getAllTasks(searchOptions),
   });
};

export const useTaskQuery = (taskId: string) => {
   return useQuery<Task, Error, Task>({
      queryKey: ['tasks', taskId],
      queryFn: () => getTask(taskId),
   });
};

export const useCreateTask = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['createTask'],
      mutationFn: async (newTask: CreateTaskDto) => await createTask(newTask),
      onMutate: async (newTask: CreateTaskDto) => {
         await queryClient.cancelQueries({ queryKey: ['tasks'] });
         const previousTasks = queryClient.getQueryData(['tasks']);

         queryClient.setQueryData(['tasks'], (old: Task[]) => [
            ...(old || []),
            { ...newTask, id: 'temp-id' },
         ]);

         return { previousTasks };
      },
      onError: (err, newTask, context) => {
         console.log('New task ', newTask);
         console.log(err);
         if (context?.previousTasks) {
            queryClient.setQueryData(['tasks'], context.previousTasks);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['tasks'] });
      },
   });
};

interface EditTaskMutationPayload {
   taskId: string;
   taskPayload: EditTaskDto;
}

export const useEditTask = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['editTask'],
      mutationFn: async ({ taskId, taskPayload }: EditTaskMutationPayload) => {
         await editTask(taskId, taskPayload);
      },
      onMutate: async ({ taskId, taskPayload }) => {
         await queryClient.cancelQueries({ queryKey: ['tasks'] });
         const previousTasks = queryClient.getQueryData(['tasks']);

         if (previousTasks) {
            queryClient.setQueryData(['tasks'], (old: Task[]) =>
               old?.map((task) => (task.id === taskId ? taskPayload : task))
            );
         }

         return { previousTasks };
      },
      onError: (err, newTaskPayload, context) => {
         console.log('New task ', newTaskPayload);
         console.log(err);
         if (context?.previousTasks) {
            queryClient.setQueryData(['tasks'], context.previousTasks);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['tasks'] });
      },
   });
};

export const useDeleteTask = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['deleteTask'],
      mutationFn: async (taskId: string) => {
         await deleteTask(taskId);
      },
      onMutate: async (taskId: string) => {
         await queryClient.cancelQueries({ queryKey: ['tasks'] });
         const previousTasks = queryClient.getQueryData(['tasks']);

         if (previousTasks) {
            queryClient.setQueryData(['tasks'], (old: Task[]) =>
               old?.filter((task) => task.id !== taskId)
            );
         }

         return { previousTasks };
      },
      onError: (err, taskIds, context) => {
         console.log('Task deleting ', taskIds);
         console.log(err);
         if (context?.previousTasks) {
            queryClient.setQueryData(['tasks'], context.previousTasks);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['tasks'] });
      },
   });
};

export const useTaskApi = () => {
   return {
      createTask: useCreateTask(),
      deleteTask: useDeleteTask(),
      editTask: useEditTask()
   }
}