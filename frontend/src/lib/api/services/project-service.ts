import { fetchProMax } from '@/lib/api/services/helpers/fetch-helper';
import { EditProjectDto, ProjectFilterDto } from 'freelanceman-common';

export async function getProjects(
   accessToken: string,
   filter: ProjectFilterDto
) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: 'projects/search',
      method: 'POST',
      model: 'project',
      requestPayload: filter,
   });
}

export async function getProject(accessToken: string, projectId: string) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: `projects/${projectId}`,
      method: 'GET',
      model: 'project',
   });
}

export async function editProject(
   accessToken: string,
   payload: EditProjectDto
) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: `projects/${payload.id}`,
      requestPayload: payload,
      method: 'PATCH',
      model: 'project',
   });
}

export async function deleteProject(accessToken: string, projectId: string) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: `projects/${projectId}`,
      method: 'DELETE',
      model: 'project',
   });
}

