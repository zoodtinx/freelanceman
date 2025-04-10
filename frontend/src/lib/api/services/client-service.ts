import { fetchProMax } from '@/lib/api/services/helpers/fetch-helper';
import { ClientSearchOption } from '@types';

export async function getClients(
   accessToken: string,
   filter: ClientSearchOption
) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: 'clients/search',
      method: 'POST',
      model: 'client',
      requestPayload: filter,
   });
}

export async function getClient(
   accessToken: string,
   clientId: ClientSearchOption
) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: `clients/${clientId}`,
      method: 'GET',
      model: 'client',
   });
}
