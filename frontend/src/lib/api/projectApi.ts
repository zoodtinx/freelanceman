import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { editProject, getProject } from './mock/mockProjectService'; // Ensure this file path is correct
import type { Project } from '@types';

// Hook for fetching a project
export const useProjectQuery = (projectId: string) => {
   return useQuery<Project, Error>({
      queryKey: ['project', projectId],
      queryFn: () => getProject(projectId),
   });
};

// Hook for editing a project
export const useEditProject = (projectId: string) => {
   const queryClient = useQueryClient();

   return useMutation<
      Project, // The updated project type
      Error, // Error type
      { key: keyof Project; value: Project[keyof Project] } // Mutation variables
   >({
      mutationFn: ({ key, value }) => {
         console.log('key', key);
         editProject(key, value);
      },
      onMutate: async ({ key, value }) => {
         await queryClient.cancelQueries(['project', projectId]);

         const previousProject = queryClient.getQueryData<Project>([
            'project',
            projectId,
         ]);

         queryClient.setQueryData<Project>(['project', projectId], (old) => {
            if (!old) return null;
            return { ...old, [key]: value };
         });

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
