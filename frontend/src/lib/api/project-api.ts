import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProjects, getProject } from '@/lib/api/services/project-service';
import {
   editProject,
   getAllProjects,
   deleteProject,
} from './mock/mock-project-service';
import {
   ProjectFilterDto,
   CreateProjectDto,
   UpdateProjectDto,
   ProjectPayload,
} from 'freelanceman-common/dist/types/src/schemas';
import useAuthStore from '@/lib/zustand/auth-store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const useProjectApi = () => {
   return {
      createProject: useCreateProject(),
      deleteProject: useDeleteProject(),
      editProject: useEditProject(),
   };
};

export const useProjectsQuery = (searchOptions: ProjectFilterDto = {}) => {
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   const queryResult = useQuery({
      queryKey: ['projects', searchOptions],
      queryFn: () => getProjects(accessToken, searchOptions),
   });

   const { isError, error } = queryResult;

   useEffect(() => {
      if (
         isError &&
         error instanceof Error &&
         error.message === 'Unauthorized'
      ) {
         navigate('/login');
      }
   }, [isError, error, navigate]);

   return queryResult;
};

export const useProjectQuery = (projectId: string) => {
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   const queryResult = useQuery<ProjectPayload, Error, ProjectPayload>({
      queryKey: ['projects', projectId],
      queryFn: () => getProject(accessToken, projectId),
   });

   const { isError, error } = queryResult;

   useEffect(() => {
      if (
         isError &&
         error instanceof Error &&
         error.message === 'Unauthorized'
      ) {
         navigate('/login');
      }
   }, [isError, error, navigate]);

   return queryResult;
};

export const useProjectSelectionQuery = (
   searchOptions: ProjectFilterDto = {}
) => {
   const queryClient = useQueryClient();

   return useQuery({
      queryKey: ['projectSelection', JSON.stringify(searchOptions)],
      queryFn: async () => {
         const cachedProjects = queryClient.getQueryData<ProjectPayload[]>([
            'projects',
            JSON.stringify(searchOptions),
         ]);

         if (cachedProjects) {
            return cachedProjects.map((project) => ({
               value: project.id,
               label: project.title,
            }));
         }

         const projects = await getAllProjects(searchOptions);
         return projects.map((project) => ({
            value: project.id,
            label: project.title,
         }));
      },
   });
};

export const useCreateProject = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['createProject'],
      mutationFn: async (newProject: CreateProjectDto) =>
         await createProject(newProject),
      onMutate: async (newProject: CreateProjectDto) => {
         await queryClient.cancelQueries({ queryKey: ['projects'] });
         const previousProjects = queryClient.getQueryData(['projects']);

         queryClient.setQueryData(['projects'], (old: ProjectPayload[]) => [
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
   projectPayload: UpdateProjectDto;
}

export const useEditProject = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['editProject'],
      mutationFn: async ({
         projectId,
         projectPayload,
      }: EditProjectMutationPayload) => {
         await editProject(projectId, projectPayload);
      },
      onMutate: async ({ projectId, projectPayload }) => {
         await queryClient.cancelQueries({ queryKey: ['projects'] });
         const previousProjects = queryClient.getQueryData(['projects']);

         if (previousProjects) {
            queryClient.setQueryData(['projects'], (old: ProjectPayload[]) =>
               old?.map((project) =>
                  project.id === projectId ? projectPayload : project
               )
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
            queryClient.setQueryData(['projects'], (old: ProjectPayload[]) =>
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
