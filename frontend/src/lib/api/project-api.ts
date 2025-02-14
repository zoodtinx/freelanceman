import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { editProject, getProject, getAllProjects, deleteProject } from './mock/mock-project-service';
import type { Project, ProjectSearchOptions, ProjectSettingFormData } from '@types';

export const useProjectQuery = (projectId: string) => {
   const query = useQuery<Project, Error>({
      queryKey: ['projects', projectId],
      queryFn: () => getProject(projectId),
   });

   return query;
};


export const useAllProjectsQuery = (searchOptions: ProjectSearchOptions = {}) => {
   const query = useQuery<Project[], Error>({
      queryKey: ['projects', searchOptions],
      queryFn: () => getAllProjects(searchOptions),
   });
   return query;
};


export const useFilteredProjectsQuery = <K extends keyof Project>(
   filterKey: K,
   value: Project[K]
) => {
   const query = useQuery<Project[], Error>({
      queryKey: ['projects', { [filterKey]: value }],
      queryFn: () => getAllProjects(),
   });

   return query;
};

export const useEditProject = (projectId: string) => {
   const queryClient = useQueryClient();

   return useMutation<
      Project,
      Error,
      ProjectSettingFormData
   >({
      mutationFn: ({ key, value }) => editProject(key, value),
      onMutate: async ({ key, value }) => {
         await queryClient.cancelQueries(['projects', projectId]);

         const previousProject = queryClient.getQueryData<Project>([
            'projects',
            projectId,
         ]);

         queryClient.setQueryData<Project>(
            ['projects', projectId],
            (old) => (old ? { ...old, [key]: value } : old)
         );

         return { previousProject };
      },
      onError: (err, variables, context: any) => {
         if (context?.previousProject) {
            queryClient.setQueryData(['projects', projectId], context.previousProject);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries(['projects', projectId]);
      },
   });
};

export const useDeleteProject = (projectId: string) => {
   const queryClient = useQueryClient();

   return useMutation<string, Error, string>({
      mutationFn: () => deleteProject(projectId),
      onMutate: async () => {
         await queryClient.cancelQueries(['projects']);

         const previousProjects = queryClient.getQueryData<Project[]>(['projects']);

         queryClient.setQueryData<Project[]>(
            ['projects'],
            (old) => old?.filter((project) => project.id !== projectId)
         );

         return { previousProjects };
      },
      onError: (err, variables, context: any) => {
         if (context?.previousProjects) {
            queryClient.setQueryData(['projects'], context.previousProjects);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries(['projects']);
      },
   });
};
