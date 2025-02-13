export interface Project {
  id: string;
  title: string;
  client: string;
  clientId: string;
  quickTaskId: string;
  projectStatus: "active" | "on-hold" | "completed"
  paymentStatus: "unpaid" | "processing" | "paid"
  themeColor: string;
  links: string[];
  note: string;
  pinned?: boolean;
  createdAt: string;
  modifiedAt: string;
}

export interface CreateProjectDto {
  title: string;
  clientId: string;
  projectStatus: string;
  paymentStatus: string;
  contacts?: string[];
  workingFiles?: string[];
  assetFiles?: string[];
}

export interface EditProjectDto {
  title?: string;
  projectStatus?: string;
  paymentStatus?: string;
  contacts?: string[];
  workingFiles?: string[];
  assetFiles?: string[];
  links?: string[];
  note?: string[]; 
}

export interface ProjectSearchOption {
  title?: string;
  projectId?: string;
  clientId?: string;
  contactId?: string;
  partnerId?: string;
  eventId?: string;
  taskId?: string;
  paymentStatus?: string;
  projectStatus?: string;
  pinned?: boolean;
}