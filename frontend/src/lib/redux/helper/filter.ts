import { current } from "@reduxjs/toolkit";
import { Project, ProjectListFilter,FileListFilter , Task, Event } from "@types";

// Helper function to filter projects based on the current filter
const filterProjects = (
   originalProjects: Project[] | readonly Project[],
   currentFilter: ProjectListFilter
) => {
   const { sortBy, sortOrder, projectStatus, paymentStatus } = currentFilter;

   // Ensure we have a plain array of projects to work with
   const projectsArray = Array.isArray(originalProjects) 
       ? originalProjects 
       : current(originalProjects); // Convert draft to a regular array if needed

   const filtered = projectsArray.filter((project) => {
      const isProjectStatusMatch =
         projectStatus === 'all' || project.projectStatus === projectStatus;
      const isPaymentStatusMatch =
         paymentStatus === 'all' || project.paymentStatus === paymentStatus;
      return isProjectStatusMatch && isPaymentStatusMatch;
   });

   filtered.sort((a, b) => {
      if (sortBy === 'dateModified') {
         return sortOrder === 'asc'
            ? new Date(a.dateModified).getTime() - new Date(b.dateModified).getTime()
            : new Date(b.dateModified).getTime() - new Date(a.dateModified).getTime();
      } else if (sortBy === 'dateCreated') {
         return sortOrder === 'asc'
            ? new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime()
            : new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
      } else if (sortBy === 'name') {
         return sortOrder === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
      } else if (sortBy === 'client') {
         return sortOrder === 'asc'
            ? a.client.localeCompare(b.client)
            : b.client.localeCompare(a.client);
      }
      return 0;
   });

   return filtered;
};

const filterTasksAndEvents = (
   list: Task[] | Event[],
   currentFilter: string
) => {
   const tasksArray = Array.isArray(list) 
       ? list 
       : current(list);

   const filtered = tasksArray.filter((task) => {
      return task.status === currentFilter;
   });

   return filtered;
};

const filterFileList = (
   list: [],
   currentFilter: FileListFilter
) => {
   const { sortBy, sortOrder, category } = currentFilter;

   const filesArray = Array.isArray(list) 
       ? list 
       : current(list);

   const filtered = filesArray.filter((file) => {
      return file.type === category;
   });

   filtered.sort((a, b) => {
      if (sortBy === 'dateModified') {
         return sortOrder === 'asc'
            ? new Date(a.dateModified).getTime() - new Date(b.dateModified).getTime()
            : new Date(b.dateModified).getTime() - new Date(a.dateModified).getTime();
      } else if (sortBy === 'dateCreated') {
         return sortOrder === 'asc'
            ? new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime()
            : new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
      } else if (sortBy === 'name') {
         return sortOrder === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
      } else if (sortBy === 'size') {
         return sortOrder === 'asc'
            ? a.size.localeCompare(b.size)
            : b.size.localeCompare(a.size);
      }
      return 0;
   });

   return filtered;
} 


   


export { filterProjects, filterTasksAndEvents };
