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

export async function getClient(
   accessToken: string,
   clientId: string
) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: `clients/${clientId}`,
      method: 'GET',
      model: 'client',
   });
}

export async function createClient(
   accessToken: string,
   payload: CreateClientDto
) {}

export async function editClient(accessToken: string, payload: EditClientDto) {}

export async function deleteClient(accessToken: string, clientId: string) {}
