export type ProjectStatus = 'onhold' | 'active' | 'completed'
export type PaymentStatus = 'paid' | 'unpaid' | 'processing' | 'not processed' | 'all';
export type SortOption = 'dateModified' | 'dateCreated' | 'name' | 'client';

export interface Project {
  id: string,
  client: string;
  name: string;
  tasks: Task[];
  events: Event[];
  files: File[];
  documents: Document[];
  materials: MaterialFile[];
  brief: Brief;
  projectStatus: ProjectStatus;
  paymentStatus: PaymentStatus,
  color: string,
  dateCreated: string,
  dateModified: string,
}

export interface ProjectWithFilter extends Project {
  sortBy: 'dateModified' | 'dateCreated' | 'name' | 'client';
  sortOrder: 'desc' | 'asc';
}

export interface ProjectListFilter {
  sortBy: 'dateModified' | 'dateCreated' | 'name' | 'client';
  sortOrder: 'desc' | 'asc';
  projectStatus: ProjectStatus;
  paymentStatus: PaymentStatus;
}

export interface FileListFilter {
  type: string;
  category: 'workingFiles' | 'documents' | 'materials' | 'all' | 'invoices';
  sortBy: 'dateModified' | 'dateCreated' | 'name' | 'size';
  sortOrder: 'desc' | 'asc';
}

export interface Task {
  id: string;
  name: string;
  status: 'planned' | 'completed' | 'cancelled' | 'all';
  details: string;
  link: string;
  startedAt: string;
  dueDate: string;
  project: string;
  projectId?: string;
  client: string;
}

export interface WorkingFile {
  id: string;
  name: string;
  size: string;
  link: string;
  project: string;
  client: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  link: string;
  project: string;
  client: string;
}

export interface MaterialFile {
  id: string;
  name: string;
  size: string;
  link: string;
  project: string;
  client: string;
}

export interface Brief {
  id: string;
  brief: string;
  project: string;
  client: string;
  dateCreated: string;
  dateModified: string;
}

export interface Event {
  id: string;
  name: string;
  status: 'upcoming' | 'completed' | 'all' | 'cancelled';
  details: string;
  link: string;
  startedAt: string;
  dueDate: string;
  project: string;
  client: string;  
}

