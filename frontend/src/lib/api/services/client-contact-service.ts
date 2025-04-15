import { fetchProMax } from '@/lib/api/services/helpers/fetch-helper';

export async function getClientContacts(
   accessToken: string,
   filter: ClientContactSearchOption
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
   clientContactId: ClientSearchOption
) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: `client-contacts/${clientContactId}`,
      method: 'GET',
      model: 'client',
   });
}
