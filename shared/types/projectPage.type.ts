import type { Event, Task } from "./project.types"

export interface ProjectPageData {
   name:string,
   events: ProjectPageEventAndTask[],
   tasks: ProjectPageEventAndTask[],
   clientName: string,
   clientId: string,
   contacts: ProjectPageContact[],
}

export interface ProjectPageContact {
   name: string,
   position: string,
   role: string,
   company: string,
   avatar: string
}

export interface ProjectPageEventAndTask {
   name: string,
   dueDate: string,
}