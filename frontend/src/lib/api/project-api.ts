import {
   createProject,
   deleteProject,
   editProject,
   getProject,
   getProjects,
   getProjectSelections,
} from './services/project-service';
import { UseApiOptions } from '@/lib/api/services/helpers/api.type';
import { ProjectFilterDto } from 'freelanceman-common';
import { useAppQuery } from '@/lib/api/services/helpers/useAppQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/lib/zustand/auth-store';
import {
   CreateProjectDtoWithOptimisticUpdate,
   EditProjectDto,
} from 'freelanceman-common/src/schemas';
import { getBaseMutationOptions } from '@/lib/api/services/helpers/base-mutation-options';
import { defaultApiOptions } from '@/lib/api/services/helpers/default-option';

export const useProjectSelectionQuery = (
   filter: ProjectFilterDto = {},
   enable?: boolean
) => {
   return useAppQuery(
      ['projectSelections', filter],
      (token) => getProjectSelections(token, filter),
      enable
   );
};

export const useProjectsQuery = (
   filter: ProjectFilterDto = {},
   enable?: boolean
) => {
   return useAppQuery(
      ['projects', filter],
      (token) => getProjects(token, filter),
      enable,
   );
};

export const useProjectQuery = (projectId: string, enable?: boolean) => {
   return useAppQuery(
      ['project', projectId],
      (token) => getProject(token, projectId),
      enable,
      false
   );
};

export const useCreateProject = (
   options: UseApiOptions = defaultApiOptions
) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (payload: CreateProjectDtoWithOptimisticUpdate) =>
         createProject(accessToken, payload),
      ...getBaseMutationOptions({
         navigate,
         options,
         queryClient,
         queryKey: ['projects'],
      }),
   });
};

export const useEditProject = (options: UseApiOptions = defaultApiOptions) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (payload: EditProjectDto) =>
         editProject(accessToken, payload),
      ...getBaseMutationOptions({
         navigate,
         options,
         queryClient,
         queryKey: ['projects', 'project', 'paymentData', 'paymentStats'],
      }),
   });
};

export const useDeleteProject = (
   options: UseApiOptions = defaultApiOptions
) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (deletedProjectId: string) =>
         deleteProject(accessToken, deletedProjectId),
      ...getBaseMutationOptions({
         navigate,
         options,
         queryClient,
         queryKey: ['projects', 'project', 'paymentData', 'paymentStats'],
      }),
   });
};
