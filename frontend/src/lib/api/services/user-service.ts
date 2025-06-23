import { fetchProMax } from '@/lib/api/services/helpers/fetch-helper';

export async function getUser(accessToken: string) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: 'users',
      method: 'GET',
      model: 'user',
   });
}

export async function editUser(accessToken: string, payload: any) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: 'users',
      method: 'PATCH',
      model: 'user',
      requestPayload: payload,
   });
}

export async function setVisited(accessToken: string, page: string) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: `users/visited/${page}`,
      method: 'GET',
      model: 'user',
   });
}

export async function deleteUser(accessToken: string) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: 'users',
      method: 'DELETE',
      model: 'user',
   });
}
