import { fetchProMax } from '@/lib/api/services/helpers/fetch-helper';
import {
   ClientContactFilterDto,
   CreateClientContactDto,
   EditClientContactDto,
} from 'freelanceman-common';

export async function getClientContacts(
   accessToken: string,
   filter: ClientContactFilterDto
) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: 'client-contacts/search',
      method: 'POST',
      model: 'client',
      requestPayload: filter,
   });
}

export async function getClientContact(
   accessToken: string,
   clientContactId: string
) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: `client-contacts/${clientContactId}`,
      method: 'GET',
      model: 'client',
   });
}

export async function createClientContact(
   accessToken: string,
   payload: CreateClientContactDto
) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: 'client-contacts',
      method: 'POST',
      model: 'client',
      requestPayload: payload,
   });
}

export async function editClientContact(
   accessToken: string,
   payload: EditClientContactDto
) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: `client-contacts/${payload.id}`,
      method: 'PATCH',
      model: 'client',
      requestPayload: payload,
   });
}

export async function deleteClientContact(
   accessToken: string,
   contactId: string
) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: `client-contacts/${contactId}`,
      method: 'DELETE',
      model: 'client',
   });
}
