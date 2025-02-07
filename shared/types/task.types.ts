export type TaskStatus = "pending" | "finished" | "cancelled";

export interface Task {
   id: string;
   name: string;
   status: TaskStatus;
   details: string;
   link: string;
   dueAt: string;
   project: string;
   projectId: string;
   client: string;
   clientId: string;
   themeColor: string;
}

export type TaskSearchOption = Partial<
   Pick<Task, "name" | "status" | "dueAt" | "projectId" | "clientId">
>;

export interface CreateTaskDto {
   name: string;
   status: string;
   projectId: string;
   clientId: string;
   dueAt: string;
   details?: string;
   link?: string;
   tags?: string;
}

export type EditTaskDto = Partial<
   Pick<Task, "dueAt" | "link" | "details" | "status" | "name">
>;
