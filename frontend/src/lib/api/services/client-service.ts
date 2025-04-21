import { fetchProMax } from '@/lib/api/services/helpers/fetch-helper';
import {
   ClientFilterDto,
   CreateClientDto,
   EditClientDto,
} from 'freelanceman-common';

export async function getClients(accessToken: string, filter: ClientFilterDto) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: 'clients/search',
      method: 'POST',
      model: 'client',
      requestPayload: filter,
   });
}

export async function getClient(accessToken: string, clientId: string) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: `clients/${clientId}`,
      method: 'GET',
      model: 'client',
   });
}

export async function getClientSelections(accessToken: string, filter: ClientFilterDto) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: 'clients/selections',
      method: 'POST',
      model: 'client',
      requestPayload: filter
   });
}

export async function createClient(
   accessToken: string,
   payload: CreateClientDto
) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: 'clients',
      method: 'POST',
      model: 'client',
      requestPayload: payload,
   });
}

export async function editClient(accessToken: string, payload: EditClientDto) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: `clients/${payload.id}`,
      method: 'PATCH',
      model: 'client',
      requestPayload: payload
   });
}

export async function deleteClient(accessToken: string, clientId: string) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: `clients/${clientId}`,
      method: 'DELETE',
      model: 'client',
   });
}
