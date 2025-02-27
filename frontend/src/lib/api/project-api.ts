import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
   editProject,
   getProject,
   getAllProjects,
   createProject,
   deleteProject,
} from './mock/mock-project-service';
import type { CreateProjectDto, EditProjectDto, Project, ProjectSearchOption } from '@types';


export const useProjectApi = () => {
   return {
      createProject: useCreateProject(),
      deleteProject: useDeleteProject(),
      editProject: useEditProject()
   }
}


export const useAllProjectsQuery = (searchOptions: ProjectSearchOption = {}) => {
   return useQuery({
      queryKey: ['projects', searchOptions],
      queryFn: () => getAllProjects(searchOptions),
   });
};


export const useProjectsQuery = (searchOptions: ProjectSearchOption = {}) => {
   return useQuery({
      queryKey: ['projects', JSON.stringify(searchOptions)],
      queryFn: () => getAllProjects(searchOptions),
   });
};


export const useProjectQuery = (projectId: string) => {
   return useQuery<Project, Error, Project>({
      queryKey: ['projects', projectId],
      queryFn: () => getProject(projectId),
   });
};


export const useCreateProject = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['createProject'],
      mutationFn: async (newProject: CreateProjectDto) => await createProject(newProject),
      onMutate: async (newProject: CreateProjectDto) => {
         await queryClient.cancelQueries({ queryKey: ['projects'] });
         const previousProjects = queryClient.getQueryData(['projects']);

         queryClient.setQueryData(['projects'], (old: Project[]) => [
            ...(old || []),
            { ...newProject, id: 'temp-id' },
         ]);

         return { previousProjects };
      },
      onError: (err, newProject, context) => {
         console.log('New project ', newProject);
         console.log(err);
         if (context?.previousProjects) {
            queryClient.setQueryData(['projects'], context.previousProjects);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['projects'] });
      },
   });
};


interface EditProjectMutationPayload {
   projectId: string;
   projectPayload: EditProjectDto;
}

export const useEditProject = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['editProject'],
      mutationFn: async ({ projectId, projectPayload }: EditProjectMutationPayload) => {
         await editProject(projectId, projectPayload);
      },
      onMutate: async ({ projectId, projectPayload }) => {
         await queryClient.cancelQueries({ queryKey: ['projects'] });
         const previousProjects = queryClient.getQueryData(['projects']);

         if (previousProjects) {
            queryClient.setQueryData(['projects'], (old: Project[]) =>
               old?.map((project) => (project.id === projectId ? projectPayload : project))
            );
         }

         return { previousProjects };
      },
      onError: (err, newProjectPayload, context) => {
         console.log('New project ', newProjectPayload);
         console.log(err);
         if (context?.previousProjects) {
            queryClient.setQueryData(['projects'], context.previousProjects);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['projects'] });
      },
   });
};


export const useDeleteProject = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['deleteProject'],
      mutationFn: async (projectId: string) => {
         await deleteProject(projectId);
      },
      onMutate: async (projectId: string) => {
         await queryClient.cancelQueries({ queryKey: ['projects'] });
         const previousProjects = queryClient.getQueryData(['projects']);

         if (previousProjects) {
            queryClient.setQueryData(['projects'], (old: Project[]) =>
               old?.filter((project) => project.id !== projectId)
            );
         }

         return { previousProjects };
      },
      onError: (err, projectIds, context) => {
         console.log('Project deleting ', projectIds);
         console.log(err);
         if (context?.previousProjects) {
            queryClient.setQueryData(['projects'], context.previousProjects);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['projects'] });
      },
   });
};
