export interface Project {
  id: string;
  name: string;
  description: string;
  clientId: string;
  status: 'pending' | 'in-progress' | 'completed' | 'archived';
  startDate: Date;
  endDate?: Date;
  budget: number;
  createdAt: Date;
  updatedAt: Date;
  files?: string[];
}