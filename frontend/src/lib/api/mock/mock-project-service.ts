import type { Project, ProjectPreview, ProjectSearchOption } from '@types';
import { mockProjects as sampleAllPropjects } from '@mocks';

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
   if (sampleProject[key] !== undefined) {
      sampleProject[key] = value;
      sampleProject.dateModified = new Date().toISOString(); // Update modification date
   } else {
   }

   return Promise.resolve(sampleProject);
};

export const getAllProjects = (
   searchTerm: ProjectSearchOption
): Promise<Project[]> => {
   return new Promise((resolve) => {
      setTimeout(() => {
         if (!searchTerm || Object.keys(searchTerm).length === 0) {
            resolve(sampleAllPropjects);
            return;
         }

         const filteredProjects = sampleAllPropjects.filter((project) => {
            const matchesName =
               !searchTerm.title ||
               searchTerm.title.trim() === '' ||
               project.title
                  .toLowerCase()
                  .includes(searchTerm.title.trim().toLowerCase());

            const matchesPaymentStatus =
               searchTerm.paymentStatus === undefined ||
               searchTerm.paymentStatus.trim() === '' ||
               project.paymentStatus === searchTerm.paymentStatus.trim();

            const matchesProjectStatus =
               searchTerm.projectStatus === undefined ||
               searchTerm.projectStatus.trim() === '' ||
               project.projectStatus === searchTerm.projectStatus.trim();

            const matchesClientId =
               !searchTerm.clientId ||
               searchTerm.clientId.trim() === '' ||
               project.clientId === searchTerm.clientId.trim();

            const matchesPinned =
               searchTerm.pinned === undefined || project.pinned === searchTerm.pinned;

            return (
               matchesName &&
               matchesPaymentStatus &&
               matchesProjectStatus &&
               matchesClientId &&
               matchesPinned
            );
         });

         filteredProjects.sort((a, b) => {
            const dateA = new Date(a.modifiedAt).getTime();
            const dateB = new Date(b.modifiedAt).getTime();
            return dateB - dateA;
         });

         resolve(filteredProjects || []);
      }, 500);
   });
};

export const getProjectSelections = (
   searchTerm: ProjectSearchOption
): Promise<Project[]> => {
   return new Promise((resolve) => {
      setTimeout(() => {
         if (!searchTerm || Object.keys(searchTerm).length === 0) {
            const projectSelections = sampleAllPropjects.map((project) => {
               return {
                  value: project.id,
                  label: project.title
               }
            })
            
            resolve(projectSelections);
            return;
         }

         const filteredProjects = sampleAllPropjects.filter((project) => {
            const matchesName =
               !searchTerm.title ||
               searchTerm.title.trim() === '' ||
               project.title
                  .toLowerCase()
                  .includes(searchTerm.title.trim().toLowerCase());

            const matchesPaymentStatus =
               searchTerm.paymentStatus === undefined ||
               searchTerm.paymentStatus.trim() === '' ||
               project.paymentStatus === searchTerm.paymentStatus.trim();

            const matchesProjectStatus =
               searchTerm.projectStatus === undefined ||
               searchTerm.projectStatus.trim() === '' ||
               project.projectStatus === searchTerm.projectStatus.trim();

            const matchesClientId =
               !searchTerm.clientId ||
               searchTerm.clientId.trim() === '' ||
               project.clientId === searchTerm.clientId.trim();

            const matchesPinned =
               searchTerm.pinned === undefined || project.pinned === searchTerm.pinned;

            return (
               matchesName &&
               matchesPaymentStatus &&
               matchesProjectStatus &&
               matchesClientId &&
               matchesPinned
            );
         });

         filteredProjects.sort((a, b) => {
            const dateA = new Date(a.modifiedAt).getTime();
            const dateB = new Date(b.modifiedAt).getTime();
            return dateB - dateA;
         });

         const projectSelections = filteredProjects.map((project) => {
            return {
               value: project.id,
               label: project.title
            }
         })

         resolve(projectSelections || []);
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

//

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
      sampleAllPropjects.splice(projectIndex, 1); // Remove the project from the list
      return Promise.resolve(`Project with ID ${id} deleted successfully.`);
   } else {
      return Promise.reject(`Project with ID "${id}" not found.`);
   }
};
