import type { Event } from "./event.types";
import type { Task } from "./task.types";

export type ProjectStatus = 'active' | 'onHold' | 'completed'
export type PaymentStatus = 'notProcessed' | 'processing' | 'paid'

export interface Project {
  id: string,
  name: string;
  client: string;
  clientId: string;
  quickTaskId: string;
  brief: string;
  projectStatus: ProjectStatus;
  paymentStatus: PaymentStatus,
  accentColor: string,
  dateCreated: string,
  dateModified: string,
}

export interface ProjectSettingFormData extends Partial<Omit<Project, 'id' | 'client' | 'clientId' | 'dateCreated'>> {}

