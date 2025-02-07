import { mockTasks } from "@mocks";
import type { ActionResponsePayload, NewActionPayload, Task, TaskSearchOptions } from "@types";

export const getTask = (id: string) => {
   const task = 'This is a quick task.'

   return new Promise((resolve) => {
      setTimeout(() => resolve(task), 500);
   });
};

export const getAllTasks = (searchOptions: TaskSearchOptions = {}): Promise<Task[]> => {
   return new Promise((resolve) => {
      setTimeout(() => {
         if (!searchOptions || Object.keys(searchOptions).length === 0) {
            console.log(Object.keys(searchOptions).length)
            resolve(mockTasks);
            return;
         }

         if (searchOptions.status === 'all') {
            resolve(mockTasks);
            return;
         }

         const filteredTasks = mockTasks.filter((event) => {
            const matchesStatus =
               searchOptions.status === undefined ||
               searchOptions.status.trim() === "" ||
               event.status === searchOptions.status.trim();

            const matchesCreatedAt =
               !searchOptions.createdAt || searchOptions.createdAt.trim() === "" ||
               event.createdAt.startsWith(searchOptions.createdAt.trim());

            const matchesdueAt =
               !searchOptions.dueAt || searchOptions.dueAt.trim() === "" ||
               event.dueAt.startsWith(searchOptions.dueAt.trim());

            const matchesWithTime =
               searchOptions.withTime === undefined || event.withTime === searchOptions.withTime;

            const matchesProjectId =
               !searchOptions.projectId || searchOptions.projectId.trim() === "" ||
               event.projectId === searchOptions.projectId.trim();

            const matchesClientId =
               !searchOptions.clientId || searchOptions.clientId.trim() === "" ||
               event.clientId === searchOptions.clientId.trim();

            return (
               matchesStatus &&
               matchesCreatedAt &&
               matchesdueAt &&
               matchesWithTime &&
               matchesProjectId &&
               matchesClientId
            );
         });

         filteredTasks.sort((a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime());

         resolve(filteredTasks);
      }, 500);
   });
};
export const editTask = (id: string, taskPayload: NewActionPayload) => {
   console.log('id', id);
   console.log('taskPayload', taskPayload);

   const task = mockTasks.find((t) => t.id === id);

   if (!task) {
      return Promise.reject(new Error(`Task with id ${taskPayload.id} not found`));
   }

   Object.keys(taskPayload).forEach((key) => {
      if (key !== "id" && key in task) {
         task[key as keyof NewActionPayload] = taskPayload[key as keyof NewActionPayload];
      }
   });

   return Promise.resolve(task);
};

export const createTask = (newTask: NewActionPayload) => {
   const createdTask = {
      ...newTask,
      createdAt: new Date().toISOString(),
      project: 'placeholder',
      client: 'placeholder',
      clientId: 'placeholder',
      id: crypto.randomUUID(),
   };

   mockTasks.push(createdTask);

   return Promise.resolve(mockTasks);
};

export const bulkEditTasks = (
   selectedTasks: NewActionPayload[],
   key: keyof NewActionPayload,
   value: NewActionPayload[keyof NewActionPayload]
) => {
   console.log('selectedTasks', selectedTasks);

   mockTasks.forEach((task) => {
      if (selectedTasks.some((selectedTask) => selectedTask.id === task.id)) {
         task[key] = value;
      }
   });

   return mockTasks;
};

export const deleteTask = (taskId: string) => {
   const index = mockTasks.findIndex((task) => task.id === taskId);
   if (index !== -1) {
      mockTasks.splice(index, 1);
   }
   return Promise.resolve(taskId);
};

export const bulkDeleteTasks = (taskIds: string[]) => {
   taskIds.forEach(taskId => {
      const index = mockTasks.findIndex(task => task.id === taskId);
      if (index !== -1) {
         mockTasks.splice(index, 1);
      }
   });

   return Promise.resolve(taskIds);
};
