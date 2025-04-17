import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
   editTask,
   getTasks,
   deleteTask
} from '@/lib/api/services/task-service';
import useAuthStore from '@/lib/zustand/auth-store';
import {
   CreateTaskDto,
   EditTaskDto,
   TaskFilterDto,
   TaskPayload,
} from 'freelanceman-common';
import { useNavigate } from 'react-router-dom';

export const useTaskApi = () => {
   return {
      createTask: useCreateTask(),
      deleteTask: useDeleteTask(),
      editTask: useEditTask(),
   };
};

export const useTasksQuery = (filter: TaskFilterDto = {}) => {
   const { accessToken } = useAuthStore();
   return useQuery({
      queryKey: ['tasks', filter],
      queryFn: () => getTasks(accessToken, filter),
   });
};

export const useTaskQuery = (taskId: string) => {
   return useQuery<TaskPayload, Error, TaskPayload>({
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

         queryClient.setQueryData(['tasks'], (old: TaskPayload[]) => [
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

export const useEditTask = () => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationKey: ['editTask'],
      mutationFn: async (taskPayload: EditTaskDto) => {
         await editTask(accessToken, taskPayload);
      },
      onError: (err) => {
         if (err.message === 'Unauthorized') {
            navigate('/login');
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['projects'] });
         queryClient.invalidateQueries({ queryKey: ['tasks'] });
      },
   });
};

export const useDeleteTask = () => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationKey: ['deleteTask'],
      mutationFn: async (taskId: string) => {
         await deleteTask(accessToken, taskId);
      },
      onError: (err) => {
         console.log('err', err)
         if (err.message === 'Unauthorized') {
            navigate('/login');
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['projects'] });
         queryClient.invalidateQueries({ queryKey: ['tasks'] });
      },
   });
};
