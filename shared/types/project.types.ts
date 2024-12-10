export type ProjectStatus = 'active' | 'onHold' | 'completed'
export type PaymentStatus = 'notProcessed' | 'processing' | 'paid'
export type TaskStatus = 'planned' | 'inProgress' |'completed' | 'cancelled'
export type EventStatus = 'scheduled' | 'onGoing' | 'completed' | 'cancelled'

export interface Project {
  id: string,
  client: string;
  clientId: string;
  name: string;
  tasks: Task[];
  events: Event[];
  files: File[];
  brief: string;
  documents: Document[];
  contact: Contact[];
  projectStatus: 'active' | 'onHold' | 'completed';
  paymentStatus: 'notProcessed' | 'processing' | 'paid',
  accentColor: string,
  dateCreated: string,
  dateModified: string,
}

export interface Task {
  id: string;
  name: string;
  status: TaskStatus;
  details: string;
  link: string;
  createdAt: string;
  dueDate: string;
  project: string;
  projectId: string;
  client: string;
  clientId: string
}

export interface Event extends Omit<Task, 'status'> {
  status: EventStatus
}

export type EventStatus = 'scheduled' | 'onGoing' | 'completed' | 'cancelled'

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
  // another data field for user input formss
}

export interface Contact {
  id: string,
  name: string,
  position: string,
  role: string,
  company: string,
  avatar: string
}

