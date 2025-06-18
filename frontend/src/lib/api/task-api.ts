import {
   editTask,
   getTasks,
   deleteTask,
   createTask,
   getTask,
} from '@/lib/api/services/task-service';
import { EditTaskDto, TaskFilterDto } from 'freelanceman-common';
import { MutationCallbacks } from '@/lib/api/services/helpers/api.type';
import { useAppMutation } from '@/lib/api/services/helpers/useAppMutation';
import { useAppQuery } from '@/lib/api/services/helpers/useAppQuery';

export const useTasksQuery = (filter: TaskFilterDto = {}) => {
   return useAppQuery(['tasks', filter], (token) => getTasks(token, filter));
};

export const useTaskQuery = (taskId: string) => {
   return useAppQuery(['tasks', taskId], (token) => getTask(token, taskId));
};

export const useCreateTask = (callbacks?: MutationCallbacks) => {
   return useAppMutation(
      {
         mutationKey: 'createTask',
         invalidationKeys: ['tasks'],
         mutationFn: createTask,
      },
      callbacks
   );
};

export const useEditTask = (callbacks?: MutationCallbacks) => {
   return useAppMutation<EditTaskDto>(
      {
         mutationKey: 'editTask',
         invalidationKeys: ['tasks', 'projects'],
         mutationFn: editTask,
      },
      callbacks
   );
};

export const useDeleteTask = (callbacks?: MutationCallbacks) => {
   return useAppMutation(
      {
         mutationKey: 'deleteTask',
         invalidationKeys: ['tasks', 'projects'],
         mutationFn: deleteTask,
      },
      callbacks
   );
};
