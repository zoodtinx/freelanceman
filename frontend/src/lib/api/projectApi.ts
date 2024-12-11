import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { editProject, getProject, getAllProjects } from './mock/mockProjectService'; // Ensure this file path is correct
import type { Project, ProjectPreview } from '@types';

type QueryType = 'full' | 'preview'

// Hook for fetching a project
export const useProjectQuery = (projectId: string, type: QueryType = 'full') => {
   const query = useQuery<Project, Error>({
      queryKey: ['project', projectId],
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

   return query
};

export const useAllProjectsQuery = () => {
   const query = useQuery<ProjectPreview[], Error>({
      queryKey: ['allProject'],
      queryFn: () => getAllProjects(),
   })
   
   return query
}

export const useActiveProjectsQuery = () => {
   const query = useQuery<ProjectPreview[], Error>({
      queryKey: ['activeProjects'],
      queryFn: async () => {
         const allProjects = await getAllProjects();
         return allProjects.filter(project => project.projectStatus === 'active');
      },
   });

   return query;
};




// export const useActiveProjectsQuery = () => {
//    const queryClient = useQueryClient();

//    // Retrieve projects already cached by `useProjectQuery`
//    const cachedProjects = queryClient.getQueryData<Project[]>(['project']); // Assuming 'projects' is the key for the query cache

//    console.log('cachedProjects', cachedProjects)

//    const query = useQuery<Project[], Error>({
//       queryKey: ['activeProjects'],
//       queryFn: async () => {
//          if (cachedProjects) {
//             // Filter directly from cache if available
//             return cachedProjects.filter(project => project.projectStatus === 'active');
//          }
//          // Otherwise, fetch projects and filter
//          const allProjects = await getProject();
//          return allProjects.filter(project => project.projectStatus === 'active');
//       },
//       // Optional: Stale time to reduce refetching
//       staleTime: 1000 * 60 * 5, // 5 minutes
//    });

//    return query;
// };


// Hook for editing a project
export const useEditProject = (projectId: string) => {
   const queryClient = useQueryClient();

   return useMutation<
      Project, // The updated project type
      Error, // Error type
      {
         key: keyof Project; // Key to update
         value: Project[keyof Project]; // New value
      }
   >({
      mutationFn: ({ key, value }) => editProject<Project>(key, value),
      onMutate: async ({ key, value }) => {
         await queryClient.cancelQueries(['project', projectId]);

         const previousProject = queryClient.getQueryData<Project>([
            'project',
            projectId,
         ]);

         queryClient.setQueryData<Project>(
            ['project', projectId],
            (old) => (old ? { ...old, [key]: value } : old)
         );

         return { previousProject };
      },
      onError: (err, variables, context: any) => {
         if (context?.previousProject) {
            queryClient.setQueryData(
               ['project', projectId],
               context.previousProject
            );
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries(['project', projectId]);
      },
   });
};
