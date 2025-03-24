import { CreateTaskDto, SearchTaskSchema, UpdateTaskDto } from "src/shared/zod-schemas/task.schema";

export const mockCreateTask: CreateTaskDto = {
   name: "Design homepage",
   status: "pending",
   projectId: "1d3f60dc-471e-4975-8507-abc07104ac5d",
   clientId: "1c33ad06-c6fe-420b-b540-9b1b79421373",
   dueAt: new Date().toISOString(),
   details: "Focus on mobile responsiveness",
   link: "https://example.com/brief",
 };
 
 export const mockSearchTask: SearchTaskSchema = {
   name: "Design",
   status: "finished",
   dueAt: new Date().toISOString(),
   projectId: "1d3f60dc-471e-4975-8507-abc07104ac5d",
   clientId: "1c33ad06-c6fe-420b-b540-9b1b79421373",
 };
 
 export const mockUpdateTask: UpdateTaskDto = {
   name: "Update homepage",
   status: "cancelled",
   dueAt: new Date().toISOString(),
   link: "https://example.com/updated-brief",
   details: "Client requested changes",
 };
 