export type ProjectStatus = 'pending' | 'active' | 'completed' | 'all';
export type PaymentStatus = 'paid' | 'unpaid' | 'processing' | 'not processed' | 'all';
export type SortOption = 'dateModified' | 'dateCreated' | 'name' | 'client';
export interface Project {
    id: string;
    client: string;
    name: string;
    tasks: Task[];
    events: Event[];
    files: File[];
    documents: Document[];
    materials: Material;
    projectStatus: ProjectStatus;
    paymentStatus: PaymentStatus;
    color: string;
    dateCreated: string;
    dateModified: string;
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
export interface Task {
    id: string;
    name: string;
    status: 'planned' | 'in progress' | 'completed';
    details: string;
    link: string;
    startedAt: string;
    dueDate: string;
    project: string;
    client: string;
}
export interface File {
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
export interface Material {
    id: string;
    brief: string;
    materials: File[];
}
export interface Event {
    id: string;
    name: string;
    status: 'upcoming' | 'completed';
    details: string;
    link: string;
    startedAt: string;
    dueDate: string;
    project: string;
    client: string;
}
