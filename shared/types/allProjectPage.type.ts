import { PaymentStatus, Project, ProjectStatus } from "./project.types";

export interface ProjectPreview extends Partial<Omit<Project, 'tasks'>> {
   quickTask: string;
   quickTaskId: string;
 }
