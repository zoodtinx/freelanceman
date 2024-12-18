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

export interface ProjectSettingFormData {
  name?: string;
  quickTaskId?: string;
  brief?: string;
  projectStatus?: ProjectStatus;
  paymentStatus?: PaymentStatus;
  accentColor?: string;
  dateModified?: string;
}

export interface File {
  id: string,
  name: string,
  link: string,
  size: string,
  type: string,
  dateCreated: string,
  dateModified: string,
  version: string,
  category: 'invoice' | 'quotation' | 'material' | 'workingFile'
}

export interface Document {
  id: string,
}

export interface Contact {
  id: string,
  name: string,
  position: string,
  role: string,
  company: string,
  avatar: string
}
