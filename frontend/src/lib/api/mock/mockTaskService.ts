import { mockTasks } from "@mocks";
import type { ActionResponsePayload, NewActionPayload } from "@types";

export const getTask = (id: string) => {
   const task = mockTasks.find(task => task.id === id);

   return new Promise((resolve) => {
      setTimeout(() => resolve(task), 500);
   });
};

export const getAllTasks = () => {
   return new Promise((resolve) => {
      setTimeout(() => resolve(mockTasks), 500);
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
