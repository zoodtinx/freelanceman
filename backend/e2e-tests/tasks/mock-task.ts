import { CreateTaskDto, UpdateTaskDto } from '@schemas';

export const mockCreateTaskPayload: CreateTaskDto = {
   name: "Design homepage",
   status: "pending",
   projectId: "088860df-8fdd-4379-a8e6-c3fb3d997003",
   clientId: "0e6e4218-7366-4e33-903b-da1f7d0d2d55",
   dueAt: new Date().toISOString(),
   details: "Focus on mobile responsiveness",
   link: "https://example.com/brief",
 };
 
 export const mockSearchTask = {
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
 