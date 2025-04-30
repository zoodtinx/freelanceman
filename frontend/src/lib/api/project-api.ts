import {
   getProjects,
   getProject,
   editProject,
   deleteProject,
   createProject,
   getProjectSelections,
} from '@/lib/api/services/project-service';
import { ProjectFilterDto } from 'freelanceman-common';
import type { MutationCallbacks } from '@/lib/api/services/helpers/api.type';
import { useAppQuery } from '@/lib/api/services/helpers/useAppQuery';
import { useAppMutation } from '@/lib/api/services/helpers/useAppMutation';

export const useProjectApi = () => {
   return {
      createProject: useCreateProject(),
      deleteProject: useDeleteProject(),
      editProject: useEditProject(),
   };
};

export const useProjectsQuery = (filter: ProjectFilterDto = {}) => {
   return useAppQuery(['projects', filter], (token) =>
      getProjects(token, filter)
   );
};

export const useProjectSelectionQuery = (filter: ProjectFilterDto = {}) => {
   return useAppQuery(['projectSelections', filter], (token) =>
      getProjectSelections(token, filter)
   );
};

export const useProjectQuery = (projectId: string, enabled?: boolean) => {
   return useAppQuery(
      ['projects', projectId],
      (token) => getProject(token, projectId),
      enabled
   );
};

export const useCreateProject = (callbacks?: MutationCallbacks) => {
   return useAppMutation(
      {
         mutationKey: 'createProject',
         invalidationKeys: ['projects'],
         mutationFn: createProject,
      },
      callbacks
   );
};

export const useEditProject = (callbacks?: MutationCallbacks) => {
   return useAppMutation(
      {
         mutationKey: 'editProject',
         invalidationKeys: ['projects'],
         mutationFn: editProject,
      },
      callbacks
   );
};

export const useDeleteProject = (callbacks?: MutationCallbacks) => {
   return useAppMutation(
      {
         mutationKey: 'deleteProject',
         invalidationKeys: ['projects'],
         mutationFn: deleteProject,
      },
      callbacks
   );
};
