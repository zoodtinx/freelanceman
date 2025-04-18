import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
   getProjects,
   getProject,
   editProject,
   deleteProject,
} from '@/lib/api/services/project-service';
import {
   ProjectFilterDto,
   CreateProjectDto,
   EditProjectDto,
   ProjectPayload,
} from 'freelanceman-common';
import useAuthStore from '@/lib/zustand/auth-store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import type { MutationCallbacks } from '@/lib/api/services/helpers/api.type';

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

export const useEditProject = ({
   errorCallback,
   successCallback,
}: MutationCallbacks = {}) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationKey: ['editProject'],
      mutationFn: async (projectPayload: EditProjectDto) => {
         await editProject(accessToken, projectPayload);
      },
      onSuccess: () => {
         successCallback && successCallback();
      },
      onError: (err) => {
         if (err.message === 'Unauthorized') {
            navigate('/login');
         } else {
            errorCallback && errorCallback(err);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['projects'] });
      },
   });
};

export const useDeleteProject = ({
   errorCallback,
   successCallback,
}: MutationCallbacks = {}) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationKey: ['deleteProject'],
      mutationFn: async (projectId: string) => {
         await deleteProject(accessToken, projectId);
      },
      onSuccess: () => {
         successCallback && successCallback();
      },
      onError: (err) => {
         if (err.message === 'Unauthorized') {
            navigate('/login');
         } else {
            errorCallback && errorCallback(err);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['projects'] });
      },
   });
};
