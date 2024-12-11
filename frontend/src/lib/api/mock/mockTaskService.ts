export interface Task {
   id: string;
   name: string;
   status: 'inprogress' | 'completed' | 'pending'; // Assuming specific statuses
   details: string;
   link: string;
   startedAt: string; // ISO 8601 date-time string
   dueDate: string;   // ISO 8601 date-time string
   project: string;
   projectId: string;
   client: string;
   clientId: string;
 }

const task: Task = {
   id: 'task-001',
   name: 'Create Project Proposal',
   status: 'inprogress',
   details:
      'Draft a comprehensive proposal for the new project, including objectives, scope, timeline, and deliverables.',
   link: 'https://example.com/project-proposal',
   startedAt: '2024-11-20T09:00:00Z',
   dueDate: '2024-11-27T17:00:00Z',
   project: 'Project Management Tool Development',
   projectId: '1234',
   client: 'Acme Corp',
   clientId: '5647',
};

export const getTask = (id: string) => {
   return new Promise((resolve) => {
      setTimeout(() => resolve(task), 500);
   });
};

type QueryType = 'task' | 'event'

export const getAction = (id: string, type:QueryType) => {
   if (type === 'task') {
      return new Promise((resolve) => {
         setTimeout(() => resolve(task), 500);
      });
   } else if (type === 'event') {
      return new Promise((resolve) => {
         setTimeout(() => resolve(task), 500);
      });
   }
}

export const editTask = <K extends keyof typeof task>(
   key: K,
   value: (typeof task)[K]
) => {
   task[key] = value
   return Promise.resolve(task)
};

export const getAllTask = () => {
   return new Promise((resolve) => {
      setTimeout(() => resolve(mockAllTask), 500);
   });
}