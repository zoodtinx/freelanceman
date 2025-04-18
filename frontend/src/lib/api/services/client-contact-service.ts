import { fetchProMax } from '@/lib/api/services/helpers/fetch-helper';
import { ClientContactFilterDto } from 'freelanceman-common';

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
