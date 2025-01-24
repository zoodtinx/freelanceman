import type { Event } from "./event.types";
import type { Task } from "./task.types";

export type ProjectStatus = 'active' | 'on-hold' | 'completed';
export type PaymentStatus = 'not-processed' | 'processing' | 'paid';

export interface Project {
  id: string;
  title: string;
  client: string;
  clientId: string;
  quickTaskId: string;
  brief: string;
  projectStatus: string;
  paymentStatus: string;
  accentColor: string;
  createdAt: string;
  modifiedAt: string;
}

export interface ProjectSettingFormData extends Partial<Omit<Project, 'id' | 'client' | 'clientId' | 'dateCreated'>> {}

export type ProjectSearchOptions = Partial<
  Pick<Project, "title" | "paymentStatus" | "projectStatus" | "clientId">
>;
