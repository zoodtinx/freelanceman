import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { editProject, getProject, getAllProjects } from './mock/mockProjectService';
import type { Project, ProjectPreview } from '@types';

type QueryType = 'full' | 'preview';

// Hook for fetching a project
export const useProjectQuery = (projectId: string, type: QueryType = 'full') => {
   const query = useQuery<Project, Error>({
      queryKey: ['projects', projectId],
      queryFn: () => getProject(projectId),
   });

   if (type === 'preview') {
      const projectPreview: ProjectPreview | undefined = query.data
         ? {
              id: query.data.id,
              client: query.data.client,
              clientId: query.data.clientId,
              name: query.data.name,
              quickTask: query.data.tasks[0]?.name || '',
              quickTaskId: query.data.tasks[0]?.id || '',
              projectStatus: query.data.projectStatus,
              paymentStatus: query.data.paymentStatus,
              accentColor: query.data.accentColor,
              dateCreated: query.data.dateCreated,
              dateModified: query.data.dateModified,
           }
         : undefined;

      return { ...query, data: projectPreview };
   }

   return query;
};

// Hook for fetching all projects
export const useAllProjectsQuery = () => {
   const query = useQuery<ProjectPreview[], Error>({
      queryKey: ['projects', 'all'],
      queryFn: () => getAllProjects(),
   });

   return query;
};

// Hook for fetching active projects
export const useActiveProjectsQuery = () => {
   const query = useQuery<ProjectPreview[], Error>({
      queryKey: ['projects', 'active'],
      queryFn: async () => {
         const allProjects = await getAllProjects();
         return allProjects.filter((project) => project.projectStatus === 'active');
      },
   });

   return query;
};

// Hook for editing a project
export const useEditProject = (projectId: string) => {
   const queryClient = useQueryClient();

   return useMutation<
      Project,
      Error,
      {
         key: keyof Project;
         value: Project[keyof Project];
      }
   >({
      mutationFn: ({ key, value }) => editProject<Project>(key, value),
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
