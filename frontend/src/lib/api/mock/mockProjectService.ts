import type { Project, ProjectPreview } from '@types';
import { mockSingleProject as sampleProject } from '@/lib/mock/singleProject';
import { mockProjects as sampleAllPropjects } from '@/lib/mock/projects';

export const getProject = (id: string): Promise<Project> => {
   console.log('id', id);
   return new Promise((resolve) => {
      setTimeout(() => resolve(sampleProject), 500);
   });
};

export const editProject = <K extends keyof Partial<Project>>(
   key: K,
   value: Partial<Project>[K]
): Promise<Partial<Project>> => {
   console.log('project service key', key);
   console.log('project service value', value);

   if (sampleProject[key] !== undefined) {
      console.log(sampleProject[key]);
      sampleProject[key] = value;
      sampleProject.dateModified = new Date().toISOString(); // Update modification date
   } else {
      console.error(`Key "${key}" does not exist on sampleProject.`);
   }

   return Promise.resolve(sampleProject);
};

export const getAllProjects = (): Promise<ProjectPreview[]>  => {
   return new Promise((resolve) => {
      setTimeout(() => resolve(sampleAllPropjects), 500);
   });
}