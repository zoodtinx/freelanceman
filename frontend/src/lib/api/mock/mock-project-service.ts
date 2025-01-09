import type { Project, ProjectPreview, ProjectSearchOptions } from '@types';
import { mockAllProjects as sampleAllPropjects } from '@mocks';

export const getProject = (id: string): Promise<Project> => {
   const queriedProject = sampleAllPropjects.find(
      (project) => project.id === id
   );
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         if (queriedProject) {
            resolve(queriedProject);
         } else {
            reject(new Error(`Project with id ${id} not found`));
         }
      }, 500);
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

export const getAllProjects = (
   searchTerm: ProjectSearchOptions
): Promise<Project[]> => {
   return new Promise((resolve) => {
      setTimeout(() => {
         if (!searchTerm || Object.keys(searchTerm).length === 0) {
            resolve(sampleAllPropjects);
            return;
         }

         console.log('searchTermAPI', searchTerm);

         const filteredProjects = sampleAllPropjects.filter((project) => {
            const matchesName =
               !searchTerm.name || searchTerm.name.trim() === "" ||
               project.name.toLowerCase().includes(searchTerm.name.trim().toLowerCase());

            const matchesPaymentStatus =
               searchTerm.paymentStatus === undefined ||
               searchTerm.paymentStatus.trim() === "" ||
               project.paymentStatus === searchTerm.paymentStatus.trim();

            const matchesProjectStatus =
               searchTerm.projectStatus === undefined ||
               searchTerm.projectStatus.trim() === "" ||
               project.projectStatus === searchTerm.projectStatus.trim();

            const matchesClientId =
               !searchTerm.clientId || searchTerm.clientId.trim() === "" ||
               project.clientId === searchTerm.clientId.trim();

            return (
               matchesName &&
               matchesPaymentStatus &&
               matchesProjectStatus &&
               matchesClientId
            );
         })

         resolve(filteredProjects || []);
      }, 500);
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
