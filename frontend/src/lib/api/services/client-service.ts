import { fetchProMax } from '@/lib/api/services/helpers/fetch-helper';
import { ClientFilterDto } from 'freelanceman-common';

export async function getClients(
   accessToken: string,
   filter: ClientFilterDto
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
   clientId: ClientFilterDto
) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: `clients/${clientId}`,
      method: 'GET',
      model: 'client',
   });
}
