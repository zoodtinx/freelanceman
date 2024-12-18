import type { Project, ProjectPreview } from '@types';
import { mockSingleProject as sampleProject } from '@/lib/mock/singleProject';
import { mockAllProjects as sampleAllPropjects } from '@mocks';

export const getProject = (id: string): Promise<Project> => {
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

export const getAllProjects = (): Promise<ProjectPreview[]> => {
   return new Promise((resolve) => {
      setTimeout(() => resolve(sampleAllPropjects), 500);
   });
};

// export const createProject = (newProject: Project): Promise<Project> => {
//    const projectWithDefaults: Project = {
//       ...newProject,
//       id: (Math.random() * 10000).toFixed(0), // Generate a mock ID
//       dateCreated: new Date().toISOString(),
//       dateModified: new Date().toISOString(),
//    };

//    console.log('Project created:', projectWithDefaults);

//    sampleAllPropjects.push({
//       id: projectWithDefaults.id,
//       name: projectWithDefaults.name,
//       projectStatus: projectWithDefaults.projectStatus,
//    });

//    return Promise.resolve(projectWithDefaults);
// };

export const deleteProject = (id: string): Promise<string> => {
   const projectIndex = sampleAllPropjects.findIndex(
      (project) => project.id === id
   );

   if (projectIndex !== -1) {
      console.log('Deleting project with ID:', id);
      sampleAllPropjects.splice(projectIndex, 1); // Remove the project from the list
      return Promise.resolve(`Project with ID ${id} deleted successfully.`);
   } else {
      console.error(`Project with ID "${id}" not found.`);
      return Promise.reject(`Project with ID "${id}" not found.`);
   }
};
