import { fetchProMax } from '@/lib/api/services/helpers/fetch-helper';

export async function getProjects(
   accessToken: string,
   filter: ProjectSearchOption
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
